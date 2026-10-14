(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./resources/js/User/Profiles/Components/EventSlotList.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/EventSlotList.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var EventSlotList = function EventSlotList(props) {
  var _state$SlotDetails;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext4 = _slicedToArray(_useContext3, 2),
      globalState = _useContext4[0],
      globalDispatch = _useContext4[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "time-slot-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Time slots"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return dispatch({
        type: "setStartDate",
        payload: {
          Type: "setStartDate",
          StartDate: ""
        }
      });
    },
    className: "link-btn float-right"
  }, "See all...")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "accordion"
  }, state.SlotPreloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_4__["SlotsDetailsPreloader"], null) : ((_state$SlotDetails = state.SlotDetails) === null || _state$SlotDetails === void 0 ? void 0 : _state$SlotDetails.length) > 0 ? state.SlotDetails.map(function (res, index) {
    var _res$event_create_use;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res.id,
      className: "card"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "card-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-s-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-option"
    }, ((_res$event_create_use = res.event_create_user) === null || _res$event_create_use === void 0 ? void 0 : _res$event_create_use.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null) : ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-time"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, res.event_title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "link",
      "data-toggle": "collapse",
      href: "#collapseOne".concat(res.id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-add-plus-icon"
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "collapseOne".concat(res.id),
      className: "collapse ".concat(res.id == 1 ? "show" : ""),
      "data-parent": "#accordion"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "time-slot-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, res.event_time_slot.map(function (slot, sIndex) {
      var _res$event_payment;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: slot.id
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "t-s-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
              Share: "".concat(window.location.hostname, "/event?token=").concat(res.remember_token, "&event=").concat(res.id, "&slot=").concat(slot.id)
            }
          });
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-share-icon"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ts-time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_2___default()("".concat(slot.start_date, " ").concat(slot.start_time), "YYYY-MM-DD HH:mm").format("D MMM YYYY hh:mm A"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ts-btn"
      }, (res === null || res === void 0 ? void 0 : res.user_fk_id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/join/?rm=".concat(slot.meeting_room_id),
        className: "btn default-btn"
      }, "Start Now") : (_res$event_payment = res.event_payment) !== null && _res$event_payment !== void 0 && _res$event_payment.find(function (Pay) {
        return Pay.event_time_slot_id == slot.id && slot.id === Pay.event_time_slot_id && (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == Pay.user_fk_id;
      }) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        disabled: true,
        type: "button",
        onClick: function onClick() {
          return alert("Sorry meeting room not started yet...");
        },
        className: "btn default-btn"
      }, "Booked") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        onClick: function onClick() {
          return props.paymentHandle(parseInt(res.id), parseInt(slot.id), parseInt(res.cost));
        },
        className: "btn default-btn"
      }, "Book Now"))));
    }))))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "list-unstyled"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "t-s-bx alert alert-danger"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "ts-time"
  }, "No slots here")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (EventSlotList);

/***/ }),

/***/ "./resources/js/User/Profiles/Components/MyAccount.jsx":
/*!*************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/MyAccount.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_tagsinput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-tagsinput */ "./node_modules/react-tagsinput/react-tagsinput.js");
/* harmony import */ var react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_tagsinput__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _ProfileModals_EmailChangePopup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ProfileModals/EmailChangePopup */ "./resources/js/User/Profiles/ProfileModals/EmailChangePopup.jsx");
/* harmony import */ var _ProfileModals_ProfileDeactivatePopup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ProfileModals/ProfileDeactivatePopup */ "./resources/js/User/Profiles/ProfileModals/ProfileDeactivatePopup.jsx");
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var MyAccount = function MyAccount(props) {
  var _state$UpdateProfile;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/countries', {
      headers: {
        'Accept': 'application/json',
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_3__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.status == 200) {
        dispatch({
          type: "countries",
          payload: {
            Type: "countries",
            Countries: res.data
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
    return;
  }, []);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      ProfessionTags = _useState2[0],
      setProfessionTags = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      ProfessionInputTag = _useState4[0],
      setProfessionInputTags = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState6 = _slicedToArray(_useState5, 2),
      LanguageTags = _useState6[0],
      setLanguageTags = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState8 = _slicedToArray(_useState7, 2),
      LanguageInputTags = _useState8[0],
      setLanguageInputTags = _useState8[1];

  var handleTags = function handleTags(tags) {
    setProfessionTags(tags);
    dispatch({
      type: "UpdateProfile",
      payload: {
        Type: "UpdateProfile",
        UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
          profession: tags
        })
      }
    });
  };

  var handleLanguage = function handleLanguage(e) {
    setLanguageTags(e);
    dispatch({
      type: "UpdateProfile",
      payload: {
        Type: "UpdateProfile",
        UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
          language: e
        })
      }
    });
  };

  var handleLanguageInput = function handleLanguageInput(e) {
    setLanguageInputTags(e);
  };

  var handleTagsInput = function handleTagsInput(e) {
    setProfessionInputTags(e);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _state$ProfileDetails, _state$ProfileDetails2, _state$ProfileDetails3, _state$ProfileDetails4, _state$ProfileDetails5, _state$ProfileDetails6, _state$ProfileDetails7, _state$ProfileDetails8, _state$ProfileDetails9, _state$ProfileDetails10, _state$ProfileDetails11, _state$ProfileDetails12, _state$ProfileDetails13, _state$ProfileDetails14, _state$ProfileDetails15, _state$ProfileDetails16, _state$ProfileDetails17, _state$ProfileDetails18, _state$ProfileDetails19, _state$ProfileDetails20, _state$ProfileDetails21, _state$ProfileDetails22, _state$ProfileDetails23, _state$ProfileDetails24, _state$ProfileDetails25, _state$ProfileDetails26, _state$ProfileDetails27, _state$ProfileDetails28, _state$ProfileDetails29, _state$ProfileDetails30;

    dispatch({
      type: "UpdateProfile",
      payload: {
        Type: "UpdateProfile",
        UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
          name: (_state$ProfileDetails = state.ProfileDetails) === null || _state$ProfileDetails === void 0 ? void 0 : _state$ProfileDetails.name,
          aboutMe: (_state$ProfileDetails2 = state.ProfileDetails) === null || _state$ProfileDetails2 === void 0 ? void 0 : (_state$ProfileDetails3 = _state$ProfileDetails2.user_profile) === null || _state$ProfileDetails3 === void 0 ? void 0 : _state$ProfileDetails3.about_me,
          email: (_state$ProfileDetails4 = state.ProfileDetails) === null || _state$ProfileDetails4 === void 0 ? void 0 : _state$ProfileDetails4.email,
          profession: (_state$ProfileDetails5 = state.ProfileDetails) !== null && _state$ProfileDetails5 !== void 0 && (_state$ProfileDetails6 = _state$ProfileDetails5.user_profile) !== null && _state$ProfileDetails6 !== void 0 && _state$ProfileDetails6.profession ? JSON.parse((_state$ProfileDetails7 = state.ProfileDetails) === null || _state$ProfileDetails7 === void 0 ? void 0 : (_state$ProfileDetails8 = _state$ProfileDetails7.user_profile) === null || _state$ProfileDetails8 === void 0 ? void 0 : _state$ProfileDetails8.profession) : (_state$ProfileDetails9 = state.ProfileDetails) === null || _state$ProfileDetails9 === void 0 ? void 0 : (_state$ProfileDetails10 = _state$ProfileDetails9.user_profile) === null || _state$ProfileDetails10 === void 0 ? void 0 : _state$ProfileDetails10.profession,
          language: (_state$ProfileDetails11 = state.ProfileDetails) !== null && _state$ProfileDetails11 !== void 0 && (_state$ProfileDetails12 = _state$ProfileDetails11.user_profile) !== null && _state$ProfileDetails12 !== void 0 && _state$ProfileDetails12.language ? JSON.parse((_state$ProfileDetails13 = state.ProfileDetails) === null || _state$ProfileDetails13 === void 0 ? void 0 : (_state$ProfileDetails14 = _state$ProfileDetails13.user_profile) === null || _state$ProfileDetails14 === void 0 ? void 0 : _state$ProfileDetails14.language) : (_state$ProfileDetails15 = state.ProfileDetails) === null || _state$ProfileDetails15 === void 0 ? void 0 : (_state$ProfileDetails16 = _state$ProfileDetails15.user_profile) === null || _state$ProfileDetails16 === void 0 ? void 0 : _state$ProfileDetails16.language,
          dateOfBirth: (_state$ProfileDetails17 = state.ProfileDetails) === null || _state$ProfileDetails17 === void 0 ? void 0 : (_state$ProfileDetails18 = _state$ProfileDetails17.user_profile) === null || _state$ProfileDetails18 === void 0 ? void 0 : _state$ProfileDetails18.date_of_birth,
          gender: (_state$ProfileDetails19 = state.ProfileDetails) === null || _state$ProfileDetails19 === void 0 ? void 0 : (_state$ProfileDetails20 = _state$ProfileDetails19.user_profile) === null || _state$ProfileDetails20 === void 0 ? void 0 : _state$ProfileDetails20.gender,
          country: (_state$ProfileDetails21 = state.ProfileDetails) === null || _state$ProfileDetails21 === void 0 ? void 0 : (_state$ProfileDetails22 = _state$ProfileDetails21.user_profile) === null || _state$ProfileDetails22 === void 0 ? void 0 : _state$ProfileDetails22.country
        })
      }
    });
    setLanguageTags((_state$ProfileDetails23 = state.ProfileDetails) !== null && _state$ProfileDetails23 !== void 0 && (_state$ProfileDetails24 = _state$ProfileDetails23.user_profile) !== null && _state$ProfileDetails24 !== void 0 && _state$ProfileDetails24.language ? JSON.parse((_state$ProfileDetails25 = state.ProfileDetails) === null || _state$ProfileDetails25 === void 0 ? void 0 : (_state$ProfileDetails26 = _state$ProfileDetails25.user_profile) === null || _state$ProfileDetails26 === void 0 ? void 0 : _state$ProfileDetails26.language) : []);
    setProfessionTags((_state$ProfileDetails27 = state.ProfileDetails) !== null && _state$ProfileDetails27 !== void 0 && (_state$ProfileDetails28 = _state$ProfileDetails27.user_profile) !== null && _state$ProfileDetails28 !== void 0 && _state$ProfileDetails28.profession ? JSON.parse((_state$ProfileDetails29 = state.ProfileDetails) === null || _state$ProfileDetails29 === void 0 ? void 0 : (_state$ProfileDetails30 = _state$ProfileDetails29.user_profile) === null || _state$ProfileDetails30 === void 0 ? void 0 : _state$ProfileDetails30.profession) : []);
    return;
  }, [state.ProfileDetails]);

  var showModal = function showModal(modal) {
    $(modal).modal('show');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "my-account"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "my-ac-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Edit Profile")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: props.handleEditProfile
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "Name"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    id: "Name",
    placeholder: "",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            name: e.target.value
          })
        }
      });
    },
    value: state.UpdateProfile.name
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "EmailAddress"
  }, "Email Address ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn edit-email",
    onClick: function onClick() {
      return showModal('#change-email-address-popup');
    }
  }, "Change Email")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    id: "EmailAddress",
    placeholder: "",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            email: e.target.value
          })
        }
      });
    },
    value: state.UpdateProfile.email,
    readOnly: true
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "inputState"
  }, "Profession"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default.a, {
    value: ProfessionTags,
    onChange: handleTags,
    inputValue: ProfessionInputTag,
    addKeys: [9, 13, 188],
    onChangeInput: handleTagsInput,
    onlyUnique: true,
    maxTags: 2,
    inputProps: {
      placeholder: 'Profession'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "inputState"
  }, "Language"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_tagsinput__WEBPACK_IMPORTED_MODULE_2___default.a, {
    value: LanguageTags,
    onChange: handleLanguage,
    inputValue: LanguageInputTags,
    addKeys: [9, 13, 188],
    onChangeInput: handleLanguageInput,
    onlyUnique: true,
    maxTags: 15,
    inputProps: {
      placeholder: 'Languages'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "EventTitle"
  }, "Date of Birth"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "date",
    className: "form-control date",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            dateOfBirth: e.target.value
          })
        }
      });
    },
    placeholder: "Pick DOB",
    value: state.UpdateProfile.dateOfBirth
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group-social"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "tag"
  }, "Gender"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "radio",
    name: "gender",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            gender: e.target.value
          })
        }
      });
    },
    checked: (state === null || state === void 0 ? void 0 : state.UpdateProfile.gender) == "Male" ? true : false,
    value: "Male"
  }), "Male"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "radio",
    name: "gender",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            gender: e.target.value
          })
        }
      });
    },
    checked: (state === null || state === void 0 ? void 0 : state.UpdateProfile.gender) == "Female" ? true : false,
    value: "Female"
  }), "Female")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "tag"
  }, "Country"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            country: e.target.value
          })
        }
      });
    },
    value: (_state$UpdateProfile = state.UpdateProfile) === null || _state$UpdateProfile === void 0 ? void 0 : _state$UpdateProfile.country
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    defaultValue: true,
    disabled: true
  }, "--Select Country--"), state.Countries.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      key: res.id,
      value: res.name
    }, res.name);
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "Phone"
  }, "Phone Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Enter Phone Number"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "social"
  }, "Social Profile Link"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Facebook Profile Link"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "linkedin Profile Link"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Instagram Profile Link"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    className: "form-control",
    placeholder: "Twitter Profile Link"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "tag"
  }, "Change Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "NewPassword"
  }, "New Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "Enter New Password...",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            password: e.target.value
          })
        }
      });
    },
    value: state.UpdateProfile.password
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label",
    htmlFor: "ConfirmPassword"
  }, "Confirm New Password "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "Confirm New Password...",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: {
          Type: "UpdateProfile",
          UpdateProfile: _objectSpread(_objectSpread({}, state.UpdateProfile), {}, {
            password_confirmation: e.target.value
          })
        }
      });
    },
    value: state.UpdateProfile.password_confirmation
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "two-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn"
  }, "Save")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return alert('Something Wrong');
    },
    className: "btn default-btn deactivate-btn",
    "data-toggle": "modal",
    "data-target": "#deactivate-account-popup"
  }, " Deactivate Account"))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProfileModals_EmailChangePopup__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProfileModals_ProfileDeactivatePopup__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (MyAccount);

