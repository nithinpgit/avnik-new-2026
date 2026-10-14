(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./node_modules/js-file-download/file-download.js":
/*!********************************************************!*\
  !*** ./node_modules/js-file-download/file-download.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(data, filename, mime, bom) {
    var blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
    var blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);

        // Safari thinks _blank anchor are pop ups. We only want to set _blank
        // target if the browser does not support the HTML5 download attribute.
        // This allows you to download files in desktop safari if pop up blocking
        // is enabled.
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }

        document.body.appendChild(tempLink);
        tempLink.click();

        // Fixes "webkit blob resource error 1"
        setTimeout(function() {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobURL);
        }, 200)
    }
}


/***/ }),

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

/***/ "./resources/js/components/ReviewsDetails/ReviewsDetails.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/components/ReviewsDetails/ReviewsDetails.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _User_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../User/Reviews/Components/DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ReviewsDetails = function ReviewsDetails(_ref) {
  var value = _ref.value,
      host = _ref.host;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    rating: 0,
    comment: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"]);

  var replyToUser = function replyToUser() {};

  var HostReview = function HostReview(_ref2) {
    var profilePicture = _ref2.profilePicture,
        userName = _ref2.userName,
        createdAt = _ref2.createdAt,
        comment = _ref2.comment;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-child-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: profilePicture
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, userName, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, createdAt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, comment))))));
  };

  var UserReview = function UserReview(_ref3) {
    var userId = _ref3.userId,
        profilePicture = _ref3.profilePicture,
        userName = _ref3.userName,
        createdAt = _ref3.createdAt,
        comment = _ref3.comment,
        rating = _ref3.rating;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, userName, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_User_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_3__["default"], {
      value: parseFloat(rating)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, createdAt), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, comment, userId == (host === null || host === void 0 ? void 0 : host.id) && userId == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      className: "link-btn",
      "data-toggle": "collapse",
      href: "#review2",
      role: "button",
      "aria-expanded": "false",
      "aria-controls": "collapseExample"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "av av-undo-icon"
    }), " Reply") : ''), userId == (host === null || host === void 0 ? void 0 : host.id) && userId == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "collapse",
      id: "review2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "reply-textarea"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea", {
      className: "form-control",
      placeholder: "Comment"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      type: "button",
      className: "btn default-btn"
    }, "Send"))) : ''));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, value.length > 0 ? value.map(function (res) {
    var _res$sender, _res$sender2, _res$sender2$user_pro, _res$sender3, _res$sender3$user_pro, _res$sender4, _res$sender5, _res$sender6, _res$sender6$user_pro, _res$sender7, _res$sender7$user_pro, _res$sender8, _res$sender9, _res$sender10, _res$sender10$user_pr, _res$sender11, _res$sender11$user_pr, _res$sender12;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: res.id,
      className: "all-reviews-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? res !== null && res !== void 0 && (_res$sender = res.sender) !== null && _res$sender !== void 0 && _res$sender.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : (_res$sender2 = res.sender) === null || _res$sender2 === void 0 ? void 0 : (_res$sender2$user_pro = _res$sender2.user_profile) === null || _res$sender2$user_pro === void 0 ? void 0 : _res$sender2$user_pro.profile_picture) : res === null || res === void 0 ? void 0 : (_res$sender3 = res.sender) === null || _res$sender3 === void 0 ? void 0 : (_res$sender3$user_pro = _res$sender3.user_profile) === null || _res$sender3$user_pro === void 0 ? void 0 : _res$sender3$user_pro.social_profile_picture_url : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["DefaultProfilePicture"],
      alt: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : (_res$sender4 = res.sender) === null || _res$sender4 === void 0 ? void 0 : _res$sender4.name : ''
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(UserReview, {
      profilePicture: (res === null || res === void 0 ? void 0 : res.user_id) == (host === null || host === void 0 ? void 0 : host.id) ? res !== null && res !== void 0 && (_res$sender5 = res.sender) !== null && _res$sender5 !== void 0 && _res$sender5.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : (_res$sender6 = res.sender) === null || _res$sender6 === void 0 ? void 0 : (_res$sender6$user_pro = _res$sender6.user_profile) === null || _res$sender6$user_pro === void 0 ? void 0 : _res$sender6$user_pro.profile_picture) : res === null || res === void 0 ? void 0 : (_res$sender7 = res.sender) === null || _res$sender7 === void 0 ? void 0 : (_res$sender7$user_pro = _res$sender7.user_profile) === null || _res$sender7$user_pro === void 0 ? void 0 : _res$sender7$user_pro.social_profile_picture_url : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["DefaultProfilePicture"],
      userName: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : (_res$sender8 = res.sender) === null || _res$sender8 === void 0 ? void 0 : _res$sender8.name : '',
      rating: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : res.rating : 0,
      createdAt: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(res === null || res === void 0 ? void 0 : res.created_at).local().format('D MMM YYYY hh:mm A') : 'N/A',
      comment: (res === null || res === void 0 ? void 0 : res.user_id) != (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : res.comment : '',
      userId: res === null || res === void 0 ? void 0 : res.user_id
    }), res.user != host.id && res.comment_id == res.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(HostReview, {
      profilePicture: (res === null || res === void 0 ? void 0 : res.user_id) == (host === null || host === void 0 ? void 0 : host.id) ? res !== null && res !== void 0 && (_res$sender9 = res.sender) !== null && _res$sender9 !== void 0 && _res$sender9.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : (_res$sender10 = res.sender) === null || _res$sender10 === void 0 ? void 0 : (_res$sender10$user_pr = _res$sender10.user_profile) === null || _res$sender10$user_pr === void 0 ? void 0 : _res$sender10$user_pr.profile_picture) : res === null || res === void 0 ? void 0 : (_res$sender11 = res.sender) === null || _res$sender11 === void 0 ? void 0 : (_res$sender11$user_pr = _res$sender11.user_profile) === null || _res$sender11$user_pr === void 0 ? void 0 : _res$sender11$user_pr.social_profile_picture_url : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["DefaultProfilePicture"],
      userName: (res === null || res === void 0 ? void 0 : res.user_id) == (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : (_res$sender12 = res.sender) === null || _res$sender12 === void 0 ? void 0 : _res$sender12.name : '',
      createdAt: (res === null || res === void 0 ? void 0 : res.user_id) == (host === null || host === void 0 ? void 0 : host.id) ? moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(res === null || res === void 0 ? void 0 : res.created_at).local().format('D MMM YYYY hh:mm A') : 'N/A',
      comment: (res === null || res === void 0 ? void 0 : res.user_id) == (host === null || host === void 0 ? void 0 : host.id) ? res === null || res === void 0 ? void 0 : res.comment : ''
    }) : '')))));
  }) : '');
};

/* harmony default export */ __webpack_exports__["default"] = (ReviewsDetails);

/***/ }),

/***/ "./resources/js/components/screens/Events/Constant/EventPayment.js":
/*!*************************************************************************!*\
  !*** ./resources/js/components/screens/Events/Constant/EventPayment.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Payments_Modals_StripePaymentModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Payments/Modals/StripePaymentModal */ "./resources/js/components/screens/Events/Payments/Modals/StripePaymentModal.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var EventPayment = /*#__PURE__*/function () {
  function EventPayment() {
    _classCallCheck(this, EventPayment);
  }

  _createClass(EventPayment, [{
    key: "stripeModalPayment",
    value: function stripeModalPayment(eventId, slotId, amount) {
      $('#stripe_payment_modal').modal('show');
    }
  }]);

  return EventPayment;
}();

