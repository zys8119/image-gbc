"use strict";
exports.__esModule = true;
exports.arePointsCollinear = void 0;
/**
 * 判断是否是线段
 * @param points
 */
function arePointsCollinear(points) {
    if (points.length < 3) {
        // 至少需要三个点才能形成一条直线
        return false;
    }
    // 计算前两个点的向量
    var vectorX = points[1][0] - points[0][0];
    var vectorY = points[1][1] - points[0][1];
    // 遍历后续的点，检查它们是否在同一直线上
    for (var i = 2; i < points.length; i++) {
        var currentVectorX = points[i][0] - points[0][0];
        var currentVectorY = points[i][1] - points[0][1];
        // 如果两个向量不成比例，说明点不共线
        if (vectorX * currentVectorY !== vectorY * currentVectorX) {
            return false;
        }
    }
    return true;
}
exports.arePointsCollinear = arePointsCollinear;
exports["default"] = arePointsCollinear;
