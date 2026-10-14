(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "./resources/js/User/Payments/Reducer/UserPaymentReducer.js":
/*!******************************************************************!*\
  !*** ./resources/js/User/Payments/Reducer/UserPaymentReducer.js ***!
  \******************************************************************/
/*! exports provided: default, UserPaymentInitialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPaymentInitialState", function() { return UserPaymentInitialState; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var UserPaymentInitialState = {
  UserPayments: [],
  Preloader: true,
  OnScroll: false,
  UserPaymentFilter: 'All',
  UserPaymentSearch: '',
  Pagination: '',
  bankDetails: false,
  DateRangePickerModal: false,
  DateRangeStart: new Date(),
  DateRangeEnd: new Date()
};

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "SET_PAYMENT_RESPONSE":
      return _objectSpread(_objectSpread({}, state), {}, {
        UserPayments: payload
      });

    case "SET_PAYMENT_PAGINATION":
      return _objectSpread(_objectSpread({}, state), {}, {
        Pagination: payload
      });

    case "SET_PAYMENT_PRELOADER":
      return _objectSpread(_objectSpread({}, state), {}, {
        Preloader: payload
      });

    case "ON_SCROLL":
      return _objectSpread(_objectSpread({}, state), {}, {
        OnScroll: payload
      });

    case "BANK_DETAILS":
      return _objectSpread(_objectSpread({}, state), {}, {
        bankDetails: payload
      });

    case "SET_ON_SCROLL_RESPONSE":
      return _objectSpread(_objectSpread({}, state), {}, {
        UserPayments: [].concat(_toConsumableArray(state.UserPayments), _toConsumableArray(payload))
      });

    case "USER_PAYMENT_SEARCH_FILTER":
      return _objectSpread(_objectSpread({}, state), {}, {
        UserPaymentFilter: payload
      });

    case "USER_PAYMENT_SEARCH":
      return _objectSpread(_objectSpread({}, state), {}, {
        UserPaymentSearch: payload
      });

    case "DATE_PICKER_MODAL":
      return _objectSpread(_objectSpread({}, state), {}, {
        DateRangePickerModal: payload
      });

    case "DATE_PICKER":
      return _objectSpread(_objectSpread({}, state), {}, {
        DateRangeStart: payload.DateRangeStart,
        DateRangeEnd: payload.DateRangeEnd
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);


/***/ }),

/***/ "./resources/js/components/Filter/TopFilter.jsx":
/*!******************************************************!*\
  !*** ./resources/js/components/Filter/TopFilter.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fullcalendar_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fullcalendar/react */ "./node_modules/@fullcalendar/react/dist/main.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FilterPopup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FilterPopup */ "./resources/js/components/Filter/FilterPopup.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var TopFilter = function TopFilter(props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      Search = _React$useState2[0],
      setSearch = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState([1, 2, 3, 4]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      Reset = _React$useState4[0],
      setReset = _React$useState4[1];

  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      SearchFilter = _React$useState6[0],
      setSearchFilter = _React$useState6[1];

  var searchQuery = function searchQuery(e) {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(Search);
  };

  var onChangeHandel = function onChangeHandel(eve) {
    setSearchFilter(eve);
  };

  var handelSubmit = function handelSubmit(e) {
    e.preventDefault();
  };

  var ResetFilter = function ResetFilter(e) {
    setReset([]);
    return toastr["error"]("Reset");
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "event-filter-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "e-f-c-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handelSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "lft-search-filter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    onChange: searchQuery,
    className: "form-control",
    placeholder: "Search...",
    type: "text",
    value: Search
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn search-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  }), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "fillter-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn",
    "data-toggle": "modal",
    "data-target": "#filter-popup"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-filter-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "reset-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: function onClick(e) {
      ResetFilter(e);
    },
    className: "btn link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-reset-icon"
  }), " Reset"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FilterPopup__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onChangeHandel: onChangeHandel,
    value: SearchFilter
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (TopFilter);

/***/ }),