/* harmony default export */ __webpack_exports__["default"] = (new EventPayment());

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Calender/Calender.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Calender/Calender.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fullcalendar_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/react */ "./node_modules/@fullcalendar/react/dist/main.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/main.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fullcalendar/interaction */ "./node_modules/@fullcalendar/interaction/main.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Constant_EventPayment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Constant/EventPayment */ "./resources/js/components/screens/Events/Constant/EventPayment.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
/* harmony import */ var _store_Context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../store/Context */ "./resources/js/store/Context.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var Calender = function Calender(props) {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_store_Context__WEBPACK_IMPORTED_MODULE_9__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_11__["default"]),
      _useContext4 = _slicedToArray(_useContext3, 2),
      globalState = _useContext4[0],
      globalDispatch = _useContext4[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_10__["default"]);

  var findSlotByDate = function findSlotByDate(e) {
    props.findSlotByDate(e);
  };

  var eventContent = function eventContent(e) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dot-instructions-point"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "cmn-ul-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-i-p-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0"))))));
  };

  var CalenderSlots = state.CalenderSlots,
      SlotsDetails = state.SlotsDetails,
      SlotsPreloader = state.SlotsPreloader;
  var _state$EventByIdDetai = state.EventByIdDetail,
      eventCreatedUser = _state$EventByIdDetai.eventCreatedUser,
      eventPayment = _state$EventByIdDetai.eventPayment;
  var eventsList = [];
  CalenderSlots === null || CalenderSlots === void 0 ? void 0 : CalenderSlots.map(function (res) {
    return eventsList.push({
      display: "background",
      start: res.start_date
    });
  });
  console.log(state, "Props__");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": state.EventNavbarMenu === 2 ? true : false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-d-calender"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "left-e-cal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-calender-bx"
  }, state.EventNavbarMenu === 2 || (CalenderSlots === null || CalenderSlots === void 0 ? void 0 : CalenderSlots.length) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fullcalendar_react__WEBPACK_IMPORTED_MODULE_1__["default"] // initialView='timeGridWeek'
  , {
    initialView: "dayGridMonth",
    dateClick: findSlotByDate,
    events: eventsList,
    selectable: true,
    plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_2__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_3__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__["default"]],
    allDaySlot: false,
    views: {
      timeGridWeek: {
        titleFormat: {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }
      }
    } // eventContent={e =>
    //     console.log(e, "sdfghjkl")
    // }
    ,
    dayHeaderContent: function dayHeaderContent(args) {
      return moment__WEBPACK_IMPORTED_MODULE_5___default()(args.date).format("ddd Do");
    },
    datesSet: props.RightCalendarWeekDates,
    nowIndicator: true,
    customButtons: {
      myCustomButton: {
        text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "legend-dd",
          style: {
            margin: "-12px"
          }
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "l-g-bx dot-dd-bx"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "dropdown dd-right-side"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "link-btn dropdown-toggle",
          href: "#",
          id: "my-account-dd",
          "data-toggle": "dropdown"
        }, "Legend", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "lb lb-dropdown-icon"
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "dropdown-menu",
          "aria-labelledby": "my-account-dd"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "side-nav-bx"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          className: "color-bx booked-color"
        }), "Booked By Me")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          className: "color-bx bot-booked-color"
        }), "Not Yet Booked (Webinar/Class/Group)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          className: "color-bx ava-appointment-color"
        }), "Availability For Appointment")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          className: "color-bx blocked-time-color"
        }), "Blocked Time")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
          className: "color-bx somebody-booed-color"
        }), "Somebody Booked Me")))))))))
      }
    },
    headerToolbar: {
      start: "title",
      // will normally be on the left. if RTL, will be on the right
      center: "myCustomButton",
      end: "today prev,next" // will normally be on the right. if RTL, will be on the left

    },
    now: moment__WEBPACK_IMPORTED_MODULE_5___default()().format("YYYY-MM-DD")
  }) : "Sorry We Are Not Found Anything"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Time slots"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return findSlotByDate("SeeAll");
    },
    className: "link-btn float-right"
  }, "See all...")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "time-slot-list",
    style: {
      minHeight: "476px",
      maxHeight: "480px",
      overflowY: "scroll"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, SlotsPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_8__["SlotsDetailsPreloader"], null) : (SlotsDetails === null || SlotsDetails === void 0 ? void 0 : SlotsDetails.length) > 0 ? SlotsDetails.map(function (res) {
    {
      /* moment(res.start_date_time,'YYYY-MM-DD HH:mm:ss')>moment(moment(),'YYYY-MM-DD HH:mm:ss')? */
    }
    return moment__WEBPACK_IMPORTED_MODULE_5___default()(res.start_date_time, 'YYYY-MM-DD HH:mm:ss') ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: res.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-s-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-option"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      "data-toggle": "modal",
      href: "#share-profile-popup",
      className: "dropdown-item",
      onClick: function onClick() {
        return globalDispatch({
          type: "share",
          payload: {
            Type: "share",
            Share: "".concat(window.location.hostname, "/event?token=").concat(props.values.EventByIdDetail.rememberToken, "&event=").concat(props.values.EventByIdDetail.id, "&slot=").concat(res.id)
          }
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-share-icon"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-time"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_5___default()(moment__WEBPACK_IMPORTED_MODULE_5___default()("".concat(res.start_date, " ").concat(res.start_time), "YYYY-MM-DD HH:mm A")).format("D MMM YYYY, h:mm a"), " - ", moment__WEBPACK_IMPORTED_MODULE_5___default()("".concat(res.end_time), "HH:mm A").format("h:mm a"), " ", (res === null || res === void 0 ? void 0 : res.cost) > 0 ? "$".concat(res === null || res === void 0 ? void 0 : res.cost) : 'Free')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-btn"
    }, (eventCreatedUser === null || eventCreatedUser === void 0 ? void 0 : eventCreatedUser.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ?
    /*#__PURE__*/
    // ? <a href={`/join/?rm=${res.meeting_room_id}`} target="_blank" className="btn default-btn">Start</a>
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btn default-btn booked-btn",
      style: {
        backgroundColor: "#145388"
      }
    }, "Start", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/join/?rm=".concat(res.meeting_room_id),
      className: "btn cmn-bdr-btn",
      title: "Start Meeting"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-quick-start-icon"
    }))) : eventPayment !== null && eventPayment !== void 0 && eventPayment.find(function (Pay) {
      return Pay.eventTimeSlotId == res.id && res.id === Pay.eventTimeSlotId && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == Pay.userId;
    }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btn default-btn booked-btn"
    }, "Booked", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "/join/?rm=".concat(res.meeting_room_id),
      className: "btn cmn-bdr-btn",
      title: "Join Meeting"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-quick-start-icon"
    }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      style: {
        backgroundColor: "#145388",
        cursor: "pointer"
      },
      className: "btn default-btn booked-btn",
      onClick: function onClick() {
        return props.paymentHandle(parseInt(res === null || res === void 0 ? void 0 : res.event_fk_id), parseInt(res.id), parseInt(res === null || res === void 0 ? void 0 : res.cost));
      }
    }, "Book Now", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      style: {
        pointerEvents: "none"
      },
      className: "btn cmn-bdr-btn",
      title: "Book Now"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-quick-start-icon"
    })))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-s-bx alert alert-danger"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "ts-time"
    }, "No Upcoming Slots")));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "t-s-bx alert alert-danger"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ts-time"
  }, "No slots here"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Calender);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Detail/Detail.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Detail/Detail.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Preloader_EventDetailsSectionPreload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Preloader/EventDetailsSectionPreload */ "./resources/js/components/screens/Events/EventsDetails/Cards/Preloader/EventDetailsSectionPreload.jsx");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var react_owl_carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-owl-carousel */ "./node_modules/react-owl-carousel/umd/OwlCarousel.js");