/***/ }),

/***/ "./resources/js/User/Profiles/Components/MyEvent.jsx":
/*!***********************************************************!*\
  !*** ./resources/js/User/Profiles/Components/MyEvent.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_GlobalLink__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ApiServer/GlobalLink */ "./resources/js/ApiServer/GlobalLink.js");
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _components_Home_Cards_EventBoxCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Home/Cards/EventBoxCard */ "./resources/js/components/Home/Cards/EventBoxCard.jsx");
/* harmony import */ var _ApiServer_EventHandling_EventHandlingServices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../ApiServer/EventHandling/EventHandlingServices */ "./resources/js/ApiServer/EventHandling/EventHandlingServices.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
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










var MyEvent = function MyEvent(props) {
  var _state$ProfileEvents;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"]);

  var actionEvent = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(eventId, type) {
      var data;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (type == "delete" || "disable") {
                jquery__WEBPACK_IMPORTED_MODULE_7___default()("#DeletedEventModal").modal('show');
              }

              data = {
                eventId: eventId,
                eventAction: type
              }; // const response=await EventHandlingServices.PostEventHandlingServices(data); 
              //     if(response.data.status==200){
              //       const event=state.ProfileEvents.filter(event => event.id != eventId);
              //         dispatch({type:"ProfileEvents",payload:{Type:"ProfileEvents",ProfileEvents:event}}); 
              //       return toastr["success"](response.data.messages);
              //     }else if(response.data.status=='failed'){
              //        return toastr["error"](response.data.messages);
              //     }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function actionEvent(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "my-events"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-c-list border-bottom-none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-row"
  }, ((_state$ProfileEvents = state.ProfileEvents) === null || _state$ProfileEvents === void 0 ? void 0 : _state$ProfileEvents.length) > 0 ? state.ProfileEvents.map(function (data, index) {
    var _data$event_create_us, _data$favorite_events, _data$event_time_slot, _data$event_time_slot2, _data$event_time_slot3, _data$event_time_slot4, _data$event_time_slot5, _data$event_create_us2, _data$event_create_us3, _data$event_time_slot6, _data$event_time_slot7, _data$event_time_slot8, _data$event_time_slot9, _data$event_time_slot10, _data$event_time_slot11, _data$event_time_slot12, _data$event_time_slot13, _data$event_time_slot14, _data$event_time_slot15;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Home_Cards_EventBoxCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
      key: data === null || data === void 0 ? void 0 : data.id,
      action: actionEvent,
      rating: (data === null || data === void 0 ? void 0 : (_data$event_create_us = data.event_create_user.event_reviews) === null || _data$event_create_us === void 0 ? void 0 : _data$event_create_us.average_rating) || 0,
      favorite: (data === null || data === void 0 ? void 0 : (_data$favorite_events = data.favorite_events) === null || _data$favorite_events === void 0 ? void 0 : _data$favorite_events.user_id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? true : false,
      remainingSeats: (data === null || data === void 0 ? void 0 : (_data$event_time_slot = data.event_time_slot) === null || _data$event_time_slot === void 0 ? void 0 : _data$event_time_slot.length) > 0 ? parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot2 = data.event_time_slot[0]) === null || _data$event_time_slot2 === void 0 ? void 0 : _data$event_time_slot2.booked_seats) : 0,
      totalSeats: (data === null || data === void 0 ? void 0 : (_data$event_time_slot3 = data.event_time_slot) === null || _data$event_time_slot3 === void 0 ? void 0 : _data$event_time_slot3.length) > 0 ? parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot4 = data.event_time_slot[0]) === null || _data$event_time_slot4 === void 0 ? void 0 : _data$event_time_slot4.total_seats) - parseInt(data === null || data === void 0 ? void 0 : (_data$event_time_slot5 = data.event_time_slot[0]) === null || _data$event_time_slot5 === void 0 ? void 0 : _data$event_time_slot5.booked_seats) : 0,
      UserProfileURL: data.event_create_user.username,
      authUser: ((_data$event_create_us2 = data.event_create_user) === null || _data$event_create_us2 === void 0 ? void 0 : _data$event_create_us2.id) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? true : false,
      userName: data.event_create_user ? (_data$event_create_us3 = data.event_create_user) === null || _data$event_create_us3 === void 0 ? void 0 : _data$event_create_us3.name : 'N/A',
      offer: data.event_discount ? parseFloat(data.event_discount.offer) + '%' : null,
      attending: data.attending ? data.attending : 0,
      attendingInHours: moment__WEBPACK_IMPORTED_MODULE_3___default()().diff(moment__WEBPACK_IMPORTED_MODULE_3___default()(data.created_at), 'hours'),
      eventCost: (data === null || data === void 0 ? void 0 : (_data$event_time_slot6 = data.event_time_slot) === null || _data$event_time_slot6 === void 0 ? void 0 : _data$event_time_slot6.length) > 0 ? data !== null && data !== void 0 && (_data$event_time_slot7 = data.event_time_slot[0]) !== null && _data$event_time_slot7 !== void 0 && _data$event_time_slot7.cost ? (data === null || data === void 0 ? void 0 : (_data$event_time_slot8 = data.event_time_slot[0]) === null || _data$event_time_slot8 === void 0 ? void 0 : _data$event_time_slot8.cost) > 0 ? "$".concat(data === null || data === void 0 ? void 0 : (_data$event_time_slot9 = data.event_time_slot[0]) === null || _data$event_time_slot9 === void 0 ? void 0 : _data$event_time_slot9.cost) : 'Free' : 0 : '0',
      eventRating: data.eventRating,
      eventStartedAt: (data === null || data === void 0 ? void 0 : (_data$event_time_slot10 = data.event_time_slot) === null || _data$event_time_slot10 === void 0 ? void 0 : _data$event_time_slot10.length) > 0 ? (_data$event_time_slot11 = data.event_time_slot[0]) !== null && _data$event_time_slot11 !== void 0 && _data$event_time_slot11.start_date ? moment__WEBPACK_IMPORTED_MODULE_3___default()(moment__WEBPACK_IMPORTED_MODULE_3___default()((_data$event_time_slot12 = data.event_time_slot[0]) === null || _data$event_time_slot12 === void 0 ? void 0 : _data$event_time_slot12.start_date, 'YYYY-MM-DD')).format('D MMM YYYY') : 'N/A' : "N/A",
      eventTitle: data.event_title,
      eventType: data.event_type,
      favIcon: data.favIcon,
      id: data.id,
      eventSlotId: (data === null || data === void 0 ? void 0 : (_data$event_time_slot13 = data.event_time_slot) === null || _data$event_time_slot13 === void 0 ? void 0 : _data$event_time_slot13.length) > 0 ? data !== null && data !== void 0 && (_data$event_time_slot14 = data.event_time_slot[0]) !== null && _data$event_time_slot14 !== void 0 && _data$event_time_slot14.id ? data === null || data === void 0 ? void 0 : (_data$event_time_slot15 = data.event_time_slot[0]) === null || _data$event_time_slot15 === void 0 ? void 0 : _data$event_time_slot15.id : 0 : 0,
      imageUrl: JSON.parse(data.event_files),
      eventToken: data.remember_token
    });
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "No events here"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "show-more-card"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "more-show-btn",
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-double-down-arrow-icon"
  })), " "))))));
};

