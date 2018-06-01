"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initLDClient = exports.ldClient = void 0;

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

var _ldclientJs = _interopRequireDefault(require("ldclient-js"));

var _initUser = _interopRequireDefault(require("./initUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var ldClient;
exports.ldClient = ldClient;

var initLDClient =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(clientSideId) {
    var user,
        options,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _args.length > 1 && _args[1] !== undefined ? _args[1] : (0, _initUser.default)();
            options = _args.length > 2 ? _args[2] : undefined;
            exports.ldClient = ldClient = _ldclientJs.default.initialize(clientSideId, user, options);
            _context.next = 5;
            return new Promise(function (resolve) {
              return ldClient.on('ready', function () {
                var rawFlags = ldClient.allFlags();
                var flags = {};

                for (var rawFlag in rawFlags) {
                  var camelCasedKey = (0, _camelCase.default)(rawFlag);
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