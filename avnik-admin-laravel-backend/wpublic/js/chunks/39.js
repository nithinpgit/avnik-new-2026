(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./resources/js/ApiServer/GlobalLink.js":
/*!**********************************************!*\
  !*** ./resources/js/ApiServer/GlobalLink.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var apiDomain = '';
var FileManagerPath = '';

if (false) {} else {
  if (window.location.origin == "http://localhost:8000") {
    apiDomain = "http://localhost:8000/";
    FileManagerPath = "http://localhost/avnikreact/";
  } else {
    apiDomain = "".concat(window.location.origin, "/");
    FileManagerPath = "".concat(window.location.origin, "/");
  }
}

var GlobalLink = /*#__PURE__*/function () {
  function GlobalLink() {
    _classCallCheck(this, GlobalLink);
  }

  _createClass(GlobalLink, null, [{
    key: "FileManagerPathURL",
    value: function FileManagerPathURL() {
      return FileManagerPath;
    }
  }, {
    key: "ApiDomainPathURL",
    value: function ApiDomainPathURL() {
      return apiDomain;
    }
  }, {
    key: "UserProfileId",
    value: function UserProfileId(ProfileId) {
      return "profile/".concat(ProfileId);
    }
  }]);

  return GlobalLink;
}();

/* harmony default export */ __webpack_exports__["default"] = (GlobalLink);

/***/ }),

/***/ "./resources/js/components/Pagination/Pagination.js":
/*!**********************************************************!*\
  !*** ./resources/js/components/Pagination/Pagination.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Pagination = /*#__PURE__*/function () {
  function Pagination() {
    _classCallCheck(this, Pagination);
  }

  _createClass(Pagination, [{
    key: "NextPageURl",
    value: function NextPageURl(nextPage) {
      var next_page_url = nextPage != null ? nextPage.split('?page=')[1] : null;
      next_page_url = next_page_url != null ? "?page=".concat(parseInt(next_page_url)) : '';
      console.log(next_page_url);
      return next_page_url;
    }
  }, {
    key: "PreviewsPageURL",
    value: function PreviewsPageURL(previewsPage) {
      var prev_page_url = previewsPage != null ? previewsPage.split('?page=')[1] : null;
      prev_page_url = prev_page_url != null ? "?page=".concat(parseInt(prev_page_url)) : '';
      return prev_page_url;
    }
  }, {
    key: "CurrentPageURL",
    value: function CurrentPageURL(currentPage) {
      var current_page_url = currentPage != null ? currentPage.split('?page=')[1] : null;
      current_page_url = current_page_url != null ? "?page=".concat(parseInt(current_page_url)) : '';
      return current_page_url;
    }
  }]);

  return Pagination;
}();