/* harmony default export */ __webpack_exports__["default"] = (MyEvent);

/***/ }),

/***/ "./resources/js/User/Profiles/Components/MyProfile.jsx":
/*!*************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/MyProfile.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Chats_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Chats/ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Chats_ChatPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Chats/ChatPage */ "./resources/js/User/Chats/ChatPage.jsx");
/* harmony import */ var _Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Reviews/Components/DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
/* harmony import */ var _components_screens_CreateEvent_Cards_ImageCropper_CustomeCroppie__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie */ "./resources/js/components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie.jsx");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var MyProfile = function MyProfile(props) {
  var _state$ProfileDetails, _state$ProfileDetails2, _state$ProfileDetails3, _state$ProfileDetails4, _state$ProfileDetails5, _state$ProfileDetails6, _state$ProfileDetails7, _state$ProfileDetails8, _state$ProfileDetails9, _state$ProfileDetails10, _state$ProfileDetails11, _state$ProfileDetails12, _state$ProfileDetails13, _state$ProfileDetails14, _state$ProfileDetails15, _state$ProfileDetails16, _state$ProfileDetails17, _state$ProfileDetails18, _state$ProfileDetails19, _state$ProfileDetails20, _state$ProfileDetails21, _state$ProfileDetails22, _state$ProfileDetails23, _state$ProfileDetails24, _state$ProfileDetails25, _state$ProfileDetails26, _state$ProfileDetails27, _state$ProfileDetails28, _state$ProfileDetails29, _state$ProfileDetails30, _state$ProfileUpcomin, _state$ProfileUpcomin2, _state$ProfileUpcomin3, _state$ProfileUpcomin4, _state$ProfileUpcomin5, _state$ProfileUpcomin6, _state$ProfileUpcomin7, _state$ProfileUpcomin8, _state$ProfileUpcomin9, _state$ProfileUpcomin10, _state$ProfileUpcomin11, _state$ProfileUpcomin12, _state$ProfileUpcomin13, _state$ProfileUpcomin14, _state$ProfileUpcomin15, _state$ProfileUpcomin16, _state$ProfileUpcomin17, _state$ProfileUpcomin18, _state$ProfileUpcomin19, _state$ProfileUpcomin20, _state$ProfileUpcomin21, _state$ProfileUpcomin22, _state$ProfileUpcomin23, _state$ProfileDetails42, _state$UpdateProfile, _state$ProfileDetails43, _state$ProfileDetails44, _state$ProfileDetails45, _state$UpdateProfile2, _state$ProfileDetails46, _state$ProfileDetails47, _state$ProfileDetails48, _state$ProfileDetails49, _state$UpdateProfile3;

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
      _useContext2 = _slicedToArray(_useContext, 4),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      ProfilePictureUpload = _useContext2[2],
      onCropImage = _useContext2[3];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      ProfilePicture = _useState2[0],
      setProfilePicture = _useState2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "my-profile-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-details-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "my-profile-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-evnt-d"
  }, state.UserOnline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-des-tags-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Online")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-des-tags-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    style: {
      color: "black"
    }
  }, "Offline")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pro-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-6 col-md-6 col-lg-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "lft-pro-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "avatar-upload"
  }, ((_state$ProfileDetails = state.ProfileDetails) === null || _state$ProfileDetails === void 0 ? void 0 : _state$ProfileDetails.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "avatar-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "file",
    id: "imageUpload",
    onChange: ProfilePictureUpload,
    accept: ".png,.jpg,.jpeg"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "imageUpload"
  })) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "avatar-preview"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "imagePreview",
    style: {
      backgroundImage: "url(".concat((_state$ProfileDetails2 = state.ProfileDetails) !== null && _state$ProfileDetails2 !== void 0 && (_state$ProfileDetails3 = _state$ProfileDetails2.user_profile) !== null && _state$ProfileDetails3 !== void 0 && _state$ProfileDetails3.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + ((_state$ProfileDetails4 = state.ProfileDetails) === null || _state$ProfileDetails4 === void 0 ? void 0 : (_state$ProfileDetails5 = _state$ProfileDetails4.user_profile) === null || _state$ProfileDetails5 === void 0 ? void 0 : _state$ProfileDetails5.profile_picture) : (_state$ProfileDetails6 = state.ProfileDetails) !== null && _state$ProfileDetails6 !== void 0 && (_state$ProfileDetails7 = _state$ProfileDetails6.user_profile) !== null && _state$ProfileDetails7 !== void 0 && _state$ProfileDetails7.social_profile_picture_url ? (_state$ProfileDetails8 = state.ProfileDetails) === null || _state$ProfileDetails8 === void 0 ? void 0 : (_state$ProfileDetails9 = _state$ProfileDetails8.user_profile) === null || _state$ProfileDetails9 === void 0 ? void 0 : _state$ProfileDetails9.social_profile_picture_url : "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/avatar.png"), ")")
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "footer-social-icn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "fb"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://facebook.com/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-facebook",
    "aria-hidden": "true"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "google"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://gmail.com/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-google-plus",
    "aria-hidden": "true"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "twitter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "https://twitter.com/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "fa fa-twitter",
    "aria-hidden": "true"
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-6 col-md-6 col-lg-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "right-pro-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    className: "p-usr-name"
  }, (_state$ProfileDetails10 = state.ProfileDetails) === null || _state$ProfileDetails10 === void 0 ? void 0 : _state$ProfileDetails10.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "all-reviews-status"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, (_state$ProfileDetails11 = state.ProfileDetails) === null || _state$ProfileDetails11 === void 0 ? void 0 : (_state$ProfileDetails12 = _state$ProfileDetails11.event_reviews) === null || _state$ProfileDetails12 === void 0 ? void 0 : _state$ProfileDetails12.average_count, " ", ((_state$ProfileDetails13 = state.ProfileDetails) === null || _state$ProfileDetails13 === void 0 ? void 0 : (_state$ProfileDetails14 = _state$ProfileDetails13.event_reviews) === null || _state$ProfileDetails14 === void 0 ? void 0 : _state$ProfileDetails14.average_count) > 1 ? 'Reviews' : 'Review'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_8__["default"], {
    value: parseFloat((_state$ProfileDetails15 = state.ProfileDetails) === null || _state$ProfileDetails15 === void 0 ? void 0 : (_state$ProfileDetails16 = _state$ProfileDetails15.event_reviews) === null || _state$ProfileDetails16 === void 0 ? void 0 : _state$ProfileDetails16.average_rating) || 0
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-s-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, state.ProfileDetails ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-member-since-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Member Since ", state.ProfileDetails ? moment__WEBPACK_IMPORTED_MODULE_2___default()((_state$ProfileDetails17 = state.ProfileDetails) === null || _state$ProfileDetails17 === void 0 ? void 0 : _state$ProfileDetails17.joined_on, 'YYYY-MM-DD HH:mm:ss').format('D MMM YYYY') : 'not found')) : '', (_state$ProfileDetails18 = state.ProfileDetails) !== null && _state$ProfileDetails18 !== void 0 && _state$ProfileDetails18.user_profile ? JSON.parse((_state$ProfileDetails19 = state.ProfileDetails) === null || _state$ProfileDetails19 === void 0 ? void 0 : _state$ProfileDetails19.user_profile.language) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "my-profile-language"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-translate-icon"
  }), JSON.parse((_state$ProfileDetails20 = state.ProfileDetails) === null || _state$ProfileDetails20 === void 0 ? void 0 : _state$ProfileDetails20.user_profile.language).map(function (res, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: res
    }, res);
  })) : '' : '', (_state$ProfileDetails21 = state.ProfileDetails) !== null && _state$ProfileDetails21 !== void 0 && _state$ProfileDetails21.user_profile ? ((_state$ProfileDetails22 = state.ProfileDetails) === null || _state$ProfileDetails22 === void 0 ? void 0 : _state$ProfileDetails22.user_profile.country) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-location-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "".concat((_state$ProfileDetails23 = state.ProfileDetails) !== null && _state$ProfileDetails23 !== void 0 && _state$ProfileDetails23.user_profile.country ? (_state$ProfileDetails24 = state.ProfileDetails) === null || _state$ProfileDetails24 === void 0 ? void 0 : _state$ProfileDetails24.user_profile.country : ''))) : '' : '', (_state$ProfileDetails25 = state.ProfileDetails) !== null && _state$ProfileDetails25 !== void 0 && _state$ProfileDetails25.user_profile ? JSON.parse((_state$ProfileDetails26 = state.ProfileDetails) === null || _state$ProfileDetails26 === void 0 ? void 0 : (_state$ProfileDetails27 = _state$ProfileDetails26.user_profile) === null || _state$ProfileDetails27 === void 0 ? void 0 : _state$ProfileDetails27.profession) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "my-profile-skill"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-Profession-icon"
  }), JSON.parse((_state$ProfileDetails28 = state.ProfileDetails) === null || _state$ProfileDetails28 === void 0 ? void 0 : (_state$ProfileDetails29 = _state$ProfileDetails28.user_profile) === null || _state$ProfileDetails29 === void 0 ? void 0 : _state$ProfileDetails29.profession).map(function (res, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      key: res,
      className: i === 0 ? 'd-none skill-separator' : 'd-block skill-separator'
    }, "|"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, res));
  })) : '' : '')), ((_state$ProfileDetails30 = state.ProfileDetails) === null || _state$ProfileDetails30 === void 0 ? void 0 : _state$ProfileDetails30.id) != (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "join-event-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"], {
    to: "/messages",
    onClick: function onClick() {
      var _state$ProfileDetails31, _state$ProfileDetails32, _state$ProfileDetails33, _state$ProfileDetails34, _state$ProfileDetails35, _state$ProfileDetails36, _state$ProfileDetails37, _state$ProfileDetails38, _state$ProfileDetails39, _state$ProfileDetails40, _state$ProfileDetails41;

      return Object(_Chats_ChatPage__WEBPACK_IMPORTED_MODULE_7__["chatInitiate"])({
        id: (_state$ProfileDetails31 = state.ProfileDetails) === null || _state$ProfileDetails31 === void 0 ? void 0 : _state$ProfileDetails31.id,
        name: (_state$ProfileDetails32 = state.ProfileDetails) === null || _state$ProfileDetails32 === void 0 ? void 0 : _state$ProfileDetails32.name,
        username: (_state$ProfileDetails33 = state.ProfileDetails) === null || _state$ProfileDetails33 === void 0 ? void 0 : _state$ProfileDetails33.username,
        ProfilePicture: (_state$ProfileDetails34 = state.ProfileDetails) !== null && _state$ProfileDetails34 !== void 0 && (_state$ProfileDetails35 = _state$ProfileDetails34.user_profile) !== null && _state$ProfileDetails35 !== void 0 && _state$ProfileDetails35.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + ((_state$ProfileDetails36 = state.ProfileDetails) === null || _state$ProfileDetails36 === void 0 ? void 0 : (_state$ProfileDetails37 = _state$ProfileDetails36.user_profile) === null || _state$ProfileDetails37 === void 0 ? void 0 : _state$ProfileDetails37.profile_picture) : (_state$ProfileDetails38 = state.ProfileDetails) !== null && _state$ProfileDetails38 !== void 0 && (_state$ProfileDetails39 = _state$ProfileDetails38.user_profile) !== null && _state$ProfileDetails39 !== void 0 && _state$ProfileDetails39.social_profile_picture_url ? (_state$ProfileDetails40 = state.ProfileDetails) === null || _state$ProfileDetails40 === void 0 ? void 0 : (_state$ProfileDetails41 = _state$ProfileDetails40.user_profile) === null || _state$ProfileDetails41 === void 0 ? void 0 : _state$ProfileDetails41.social_profile_picture_url : "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/avatar.png")
      });
    },
    className: "btn default-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-message-icon"
  }), " Message")) : ''))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-right-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "meeting-short-info"
  }, state.ProfileUpcomingSlots ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-countdown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, (_state$ProfileUpcomin = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin === void 0 ? void 0 : (_state$ProfileUpcomin2 = _state$ProfileUpcomin.events) === null || _state$ProfileUpcomin2 === void 0 ? void 0 : _state$ProfileUpcomin2.event_title)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "meeting-space"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    className: "float-right"
  }, moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(((_state$ProfileUpcomin3 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin3 === void 0 ? void 0 : _state$ProfileUpcomin3.start_date) + '' + ((_state$ProfileUpcomin4 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin4 === void 0 ? void 0 : _state$ProfileUpcomin4.start_time), 'YYYY-MM-DD HH:mm:ss')).calendar(null, {
    lastDay: '[Yesterday] hh:mm A',
    sameDay: '[Today] @ hh:mm A',
    nextDay: '[Tomorrow] @ hh:mm A',
    lastWeek: '[Last Week] DD MMM, YYYY',
    nextWeek: '[Next Week] DD MMM, YYYY',
    sameElse: 'L'
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Meeting Specs "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-s-info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Seats"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-seats-icon"
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, (_state$ProfileUpcomin5 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin5 === void 0 ? void 0 : _state$ProfileUpcomin5.booked_seats, "/", (_state$ProfileUpcomin6 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin6 === void 0 ? void 0 : _state$ProfileUpcomin6.total_seats, " ", "Seats Left"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Duration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-event-time-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_10__["FindHoursMinutes"])((_state$ProfileUpcomin7 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin7 === void 0 ? void 0 : _state$ProfileUpcomin7.duration), "\xA0(HH:mm)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-event-doller-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, ((_state$ProfileUpcomin8 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin8 === void 0 ? void 0 : _state$ProfileUpcomin8.cost) > 0 ? "$".concat((_state$ProfileUpcomin9 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin9 === void 0 ? void 0 : _state$ProfileUpcomin9.cost) : "Free"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-webinar-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, (_state$ProfileUpcomin10 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin10 === void 0 ? void 0 : (_state$ProfileUpcomin11 = _state$ProfileUpcomin10.events) === null || _state$ProfileUpcomin11 === void 0 ? void 0 : _state$ProfileUpcomin11.event_type)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "join-event-bx"
  }, state.Preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_11___default.a, {
    width: 110,
    height: 36
  }) : ((_state$ProfileUpcomin12 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin12 === void 0 ? void 0 : (_state$ProfileUpcomin13 = _state$ProfileUpcomin12.events) === null || _state$ProfileUpcomin13 === void 0 ? void 0 : _state$ProfileUpcomin13.user_fk_id) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn default-btn booked-btn",
    style: {
      backgroundColor: '#145388'
    }
  }, "Start", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/join/?rm=".concat((_state$ProfileUpcomin14 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin14 === void 0 ? void 0 : _state$ProfileUpcomin14.meeting_room_id),
    className: "btn cmn-bdr-btn",
    title: "Start Meeting"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-quick-start-icon"
  }))) : ((_state$ProfileUpcomin15 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin15 === void 0 ? void 0 : (_state$ProfileUpcomin16 = _state$ProfileUpcomin15.event_payment) === null || _state$ProfileUpcomin16 === void 0 ? void 0 : _state$ProfileUpcomin16.length) > 0 && ((_state$ProfileUpcomin17 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin17 === void 0 ? void 0 : (_state$ProfileUpcomin18 = _state$ProfileUpcomin17.event_payment[0]) === null || _state$ProfileUpcomin18 === void 0 ? void 0 : _state$ProfileUpcomin18.user_fk_id) === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn default-btn booked-btn"
  }, "Booked", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/join/?rm=".concat((_state$ProfileUpcomin19 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin19 === void 0 ? void 0 : _state$ProfileUpcomin19.meeting_room_id),
    className: "btn cmn-bdr-btn",
    title: "Join Meeting"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-quick-start-icon"
  }))) : ((_state$ProfileUpcomin20 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin20 === void 0 ? void 0 : _state$ProfileUpcomin20.booked_seats) === ((_state$ProfileUpcomin21 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin21 === void 0 ? void 0 : _state$ProfileUpcomin21.total_seats) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    disabled: true
  }, "Seats are full") : moment__WEBPACK_IMPORTED_MODULE_2___default()(((_state$ProfileUpcomin22 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin22 === void 0 ? void 0 : _state$ProfileUpcomin22.end_date) + '' + ((_state$ProfileUpcomin23 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin23 === void 0 ? void 0 : _state$ProfileUpcomin23.end_time), 'YYYY-MM-DD HH:mm:ss') <= moment__WEBPACK_IMPORTED_MODULE_2___default()() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    disabled: true
  }, "Date and Time has expired") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      var _state$ProfileUpcomin24, _state$ProfileUpcomin25, _state$ProfileUpcomin26, _state$ProfileUpcomin27;

      return props.paymentHandle((_state$ProfileUpcomin24 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin24 === void 0 ? void 0 : (_state$ProfileUpcomin25 = _state$ProfileUpcomin24.events) === null || _state$ProfileUpcomin25 === void 0 ? void 0 : _state$ProfileUpcomin25.id, (_state$ProfileUpcomin26 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin26 === void 0 ? void 0 : _state$ProfileUpcomin26.id, (_state$ProfileUpcomin27 = state.ProfileUpcomingSlots) === null || _state$ProfileUpcomin27 === void 0 ? void 0 : _state$ProfileUpcomin27.cost);
    },
    className: "btn default-btn"
  }, "Book Now"))) : "No Upcoming Event"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-12 col-md-12 col-lg-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-evnt-d"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "e-des-tags-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "About Me"), (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == ((_state$ProfileDetails42 = state.ProfileDetails) === null || _state$ProfileDetails42 === void 0 ? void 0 : _state$ProfileDetails42.id) ? (_state$UpdateProfile = state.UpdateProfile) !== null && _state$UpdateProfile !== void 0 && _state$UpdateProfile.edit || ((_state$ProfileDetails43 = state.ProfileDetails) === null || _state$ProfileDetails43 === void 0 ? void 0 : (_state$ProfileDetails44 = _state$ProfileDetails43.user_profile) === null || _state$ProfileDetails44 === void 0 ? void 0 : _state$ProfileDetails44.about_me) == null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: props.handleEditProfile,
    className: "d-edit-link"
  }, "Save") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: _objectSpread(_objectSpread({
          Type: "UpdateProfile"
        }, state.UpdateProfile), {}, {
          edit: true
        })
      });
    },
    className: "d-edit-link"
  }, "Edit") : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "des-content"
  }, ((_state$ProfileDetails45 = state.ProfileDetails) === null || _state$ProfileDetails45 === void 0 ? void 0 : _state$ProfileDetails45.user_profile) != null ? (_state$UpdateProfile2 = state.UpdateProfile) !== null && _state$UpdateProfile2 !== void 0 && _state$UpdateProfile2.edit || ((_state$ProfileDetails46 = state.ProfileDetails) === null || _state$ProfileDetails46 === void 0 ? void 0 : (_state$ProfileDetails47 = _state$ProfileDetails46.user_profile) === null || _state$ProfileDetails47 === void 0 ? void 0 : _state$ProfileDetails47.about_me) == null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: "form-control",
    cols: "55",
    rows: "5",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: _objectSpread(_objectSpread({
          Type: "UpdateProfile"
        }, state.UpdateProfile), {}, {
          aboutMe: e.target.value,
          edit: true
        })
      });
    },
    placeholder: "Enter About Us",
    value: state.UpdateProfile.aboutMe
  }, state.UpdateProfile.aboutMe) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, state === null || state === void 0 ? void 0 : (_state$ProfileDetails48 = state.ProfileDetails) === null || _state$ProfileDetails48 === void 0 ? void 0 : (_state$ProfileDetails49 = _state$ProfileDetails48.user_profile) === null || _state$ProfileDetails49 === void 0 ? void 0 : _state$ProfileDetails49.about_me) : (_state$UpdateProfile3 = state.UpdateProfile) !== null && _state$UpdateProfile3 !== void 0 && _state$UpdateProfile3.edit ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: "form-control",
    cols: "55",
    rows: "5",
    onChange: function onChange(e) {
      return dispatch({
        type: "UpdateProfile",
        payload: _objectSpread(_objectSpread({
          Type: "UpdateProfile"
        }, state.UpdateProfile), {}, {
          aboutMe: e.target.value
        })
      });
    }
  }) : ''))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade",
    id: "CropperModalPop",
    tabIndex: "-1",
    role: "dialog",
    "aria-labelledby": "exampleModalLongTitle",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_screens_CreateEvent_Cards_ImageCropper_CustomeCroppie__WEBPACK_IMPORTED_MODULE_9__["default"], {
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
    buttonClassName: "btn default-btn float-right",
    onCrop: onCropImage,
    value: state.ProfilePictureValue
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (MyProfile);

/***/ }),

