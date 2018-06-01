"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _ip = _interopRequireDefault(require("ip"));

var _uaParserJs = _interopRequireDefault(require("ua-parser-js"));

var userAgentParser = new _uaParserJs.default();
var isMobileDevice = typeof window !== 'undefined' && userAgentParser.getDevice().type === 'mobile';
var isTabletDevice = typeof window !== 'undefined' && userAgentParser.getDevice().type === 'tablet';

var _default = function _default() {
  var device;

  if (isMobileDevice) {
    device = 'mobile';
  } else if (isTabletDevice) {
    device = 'tablet';
  } else {
    device = 'desktop';
  }

  return {
    key: _uuid.default.v4(),
    ip: _ip.default.address(),
    custom: {
      browser: userAgentParser.getResult().browser.name,
      device: device
    }
  };
};

exports.default = _default;