(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[36],{

/***/ "./resources/js/ApiServer/TimeZoneJSON/TimeZone.js":
/*!*********************************************************!*\
  !*** ./resources/js/ApiServer/TimeZoneJSON/TimeZone.js ***!
  \*********************************************************/
/*! exports provided: default, TimeZoneOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeZoneOffset", function() { return TimeZoneOffset; });
var moment = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");

var tz = moment.tz.guess();
var TimeZon = moment().tz(tz);
var TimeZone = tz; // const TimeZoneOffset=TimeZon;  

var TimeZoneOffset = moment().tz(TimeZone).format('Z');
/* harmony default export */ __webpack_exports__["default"] = (TimeZone);


/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var JoinRequestContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext('');
/* harmony default export */ __webpack_exports__["default"] = (JoinRequestContext);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Constants/FormValidation/FormValidation.jsx":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Constants/FormValidation/FormValidation.jsx ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FormValidation = /*#__PURE__*/function () {
  function FormValidation() {
    _classCallCheck(this, FormValidation);
  }

  _createClass(FormValidation, [{
    key: "formValidation",
    value: function formValidation(FormData) {
      if (FormData) {}

      return true;
    }
  }, {
    key: "FormValidationStepTwo",
    value: function FormValidationStepTwo(data) {
      var _data$SelectedStartDa;

      if (data.eventTitle) {
        return true;
      } else if (((_data$SelectedStartDa = data.SelectedStartDate) === null || _data$SelectedStartDa === void 0 ? void 0 : _data$SelectedStartDa.length) > 0) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return FormValidation;
}();

/* harmony default export */ __webpack_exports__["default"] = (new FormValidation());

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/CreateEventPage.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/CreateEventPage.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Navbar/Navbar */ "./resources/js/components/Navbar/Navbar.jsx");
/* harmony import */ var _Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Filter/FilterPopup */ "./resources/js/components/Filter/FilterPopup.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _Pages_CreateEventReducer_CreateEventReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/CreateEventReducer/CreateEventReducer */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventReducer/CreateEventReducer.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ApiServer_TimeZoneJSON_TimeZone__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../ApiServer/TimeZoneJSON/TimeZone */ "./resources/js/ApiServer/TimeZoneJSON/TimeZone.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var _Constants_FormValidation_FormValidation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Constants/FormValidation/FormValidation */ "./resources/js/components/screens/CreateEvent/Constants/FormValidation/FormValidation.jsx");
/* harmony import */ var _ApiServer_CreateEvent_CreateEventService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../ApiServer/CreateEvent/CreateEventService */ "./resources/js/ApiServer/CreateEvent/CreateEventService.js");
/* harmony import */ var _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Errors/ValidationError/FormError */ "./resources/js/components/screens/CreateEvent/Errors/ValidationError/FormError.jsx");
/* harmony import */ var _Components_Join_JoinRequestContext_JoinRequestContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Components/Join/JoinRequestContext/JoinRequestContext */ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














 // import StepOne from "./Components/Modal/StepOne";
// import StepTwo from "./Components/Modal/StepTwo";
// import StepThree from "./Components/Modal/StepThree";
// import StepFour from "./Components/Modal/StepFour";
// import StepFive from "./Components/Modal/StepFive";

var CreateEventPageSection = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(7), __webpack_require__.e(11), __webpack_require__.e(30), __webpack_require__.e(40)]).then(__webpack_require__.bind(null, /*! ./Pages/CreateEventPageSection */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventPageSection.jsx"));
});
var StepOne = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() */ 54).then(__webpack_require__.bind(null, /*! ./Components/Modal/StepOne */ "./resources/js/components/screens/CreateEvent/Components/Modal/StepOne.jsx"));
});
var StepTwo = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(13), __webpack_require__.e(38)]).then(__webpack_require__.bind(null, /*! ./Components/Modal/StepTwo */ "./resources/js/components/screens/CreateEvent/Components/Modal/StepTwo.jsx"));
});
var StepThree = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(12), __webpack_require__.e(5), __webpack_require__.e(37)]).then(__webpack_require__.bind(null, /*! ./Components/Modal/StepThree */ "./resources/js/components/screens/CreateEvent/Components/Modal/StepThree.jsx"));
});
var StepFour = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(5), __webpack_require__.e(39)]).then(__webpack_require__.bind(null, /*! ./Components/Modal/StepFour */ "./resources/js/components/screens/CreateEvent/Components/Modal/StepFour.jsx"));
});
var StepFive = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() */ 53).then(__webpack_require__.bind(null, /*! ./Components/Modal/StepFive */ "./resources/js/components/screens/CreateEvent/Components/Modal/StepFive.jsx"));
}); // import JoinRequestPopup from "./Components/Join/JoinRequestPopup";