/***/ "./resources/js/User/Profiles/Components/ProfileReview.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/ProfileReview.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Reviews/Components/DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var initialState = {};

var ProfileReview = function ProfileReview(props) {
  var _props$value3, _props$value3$event_r, _props$value4, _props$value4$event_r, _props$value5, _props$value5$event_r;

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      stateReviews = _useState2[0],
      setReviews = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(),
      _useState4 = _slicedToArray(_useState3, 2),
      paginationReviews = _useState4[0],
      setPaginationReviews = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    fetchProfileReviews();
  }, [props.active]);

  function fetchProfileReviews() {
    var _props$value;

    var data = {
      userId: props === null || props === void 0 ? void 0 : (_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.id
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._fetchUserProfileReviews(data).then(function (res) {
      if (res.data.status == 200) {
        setReviews(res.data.data.data);
        setPaginationReviews(res.data.data);
      } else {
        console.log(res.data.message);
      }
    })["catch"](function (error) {
      console.log(error);
    });
  }

  var loadMore = function loadMore() {
    if (paginationReviews.next_page_url != null) {
      var _props$value2;

      var data = {
        userId: props === null || props === void 0 ? void 0 : (_props$value2 = props.value) === null || _props$value2 === void 0 ? void 0 : _props$value2.id,
        nextPage: paginationReviews.current_page + 1
      };

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._fetchUserProfileReviews(data).then(function (res) {
        if (res.data.status == 200) {
          setReviews(_objectSpread(_objectSpread({}, stateReviews), res.data.data.data));
          setPaginationReviews(res.data.data);
        } else {
          console.log(res.data.message);
        }
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      alert('no more reviews');
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "e-d-review"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "all-reviews-status"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, props === null || props === void 0 ? void 0 : (_props$value3 = props.value) === null || _props$value3 === void 0 ? void 0 : (_props$value3$event_r = _props$value3.event_reviews) === null || _props$value3$event_r === void 0 ? void 0 : _props$value3$event_r.average_count, " ", (props === null || props === void 0 ? void 0 : (_props$value4 = props.value) === null || _props$value4 === void 0 ? void 0 : (_props$value4$event_r = _props$value4.event_reviews) === null || _props$value4$event_r === void 0 ? void 0 : _props$value4$event_r.average_count) > 1 ? 'Reviews' : 'Review'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: parseFloat(props === null || props === void 0 ? void 0 : (_props$value5 = props.value) === null || _props$value5 === void 0 ? void 0 : (_props$value5$event_r = _props$value5.event_reviews) === null || _props$value5$event_r === void 0 ? void 0 : _props$value5$event_r.average_rating) || 0
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "all-reviews-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, stateReviews.map(function (res, index) {
    var _res$receiver;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: res.sender.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__["FileManagerPath"] + res.sender.user_profile.profile_picture : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == res.user_id ? 'Me' : res.sender.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Reviews_Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_5__["default"], {
      value: parseFloat(res.rating)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(res.created_at).local().format('D MMM YYYY h:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, res.comment_to_host)), res.receiver ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-child-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
      className: "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: res.receiver.user_profile ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__["FileManagerPath"] + res.receiver.user_profile.profile_picture : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == res.host_id ? 'Me' : (_res$receiver = res.receiver) === null || _res$receiver === void 0 ? void 0 : _res$receiver.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(res.updated_at).local().format('D MMM YYYY h:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, res.comment_to_user))))) : '')));
  })), (paginationReviews === null || paginationReviews === void 0 ? void 0 : paginationReviews.next_page_url) != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "load-more-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn white-shadow-btn",
    type: "button",
    onClick: function onClick() {
      return loadMore();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-loading-icon"
  }), " Load More")) : ''))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProfileReview);

