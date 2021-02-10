var points = function(name , points, date){
  var point = {
    name : name,
    points : points,
    date : date
  }
  return point;
};

module.exports.points = points;
