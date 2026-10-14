(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43],{

/***/ "./resources/js/User/Profiles/ProfileModals/ShareProfilePopup.jsx":
/*!************************************************************************!*\
  !*** ./resources/js/User/Profiles/ProfileModals/ShareProfilePopup.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/screens/CreateEvent/Errors/ValidationError/FormError */ "./resources/js/components/screens/CreateEvent/Errors/ValidationError/FormError.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
/* harmony import */ var react_share__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-share */ "./node_modules/react-share/es/index.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var ShareProfilePopup = function ShareProfilePopup(_ref) {
  var title = _ref.title,
      type = _ref.type,
      url = _ref.url;
  // const history = window.location;
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_8__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1];

  var CopyToClipBoard = function CopyToClipBoard(text) {
    var copyText = document.querySelector("#copy-input");
    copyText.select();
    document.execCommand("copy");

    if (copyText.value) {
      toastr["success"]('URL Copy');
    } else {
      toastr["error"]('URL Not Copy');
    } // navigator.clipboard.writeText(text).then(()=>toastr["success"]('URL Copy')).catch(()=>toastr["error"]('URL Not Copy'));

  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      Email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      Sending = _useState4[0],
      setSending = _useState4[1];

  var ShareProfile = function ShareProfile() {
    setSending(true);
    var data = {
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
      profileUrl: url || (globalState === null || globalState === void 0 ? void 0 : globalState.Share),
      email: Email,
      type: type || "Profile"
    };
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/profile/share', data, {
      headers: {
        'Accept': 'application/json',
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_4__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        toastr["success"](res.data.message);
        $('#share-profile-popup').modal('hide');
        setEmail('');
        setSending(false);
      }

      if (res.data.status == "failed") {
        setSending(false);

        if (res.data.validation_error) {
          var ErrorEmail = res.data.validation_error.email;

          if (ErrorEmail) {
            _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_2__["default"].responseValidationError(ErrorEmail);
          }
        } else {
          toastr["error"](res.data.message);
        }
      }
    })["catch"](function (error) {
      setSending(false);
      console.log(error);
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal fade default-popup share-profile-popup",
    id: "share-profile-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
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
  }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "meeting-room-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label"
  }, "Share Link to via Social"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-btns-social"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "footer-social-icn a2a_kit a2a_kit_size_32 a2a_default_style"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "fb"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["FacebookShareButton"], {
    url: globalState === null || globalState === void 0 ? void 0 : globalState.Share // quote={title}
    // className="Demo__some-network__share-button"

  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["FacebookIcon"], {
    size: 32,
    round: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "twitter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["TwitterShareButton"], {
    url: globalState === null || globalState === void 0 ? void 0 : globalState.Share
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["TwitterIcon"], {
    size: 32,
    round: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "linkedin"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["LinkedinShareButton"], {
    url: globalState === null || globalState === void 0 ? void 0 : globalState.Share
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["LinkedinIcon"], {
    size: 32,
    round: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
    className: "google"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["PinterestShareButton"], {
    url: globalState === null || globalState === void 0 ? void 0 : globalState.Share // media={`${ProfileDetails?.user_profile?.profile_picture?FileManagerPath+ProfileDetails?.user_profile?.profile_picture:`${FileManagerPath}/public/assets/images/avatar.png`}`}

  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_share__WEBPACK_IMPORTED_MODULE_6__["PinterestIcon"], {
    size: 32,
    round: true
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label"
  }, "Copy Link"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "meeting-room-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    placeholder: "",
    id: "copy-input",
    onChange: function onChange() {
      return console.log('Sorry you cant change the url');
    },
    value: globalState === null || globalState === void 0 ? void 0 : globalState.Share,
    className: "form-control"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return CopyToClipBoard(url || (globalState === null || globalState === void 0 ? void 0 : globalState.Share));
    },
    title: "Click To Copy",
    className: "btn cmn-btn"
  }, "Copy")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label"
  }, "Send link to via mail"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "add-time-input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "email",
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    className: "form-control",
    value: Email,
    placeholder: "Enter Email"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn",
    type: "button",
    disabled: Sending,
    onClick: function onClick() {
      return ShareProfile();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-send-2-icon"
  }), " Send"))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ShareProfilePopup);

/***/ }),

/***/ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var UserProfileContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (UserProfileContext);

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

/***/ })

}]);