/* harmony import */ var react_owl_carousel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_owl_carousel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var owl_carousel_dist_assets_owl_carousel_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.carousel.css */ "./node_modules/owl.carousel/dist/assets/owl.carousel.css");
/* harmony import */ var owl_carousel_dist_assets_owl_carousel_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(owl_carousel_dist_assets_owl_carousel_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var owl_carousel_dist_assets_owl_theme_default_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! owl.carousel/dist/assets/owl.theme.default.css */ "./node_modules/owl.carousel/dist/assets/owl.theme.default.css");
/* harmony import */ var owl_carousel_dist_assets_owl_theme_default_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(owl_carousel_dist_assets_owl_theme_default_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../ApiServer/GlobalLink */ "./resources/js/ApiServer/GlobalLink.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../CreateEvent/Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var _Constant_EventPayment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../Constant/EventPayment */ "./resources/js/components/screens/Events/Constant/EventPayment.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _utility_ReviewRatingNumber__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utility/ReviewRatingNumber */ "./resources/js/components/screens/Events/EventsDetails/utility/ReviewRatingNumber.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _SlotCounter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SlotCounter */ "./resources/js/components/screens/Events/EventsDetails/Cards/Detail/SlotCounter.jsx");
/* harmony import */ var _store_Context__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../store/Context */ "./resources/js/store/Context.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















var Detail = function Detail(props) {
  var _ProfilePicture$profi, _ProfilePicture$profi2, _ProfilePicture$profi3, _ProfilePicture$profi4, _state$EventByIdDetai2, _state$EventByIdDetai3, _state$EventByIdDetai4, _state$EventByIdDetai5, _state$EventByIdDetai6;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_store_Context__WEBPACK_IMPORTED_MODULE_15__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_16__["default"]);
  var _state$EventByIdDetai = state.EventByIdDetail,
      eventType = _state$EventByIdDetai.eventType,
      userAverage = _state$EventByIdDetai.userAverage,
      eventCreatedUser = _state$EventByIdDetai.eventCreatedUser,
      eventDescription = _state$EventByIdDetai.eventDescription,
      eventImages = _state$EventByIdDetai.eventImages,
      eventFiles = _state$EventByIdDetai.eventFiles,
      eventReview = _state$EventByIdDetai.eventReview,
      eventTimeSlot = _state$EventByIdDetai.eventTimeSlot,
      eventTags = _state$EventByIdDetai.eventTags,
      eventTitle = _state$EventByIdDetai.eventTitle,
      favoriteEvents = _state$EventByIdDetai.favoriteEvents,
      numberOfSeats = _state$EventByIdDetai.numberOfSeats,
      id = _state$EventByIdDetai.id,
      status = _state$EventByIdDetai.status,
      timezone = _state$EventByIdDetai.timezone,
      reviewAverage = _state$EventByIdDetai.reviewAverage;
  var ProfilePicture = eventCreatedUser;
  var Profile = ProfilePicture !== null && ProfilePicture !== void 0 && (_ProfilePicture$profi = ProfilePicture.profilePicture) !== null && _ProfilePicture$profi !== void 0 && _ProfilePicture$profi.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_11__["FileManagerPath"] + (ProfilePicture === null || ProfilePicture === void 0 ? void 0 : (_ProfilePicture$profi2 = ProfilePicture.profilePicture) === null || _ProfilePicture$profi2 === void 0 ? void 0 : _ProfilePicture$profi2.profile_picture) : ProfilePicture !== null && ProfilePicture !== void 0 && (_ProfilePicture$profi3 = ProfilePicture.profilePicture) !== null && _ProfilePicture$profi3 !== void 0 && _ProfilePicture$profi3.social_profile_picture_url ? ProfilePicture === null || ProfilePicture === void 0 ? void 0 : (_ProfilePicture$profi4 = ProfilePicture.profilePicture) === null || _ProfilePicture$profi4 === void 0 ? void 0 : _ProfilePicture$profi4.social_profile_picture_url : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_11__["DefaultProfilePicture"];

  var SliderPreloader = function SliderPreloader() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "event-lft-img"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
      width: 657,
      height: 438,
      duration: 2
    }))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": state.EventNavbarMenu === 1 ? true : false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-details-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "insert-file-slider e-d-gallery"
  }, state.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SliderPreloader, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_owl_carousel__WEBPACK_IMPORTED_MODULE_4___default.a, {
    className: "owl-carousel owl-theme",
    loop: true,
    autoplay: true,
    margin: 10,
    nav: true,
    items: 1,
    dotData: true,
    dots: false
  }, eventImages.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: index,
      className: "item ".concat(index === 1 ? "active" : "")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "event-lft-img"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_7__["default"].FileManagerPathURL() + res.fileUrl,
      alt: "Slider"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "h-i-profile"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "e-d-g-pro"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "cmn-profile-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: Profile,
      alt: ProfilePicture === null || ProfilePicture === void 0 ? void 0 : ProfilePicture.name,
      title: ProfilePicture === null || ProfilePicture === void 0 ? void 0 : ProfilePicture.name
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_13__["Link"], {
      to: "/profile/".concat(eventCreatedUser === null || eventCreatedUser === void 0 ? void 0 : eventCreatedUser.userName)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, eventCreatedUser === null || eventCreatedUser === void 0 ? void 0 : eventCreatedUser.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-star",
      "aria-hidden": "true"
    }), Object(_utility_ReviewRatingNumber__WEBPACK_IMPORTED_MODULE_12__["default"])(userAverage ? userAverage === null || userAverage === void 0 ? void 0 : userAverage.average_rating : 0)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-link"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-chat-notify-icon"
    }), " ", "Message"))));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-right-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SlotCounter__WEBPACK_IMPORTED_MODULE_14__["default"], {
    values: state,
    currentUser: currentUser,
    paymentHandle: props.paymentHandle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-evnt-d h-event-tags event-tags-list"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-botom-dis-tags-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-evnt-d"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-evnt-d h-event-tags event-tags-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-d-tags"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tags-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "ul-row-col"
  }, state.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 100,
    height: 33
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 90,
    height: 33
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 90,
    height: 33
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 90,
    height: 33
  }))) : state === null || state === void 0 ? void 0 : (_state$EventByIdDetai2 = state.EventByIdDetail) === null || _state$EventByIdDetai2 === void 0 ? void 0 : _state$EventByIdDetai2.eventTags.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tag-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, res)));
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "category-rit-bx"
  }, state.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 200
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Category : "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, (_state$EventByIdDetai3 = state.EventByIdDetail) === null || _state$EventByIdDetai3 === void 0 ? void 0 : (_state$EventByIdDetai4 = _state$EventByIdDetai3.eventCategory) === null || _state$EventByIdDetai4 === void 0 ? void 0 : _state$EventByIdDetai4.name, " / ", (_state$EventByIdDetai5 = state.EventByIdDetail) === null || _state$EventByIdDetai5 === void 0 ? void 0 : (_state$EventByIdDetai6 = _state$EventByIdDetai5.eventSubCategory) === null || _state$EventByIdDetai6 === void 0 ? void 0 : _state$EventByIdDetai6.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-des-tags-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, state.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: 200
  }) : "Description")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "des-content"
  }, state.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      fontSize: 20,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_2___default.a, {
    count: 4
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, eventDescription, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return alert("More");
    }
  }, "More"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Detail);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Detail/SlotCounter.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Detail/SlotCounter.jsx ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var SlotCounter = function SlotCounter(_ref) {
  var _values$UpComingSlots3, _values$UpComingSlots4, _values$UpComingSlots5, _values$UpComingSlots6, _values$UpComingSlots7, _values$UpComingSlots8, _values$UpComingSlots9, _values$UpComingSlots10, _values$UpComingSlots11, _values$UpComingSlots12, _values$UpComingSlots13, _values$UpComingSlots14, _values$UpComingSlots15, _values$UpComingSlots16, _values$UpComingSlots17, _values$UpComingSlots18, _values$UpComingSlots19, _values$UpComingSlots20, _values$UpComingSlots21, _values$UpComingSlots22, _values$UpComingSlots23, _values$UpComingSlots24;

  var values = _ref.values,
      currentUser = _ref.currentUser,
      paymentHandle = _ref.paymentHandle;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      countDownArray = _useState2[0],
      setCountDownArray = _useState2[1];

  var authUser = currentUser;

  if (values !== null && values !== void 0 && values.UpComingSlots) {
    var _values$UpComingSlots, _values$UpComingSlots2;

    var eventTime = new Date("".concat(moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()((values === null || values === void 0 ? void 0 : (_values$UpComingSlots = values.UpComingSlots) === null || _values$UpComingSlots === void 0 ? void 0 : _values$UpComingSlots.start_date) + "" + (values === null || values === void 0 ? void 0 : (_values$UpComingSlots2 = values.UpComingSlots) === null || _values$UpComingSlots2 === void 0 ? void 0 : _values$UpComingSlots2.start_time), "YYYY-MM-DD HH:mm:ss")).format("MMMM DD, YYYY HH:mm:ss"))).getTime(); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT

    setInterval(function () {
      var countDownDate = eventTime;
      var now = new Date().getTime();
      var timeleft = countDownDate - now; // code goes here

      setCountDownArray(Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_3__["millisecondsConvert"])(timeleft).split(":"));
    }, 1000);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "meeting-short-info"
  }, values.UpComingSlots ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-countdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-d-bx"
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, countDownArray[0] || 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Days")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-d-bx"
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, countDownArray[1] || 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Hour")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-d-bx"
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, countDownArray[2] || 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Min")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-d-bx"
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, countDownArray[3] || 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Sec"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    className: moment__WEBPACK_IMPORTED_MODULE_2___default()((values === null || values === void 0 ? void 0 : (_values$UpComingSlots3 = values.UpComingSlots) === null || _values$UpComingSlots3 === void 0 ? void 0 : _values$UpComingSlots3.end_date) + "" + (values === null || values === void 0 ? void 0 : (_values$UpComingSlots4 = values.UpComingSlots) === null || _values$UpComingSlots4 === void 0 ? void 0 : _values$UpComingSlots4.end_time), "YYYY-MM-DD HH:mm:ss") <= moment__WEBPACK_IMPORTED_MODULE_2___default()() ? "text-danger" : ""
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
    width: 140,
    height: 24
  }) : moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()((values === null || values === void 0 ? void 0 : (_values$UpComingSlots5 = values.UpComingSlots) === null || _values$UpComingSlots5 === void 0 ? void 0 : _values$UpComingSlots5.start_date) + "" + (values === null || values === void 0 ? void 0 : (_values$UpComingSlots6 = values.UpComingSlots) === null || _values$UpComingSlots6 === void 0 ? void 0 : _values$UpComingSlots6.start_time), "YYYY-MM-DD HH:mm:ss")).calendar(null, {
    lastDay: "[Yesterday] hh:mm A",
    sameDay: "[Today] @ hh:mm A",
    nextDay: "[Tomorrow] @ hh:mm A",
    lastWeek: "[Last Week] DD MMM, YYYY",
    nextWeek: "[Next Week] DD MMM, YYYY",
    sameElse: "L"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "meeting-space"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
    width: 140,
    height: 24
  }) : "Meeting Specs"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-s-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Seats"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-seats-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, (_values$UpComingSlots7 = values.UpComingSlots) === null || _values$UpComingSlots7 === void 0 ? void 0 : _values$UpComingSlots7.booked_seats, "/", (_values$UpComingSlots8 = values.UpComingSlots) === null || _values$UpComingSlots8 === void 0 ? void 0 : _values$UpComingSlots8.total_seats, " ", "Seats Left"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Duration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-event-time-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_3__["FindHoursMinutes"])(values.UpComingSlots.duration), " ", "\xA0(HH:mm)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-event-doller-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, ((_values$UpComingSlots9 = values.UpComingSlots) === null || _values$UpComingSlots9 === void 0 ? void 0 : _values$UpComingSlots9.cost) > 0 ? "$".concat((_values$UpComingSlots10 = values.UpComingSlots) === null || _values$UpComingSlots10 === void 0 ? void 0 : _values$UpComingSlots10.cost) : "Free"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-webinar-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, (_values$UpComingSlots11 = values.UpComingSlots) === null || _values$UpComingSlots11 === void 0 ? void 0 : (_values$UpComingSlots12 = _values$UpComingSlots11.events) === null || _values$UpComingSlots12 === void 0 ? void 0 : _values$UpComingSlots12.event_type)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "join-event-bx"
  }, values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
    width: 110,
    height: 36
  }) : (values === null || values === void 0 ? void 0 : (_values$UpComingSlots13 = values.UpComingSlots) === null || _values$UpComingSlots13 === void 0 ? void 0 : (_values$UpComingSlots14 = _values$UpComingSlots13.events) === null || _values$UpComingSlots14 === void 0 ? void 0 : _values$UpComingSlots14.user_fk_id) === (authUser === null || authUser === void 0 ? void 0 : authUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn default-btn booked-btn",
    style: {
      backgroundColor: "#145388"
    }
  }, "Start", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/join/?rm=".concat(values === null || values === void 0 ? void 0 : (_values$UpComingSlots15 = values.UpComingSlots) === null || _values$UpComingSlots15 === void 0 ? void 0 : _values$UpComingSlots15.meeting_room_id),
    className: "btn cmn-bdr-btn",
    title: "Start Meeting"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-quick-start-icon"
  }))) : (values === null || values === void 0 ? void 0 : (_values$UpComingSlots16 = values.UpComingSlots) === null || _values$UpComingSlots16 === void 0 ? void 0 : (_values$UpComingSlots17 = _values$UpComingSlots16.event_payment) === null || _values$UpComingSlots17 === void 0 ? void 0 : _values$UpComingSlots17.length) > 0 && (values === null || values === void 0 ? void 0 : (_values$UpComingSlots18 = values.UpComingSlots) === null || _values$UpComingSlots18 === void 0 ? void 0 : (_values$UpComingSlots19 = _values$UpComingSlots18.event_payment[0]) === null || _values$UpComingSlots19 === void 0 ? void 0 : _values$UpComingSlots19.user_fk_id) === (authUser === null || authUser === void 0 ? void 0 : authUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn default-btn booked-btn"
  }, "Booked", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/join/?rm=".concat(values === null || values === void 0 ? void 0 : (_values$UpComingSlots20 = values.UpComingSlots) === null || _values$UpComingSlots20 === void 0 ? void 0 : _values$UpComingSlots20.meeting_room_id),
    className: "btn cmn-bdr-btn",
    title: "Join Meeting"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-quick-start-icon"
  }))) : (values === null || values === void 0 ? void 0 : (_values$UpComingSlots21 = values.UpComingSlots) === null || _values$UpComingSlots21 === void 0 ? void 0 : _values$UpComingSlots21.booked_seats) === (values === null || values === void 0 ? void 0 : (_values$UpComingSlots22 = values.UpComingSlots) === null || _values$UpComingSlots22 === void 0 ? void 0 : _values$UpComingSlots22.total_seats) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    disabled: true
  }, "Seats are full") : moment__WEBPACK_IMPORTED_MODULE_2___default()((values === null || values === void 0 ? void 0 : (_values$UpComingSlots23 = values.UpComingSlots) === null || _values$UpComingSlots23 === void 0 ? void 0 : _values$UpComingSlots23.end_date) + "" + (values === null || values === void 0 ? void 0 : (_values$UpComingSlots24 = values.UpComingSlots) === null || _values$UpComingSlots24 === void 0 ? void 0 : _values$UpComingSlots24.end_time), "YYYY-MM-DD HH:mm:ss") <= moment__WEBPACK_IMPORTED_MODULE_2___default()() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    disabled: true
  }, "Date and Time has expired") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _values$UpComingSlots25, _values$UpComingSlots26, _values$UpComingSlots27, _values$UpComingSlots28;

      return paymentHandle(parseInt(values === null || values === void 0 ? void 0 : (_values$UpComingSlots25 = values.UpComingSlots) === null || _values$UpComingSlots25 === void 0 ? void 0 : (_values$UpComingSlots26 = _values$UpComingSlots25.events) === null || _values$UpComingSlots26 === void 0 ? void 0 : _values$UpComingSlots26.id), parseInt(values === null || values === void 0 ? void 0 : (_values$UpComingSlots27 = values.UpComingSlots) === null || _values$UpComingSlots27 === void 0 ? void 0 : _values$UpComingSlots27.id), parseInt(values === null || values === void 0 ? void 0 : (_values$UpComingSlots28 = values.UpComingSlots) === null || _values$UpComingSlots28 === void 0 ? void 0 : _values$UpComingSlots28.cost));
    },
    className: "btn default-btn"
  }, "Book Now"))) : "No Upcoming Event", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null)));
};

