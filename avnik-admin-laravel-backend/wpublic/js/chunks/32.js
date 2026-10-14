(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

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

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);



var ConflictsEvents = function ConflictsEvents(_ref) {
  var events = _ref.events,
      id = _ref.id;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: id || 'Conflicts-Events-modal',
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "You have the following conflicting event(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row main-div-con"
  }, (events === null || events === void 0 ? void 0 : events.length) > 0 ? events.map(function (res) {
    var _res$events;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-sm-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "repeat-box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "repeat-on-bx repeat-select-date-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, res === null || res === void 0 ? void 0 : (_res$events = res.events) === null || _res$events === void 0 ? void 0 : _res$events.event_title, " ", moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : res.start_date_time).format('DD MMM YYYY , hh:mm a'), " - ", moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : res.end_date_time).format('hh:mm a'), " $", res === null || res === void 0 ? void 0 : res.cost))))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, " There is no conflict events")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "main-button-con"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "btn default-btn ",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, "Ok"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ConflictsEvents);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Components/CreateEventFileUploadPopUp.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Components/CreateEventFileUploadPopUp.jsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_CreateEvent_CreateEventService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ApiServer/CreateEvent/CreateEventService */ "./resources/js/ApiServer/CreateEvent/CreateEventService.js");
/* harmony import */ var _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ApiServer/FileManager/FileManagerService */ "./resources/js/ApiServer/FileManager/FileManagerService.js");
/* harmony import */ var _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ApiServer/GlobalLink */ "./resources/js/ApiServer/GlobalLink.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _CustomeCroppie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomeCroppie */ "./resources/js/components/screens/EditEvents/Components/CustomeCroppie.jsx");
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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










var CreateEventFileUploadPopUp = function CreateEventFileUploadPopUp(props) {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var handleDispatchState = function handleDispatchState(name, value) {
    dispatch({
      type: name,
      payload: {
        Type: name,
        name: value
      }
    });

    if (name == 'isModalClose') {
      $('#edit-presenter-btn').modal('hide');
    }
  }; // handle Multiple File Select From Input
  //    const handleFileUpload=(e)=>{
  //         dispatch({type:'eventSelectedFiles',payload:{Type:'eventSelectedFiles',eventSelectedFiles:e.target.files,isModalClose: false}});
  //     }
  // Uploading Multiple Files


  var uploadFormHandel = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function uploadFormHandel(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var noMore = state.noMore,
      loadMore = state.loadMore,
      isModalClose = state.isModalClose,
      eventFiles = state.eventFiles,
      isLoading = state.isLoading,
      isChecked = state.isChecked; // const File = (props) => {
  //     return (
  //     <li>
  //         <div className="selected-img-video-ck active">
  //             <input type="checkbox" name="file_url" id={`event-files${props.id+1}`} defaultChecked={isChecked} value={props.id}  onChange={(e)=>fileManagerFileHandel(e,props)} />
  //             <label htmlFor={`myCheckbox${props.id+1}`} >
  //                 {props.type!='mp4'?<img src={props.src} alt={props.alt}/>:
  //                     <p title={props.name}>                        
  //                         <img src={`${FileManagerPath}/public/assets/images/video-camera.png`} style={{padding:'25px'}} alt={props.name} />
  //                     </p>
  //                 }
  //             </label>
  //         </div>
  //     </li>
  //     )
  // }

  var onCropImage = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(obj) {
      var form_data, response, _eventFiles, files, i;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch({
                type: 'eventCropedImage',
                payload: {
                  Type: 'eventCropedImage',
                  eventCropedImage: obj
                }
              });
              handleDispatchState(isLoading, true);

              if (!(obj == null)) {
                _context2.next = 5;
                break;
              }

              handleDispatchState("isLoading", false);
              return _context2.abrupt("return", toastr["error"]("No any file selected"));

            case 5:
              form_data = new FormData(); // for (const file of state.eventSelectedFiles) {

              form_data.append('files[]', obj); // }

              _context2.next = 9;
              return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_3__["default"].multipleFileUploadService(form_data);

            case 9:
              response = _context2.sent;

              if (response && response.data && response.data.status == 200) {
                _eventFiles = [];

                if (state.eventFiles && state.eventFiles.length > 0) {
                  _eventFiles = state.eventFiles;

                  if (response && response.data && response.data.data.length > 0) {
                    files = response.data.data;

                    for (i = 0; i < files.length; i++) {
                      _eventFiles.push(files[i]);
                    }
                  }
                } else {
                  _eventFiles = response.data.data;
                }

                dispatch({
                  type: 'afterResponse',
                  payload: {
                    Type: 'afterResponse',
                    isLoading: false,
                    event_files: [].concat(_toConsumableArray(state.event_files), _toConsumableArray(_eventFiles)),
                    isModalClose: true,
                    eventCropedUrl: '',
                    eventCropedImage: '',
                    eventSelectedFiles: []
                  }
                });
                toastr["success"](response.data.message);
                $('#edit-presenter-btn').modal('hide');
              }

              if (response.data == "failed") {
                toastr["error"](response.data.message);
              }

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function onCropImage(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  console.log(state, 'upload popup create event UPPOP');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade cmn-modal file-manager-popup ce-iv-upload-popup",
    id: "edit-presenter-btn",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-close-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: uploadFormHandel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "insert-files-bx pt-0 pb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "choose-images-video-icons"
  }, state.isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"], "/public/assets/images/loader.gif"),
    alt: "loader",
    width: "100"
  })) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CustomeCroppie__WEBPACK_IMPORTED_MODULE_6__["default"], {
    options: {
      showZoomer: true,
      enableOrientation: true,
      // mouseWheelZoom: "ctrl",
      enableResize: false,
      viewport: {
        width: 400,
        height: 225 // type:"square",

      },
      boundary: {
        width: 415,
        height: 415
      }
    },
    size: {
      width: 1280,
      height: 720
    },
    buttonClass: "btn default-btn",
    onCrop: onCropImage,
    value: state.eventCropedUrl
  }))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(CreateEventFileUploadPopUp));

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Components/CustomeCroppie.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Components/CustomeCroppie.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var croppie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! croppie */ "./node_modules/croppie/croppie.js");
/* harmony import */ var croppie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(croppie__WEBPACK_IMPORTED_MODULE_1__);


var c;