/***/ }),

/***/ "./resources/js/User/Profiles/Components/ProfileScheduler.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/ProfileScheduler.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileScheduler; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fullcalendar_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/react */ "./node_modules/@fullcalendar/react/dist/main.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/main.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fullcalendar/interaction */ "./node_modules/@fullcalendar/interaction/main.js");
/* harmony import */ var _EventSlotList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EventSlotList */ "./resources/js/User/Profiles/Components/EventSlotList.jsx");
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function ProfileScheduler(props) {
  var _state$showEventsProf;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var eventFilterByDate = function eventFilterByDate(event) {
    dispatch({
      type: "StartDate",
      payload: {
        Type: "StartDate",
        StartDate: moment__WEBPACK_IMPORTED_MODULE_1___default()(event.dateStr, 'YYYY-MM-DD').format('YYYY-MM-DD')
      }
    });
  };

  var eventsList = [];
  (_state$showEventsProf = state.showEventsProfileCalenders) === null || _state$showEventsProf === void 0 ? void 0 : _state$showEventsProf.map(function (res) {
    eventsList.push({
      display: "background",
      start: res.start_date
    });
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.active
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
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fullcalendar_react__WEBPACK_IMPORTED_MODULE_2__["default"], {
    initialView: "dayGridMonth" // initialView='dayGridMonth'
    ,
    events: eventsList,
    plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_3__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_4__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_5__["default"]],
    allDaySlot: false // views={{
    //     dayGridMonth: {
    //         titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
    //     }
    // }}
    ,
    dateClick: eventFilterByDate // dayHeaderContent={(args) => moment(args.date).format('ddd Do')}
    ,
    customButtons: {
      myCustomButton: {
        text: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "legend-dd",
          style: {
            margin: '-12px'
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
        }, "Legend ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
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
    datesSet: props.RightCalendarWeekDates,
    headerToolbar: {
      start: 'title',
      // will normally be on the left. if RTL, will be on the right
      center: 'myCustomButton',
      end: 'today prev,next' // will normally be on the right. if RTL, will be on the left

    },
    nowIndicator: true,
    selectable: true,
    now: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('YYYY-MM-DD')
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventSlotList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    paymentHandle: props.paymentHandle
  }))));
}

