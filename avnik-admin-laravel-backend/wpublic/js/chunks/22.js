(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CurrentUser = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});
/* harmony default export */ __webpack_exports__["default"] = (CurrentUser);

/***/ }),

/***/ "./resources/js/components/screens/Auth/LoginSocialIcons/FacebookLoginAvnik.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/Auth/LoginSocialIcons/FacebookLoginAvnik.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_facebook_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-facebook-login */ "./node_modules/react-facebook-login/dist/facebook-login-with-button.js");
/* harmony import */ var react_facebook_login__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_facebook_login__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SocialLoginContext/SocialLoginContext */ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var FacebookLoginAvnik = function FacebookLoginAvnik() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 5),
      signUp = _useContext2[0],
      responseFacebook = _useContext2[1],
      responseGoogle = _useContext2[2],
      responseTwitter = _useContext2[3],
      state = _useContext2[4];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_facebook_login__WEBPACK_IMPORTED_MODULE_1___default.a, {
    appId: "303996060858861",
    autoLoad: false,
    fields: "name,email,picture",
    cssClass: "fb",
    tag: "li",
    type: "",
    callback: responseFacebook,
    textButton: "",
    className: "fb",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-facebook",
      "aria-hidden": "true"
    }))
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (FacebookLoginAvnik);

/***/ }),

/***/ "./resources/js/components/screens/Auth/LoginSocialIcons/GoogleLoginAvnik.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/components/screens/Auth/LoginSocialIcons/GoogleLoginAvnik.jsx ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-google-login */ "./node_modules/react-google-login/dist/google-login.js");
/* harmony import */ var react_google_login__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_google_login__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocialLoginContext/SocialLoginContext */ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var GoogleLoginAvnik = function GoogleLoginAvnik() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 5),
      signUp = _useContext2[0],
      responseFacebook = _useContext2[1],
      responseGoogle = _useContext2[2],
      responseTwitter = _useContext2[3],
      state = _useContext2[4];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_google_login__WEBPACK_IMPORTED_MODULE_1___default.a, {
    clientId: "771157266627-goet082p5m00pptcp0h68qdake5jrn8v.apps.googleusercontent.com",
    onSuccess: responseGoogle,
    onFailure: responseGoogle,
    icon: false,
    tag: "li",
    Style: {
      padding: '8px 15px 12px 3px'
    },
    className: "google"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-google-plus",
    "aria-hidden": "true"
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (GoogleLoginAvnik);

/***/ }),

/***/ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var SocialLoginContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
/* harmony default export */ __webpack_exports__["default"] = (SocialLoginContext);

/***/ }),

/***/ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginsAvnik.jsx":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginsAvnik.jsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocialLoginContext/SocialLoginContext */ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js");
/* harmony import */ var _TwitterLoginAvnik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TwitterLoginAvnik */ "./resources/js/components/screens/Auth/LoginSocialIcons/TwitterLoginAvnik.jsx");
/* harmony import */ var _FacebookLoginAvnik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FacebookLoginAvnik */ "./resources/js/components/screens/Auth/LoginSocialIcons/FacebookLoginAvnik.jsx");
/* harmony import */ var _GoogleLoginAvnik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GoogleLoginAvnik */ "./resources/js/components/screens/Auth/LoginSocialIcons/GoogleLoginAvnik.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var SocialLoginsAvnik = function SocialLoginsAvnik() {
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_8__["default"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    isLogIn: false,
    redirect: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var SocialHandel = function SocialHandel(postData) {
    if (currentUser) {
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.put("/api/socialLinked/".concat(currentUser === null || currentUser === void 0 ? void 0 : currentUser.id), postData, {
        headers: {
          'Accept': 'application/json',
          authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_7__["default"].getAccessToken())
        }
      }).then(function (res) {
        if (res.data.status == 200) {
          toastr['success'](res.data.message);
        }

        if (res.data.status == "failed") {
          toastr['error'](res.data.message);
        }

        console.log(res);
      })["catch"](function (error) {
        toastr['error'](error.message);
        console.log(error);
      });
    } else {
      axios__WEBPACK_IMPORTED_MODULE_6___default.a.post('/api/socialLinked', postData).then(function (res) {
        if (res.data.status == 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('userData', JSON.stringify(res.data.data));
          toastr['success'](res.data.message);
          setState(_objectSpread(_objectSpread({}, state), {}, {
            isLogIn: true,
            redirect: true
          }));
        }

        if (res.data.status == "failed") {
          toastr['error'](res.data.message);
        }

        console.log(res);
      })["catch"](function (error) {
        toastr['error'](error.message);
        console.log(error);
      });
    }
  }; //   facebook google login


  var signUp = function signUp(res, type) {
    console.log(res, 'social');
    var postData;

    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === 'google' && res.profileObj.email) {
      postData = {
        name: res.profileObj.name,
        provider: type,
        email: res.profileObj.email,
        provider_id: res.profileObj.googleId,
        token: res.tokenObj.access_token,
        provider_pic: res.profileObj.imageUrl
      };
    }

    if (type === 'twitter') {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (postData) {
      SocialHandel(postData);
    } else {}
  };

  if (state.isLogIn || state.redirect) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Redirect"], {
      to: "/home"
    });
  }

  var responseFacebook = function responseFacebook(response) {
    signUp(response, 'facebook');
  };

  var responseGoogle = function responseGoogle(response) {
    signUp(response, 'google');
  };

  var responseTwitter = function responseTwitter(error, data) {
    signUp(data, 'google');
  };

  var LoginValue = [signUp, responseFacebook, responseGoogle, responseTwitter, state];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_2__["default"].Provider, {
    value: LoginValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FacebookLoginAvnik__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GoogleLoginAvnik__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};

/* harmony default export */ __webpack_exports__["default"] = (SocialLoginsAvnik);

/***/ }),

/***/ "./resources/js/components/screens/Auth/LoginSocialIcons/TwitterLoginAvnik.jsx":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/screens/Auth/LoginSocialIcons/TwitterLoginAvnik.jsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-social-login */ "./node_modules/react-social-login/dist/social-login.js");
/* harmony import */ var react_social_login__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_social_login__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_twitter_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-twitter-login */ "./node_modules/react-twitter-login/dist/index.js");
/* harmony import */ var react_twitter_login__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_twitter_login__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SocialLoginContext/SocialLoginContext */ "./resources/js/components/screens/Auth/LoginSocialIcons/SocialLoginContext/SocialLoginContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var TwitterLoginAvnik = function TwitterLoginAvnik() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_SocialLoginContext_SocialLoginContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      _useContext2 = _slicedToArray(_useContext, 5),
      signUp = _useContext2[0],
      responseFacebook = _useContext2[1],
      responseGoogle = _useContext2[2],
      responseTwitter = _useContext2[3],
      state = _useContext2[4];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_social_login__WEBPACK_IMPORTED_MODULE_2___default.a, {
    provider: "twitter",
    appId: "HMU3fVnBOj0ZikVQvFP2Dzt58",
    callback: responseTwitter
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "Login with Google")));
};

/* harmony default export */ __webpack_exports__["default"] = (TwitterLoginAvnik);

/***/ })

}]);