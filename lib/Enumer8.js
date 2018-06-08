"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _fix = _interopRequireDefault(require("./util/fix"));

var _makeCase = _interopRequireDefault(require("./makeCase"));

var _VerifyCases2 = _interopRequireDefault(require("./util/VerifyCases"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONFIG = Symbol('CONFIG'),
    CASES = Symbol('CASES'),
    FROZEN = Symbol('FROZEN');
/**
 * @const {Config} Default Enum Configuration
 * @private
 */

var DEFAULTS = {
  type: false,
  freeze: false,
  ignoreCase: false
  /**
   * Enumeration Class
   * @class Enum
   */

};
var _Symbol$iterator = Symbol.iterator;

var Enum =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Enum.
   * @param {Config|RawTypes} [config={}]
   * @memberof Enum
   */
  function Enum() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Enum);

    this[_Symbol$iterator] = function () {
      return _this.cases[Symbol.iterator]();
    };

    this.pushCase = function (id, rawValue) {
      var newCase = (0, _makeCase.default)(id, rawValue, _this[CONFIG].type, _this.cases.length);
      _this[id] = newCase;
      _this.cases[id] = _this[CONFIG].type ? newCase : id;
    };

    switch (_typeof(config)) {
      case 'object':
        this[CONFIG] = (0, _lodash.default)({}, DEFAULTS, config);
        break;

      case 'string':
        this[CONFIG] = (0, _lodash.default)({}, DEFAULTS, {
          type: config
        });
        break;

      default:
        throw new Error('Unknown configuration recieved');
    }

    return this;
  }
  /**
   * Enumerates the case(s) passed into the function
   * @param {...caseTypes} Case A string, array of strings, or object to enumerate
   * @return {Enum}
   */


  _createClass(Enum, [{
    key: "case",
    value: function _case() {
      var _this2 = this;

      if (this[FROZEN]) throw new Error('Cases cannot be added after the enumeration is frozen.');

      for (var _len = arguments.length, Case = new Array(_len), _key = 0; _key < _len; _key++) {
        Case[_key] = arguments[_key];
      }

      var _VerifyCases = (0, _VerifyCases2.default)(Case),
          cases = _VerifyCases.cases,
          type = _VerifyCases.type;

      if (_typeof(cases) !== 'object') throw new Error('UNKNOWN TYPE?');

      switch (type) {
        case 'array':
          if ((0, _fix.default)(this[CONFIG].type)) throw new Error('Type cannot be enforced when raw values are not present');else {
            this[CONFIG].type = 'string';
            cases.forEach(function (c) {
              return _this2.pushCase(c);
            });
          }
          break;

        case 'object':
          if (!this[CONFIG].type) throw new Error('Type must be configured to use enumeration cases with raw values');
          Object.keys(cases).forEach(function (c) {
            return _this2.pushCase(c, cases[c]);
          });
          break;

        default:
          throw new Error('UNKNOWN TYPE?');
      }

      if (this[CONFIG].freeze) this[FROZEN] = true;
      return this;
    }
    /**
     * Returns the enumerated property with a specified value
     * @param {*} value The value to find in the enumeration
     * @returns {EnumCase}
     */

  }, {
    key: "findVal",
    value: function findVal(value) {
      return this.cases.find(function (c) {
        return c.rawValue === value;
      });
    }
    /** Freezes the enumeration */

  }, {
    key: "freeze",
    value: function freeze() {
      this[FROZEN] = true;
    }
    /**
     * Returns whether or not the enumeration is frozen
     * @returns {boolean}
     */

  }, {
    key: "isFrozen",
    value: function isFrozen() {
      return this[FROZEN];
    }
    /**
     * Get all enumerated values
     * @return {Array}
     */

  }, {
    key: "cases",
    get: function get() {
      this[CASES] = this[CASES] || [];
      return this[CASES];
    }
    /** Allows for the iteration of cases */

  }]);

  return Enum;
}();

exports.default = Enum;