/* harmony default export */ __webpack_exports__["default"] = (SlotCounter);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Download/Download.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Download/Download.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_file_download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-file-download */ "./node_modules/js-file-download/file-download.js");
/* harmony import */ var js_file_download__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_file_download__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../ApiServer/FileManager/FileManagerService */ "./resources/js/ApiServer/FileManager/FileManagerService.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var Download = function Download(props) {
  var Download = function Download(FileName, FilePath) {
    setTimeout(function () {
      js_file_download__WEBPACK_IMPORTED_MODULE_1___default()(FilePath, FileName);
    }, 100);
  };

  var DownloadFile = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
      var data, res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = {
                fileId: id
              };
              _context.next = 3;
              return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_2__["default"].DownloadFileService(data);

            case 3:
              res = _context.sent;

              if (res.data.status == 200) {
                Download(res.data.data.FileName, res.data.data.FilePath);
                toastr['success'](res.data.message);
              }

              if (res.data.status == "failed") {
                toastr['error'](res.data.message);
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function DownloadFile(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var _props$values = props.values,
      eventPreloader = _props$values.eventPreloader,
      EventByIdDetail = _props$values.EventByIdDetail;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.values.EventNavbarMenu === 4 ? true : false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-d-download"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "t-s-bx download-event-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ts-option"
  }, "Download"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ts-time"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-search-icon"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ts-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn"
  }, "Buy (0)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "download-files-download"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "custom-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row table-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-title-name-editable"
  }, "Title Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-cost-editable"
  }, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-size-editable"
  }, "Size"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-total-download-editable"
  }, "Total Download"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-action-editable text-right"
  }, "Action")), eventPreloader ? '' : EventByIdDetail.eventFiles.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FileList, {
      key: res.id,
      Download: DownloadFile,
      value: res
    });
  }))))));
};

