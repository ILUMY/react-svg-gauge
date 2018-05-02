"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
//global unique key for every gauge (needed for SVG groups to stay separated)
var uniqueId = 0;
var Gauge = /** @class */ (function (_super) {
    __extends(Gauge, _super);
    function Gauge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._getPathValues = function (value) {
            if (value < _this.props.min)
                value = _this.props.min;
            if (value > _this.props.max)
                value = _this.props.max;
            var dx = 0;
            var dy = 0;
            var alpha = (1 - (value - _this.props.min) / (_this.props.max - _this.props.min)) * Math.PI;
            var Ro = _this.props.width / 2 - _this.props.width / 10;
            var Ri = Ro - _this.props.width / 6.666666666666667;
            var Cx = _this.props.width / 2 + dx;
            var Cy = _this.props.height / 2 + dy;
            var Xo = _this.props.width / 2 + dx + Ro * Math.cos(alpha);
            var Yo = _this.props.height - (_this.props.height - Cy) - Ro * Math.sin(alpha);
            var Xi = _this.props.width / 2 + dx + Ri * Math.cos(alpha);
            var Yi = _this.props.height - (_this.props.height - Cy) - Ri * Math.sin(alpha);
            return { alpha: alpha, Ro: Ro, Ri: Ri, Cx: Cx, Cy: Cy, Xo: Xo, Yo: Yo, Xi: Xi, Yi: Yi };
        };
        _this._getPath = function (value) {
            var _a = _this._getPathValues(value), Ro = _a.Ro, Ri = _a.Ri, Cx = _a.Cx, Cy = _a.Cy, Xo = _a.Xo, Yo = _a.Yo, Xi = _a.Xi, Yi = _a.Yi;
            var path = "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
            path += "Z ";
            return path;
        };
        return _this;
    }
    Gauge.prototype.render = function () {
        if (!this.uniqueFilterId)
            this.uniqueFilterId = "filter_" + uniqueId++;
        return (react_1["default"].createElement("svg", { height: "100%", version: "1.1", width: "100%", xmlns: "http://www.w3.org/2000/svg", style: { width: this.props.width, height: this.props.height, overflow: 'hidden', position: 'relative', left: 0, top: 0 } },
            react_1["default"].createElement("defs", null,
                react_1["default"].createElement("filter", { id: this.uniqueFilterId },
                    react_1["default"].createElement("feOffset", { dx: "0", dy: "3" }),
                    react_1["default"].createElement("feGaussianBlur", { result: "offset-blur", stdDeviation: "5" }),
                    react_1["default"].createElement("feComposite", { operator: "out", "in": "SourceGraphic", in2: "offset-blur", result: "inverse" }),
                    react_1["default"].createElement("feFlood", { floodColor: "black", floodOpacity: "0.2", result: "color" }),
                    react_1["default"].createElement("feComposite", { operator: "in", "in": "color", in2: "inverse", result: "shadow" }),
                    react_1["default"].createElement("feComposite", { operator: "over", "in": "shadow", in2: "SourceGraphic" }))),
            react_1["default"].createElement("path", { fill: this.props.backgroundColor, stroke: "none", d: this._getPath(this.props.max), filter: "url(#" + this.uniqueFilterId + ")" }),
            react_1["default"].createElement("path", { fill: this.props.color, stroke: "none", d: this._getPath(this.props.value), filter: "url(#" + this.uniqueFilterId + ")" })));
    };
    Gauge.defaultProps = {
        min: 0,
        max: 100,
        value: 40,
        width: 400,
        height: 320,
        color: '#fe0400',
        symbol: '',
        backgroundColor: "#edebeb"
    };
    return Gauge;
}(react_1["default"].Component));
exports["default"] = Gauge;
