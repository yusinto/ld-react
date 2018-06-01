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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _context2 = require("./context");

var _camelCase = _interopRequireDefault(require("lodash/camelCase"));

var _initLDClient = require("./initLDClient");

var _default = function _default(WrappedComponent, _ref) {
  var clientSideId = _ref.clientSideId,
      user = _ref.user,
      options = _ref.options;
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(_class2, _Component);

      function _class2() {
        var _getPrototypeOf2;

        var _temp, _this;

        (0, _classCallCheck2.default)(this, _class2);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(_class2)).call.apply(_getPrototypeOf2, [this].concat(args))), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
          flags: {}
        }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "subscribeToChanges", function () {
          _initLDClient.ldClient.on('change', function (changes) {
            // changes look like: {'dev-test-flag': {current: true, previous: false}, ...}
            var flattened = {};

            for (var key in changes) {
              flattened[(0, _camelCase.default)(key)] = changes[key].current;
            }

            var flags = (0, _objectSpread2.default)({}, _this.state.flags, flattened);

            _this.setState({
              flags: flags
            });
          });
        }), _temp));
      }

      (0, _createClass2.default)(_class2, [{
        key: "componentDidMount",
        value: function () {
          var _componentDidMount = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee() {
            var flags;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _initLDClient.initLDClient)(clientSideId, user, options);

                  case 2:
                    flags = _context.sent;
                    this.setState({
                      flags: flags
                    }); //eslint-disable-line

                    this.subscribeToChanges();

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function componentDidMount() {
            return _componentDidMount.apply(this, arguments);
          };
        }()
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(_context2.Provider, {
            value: this.state.flags
          }, _react.default.createElement(WrappedComponent, this.props));
        }
      }]);
      return _class2;
    }(_react.Component)
  );
};

exports.default = _default;