var FileList = function FileList(props) {
  var _props$value2;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-title-name-editable",
    "data-title": "Title Name"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-t-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "file-type-title-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "file-type-name"
  }, "jpg"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, props.value.fileTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "f-dis-link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn file-dis-view-link",
    value: "Show/Hide",
    onClick: function onClick() {
      var _props$value;

      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_3__["showHideDiv"])("download-file-dis".concat((_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.id));
    }
  }, "File Dis...")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-cost-editable",
    "data-title": "Cost"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-t-in"
  }, parseInt(props.value.fileCost) > 0 ? "$".concat(props.value.fileCost) : 'Free')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-size-editable",
    "data-title": "Size"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-t-in"
  }, props.value.size)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-total-download-editable",
    "data-title": "Total Download"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-t-in"
  }, "0 download")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell download-action-editable text-right",
    "data-title": "Action"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-t-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "download-add-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    onClick: function onClick() {
      return props.Download(props.value.fileManagerId);
    },
    "data-toggle": "modal",
    "data-target": "#host-info-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-download-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Save"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-add-plus-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Add")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-extended-duration-less-icon",
    "aria-hidden": "true"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Remove"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "download-file-dis".concat((_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.id),
    className: "download-file-dis-bx new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."));
};

/* harmony default export */ __webpack_exports__["default"] = (Download);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/EventDetailsSection.jsx":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/EventDetailsSection.jsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar/Navbar */ "./resources/js/components/screens/Events/EventsDetails/Cards/Navbar/Navbar.jsx");
/* harmony import */ var _Detail_Detail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Detail/Detail */ "./resources/js/components/screens/Events/EventsDetails/Cards/Detail/Detail.jsx");
/* harmony import */ var _Calender_Calender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Calender/Calender */ "./resources/js/components/screens/Events/EventsDetails/Cards/Calender/Calender.jsx");
/* harmony import */ var _Review_Review__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Review/Review */ "./resources/js/components/screens/Events/EventsDetails/Cards/Review/Review.jsx");
/* harmony import */ var _Download_Download__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Download/Download */ "./resources/js/components/screens/Events/EventsDetails/Cards/Download/Download.jsx");
/* harmony import */ var _ApiServer_AllEventsDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../ApiServer/AllEventsDetails */ "./resources/js/ApiServer/AllEventsDetails.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Events_Payments_Modals_StripePaymentModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../Events/Payments/Modals/StripePaymentModal */ "./resources/js/components/screens/Events/Payments/Modals/StripePaymentModal.jsx");
/* harmony import */ var _ApiServer_UserAuthService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../ApiServer/UserAuthService */ "./resources/js/ApiServer/UserAuthService.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _Pages_Errors_404__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../Pages/Errors/404 */ "./resources/js/components/screens/Pages/Errors/404.jsx");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _User_Profiles_ProfileModals_ShareProfilePopup__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../User/Profiles/ProfileModals/ShareProfilePopup */ "./resources/js/User/Profiles/ProfileModals/ShareProfilePopup.jsx");
/* harmony import */ var _store_Context__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../store/Context */ "./resources/js/store/Context.js");
/* harmony import */ var _utility_Reducer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../utility/Reducer */ "./resources/js/utility/Reducer.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _User_Profiles_ProfileModals_ReportProfilePopup__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../../User/Profiles/ProfileModals/ReportProfilePopup */ "./resources/js/User/Profiles/ProfileModals/ReportProfilePopup.jsx");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents */ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
























var initialState = {
  eventPreloader: true,
  errorPage: false,
  isAuthenticated: _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__["default"].isAuthenticated(),
  ConflictsEvents: [],
  EventByIdDetail: [],
  SlotsDetails: [],
  CalenderSlots: [],
  UpComingSlots: null,
  SlotsPreloader: true,
  EventFiles: [],
  RightCalendarWeekDates: {},
  startDate: "",
  EventNavbarMenu: 1,
  FavoriteCounter: 0,
  eventId: 0,
  slotId: 0,
  amount: 0,
  error: false
};