/* harmony default export */ __webpack_exports__["default"] = (new Pagination());

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/EventFileUpload/EventFilesUploadPoup.jsx":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/EventFileUpload/EventFilesUploadPoup.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../ApiServer/FileManager/FileManagerService */ "./resources/js/ApiServer/FileManager/FileManagerService.js");
/* harmony import */ var _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../ApiServer/GlobalLink */ "./resources/js/ApiServer/GlobalLink.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Pagination_Pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../Pagination/Pagination */ "./resources/js/components/Pagination/Pagination.js");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var EventFilesUploadPoup = function EventFilesUploadPoup() {
  var _state$AuthUserFiles, _state$AuthUserFiles$, _state$AuthUserFiles2;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      AuthUserFiles = _useState2[0],
      setAuthUserFiles = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      eventSelectedFiles = _useState4[0],
      setEventSelectedFiles = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      eventCheckBoxSelectedFiles = _useState6[0],
      setEventCheckBoxSelectedFiles = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState8 = _slicedToArray(_useState7, 2),
      eventFiles = _useState8[0],
      setEventFiles = _useState8[1];

  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState10 = _slicedToArray(_useState9, 2),
      eventFileMangerURL = _useState10[0],
      setEventFileMangerURL = _useState10[1];

  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState12 = _slicedToArray(_useState11, 2),
      FileUploadError = _useState12[0],
      setFileUploadError = _useState12[1];

  var _useState13 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState14 = _slicedToArray(_useState13, 2),
      isLoading = _useState14[0],
      setIsLoading = _useState14[1];

  var _useState15 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isModalClose = _useState16[0],
      setIsModalClose = _useState16[1];

  var _useState17 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState18 = _slicedToArray(_useState17, 2),
      isChecked = _useState18[0],
      setIsChecked = _useState18[1];

  var _useState19 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState20 = _slicedToArray(_useState19, 2),
      nextPage = _useState20[0],
      setNextPage = _useState20[1];

  var _useState21 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState22 = _slicedToArray(_useState21, 2),
      loadMore = _useState22[0],
      setLoadMore = _useState22[1];

  var _useState23 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState24 = _slicedToArray(_useState23, 2),
      noMore = _useState24[0],
      setNoMore = _useState24[1];

  var _useState25 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState26 = _slicedToArray(_useState25, 2),
      upload = _useState26[0],
      setUpload = _useState26[1];

  var _useState27 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState28 = _slicedToArray(_useState27, 2),
      choose = _useState28[0],
      setChoose = _useState28[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {// getAuthUserFilesMangerData();
  }, []); // get all file of Current user 

  var getAuthUserFilesMangerData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var data, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = {
                url: 'api/fileManager/'
              };
              _context.next = 3;
              return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_2__["default"].authUserFileService(data);

            case 3:
              response = _context.sent;

              if (response.data.status === 200) {
                dispatch({
                  type: 'AuthUserFiles',
                  payload: {
                    Type: 'AuthUserFiles',
                    AuthUserFiles: response.data.data
                  }
                });
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getAuthUserFilesMangerData() {
      return _ref.apply(this, arguments);
    };
  }(); // handle Multiple File Select From Input


  function handleFileUpload(e) {
    setEventSelectedFiles(e.target.files);
    setIsModalClose(false);
  } // Load More Files  


  var PaginationFile = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var authPaginateUserFiles, response;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setLoadMore(true);

              if (!(nextPage != null)) {
                _context2.next = 18;
                break;
              }

              authPaginateUserFiles = {
                token: localStorage.getItem('accessToken'),
                url: "api/fileManager/".concat(nextPage)
              };
              _context2.next = 5;
              return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_2__["default"].authUserFileService(authPaginateUserFiles);

            case 5:
              response = _context2.sent;

              if (!(response.data.status == 200)) {
                _context2.next = 15;
                break;
              }

              if (response.data.data.data.length > 0) {
                console.log([].concat(_toConsumableArray(AuthUserFiles), [response.data.data.data]), "response");
                dispatch({
                  type: 'AuthUserFiles',
                  payload: {
                    Type: 'AuthUserFiles',
                    AuthUserFiles: [].concat(_toConsumableArray(state.AuthUserFiles), [response.data.data.data])
                  }
                });
              }

              if (!response.data.data.next_page_url) {
                _context2.next = 13;
                break;
              }

              setNextPage(_Pagination_Pagination__WEBPACK_IMPORTED_MODULE_6__["default"].NextPageURl(response.data.data.next_page_url));
              setLoadMore(false);
              _context2.next = 15;
              break;

            case 13:
              setNoMore(true);
              return _context2.abrupt("return", toastr["error"]("No more Files"));

            case 15:
              if (response.data.status == "failed") {
                setLoadMore(false);
              }

              _context2.next = 20;
              break;

            case 18:
              setIsLoading(false);
              return _context2.abrupt("return", toastr["error"]("No more Files"));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function PaginationFile(_x) {
      return _ref2.apply(this, arguments);
    };
  }(); // Uploading Multiple Files


  var uploadFormHandel = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
      var form_data, _iterator, _step, file, response, _eventFiles, files, i;

      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              event.preventDefault();
              setIsLoading(true);

              if (!(eventSelectedFiles.length === 0)) {
                _context3.next = 5;
                break;
              }

              setIsLoading(false);
              return _context3.abrupt("return", toastr["error"]("No any file selected"));

            case 5:
              form_data = new FormData();
              _iterator = _createForOfIteratorHelper(eventSelectedFiles);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  file = _step.value;
                  form_data.append('files[]', file, file.name);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              _context3.prev = 8;
              _context3.next = 11;
              return axios.post(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["default"].multipleFileUploadUrl(), form_data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/json',
                  authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_5__["default"].getAccessToken())
                },
                onUploadProgress: function onUploadProgress(progressEvent) {
                  if (progressEvent.lengthComputable) {
                    var ProgressBar = parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total));
                    dispatch({
                      type: 'fileUploadProgress',
                      payload: {
                        Type: 'fileUploadProgress',
                        fileUploadProgress: ProgressBar
                      }
                    });

                    if (ProgressBar == 100) {
                      setTimeout(function () {
                        dispatch({
                          type: 'fileUploadProgress',
                          payload: {
                            Type: 'fileUploadProgress',
                            fileUploadProgress: 0
                          }
                        });
                      }, 2000);
                    }
                  }
                }
              });

            case 11:
              response = _context3.sent;

              if (response && response.data && response.data.status == 200) {
                _eventFiles = [];

                if (_eventFiles && _eventFiles.length > 0) {
                  _eventFiles = _eventFiles;

                  if (response && response.data && response.data.data.length > 0) {
                    files = response.data.data;

                    for (i = 0; i < files.length; i++) {
                      _eventFiles.push(files[i]);
                    }
                  }
                } else {
                  _eventFiles = response.data.data;
                } // eventFiles = [...eventFiles,...{eventFileCostType:'free',eventFileCost:0}];


                setEventFiles(_eventFiles);
                setIsLoading(false);
                setIsModalClose(true);
                setEventSelectedFiles([]);
                dispatch({
                  type: 'eventFileIds',
                  payload: {
                    Type: 'eventFileIds',
                    eventFileIds: [].concat(_toConsumableArray(state.eventFileIds), _toConsumableArray(_eventFiles))
                  }
                });
                toastr["success"](response.data.message);
                console.log(response.data, _eventFiles);
              }

              if (response.data == "failed") {
                toastr["success"](response.data.message);
              }

              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](8);
              return _context3.abrupt("return", false);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[8, 16]]);
    }));

    return function uploadFormHandel(_x2) {
      return _ref3.apply(this, arguments);
    };
  }(); // File manager File Selected 


  function fileManagerFileHandel(e, event) {
    setIsModalClose(false);

    if (eventCheckBoxSelectedFiles.find(function (find) {
      return parseInt(find.id) == parseInt(event.id);
    })) {
      setEventCheckBoxSelectedFiles(eventCheckBoxSelectedFiles.filter(function (find) {
        return find.id != event.id;
      }));
      console.log("yes alerdy exist");
    } else {
      console.log("yes new ");
      setEventCheckBoxSelectedFiles(eventCheckBoxSelectedFiles.push(event));
    }

    console.log(e, event, 'eventsClick', eventCheckBoxSelectedFiles); // setEventCheckBoxSelectedFiles([...eventCheckBoxSelectedFiles, event]);
    // dispatch({type:'eventFileIds',payload:{Type:'eventFileIds',eventFileIds: eventCheckBoxSelectedFiles }});
  } // Click to send parent 


  function fileManagerFile() {
    setIsModalClose(true);
    setEventCheckBoxSelectedFiles([]);
    dispatch({
      type: 'eventFileIds',
      payload: {
        Type: 'eventFileIds',
        eventFileIds: [].concat(_toConsumableArray(state.eventFileIds), _toConsumableArray(eventCheckBoxSelectedFiles))
      }
    });
  }

  function fileChooseUploadFun(up, ch) {
    setUpload(up);
    setChoose(ch);
  }

  var File = function File(props) {
    // onChange={(e)=>fileManagerFileHandel(props.id,props)}
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "selected-img-video-ck active"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "file_url",
      id: "event-file".concat(props.id + 1),
      defaultChecked: isChecked,
      value: props.id,
      onChange: function onChange(e) {
        return fileManagerFileHandel(e.target.value, props);
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: "myCheckbox".concat(props.id + 1)
    }, props.type != 'mp4' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: props.src,
      loading: "lazy",
      alt: props.alt
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      title: props.name
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/video-camera.png"),
      loading: "lazy",
      style: {
        padding: '25px'
      },
      alt: props.name
    })))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade cmn-modal file-manager-popup",
    id: "event-file-sys",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog",
    role: "document",
    style: {
      left: "170px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "File Manager"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-default-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "ah-tab-item",
    "data-ah-tab-active": upload,
    onClick: function onClick(e) {
      return fileChooseUploadFun(true, false);
    },
    href: "#"
  }, "Upload"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: uploadFormHandel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": upload
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "insert-files-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "choose-images-video-icons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/loader.gif"),
    loading: "lazy",
    alt: "loader",
    width: "100"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/choose-images-video-icons.svg"),
    loading: "lazy",
    alt: "video/image"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "file-upload",
    style: {
      minWidth: '395px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "file-input",
    type: "file",
    onChange: handleFileUpload,
    name: "files",
    multiple: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-subtitle"
  }, eventSelectedFiles.length > 0 ? eventSelectedFiles.length + ' File/s Selected' : 'Please choose images / video file(s) from your system'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "insert-btn"
  }, isModalClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    "data-dismiss": "modal"
  }, "Close") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn"
  }, "Insert"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": choose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "image-video-list"
  }, ((_state$AuthUserFiles = state.AuthUserFiles) === null || _state$AuthUserFiles === void 0 ? void 0 : (_state$AuthUserFiles$ = _state$AuthUserFiles.data) === null || _state$AuthUserFiles$ === void 0 ? void 0 : _state$AuthUserFiles$.length) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list",
    style: {
      maxHeight: '371px',
      overflow: 'overlay'
    }
  }, (_state$AuthUserFiles2 = state.AuthUserFiles) === null || _state$AuthUserFiles2 === void 0 ? void 0 : _state$AuthUserFiles2.data.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(File, {
      key: res.id,
      type: res.type,
      id: res.id,
      file_path: res.file_path,
      file_url: res.file_url,
      src: _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_3__["default"].FileManagerPathURL() + '/' + res.file_url,
      name: res.name,
      date_time: res.date_time,
      size: res.size,
      alt: res.name
    });
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-folder-o"
  }), " Empty")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "insert-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    disabled: loadMore,
    onClick: loadMore ? function () {
      return toastr["error"]("No more Files");
    } : PaginationFile,
    className: "btn default-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-refresh"
  }), noMore ? "No More Files" : "Load More", " "), isModalClose ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    "data-dismiss": "modal"
  }, "Close") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    onClick: fileManagerFile
  }, "Insert")))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(EventFilesUploadPoup));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/StepFour.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/StepFour.jsx ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-spinners/PuffLoader */ "./node_modules/react-spinners/PuffLoader.js");