/***/ }),

/***/ "./resources/js/User/Profiles/Components/ProfileSection.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/User/Profiles/Components/ProfileSection.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ "./node_modules/moment-timezone/index.js");
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/screens/CreateEvent/Errors/ValidationError/FormError */ "./resources/js/components/screens/CreateEvent/Errors/ValidationError/FormError.jsx");
/* harmony import */ var _components_screens_Events_Payments_Modals_StripePaymentModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/screens/Events/Payments/Modals/StripePaymentModal */ "./resources/js/components/screens/Events/Payments/Modals/StripePaymentModal.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _utility_Reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../utility/Reducer */ "./resources/js/utility/Reducer.js");
/* harmony import */ var _ProfileModals_ReportProfilePopup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../ProfileModals/ReportProfilePopup */ "./resources/js/User/Profiles/ProfileModals/ReportProfilePopup.jsx");
/* harmony import */ var _UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../UserProfileContext/UserProfileContext */ "./resources/js/User/Profiles/UserProfileContext/UserProfileContext.js");
/* harmony import */ var _MyAccount__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MyAccount */ "./resources/js/User/Profiles/Components/MyAccount.jsx");
/* harmony import */ var _MyEvent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MyEvent */ "./resources/js/User/Profiles/Components/MyEvent.jsx");
/* harmony import */ var _MyProfile__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MyProfile */ "./resources/js/User/Profiles/Components/MyProfile.jsx");
/* harmony import */ var _ProfileReview__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ProfileReview */ "./resources/js/User/Profiles/Components/ProfileReview.jsx");
/* harmony import */ var _ProfileScheduler__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ProfileScheduler */ "./resources/js/User/Profiles/Components/ProfileScheduler.jsx");
/* harmony import */ var _components_EventDeleteModal_DeleteEventModal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../components/EventDeleteModal/DeleteEventModal */ "./resources/js/components/EventDeleteModal/DeleteEventModal.jsx");
/* harmony import */ var _components_screens_CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents */ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }























var initialState = {
  Languages: [],
  ProfileNav: {
    profileNav: true,
    eventNav: false,
    scheduleNav: false,
    accountNav: false,
    reviewsNav: false
  },
  ConflictsEvents: [],
  ProfileDetails: "",
  ProfileEvents: [],
  SlotDetails: [],
  showEventsProfileCalenders: [],
  StartDate: "",
  BookedSlot: '',
  ProfileUpcomingSlots: "",
  SlotPreloader: true,
  Preloader: true,
  Countries: [],
  UserOnline: false,
  ReportUserProfile: {
    currentId: "",
    userId: "",
    eventId: "",
    report: "",
    comment: ""
  },
  ProfilePictureValue: [],
  UpdateProfile: {
    currentUserId: "",
    aboutMe: "",
    edit: false,
    profilePicture: "",
    language: [],
    profession: [],
    country: "",
    email: "",
    phone: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    password_confirmation: "",
    updated: false
  }
};