/***/ "./resources/js/components/Home/Cards/EventBoxPreloader/EventCardBoxPreloader.jsx":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/Home/Cards/EventBoxPreloader/EventCardBoxPreloader.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventCardBoxPreloader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var EventCardBoxPreloader = /*#__PURE__*/function (_Component) {
  _inherits(EventCardBoxPreloader, _Component);

  var _super = _createSuper(EventCardBoxPreloader);

  function EventCardBoxPreloader() {
    _classCallCheck(this, EventCardBoxPreloader);

    return _super.apply(this, arguments);
  }

  _createClass(EventCardBoxPreloader, [{
    key: "render",
    value: function render() {
      var index = [];

      for (var i = 0; i < 10; i++) {
        index.push(i);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, index.map(function (res, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: index,
          className: "event-row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "event-col"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "event-detail-bx"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "wishlist-icon"
        }, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "event-img"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
          width: 270,
          height: 200
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "event-s-info"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
          count: 4
        })))));
      }));
    }
  }]);

  return EventCardBoxPreloader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./resources/js/components/Home/Cards/EventCardGridBoxList.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Home/Cards/EventCardGridBoxList.jsx ***!
  \*********************************************************************/
/*! exports provided: DivCard, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivCard", function() { return DivCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _EventBoxCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventBoxCard */ "./resources/js/components/Home/Cards/EventBoxCard.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _EventBoxPreloader_EventCardBoxPreloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventBoxPreloader/EventCardBoxPreloader */ "./resources/js/components/Home/Cards/EventBoxPreloader/EventCardBoxPreloader.jsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ApiServer/GlobalLink */ "./resources/js/ApiServer/GlobalLink.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _screens_Events_Constant_CurrentUserEventContext_CurrentUserEventsContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext */ "./resources/js/components/screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext.js");
/* harmony import */ var _EventsShowContext_EventsShowContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../EventsShowContext/EventsShowContext */ "./resources/js/components/Home/EventsShowContext/EventsShowContext.js");
var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var EventCardGridBoxList = function EventCardGridBoxList(props) {
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_7__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_EventsShowContext_EventsShowContext__WEBPACK_IMPORTED_MODULE_9__["default"]),
      _useContext2 = _slicedToArray(_useContext, 6),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      LoadMoreEvents = _useContext2[2],
      actionEvent = _useContext2[3],
      inviteEvent = _useContext2[4],
      shareEvent = _useContext2[5];

  var EventBoxCard = function EventBoxCard(data, index) {
    var _data$event_time_slot, _data$event_time_slot2, _data$event_time_slot3, _data$event_create_us, _data$event_create_us2, _data$favorite_events, _data$event_time_slot4, _data$event_time_slot5, _props$currentUser, _data$event_time_slot6, _data$event_time_slot7, _data$event_time_slot8, _data$event_time_slot9, _data$event_time_slot10, _data$event_time_slot11, _data$event_time_slot12, _data$event_time_slot13, _data$event_time_slot14, _data$event_time_slot15;

    var SeatsNumber = (data === null || data === void 0 ? void 0 : (_data$event_time_slot = data.event_time_slot) === null || _data$event_time_slot === void 0 ? void 0 : _data$event_time_slot.length) > 0 ? parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot2 = data.event_time_slot[0]) === null || _data$event_time_slot2 === void 0 ? void 0 : _data$event_time_slot2.total_seats) - parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot3 = data.event_time_slot[0]) === null || _data$event_time_slot3 === void 0 ? void 0 : _data$event_time_slot3.booked_seats) : 0; // console.log(data,index,'list loops of even cards')

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventBoxCard__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: data === null || data === void 0 ? void 0 : data.id,
      rating: (data === null || data === void 0 ? void 0 : (_data$event_create_us = data.event_create_user) === null || _data$event_create_us === void 0 ? void 0 : (_data$event_create_us2 = _data$event_create_us.event_reviews) === null || _data$event_create_us2 === void 0 ? void 0 : _data$event_create_us2.average_rating) || 0,
      action: actionEvent,
      favorite: (data === null || data === void 0 ? void 0 : (_data$favorite_events = data.favorite_events) === null || _data$favorite_events === void 0 ? void 0 : _data$favorite_events.user_id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) && (data === null || data === void 0 ? void 0 : data.favorite_events) != null ? true : false,
      remainingSeats: (data === null || data === void 0 ? void 0 : (_data$event_time_slot4 = data.event_time_slot) === null || _data$event_time_slot4 === void 0 ? void 0 : _data$event_time_slot4.length) > 0 ? parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot5 = data.event_time_slot[0]) === null || _data$event_time_slot5 === void 0 ? void 0 : _data$event_time_slot5.booked_seats) : 0,
      totalSeats: SeatsNumber,
      UserProfileURL: _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_6__["default"].UserProfileId(data === null || data === void 0 ? void 0 : data.event_create_user.username),
      authUser: (data === null || data === void 0 ? void 0 : data.event_create_user.id) === ((_props$currentUser = props.currentUser) === null || _props$currentUser === void 0 ? void 0 : _props$currentUser.id) ? true : false,
      userName: data !== null && data !== void 0 && data.event_create_user ? data === null || data === void 0 ? void 0 : data.event_create_user.name : 'N/A',
      offer: data !== null && data !== void 0 && data.event_discount ? parseInt(data === null || data === void 0 ? void 0 : data.event_discount.offer) + ' %' : null,
      attending: data !== null && data !== void 0 && data.attending ? data === null || data === void 0 ? void 0 : data.attending : 0,
      attendingInHours: moment__WEBPACK_IMPORTED_MODULE_5___default()().diff(moment__WEBPACK_IMPORTED_MODULE_5___default()(data === null || data === void 0 ? void 0 : data.created_at), 'hours'),
      eventCost: (data === null || data === void 0 ? void 0 : (_data$event_time_slot6 = data.event_time_slot) === null || _data$event_time_slot6 === void 0 ? void 0 : _data$event_time_slot6.length) > 0 ? data !== null && data !== void 0 && (_data$event_time_slot7 = data.event_time_slot[0]) !== null && _data$event_time_slot7 !== void 0 && _data$event_time_slot7.cost ? (data === null || data === void 0 ? void 0 : (_data$event_time_slot8 = data.event_time_slot[0]) === null || _data$event_time_slot8 === void 0 ? void 0 : _data$event_time_slot8.cost) > 0 ? "$".concat(data === null || data === void 0 ? void 0 : (_data$event_time_slot9 = data.event_time_slot[0]) === null || _data$event_time_slot9 === void 0 ? void 0 : _data$event_time_slot9.cost) : 'Free' : 0 : '0',
      eventRating: data === null || data === void 0 ? void 0 : data.eventRating,
      eventStartedAt: (data === null || data === void 0 ? void 0 : (_data$event_time_slot10 = data.event_time_slot) === null || _data$event_time_slot10 === void 0 ? void 0 : _data$event_time_slot10.length) > 0 ? data !== null && data !== void 0 && (_data$event_time_slot11 = data.event_time_slot[0]) !== null && _data$event_time_slot11 !== void 0 && _data$event_time_slot11.start_date ? moment__WEBPACK_IMPORTED_MODULE_5___default()(moment__WEBPACK_IMPORTED_MODULE_5___default()(data === null || data === void 0 ? void 0 : (_data$event_time_slot12 = data.event_time_slot[0]) === null || _data$event_time_slot12 === void 0 ? void 0 : _data$event_time_slot12.start_date, 'YYYY-MM-DD')).format('D MMM YYYY') : 'N/A' : "N/A",
      id: data === null || data === void 0 ? void 0 : data.id,
      eventSlotId: (data === null || data === void 0 ? void 0 : (_data$event_time_slot13 = data.event_time_slot) === null || _data$event_time_slot13 === void 0 ? void 0 : _data$event_time_slot13.length) > 0 ? data !== null && data !== void 0 && (_data$event_time_slot14 = data.event_time_slot[0]) !== null && _data$event_time_slot14 !== void 0 && _data$event_time_slot14.id ? data === null || data === void 0 ? void 0 : (_data$event_time_slot15 = data.event_time_slot[0]) === null || _data$event_time_slot15 === void 0 ? void 0 : _data$event_time_slot15.id : 0 : 0,
      eventTitle: data === null || data === void 0 ? void 0 : data.event_title,
      eventType: data === null || data === void 0 ? void 0 : data.event_type,
      favIcon: data === null || data === void 0 ? void 0 : data.favIcon,
      imageUrl: JSON.parse(data === null || data === void 0 ? void 0 : data.event_files),
      eventToken: data === null || data === void 0 ? void 0 : data.remember_token
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_screens_Events_Constant_CurrentUserEventContext_CurrentUserEventsContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
    value: state === null || state === void 0 ? void 0 : state.Events
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DivCard, {
    className: "e-c-list bdr-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DivCard, {
    className: "cmn-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, props.Title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-row"
  }, state !== null && state !== void 0 && state.Preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventBoxPreloader_EventCardBoxPreloader__WEBPACK_IMPORTED_MODULE_4__["default"], null) : state === null || state === void 0 ? void 0 : state.Events.map(EventBoxCard)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DivCard, {
    className: "show-more-card"
  }, (state === null || state === void 0 ? void 0 : state.nextPage) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    onClick: LoadMoreEvents,
    className: "more-show-btn",
    to: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-double-down-arrow-icon"
  })) : '')));
};

