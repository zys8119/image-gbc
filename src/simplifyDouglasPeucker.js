"use strict";
exports.__esModule = true;
function simplifyDouglasPeucker(points, tolerance) {
    if (points.length <= 2) {
        return points;
    }
    // Find the point with the maximum distance
    var maxDistance = 0;
    var maxIndex = 0;
    for (var i = 1; i < points.length - 1; i++) {
        var distance = perpendicularDistance(points[i], points[0], points[points.length - 1]);
        if (distance > maxDistance) {
            maxDistance = distance;
            maxIndex = i;
        }
    }
    // If the maximum distance is greater than the tolerance, recursively simplify
    if (maxDistance > tolerance) {
        var left = simplifyDouglasPeucker(points.slice(0, maxIndex + 1), tolerance);
        var right = simplifyDouglasPeucker(points.slice(maxIndex), tolerance);
        return left.slice(0, -1).concat(right);
    }
    else {
        // If the maximum distance is within tolerance, return the start and end points
        return [points[0], points[points.length - 1]];
    }
}
function perpendicularDistance(point, lineStart, lineEnd) {
    var px = point.x, py = point.y;
    var sx = lineStart.x, sy = lineStart.y;
    var ex = lineEnd.x, ey = lineEnd.y;
    var numerator = Math.abs((ex - sx) * (sy - py) - (sx - px) * (ey - sy));
    var denominator = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2));
    return numerator / denominator;
}
exports["default"] = simplifyDouglasPeucker;
