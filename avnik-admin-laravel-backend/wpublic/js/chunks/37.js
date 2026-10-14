(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

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

/***/ "./resources/js/components/Home/Cards/CreateEvent/CreateEventFileUploadPopUp.jsx":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Home/Cards/CreateEvent/CreateEventFileUploadPopUp.jsx ***!
  \***************************************************************************************/
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
/* harmony import */ var _Pagination_Pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Pagination/Pagination */ "./resources/js/components/Pagination/Pagination.js");
/* harmony import */ var _screens_CreateEvent_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../screens/CreateEvent/Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _screens_CreateEvent_Cards_ImageCropper_CustomeCroppie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../screens/CreateEvent/Cards/ImageCropper/CustomeCroppie */ "./resources/js/components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie.jsx");
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












var CreateEventFileUploadPopUp = function CreateEventFileUploadPopUp(props) {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_screens_CreateEvent_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
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
      $('#presenter-btn').modal('hide');
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
                    eventFiles: _eventFiles,
                    eventImages: _eventFiles,
                    isModalClose: true,
                    eventCropedUrl: '',
                    eventCropedImage: '',
                    eventSelectedFiles: []
                  }
                });
                toastr["success"](response.data.message);
                $('#presenter-btn').modal('hide');
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
    id: "presenter-btn",
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
  })) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_screens_CreateEvent_Cards_ImageCropper_CustomeCroppie__WEBPACK_IMPORTED_MODULE_8__["default"], {
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

/***/ "./resources/js/components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie.jsx ***!
  \*******************************************************************************************/
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

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/StepThree.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/StepThree.jsx ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Home_Cards_CreateEvent_CreateEventFileUploadPopUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Home/Cards/CreateEvent/CreateEventFileUploadPopUp */ "./resources/js/components/Home/Cards/CreateEvent/CreateEventFileUploadPopUp.jsx");
/* harmony import */ var _Tags_Tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tags/Tags */ "./resources/js/components/screens/CreateEvent/Components/Tags/Tags.jsx");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var StepThree = function StepThree(props) {
  var _state$eventDescripti, _state$eventFiles, _state$eventTags, _state$eventDescripti2;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
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
    $("#presenter-btn").modal("show");
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
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"].childCategories({
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
        eventCategory: e.target.value,
        eventSubCategory: 'SubCategory'
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
        eventSubCategory: e.target.value
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "create-my-event-step-4-popup",
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
  }, "Create My Event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
    className: "form-control custom-select-bx",
    onChange: onChangeParentHandle,
    name: "eventCategory",
    value: state.eventCategory
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    defaultValue: "Category",
    disabled: true
  }, "Category"), state === null || state === void 0 ? void 0 : state.parentCategories.map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: res.id,
      value: res.id
    }, res.name);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx ce-category-s-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: onChangeChildHandle,
    name: "eventSubCategory",
    value: state.eventSubCategory
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    disabled: true,
    defaultValue: "SubCategory",
    value: "SubCategory"
  }, "SubCategory"), state === null || state === void 0 ? void 0 : state.childCategories.map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: res.id,
      value: res.id
    }, res.name);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: state.eventDescription.length < 150 || state.eventDescription.length > 600 ? "form-control border-danger" : "form-control border-success",
    name: "eventDescription",
    onChange: function onChange(e) {
      return dispatch({
        type: e.target.name,
        payload: {
          Type: e.target.name,
          eventDescription: e.target.value
        }
      });
    },
    value: state.eventDescription,
    placeholder: "Description"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-left label-small-h"
  }, "min 150"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right label-small-h"
  }, " ", (_state$eventDescripti = state.eventDescription) === null || _state$eventDescripti === void 0 ? void 0 : _state$eventDescripti.length, "/max 600"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Tags_Tags__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: props.value,
    setAnyState: props.setAnyState
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }, state.eventImages.map(function (res, index) {
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
        return props.removeSetImage(res.id);
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
      return prevButton("#create-my-event-step-3-popup");
    },
    className: "btn default-btn float-left",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return nextButton("#create-my-event-step-5-popup");
    },
    disabled: ((_state$eventFiles = state.eventFiles) === null || _state$eventFiles === void 0 ? void 0 : _state$eventFiles.length) > 0 && state.eventSubCategory != "" && state.eventSubCategory != "SubCategory" && state.eventCategory != "Category" && state.eventCategory != "" && (state === null || state === void 0 ? void 0 : (_state$eventTags = state.eventTags) === null || _state$eventTags === void 0 ? void 0 : _state$eventTags.length) > 0 && ((_state$eventDescripti2 = state.eventDescription) === null || _state$eventDescripti2 === void 0 ? void 0 : _state$eventDescripti2.length) >= 150 ? false : true,
    className: "btn default-btn float-right",
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Continue"), " "))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Home_Cards_CreateEvent_CreateEventFileUploadPopUp__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(StepThree));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Tags/Tags.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Tags/Tags.jsx ***!
  \******************************************************************************/
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
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var Tags = function Tags() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  function handleChange(tags) {
    dispatch({
      type: 'eventTags',
      payload: {
        Type: 'eventTags',
        eventTags: tags
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

  var eventTags = state.eventTags,
      eventTag = state.eventTag;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-group add-tag-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Add Tags"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default.a, {
    value: eventTags,
    onChange: handleChange,
    inputValue: eventTag,
    addKeys: [9, 13, 188],
    onChangeInput: handleChangeInput,
    onlyUnique: true,
    maxTags: 15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-left label-small-h"
  }, eventTags.length), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right label-small-h"
  }, "max 15"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Tags);

/***/ })

}]);