/* harmony import */ var react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _EventFileUpload_EventFilesUploadPoup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventFileUpload/EventFilesUploadPoup */ "./resources/js/components/screens/CreateEvent/Components/Modal/EventFileUpload/EventFilesUploadPoup.jsx");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var StepFour = function StepFour(_ref) {
  var _state$eventFileIds, _state$eventFileIds2;

  var resetFormState = _ref.resetFormState,
      removeSetFiles = _ref.removeSetFiles,
      handleFormSubmit = _ref.handleFormSubmit;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  function onFilePriceChange(value, file) {
    console.log(this);
    var files = state.eventFileIds;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['eventFileCost'] = value;
    }

    dispatch({
      type: 'eventFileIds',
      payload: {
        Type: 'eventFileIds',
        eventFileIds: files
      }
    });
  }

  function onFileDescChange(value, file) {
    var files = state.eventFileIds;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['eventFileDescription'] = value;
    }

    dispatch({
      type: 'eventFileIds',
      payload: {
        Type: 'eventFileIds',
        eventFileIds: files
      }
    });
  }

  function eventFileCostType(value, file) {
    var files = state.eventFileIds;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['eventFileCostType'] = value;
      files[index]['eventFileCost'] = 1;
    }

    dispatch({
      type: 'eventFileIds',
      payload: {
        Type: 'eventFileIds',
        eventFileIds: files
      }
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "create-my-event-step-5-popup",
    tabIndex: "-1",
    "aria-labelledby": "myModalLabel2",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, false ? /*#__PURE__*/undefined : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    onClick: function onClick() {
      return resetFormState();
    },
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-4-popup",
    className: "btn link-btn float-left f-u-back-btn",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-arrow-left-line-icon"
  }), " Back"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body input-bdr-btm calender-files-upload"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    className: "c-f-u-heading"
  }, "Upload Files")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "upload-paid-files"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "file-upload",
    "data-toggle": "modal",
    "data-target": "#event-file-sys"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"], "/public/assets/images/upload-files-icon.svg"),
    alt: ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-subtitle"
  }, "Add a File (maximum file size 20mb)")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "u-p-files-list uploading-file-bx"
  }, state.fileUploadProgress > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "action-editable",
    "data-title": "Action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "file-type-name"
  }, "pdf"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(state.fileUploadProgress, "%")
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn cricle-icon-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-list review-events-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "u-p-files-list up-files-dis-cost"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "custom-table"
  }, (_state$eventFileIds = state.eventFileIds) === null || _state$eventFileIds === void 0 ? void 0 : _state$eventFileIds.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: index,
      className: "c-table-row cmn-new-toggle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fm-file-name-editable",
      "data-title": "Event Details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "file-type-title-icon"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "file-type-name"
    }, res.type), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, res.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fm-size-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, res.size)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fm-source-editable text-right",
      "data-title": "Write Review"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text text-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "cmn-ul-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn link-btn ".concat(res !== null && res !== void 0 && res.eventFileCost && res !== null && res !== void 0 && res.eventFileDescription ? '' : 'pulse-effect-btn'),
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"], "/public/assets/images/dis-n-cost-icon.svg"),
      title: "Edit Cost",
      alt: "Edit Cost"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn link-btn",
      onClick: function onClick() {
        return removeSetFiles(res.id);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "files-cost-form-".concat(res.id),
      className: "write-review-content-bx new-toggle-dropdown",
      style: {
        display: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cost-editable",
      "data-title": "Cost"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "form-control custom-select-bx",
      name: "eventFileCostType",
      onChange: function onChange(e) {
        return eventFileCostType(e.target.value, res);
      },
      style: {
        width: "75px"
      },
      value: res === null || res === void 0 ? void 0 : res.eventFileCostType
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "free"
    }, " Free"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "paid"
    }, " Paid")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "input-u-f-bx input-u-f-price-bx w-100",
      style: (res === null || res === void 0 ? void 0 : res.eventFileCostType) == 'free' ? {
        display: 'none'
      } : {
        display: 'block'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      style: {
        padding: '9px 30px 9px 10px'
      },
      min: "0",
      max: "1000",
      className: "form-control",
      placeholder: "$ Enter Price...",
      onChange: function onChange(e) {
        return onFilePriceChange(e.target.value, res);
      },
      value: res.eventFileCost
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "description-editable",
      "data-title": "Description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "input-u-f-bx input-u-f-dis-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "textarea",
      className: "form-control",
      placeholder: "Enter File description...",
      onChange: function onChange(e) {
        return onFileDescChange(e.target.value, res);
      },
      value: res.eventFileDescription
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cost-dic-btns"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn link-btn",
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, "Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn default-btn",
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, "Save"))))));
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step-line-bdr"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "complited"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "complited"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-4-popup",
    className: "btn default-btn float-left",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    onClick: function onClick(e) {
      return handleFormSubmit(e);
    },
    disabled: ((_state$eventFileIds2 = state.eventFileIds) === null || _state$eventFileIds2 === void 0 ? void 0 : _state$eventFileIds2.length) > 0 && state.eventFileIds.filter(function (resF) {
      return (resF === null || resF === void 0 ? void 0 : resF.eventFileDescription) == '';
    }).length > 0 ? true : false,
    className: "btn default-btn float-right"
  }, "Finish"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventFileUpload_EventFilesUploadPoup__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(StepFour));