var CropperModal = function CropperModal(_ref) {
  var options = _ref.options,
      size = _ref.size,
      onCrop = _ref.onCrop,
      value = _ref.value,
      buttonText = _ref.buttonText,
      buttonClass = _ref.buttonClass;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var croppie = document.getElementById('croppie-container');
    c = new croppie__WEBPACK_IMPORTED_MODULE_1___default.a(croppie, options);
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if ((value === null || value === void 0 ? void 0 : value.length) > 0) {
      handleCropping(value);
    }
  }, [value]);

  var rotate = function rotate(deg) {
    c.rotate(deg);
  };

  var handleCropping = function handleCropping(input) {
    var reader = new FileReader();
    var file = input[0];
    reader.readAsDataURL(file);

    reader.onload = function () {
      c.bind({
        url: reader.result
      });
    };

    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  var handleCropper = function handleCropper(e) {
    e.preventDefault();

    if ((value === null || value === void 0 ? void 0 : value.length) > 0) {
      c.result({
        type: "blob",
        format: "jpeg",
        size: size
      }).then(function (base64) {
        var file = new File([base64], "".concat((Math.random() + 1).toString(36).substring(7) + new Date().getTime(), ".jpeg"));
        onCrop(file);
      });
      c.result('base64').then(function (base64) {
        console.log(base64);
      });
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleCropper,
    id: "croppie"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "r-l-rotate-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "croppie-box ".concat((value === null || value === void 0 ? void 0 : value.length) > 0 ? 'd-block' : 'd-none')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "croppie-container"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "r-l-rotate-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "".concat((value === null || value === void 0 ? void 0 : value.length) > 0 ? 'd-block' : 'd-none')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: buttonClass || "btn btn-default rotate-btn",
    disabled: (value === null || value === void 0 ? void 0 : value.length) > 0 ? false : true,
    onClick: function onClick() {
      return rotate(90);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-rotate-left"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: buttonClass || "btn btn-default rotate-btn",
    disabled: (value === null || value === void 0 ? void 0 : value.length) > 0 ? false : true,
    onClick: function onClick() {
      return rotate(-90);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-rotate-right"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "both-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    disabled: (value === null || value === void 0 ? void 0 : value.length) > 0 ? false : true,
    className: buttonClass || "btn btn-default"
  }, buttonText || 'Crop'))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CropperModal);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Components/EditRepeat/EditRepeat.jsx":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Components/EditRepeat/EditRepeat.jsx ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../screens/CreateEvent/Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-multi-date-picker */ "./node_modules/react-multi-date-picker/build/index.js");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-multi-date-picker/plugins/date_panel */ "./node_modules/react-multi-date-picker/plugins/date_panel.js");
/* harmony import */ var react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var EditRepeat = function EditRepeat() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      repeatNumberError = _useState2[0],
      setRepeatNumberError = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      eventTillDateError = _useState4[0],
      setEventTillDateError = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState6 = _slicedToArray(_useState5, 2),
      chooseDateError = _useState6[0],
      setChooseDateError = _useState6[1];

  var WeekDaysObject = [{
    shortName: 'S',
    fullName: 'Sunday',
    day: 0
  }, {
    shortName: 'M',
    fullName: 'Monday',
    day: 1
  }, {
    shortName: 'T',
    fullName: 'Tuesday',
    day: 2
  }, {
    shortName: 'W',
    fullName: 'Wednesday',
    day: 3
  }, {
    shortName: 'T',
    fullName: 'Thursday',
    day: 4
  }, {
    shortName: 'F',
    fullName: 'Friday',
    day: 5
  }, {
    shortName: 'S',
    fullName: 'Saturday',
    day: 6
  }];

  var onRepeatChange = function onRepeatChange(re, eve, choose) {
    setRepeatNumberError(re);
    setEventTillDateError(eve);
    setChooseDateError(choose);
  };

  function repeatValidation() {
    if ((state === null || state === void 0 ? void 0 : state.event_repeat_type) == "Weeks") {
      if (parseInt(state === null || state === void 0 ? void 0 : state.event_repeat_interval) > 0) {
        $('#edit-repeat-event-popup').modal('hide');
        dispatch({
          type: 'eventRepeatSave',
          payload: {
            Type: 'eventRepeatSave',
            eventRepeatSave: true
          }
        });
      } else {
        toastr["error"]('please enter repeat number grater then 0');
      }
    } else if ((state === null || state === void 0 ? void 0 : state.event_repeat_type) == "TillDate") {
      if (state.event_till_date) {
        $('#edit-repeat-event-popup').modal('hide');
        dispatch({
          type: 'eventRepeatSave',
          payload: {
            Type: 'eventRepeatSave',
            eventRepeatSave: true
          }
        });
      } else {
        toastr["error"]('sorry you have,t selected any TillDate');
      }
    } else if ((state === null || state === void 0 ? void 0 : state.event_repeat_type) == "MultipleDate") {
      var _state$event_start_da;

      dispatch({
        type: 'eventRepeatSave',
        payload: {
          Type: 'eventRepeatSave',
          eventRepeatSave: true
        }
      });

      if (((_state$event_start_da = state.event_start_dates) === null || _state$event_start_da === void 0 ? void 0 : _state$event_start_da.length) > 0) {
        $('#edit-repeat-event-popup').modal('hide');
      }
    } else {
      $('#edit-repeat-event-popup').modal('hide');
      toastr["error"]("you are not selected any multiple option");
    }
  }

  var RepeatDays = function RepeatDays() {
    var onChangeHandel = function onChangeHandel(e, resData, toggle) {
      setTimeout(function () {
        if ((state === null || state === void 0 ? void 0 : state.event_repeat_interval) == 0 && (state === null || state === void 0 ? void 0 : state.event_repeat_type) === "Weeks") {
          dispatch({
            type: 'REP_BY_DAY',
            payload: {
              Type: 'REP_BY_DAY',
              event_repeat_days: [moment__WEBPACK_IMPORTED_MODULE_1___default()().day()]
            }
          });
        }

        if (parseInt(state === null || state === void 0 ? void 0 : state.event_repeat_interval) > 0 && (state === null || state === void 0 ? void 0 : state.event_repeat_type) === "Weeks") {
          var Weeks = state.event_repeat_days;

          if (toggle) {
            Weeks = state === null || state === void 0 ? void 0 : state.event_repeat_days.filter(function (res) {
              return res != (resData === null || resData === void 0 ? void 0 : resData.day.toString());
            });
          } else {
            Weeks = [].concat(_toConsumableArray(state === null || state === void 0 ? void 0 : state.event_repeat_days), [resData === null || resData === void 0 ? void 0 : resData.day.toString()]);
          } // dispatch({ type: 'RANDOM_TYPE', payload: { Type: 'RANDOM_TYPE',event_repeat_days:Weeks} });


          var findWeekDates = _screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].findWeeksBetweenTwoDatesDays(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD'), parseInt(state === null || state === void 0 ? void 0 : state.event_repeat_interval), Weeks, 'YYYY-MM-DD'); //   let findWeekDates= [];

          if ((findWeekDates === null || findWeekDates === void 0 ? void 0 : findWeekDates.length) > 0) {
            dispatch({
              type: 'SelectedStartDate',
              payload: {
                Type: 'SelectedStartDate',
                event_repeat_days: Weeks,
                event_start_dates: findWeekDates,
                event_end_dates: findWeekDates
              }
            });
          }

          console.log(findWeekDates, 'findDate By weeks');
        }
      }, 200);
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, WeekDaysObject.map(function (res, index) {
      var _state$event_repeat_d2;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "checkbox custom"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        onChange: function onChange(e) {
          var _state$event_repeat_d;

          return onChangeHandel(e, res, state === null || state === void 0 ? void 0 : (_state$event_repeat_d = state.event_repeat_days) === null || _state$event_repeat_d === void 0 ? void 0 : _state$event_repeat_d.find(function (find) {
            return res.day == find;
          }));
        },
        name: res === null || res === void 0 ? void 0 : res.fullName,
        defaultChecked: state === null || state === void 0 ? void 0 : (_state$event_repeat_d2 = state.event_repeat_days) === null || _state$event_repeat_d2 === void 0 ? void 0 : _state$event_repeat_d2.find(function (find) {
          return res.day == find;
        }),
        value: res === null || res === void 0 ? void 0 : res.fullName
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, res === null || res === void 0 ? void 0 : res.shortName))));
    }));
  };

  var repeatWeeksInterval = function repeatWeeksInterval(e) {
    var findWeekDates = _screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].findWeeksBetweenTwoDatesDays(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD'), parseInt(state === null || state === void 0 ? void 0 : state.event_repeat_interval), state === null || state === void 0 ? void 0 : state.event_repeat_days, 'YYYY-MM-DD');

    if (parseInt(e.target.value) > 0) {
      if (e.target.value <= 8) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            event_repeat_interval: e.target.value,
            event_start_dates: findWeekDates,
            event_end_dates: findWeekDates
          }
        });
      }
    } else {
      dispatch({
        type: e.target.name,
        payload: {
          Type: e.target.name,
          event_repeat_interval: 1,
          event_start_dates: findWeekDates,
          event_end_dates: findWeekDates
        }
      });
    }
  };

  var resetPopup = function resetPopup() {
    return dispatch({
      type: 'eventTillDate',
      payload: {
        Type: 'eventTillDate',
        eventRepeatSave: false,
        eventRepeat: false,
        event_till_date: moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'),
        repeatNumber: 1,
        eventRepeatBy: '',
        event_start_dates: [moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD')],
        event_end_dates: [moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD')]
      }
    });
  };

  var EventTillDate = function EventTillDate(e) {
    console.log(e.target.value);
    var date = _screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].editFindDaysBetweenTwoDates(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD'), e.target.value, 'YYYY-MM-DD');
    dispatch({
      type: e.target.name,
      payload: {
        Type: e.target.name,
        event_till_date: e.target.value,
        event_start_dates: date,
        event_end_dates: date,
        event_repeat_type: 'TillDate',
        repeatNumber: 1
      }
    });
  };

  var setMultipleChoose = function setMultipleChoose(e) {
    var dataObj = [];

    if ((e === null || e === void 0 ? void 0 : e.length) > 0) {
      e.map(function (res) {
        return dataObj.push(moment__WEBPACK_IMPORTED_MODULE_1___default()(res.format(), 'YYYY-MM-DD').format('YYYY-MM-DD'));
      });
    }

    dispatch({
      type: "setMultipleChoose",
      payload: {
        Type: "setMultipleChoose",
        event_start_dates: dataObj,
        event_end_dates: dataObj
      }
    });
    console.log(dataObj, e, 'res');
  }; // const multipleDateValue=[]
  // if(state.SelectedStartDate?.length>0){
  //     state.SelectedStartDate.map((res)=>
  //         multipleDateValue.push(moment(res,'YYYY-MM-DD').format('D MMM YY'))
  //     )   
  // }


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: "edit-repeat-event-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close",
    onClick: function onClick() {
      return !(state !== null && state !== void 0 && state.eventRepeatSave) && resetPopup();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event_repeat_type",
    onChange: function onChange() {
      onRepeatChange(false, true, false), dispatch({
        type: "eventRepeatBy",
        payload: {
          Type: 'eventRepeatBy',
          event_repeat_type: 'Weeks',
          event_till_date: moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'),
          event_start_dates: [],
          event_end_dates: []
        }
      });
    },
    checked: (state === null || state === void 0 ? void 0 : state.event_repeat_type) === 'Weeks' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Repeat for")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "week-day-number-select"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    className: "form-control",
    onChange: repeatWeeksInterval,
    name: "event_repeat_interval",
    placeholder: "0",
    min: "1",
    max: "8",
    title: "Repeat",
    disabled: repeatNumberError || (state === null || state === void 0 ? void 0 : state.event_repeat_type) == "Weeks" ? false : true,
    value: state === null || state === void 0 ? void 0 : state.event_repeat_interval
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: function onChange(e) {
      return dispatch({
        type: e.target.name,
        payload: {
          Type: e.target.name,
          event_repeat_type: e.target.value
        }
      });
    },
    name: "event_repeat_type",
    disabled: repeatNumberError,
    value: state === null || state === void 0 ? void 0 : state.event_repeat_type
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Weeks"
  }, (state === null || state === void 0 ? void 0 : state.event_repeat_interval) > 1 ? 'Weeks' : 'Week')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "till-date-bx"
  }, (state === null || state === void 0 ? void 0 : state.event_repeat_type) == "Weeks" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RepeatDays, null))) : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event_repeat_type",
    onChange: function onChange() {
      onRepeatChange(true, false, true);
      var date = _screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].editFindDaysBetweenTwoDates(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD'), state.event_till_date, 'YYYY-MM-DD');
      return dispatch({
        type: 'event_start_dates',
        payload: {
          Type: 'event_start_dates',
          event_repeat_type: 'TillDate',
          event_start_dates: date,
          event_end_dates: date,
          repeatNumber: 1
        }
      });
    },
    checked: (state === null || state === void 0 ? void 0 : state.event_repeat_type) === 'TillDate' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-on-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Till date")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "date",
    className: "form-control",
    onChange: EventTillDate,
    placeholder: "17 June 2020",
    disabled: eventTillDateError,
    min: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY'),
    name: "event_till_date",
    value: state.event_till_date
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event_repeat_type",
    onChange: function onChange() {
      onRepeatChange(true, true, false);
      dispatch({
        type: 'eventRepeatBy',
        payload: {
          Type: 'eventRepeatBy',
          event_repeat_type: 'MultipleDate',
          repeatNumber: 1,
          event_till_date: moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'),
          event_start_dates: [state.event_date],
          event_end_dates: [state.event_date]
        }
      });
    },
    checked: (state === null || state === void 0 ? void 0 : state.event_repeat_type) === 'MultipleDate' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-on-bx repeat-select-date-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Select date(s)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, chooseDateError ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    disabled: true
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default.a, {
    multiple: true,
    mapDays: function mapDays(_ref) {
      var date = _ref.date;
      if (moment__WEBPACK_IMPORTED_MODULE_1___default()(date.format(), "YYYY-MM-DD").format('YYYY-MM-DD') === state.event_date) return {
        disabled: true,
        style: {
          color: "#28a745"
        },
        onClick: function onClick() {
          return toastr['error']("start date are disabled");
        }
      };
    },
    minDate: new Date(),
    value: state.event_start_dates,
    onChange: setMultipleChoose,
    inputClass: "form-control",
    format: "YYYY-MM-DD",
    plugins: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4___default.a, null)],
    disabled: (state === null || state === void 0 ? void 0 : state.event_repeat_type) === "MultipleDate" ? false : true // maxDate={new Date().setDate(60)}

  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    onClick: resetPopup
  }, "Reset")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    onClick: repeatValidation
  }, "Save")))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(EditRepeat));

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Components/EventEditTime.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Components/EventEditTime.jsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var EventEditTime = function EventEditTime() {
  var _state$event_time_slo, _JSON$stringify;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var onClickFormGroupButton = function onClickFormGroupButton(index) {
    var eventDurationSlots = _toConsumableArray(state.event_time_slot);

    var TimeOverlappedIndex = _toConsumableArray(state.TimeOverlappedIndex);

    console.log(eventDurationSlots.filter(function (res, ind) {
      return ind == index;
    }));
    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        delete_event_time_slot: eventDurationSlots.filter(function (res, ind) {
          return ind == index;
        }),
        event_time_slot: eventDurationSlots.filter(function (res, ind) {
          return ind != index;
        }),
        TimeOverlappedIndex: TimeOverlappedIndex.filter(function (res) {
          return res != index;
        })
      }
    });
  };

  var onChangeFormGroupInput = function onChangeFormGroupInput(index, event) {
    var eventDurationSlots = _toConsumableArray(state.event_time_slot);

    if (event.target.name === "startTime" || event.target.name === "endTime") {
      var duration = moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].end_time, "h:mm A").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].start_time, "h:mm A"))).minutes();
      eventDurationSlots[index].duration = duration;
      eventDurationSlots[index][event.target.name] = moment__WEBPACK_IMPORTED_MODULE_1___default()(event.target.value, "h:mm A").format("HH:mm:ss");
    } else if (event.target.name === "cost" || event.target.name === "cost_type") {
      if (event.target.name === "cost" && event.target.value <= 0) {
        eventDurationSlots[index][event.target.name] = event.target.value;
        eventDurationSlots[index]["cost_type"] = "free";
      } else if (event.target.name === "cost_type" && event.target.value === "paid") {
        eventDurationSlots[index][event.target.name] = event.target.value;
        eventDurationSlots[index]["cost"] = 1;
      } else {
        eventDurationSlots[index][event.target.name] = event.target.value;
      }
    } else {
      eventDurationSlots[index][event.target.name] = event.target.value;
    }

    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        event_time_slot: eventDurationSlots
      }
    });
  };

  console.log(state === null || state === void 0 ? void 0 : state.event_time_slot, "add time on create");

  var onAddTime = function onAddTime() {
    var startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
    var endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");

    if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 0) {// startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 15) {// startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":30:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":30:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 30) {// startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":45:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":45:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 45) {// startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":59:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":00:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(1, "hour")
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") == 0) {// startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":00:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } // dispatch({
    //   type: "eventDurationSlots",
    //   payload: {
    //     Type: "eventDurationSlots",
    //     eventDurationSlots: [
    //       ...state.event_time_slot,
    //       {
    //         startDateTime: startTime,
    //         endDateTime: endTime,
    //         cost: 0,
    //         eventCostType: "free",
    //         eventDuration: 15,
    //         seats: 1,
    //         interval: 0,
    //         ChangeTime: {
    //           time: moment().format("DD-MM-YYYY HH:mm:ss"),
    //           index: 0,
    //           type: "none",
    //         },
    //       },
    //     ],
    //   },
    // });

  };

  var changeTime = function changeTime(time, index, type) {
    $("#EditTimeChangeModal").modal({
      backdrop: "static",
      keyboard: false
    });
    dispatch({
      type: "ChangeTime",
      payload: {
        Type: "ChangeTime",
        ChangeTime: {
          time: time,
          index: index,
          type: type
        }
      }
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var overlapped = false;
    var overlappedIndex = [-1, -1];
    var timeCollection = state.event_time_slot;
    var iterations = timeCollection.length;

    for (var i = 0; i < timeCollection.length; i++) {
      for (var a = 0; a < timeCollection.length; a++) {
        if (i == a) {
          continue;
        } //if the start and end date are both the same with the comparison data.


        if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].end_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")) {
          overlapped = true;
          overlappedIndex.push(i);
          overlappedIndex.push(a);
        } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss") == moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].end_date_time, "YYYY-MM-DD HH:mm:ss")) {
          overlapped = true;
          overlappedIndex.push(i);
          overlappedIndex.push(a);
        } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].end_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")) {
          overlapped = true;
          overlappedIndex.push(i);
          overlappedIndex.push(a);
        } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss").isBetween(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].start_date_time, "YYYY-MM-DD HH:mm:ss"), moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].end_date_time, "YYYY-MM-DD HH:mm:ss")) || moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].end_date_time, "YYYY-MM-DD HH:mm:ss").isBetween(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].start_date_time, "YYYY-MM-DD HH:mm:ss"), moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].end_date_time, "YYYY-MM-DD HH:mm:ss"))) {
          //checker to check if date and time are in between..
          //making sure also that the time belongs to the crew
          // if (!--iterations){
          toastr['error']('Time conflict'); // }

          overlappedIndex.push(i);
          overlappedIndex.push(a);
          overlapped = true;
        } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].end_date_time, "YYYY-MM-DD HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss"), 'Hours') > 6) {
          overlapped = true;
          overlappedIndex.push(i);
          overlappedIndex.push(a);
        } else {// overlappedIndex.filter(res=>res!=i||a);
        }
      }
    } // if (overlapped) {
    //   dispatch({
    //     type: "TimeOverlapped",
    //     payload: { Type: "TimeOverlapped", TimeOverlapped: overlapped,TimeOverlappedIndex:overlappedIndex },
    //   });
    //  } else if (!overlapped) {


    dispatch({
      type: "TimeOverlappedFN",
      payload: {
        Type: "TimeOverlappedFN",
        TimeOverlapped: overlapped,
        TimeOverlappedIndex: overlappedIndex
      }
    }); // }

    console.log(overlapped, JSON.stringify(state.event_time_slot), "overlapped");
  }, [state.TimeOverlappedIndexSave, (_state$event_time_slo = state.event_time_slot) === null || _state$event_time_slo === void 0 ? void 0 : _state$event_time_slo.length, (_JSON$stringify = JSON.stringify(state.event_time_slot)) === null || _JSON$stringify === void 0 ? void 0 : _JSON$stringify.length]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "t-c-s-row float-right mb-2"
  }), state.event_time_slot.map(function (value, index) {
    var _state$event_time_slo2;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "bdr-frm-bx tcs-outer ".concat(state.TimeOverlappedIndex.find(function (res) {
        return res.toString() == index.toString();
      }) == false ? "border border-5 border-danger rounded" : state.TimeOverlappedIndex.find(function (res) {
        return res.toString() == index.toString();
      }) ? "border border-5 border-danger rounded" : ""),
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "add-time-input"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-c-s-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-from"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "From"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "dynamicForm__itemInput form-control custom-select-bx",
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return changeTime(moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.start_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"), index, "start");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      selected: true,
      disabled: true
    }, moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.start_date_time, "YYYY-MM-DD HH:mm:ss").format("hh:mm a")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-to"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "To"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "dynamicForm__itemInput form-control custom-select-bx",
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return changeTime(moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.end_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss"), index, "end");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      selected: true
    }, moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.end_date_time, "YYYY-MM-DD HH:mm:ss").format("hh:mm a")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-cost"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "b-f-in"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "free-paid-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-select-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "form-control custom-select-bx",
      name: "cost_type",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      style: {
        width: "75px"
      },
      value: value.cost_type
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "free"
    }, " ", "Free"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "paid"
    }, " ", "Paid"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-input-bx tcs-cost-input",
      style: value.cost_type == "free" ? {
        display: "none"
      } : {
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      className: "form-control",
      name: "cost",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      value: value.cost
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-seats"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "Seats"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "1",
      max: "20",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      className: "dynamicForm__itemInput form-control",
      placeholder: "1",
      name: "total_seats",
      value: value === null || value === void 0 ? void 0 : value.total_seats
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-add-remove"
    }, ((_state$event_time_slo2 = state.event_time_slot) === null || _state$event_time_slo2 === void 0 ? void 0 : _state$event_time_slo2.length) > 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "dynamicForm__itemButton btn default-btn js-btn-prev ",
      type: "button",
      onClick: function onClick() {
        return onClickFormGroupButton(index);
      } // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
      ,
      tabIndex: "-1",
      style: {
        top: "-1px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-danger"
    }, "x")) : ""))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (EventEditTime);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Components/Tags/Tags.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Components/Tags/Tags.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_tagsinput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tagsinput */ "./node_modules/react-tagsinput/react-tagsinput.js");
