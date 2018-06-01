"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

var withFlags = function withFlags(Component) {
  return function (props) {
    return _react.default.createElement(_context.Consumer, null, function (flags) {
      return _react.default.createElement(Component, (0, _extends2.default)({
        flags: flags
      }, props));
    });
  };
};

var _default = withFlags;
exports.default = _default;