var DivCard = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  \n"])));
/* harmony default export */ __webpack_exports__["default"] = (EventCardGridBoxList);

/***/ }),

/***/ "./resources/js/components/Home/Cards/HomeReducer/HomeReducer.js":
/*!***********************************************************************!*\
  !*** ./resources/js/components/Home/Cards/HomeReducer/HomeReducer.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "PAGINATION":
      return _objectSpread(_objectSpread({}, state), payload);

    case "SET_EVENTS_RESPONSE":
      return _objectSpread(_objectSpread({}, state), payload);

    case "PRELOADER":
      return _objectSpread(_objectSpread({}, state), payload);

    case "FAVORITE":
      return _objectSpread(_objectSpread({}, state), payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./resources/js/components/Home/Cards/HomeSection.jsx":
/*!************************************************************!*\
  !*** ./resources/js/components/Home/Cards/HomeSection.jsx ***!
  \************************************************************/
/*! exports provided: Section, Card, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _EventCardGridBoxList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventCardGridBoxList */ "./resources/js/components/Home/Cards/EventCardGridBoxList.jsx");
/* harmony import */ var _Filter_TopFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Filter/TopFilter */ "./resources/js/components/Filter/TopFilter.jsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _EventsShowContext_EventsShowContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../EventsShowContext/EventsShowContext */ "./resources/js/components/Home/EventsShowContext/EventsShowContext.js");
/* harmony import */ var _ApiServer_AllEventsDetails__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../ApiServer/AllEventsDetails */ "./resources/js/ApiServer/AllEventsDetails.js");
/* harmony import */ var _ApiServer_EventHandling_EventHandlingServices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../ApiServer/EventHandling/EventHandlingServices */ "./resources/js/ApiServer/EventHandling/EventHandlingServices.js");
/* harmony import */ var _HomeReducer_HomeReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./HomeReducer/HomeReducer */ "./resources/js/components/Home/Cards/HomeReducer/HomeReducer.js");
/* harmony import */ var _User_Payments_Reducer_UserPaymentReducer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../User/Payments/Reducer/UserPaymentReducer */ "./resources/js/User/Payments/Reducer/UserPaymentReducer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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














