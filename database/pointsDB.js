var pointsModel = require('./../model/points');
var balaceModel = require('./../model/balance');
var _ = require('lodash');

var list = [];

var balanceMap = new Map();

var getPoints = function() {
  list = _.sortBy(list, 'date');
  return list;
};

var getBalance = function() {
  var balanceList = [];
  for (const [key, value] of balanceMap.entries()) {
    balanceList.push(balaceModel.balance(key, value));
  }
  var result = {
    result: balanceList
  }
  return result;
};

var addPoints = function(name, points, date) {
  if (points < 0) {
    var index = list.map(function(e) {
      return e.name;
    }).indexOf(name);

    if (index > -1) {
      list[index].points = parseInt(list[index].points) + parseInt(points);

      if (list[index].points < 0) {
        list[index].points = 0;
      }
      return;
    } else {
      var point = pointsModel.points(name, points, date);
      list.push(point);
      return;
    }
  } else {
    var point = pointsModel.points(name, parseInt(points), date);
    list.push(point);
  }
};

var addBalance = function(name, points, date) {
  if (balanceMap.has(name)) {
    balanceMap.set(name, parseInt(balanceMap.get(name)) + parseInt(points));
  } else {
    balanceMap.set(name, parseInt(points));
  }
};

var deletePoints = function(points) {
  var deductedPoints = parseInt(points);
  list = _.sortBy(list, 'date');
  var deductedList = [];
  var i = 0;

  while (deductedPoints > 0 && i < list.length) {
    var point = list[i];

    if (point.points > 0) {
      if (point.points > deductedPoints) {
        deductedList.push(pointsModel.points(point.name, parseInt(0 - deductedPoints), "now"));
        point.points = point.points - deductedPoints;
        balanceMap.set(point.name, parseInt(balanceMap.get(point.name)) - parseInt(deductedPoints));
        deductedPoints = 0;
      } else {
        var origDeduct = deductedPoints;
        deductedPoints = deductedPoints - point.points;
        deductedList.push(pointsModel.points(point.name, parseInt(deductedPoints - origDeduct), "now"));
        point.points = point.points - (origDeduct - deductedPoints);
        balanceMap.set(point.name, parseInt(balanceMap.get(point.name)) - parseInt(origDeduct - deductedPoints));
      }
    }
    i++;
  }
  var result = {
    result: deductedList
  }
  return result;
}

module.exports.getPoints = getPoints;
module.exports.getBalance = getBalance;
module.exports.addPoints = addPoints;
module.exports.addBalance = addBalance;
module.exports.deletePoints = deletePoints;
