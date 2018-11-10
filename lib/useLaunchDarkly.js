"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.camelcase"));

var _initLDClient = require("./initLDClient");

var _context2 = _interopRequireDefault(require("./context"));

var useLaunchDarkly = function useLaunchDarkly(WrappedComponent, _ref) {
  var clientSideId = _ref.clientSideId,
      user = _ref.user,
      options = _ref.options;

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      flags = _useState2[0],
      setFlags = _useState2[1];

  var subscribeToChanges = function subscribeToChanges() {
    _initLDClient.ldClient.on('change', function (changes) {
      // changes look like: {'dev-test-flag': {current: true, previous: false}, ...}
      var flattened = {};

      for (var key in changes) {
        flattened[(0, _lodash.default)(key)] = changes[key].current;
      }

      setFlags((0, _objectSpread2.default)({}, flags, flattened));
    });
  };

  (0, _react.useEffect)(
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var fetchedFlags;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _initLDClient.initLDClient)(clientSideId, user, options);

          case 2:
            fetchedFlags = _context.sent;
            setFlags((0, _objectSpread2.default)({}, fetchedFlags));
            subscribeToChanges();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })), []); // [] means run this effect only once on mount

  return _react.default.createElement(_context2.default.Provider, {
    value: flags
  }, _react.default.createElement(WrappedComponent, null));
};

var _default = useLaunchDarkly;
exports.default = _default;