var initialState = {
  currentPage: 1,
  nextPage: '',
  previewsPage: '',
  Events: [],
  Preloader: true,
  Favorite: null
};

var HomeSection = function HomeSection(props) {
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_HomeReducer_HomeReducer__WEBPACK_IMPORTED_MODULE_11__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    function fetchEventData() {
      return _fetchEventData.apply(this, arguments);
    }

    function _fetchEventData() {
      _fetchEventData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var AllEvents, res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                AllEvents = {
                  Page: '',
                  tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess(),
                  eventType: props.Title
                };
                _context.next = 3;
                return _ApiServer_AllEventsDetails__WEBPACK_IMPORTED_MODULE_9__["default"].GetAllEventsDetails(AllEvents);

              case 3:
                res = _context.sent;

                if (res.data.status == 200) {
                  dispatch({
                    type: 'SET_EVENTS_RESPONSE',
                    payload: {
                      Events: res.data.EventData.data
                    }
                  });
                  dispatch({
                    type: 'PRELOADER',
                    payload: {
                      Preloader: false
                    }
                  });
                  dispatch({
                    type: 'PAGINATION',
                    payload: {
                      currentPage: res.data.EventData.current_page,
                      previewsPage: res.data.EventData.prev_page_url,
                      nextPage: res.data.EventData.next_page_url
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
      return _fetchEventData.apply(this, arguments);
    }

    fetchEventData();
    return;
  }, [props.Title, state === null || state === void 0 ? void 0 : state.Favorite]);

  function LoadMoreEvents(_x) {
    return _LoadMoreEvents.apply(this, arguments);
  }

  function _LoadMoreEvents() {
    _LoadMoreEvents = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
      var AllEvents, res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch({
                type: 'PRELOADER',
                payload: {
                  Preloader: true
                }
              });

              if (!((state === null || state === void 0 ? void 0 : state.nextPage) != null)) {
                _context3.next = 9;
                break;
              }

              AllEvents = {
                Page: state !== null && state !== void 0 && state.nextPage ? "page=".concat((state === null || state === void 0 ? void 0 : state.currentPage) + 1) : state === null || state === void 0 ? void 0 : state.currentPage,
                eventType: props.Title,
                tz: moment__WEBPACK_IMPORTED_MODULE_1___default.a.tz.guess()
              };
              _context3.next = 5;
              return _ApiServer_AllEventsDetails__WEBPACK_IMPORTED_MODULE_9__["default"].GetAllEventsDetails(AllEvents);

            case 5:
              res = _context3.sent;

              if (res.data.status == 200) {
                dispatch({
                  type: 'SET_EVENTS_RESPONSE',
                  payload: {
                    Events: [].concat(_toConsumableArray(state === null || state === void 0 ? void 0 : state.Events), _toConsumableArray(res.data.EventData.data))
                  }
                });
                dispatch({
                  type: 'PRELOADER',
                  payload: {
                    Preloader: false
                  }
                });
                dispatch({
                  type: 'PAGINATION',
                  payload: {
                    currentPage: res.data.EventData.current_page,
                    previewsPage: res.data.EventData.prev_page_url,
                    nextPage: res.data.EventData.next_page_url
                  }
                });
              } else {
                dispatch({
                  type: 'PRELOADER',
                  payload: {
                    Preloader: false
                  }
                });
              }

              _context3.next = 11;
              break;

            case 9:
              dispatch({
                type: 'PRELOADER',
                payload: {
                  Preloader: false
                }
              });
              alert('No More Events Found');

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _LoadMoreEvents.apply(this, arguments);
  }

  var actionEvent = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(eventId, type) {
      var data, response, event;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = {
                eventId: eventId,
                eventAction: type
              };
              _context2.next = 3;
              return _ApiServer_EventHandling_EventHandlingServices__WEBPACK_IMPORTED_MODULE_10__["default"].PostEventHandlingServices(data);

            case 3:
              response = _context2.sent;

              if (!(response.data.status == 200)) {
                _context2.next = 10;
                break;
              }

              event = state === null || state === void 0 ? void 0 : state.Events.filter(function (event) {
                return event.id != eventId;
              });
              dispatch({
                type: 'SET_EVENTS_RESPONSE',
                payload: {
                  Events: event
                }
              });
              return _context2.abrupt("return", toastr["success"](response.data.messages));

            case 10:
              if (!(response.data.status == 'failed')) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", toastr["error"](response.data.messages));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function actionEvent(_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var inviteEvent = function inviteEvent(eventId) {
    return alert(eventId);
  };

  var shareEvent = function shareEvent(event) {
    return alert(event);
  };

  $('.modal').modal('hide');
  var eventsData = [state, dispatch, LoadMoreEvents, actionEvent, inviteEvent, shareEvent];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventsShowContext_EventsShowContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
    value: eventsData
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Section, {
    className: "mid-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter_TopFilter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    topSearchHandel: props.topSearchHandel,
    topFilterHandel: props.topFilterHandel
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Card, {
    className: "event-card-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Card, {
    className: "container"
  }, props.Title.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventCardGridBoxList__WEBPACK_IMPORTED_MODULE_4__["default"], {
      currentUser: props.currentUser,
      key: index,
      Title: res
    });
  })))));
};

