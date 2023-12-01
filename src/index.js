"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.imageGbc = void 0;
var use_canvas_image_1 = require("use-canvas-image");
var arePointsCollinear_1 = require("./arePointsCollinear");
var simplifyDouglasPeucker_1 = require("./simplifyDouglasPeucker");
var lodash_1 = require("lodash");
var imageGbc = function (src, options) {
    return __awaiter(this, void 0, void 0, function () {
        var pxs, pxsMap, getZwPx, isBJ, pxsResultsMap, pxsResults, pxsLine, pxsLineMap, curr, calcNextCurr, newPxsLine, dots, tolerance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pxs = [];
                    pxsMap = new Map();
                    return [4 /*yield*/, (0, use_canvas_image_1["default"])(src, function (e) {
                            pxs.push(e);
                            pxsMap.set([e.x, e.y].join(), e);
                        }, options)];
                case 1:
                    _a.sent();
                    getZwPx = function (x, y) { return [
                        [x - 1, y - 1],
                        [x, y - 1],
                        [x + 1, y - 1],
                        [x - 1, y],
                        [x + 1, y],
                        [x - 1, y + 1],
                        [x, y + 1],
                        [x + 1, y + 1],
                    ]; };
                    isBJ = function (_a) {
                        var x = _a.x, y = _a.y, canvasWidth = _a.canvasWidth, canvasHeight = _a.canvasHeight, a = _a.a;
                        return getZwPx(x, y).some(function (e) { var _a; return ((_a = pxsMap.get(e.join())) === null || _a === void 0 ? void 0 : _a.a) === 0; }) || (a !== 0 && (y === 0 || x === 0 || x === canvasWidth - 1 || y === canvasHeight - 1));
                    };
                    pxsResultsMap = new Map();
                    pxsResults = pxs.filter(function (e) {
                        if (e.a !== 0 && isBJ(e)) {
                            pxsResultsMap.set([e.x, e.y].join(), e);
                            return true;
                        }
                    });
                    pxsLine = [];
                    pxsLineMap = new Map();
                    curr = null;
                    calcNextCurr = function (e) {
                        var x = e.x, y = e.y;
                        var ps = getZwPx(x, y).map(function (e) { return pxsResultsMap.get(e.join()); }).filter(function (e) { return e && !pxsLineMap.get([e.x, e.y].join()); });
                        return ps[0] || e;
                    };
                    pxsResults.forEach(function (e, k) {
                        if (k === 0) {
                            curr = e;
                        }
                        else {
                            curr = calcNextCurr(curr);
                        }
                        if (curr) {
                            pxsLine.push(curr);
                            pxsLineMap.set([curr.x, curr.y].join(), curr);
                        }
                    });
                    newPxsLine = [];
                    dots = [];
                    pxsLine.forEach(function (e, k) {
                        if (dots.length < 3) {
                            dots.push(e);
                        }
                        else {
                            if ((0, arePointsCollinear_1["default"])(dots.map(function (e) { return [e.x, e.y]; }))) {
                                dots.push(e);
                            }
                            else {
                                newPxsLine.push.apply(newPxsLine, dots.slice(0, dots.length - 1));
                                dots = [dots.pop()];
                            }
                        }
                    });
                    tolerance = (0, lodash_1.get)(options, 'tolerance', 0.1);
                    return [2 /*return*/, (0, simplifyDouglasPeucker_1["default"])(newPxsLine, tolerance)];
            }
        });
    });
};
exports.imageGbc = imageGbc;
exports["default"] = exports.imageGbc;