var JoinRequestPopup = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(26), __webpack_require__.e(48)]).then(__webpack_require__.bind(null, /*! ./Components/Join/JoinRequestPopup */ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestPopup.jsx"));
});
var InviteUser = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() */ 27).then(__webpack_require__.bind(null, /*! ./Components/Modal/InviteUser/InviteUser */ "./resources/js/components/screens/CreateEvent/Components/Modal/InviteUser/InviteUser.jsx"));
});
var QuickReply = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return __webpack_require__.e(/*! import() */ 45).then(__webpack_require__.bind(null, /*! ./Components/Modal/QuickReply/QuickReply */ "./resources/js/components/screens/CreateEvent/Components/Modal/QuickReply/QuickReply.jsx"));
});
var initialState = {
  sunday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Sunday" ? true : false,
  monday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Monday" ? true : false,
  tuesday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Tuesday" ? true : false,
  wednesday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Wednesday" ? true : false,
  thursday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Thursday" ? true : false,
  friday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Friday" ? true : false,
  saturday: moment__WEBPACK_IMPORTED_MODULE_6___default.a.utc().format("dddd") === "Saturday" ? true : false,
  ChangeTime: {
    time: moment__WEBPACK_IMPORTED_MODULE_6___default()().format('DD-MM-YYYY HH:mm:ss'),
    index: 0,
    type: 'none'
  },
  ConflictsEvents: [{
    title: "events1",
    dateTime: moment__WEBPACK_IMPORTED_MODULE_6___default()(),
    cost: '50'
  }, {
    title: "events2",
    dateTime: moment__WEBPACK_IMPORTED_MODULE_6___default()(),
    cost: '51'
  }],
  AuthUserFiles: [],
  eventTitle: "",
  TimeOverlapped: false,
  TimeOverlappedIndex: [-1, -1],
  TimeOverlappedIndexSave: 0,
  EventTimeZone: _ApiServer_TimeZoneJSON_TimeZone__WEBPACK_IMPORTED_MODULE_8__["TimeZoneOffset"],
  SelectedStartDate: [],
  SelectedEndDate: [],
  eventSingleDate: moment__WEBPACK_IMPORTED_MODULE_6___default()().format("DD-MM-YYYY"),
  SelectedStartTime: ["".concat(moment__WEBPACK_IMPORTED_MODULE_6___default()(moment__WEBPACK_IMPORTED_MODULE_6___default()(), "hh:mm A").format("hh:mm"))],
  SelectedEndTime: [],
  SelectWebinarType: "",
  showEventsOnCalendar: [],
  eventVisibility: "public",
  eventDuration: "00:15",
  eventDurationSlots: [],
  eventCostType: "free",
  eventRepeat: false,
  eventRepeatSave: false,
  eventRepeatBy: "",
  eventRepeatDays: [],
  eventCostSelect: false,
  eventSelectedDays: [],
  eventTillDate: moment__WEBPACK_IMPORTED_MODULE_6___default()().add(15, "days").format("YYYY-MM-DD"),
  repeatNumber: 1,
  eventAutoParticipants: false,
  eventCategory: "Category",
  eventSubCategory: "SubCategory",
  eventDescription: "",
  eventFileDescription: "",
  eventFileCost: 0,
  eventFileIds: [],
  eventTags: [],
  eventTag: "",
  eventImages: [],
  eventFiles: [],
  parentCategories: [],
  childCategories: [],
  eventCost: [],
  eventSeats: [],
  eventDiscount: "",
  eventFileUploaded: false,
  formValidation: false,
  formStep: 0,
  fileUploadProgress: 0,
  formSubmit: false,
  joinRequestContext: "",
  eventSelectedFiles: [],
  eventCropedImage: "",
  eventCropedUrl: "",
  eventFileMangerURL: [],
  FileUploadError: false,
  isLoading: false,
  isModalClose: false,
  isChecked: false,
  nextPage: "",
  loadMore: false,
  noMore: false,
  upload: true,
  choose: false,
  RightCalendarWeekDates: "",
  Appointments: "Appointment - You will have all the controls and will be able to pass the controls to the participant. You can take back the controls any time you wish during the meeting.",
  Training: "Training - You will have all the controls and will be able to pass the controls to the participants, However they will not be able to pass the controls to anyone else. You can take back the controls any time you wish during the meeting.",
  Webinar: "Webinar - You will have all the controls, however passing the controls to another participant is not allowed.",
  Discussion: "Discussion - You will have all the controls and will be able to pass the controls to the participants. Participants will be able to pass controls to anybody in the room. However you can take back control any time you wish."
};

