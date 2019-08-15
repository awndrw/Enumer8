"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeCase;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function makeCase(id, val, type, index) {
  var rawValue;
  if (typeof val === 'undefined') rawValue = typeResolve(type, id, index);else if (_typeof(val) !== type) throw new TypeError("Raw value must conform to the specified type.\nRaw value: ".concat(typeof rv === "undefined" ? "undefined" : _typeof(rv), ", Expected: ").concat(type));else rawValue = val;
  return {
    id: id,
    rawValue: rawValue
  };
}

function typeResolve(type, id, index) {
  switch (type) {
    case 'string':
      return id;

    case 'number':
      return index;

    case 'boolean':
      return true;

    default:
      throw new Error('The provided type was not found!');
  }
}
//# sourceMappingURL=makeCase.js.map