"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _context = _interopRequireDefault(require("./context"));

var _default = function _default() {
  return (0, _react.useContext)(_context.default);
};

exports.default = _default;