var Section = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].section(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  \n"])));
var Card = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  \n"])));
/* harmony default export */ __webpack_exports__["default"] = (HomeSection);

/***/ }),

/***/ "./resources/js/components/Home/EventsShowContext/EventsShowContext.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/Home/EventsShowContext/EventsShowContext.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var EventsShowContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
/* harmony default export */ __webpack_exports__["default"] = (EventsShowContext);

/***/ }),

/***/ "./resources/js/components/screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext.js":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext.js ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CurrentUserEventsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (CurrentUserEventsContext);

/***/ }),

/***/ "./resources/js/components/screens/Homepage/HomePage.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/components/screens/Homepage/HomePage.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Navbar/Navbar */ "./resources/js/components/Navbar/Navbar.jsx");
/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Sidebar/Sidebar */ "./resources/js/components/Sidebar/Sidebar.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_UserAuthService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ApiServer/UserAuthService */ "./resources/js/ApiServer/UserAuthService.jsx");
/* harmony import */ var _ApiServer_AllEventsDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ApiServer/AllEventsDetails */ "./resources/js/ApiServer/AllEventsDetails.js");
/* harmony import */ var _Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Filter/FilterPopup */ "./resources/js/components/Filter/FilterPopup.jsx");
/* harmony import */ var _Home_Cards_HomeSection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Home/Cards/HomeSection */ "./resources/js/components/Home/Cards/HomeSection.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Footer/Footer */ "./resources/js/components/Footer/Footer.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }













var HomePage = /*#__PURE__*/function (_Component) {
  _inherits(HomePage, _Component);

  var _super = _createSuper(HomePage);

  function HomePage(props) {
    var _this;

    _classCallCheck(this, HomePage);

    _this = _super.call(this);
    var Token = localStorage.getItem("accessToken");
    var IsLogin = true;

    if (Token == null) {
      IsLogin = false;
    }

    _this.state = {
      IsLogin: IsLogin,
      SideBar: {
        ActiveSidebar: '',
        EventType: ''
      },
      Preloader: true,
      allEventsResponse: {}
    };
    _this.topSearchHandel = _this.topSearchHandel.bind(_assertThisInitialized(_this));
    _this.topFilterHandel = _this.topFilterHandel.bind(_assertThisInitialized(_this));
    _this.sidebarHandel = _this.sidebarHandel.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HomePage, [{
    key: "topSearchHandel",
    value: function topSearchHandel(e) {
      console.log(e, "searchHandel");
    }
  }, {
    key: "topFilterHandel",
    value: function topFilterHandel(e) {
      console.log(e, "topFilterHandel");
    }
  }, {
    key: "sidebarHandel",
    value: function sidebarHandel(e) {
      console.log(e, "SideBarHandel");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      document.title = "Home";
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__["default"].Consumer, null, function (user) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], {
          currentUser: user,
          sidebarHandel: _this2.sidebarHandel
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_6__["default"], {
          currentUser: user
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Home_Cards_HomeSection__WEBPACK_IMPORTED_MODULE_7__["default"], {
          currentUser: user,
          topFilterHandel: _this2.topFilterHandel,
          topSearchHandel: _this2.topSearchHandel,
          Title: _this2.props.Title
        }));
      }));
    }
  }]);

  return HomePage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (HomePage);

/***/ })

}]);