var EventDetailsSection = function EventDetailsSection(props) {
  var _EventByIdDetail$even, _EventByIdDetail$favo, _Values$EventByIdDeta;

  var currentURL = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["useLocation"])();
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_19__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_21__["default"]),
      _useContext2 = _slicedToArray(_useContext, 4),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1],
      handleReportUserEvent = _useContext2[2],
      onChangeReport = _useContext2[3];

  var params = {
    slot: null,
    event: null,
    token: null
  };
  currentURL.search.slice(1).split("&").forEach(function (elm) {
    if (elm === "") return;
    var spl = elm.split("=");
    var d = decodeURIComponent;
    params[d(spl[0])] = spl.length >= 2 ? d(spl[1]) : true;
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(params.event),
      _useState2 = _slicedToArray(_useState, 2),
      eventId = _useState2[0],
      setEventId = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(params === null || params === void 0 ? void 0 : params.token),
      _useState4 = _slicedToArray(_useState3, 2),
      eventToken = _useState4[0],
      setEventToken = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(params === null || params === void 0 ? void 0 : params.slot),
      _useState6 = _slicedToArray(_useState5, 2),
      eventSlot = _useState6[0],
      setEventSlot = _useState6[1];

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_utility_Reducer__WEBPACK_IMPORTED_MODULE_18__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getEventDetails();
    getSlotsDetails();
    fetchUpComingSlots();
    return function () {};
  }, []);

  var RightCalendarWeekDates = function RightCalendarWeekDates(arg) {
    // dispatch({ type: "", payload: { Type: "", SlotsPreloader: true } });
    var data = {
      eventId: eventId,
      slotId: eventSlot,
      activeStart: moment__WEBPACK_IMPORTED_MODULE_9___default()(arg.view.activeStart).format("YYYY-MM-DD"),
      activeEnd: moment__WEBPACK_IMPORTED_MODULE_9___default()(arg.view.activeEnd).format("YYYY-MM-DD")
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"]._eventSlotsDetails(data).then(function (res) {
      if (res.data.status == "failed" && res.data.success == false) {
        toastr["error"](res.data.message);
      }

      if (res.data.data) {
        if (res.data.status == 200) {
          dispatch({
            type: "",
            payload: {
              Type: "",
              CalenderSlots: res.data.data,
              SlotsPreloader: false
            }
          });
        }
      }
    })["catch"](function (error) {
      dispatch({
        type: "",
        payload: {
          Type: "",
          errorPage: true
        }
      });
    });

    console.log(arg); //arg includes data about current visible dates

    console.log(moment__WEBPACK_IMPORTED_MODULE_9___default()(arg.view.activeStart).format("YYYY-MM-DD")); //starting visible date

    console.log(arg.view.activeEnd); //ending visible date

    dispatch({
      type: "RightCalendarWeekDates",
      payload: {
        Type: "RightCalendarWeekDates",
        RightCalendarWeekDates: {
          startDate: moment__WEBPACK_IMPORTED_MODULE_9___default()(arg.view.activeStart).format("YYYY-MM-DD"),
          endDate: moment__WEBPACK_IMPORTED_MODULE_9___default()(arg.view.activeEnd).format("YYYY-MM-DD")
        }
      }
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getEventDetails();
    getSlotsDetails();
    return function () {};
  }, [state.startDate]);

  var getEventDetails = function getEventDetails(prevState) {
    var data = "".concat(eventId, "/").concat(eventToken);

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"]._fetchEventDetails(data).then(function (res) {
      if (res.data.status == "failed" && res.data.success == false) {
        toastr["error"](res.data.message);
        dispatch({
          type: "",
          payload: {
            Type: "",
            errorPage: true
          }
        });
      }

      if (prevState != res.data.data) {
        if (res.data.status == 200) {
          dispatch({
            type: "",
            payload: {
              Type: "",
              eventPreloader: false,
              EventByIdDetail: res.data.data
            }
          });
        }
      }
    })["catch"](function (error) {
      dispatch({
        type: "",
        payload: {
          Type: "",
          errorPage: true
        }
      });
    });
  };

  var fetchUpComingSlots = function fetchUpComingSlots() {
    dispatch({
      type: "",
      payload: {
        Type: "",
        SlotsPreloader: true
      }
    });
    var data = {
      eventId: eventId,
      slotId: eventSlot,
      startDate: state.startDate
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"]._fetchUpComingSlots(data).then(function (res) {
      if (res.data.status == "failed" && res.data.success == false) {
        toastr["error"](res.data.message);
        dispatch({
          type: "",
          payload: {
            Type: "" // errorPage: true,

          }
        });
      }

      if (res.data.data) {
        if (res.data.status == 200) {
          dispatch({
            type: "",
            payload: {
              Type: "",
              UpComingSlots: res.data.data,
              SlotsPreloader: false
            }
          });
        }
      }
    })["catch"](function (error) {
      dispatch({
        type: "",
        payload: {
          Type: "",
          errorPage: true
        }
      });
    });
  };

  var getSlotsDetails = function getSlotsDetails() {
    dispatch({
      type: "",
      payload: {
        Type: "",
        SlotsPreloader: true
      }
    });
    var data = {
      eventId: eventId,
      slotId: eventSlot,
      startDate: state.startDate
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"]._eventSlotsDetails(data).then(function (res) {
      if (res.data.status == "failed" && res.data.success == false) {
        toastr["error"](res.data.message);
        dispatch({
          type: "",
          payload: {
            Type: "" // errorPage: true,

          }
        });
      }

      if (res.data.data) {
        if (res.data.status == 200) {
          dispatch({
            type: "",
            payload: {
              Type: "",
              SlotsDetails: res.data.data,
              SlotsPreloader: false
            }
          });
        }
      }
    })["catch"](function (error) {
      dispatch({
        type: "",
        payload: {
          Type: "",
          errorPage: true
        }
      });
    });
  };

  var findSlotByDate = function findSlotByDate(e) {
    if (e === "SeeAll") {
      dispatch({
        type: "",
        payload: {
          Type: "",
          startDate: ""
        }
      });
    } else {
      dispatch({
        type: "",
        payload: {
          Type: "",
          startDate: moment__WEBPACK_IMPORTED_MODULE_9___default()(e.dateStr, "YYYY-MM-DD").format("YYYY-MM-DD")
        }
      });
    }
  };

  var EventNavbarMenuFun = function EventNavbarMenuFun(event) {
    dispatch({
      type: "",
      payload: {
        Type: "",
        EventNavbarMenu: event
      }
    });
  };

  var stripePaymentResponse = function stripePaymentResponse(payment, data) {
    $("#stripe_payment_modal").modal("hide");
    getEventDetails();
    getSlotsDetails();
  };

  var handlePaymentModal = function handlePaymentModal(eventId, slotId, amount) {
    dispatch({
      type: "",
      payload: {
        Type: "",
        amount: amount,
        slotId: slotId,
        eventId: eventId
      }
    });
    BookingTimeConflictsCheck(eventId, slotId);
  };

  var BookingTimeConflictsCheck = function BookingTimeConflictsCheck(eventId, slotId) {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"].BookingTimeConflictsChecks({
      eventId: eventId,
      slotId: slotId
    }).then(function (res) {
      if (res.data.status == "events") {
        dispatch({
          type: "ConflictsEvents",
          payload: {
            Type: "ConflictsEvents",
            ConflictsEvents: res.data.data
          }
        });
        toastr["error"](res.data.message);
        $("#booking-conflicts-events").modal('show');
      } else {
        $("#stripe_payment_modal").modal("show");
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  var handelFavorite = function handelFavorite(eventId) {
    var data = {
      eventId: eventId
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__["ApiService"]._favorite(data).then(function (res) {
      if (res.data.status == 200) {
        toastr["success"](res.data.message);
        getEventDetails();
        getSlotsDetails();
      }

      if (res.data.status == "failed") {
        toastr["error"](res.data.message);
      }
    })["catch"](function (error) {
      toastr["error"](error.message);
    });
  };

  var errorPage = state.errorPage,
      EventFiles = state.EventFiles,
      isAuthenticated = state.isAuthenticated,
      EventByIdDetail = state.EventByIdDetail,
      eventPreloader = state.eventPreloader,
      EventNavbarMenu = state.EventNavbarMenu,
      SlotsDetails = state.SlotsDetails,
      UpComingSlots = state.UpComingSlots,
      SlotsPreloader = state.SlotsPreloader;
  var Values = {
    EventFiles: EventFiles,
    UpComingSlots: UpComingSlots,
    SlotsDetails: SlotsDetails,
    errorPage: errorPage,
    isAuthenticated: isAuthenticated,
    EventNavbarMenu: EventNavbarMenu,
    EventByIdDetail: EventByIdDetail,
    eventPreloader: eventPreloader,
    SlotsPreloader: SlotsPreloader
  };

  if (errorPage) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Pages_Errors_404__WEBPACK_IMPORTED_MODULE_14__["default"], {
      h2: "Oops! Event Not Be Found",
      p: "Sorry but the Event you are looking for does not exist, have been removed. name changed or is temporarily unavailable",
      backTo: "Back to home",
      link: "/home"
    });
  }

  if (eventId == null || eventId == "" || eventToken == null || eventToken == "") {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__["Redirect"], {
      to: "/home"
    });
  }

  console.log(currentUser);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_store_Context__WEBPACK_IMPORTED_MODULE_17__["default"].Provider, {
    value: [state, dispatch]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "mid-content-sec in-page-content-sec ".concat(Values.EventNavbarMenu === 2 ? "event-time-slots" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-d-heding"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8___default.a, {
    width: 300,
    height: 37,
    duration: 2
  }) : EventByIdDetail.eventTitle), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ed-top-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (EventByIdDetail === null || EventByIdDetail === void 0 ? void 0 : (_EventByIdDetail$even = EventByIdDetail.eventCreatedUser) === null || _EventByIdDetail$even === void 0 ? void 0 : _EventByIdDetail$even.id) || currentUser == null ? "" : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8___default.a, {
    width: 100,
    height: 37
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "bdr-btn",
    "data-toggle": "modal",
    href: "#report-event-popup",
    title: "Report"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-report-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8___default.a, {
    width: 100,
    height: 37
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "bdr-btn",
    href: "#",
    onClick: function onClick() {
      return handelFavorite(EventByIdDetail === null || EventByIdDetail === void 0 ? void 0 : EventByIdDetail.id);
    },
    title: "Favorite"
  }, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (EventByIdDetail === null || EventByIdDetail === void 0 ? void 0 : (_EventByIdDetail$favo = EventByIdDetail.favoriteEvents) === null || _EventByIdDetail$favo === void 0 ? void 0 : _EventByIdDetail$favo.userId) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-favorite-solid-icon active"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-favorite-line-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "badge badge-pill badge-light"
  }, eventPreloader ? 0 : (_Values$EventByIdDeta = Values.EventByIdDetail) === null || _Values$EventByIdDeta === void 0 ? void 0 : _Values$EventByIdDeta.favoriteCount)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_8___default.a, {
    width: 100,
    height: 37
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "bdr-btn",
    "data-toggle": "modal",
    href: "#share-profile-popup",
    title: "Share",
    onClick: function onClick() {
      return globalDispatch({
        type: "share",
        payload: {
          Type: "share",
          Share: window.location.href
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-share-icon"
  }), " "))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-d-tabs-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-default-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    values: Values,
    currentUser: currentUser,
    EventNavbarMenu: EventNavbarMenuFun
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Detail_Detail__WEBPACK_IMPORTED_MODULE_2__["default"], {
    paymentHandle: handlePaymentModal,
    eventSlot: eventSlot
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Calender_Calender__WEBPACK_IMPORTED_MODULE_3__["default"], {
    values: Values,
    currentUser: currentUser,
    findSlotByDate: findSlotByDate,
    RightCalendarWeekDates: RightCalendarWeekDates,
    paymentHandle: handlePaymentModal
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Review_Review__WEBPACK_IMPORTED_MODULE_4__["default"], {
    values: Values,
    currentUser: currentUser
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Download_Download__WEBPACK_IMPORTED_MODULE_5__["default"], {
    values: Values,
    currentUser: currentUser
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_User_Profiles_ProfileModals_ReportProfilePopup__WEBPACK_IMPORTED_MODULE_20__["default"], {
    onChange: onChangeReport,
    comment: globalState === null || globalState === void 0 ? void 0 : globalState.report.comment,
    value: globalState === null || globalState === void 0 ? void 0 : globalState.report.report,
    handleSubmit: handleReportUserEvent,
    reportId: EventByIdDetail === null || EventByIdDetail === void 0 ? void 0 : EventByIdDetail.id,
    type: "eventId"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Events_Payments_Modals_StripePaymentModal__WEBPACK_IMPORTED_MODULE_11__["default"], {
    onChange: stripePaymentResponse,
    currentUser: currentUser,
    amount: state.amount,
    slotId: state.slotId,
    eventId: state.eventId
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_22__["default"], {
    id: "booking-conflicts-events",
    events: state.ConflictsEvents
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (EventDetailsSection);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Navbar/Navbar.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Navbar/Navbar.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
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





var Navbar = /*#__PURE__*/function (_Component) {
  _inherits(Navbar, _Component);

  var _super = _createSuper(Navbar);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    return _super.call(this);
  }

  _createClass(Navbar, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "ah-tab-item",
        "data-ah-tab-active": this.props.values.EventNavbarMenu === 1 ? true : false,
        onClick: function onClick() {
          _this.props.EventNavbarMenu(1);
        }
      }, this.props.values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      }) : 'Detail'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "ah-tab-item",
        "data-ah-tab-active": this.props.values.EventNavbarMenu === 2 ? true : false,
        onClick: function onClick() {
          _this.props.EventNavbarMenu(2);
        }
      }, this.props.values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      }) : 'Time Slots'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "ah-tab-item",
        "data-ah-tab-active": this.props.values.EventNavbarMenu === 3 ? true : false,
        onClick: function onClick() {
          _this.props.EventNavbarMenu(3);
        }
      }, this.props.values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      }) : 'Review'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "ah-tab-item",
        "data-ah-tab-active": this.props.values.EventNavbarMenu === 4 ? true : false,
        onClick: function onClick() {
          _this.props.EventNavbarMenu(4);
        }
      }, this.props.values.eventPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      }) : 'Download'))));
    }
  }]);

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Preloader/EventDetailsSectionPreload.jsx":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Preloader/EventDetailsSectionPreload.jsx ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventDetailsSectionPreload; });
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