var ProfileSection = function ProfileSection() {
  var _state$ProfileDetails6, _state$ProfileDetails7, _state$ProfileDetails8, _state$ProfileDetails9, _state$ProfileDetails10, _state$ProfileDetails11, _state$ProfileDetails12, _state$ProfileDetails13, _state$ProfileDetails14, _state$BookedSlot, _state$BookedSlot2, _state$BookedSlot3, _state$ProfileDetails15;

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(_utility_Reducer__WEBPACK_IMPORTED_MODULE_11__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useParams = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["useParams"])("ProfileId"),
      ProfileId = _useParams.ProfileId;

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_8__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_9__["default"]),
      _useContext2 = _slicedToArray(_useContext, 4),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1],
      handleReportUserEvent = _useContext2[2],
      onChangeReport = _useContext2[3];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    userNotFound: false,
    formSubmit: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      Error = _useState2[0],
      setError = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _state$ProfileDetails, _state$ProfileDetails2, _state$ProfileDetails3;

    dispatch({
      type: "UpdateProfile",
      payload: _objectSpread(_objectSpread({
        Type: "UpdateProfile"
      }, state.UpdateProfile), {}, {
        aboutMe: (_state$ProfileDetails = state.ProfileDetails) === null || _state$ProfileDetails === void 0 ? void 0 : (_state$ProfileDetails2 = _state$ProfileDetails.user_profile) === null || _state$ProfileDetails2 === void 0 ? void 0 : _state$ProfileDetails2.about_me
      })
    });

    if ((_state$ProfileDetails3 = state.ProfileDetails) !== null && _state$ProfileDetails3 !== void 0 && _state$ProfileDetails3.last_activity) {
      var _state$ProfileDetails4;

      var diff = moment__WEBPACK_IMPORTED_MODULE_3___default()(moment__WEBPACK_IMPORTED_MODULE_3___default()()).diff(moment__WEBPACK_IMPORTED_MODULE_3___default.a.utc((_state$ProfileDetails4 = state.ProfileDetails) === null || _state$ProfileDetails4 === void 0 ? void 0 : _state$ProfileDetails4.last_activity).local().format("YYYY-MM-DD HH:mm:ss"), 'minutes');

      if (diff <= 2) {
        dispatch({
          type: "onlineCheck",
          payload: {
            Type: "onlineCheck",
            UserOnline: true
          }
        });
      }
    }

    return;
  }, [state.ProfileDetails]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    getUpcomingSlotDetails();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    getProfileDetail();
    getProfileDetailSlots();
    dispatch({
      type: "UpdateProfile",
      payload: {
        Type: "UpdateProfile",
        UpdateProfile: {
          currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id
        }
      }
    });
    return function () {};
  }, [state.ProfileNav, ProfileId, state.StartDate]); // get user Profile Data 

  var getProfileDetail = function getProfileDetail() {
    dispatch({
      type: "setProfileDetails",
      payload: {
        Type: "setProfileDetails",
        SlotPreloader: true
      }
    });
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/profile/username", {
      username: ProfileId,
      tz: moment__WEBPACK_IMPORTED_MODULE_3___default.a.tz.guess()
    }, {
      headers: {
        Accept: "application/json",
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_10__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        var _res$data$userProfile;

        dispatch({
          type: "setProfileDetails",
          payload: {
            Type: "setProfileDetails",
            ProfileDetails: res.data.userProfile,
            ProfileEvents: (_res$data$userProfile = res.data.userProfile) === null || _res$data$userProfile === void 0 ? void 0 : _res$data$userProfile.events,
            SlotPreloader: false,
            Preloader: false
          }
        });
      }

      if (res.data.status == "failed") {
        setError(_objectSpread(_objectSpread({}, Error), {}, {
          userNotFound: true
        }));
      }

      dispatch({
        type: "setProfileDetails",
        payload: {
          Type: "setProfileDetails",
          SlotPreloader: false
        }
      });
    })["catch"](function (error) {
      dispatch({
        type: "setProfileDetails",
        payload: {
          Type: "setProfileDetails",
          SlotPreloader: false
        }
      });
      console.log(error);
    });
  };

  var getProfileDetailSlots = function getProfileDetailSlots() {
    var data = {
      profileId: ProfileId,
      startDate: state.StartDate
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"]._myProfileSlotsDetails(data).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: "slotDetails",
          payload: {
            Type: "slotDetails",
            SlotDetails: res.data.slotDetails
          }
        });
      }
    })["catch"](function (error) {
      console.log(error, "error");
    });
  }; // edit user profile 


  var handleEditProfile = function handleEditProfile(e) {
    e.preventDefault();
    var data = state.UpdateProfile;
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/api/profile/update/".concat(currentUser === null || currentUser === void 0 ? void 0 : currentUser.id), data, {
      headers: {
        Accept: "application/json",
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_10__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: "UpdateProfile",
          payload: {
            Type: "UpdateProfile",
            UpdateProfile: {
              currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
              edit: false,
              updated: true
            }
          }
        }); // if(state.UpdateProfile.aboutMe==''){
        //     localStorage.setItem('userData',JSON.stringify(res.data.data));
        // }

        toastr["success"](res.data.message);
      }

      if (res.data.status == "failed" && res.data.success == false) {
        var ErrorPassword = res.data.validation_error.password;
        var ErrorEmail = res.data.validation_error.email;

        if (ErrorPassword) {
          _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_6__["default"].responseValidationError(ErrorPassword);
        }

        if (ErrorEmail) {
          _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_6__["default"].responseValidationError(ErrorEmail);
        }
      } // if(res.data.status=="failed"){
      //     toastr["error"](res.data.message);
      // }

    })["catch"](function (error) {// toastr["error"](error.response.message);
    });
  }; // handle Payment of all events


  var paymentSlotHandle = function paymentSlotHandle(Payment, Data) {
    // setBookedSlot({ ...BookedSlot, payment: true });
    getUpcomingSlotDetails();
    $("#stripe_payment_modal").modal("hide");
  };

  var paymentSlotHandleOnChange = function paymentSlotHandleOnChange(eventId, slotId, amount) {
    dispatch({
      type: "bookedSlot",
      payload: {
        Type: "bookedSlot",
        BookedSlot: _objectSpread(_objectSpread({}, state.BookedSlot), {}, {
          eventId: parseInt(eventId),
          slotId: parseInt(slotId),
          amount: parseInt(amount),
          payment: true
        })
      }
    });
    BookingTimeConflictsCheck(eventId, slotId);
  };

  var BookingTimeConflictsCheck = function BookingTimeConflictsCheck(eventId, slotId) {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"].BookingTimeConflictsChecks({
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
  }; // show event on calender with pagination


  var RightCalendarWeekDates = function RightCalendarWeekDates(arg) {
    console.log(arg); // dispatch({ type: "SlotsPreloader", payload: { Type: "SlotsPreloader", SlotPreloader: true } });

    var data = {
      profileId: ProfileId,
      activeStart: moment__WEBPACK_IMPORTED_MODULE_3___default()(arg.view.activeStart).format("YYYY-MM-DD"),
      activeEnd: moment__WEBPACK_IMPORTED_MODULE_3___default()(arg.view.activeEnd).format("YYYY-MM-DD")
    };
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"].showEventsProfileCalenders(data).then(function (res) {
      if (res.data.status == "failed" && res.data.success == false) {
        toastr["error"](res.data.message);
      }

      if (res.data.data) {
        if (res.data.status == 200) {
          dispatch({
            type: "",
            payload: {
              Type: "",
              showEventsProfileCalenders: res.data.data,
              SlotPreloader: false
            }
          });
        }
      }

      dispatch({
        type: "SlotsPreloader",
        payload: {
          Type: "SlotsPreloader",
          SlotPreloader: false
        }
      });
    })["catch"](function (error) {
      dispatch({
        type: "",
        payload: {
          Type: "",
          SlotPreloader: false
        }
      });
    });
  };

  var favoriteUser = function favoriteUser() {
    var _state$ProfileDetails5;

    var data = {
      userId: (_state$ProfileDetails5 = state.ProfileDetails) === null || _state$ProfileDetails5 === void 0 ? void 0 : _state$ProfileDetails5.id
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"]._favorite(data).then(function (res) {
      if (res.data.status == 200) {
        toastr["success"](res.data.message);
        getProfileDetail();
      }

      if (res.data.status == "failed") {
        toastr["error"](res.data.message);
      }
    })["catch"](function (error) {
      toastr["error"](error.message);
    });
  };

  var getUpcomingSlotDetails = function getUpcomingSlotDetails() {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"]._profileUpcomingEventsSlot({
      profileId: ProfileId
    }).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: "profileUpcomingSlots",
          payload: {
            Type: "profileUpcomingSlots",
            ProfileUpcomingSlots: res.data.data
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  var ProfilePictureUpload = function ProfilePictureUpload(e) {
    $('#CropperModalPop').modal('show');
    dispatch({
      type: "ProfilePictureValue",
      payload: {
        Type: "ProfilePictureValue",
        ProfilePictureValue: e.target.files
      }
    });
  };

  var onCropImage = function onCropImage(obj) {
    var form_data = new FormData(); // for (let file of e.target.files) {

    form_data.append('file', obj, obj.name); // }

    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/profile', form_data, {
      headers: {
        'Accept': 'application/json',
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_10__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        $('#CropperModalPop').modal('hide');
        toastr["success"](res.data.message);
        getProfileDetail();
        localStorage.setItem('userData', JSON.stringify(res.data.data));
      }

      if (res.data.status == "failed") {
        toastr["error"](res.data.message);
      }
    })["catch"](function (error) {
      return console.log(error);
    });
    setProfilePicture({});
  };

  console.log(state);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_UserProfileContext_UserProfileContext__WEBPACK_IMPORTED_MODULE_13__["default"].Provider, {
    value: [state, dispatch, ProfilePictureUpload, onCropImage]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
    className: "mid-content-sec in-page-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "my-profile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "e-d-heding"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, (_state$ProfileDetails6 = state.ProfileDetails) === null || _state$ProfileDetails6 === void 0 ? void 0 : _state$ProfileDetails6.name, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ed-top-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, ((_state$ProfileDetails7 = state.ProfileDetails) === null || _state$ProfileDetails7 === void 0 ? void 0 : _state$ProfileDetails7.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? "" : ((_state$ProfileDetails8 = state.ProfileDetails) === null || _state$ProfileDetails8 === void 0 ? void 0 : _state$ProfileDetails8.id) != (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    "data-toggle": "modal",
    href: "#report-event-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-report-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "favorite-number"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    onClick: favoriteUser
  }, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == ((_state$ProfileDetails9 = state.ProfileDetails) === null || _state$ProfileDetails9 === void 0 ? void 0 : (_state$ProfileDetails10 = _state$ProfileDetails9.my_favorite_users) === null || _state$ProfileDetails10 === void 0 ? void 0 : _state$ProfileDetails10.user_id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-favorite-solid-icon active"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-favorite-line-icon"
  })), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, (_state$ProfileDetails11 = state.ProfileDetails) !== null && _state$ProfileDetails11 !== void 0 && _state$ProfileDetails11.favorite_user_count ? (_state$ProfileDetails12 = state.ProfileDetails) === null || _state$ProfileDetails12 === void 0 ? void 0 : _state$ProfileDetails12.favorite_user_count.length : 0)))) : "", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    "data-toggle": "modal",
    href: "#share-profile-popup",
    onClick: function onClick() {
      return globalDispatch({
        type: "share",
        payload: {
          Type: "share",
          Share: "".concat(window.location.href)
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-share-icon"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "e-d-tabs-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "av-default-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "ah-tab-item",
    onClick: function onClick() {
      return dispatch({
        type: "setProfileNav",
        payload: {
          Type: "setProfileNav",
          ProfileNav: {
            profileNav: true,
            eventNav: false,
            accountNav: false,
            reviewsNav: false,
            scheduleNav: false
          }
        }
      });
    },
    "data-ah-tab-active": state.ProfileNav.profileNav,
    href: "#"
  }, "Profile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "ah-tab-item",
    onClick: function onClick() {
      return dispatch({
        type: "setProfileNav",
        payload: {
          Type: "setProfileNav",
          ProfileNav: {
            profileNav: false,
            eventNav: true,
            accountNav: false,
            reviewsNav: false,
            scheduleNav: false
          }
        }
      });
    },
    "data-ah-tab-active": state.ProfileNav.eventNav,
    href: "#"
  }, "Events"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "ah-tab-item",
    onClick: function onClick() {
      return dispatch({
        type: "setProfileNav",
        payload: {
          Type: "setProfileNav",
          ProfileNav: {
            profileNav: false,
            eventNav: false,
            accountNav: false,
            reviewsNav: false,
            scheduleNav: true
          }
        }
      });
    },
    "data-ah-tab-active": state.ProfileNav.scheduleNav,
    href: "#"
  }, "Schedule"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "ah-tab-item",
    onClick: function onClick() {
      return dispatch({
        type: "setProfileNav",
        payload: {
          Type: "setProfileNav",
          ProfileNav: {
            profileNav: false,
            eventNav: false,
            accountNav: false,
            reviewsNav: true,
            scheduleNav: false
          }
        }
      });
    },
    "data-ah-tab-active": state.ProfileNav.reviewsNav,
    href: "#"
  }, "Reviews"), (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == ((_state$ProfileDetails13 = state.ProfileDetails) === null || _state$ProfileDetails13 === void 0 ? void 0 : _state$ProfileDetails13.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    className: "ah-tab-item",
    onClick: function onClick() {
      return dispatch({
        type: "setProfileNav",
        payload: {
          Type: "setProfileNav",
          ProfileNav: {
            profileNav: false,
            eventNav: false,
            accountNav: true,
            scheduleNav: false,
            reviewsNav: false
          }
        }
      });
    },
    "data-ah-tab-active": state.ProfileNav.accountNav,
    href: "#"
  }, "Account") : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MyProfile__WEBPACK_IMPORTED_MODULE_16__["default"], {
    active: state.ProfileNav.profileNav,
    handleEditProfile: handleEditProfile,
    paymentHandle: paymentSlotHandleOnChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MyEvent__WEBPACK_IMPORTED_MODULE_15__["default"], {
    active: state.ProfileNav.eventNav
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProfileScheduler__WEBPACK_IMPORTED_MODULE_18__["default"], {
    active: state.ProfileNav.scheduleNav,
    paymentHandle: paymentSlotHandleOnChange,
    RightCalendarWeekDates: RightCalendarWeekDates
  }), (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == ((_state$ProfileDetails14 = state.ProfileDetails) === null || _state$ProfileDetails14 === void 0 ? void 0 : _state$ProfileDetails14.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MyAccount__WEBPACK_IMPORTED_MODULE_14__["default"], {
    active: state.ProfileNav.accountNav,
    handleEditProfile: handleEditProfile
  }) : "", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProfileReview__WEBPACK_IMPORTED_MODULE_17__["default"], {
    value: state.ProfileDetails,
    active: state.ProfileNav.reviewsNav
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_Events_Payments_Modals_StripePaymentModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onChange: paymentSlotHandle,
    currentUser: currentUser,
    amount: (_state$BookedSlot = state.BookedSlot) === null || _state$BookedSlot === void 0 ? void 0 : _state$BookedSlot.amount,
    slotId: (_state$BookedSlot2 = state.BookedSlot) === null || _state$BookedSlot2 === void 0 ? void 0 : _state$BookedSlot2.slotId,
    eventId: (_state$BookedSlot3 = state.BookedSlot) === null || _state$BookedSlot3 === void 0 ? void 0 : _state$BookedSlot3.eventId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ProfileModals_ReportProfilePopup__WEBPACK_IMPORTED_MODULE_12__["default"], {
    onChange: onChangeReport,
    comment: globalState === null || globalState === void 0 ? void 0 : globalState.report.comment,
    value: globalState === null || globalState === void 0 ? void 0 : globalState.report.report,
    handleSubmit: handleReportUserEvent,
    reportId: (_state$ProfileDetails15 = state.ProfileDetails) === null || _state$ProfileDetails15 === void 0 ? void 0 : _state$ProfileDetails15.id,
    type: "userId"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_EventDeleteModal_DeleteEventModal__WEBPACK_IMPORTED_MODULE_19__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_CreateEvent_Components_Modal_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_20__["default"], {
    id: "booking-conflicts-events",
    events: state.ConflictsEvents
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (ProfileSection);

/***/ }),

/***/ "./resources/js/User/Profiles/Profile.jsx":
/*!************************************************!*\
  !*** ./resources/js/User/Profiles/Profile.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Filter/FilterPopup */ "./resources/js/components/Filter/FilterPopup.jsx");
/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Footer/Footer */ "./resources/js/components/Footer/Footer.jsx");
/* harmony import */ var _components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Navbar/Navbar */ "./resources/js/components/Navbar/Navbar.jsx");
/* harmony import */ var _components_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Sidebar/Sidebar */ "./resources/js/components/Sidebar/Sidebar.jsx");
/* harmony import */ var _Components_ProfileSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/ProfileSection */ "./resources/js/User/Profiles/Components/ProfileSection.jsx");