var CreateEventPage = function CreateEventPage() {
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_Pages_CreateEventReducer_CreateEventReducer__WEBPACK_IMPORTED_MODULE_5__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1]; // useEffect onload data 


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getCategories();
    return function () {
      dispatch({
        type: "getCategories",
        payload: {
          Type: "getCategories",
          parentCategories: []
        }
      });
      resetFormState();
    };
  }, []); // Get Parent or Child Categories Array[] for event create

  var getCategories = function getCategories() {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_9__["ApiService"].parentCategories().then(function (res) {
      if (res.data.status === 200) {
        dispatch({
          type: "getCategories",
          payload: {
            Type: "getCategories",
            parentCategories: res.data.data
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  }; // end categories
  // onchange Calender


  var onChangeCalendar = function onChangeCalendar(newDate) {
    if (moment__WEBPACK_IMPORTED_MODULE_6___default()(newDate, "DD-MM-YYYY") >= moment__WEBPACK_IMPORTED_MODULE_6___default()(moment__WEBPACK_IMPORTED_MODULE_6___default()(), "DD-MM-YYYY")) {
      dispatch({
        type: "ChangeCalendar",
        payload: {
          Type: "ChangeCalendar",
          eventSingleDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(newDate).format("DD-MM-YYYY"),
          SelectedStartDate: [moment__WEBPACK_IMPORTED_MODULE_6___default()(newDate).format("DD-MM-YYYY")],
          SelectedEndDate: [moment__WEBPACK_IMPORTED_MODULE_6___default()(newDate).format("DD-MM-YYYY")],
          SelectedCalendarDate: newDate
        }
      });
    } else {
      dispatch({
        type: "ChangeCalendar",
        payload: {
          Type: "ChangeCalendar",
          eventSingleDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(newDate).format("DD-MM-YYYY"),
          SelectedCalendarDate: newDate
        }
      }); // toastr["error"]('Please select a date & time greater than current date & time');
    }
  }; // on Drag select


  var onDragSelect = function onDragSelect(newTime) {
    console.log(newTime, moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.startStr).format("YYYY-MM-DD HH:mm:ss Z"));
    resetFormState();
    var dateCheck = moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.startStr) >= moment__WEBPACK_IMPORTED_MODULE_6___default()();

    if (dateCheck) {
      var startTime = moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start).format("HH:mm:ss a");
      var endTime = moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.end).format("HH:mm:ss a");
      var duration = moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.endStr).diff(moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.startStr), 'minutes');
      var findDates = _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_10__["default"].findDaysBetweenTwoDates(newTime.start, newTime.end);

      if (moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.endStr).diff(moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.startStr), 'Hours') > 6) {
        toastr["error"]('maximum event duration 6 hour only');
      } else {
        console.log(duration, 'duariton crate event ');

        if ((findDates === null || findDates === void 0 ? void 0 : findDates.length) > 0) {
          dispatch({
            type: "onDragSelect",
            payload: {
              Type: "onDragSelect",
              SelectedStartDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.end) > moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start) ? [moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start).format('DD-MM-YYYY')] : findDates,
              SelectedEndDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.end) > moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start) ? [moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.end).format('DD-MM-YYYY')] : findDates,
              eventSingleDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start).format("DD-MM-YYYY"),
              repeatNumber: findDates.length > 1 ? findDates === null || findDates === void 0 ? void 0 : findDates.length : 0,
              eventDurationSlots: [{
                startDateTime: moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start).format("DD-MM-YYYY HH:mm:ss"),
                endDateTime: moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.end).format("DD-MM-YYYY HH:mm:ss"),
                cost: 0,
                eventCostType: "free",
                eventDuration: duration,
                seats: 1,
                interval: 0
              }]
            }
          });
        } else {
          dispatch({
            type: "eventSingleDate",
            payload: {
              Type: "eventSingleDate",
              eventSingleDate: [moment__WEBPACK_IMPORTED_MODULE_6___default()(newTime.start).format("MM-DD-YYYY")],
              eventDuration: duration
            }
          });
        }

        $("#create-my-event-popup").modal({
          backdrop: "static",
          keyboard: false
        });
      }
    } else {
      toastr["error"]("Please select a date & time greater than current date & time");
    }

    return true;
  }; // onDragSelect Function End
  // file manager handling function 


  var removeSetImage = function removeSetImage(ImageId) {
    var filteredImages = state.eventImages.filter(function (images) {
      return images.id !== ImageId;
    });
    dispatch({
      type: "eventImages",
      payload: {
        Type: "eventImages",
        eventImages: filteredImages,
        eventFiles: filteredImages
      }
    });
    toastr["error"]("File Removed");
  };

  var removeSetFiles = function removeSetFiles(ImageId) {
    var filteredFiles = state.eventFileIds.filter(function (images) {
      return images.id !== ImageId;
    });
    dispatch({
      type: "eventFileIds",
      payload: {
        Type: "eventFileIds",
        eventFileIds: filteredFiles
      }
    });
    console.log(state.eventFileIds, filteredFiles);
    toastr["error"]("File Removed");
  }; // end file manager handling functions 


  var MyEventsList = function MyEventsList() {
    if (state.RightCalendarWeekDates) {
      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_9__["ApiService"]._myEvents(state.RightCalendarWeekDates).then(function (res) {
        if (res.data.status == 200) {
          var _res$data$data, _res$data$data2;

          var eventsPush = [];
          (_res$data$data = res.data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.Create.map(function (res, index) {
            eventsPush.push({
              title: res.eventTitle,
              rememberToken: res.rememberToken,
              startTime: moment__WEBPACK_IMPORTED_MODULE_6___default()("".concat(res.startDate, " ").concat(res.startTime), "YYYY-MM-DD  HH:mm").format("DD-MM-YYYY HH:mm"),
              endTime: moment__WEBPACK_IMPORTED_MODULE_6___default()("".concat(res.endDate, " ").concat(res.endTime), "YYYY-MM-DD  HH:mm").format("DD-MM-YYYY HH:mm"),
              date: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate + res.startTime, "YYYY-MM-DD  HH:mm")),
              eventId: res.id,
              id: res.slotId,
              host: 1,
              startDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate, "YYYY-MM-DD "),
              start: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate + res.startTime, "YYYY-MM-DD HH:mm")),
              end: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.endDate + res.endTime, "YYYY-MM-DD HH:mm")),
              description: res.description,
              backgroundColor: "#F9A03E"
            });
          });
          var BookedEvents = [];
          (_res$data$data2 = res.data.data) === null || _res$data$data2 === void 0 ? void 0 : _res$data$data2.Booked.map(function (res, index) {
            BookedEvents.push({
              title: res.eventTitle,
              rememberToken: res.rememberToken,
              startTime: moment__WEBPACK_IMPORTED_MODULE_6___default()("".concat(res.startDate, " ").concat(res.startTime), "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm"),
              endTime: moment__WEBPACK_IMPORTED_MODULE_6___default()("".concat(res.endDate, " ").concat(res.endTime), "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm"),
              date: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate + res.startTime, "YYYY-MM-DD HH:mm")),
              eventId: res.id,
              id: res.slotId,
              host: 0,
              startDate: moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate, "YYYY-MM-DD"),
              start: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.startDate + res.startTime, "YYYY-MM-DD HH:mm")),
              end: new Date(moment__WEBPACK_IMPORTED_MODULE_6___default()(res.endDate + res.endTime, "YYYY-MM-DD HH:mm")),
              description: res.description,
              backgroundColor: "#4AC7B9"
            });
          });
          dispatch({
            type: "showEventsOnCalendar",
            payload: {
              Type: "showEventsOnCalendar",
              showEventsOnCalendar: [].concat(eventsPush, BookedEvents)
            }
          });
        }
      })["catch"](function (error) {
        return console.log(error);
      });
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    MyEventsList();
    return function () {};
  }, [state.RightCalendarWeekDates]);

  var JoinRequestPopupHandling = function JoinRequestPopupHandling(SlotId) {
    $("#join-request-popup").modal({
      backdrop: "static",
      keyboard: false
    });

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_9__["ApiService"]._joiningRequestPop(SlotId).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: "joinRequestContext",
          payload: {
            Type: "joinRequestContext",
            joinRequestContext: res.data.data
          }
        });
      }

      if (res.data.status == "failed") {}
    })["catch"](function (error) {
      console.log(error);
    });
  }; // Submit Form


  var handleFormSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var formData, response, _response$data$valida, _response$data$valida2, _response$data$valida3, _response$data$valida4, _response$data$valida5, _response$data$valida6, _response$data$valida7, _response$data$valida8, _response$data$valida9, _response$data$valida10, _response$data$valida11, _response$data$valida12, _response$data$valida13, _response$data$valida14, _response$data$valida15, _response$data$valida16, _response$data$valida17, _response$data$valida18, _response$data$valida19, ErrorEventTitle, ErrorEventDescription, ErrorEventCost, ErrorEventCostType, ErrorEventCategory, ErrorEventSubCategory, ErrorEventType, ErrorEventFiles, ErrorEventImages, ErrorEventTags, ErrorEventStartTime, ErrorEventEndTime, ErrorEventEndDate, ErrorEventStartDate, ErrorEventVisibility, ErrorEventRepeatNumber, ErrorEventDiscount, ErrorEventDuration, ErrorEventFileDescription;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();

              if (!_Constants_FormValidation_FormValidation__WEBPACK_IMPORTED_MODULE_11__["default"].formValidation(state)) {
                _context.next = 11;
                break;
              }

              dispatch({
                type: "formSubmit",
                payload: {
                  Type: "formSubmit",
                  formSubmit: true
                }
              });
              formData = {
                eventTitle: state.eventTitle,
                eventTimeZone: state.EventTimeZone,
                eventType: state.SelectWebinarType,
                eventStartDate: state.SelectedStartDate,
                eventEndDate: state.SelectedEndDate,
                eventStartTime: state.SelectedStartTime,
                eventEndTime: state.SelectedEndTime,
                eventAutoParticipants: state.eventAutoParticipants,
                eventCategory: state.eventCategory,
                eventDurationSlots: state.eventDurationSlots,
                eventCost: state.eventCost,
                eventCostType: state.eventCostType,
                eventDescription: state.eventDescription,
                eventDiscount: state.eventDiscount,
                eventDuration: state.eventDuration,
                eventFileCost: state.eventFileCost,
                eventFileDescription: state.eventFileDescription,
                eventImages: state.eventImages,
                eventFiles: state.eventFileIds,
                eventRepeat: state.eventRepeat,
                eventRepeatBy: state.eventRepeatBy,
                eventRepeatDays: state.eventRepeatDays,
                eventSubCategory: state.eventSubCategory,
                eventTags: state.eventTags,
                eventTillDate: state.eventTillDate,
                eventVisibility: state.eventVisibility,
                repeatNumber: state.repeatNumber,
                tz: moment__WEBPACK_IMPORTED_MODULE_6___default.a.tz.guess()
              };
              _context.next = 6;
              return _ApiServer_CreateEvent_CreateEventService__WEBPACK_IMPORTED_MODULE_12__["default"].PostCreateEventService(formData);

            case 6:
              response = _context.sent;

              if (response.data.status === 200) {
                toastr["success"](response.data.message);
                $("#create-my-event-step-6-popup").modal({
                  backdrop: "static",
                  keyboard: false
                });
                resetFormState();
                MyEventsList();
              }

              if (response.data.status === "failed") {
                dispatch({
                  type: "formSubmit",
                  payload: {
                    Type: "formSubmit",
                    formSubmit: false
                  }
                });
                ErrorEventTitle = (_response$data$valida = response.data.validation_error) === null || _response$data$valida === void 0 ? void 0 : _response$data$valida.eventTitle;
                ErrorEventDescription = (_response$data$valida2 = response.data.validation_error) === null || _response$data$valida2 === void 0 ? void 0 : _response$data$valida2.eventDescription;
                ErrorEventCost = (_response$data$valida3 = response.data.validation_error) === null || _response$data$valida3 === void 0 ? void 0 : _response$data$valida3.eventCost;
                ErrorEventCostType = (_response$data$valida4 = response.data.validation_error) === null || _response$data$valida4 === void 0 ? void 0 : _response$data$valida4.eventCostType;
                ErrorEventCategory = (_response$data$valida5 = response.data.validation_error) === null || _response$data$valida5 === void 0 ? void 0 : _response$data$valida5.eventCategory;
                ErrorEventSubCategory = (_response$data$valida6 = response.data.validation_error) === null || _response$data$valida6 === void 0 ? void 0 : _response$data$valida6.eventSubCategory;
                ErrorEventType = (_response$data$valida7 = response.data.validation_error) === null || _response$data$valida7 === void 0 ? void 0 : _response$data$valida7.eventType;
                ErrorEventFiles = (_response$data$valida8 = response.data.validation_error) === null || _response$data$valida8 === void 0 ? void 0 : _response$data$valida8.eventFiles;
                ErrorEventImages = (_response$data$valida9 = response.data.validation_error) === null || _response$data$valida9 === void 0 ? void 0 : _response$data$valida9.eventImages;
                ErrorEventTags = (_response$data$valida10 = response.data.validation_error) === null || _response$data$valida10 === void 0 ? void 0 : _response$data$valida10.eventTags;
                ErrorEventStartTime = (_response$data$valida11 = response.data.validation_error) === null || _response$data$valida11 === void 0 ? void 0 : _response$data$valida11.eventStartTime;
                ErrorEventEndTime = (_response$data$valida12 = response.data.validation_error) === null || _response$data$valida12 === void 0 ? void 0 : _response$data$valida12.eventEndTime;
                ErrorEventEndDate = (_response$data$valida13 = response.data.validation_error) === null || _response$data$valida13 === void 0 ? void 0 : _response$data$valida13.eventEndDate;
                ErrorEventStartDate = (_response$data$valida14 = response.data.validation_error) === null || _response$data$valida14 === void 0 ? void 0 : _response$data$valida14.eventStartDate;
                ErrorEventVisibility = (_response$data$valida15 = response.data.validation_error) === null || _response$data$valida15 === void 0 ? void 0 : _response$data$valida15.eventVisibility;
                ErrorEventRepeatNumber = (_response$data$valida16 = response.data.validation_error) === null || _response$data$valida16 === void 0 ? void 0 : _response$data$valida16.repeatNumber;
                ErrorEventDiscount = (_response$data$valida17 = response.data.validation_error) === null || _response$data$valida17 === void 0 ? void 0 : _response$data$valida17.eventDiscount;
                ErrorEventDuration = (_response$data$valida18 = response.data.validation_error) === null || _response$data$valida18 === void 0 ? void 0 : _response$data$valida18.eventDuration;
                ErrorEventFileDescription = (_response$data$valida19 = response.data.validation_error) === null || _response$data$valida19 === void 0 ? void 0 : _response$data$valida19.eventFileDescription;

                if (ErrorEventFileDescription) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventFileDescription);
                }

                if (ErrorEventImages) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventImages);
                }

                if (ErrorEventVisibility) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventVisibility);
                }

                if (ErrorEventDiscount) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventDiscount);
                }

                if (ErrorEventDuration) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventDuration);
                }

                if (ErrorEventRepeatNumber) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventRepeatNumber);
                }

                if (ErrorEventTitle) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventTitle);
                }

                if (ErrorEventDescription) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventDescription);
                }

                if (ErrorEventCost) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventCost);
                }

                if (ErrorEventCostType) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventCostType);
                }

                if (ErrorEventCategory) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventCategory);
                }

                if (ErrorEventSubCategory) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventSubCategory);
                }

                if (ErrorEventType) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventType);
                }

                if (ErrorEventFiles) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventFiles);
                }

                if (ErrorEventTags) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventTags);
                }

                if (ErrorEventStartTime) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventStartTime);
                }

                if (ErrorEventEndTime) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventEndTime);
                }

                if (ErrorEventEndDate) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventEndDate);
                }

                if (ErrorEventStartDate) {
                  _Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_13__["default"].responseValidationError(ErrorEventStartDate);
                }
              }

              _context.next = 12;
              break;

            case 11:
              toastr["error"]("form validation failed");

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleFormSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var value = state;

  var CheckIsValue = function CheckIsValue(_ref2) {
    var host = _ref2.host,
        dots = _ref2.dots;
    return dots ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "cmn-ul-list calendar-dots"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, host == 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-i-p-bx "
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0")) : host == 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-i-p-bx d-i-green calendar-dots-green"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0")) : host == 3 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-i-p-bx d-i-blue calendar-dots-blue"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0")) : "")) : "";
  };

  var CalenderDots = function CalenderDots(_ref3) {
    var _state$showEventsOnCa, _state$showEventsOnCa2, _state$showEventsOnCa3;

    var date = _ref3.date,
        view = _ref3.view;
    // this?.events?.find(res=>console.log(moment(res.date,'DD-MM-YYYY').format('DD-MM-YYYY'),moment(date).format('DD-MM-YYYY')));
    if (view == "month") return (_state$showEventsOnCa = state.showEventsOnCalendar) !== null && _state$showEventsOnCa !== void 0 && _state$showEventsOnCa.find(function (res) {
      return moment__WEBPACK_IMPORTED_MODULE_6___default()(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") == moment__WEBPACK_IMPORTED_MODULE_6___default()(date).format("DD-MM-YYYY") && res.host === 1;
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CheckIsValue, {
      host: 1,
      dots: true
    }) : (_state$showEventsOnCa2 = state.showEventsOnCalendar) !== null && _state$showEventsOnCa2 !== void 0 && _state$showEventsOnCa2.find(function (res) {
      return moment__WEBPACK_IMPORTED_MODULE_6___default()(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") == moment__WEBPACK_IMPORTED_MODULE_6___default()(date).format("DD-MM-YYYY") && res.host === 0;
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CheckIsValue, {
      host: 0,
      dots: true
    }) : (_state$showEventsOnCa3 = state.showEventsOnCalendar) !== null && _state$showEventsOnCa3 !== void 0 && _state$showEventsOnCa3.find(function (res) {
      return moment__WEBPACK_IMPORTED_MODULE_6___default()(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") == moment__WEBPACK_IMPORTED_MODULE_6___default()(date).format("DD-MM-YYYY") && res.host === 0 && res.host === 1;
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CheckIsValue, {
      host: 3,
      dots: true
    }) : "";
    return;
  }; // reset State of the createEvent 


  var resetFormState = function resetFormState() {
    return dispatch({
      type: "Reset",
      payload: initialState
    });
  };

  console.log(state.eventDurationSlots, state, "createEvent main page");
  var StateValue = [state, dispatch, resetFormState, onChangeCalendar, onDragSelect, removeSetImage, removeSetFiles, MyEventsList, JoinRequestPopupHandling, handleFormSubmit, CalenderDots];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: StateValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "calender-events"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CreateEventPageSection, {
    resetFormState: resetFormState
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StepOne, {
    resetFormState: resetFormState
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StepTwo, {
    resetFormState: resetFormState
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StepThree, {
    resetFormState: resetFormState,
    removeSetImage: removeSetImage
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StepFour, {
    resetFormState: resetFormState,
    handleFormSubmit: handleFormSubmit,
    removeSetFiles: removeSetFiles
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StepFive, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Join_JoinRequestContext_JoinRequestContext__WEBPACK_IMPORTED_MODULE_14__["default"].Provider, {
    value: state.joinRequestContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(JoinRequestPopup, {
    JoinUserRequest: JoinRequestPopupHandling
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InviteUser, {
    value: state
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(QuickReply, null))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(CreateEventPage));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Errors/ValidationError/FormError.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Errors/ValidationError/FormError.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FormErrors = /*#__PURE__*/function () {
  function FormErrors() {
    _classCallCheck(this, FormErrors);
  }

  _createClass(FormErrors, [{
    key: "responseValidationError",
    value: function responseValidationError(error) {
      error.map(function (res) {
        return toastr["error"](res);
      });
    }
  }]);

  return FormErrors;
}();

/* harmony default export */ __webpack_exports__["default"] = (new FormErrors());

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CreateEventContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (CreateEventContext);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Pages/CreateEventReducer/CreateEventReducer.js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Pages/CreateEventReducer/CreateEventReducer.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreateEventReducer = function CreateEventReducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case payload.Type:
      return _objectSpread(_objectSpread({}, state), payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (CreateEventReducer);

/***/ })

}]);