var EventDetailsSectionPreload = /*#__PURE__*/function (_Component) {
  _inherits(EventDetailsSectionPreload, _Component);

  var _super = _createSuper(EventDetailsSectionPreload);

  function EventDetailsSectionPreload() {
    _classCallCheck(this, EventDetailsSectionPreload);

    return _super.apply(this, arguments);
  }

  _createClass(EventDetailsSectionPreload, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "mid-content-sec in-page-content-sec"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "event-details"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "e-d-heding"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 300,
        height: 37,
        duration: 2
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ed-top-btns"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "cmn-ul-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "e-d-tabs-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "av-default-tabs"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "ah-tab-item",
        "data-ah-tab-active": "true",
        href: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "ah-tab-item",
        href: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "ah-tab-item",
        href: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "ah-tab-item",
        href: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 37,
        duration: 2
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-content-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-content",
        "data-ah-tab-active": "true"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "event-details-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-12 col-md-12 col-lg-7"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "insert-file-slider e-d-gallery"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "e-d-gallery",
        className: "owl-carousel owl-theme"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "event-lft-img"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 657,
        height: 438,
        duration: 2
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "event-right-content"
      }, "asdasd")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-12 col-md-12 col-lg-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "event-right-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "h-evnt-d"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "e-des-tags-edit"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          fontSize: 20,
          lineHeight: 1.5
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 200
      }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        count: 4
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "h-evnt-d h-event-tags"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "e-des-tags-edit"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 50
      }), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "e-d-tags"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tags-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "ul-row-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 33
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 100,
        height: 33
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "meeting-short-info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "event-countdown"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "cmn-ul-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-d-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-d-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-d-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-d-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "meeting-space"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "m-s-info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "cmn-ul-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        circle: true,
        width: 32,
        height: 32
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        circle: true,
        width: 32,
        height: 32
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        circle: true,
        width: 32,
        height: 32
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        circle: true,
        width: 32,
        height: 32
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 140,
        height: 24
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "join-event-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
        width: 110,
        height: 36
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null))))))))))))));
    }
  }]);

  return EventDetailsSectionPreload;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/Cards/Review/Review.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/Cards/Review/Review.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _User_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../User/Reviews/Components/DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