/***/ }),

/***/ "./resources/js/utility/UtilityFunctions.js":
/*!**************************************************!*\
  !*** ./resources/js/utility/UtilityFunctions.js ***!
  \**************************************************/
/*! exports provided: showHideDiv, isValidURL, timeConverter, eventDetailsUrl, FindHoursMinutes, millisecondsConvert, convertMinutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showHideDiv", function() { return showHideDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidURL", function() { return isValidURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeConverter", function() { return timeConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventDetailsUrl", function() { return eventDetailsUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindHoursMinutes", function() { return FindHoursMinutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "millisecondsConvert", function() { return millisecondsConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertMinutes", function() { return convertMinutes; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);


function showHideDiv(ele) {
  var srcElement = document.getElementById(ele);

  if (srcElement != null) {
    if (srcElement.style.display == "block") {
      srcElement.style.display = "none";
    } else {
      srcElement.style.display = "block";
    }

    return false;
  }
}

function timeConverter(value, string) {
  var Duration = "0h 0min";

  if (string) {
    var Hour = value.split(":")[0] > 1 ? parseInt(value.split(":")[0]) + " h" : parseInt(value.split(":")[0]) > 0 ? " ".concat(parseInt(value.split(":")[0])) + " h" : "";
    var Minutes = value.split(":")[1] > 1 ? " ".concat(parseInt(value.split(":")[1])) + " min" : parseInt(value.split(":")[1]) > 0 ? " ".concat(parseInt(value.split(":")[1])) + " min" : "";
    Duration = Hour + Minutes;
    return Duration;
  } else {
    var seconds = value;
    var duration = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(seconds, "minutes");
    var formatted = duration.format("hh:mm:ss");
    return formatted;
  }
}

function convertMinutes(minutes) {
  if (minutes === null || minutes == 0 || isNaN(minutes)) return "Undefined";
  var h = Math.trunc(minutes / 60);
  var m = minutes % 60;
  var hDisplay = h > 0 ? h + (h === 1 ? " Hr " : " Hr ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " Min " : " Min ") : "";
  return hDisplay + mDisplay;
}

function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res !== null;
}

function eventDetailsUrl(eventId, eventToken, slotId) {
  if (eventId && eventToken && slotId) {
    return "/event?token=".concat(eventToken, "&event=").concat(eventId, "&slot=").concat(slotId);
  } else {
    return "/event?token=".concat(eventToken, "&event=").concat(eventId);
  }
}

function FindHoursMinutes(minutes) {
  //create duration object from moment.duration
  var duration = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(minutes, "minutes"); //calculate hours

  var hh = duration.years() * (365 * 24) + duration.months() * (30 * 24) + duration.days() * 24 + duration.hours(); //get minutes

  var mm = duration.minutes(); //return total time in hh:mm format

  return hh + ":" + mm;
}

function millisecondsConvert(ms) {
  var days = Math.floor(ms / (24 * 60 * 60 * 1000));
  var daysms = ms % (24 * 60 * 60 * 1000);
  var hours = Math.floor(daysms / (60 * 60 * 1000));
  var hoursms = ms % (60 * 60 * 1000);
  var minutes = Math.floor(hoursms / (60 * 1000));
  var minutesms = ms % (60 * 1000);
  var sec = Math.floor(minutesms / 1000);
  return days + ":" + hours + ":" + minutes + ":" + sec;
}



/***/ })

}]);