var Profile = function Profile() {
  document.title = "Profile";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ProfileSection__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_2__["InnerFooter"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (Profile);

/***/ }),

/***/ "./resources/js/User/Profiles/ProfileModals/EmailChangePopup.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/User/Profiles/ProfileModals/EmailChangePopup.jsx ***!
  \***********************************************************************/
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var EmailChangePopup = function EmailChangePopup(props) {
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      Email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    submit: false,
    response: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      submit = _useState4[0],
      setSubmit = _useState4[1];

  var onChange = function onChange(e) {
    console.log(e.target.value, e.target.name, Email);
  };

  var handleChange = function handleChange(e) {
    e.preventDefault();
    setSubmit(true);
    var data = {
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
      email: Email
    };
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/profile/resetEmail', data, {
      headers: {
        'Accept': 'application/json',
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_4__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        $('#change-email-address-popup').modal('hide');
        setEmail('');
        setSubmit(_objectSpread(_objectSpread({}, submit), {}, {
          submit: false,
          response: true
        }));
        toastr["success"](res.data.message);
      }

      if (res.data.status == "failed") {
        setSubmit(_objectSpread(_objectSpread({}, submit), {}, {
          submit: false,
          response: false
        }));

        if (res.data.validation_error) {
          var _res$data$validation_;

          var EmailError = (_res$data$validation_ = res.data.validation_error) === null || _res$data$validation_ === void 0 ? void 0 : _res$data$validation_.email;

          if (EmailError) {
            _components_screens_CreateEvent_Errors_ValidationError_FormError__WEBPACK_IMPORTED_MODULE_2__["default"].responseValidationError(EmailError);
          }
        }
      }

      console.log(res);
    })["catch"](function (error) {
      toastr["error"](error.message);
      console.log(error);
      setSubmit(_objectSpread(_objectSpread({}, submit), {}, {
        submit: false,
        response: false
      }));
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal fade default-popup create-folder-popup",
    id: "change-email-address-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleChange
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
  }, "Change Email Address")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    className: "form-label"
  }, "New Email Address:"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "email",
    className: "form-control",
    name: "email",
    onChange: function onChange(e) {
      return setEmail(e.target.value);
    },
    placeholder: "Enter new  email address",
    value: Email
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-ck-forgot-p-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "forgot-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: submit === null || submit === void 0 ? void 0 : submit.submit
  }, "Send")))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (EmailChangePopup);

/***/ }),

/***/ "./resources/js/User/Profiles/ProfileModals/ProfileDeactivatePopup.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/User/Profiles/ProfileModals/ProfileDeactivatePopup.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var ProfileDeactivatePopup = function ProfileDeactivatePopup() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup deactivate-account-popup",
    id: "deactivate-account-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "modal-title"
  }, "You want to deactivate")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "regin-deactivate-account"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-label"
  }, "You can always activate your account later"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), "Lorem Ipsum is simply"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox"
  }), "Lorem Ipsum is simply"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox"
  }), "Lorem Ipsum is simply"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox"
  }), "Lorem Ipsum is simply")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "forgot-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn deactivate-btn",
    "data-dismiss": "modal"
  }, "Yes Deactivate"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ProfileDeactivatePopup);

/***/ }),

/***/ "./resources/js/components/EventDeleteModal/DeleteEventModal.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/components/EventDeleteModal/DeleteEventModal.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var DeletedEventModal = function DeletedEventModal(_ref) {
  var onChange = _ref.onChange,
      handleSubmit = _ref.handleSubmit,
      ErrorResponse = _ref.ErrorResponse,
      value = _ref.value;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup confirm-message-popup",
    id: "DeletedEventModal",
    tabIndex: "-1",
    role: "dialog",
    ariaLabelledBy: "exampleModalLabel",
    ariaHidden: "true"
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
    name: "deleteFor",
    id: "inlineRadio1",
    value: "option1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio1"
  }, "Delete all Following Slots"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "deleteFor",
    id: "inlineRadio2",
    value: "DeletePreviewsSlots"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio2"
  }, "Delete all Previews Slots"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "form-check form-check-inline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-check-input",
    type: "radio",
    name: "deleteFor",
    id: "inlineRadio3",
    value: "option3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "form-check-label",
    htmlFor: "inlineRadio3"
  }, "Delete this event")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "no-yes-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn blue-bdr-btn",
    "data-dismiss": "modal"
  }, "No")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn default-btn",
    disabled: value ? false : true
  }, "Yes"))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (DeletedEventModal);

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

/***/ })

}]);