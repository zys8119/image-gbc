function simplifyDouglasPeucker(points:Array<{
    x:number,
    y:number
}>, tolerance:number) {
    if (points.length <= 2) {
        return points;
    }

    // Find the point with the maximum distance
    let maxDistance = 0;
    let maxIndex = 0;

    for (let i = 1; i < points.length - 1; i++) {
        const distance = perpendicularDistance(points[i], points[0], points[points.length - 1]);

        if (distance > maxDistance) {
            maxDistance = distance;
            maxIndex = i;
        }
    }

    // If the maximum distance is greater than the tolerance, recursively simplify
    if (maxDistance > tolerance) {
        const left = simplifyDouglasPeucker(points.slice(0, maxIndex + 1), tolerance);
        const right = simplifyDouglasPeucker(points.slice(maxIndex), tolerance);

        return left.slice(0, -1).concat(right);
    } else {
        // If the maximum distance is within tolerance, return the start and end points
        return [points[0], points[points.length - 1]];
    }
}

function perpendicularDistance(point, lineStart, lineEnd) {
    const { x: px, y: py } = point;
    const { x: sx, y: sy } = lineStart;
    const { x: ex, y: ey } = lineEnd;

    const numerator = Math.abs((ex - sx) * (sy - py) - (sx - px) * (ey - sy));
    const denominator = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2));

    return numerator / denominator;
}

export default simplifyDouglasPeucker
