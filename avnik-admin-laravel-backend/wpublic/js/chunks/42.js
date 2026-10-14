(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./resources/js/Global/Context/GlobalContext.js":
/*!******************************************************!*\
  !*** ./resources/js/Global/Context/GlobalContext.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var GlobalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (GlobalContext);

/***/ }),

/***/ "./resources/js/Global/Reducer/GlobalReducer.js":
/*!******************************************************!*\
  !*** ./resources/js/Global/Reducer/GlobalReducer.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GlobalReducer = function GlobalReducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case payload.Type:
      return _objectSpread(_objectSpread({}, state), payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (GlobalReducer);

/***/ }),

/***/ "./resources/js/Routes/Protected/ProtectedRoute.js":
/*!*********************************************************!*\
  !*** ./resources/js/Routes/Protected/ProtectedRoute.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _Global_Reducer_GlobalReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Global/Reducer/GlobalReducer */ "./resources/js/Global/Reducer/GlobalReducer.js");
var _excluded = ["component"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









var ShareProfilePopup = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(17), __webpack_require__.e(43)]).then(__webpack_require__.bind(null, /*! ../../User/Profiles/ProfileModals/ShareProfilePopup */ "./resources/js/User/Profiles/ProfileModals/ShareProfilePopup.jsx"));
});
var EditEventSection = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(function () {
  return Promise.all(/*! import() */[__webpack_require__.e(4), __webpack_require__.e(6), __webpack_require__.e(12), __webpack_require__.e(13), __webpack_require__.e(5), __webpack_require__.e(25), __webpack_require__.e(32)]).then(__webpack_require__.bind(null, /*! ../../components/screens/EditEvents/EditEventSection */ "./resources/js/components/screens/EditEvents/EditEventSection.jsx"));
});
var globalInitialState = {
  roomName: "",
  eventSlotEditId: 0,
  EventEditId: 0,
  eventDeleteSlotId: 0,
  eventDeleteId: 0,
  eventCancelSlotId: 0,
  eventCancelId: 0,
  eventActionType: '',
  eventId: "",
  slotId: "",
  roomImage: "",
  broadcasting: false,
  slotTime: "",
  Redirect: "",
  Share: "",
  MyUpComing: [],
  report: {
    userId: "",
    eventId: "",
    report: "",
    comment: ""
  }
};

var ProtectedRoute = function ProtectedRoute(_ref) {
  var Component = _ref.component,
      rest = _objectWithoutProperties(_ref, _excluded);

  document.body.className = rest === null || rest === void 0 ? void 0 : rest["class"];
  document.title = (rest === null || rest === void 0 ? void 0 : rest.Page) || "Avnik";

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      CurrentUserDetails = _useState2[0],
      setCurrentUserDetails = _useState2[1];

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_Global_Reducer_GlobalReducer__WEBPACK_IMPORTED_MODULE_7__["default"], globalInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      globalState = _useReducer2[0],
      globalDispatch = _useReducer2[1];

  var onChangeReport = function onChangeReport(e, id, type) {
    var name = e.target.name;
    var value = e.target.value;

    if (name) {
      var _objectSpread2;

      globalDispatch({
        type: "profileReport",
        payload: {
          Type: "profileReport",
          report: _objectSpread(_objectSpread({}, globalState.report), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, name, value), _defineProperty(_objectSpread2, type, id), _objectSpread2))
        }
      });
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (_Auth__WEBPACK_IMPORTED_MODULE_2__["default"].getAccessToken()) _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"]._authUser().then(function (res) {
      if (res.data.status == 200) {
        setCurrentUserDetails(res.data.data);
      }
    })["catch"](function (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        sessionStorage.clear();
      }

      console.log(error);
    });
    getMyUpComingEvents();
    return;
  }, [window.location.pathname]);

  var getMyUpComingEvents = function getMyUpComingEvents() {
    var data = {
      curretTime: moment__WEBPACK_IMPORTED_MODULE_3___default()().format("HH:mm"),
      curretDate: moment__WEBPACK_IMPORTED_MODULE_3___default()().format("DD-MM-YYYY")
    }; // ApiService._MyUpComingEvents(data).then((res)=>{
    //   console.log(res)
    // }).catch((error)=>{
    //   console.log(error)
    // })
  }; // report profile or events handleForm


  var handleReportUserEvent = function handleReportUserEvent(e) {
    var _globalState$report;

    e.preventDefault(); // setError({ ...Error, formSubmit: true });

    var data = {
      userId: (_globalState$report = globalState.report) === null || _globalState$report === void 0 ? void 0 : _globalState$report.userId,
      eventId: globalState.report.eventId,
      report: globalState.report.report,
      comment: globalState.report.comment
    };
    axios.post("/api/reports", data, {
      headers: {
        Accept: "application/json",
        authorization: "Bearer ".concat(_Auth__WEBPACK_IMPORTED_MODULE_2__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        globalDispatch({
          type: "setReportUserProfile",
          payload: {
            Type: "setReportUserProfile",
            report: {
              userId: "",
              eventId: "",
              report: "",
              comment: ""
            }
          }
        });
        $("#report-event-popup").modal("hide");
        toastr["success"](res.data.message); // setError({ ...Error, formSubmit: false });
      }

      if (res.data.status == "failed") {
        toastr["error"](res.data.message); // setError({ ...Error, formSubmit: false });
      }
    })["catch"](function (error) {
      toastr["error"](error.response.message); // setError({ ...Error, formSubmit: false });

      console.log(error);
    });
  };

  console.log(globalState, 'globalStatePR');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], _extends({}, rest, {
    render: function render(props) {
      var userDetails = CurrentUserDetails || JSON.parse(localStorage.getItem("userData"));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: [globalState, globalDispatch, handleReportUserEvent, onChangeReport]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
        value: userDetails
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ShareProfilePopup // title="Share Profile" 
      , null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EditEventSection, null))); //     if (!Auth.getAccessToken()) {
      //       // not logged in so redirect to login page with the return url
      //         return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      //     }
      // return ( <GlobalContext.Provider value={[globalState, globalDispatch]}>
      //         <CurrentUser.Provider value={userDetails} >
      //           <Component {...rest}  />
      //           <ReportProfilePopup/>
      //         </CurrentUser.Provider>
      //       </GlobalContext.Provider>
      //       );
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ProtectedRoute);

/***/ })

}]);