/* harmony import */ var react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_tagsinput__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Tags = function Tags() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  function handleChange(tags) {
    dispatch({
      type: 'eventTags',
      payload: {
        Type: 'eventTags',
        event_tags: tags
      }
    });
  }

  function handleChangeInput(tag) {
    dispatch({
      type: 'eventTag',
      payload: {
        Type: 'eventTag',
        eventTag: tag
      }
    });
  }

  var event_tags = state.event_tags,
      eventTag = state.eventTag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group add-tag-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Add Tags"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default.a, {
    value: event_tags,
    onChange: handleChange,
    inputValue: eventTag,
    addKeys: [9, 13, 188],
    onChangeInput: handleChangeInput,
    onlyUnique: true,
    maxTags: 15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-left label-small-h"
  }, event_tags === null || event_tags === void 0 ? void 0 : event_tags.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right label-small-h"
  }, "max 15"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Tags);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var EditEventContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (EditEventContext);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/EditEventSection.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/EditEventSection.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_Reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utility/Reducer */ "./resources/js/utility/Reducer.js");
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
/* harmony import */ var _EditStepTwo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditStepTwo */ "./resources/js/components/screens/EditEvents/EditStepTwo.jsx");
/* harmony import */ var _Models_EventEditFollowing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Models/EventEditFollowing */ "./resources/js/components/screens/EditEvents/Models/EventEditFollowing.jsx");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _EditStepThree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EditStepThree */ "./resources/js/components/screens/EditEvents/EditStepThree.jsx");
/* harmony import */ var _EditStepFour__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditStepFour */ "./resources/js/components/screens/EditEvents/EditStepFour.jsx");
/* harmony import */ var _Components_EditRepeat_EditRepeat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Components/EditRepeat/EditRepeat */ "./resources/js/components/screens/EditEvents/Components/EditRepeat/EditRepeat.jsx");
/* harmony import */ var _CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents */ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx");
/* harmony import */ var _Models_DeleteEventByFollowing__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Models/DeleteEventByFollowing */ "./resources/js/components/screens/EditEvents/Models/DeleteEventByFollowing.jsx");
/* harmony import */ var _Models_CancelEventByFollowing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Models/CancelEventByFollowing */ "./resources/js/components/screens/EditEvents/Models/CancelEventByFollowing.jsx");
/* harmony import */ var _Models_TimeChangeModal_TImeChangeModal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Models/TimeChangeModal/TImeChangeModal */ "./resources/js/components/screens/EditEvents/Models/TimeChangeModal/TImeChangeModal.jsx");
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

















