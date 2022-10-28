// POLYGON/POINT (http://www.jeffreythompson.org/collision-detection/poly-point.php)
function checkPointInPoly(vertices, px, py) {
  var collision = false;

  // go through each of the vertices, plus
  // the next vertex in the list
  var next = 0;
  for (var current = 0; current < vertices.length; current++) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next == vertices.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    var vc = vertices[current]; // c for "current"
    var vn = vertices[next]; // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (
      ((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
      px < ((vn.x - vc.x) * (py - vc.y)) / (vn.y - vc.y) + vc.x
    ) {
      collision = !collision;
    }
  }
  return collision;
}