/* harmony import */ var _ReviewsDetails_ReviewsDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../ReviewsDetails/ReviewsDetails */ "./resources/js/components/ReviewsDetails/ReviewsDetails.jsx");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _utility_ReviewRatingNumber__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utility/ReviewRatingNumber */ "./resources/js/components/screens/Events/EventsDetails/utility/ReviewRatingNumber.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Review = function Review(props) {
  var _props$values$EventBy = props.values.EventByIdDetail,
      eventType = _props$values$EventBy.eventType,
      eventCreatedUser = _props$values$EventBy.eventCreatedUser,
      totalReviews = _props$values$EventBy.totalReviews,
      eventDescription = _props$values$EventBy.eventDescription,
      eventImages = _props$values$EventBy.eventImages,
      eventFiles = _props$values$EventBy.eventFiles,
      eventReview = _props$values$EventBy.eventReview,
      eventTimeSlot = _props$values$EventBy.eventTimeSlot,
      eventTags = _props$values$EventBy.eventTags,
      eventTitle = _props$values$EventBy.eventTitle,
      favoriteEvents = _props$values$EventBy.favoriteEvents,
      numberOfSeats = _props$values$EventBy.numberOfSeats,
      id = _props$values$EventBy.id,
      status = _props$values$EventBy.status,
      timezone = _props$values$EventBy.timezone,
      reviewAverage = _props$values$EventBy.reviewAverage;
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_7__["default"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      Reviews = _useState2[0],
      setReviews = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])([]),
      _useState4 = _slicedToArray(_useState3, 2),
      Pagination = _useState4[0],
      setPagination = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    fetchReviews();
  }, [props.values.EventByIdDetail]);

  function fetchReviews() {
    var data = {
      eventId: id
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._fetchEventDetailsReviews(data).then(function (res) {
      if (res.data.status == 200) {
        setReviews(res.data.data.data);
        setPagination(res.data.data);
      }
    })["catch"](function (error) {
      console.log(error);
    });
  }

  function loadMore() {
    if (Pagination.next_page_url != null) {
      var data = {
        eventId: id,
        nexPage: Pagination.current_page + 1
      };

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._fetchEventDetailsReviews(data).then(function (res) {
        if (res.data.status == 200) {
          setReviews(_objectSpread(_objectSpread({}, Pagination), res.data.data.data));
          setPagination(res.data.data);
        }
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      alert('no more reviews');
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.values.EventNavbarMenu === 3 ? true : false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "e-d-review"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "all-reviews-status"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, totalReviews, " Reviews"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_User_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: reviewAverage || 0
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "all-reviews-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, Reviews.map(function (res, index) {
    var _res$receiver;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: res.sender.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + res.sender.user_profile.profile_picture : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == res.user_id ? 'Me' : res.sender.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_User_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__["default"], {
      value: parseFloat(res.rating)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(res.created_at).local().format('D MMM YYYY h:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, res.comment_to_host)), res.receiver ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "review-child-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: res.receiver.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + res.receiver.user_profile.profile_picture : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == res.host_id ? 'Me' : (_res$receiver = res.receiver) === null || _res$receiver === void 0 ? void 0 : _res$receiver.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(res.updated_at).local().format('D MMM YYYY h:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, res.comment_to_user))))) : '')));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "load-more-btn"
  }, (Pagination === null || Pagination === void 0 ? void 0 : Pagination.next_page_url) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    className: "btn white-shadow-btn",
    onClick: function onClick() {
      return loadMore();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-loading-icon"
  }), " Load More") : '')))));
};

/* harmony default export */ __webpack_exports__["default"] = (Review);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/EventDetails.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/EventDetails.jsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Cards_EventDetailsSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cards/EventDetailsSection */ "./resources/js/components/screens/Events/EventsDetails/Cards/EventDetailsSection.jsx");
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Navbar/Navbar */ "./resources/js/components/Navbar/Navbar.jsx");
/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Sidebar/Sidebar */ "./resources/js/components/Sidebar/Sidebar.jsx");
/* harmony import */ var _Footer_Footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Footer/Footer */ "./resources/js/components/Footer/Footer.jsx");
/* harmony import */ var _Modals_Modals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Modals/Modals */ "./resources/js/components/Modals/Modals.jsx");
/* harmony import */ var _Cards_Preloader_EventDetailsSectionPreload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Cards/Preloader/EventDetailsSectionPreload */ "./resources/js/components/screens/Events/EventsDetails/Cards/Preloader/EventDetailsSectionPreload.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");











var EventDetails = function EventDetails(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__["default"].Consumer, null, function (user) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_3__["default"], {
      currentUser: user
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Cards_EventDetailsSection__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Footer_Footer__WEBPACK_IMPORTED_MODULE_4__["InnerFooter"], {
      currentUser: user
    })), _Routes_Auth__WEBPACK_IMPORTED_MODULE_7__["default"].isAuthenticated() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_Modals__WEBPACK_IMPORTED_MODULE_5__["default"], {
      currentUser: user,
      modalId: "delete-confirm-message-popup",
      message: "Are you sure you want to delete this schedule?"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_Modals__WEBPACK_IMPORTED_MODULE_5__["default"], {
      currentUser: user,
      modalId: "disable-confirm-message-popup",
      message: "Are you sure you want to disable to this schedule?"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_Modals__WEBPACK_IMPORTED_MODULE_5__["RescheduleEventsModel"], {
      currentUser: user
    })) : '');
  });
};

/* harmony default export */ __webpack_exports__["default"] = (EventDetails);

/***/ }),

/***/ "./resources/js/components/screens/Events/EventsDetails/utility/ReviewRatingNumber.js":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/screens/Events/EventsDetails/utility/ReviewRatingNumber.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var ReviewRatingNumber = function ReviewRatingNumber(rating) {
  var ratingInt = parseFloat(rating);

  if (ratingInt == 0) {
    return 0;
  }

  if (ratingInt < 1) {
    return 0.5;
  }

  if (ratingInt >= 1 && ratingInt < 1.5) {
    return 1;
  }

  if (ratingInt > 1 && ratingInt <= 1.5) {
    return 1.5;
  }

  if (ratingInt > 1.5 && ratingInt <= 2) {
    return 2;
  }

  if (ratingInt > 2 && ratingInt <= 2.5) {
    return 2.5;
  }

  if (ratingInt > 2.5 && ratingInt <= 3) {
    return 3;
  }

  if (ratingInt > 3 && ratingInt <= 3.5) {
    return 3.5;
  }

  if (ratingInt > 3.5 && ratingInt <= 4) {
    return 4;
  }

  if (ratingInt > 4 && ratingInt <= 4.5) {
    return 4.5;
  }

  if (ratingInt > 4.5 && ratingInt <= 5) {
    return 5;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ReviewRatingNumber);

/***/ }),

/***/ "./resources/js/components/screens/Pages/Errors/404.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/components/screens/Pages/Errors/404.jsx ***!
  \**************************************************************/
/*! exports provided: Container, ContainerFluid, Span, H1, H2, H3, H4, H5, H6, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContainerFluid", function() { return ContainerFluid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Span", function() { return Span; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H1", function() { return H1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H2", function() { return H2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H3", function() { return H3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H4", function() { return H4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H5", function() { return H5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H6", function() { return H6; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var Error404 = function Error404(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "mid-content-sec in-page-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "notfound"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notfound"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notfound-404"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, props.h2), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, props.p), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: props.link,
    className: "btn default-btn"
  }, props.backTo))))));
};


var Container = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  text-align:center;\n\n"])));
var ContainerFluid = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\nmargin-top:10%;\n"])));
var Span = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-size:15px;\n"])));
var H1 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h1(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n\ncolor:red;\n\n"])));
var H2 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h2(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n\ncolor:red;\n\n"])));
var H3 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h3(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n\n\n"])));
var H4 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h4(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n\n\n"])));
var H5 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h5(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n\n\n"])));
var H6 = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].h6(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n\n\n"])));
/* harmony default export */ __webpack_exports__["default"] = (Error404);

/***/ }),

/***/ "./resources/js/store/Context.js":
/*!***************************************!*\
  !*** ./resources/js/store/Context.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var Context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (Context);

/***/ })

}]);