var initialState = {
  FollowingBy: '',
  deleteBy: '',
  cancelBy: '',
  EventId: 0,
  SlotId: 0,
  ConflictsEvents: [],
  TimeOverlapped: false,
  TimeOverlappedIndex: [-1, -1],
  ChangeTime: {
    time: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD HH:mm:ss'),
    index: 0,
    type: 'none'
  },
  event_title: '',
  eventFileIds: [],
  event_type: '',
  event_description: '',
  event_visible: '',
  event_repeat_type: 'None',
  event_repeat_interval: 1,
  event_repeat_days: [],
  event_start_dates: [],
  event_end_dates: [],
  eventRepeatSave: true,
  eventRepeat: false,
  event_sub_category: 'SubCategory',
  event_category: 'Category',
  event_tags: [],
  eventTag: "",
  event_till_date: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(15, "days").format("YYYY-MM-DD"),
  event_time_slot: [],
  delete_event_time_slot: [],
  event_files: [],
  delete_event_download_file: [],
  event_download_file: [],
  parentCategories: [],
  childCategories: [],
  eventImages: []
};

var EditEventSection = function EditEventSection() {
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_utility_Reducer__WEBPACK_IMPORTED_MODULE_3__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1]; // fetch categories


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getCategories();
    return function () {
      dispatch({
        type: "getCategories",
        payload: {
          Type: "getCategories",
          parentCategories: []
        }
      }); // resetFormState();
    };
    return function () {// reset init state 
    };
  }, []); // Get Parent or Child Categories Array[] for event create

  var getCategories = function getCategories() {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"].parentCategories().then(function (res) {
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
  };

  var getChildCategories = function getChildCategories(id) {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"].childCategories({
      parentId: id
    }).then(function (res) {
      if (res.data.status === 200) {
        dispatch({
          type: "getCategories",
          payload: {
            Type: "getCategories",
            childCategories: res.data.data
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  }; // end fetch categories
  // :::::::::: end Categories :::::::::
  // handle response on edit get data by Event and slot id


  var handleFollowingResponse = function handleFollowingResponse(e) {
    e.preventDefault();
    $("#EditFollowingEventModal").modal('hide');
    var data = {
      FollowingBy: state.FollowingBy,
      EventId: globalState === null || globalState === void 0 ? void 0 : globalState.EventEditId,
      SlotId: globalState === null || globalState === void 0 ? void 0 : globalState.eventSlotEditId,
      tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()
    };

    if (state.FollowingBy != '' && (globalState === null || globalState === void 0 ? void 0 : globalState.EventEditId) > 0 && (globalState === null || globalState === void 0 ? void 0 : globalState.eventSlotEditId) > 0) {
      $("#edit-create-myevent-step-2").modal({
        backdrop: 'static',
        keyboard: false
      });

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._editMyEventsFetch(data).then(function (res) {
        if (res.data.status == 200) {
          var _res$data, _res$data$data, _res$data2, _res$data2$data, _res$data3, _res$data3$data, _res$data3$data$event, _res$data4, _res$data4$data, _res$data5, _res$data5$data, _res$data5$data$event, _res$data6, _res$data6$data, _res$data7, _res$data7$data, _res$data8, _res$data8$data, _res$data9, _res$data9$data, _res$data10, _res$data10$data, _res$data11, _res$data11$data, _res$data12, _res$data12$data, _res$data13, _res$data13$data, _res$data14, _res$data14$data, _res$data15, _res$data15$data, _res$data16, _res$data16$data, _res$data17, _res$data17$data, _res$data18, _res$data18$data, _res$data19, _res$data19$data, _res$data20, _res$data20$data, _res$data21, _res$data21$data, _res$data22, _res$data22$data;

          // console.log(res?.data?.data?.event_time_slot.sort((a,b)=>a-b)[0],'')
          dispatch({
            type: "eventData",
            payload: {
              Type: "eventData",
              event_title: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$data = _res$data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.event_title,
              event_type: res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : (_res$data2$data = _res$data2.data) === null || _res$data2$data === void 0 ? void 0 : _res$data2$data.event_type,
              event_date: (res === null || res === void 0 ? void 0 : (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : (_res$data3$data = _res$data3.data) === null || _res$data3$data === void 0 ? void 0 : (_res$data3$data$event = _res$data3$data.event_start_dates) === null || _res$data3$data$event === void 0 ? void 0 : _res$data3$data$event.length) > 0 ? moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : (_res$data4$data = _res$data4.data) === null || _res$data4$data === void 0 ? void 0 : _res$data4$data.event_start_dates.reduce(function (a, b) {
                return a < b ? a : b;
              }), 'YYYY-MM-DD').format('YYYY-MM-DD') : moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD'),
              event_till_date: (res === null || res === void 0 ? void 0 : (_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : (_res$data5$data = _res$data5.data) === null || _res$data5$data === void 0 ? void 0 : (_res$data5$data$event = _res$data5$data.event_end_dates) === null || _res$data5$data$event === void 0 ? void 0 : _res$data5$data$event.length) > 0 ? moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : (_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : (_res$data6$data = _res$data6.data) === null || _res$data6$data === void 0 ? void 0 : _res$data6$data.event_end_dates.reduce(function (a, b) {
                return a < b ? a : b;
              }), 'YYYY-MM-DD').add(15, "days").format('YYYY-MM-DD') : moment__WEBPACK_IMPORTED_MODULE_1___default()().add(15, "days").format("YYYY-MM-DD"),
              event_description: res === null || res === void 0 ? void 0 : (_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : (_res$data7$data = _res$data7.data) === null || _res$data7$data === void 0 ? void 0 : _res$data7$data.event_description,
              event_visible: (res === null || res === void 0 ? void 0 : (_res$data8 = res.data) === null || _res$data8 === void 0 ? void 0 : (_res$data8$data = _res$data8.data) === null || _res$data8$data === void 0 ? void 0 : _res$data8$data.event_visible) == "0" ? "private" : "public",
              event_sub_category: res === null || res === void 0 ? void 0 : (_res$data9 = res.data) === null || _res$data9 === void 0 ? void 0 : (_res$data9$data = _res$data9.data) === null || _res$data9$data === void 0 ? void 0 : _res$data9$data.event_sub_category,
              event_category: res === null || res === void 0 ? void 0 : (_res$data10 = res.data) === null || _res$data10 === void 0 ? void 0 : (_res$data10$data = _res$data10.data) === null || _res$data10$data === void 0 ? void 0 : _res$data10$data.event_category,
              event_tags: JSON.parse(res === null || res === void 0 ? void 0 : (_res$data11 = res.data) === null || _res$data11 === void 0 ? void 0 : (_res$data11$data = _res$data11.data) === null || _res$data11$data === void 0 ? void 0 : _res$data11$data.event_tags),
              event_time_slot: res === null || res === void 0 ? void 0 : (_res$data12 = res.data) === null || _res$data12 === void 0 ? void 0 : (_res$data12$data = _res$data12.data) === null || _res$data12$data === void 0 ? void 0 : _res$data12$data.event_time_slot,
              event_files: JSON.parse(res === null || res === void 0 ? void 0 : (_res$data13 = res.data) === null || _res$data13 === void 0 ? void 0 : (_res$data13$data = _res$data13.data) === null || _res$data13$data === void 0 ? void 0 : _res$data13$data.event_files),
              event_repeat_type: res === null || res === void 0 ? void 0 : (_res$data14 = res.data) === null || _res$data14 === void 0 ? void 0 : (_res$data14$data = _res$data14.data) === null || _res$data14$data === void 0 ? void 0 : _res$data14$data.event_repeat_type,
              eventRepeatSave: (res === null || res === void 0 ? void 0 : (_res$data15 = res.data) === null || _res$data15 === void 0 ? void 0 : (_res$data15$data = _res$data15.data) === null || _res$data15$data === void 0 ? void 0 : _res$data15$data.event_repeat_type) == "None" ? false : true,
              eventRepeat: (res === null || res === void 0 ? void 0 : (_res$data16 = res.data) === null || _res$data16 === void 0 ? void 0 : (_res$data16$data = _res$data16.data) === null || _res$data16$data === void 0 ? void 0 : _res$data16$data.event_repeat_type) == "None" ? false : true,
              event_repeat_days: JSON.parse(res === null || res === void 0 ? void 0 : (_res$data17 = res.data) === null || _res$data17 === void 0 ? void 0 : (_res$data17$data = _res$data17.data) === null || _res$data17$data === void 0 ? void 0 : _res$data17$data.event_repeat_by_day),
              event_repeat_interval: res === null || res === void 0 ? void 0 : (_res$data18 = res.data) === null || _res$data18 === void 0 ? void 0 : (_res$data18$data = _res$data18.data) === null || _res$data18$data === void 0 ? void 0 : _res$data18$data.event_repeat_interval,
              event_start_dates: res === null || res === void 0 ? void 0 : (_res$data19 = res.data) === null || _res$data19 === void 0 ? void 0 : (_res$data19$data = _res$data19.data) === null || _res$data19$data === void 0 ? void 0 : _res$data19$data.event_start_dates,
              event_end_dates: res === null || res === void 0 ? void 0 : (_res$data20 = res.data) === null || _res$data20 === void 0 ? void 0 : (_res$data20$data = _res$data20.data) === null || _res$data20$data === void 0 ? void 0 : _res$data20$data.event_end_dates,
              event_download_file: res === null || res === void 0 ? void 0 : (_res$data21 = res.data) === null || _res$data21 === void 0 ? void 0 : (_res$data21$data = _res$data21.data) === null || _res$data21$data === void 0 ? void 0 : _res$data21$data.event_file
            }
          });
          getChildCategories(res === null || res === void 0 ? void 0 : (_res$data22 = res.data) === null || _res$data22 === void 0 ? void 0 : (_res$data22$data = _res$data22.data) === null || _res$data22$data === void 0 ? void 0 : _res$data22$data.event_category);
        }

        if (res.data.status === "failed") {
          toastr['error']('!Something wrong');
          $(".modal").modal('hide');
        }
      });
    } else {
      toastr['error']('!Something wrong');
      $(".modal").modal('hide');
    }
  }; // edit on Change following popup


  var onChangeFollowing = function onChangeFollowing(e) {
    var name = e.target.name;
    var value = e.target.value;
    dispatch({
      type: "FollowingBy",
      payload: {
        Type: "FollowingBy",
        FollowingBy: value
      }
    });
  }; //  cancel edit event following popup


  var CancelFollowing = function CancelFollowing(e) {
    globalDispatch({
      type: "EditEvent",
      payload: {
        Type: "EditEvent",
        EventEditId: 0,
        EventEditSlotId: 0
      }
    });
    dispatch({
      type: "FollowingBy",
      payload: {
        Type: "FollowingBy",
        FollowingBy: ''
      }
    });
  }; // delete events


  var handleDeleteResponse = function handleDeleteResponse(e) {
    e.preventDefault();
    var data = {
      FollowingBy: state.deleteBy,
      EventId: globalState === null || globalState === void 0 ? void 0 : globalState.eventDeleteId,
      SlotId: globalState === null || globalState === void 0 ? void 0 : globalState.eventDeleteSlotId,
      tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()
    };

    if (state.deleteBy != '' && (globalState === null || globalState === void 0 ? void 0 : globalState.eventDeleteId) > 0 && (globalState === null || globalState === void 0 ? void 0 : globalState.eventDeleteSlotId) > 0) {
      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._DeleteMyFollowingEvent(data).then(function (res) {
        if (res.data.status == 200) {
          var _res$data23;

          toastr['error']((_res$data23 = res.data) === null || _res$data23 === void 0 ? void 0 : _res$data23.messages);
        }

        $("#DeleteFollowingEventModal").modal('hide');

        if (res.data.status === "failed") {
          var _res$data24;

          toastr['error']((_res$data24 = res.data) === null || _res$data24 === void 0 ? void 0 : _res$data24.messages);
        }
      });
    } else {
      toastr['error']('!server error');
    }
  }; // delete on Change following popup


  var onChangeDeleteEventFollowing = function onChangeDeleteEventFollowing(e) {
    var name = e.target.name;
    var value = e.target.value;
    console.log(name, value, 'response');
    dispatch({
      type: "deleteBy",
      payload: {
        Type: "deleteBy",
        deleteBy: value
      }
    });
  }; //  cancel delete event following popup


  var CancelDeleteEventFollowing = function CancelDeleteEventFollowing(e) {
    globalDispatch({
      type: "EditEvent",
      payload: {
        Type: "EditEvent",
        EventEditId: 0,
        EventEditSlotId: 0
      }
    });
    dispatch({
      type: "FollowingBy",
      payload: {
        Type: "FollowingBy",
        FollowingBy: ''
      }
    });
  }; // CancelStatus events


  var handleCancelStatusResponse = function handleCancelStatusResponse(e) {
    e.preventDefault();
    var data = {
      FollowingBy: state.cancelBy,
      EventId: globalState === null || globalState === void 0 ? void 0 : globalState.eventCancelId,
      SlotId: globalState === null || globalState === void 0 ? void 0 : globalState.eventCancelSlotId,
      tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()
    };

    if (state.cancelBy != '' && (globalState === null || globalState === void 0 ? void 0 : globalState.eventCancelId) > 0 && (globalState === null || globalState === void 0 ? void 0 : globalState.eventCancelSlotId) > 0) {
      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._CancelMyFollowingEvent(data).then(function (res) {
        if (res.data.status == 200) {
          var _res$data25;

          toastr['error']((_res$data25 = res.data) === null || _res$data25 === void 0 ? void 0 : _res$data25.messages);
        }

        $("#CancelFollowingEventModal").modal('hide');

        if (res.data.status === "failed") {
          var _res$data26;

          toastr['error']((_res$data26 = res.data) === null || _res$data26 === void 0 ? void 0 : _res$data26.messages);
        }
      });
    } else {
      toastr['error']('!server error');
    }
  }; // CancelStatus on Change following popup


  var onChangeCancelStatusEventFollowing = function onChangeCancelStatusEventFollowing(e) {
    var name = e.target.name;
    var value = e.target.value;
    console.log(name, value, 'response');
    dispatch({
      type: "cancelBy",
      payload: {
        Type: "cancelBy",
        cancelBy: value
      }
    });
  }; //  cancel delete event following popup


  var CancelStatusEventFollowing = function CancelStatusEventFollowing(e) {
    globalDispatch({
      type: "EditEvent",
      payload: {
        Type: "EditEvent",
        eventCancelId: 0,
        eventCancelSlotId: 0
      }
    });
    dispatch({
      type: "FollowingBy",
      payload: {
        Type: "FollowingBy",
        cancelBy: ''
      }
    });
  };

  var checkConflictsOfEvents = function checkConflictsOfEvents(eve) {
    // return false;
    var data = {
      "startDateTime": state === null || state === void 0 ? void 0 : state.event_start_dates,
      "endDateTime": state === null || state === void 0 ? void 0 : state.event_end_dates,
      "eventDurationSlots": state === null || state === void 0 ? void 0 : state.event_time_slot,
      "eventRepeatBy": state === null || state === void 0 ? void 0 : state.event_repeat_type
    };
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"].EditEventTimeConflictsChecks(data).then(function (res) {
      if (res.data.status == 200) {
        $(eve).modal({
          backdrop: 'static',
          keyboard: false
        });
        $('#edit-create-myevent-step-3').modal('hide');
      } else if (res.data.status == "events") {
        dispatch({
          type: 'ConflictsEvents',
          payload: {
            Type: 'ConflictsEvents',
            ConflictsEvents: res.data.data
          }
        });
        toastr["error"]("Conflict Error");
        $('#Conflicts-Events-modal').modal('show');
      } else {
        toastr["error"]("Conflict Error");
      }
    })["catch"](function (error) {
      toastr["error"]("!server error"); // $(eve).modal({ backdrop: 'static', keyboard: false })

      console.log(error, 'error');
    });
  }; // Update Event handle


  var editFormValidation = function editFormValidation(state) {
    return true;
  };

  var handleUpdateEventFormSubmit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var formData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();

              if (editFormValidation(state)) {
                // dispatch({
                //     type: "formSubmit",
                //     payload: {
                //         Type: "formSubmit",
                //         formSubmit: true
                //     }
                // });
                formData = {
                  EventId: globalState === null || globalState === void 0 ? void 0 : globalState.EventEditId,
                  SlotId: globalState === null || globalState === void 0 ? void 0 : globalState.eventSlotEditId,
                  eventStartDate: state.event_start_dates,
                  eventEndDate: state.event_end_dates,
                  eventDurationSlots: state === null || state === void 0 ? void 0 : state.event_time_slot,
                  eventDescription: state === null || state === void 0 ? void 0 : state.event_description,
                  eventImages: state.event_files,
                  followingBy: state === null || state === void 0 ? void 0 : state.FollowingBy,
                  eventFiles: state.event_download_file,
                  removedEventFiles: state.delete_event_download_file,
                  removedEventSlot: state.delete_event_time_slot,
                  eventRepeat: state === null || state === void 0 ? void 0 : state.eventRepeat,
                  eventRepeatBy: state === null || state === void 0 ? void 0 : state.event_repeat_type,
                  eventRepeatDays: state === null || state === void 0 ? void 0 : state.event_repeat_days,
                  eventTags: state === null || state === void 0 ? void 0 : state.event_tags,
                  eventTillDate: state === null || state === void 0 ? void 0 : state.event_till_date,
                  eventVisibility: state === null || state === void 0 ? void 0 : state.event_visible,
                  repeatNumber: state === null || state === void 0 ? void 0 : state.event_repeat_interval,
                  tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()
                };

                _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._updateEvent(formData).then(function (response) {
                  if (response.data.status === 200) {
                    toastr["success"](response.data.message);
                    $("#edit-my-event-step-6-popup").modal({
                      backdrop: "static",
                      keyboard: false
                    }); // resetFormState();
                    // MyEventsList();
                  }

                  if (response.data.status === "failed") {
                    dispatch({
                      type: "formSubmit",
                      payload: {
                        Type: "formSubmit",
                        formSubmit: false
                      }
                    });
                    toastr["error"](response.data.message);
                  }
                });
              } else {
                toastr["error"]("form validation failed");
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleUpdateEventFormSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }(); // Repeat Event Actions all


  console.log(state, 'editstate', state === null || state === void 0 ? void 0 : state.ChangeTime);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
    value: [state, dispatch, handleUpdateEventFormSubmit]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditStepTwo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    conflictCheck: checkConflictsOfEvents
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditStepThree__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditStepFour__WEBPACK_IMPORTED_MODULE_10__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Models_CancelEventByFollowing__WEBPACK_IMPORTED_MODULE_14__["default"], {
    handleSubmit: handleCancelStatusResponse,
    cancel: CancelStatusEventFollowing,
    onChange: onChangeCancelStatusEventFollowing,
    value: state === null || state === void 0 ? void 0 : state.cancelBy
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Models_DeleteEventByFollowing__WEBPACK_IMPORTED_MODULE_13__["default"], {
    handleSubmit: handleDeleteResponse,
    cancel: CancelDeleteEventFollowing,
    onChange: onChangeDeleteEventFollowing,
    value: state === null || state === void 0 ? void 0 : state.deleteBy
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Models_EventEditFollowing__WEBPACK_IMPORTED_MODULE_6__["default"], {
    handleSubmit: handleFollowingResponse,
    cancel: CancelFollowing,
    onChange: onChangeFollowing,
    value: state === null || state === void 0 ? void 0 : state.FollowingBy
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_EditRepeat_EditRepeat__WEBPACK_IMPORTED_MODULE_11__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Models_TimeChangeModal_TImeChangeModal__WEBPACK_IMPORTED_MODULE_15__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_12__["default"], {
    events: state === null || state === void 0 ? void 0 : state.ConflictsEvents
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (EditEventSection);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/EditStepFour.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/EditStepFour.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spinners/PuffLoader */ "./node_modules/react-spinners/PuffLoader.js");
/* harmony import */ var react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_spinners_PuffLoader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var EditStepFour = function EditStepFour(_ref) {
  var _state$event_download2, _state$eventFileIds;

  var resetFormState = _ref.resetFormState,
      handleFormSubmit = _ref.handleFormSubmit;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      _useContext2 = _slicedToArray(_useContext, 3),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      handleUpdateEventFormSubmit = _useContext2[2];

  var inputFileRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.useRef();

  var onFileClick = function onFileClick() {
    inputFileRef.current.click();
  };

  var onFileChangeCapture = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var form_data, _iterator, _step, file, response, eventFiles;

      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(e.target.files);
              form_data = new FormData();
              _iterator = _createForOfIteratorHelper(e.target.files);

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

              _context.prev = 4;
              _context.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["default"].multipleFileUploadUrl(), form_data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/json',
                  authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_7__["default"].getAccessToken())
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

            case 7:
              response = _context.sent;

              if (response.data.status == 200) {
                eventFiles = [];
                eventFiles = response.data.data;
                dispatch({
                  type: 'event_download_file',
                  payload: {
                    Type: 'event_download_file',
                    event_download_file: [].concat(_toConsumableArray(state === null || state === void 0 ? void 0 : state.event_download_file), _toConsumableArray(eventFiles))
                  }
                });
                toastr["success"](response.data.message);
              }

              if (response.data == "failed") {
                toastr["success"](response.data.message);
              }

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              console.log(_context.t0);
              return _context.abrupt("return", false);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    return function onFileChangeCapture(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  function onFilePriceChange(value, file) {
    console.log(this);
    var files = state.event_download_file;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['file_cost'] = value;
    }

    dispatch({
      type: 'event_download_file',
      payload: {
        Type: 'event_download_file',
        event_download_file: files
      }
    });
  }

  function onFileDescChange(value, file) {
    var files = state.event_download_file;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['file_description'] = value;
    }

    dispatch({
      type: 'event_download_file',
      payload: {
        Type: 'event_download_file',
        event_download_file: files
      }
    });
  }

  function eventFileCostType(value, file) {
    var files = state.event_download_file;
    var index = files.findIndex(function (i) {
      return i.id == file.id;
    });

    if (index >= 0) {
      files[index]['file_cost_type'] = value;
      files[index]['file_cost'] = 1;
    }

    dispatch({
      type: 'event_download_file',
      payload: {
        Type: 'event_download_file',
        event_download_file: files
      }
    });
  }

  function removeSetFiles(ImageId) {
    var _state$event_download;

    if (((_state$event_download = state.event_download_file) === null || _state$event_download === void 0 ? void 0 : _state$event_download.length) > 0) {
      var filteredImages = state === null || state === void 0 ? void 0 : state.event_download_file.filter(function (images) {
        return images.id !== ImageId;
      });
      var deleteFileIds = [].concat(_toConsumableArray(state.delete_event_download_file), [ImageId]);
      dispatch({
        type: "delete_event_download_file",
        payload: {
          Type: "delete_event_download_file",
          event_download_file: filteredImages,
          delete_event_download_file: deleteFileIds
        }
      });
      toastr["error"]("File Removed");
    } else {
      toastr["error"]("min 1 image is required");
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "edit-create-myevent-step-4",
    tabIndex: "-1",
    "aria-labelledby": "myModalLabel2",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-content"
  }, false ? /*#__PURE__*/undefined : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "close",
    onClick: function onClick() {
      return resetFormState();
    },
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-header"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#create-my-event-step-4-popup",
    className: "btn link-btn float-left f-u-back-btn",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-arrow-left-line-icon"
  }), " Back"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-body input-bdr-btm calender-files-upload"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", {
    className: "c-f-u-heading"
  }, "Upload Files")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "upload-paid-files",
    onClick: onFileClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "file-upload",
    "data-toggle": "modal",
    "data-target": "#event-file-sys"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/upload-files-icon.svg"),
    alt: ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "card-subtitle"
  }, "Add a File (maximum file size 20mb)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    ref: inputFileRef,
    type: "file",
    onChangeCapture: onFileChangeCapture,
    style: {
      display: "none"
    },
    multiple: true
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "u-p-files-list uploading-file-bx"
  }, (state === null || state === void 0 ? void 0 : state.fileUploadProgress) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "action-editable",
    "data-title": "Action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "progress"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "file-type-name"
  }, "pdf"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "progress-bar",
    style: {
      width: "".concat(state === null || state === void 0 ? void 0 : state.fileUploadProgress, "%")
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn cricle-icon-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-close-icon"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-list review-events-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "u-p-files-list up-files-dis-cost"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "custom-table"
  }, state === null || state === void 0 ? void 0 : (_state$event_download2 = state.event_download_file) === null || _state$event_download2 === void 0 ? void 0 : _state$event_download2.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: index,
      className: "c-table-row cmn-new-toggle"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell fm-file-name-editable",
      "data-title": "Event Details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "file-type-title-icon"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "file-type-name"
    }, res.type), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, (res === null || res === void 0 ? void 0 : res.file_title) || (res === null || res === void 0 ? void 0 : res.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell fm-size-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "c-table-text"
    }, res.size)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell fm-source-editable text-right",
      "data-title": "Write Review"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "c-table-text text-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
      className: "cmn-ul-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      type: "button",
      className: "btn link-btn ".concat(res !== null && res !== void 0 && res.file_cost && res !== null && res !== void 0 && res.file_description ? '' : 'pulse-effect-btn'),
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/dis-n-cost-icon.svg"),
      title: "Edit Cost",
      alt: "Edit Cost"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      type: "button",
      className: "btn link-btn",
      onClick: function onClick() {
        return removeSetFiles(res.id);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "av av-delete-icon"
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      id: "files-cost-form-".concat(res.id),
      className: "write-review-content-bx new-toggle-dropdown",
      style: {
        display: 'none'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cost-editable",
      "data-title": "Cost"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      className: "form-control custom-select-bx",
      name: "file_cost_type",
      onChange: function onChange(e) {
        return eventFileCostType(e.target.value, res);
      },
      style: {
        width: "75px"
      },
      value: res === null || res === void 0 ? void 0 : res.file_cost_type
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "free"
    }, " Free"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "paid"
    }, " Paid")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "input-u-f-bx input-u-f-price-bx w-100",
      style: (res === null || res === void 0 ? void 0 : res.file_cost_type) == 'free' ? {
        display: 'none'
      } : {
        display: 'block'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
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
      value: res.file_cost
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "description-editable",
      "data-title": "Description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "input-u-f-bx input-u-f-dis-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
      type: "textarea",
      className: "form-control",
      placeholder: "Enter File description...",
      onChange: function onChange(e) {
        return onFileDescChange(e.target.value, res);
      },
      value: res.file_description
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cost-dic-btns"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      className: "btn link-btn",
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, "Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      className: "btn default-btn",
      onClick: function onClick() {
        return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__["showHideDiv"])("files-cost-form-".concat(res.id));
      }
    }, "Save"))))));
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "step-line-bdr"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "complited"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "complited"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "\xA0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#edit-create-myevent-step-3",
    className: "btn default-btn float-left",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "submit",
    onClick: handleUpdateEventFormSubmit,
    disabled: ((_state$eventFileIds = state.eventFileIds) === null || _state$eventFileIds === void 0 ? void 0 : _state$eventFileIds.length) > 0 && state.eventFileIds.filter(function (resF) {
      return (resF === null || resF === void 0 ? void 0 : resF.eventFileDescription) == '';
    }).length > 0 ? true : false,
    className: "btn default-btn float-right"
  }, "Finish"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(EditStepFour));

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/EditStepThree.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/EditStepThree.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Components_CreateEventFileUploadPopUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/CreateEventFileUploadPopUp */ "./resources/js/components/screens/EditEvents/Components/CreateEventFileUploadPopUp.jsx");
/* harmony import */ var _Components_Tags_Tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/Tags/Tags */ "./resources/js/components/screens/EditEvents/Components/Tags/Tags.jsx");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var EditStepThree = function EditStepThree(props) {
  var _state$event_descript, _state$event_descript2, _state$event_descript3, _state$event_files2, _state$event_tags, _state$event_descript4;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var eventImageRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var eventImageRefClick = function eventImageRefClick() {
    eventImageRef.current.click();
  };

  var prevButton = function prevButton(eve) {
    $(eve).modal({
      backdrop: "static",
      keyboard: false
    });
  };

  var nextButton = function nextButton(eve) {
    $(eve).modal({
      backdrop: "static",
      keyboard: false
    });
  };

  var onChangeImage = function onChangeImage(e) {
    $("#edit-presenter-btn").modal("show");
    dispatch({
      type: "eventCropedUrl",
      payload: {
        Type: "eventCropedUrl",
        eventCropedUrl: e.target.files,
        eventSelectedFiles: e.target.files,
        eventCropedImage: "",
        isModalClose: false
      }
    });
  };

  var getChildCategories = function getChildCategories(id) {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__["ApiService"].childCategories({
      parentId: id
    }).then(function (res) {
      if (res.data.status === 200) {
        dispatch({
          type: "getCategories",
          payload: {
            Type: "getCategories",
            childCategories: res.data.data
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  var onChangeParentHandle = function onChangeParentHandle(e) {
    console.log(e.target.name);
    dispatch({
      type: e.target.name,
      payload: {
        Type: e.target.name,
        event_category: e.target.value,
        event_sub_category: 'SubCategory'
      }
    });
    getChildCategories(e.target.value);
  };

  var onChangeChildHandle = function onChangeChildHandle(e) {
    console.log(e.target.value);
    dispatch({
      type: e.target.name,
      payload: {
        Type: e.target.name,
        event_sub_category: e.target.value
      }
    });
  }; // remove image from data 


  var removeSetImage = function removeSetImage(ImageId) {
    var _state$event_files;

    if (((_state$event_files = state.event_files) === null || _state$event_files === void 0 ? void 0 : _state$event_files.length) > 1) {
      var filteredImages = state === null || state === void 0 ? void 0 : state.event_files.filter(function (images) {
        return images.id !== ImageId;
      });
      dispatch({
        type: "eventImages",
        payload: {
          Type: "eventImages",
          event_files: filteredImages
        }
      });
      toastr["error"]("File Removed");
    } else {
      toastr["error"]("min 1 image is required");
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "edit-create-myevent-step-3",
    tabIndex: "-1",
    "aria-labelledby": "myModalLabel2",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    onClick: function onClick() {
      return props.resetFormState();
    },
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "modal-title"
  }, "Edit My Event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body input-bdr-btm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx ce-category-s-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx" // onChange={onChangeParentHandle}
    ,
    disabled: true,
    name: "eventCategory",
    value: state === null || state === void 0 ? void 0 : state.event_category
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    defaultValue: "Category",
    disabled: true
  }, "Category"), state === null || state === void 0 ? void 0 : state.parentCategories.map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: res.id,
      selected: (state === null || state === void 0 ? void 0 : state.event_category) == (res === null || res === void 0 ? void 0 : res.id),
      value: res.id
    }, res.name);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx ce-category-s-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx" // onChange={onChangeChildHandle}
    ,
    name: "eventSubCategory",
    value: state === null || state === void 0 ? void 0 : state.event_sub_category,
    disabled: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    disabled: true,
    defaultValue: "SubCategory",
    value: "SubCategory"
  }, "SubCategory"), state === null || state === void 0 ? void 0 : state.childCategories.map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: res.id,
      selected: (state === null || state === void 0 ? void 0 : state.event_sub_category) == (res === null || res === void 0 ? void 0 : res.id),
      value: res.id
    }, res.name);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: (state === null || state === void 0 ? void 0 : (_state$event_descript = state.event_description) === null || _state$event_descript === void 0 ? void 0 : _state$event_descript.length) < 150 || (state === null || state === void 0 ? void 0 : (_state$event_descript2 = state.event_description) === null || _state$event_descript2 === void 0 ? void 0 : _state$event_descript2.length) > 600 ? "form-control border-danger" : "form-control border-success",
    name: "eventDescription",
    onChange: function onChange(e) {
      return dispatch({
        type: e.target.name,
        payload: {
          Type: e.target.name,
          event_description: e.target.value
        }
      });
    },
    value: state === null || state === void 0 ? void 0 : state.event_description,
    placeholder: "Description"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-left label-small-h"
  }, "min 150"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right label-small-h"
  }, " ", state === null || state === void 0 ? void 0 : (_state$event_descript3 = state.event_description) === null || _state$event_descript3 === void 0 ? void 0 : _state$event_descript3.length, "/max 600"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Tags_Tags__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group insert-files-form left-side-upload-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "upload-event-image"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    onClick: eventImageRefClick,
    className: "choose-images-video-icons",
    "data-toggle": "modal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "/public/assets/images/choose-images-video-icons.svg"),
    alt: "logo"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "file",
    ref: eventImageRef,
    onChange: onChangeImage,
    accept: "image/*",
    hidden: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figcaption", null, "Click to add image(s) for your event")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group event-uploaded-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, state === null || state === void 0 ? void 0 : state.event_files.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: res.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "insert-file-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "file-uploaded-outer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"]) + res.file_url,
      alt: res.name
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return removeSetImage(res.id);
      },
      className: "btn link-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    }))));
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step-line-bdr"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "complited"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return prevButton("#edit-create-myevent-step-2");
    },
    className: "btn default-btn float-left",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return nextButton("#edit-create-myevent-step-4");
    },
    disabled: (state === null || state === void 0 ? void 0 : (_state$event_files2 = state.event_files) === null || _state$event_files2 === void 0 ? void 0 : _state$event_files2.length) > 0 && (state === null || state === void 0 ? void 0 : state.event_sub_category) != "" && (state === null || state === void 0 ? void 0 : state.event_sub_category) != "SubCategory" && (state === null || state === void 0 ? void 0 : state.event_category) != "Category" && (state === null || state === void 0 ? void 0 : state.event_category) != "" && (state === null || state === void 0 ? void 0 : (_state$event_tags = state.event_tags) === null || _state$event_tags === void 0 ? void 0 : _state$event_tags.length) > 0 && (state === null || state === void 0 ? void 0 : (_state$event_descript4 = state.event_description) === null || _state$event_descript4 === void 0 ? void 0 : _state$event_descript4.length) >= 150 ? false : true,
    className: "btn default-btn float-right",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Continue"), " "))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_CreateEventFileUploadPopUp__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(EditStepThree));

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/EditStepTwo.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/EditStepTwo.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
/* harmony import */ var _Components_EventEditTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/EventEditTime */ "./resources/js/components/screens/EditEvents/Components/EventEditTime.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


 // import RepeatEvery from './RepeatEveryModal/RepeatEvery';





