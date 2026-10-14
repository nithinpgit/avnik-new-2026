(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[45],{

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

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/QuickReply/QuickReply.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/QuickReply/QuickReply.jsx ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var QuickReply = function QuickReply() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1];

  var handleChange = function handleChange(e) {
    console.log(e);
    var name = e.target.name;

    if (name === "broadcasting") {
      globalDispatch({
        type: name,
        payload: _defineProperty({
          Type: name
        }, name, !globalState.broadcasting)
      });
    }
  };

  var handleFrom = function handleFrom(e) {
    e.preventDefault();
    var data = {
      roomName: globalState.roomName,
      eventId: globalState.eventId,
      slotId: globalState.slotId,
      roomImage: globalState.roomImage,
      broadcasting: globalState.broadcasting
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._createEventRoom(data).then(function (res) {
      if (res.data.status == 200) {
        $('#quick-message-popup').modal('hide');
        console.log(res);
        globalDispatch({
          type: "Redirect",
          payload: {
            Type: "Redirect",
            Redirect: "/messages"
          }
        });
        globalDispatch({
          type: 'Reset',
          payload: {
            Type: 'Reset',
            roomName: '',
            eventId: '',
            slotId: '',
            roomImage: '',
            broadcasting: false,
            slotTime: ''
          }
        });
      } else {}

      console.log(res);
    })["catch"](function (error) {
      console.log(error);
    });
  };

  console.log(globalState, 'globalState');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal fade default-popup create-folder-popup quick-message-popup",
    id: "quick-message-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleFrom
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
    className: "modal-title"
  }, "Message")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "g-m-title-dt"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, globalState.roomName ? globalState.roomName : 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc().format('dddd'), ", ", moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc().format('DD MMM YYYY hh:m a'), " (UTC)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-ck-forgot-p-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "checkbox",
    name: "broadcasting",
    onChange: handleChange,
    checked: globalState.broadcasting,
    value: globalState.broadcasting
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "ck-bx-c"
  }, "Broadcast (Only host would be able to message)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: globalState.eventId && globalState.slotId ? false : true
  }, "Create"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(QuickReply));

/***/ })

}]);