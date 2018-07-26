"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initLDClient = exports.ldClient = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime/core-js/promise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash.camelcase"));

var _ldclientJs = _interopRequireDefault(require("ldclient-js"));

var _initUser = _interopRequireDefault(require("./initUser"));

var ldClient;
exports.ldClient = ldClient;

var initLDClient =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(clientSideId) {
    var user,
        options,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _args.length > 1 && _args[1] !== undefined ? _args[1] : (0, _initUser.default)();
            options = _args.length > 2 ? _args[2] : undefined;
            exports.ldClient = ldClient = _ldclientJs.default.initialize(clientSideId, user, options);
            _context.next = 5;
            return new _promise.default(function (resolve) {
              return ldClient.on('ready', function () {
                var rawFlags = ldClient.allFlags();
                var flags = {};

                for (var rawFlag in rawFlags) {
                  var camelCasedKey = (0, _lodash.default)(rawFlag);
                  flags[camelCasedKey] = rawFlags[rawFlag];
                }

                resolve(flags);
              });
            });

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initLDClient(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.initLDClient = initLDClient;
var _default = initLDClient;
exports.default = _default;