var EditStepTwo = function EditStepTwo(_ref) {
  var resetFormState = _ref.resetFormState,
      conflictCheck = _ref.conflictCheck;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      next = _useState2[0],
      setNext = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState4 = _slicedToArray(_useState3, 2),
      BTNContinue = _useState4[0],
      setBTNContinue = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState6 = _slicedToArray(_useState5, 2),
      back = _useState6[0],
      setBack = _useState6[1];

  var eventTillDate = state.eventTillDate,
      EventTimeZone = state.EventTimeZone,
      eventAutoParticipants = state.eventAutoParticipants,
      eventDurationSlots = state.eventDurationSlots,
      eventVisibility = state.eventVisibility,
      repeatNumber = state.repeatNumber,
      eventRepeatBy = state.eventRepeatBy,
      eventTitle = state.eventTitle,
      SelectedStartDate = state.SelectedStartDate,
      SelectedEndDate = state.SelectedEndDate,
      SelectedStartTime = state.SelectedStartTime,
      SelectedEndTime = state.SelectedEndTime;

  var nextStep = function nextStep(eve) {
    if (conflictCheck(eve)) {
      $(eve).modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {//   state?.eventDurationSlots.map((object,i) => {
    //     var time = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
    //     beforeTime = moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
    //     afterTime = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss');
    //     if (state?.eventTitle) {
    //         return   setBTNContinue(i+1);
    //     }else{
    //           return  setBTNContinue(0)
    //     }
    //     });
  }, [state === null || state === void 0 ? void 0 : state.eventDurationSlots, state === null || state === void 0 ? void 0 : state.eventTitle]);

  var prevStep = function prevStep(eve) {
    $(eve).modal({
      backdrop: 'static',
      keyboard: false
    }, 'show');
  };

  var onChange = function onChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    dispatch({
      type: name,
      payload: _defineProperty({
        Type: name
      }, name, value)
    });
  };

  var SetValueOnChange = function SetValueOnChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    dispatch({
      type: name,
      payload: _defineProperty({
        Type: name
      }, name, !(state !== null && state !== void 0 && state.eventRepeat))
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (state !== null && state !== void 0 && state.eventRepeat) {
      $('#edit-repeat-event-popup').modal({
        backdrop: 'static',
        keyboard: false
      }, 'show');
    } else {
      $('#edit-repeat-event-popup').modal('hide');
    }
  }, [state === null || state === void 0 ? void 0 : state.eventRepeat]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "edit-create-myevent-step-2",
    tabIndex: "-1",
    "aria-labelledby": "myModalLabel2",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return console.log("Step Two Submit Successfully");
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    onClick: resetFormState,
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "modal-title"
  }, "Edit My Event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body input-bdr-btm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "event_title" // onChange={onChange} 
    ,
    className: "form-control",
    placeholder: "Enter Title",
    value: state === null || state === void 0 ? void 0 : state.event_title,
    autoComplete: "off",
    disabled: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "b-f-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "date",
    name: "eventSingleDate",
    onChange: function onChange(e) {
      // const eventDurationSlotsNew = state?.eventDurationSlots.map(object => {
      //     return {...object, endDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'),startDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')};
      // });
      if (moment__WEBPACK_IMPORTED_MODULE_1___default()(e.target.value) >= moment__WEBPACK_IMPORTED_MODULE_1___default()()) {// dispatch({type:'setEventDate',payload:{Type:'setEventDate',eventDurationSlots:eventDurationSlotsNew, eventSingleDate: moment(e.target.value).format('DD-MM-YYYY'), SelectedStartDate: [moment(e.target.value).format('DD-MM-YYYY')], SelectedEndDate: [moment(e.target.value).format('DD-MM-YYYY')] }});
      } else {
        toastr["error"]('please select grater and equal to current date');
      }
    },
    className: "form-control",
    placeholder: "Tuesday, October 20",
    value: moment__WEBPACK_IMPORTED_MODULE_1___default()(state === null || state === void 0 ? void 0 : state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD') // disabled={state?.SelectedStartDate.length > 1 || state?.eventRepeatBy == "Weeks" || state?.eventRepeatBy == "MultipleDate" || state?.eventRepeatBy == "TillDate" || parseInt(state?.repeatNumber) > 1 ? true : false}
    ,
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "b-f-in "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Privacy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx p-0",
    onChange: onChange,
    value: state === null || state === void 0 ? void 0 : state.event_visible,
    name: "event_visible"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    selected: (state === null || state === void 0 ? void 0 : state.event_visible) == "public",
    value: "public"
  }, "Public"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    selected: (state === null || state === void 0 ? void 0 : state.event_visible) == "private",
    value: "private"
  }, "Private"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_EventEditTime__WEBPACK_IMPORTED_MODULE_4__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx repeat-events-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    name: "eventRepeat",
    onChange: SetValueOnChange,
    disabled: state === null || state === void 0 ? void 0 : state.eventRepeatSave,
    checked: state === null || state === void 0 ? void 0 : state.eventRepeat,
    value: state === null || state === void 0 ? void 0 : state.eventRepeat
  }), "Repeat")), (state === null || state === void 0 ? void 0 : state.eventRepeatSave) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-default btn-sm",
    type: "button",
    onClick: function onClick() {
      return $('#edit-repeat-event-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }, "View"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step-line-bdr"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn float-left",
    onClick: function onClick() {
      return prevStep('#create-my-event-popup');
    },
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn float-right",
    disabled: state === null || state === void 0 ? void 0 : state.TimeOverlapped,
    onClick: function onClick() {
      return nextStep('#edit-create-myevent-step-3');
    }
  }, "Continue"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(EditStepTwo));

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Models/CancelEventByFollowing.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Models/CancelEventByFollowing.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var CancelEventByFollowing = function CancelEventByFollowing(_ref) {
  var onChange = _ref.onChange,
      handleSubmit = _ref.handleSubmit,
      ErrorResponse = _ref.ErrorResponse,
      value = _ref.value,
      cancel = _ref.cancel;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup confirm-message-popup",
    id: "CancelFollowingEventModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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
    className: "message-m-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "FollowingSlots",
    checked: value === "FollowingSlots" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio1"
  }, "Cancel this and following slots"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "ThisSlot",
    checked: value === "ThisSlot" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio3"
  }, "Cancel this slot")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "no-yes-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn blue-bdr-btn",
    "data-dismiss": "modal",
    onClick: cancel
  }, "No")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: value ? false : true
  }, "Yes"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CancelEventByFollowing);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Models/DeleteEventByFollowing.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Models/DeleteEventByFollowing.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var DeleteEventByFollowing = function DeleteEventByFollowing(_ref) {
  var onChange = _ref.onChange,
      handleSubmit = _ref.handleSubmit,
      ErrorResponse = _ref.ErrorResponse,
      value = _ref.value,
      cancel = _ref.cancel;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup confirm-message-popup",
    id: "DeleteFollowingEventModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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
    className: "message-m-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "FollowingSlots",
    checked: value === "FollowingSlots" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio1"
  }, "Delete this and following slots"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "ThisSlot",
    checked: value === "ThisSlot" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio3"
  }, "Delete this slot")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "no-yes-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn blue-bdr-btn",
    "data-dismiss": "modal",
    onClick: cancel
  }, "No")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: value ? false : true
  }, "Yes"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (DeleteEventByFollowing);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Models/EventEditFollowing.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Models/EventEditFollowing.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var EventEditFollowing = function EventEditFollowing(_ref) {
  var onChange = _ref.onChange,
      handleSubmit = _ref.handleSubmit,
      ErrorResponse = _ref.ErrorResponse,
      value = _ref.value,
      cancel = _ref.cancel;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup confirm-message-popup",
    id: "EditFollowingEventModal",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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
    className: "message-m-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "FollowingSlots",
    checked: value === "FollowingSlots" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio1"
  }, "Edit this and following slots"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "followingType",
    onChange: onChange,
    value: "ThisSlot",
    checked: value === "ThisSlot" ? true : false
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio3"
  }, "Edit this slot")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "no-yes-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn blue-bdr-btn",
    "data-dismiss": "modal",
    onClick: cancel
  }, "No")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: value ? false : true
  }, "Yes"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (EventEditFollowing);

