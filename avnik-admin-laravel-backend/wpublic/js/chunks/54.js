(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[54],{

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/StepOne.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/StepOne.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var StepOne = function StepOne() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 11),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      resetFormState = _useContext2[2],
      onChangeCalendar = _useContext2[3],
      onDragSelect = _useContext2[4],
      removeSetImage = _useContext2[5],
      removeSetFiles = _useContext2[6],
      MyEventsList = _useContext2[7],
      JoinRequestPopupHandling = _useContext2[8],
      handleFormSubmit = _useContext2[9],
      CalenderDots = _useContext2[10];

  var nextButton = function nextButton(eve) {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()(eve).modal({
      backdrop: 'static',
      keyboard: false
    });
  };

  var onChange = function onChange(e) {
    dispatch({
      type: 'SelectWebinarType',
      payload: {
        Type: 'SelectWebinarType',
        SelectWebinarType: e.target.value
      }
    });
  };

  var Appointments = state.Appointments,
      Training = state.Training,
      Webinar = state.Webinar,
      Discussion = state.Discussion;

  var EventWebinarInfo = function EventWebinarInfo(_ref) {
    var webinarType = _ref.webinarType,
        webinarMedia = _ref.webinarMedia,
        webinarDetails = _ref.webinarDetails;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-sm-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "content-event-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "popup-sub-title"
    }, webinarType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "event-cat-img"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: webinarMedia,
      alt: webinarType
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, webinarDetails))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "create-my-event-popup",
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
    onClick: resetFormState,
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "modal-title"
  }, "Create My Event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "saved-card-list choose-cat-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event",
    onChange: onChange,
    value: "Appointments",
    checked: state.SelectWebinarType == "Appointments" ? true : false
  }), "Appointments"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event",
    onChange: onChange,
    value: "Training",
    checked: state.SelectWebinarType == "Training" ? true : false
  }), "Training "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event",
    onChange: onChange,
    value: "Webinar",
    checked: state.SelectWebinarType == "Webinar" ? true : false
  }), "Webinar "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "event",
    onChange: onChange,
    value: "Discussion",
    checked: state.SelectWebinarType == "Discussion" ? true : false
  }), "Discussion")))))), state.SelectWebinarType != '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(EventWebinarInfo, {
    webinarType: state.SelectWebinarType,
    webinarMedia: state.SelectWebinarType === "Webinar" ? "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "/public/assets/images/webinar.svg") : state.SelectWebinarType === "Discussion" ? "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "/public/assets/images/meet-img.svg") : state.SelectWebinarType === "Appointments" ? "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "/public/assets/images/appointments-img.svg") : state.SelectWebinarType === "Training" ? "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "/public/assets/images/training-img.svg") : '',
    webinarDetails: state.SelectWebinarType == 'Appointments' ? Appointments : state.SelectWebinarType == 'Discussion' ? Discussion : state.SelectWebinarType == 'Training' ? Training : state.SelectWebinarType == 'Webinar' ? Webinar : ''
  }) : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, state.SelectWebinarType != '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return nextButton('#create-my-event-step-3-popup');
    },
    className: "btn default-btn float-right",
    "data-toggle": "modal",
    "data-dismiss": "modal",
    disabled: state.SelectWebinarType ? false : true
  }, "Continue") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn float-right",
    disabled: true
  }, "Continue")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(StepOne));

/***/ })

}]);