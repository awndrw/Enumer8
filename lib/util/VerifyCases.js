"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var types = ['string', 'number', 'boolean'];

var VerifyCases = function VerifyCases(caseArray) {
  var cases, type;

  switch (_typeof(caseArray[0])) {
    case 'string':
    case 'number':
    case 'boolean':
      if (caseArray.forEach(function (c) {
        return types.includes(_typeof(c));
      })) throw new Error('Enumer8 currently only supports string, number, and boolean values');
      cases = caseArray;
      type = 'array';
      break;

    case 'object':
      if (caseArray.length > 1) throw new Error('Individual values cannot be enumerated if an object/array is present');

      if (Array.isArray(caseArray[0])) {
        cases = VerifyCases(caseArray[0]).cases;
        type = VerifyCases(caseArray[0]).type;
      } else {
        cases = caseArray[0];
        type = 'object';
      }

      break;

    default:
      throw new Error('Enumer8 currently only supports string, number, and boolean values');
  }

  return {
    cases: cases,
    type: type
  };
};

var _default = VerifyCases;
exports.default = _default;
//# sourceMappingURL=VerifyCases.js.map