/***/ }),

/***/ "./resources/js/components/screens/EditEvents/Models/TimeChangeModal/TImeChangeModal.jsx":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/screens/EditEvents/Models/TimeChangeModal/TImeChangeModal.jsx ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-multi-date-picker */ "./node_modules/react-multi-date-picker/build/index.js");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../EditEventContext/EditEventContext */ "./resources/js/components/screens/EditEvents/EditEventContext/EditEventContext.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var TimeChangeModal = function TimeChangeModal() {
  var _state$event_time_slo, _state$event_time_slo2, _state$event_time_slo4;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EditEventContext_EditEventContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('A')),
      _useState4 = _slicedToArray(_useState3, 2),
      timeFR = _useState4[0],
      setTimeFR = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('m')),
      _useState6 = _slicedToArray(_useState5, 2),
      timeMIN = _useState6[0],
      setTimeMIN = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('h')),
      _useState8 = _slicedToArray(_useState7, 2),
      timeHR = _useState8[0],
      setTimeHR = _useState8[1];

  var Hours = [];
  var Minutes = [];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeFR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('A'));
    setTimeMIN(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('m'));
    setTimeHR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('h'));
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'));
  }, [state.ChangeTime.time, (_state$event_time_slo = state.event_time_slot[state.ChangeTime.index]) === null || _state$event_time_slo === void 0 ? void 0 : _state$event_time_slo.end_date_time, (_state$event_time_slo2 = state.event_time_slot[state.ChangeTime.index]) === null || _state$event_time_slo2 === void 0 ? void 0 : _state$event_time_slo2.start_date_time]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeFR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('A'));
    setTimeMIN(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('m'));
    setTimeHR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('h'));
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'));
  }, []);

  for (var i = 1; i < 13; i++) {
    Hours.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: i,
      selected: timeHR == i
    }, i, " hr"));
  }

  [0, 15, 30, 45].map(function (res, i) {
    Minutes.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: res,
      selected: timeMIN == res
    }, ('0' + res).slice(-2), " min"));
  });

  var onSave = function onSave() {
    var _state$event_time_slo3;

    var originalDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
    var originalTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(originalDate + '' + ('0' + timeHR).slice(-2) + '' + ('0' + timeMIN).slice(-2) + '' + timeFR, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
    var startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()((_state$event_time_slo3 = state.event_time_slot[state.ChangeTime.index]) === null || _state$event_time_slo3 === void 0 ? void 0 : _state$event_time_slo3.start_date_time, 'YYYY-MM-DD HH:mm:ss');

    if (state.ChangeTime.type == "start") {
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    } else if (state.ChangeTime.type == "end") {
      originalTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(value + '' + ('0' + timeHR).slice(-2) + '' + ('0' + timeMIN).slice(-2) + '' + timeFR, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    } else {
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    }
  };

  var handleDate = function handleDate(e) {
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(e.format(), 'YYYY-MM-DD').format('YYYY-MM-DD'));
  };

  var onTimeChange = function onTimeChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name == "Hours") {
      setTimeHR(value);
    } else if (name == "Minutes") {
      setTimeMIN(value);
    } else if (name == "TimeFormat") {
      setTimeFR(value);
    }
  };

  var onSaveTimeChange = function onSaveTimeChange(time, index, type) {
    var eventDurationSlots = _toConsumableArray(state.event_time_slot);

    var TimeOverlappedIndex = _toConsumableArray(state.TimeOverlappedIndex);

    if (type == "start") {
      eventDurationSlots[index]['start_date_time'] = time;
      eventDurationSlots[index]['start_time'] = time;
    } else if (type == "end") {
      eventDurationSlots[index]['interval'] = moment__WEBPACK_IMPORTED_MODULE_1___default()(time, "YYYY-MM-DD HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].start_date_time, "YYYY-MM-DD HH:mm:ss"), 'day');
      eventDurationSlots[index]['end_date_time'] = time;
      eventDurationSlots[index]['end_time'] = time;
    }

    if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].end_date_time, "YYYY-MM-DD HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].start_date_time, "YYYY-MM-DD HH:mm:ss"), 'Hours') > 6) {
      toastr["error"]('Event duration can not be greater than 6 hours');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlapped",
        payload: {
          Type: "TimeOverlapped",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].end_date_time, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss') === moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].start_date_time, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')) {
      toastr["error"]('Minimum 15 min of event duration required');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlappedMin",
        payload: {
          Type: "TimeOverlappedMin",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].end_date_time, "YYYY-MM-DD HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_time_slot[index].start_date_time, "YYYY-MM-DD HH:mm:ss"), 'minutes') < 15) {
      toastr["error"]('Start time can not be greater than end time');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlappedMin",
        payload: {
          Type: "TimeOverlappedMin",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else {
      dispatch({
        type: "TimeOverlapped",
        payload: {
          Type: "TimeOverlapped",
          TimeOverlapped: false,
          TimeOverlappedIndex: TimeOverlappedIndex.filter(function (res) {
            return res != index;
          })
        }
      });
    }

    var duration = moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].end_time, "h:mm A").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].start_time, "h:mm A"))).minutes();
    eventDurationSlots[index]['duration'] = duration;
    dispatch({
      type: 'eventDurationSlots',
      payload: {
        Type: 'eventDurationSlots',
        event_time_slot: eventDurationSlots
      }
    });
    $('#EditTimeChangeModal').modal('hide');
    console.log(state.TimeOverlappedIndex, index, 'TimeOverlappedIndex');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: "EditTimeChangeModal",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "w-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "flex-select-bx w-100"
  }, state.ChangeTime.type == "end" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_2___default.a, {
    inputClass: "form-control",
    minDate: new Date(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD')),
    value: moment__WEBPACK_IMPORTED_MODULE_1___default()((_state$event_time_slo4 = state.event_time_slot[state.ChangeTime.index]) === null || _state$event_time_slo4 === void 0 ? void 0 : _state$event_time_slo4.end_date_time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
    format: "YYYY-MM-DD",
    onChange: handleDate
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "label-small-h"
  }, value))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    style: {
      width: '30%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "Hours",
    onChange: onTimeChange
  }, Hours))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "Minutes",
    onChange: onTimeChange
  }, Minutes))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "TimeFormat",
    onChange: onTimeChange,
    value: timeFR
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "AM",
    selected: timeFR === "AM"
  }, "AM"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "PM",
    selected: timeFR === "PM"
  }, "PM")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "till-date-bx"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-7 col-sm-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    onClick: onSave
  }, "Save")))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TimeChangeModal));

/***/ }),

/***/ "./resources/js/utility/Reducer.js":
/*!*****************************************!*\
  !*** ./resources/js/utility/Reducer.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Reducer = function Reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case payload.Type:
      return _objectSpread(_objectSpread({}, state), payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Reducer);

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