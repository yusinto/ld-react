"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withFlagProvider", {
  enumerable: true,
  get: function get() {
    return _withFlagProvider.default;
  }
});
Object.defineProperty(exports, "withFlags", {
  enumerable: true,
  get: function get() {
    return _withFlags.default;
  }
});
Object.defineProperty(exports, "ldClient", {
  enumerable: true,
  get: function get() {
    return _initLDClient.ldClient;
  }
});

require("@babel/polyfill");

var _withFlagProvider = _interopRequireDefault(require("./withFlagProvider"));

var _withFlags = _interopRequireDefault(require("./withFlags"));

var _initLDClient = require("./initLDClient");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }