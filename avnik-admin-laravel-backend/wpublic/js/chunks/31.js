(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./resources/js/User/EventList/Components/ListView.jsx":
/*!*************************************************************!*\
  !*** ./resources/js/User/EventList/Components/ListView.jsx ***!
  \*************************************************************/
/*! exports provided: Accordion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accordion", function() { return Accordion; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/screens/CreateEvent/Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");










var Accordion = function Accordion(_ref) {
  var _response$events, _response$events2, _response$events3, _response$events4, _response$events5, _response$extended, _response$events6, _response$events7, _response$events8, _response$events9, _response$events9$eve, _response$events10, _response$events10$ev, _response$events11, _response$events11$ev, _response$events12, _response$events12$ev, _response$events13, _response$events13$ev, _response$events14, _response$events14$ev, _response$extended2;

  var response = _ref.response,
      handleViewBooking = _ref.handleViewBooking,
      cancelBooking = _ref.cancelBooking;
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_6__["default"]);
  var onlyImage = '';
  var EventDates = '';
  var eventImage = JSON.parse(response === null || response === void 0 ? void 0 : (_response$events = response.events) === null || _response$events === void 0 ? void 0 : _response$events.event_files);
  onlyImage = eventImage[0].file_url;

  if (response) {
    var dates = [];
    dates.push(moment__WEBPACK_IMPORTED_MODULE_0___default()(moment__WEBPACK_IMPORTED_MODULE_0___default()("".concat(moment__WEBPACK_IMPORTED_MODULE_0___default()(response.start_date, 'DD-MM-YYYY').format('DD-MM-YYYY'), " ").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()(response.start_time, 'hh:mm:ss').format('hh:mm:ss')), 'DD-MM-YYYY HH:mm:ss')));
    EventDates = _components_screens_CreateEvent_Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_5__["default"].checkUpcomingDate(dates);
  }

  var status = {
    1: {
      title: 'Ongoing',
      className: 'awaiting-status'
    },
    2: {
      title: 'Upcoming',
      className: 'withdrawn-status'
    },
    3: {
      title: 'Cancelled',
      className: 'refunded-status'
    },
    4: {
      title: 'Completed',
      className: 'completed-status'
    },
    5: {
      title: 'N/A',
      className: 'completed-status'
    }
  };

  var checkStatusRender = function checkStatusRender(endDateTime, startDateTime, resStatus) {
    // if(resStatus==="enabled"&&moment(endDateTime, 'YYYY-MM-DD HH:mm:ss')>moment()&&moment()<moment(startDateTime,'YYYY-MM-DD HH:mm:ss')){      
    //     return<> 
    //     <span className={`btn status-btn ${status[1].className}`}>
    //     {status[1].title}
    //     </span>
    //     </> 
    // }else 
    if (resStatus === "enabled" && moment__WEBPACK_IMPORTED_MODULE_0___default()() < moment__WEBPACK_IMPORTED_MODULE_0___default()(startDateTime, 'YYYY-MM-DD HH:mm:ss')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "btn status-btn ".concat(status[2].className)
      }, status[2].title));
    } else if (resStatus === "cancelled") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "btn status-btn ".concat(status[3].className)
      }, status[3].title));
    } else if (resStatus === "enabled" && moment__WEBPACK_IMPORTED_MODULE_0___default()() > moment__WEBPACK_IMPORTED_MODULE_0___default()(startDateTime, 'YYYY-MM-DD HH:mm:ss') && moment__WEBPACK_IMPORTED_MODULE_0___default()() > moment__WEBPACK_IMPORTED_MODULE_0___default()(endDateTime, 'YYYY-MM-DD HH:mm:ss')) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "btn status-btn ".concat(status[4].className)
      }, status[4].title));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "btn status-btn ".concat(status[5].className)
      }, status[5].title));
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-details-editable",
    "data-title": "Event Name"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/event?token=".concat(response === null || response === void 0 ? void 0 : (_response$events2 = response.events) === null || _response$events2 === void 0 ? void 0 : _response$events2.remember_token, "&event=").concat(response === null || response === void 0 ? void 0 : (_response$events3 = response.events) === null || _response$events3 === void 0 ? void 0 : _response$events3.id, "&slot=").concat(response === null || response === void 0 ? void 0 : response.event_slot_id)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + onlyImage,
    alt: response === null || response === void 0 ? void 0 : (_response$events4 = response.events) === null || _response$events4 === void 0 ? void 0 : _response$events4.event_type
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, response === null || response === void 0 ? void 0 : (_response$events5 = response.events) === null || _response$events5 === void 0 ? void 0 : _response$events5.event_title)))), (response === null || response === void 0 ? void 0 : (_response$extended = response.extended) === null || _response$extended === void 0 ? void 0 : _response$extended.length) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-more-editable",
    "data-title": "Extend"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "event-more-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#0",
    value: "Show/Hide",
    onClick: function onClick() {
      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__["showHideDiv"])("event-more".concat(response === null || response === void 0 ? void 0 : response.event_slot_id));
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-extended-duration-more-icon"
  })))) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-type-editable",
    "data-title": "Event Type"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, response === null || response === void 0 ? void 0 : (_response$events6 = response.events) === null || _response$events6 === void 0 ? void 0 : _response$events6.event_type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-date-time-editable",
    "data-title": "Event Date"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-short-text"
  }, "".concat(moment__WEBPACK_IMPORTED_MODULE_0___default()(response.start_date_time, 'YYYY-MM-DD HH:mm:ss').format('D MMM YYYY h:m A')), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-amount-editable",
    "data-title": "Amount"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, (response === null || response === void 0 ? void 0 : (_response$events7 = response.events) === null || _response$events7 === void 0 ? void 0 : _response$events7.cost) > 0 ? '$ ' + (response === null || response === void 0 ? void 0 : (_response$events8 = response.events) === null || _response$events8 === void 0 ? void 0 : _response$events8.cost) : 'Free')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-duration-editable",
    "data-title": "Duration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__["convertMinutes"])(response === null || response === void 0 ? void 0 : response.duration))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-hosted-by-editable",
    "data-title": "Hosted By"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/profile/".concat(response === null || response === void 0 ? void 0 : (_response$events9 = response.events) === null || _response$events9 === void 0 ? void 0 : (_response$events9$eve = _response$events9.event_create_user) === null || _response$events9$eve === void 0 ? void 0 : _response$events9$eve.username)
  }, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (response === null || response === void 0 ? void 0 : (_response$events10 = response.events) === null || _response$events10 === void 0 ? void 0 : (_response$events10$ev = _response$events10.event_create_user) === null || _response$events10$ev === void 0 ? void 0 : _response$events10$ev.id) ? 'Me' : response === null || response === void 0 ? void 0 : (_response$events11 = response.events) === null || _response$events11 === void 0 ? void 0 : (_response$events11$ev = _response$events11.event_create_user) === null || _response$events11$ev === void 0 ? void 0 : _response$events11$ev.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-status-editable",
    "data-title": "Status"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "complite-cancel-status"
  }, checkStatusRender(response === null || response === void 0 ? void 0 : response.end_date_time, response === null || response === void 0 ? void 0 : response.start_date_time, response === null || response === void 0 ? void 0 : response.status))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-message-editable",
    "data-title": "Message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-delete-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "r-m-t-bx my-account-menu table-dd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn dropdown-toggle dots-btn",
    "data-toggle": "dropdown",
    "data-display": "static",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-dots-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "dropdown-menu dropdown-menu-lg-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (response === null || response === void 0 ? void 0 : (_response$events12 = response.events) === null || _response$events12 === void 0 ? void 0 : (_response$events12$ev = _response$events12.event_create_user) === null || _response$events12$ev === void 0 ? void 0 : _response$events12$ev.id) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item",
    onClick: function onClick() {
      return handleViewBooking(response === null || response === void 0 ? void 0 : response.event_slot_id);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_2__["Eye"], {
    size: 14
  }), " \xA0 View Booking")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/join/?rm=".concat(response === null || response === void 0 ? void 0 : response.meeting_room_id),
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "meet-icon-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/online-meeting-icon.svg"),
    alt: ""
  })), " Meet")), (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (response === null || response === void 0 ? void 0 : (_response$events13 = response.events) === null || _response$events13 === void 0 ? void 0 : (_response$events13$ev = _response$events13.event_create_user) === null || _response$events13$ev === void 0 ? void 0 : _response$events13$ev.id) ? '' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return cancelBooking(response === null || response === void 0 ? void 0 : response.event_slot_id);
    },
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "fa fa-times text-danger"
  }), " Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-share-icon"
  }), " Share")), (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) == (response === null || response === void 0 ? void 0 : (_response$events14 = response.events) === null || _response$events14 === void 0 ? void 0 : (_response$events14$ev = _response$events14.event_create_user) === null || _response$events14$ev === void 0 ? void 0 : _response$events14$ev.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item",
    "data-toggle": "modal",
    "data-target": "#alert-delete-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-delete-icon"
  }), " Delete"))) : ''))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "event-more".concat(response === null || response === void 0 ? void 0 : response.event_slot_id),
    className: "events-users-show-bx",
    style: {
      display: 'none'
    }
  }, (response === null || response === void 0 ? void 0 : (_response$extended2 = response.extended) === null || _response$extended2 === void 0 ? void 0 : _response$extended2.length) > 0 ? response === null || response === void 0 ? void 0 : response.extended.map(function (extend) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: extend.id,
      className: "c-table-row ck-group-message"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell event-details-editable",
      "data-title": "Event Name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Extended Time")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell event-date-time-editable",
      "data-title": "Event Date"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell event-date-time-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "message-short-text"
    }, "$", extend === null || extend === void 0 ? void 0 : extend.cost, " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell event-duration-editable",
      "data-title": "Duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "c-table-text"
    }, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__["timeConverter"])(extend === null || extend === void 0 ? void 0 : extend.duration, true))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "cell event-status-editable",
      "data-title": "Status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "complite-cancel-status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "btn status-btn awaiting-status"
    }, "Awaiting"))));
  }) : ''));
};

/***/ }),

/***/ "./resources/js/User/EventList/Contexts/EventDetailsListContext.js":
/*!*************************************************************************!*\
  !*** ./resources/js/User/EventList/Contexts/EventDetailsListContext.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var EventDetailsListContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
/* harmony default export */ __webpack_exports__["default"] = (EventDetailsListContext);

/***/ }),

/***/ "./resources/js/User/EventList/EventList.jsx":
/*!***************************************************!*\
  !*** ./resources/js/User/EventList/EventList.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Comman/OnScrollLoader */ "./resources/js/components/Comman/OnScrollLoader.jsx");
/* harmony import */ var _components_screens_CreateEvent_Components_Join_JoinRequestContext_JoinRequestContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext */ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx");
/* harmony import */ var _components_screens_CreateEvent_Components_Join_JoinRequestPopup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/screens/CreateEvent/Components/Join/JoinRequestPopup */ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestPopup.jsx");
/* harmony import */ var _components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Components_ListView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/ListView */ "./resources/js/User/EventList/Components/ListView.jsx");
/* harmony import */ var _Contexts_EventDetailsListContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Contexts/EventDetailsListContext */ "./resources/js/User/EventList/Contexts/EventDetailsListContext.js");
/* harmony import */ var _Reducers_EventDetailsListReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Reducers/EventDetailsListReducer */ "./resources/js/User/EventList/Reducers/EventDetailsListReducer.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_screens_CreateEvent_Components_Modal_InviteUser_InviteUser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/screens/CreateEvent/Components/Modal/InviteUser/InviteUser */ "./resources/js/components/screens/CreateEvent/Components/Modal/InviteUser/InviteUser.jsx");
/* harmony import */ var _components_screens_CreateEvent_Components_Modal_QuickReply_QuickReply__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/screens/CreateEvent/Components/Modal/QuickReply/QuickReply */ "./resources/js/components/screens/CreateEvent/Components/Modal/QuickReply/QuickReply.jsx");
var _this = undefined;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var initialState = {
  EventDetails: [],
  SearchQuery: '',
  FilterBy: 'All',
  CurrentPage: 1,
  LastPage: 0,
  NextPage: 0,
  NextPageUrl: '',
  joinRequestContext: '',
  PreviewsPageUrl: '',
  PreviewsPage: '',
  Preloader: true,
  OnScroll: false
};

var EventList = function EventList(_ref) {
  var Active = _ref.Active;

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(_Reducers_EventDetailsListReducer__WEBPACK_IMPORTED_MODULE_11__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var self = _this;
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var data = {
      filterBy: state.FilterBy,
      searchQuery: state.SearchQuery
    };
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/api/booking', data, {
      headers: {
        'Accept': 'application/json',
        authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_8__["default"].getAccessToken())
      }
    }).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'EVENT_DETAILS',
          payload: res.data.data.data
        });
        dispatch({
          type: 'PRELOADER',
          payload: false
        });
        dispatch({
          type: 'SET_PAGINATION',
          payload: res.data.data
        });
        self = res.data.data;
      } else {}
    })["catch"](function (error) {});
    jquery__WEBPACK_IMPORTED_MODULE_12___default()(window).scroll(function () {
      if (jquery__WEBPACK_IMPORTED_MODULE_12___default()(window).scrollTop() + jquery__WEBPACK_IMPORTED_MODULE_12___default()(window).height() == jquery__WEBPACK_IMPORTED_MODULE_12___default()(document).height()) {
        dispatch({
          type: 'ON_SCROLL',
          payload: true
        });
        handleChange();
      }
    });
  }, []);

  var handleChange = function handleChange() {
    var _self;

    if (((_self = self) === null || _self === void 0 ? void 0 : _self.next_page_url) != null) {
      var _self2;

      var _data = {
        filterBy: state.FilterBy,
        searchQuery: state.SearchQuery
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/api/booking?page=".concat(((_self2 = self) === null || _self2 === void 0 ? void 0 : _self2.current_page) + 1), _data, {
        headers: {
          'Accept': 'application/json',
          authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_8__["default"].getAccessToken())
        }
      }).then(function (res) {
        if (res.data.status == 200) {
          self = res.data.data, handelResponse(res);
        } else {
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
        }
      })["catch"](function (error) {
        dispatch({
          type: 'ON_SCROLL',
          payload: false
        });
      });
    } else {
      dispatch({
        type: 'ON_SCROLL',
        payload: false
      });
    }
  };

  var handelResponse = function handelResponse(res) {
    dispatch({
      type: 'ON_SCROLL',
      payload: false
    });
    dispatch({
      type: 'SET_EVENT_DETAILS',
      payload: res.data.data.data
    });
    dispatch({
      type: 'SET_PAGINATION',
      payload: res.data.data
    });
  };

  var JoinRequestPopupHandling = function JoinRequestPopupHandling(SlotId) {
    jquery__WEBPACK_IMPORTED_MODULE_12___default()('#join-request-popup').modal({
      backdrop: 'static',
      keyboard: false
    });

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._joiningRequestPop(SlotId).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: "JOIN_REQUEST_CONTEXT",
          payload: res.data.data
        });
      }

      if (res.data.status == 'failed') {
        toastr.error(res.data.message);
        jquery__WEBPACK_IMPORTED_MODULE_12___default()('#join-request-popup').modal('hide');
      }
    })["catch"](function (error) {
      jquery__WEBPACK_IMPORTED_MODULE_12___default()('#join-request-popup').modal('hide');
      toastr.error('!oops server error');
      console.log(error);
    });
  };

  var cancelBooking = function cancelBooking(eventSlotId) {
    if (confirm('Are you sure you want to cancel?')) _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._cancelBooking({
      eventSlotId: eventSlotId
    }).then(function (res) {
      if (res.data.status == 200) {
        toastr.error(res.data.message);
      }

      if (res.data.status == 'failed') {
        toastr.error(res.data.message);
      }
    })["catch"](function (error) {
      toastr.error('!oops server error');
      console.log(error);
    });
  };

  var data = [state, dispatch];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Contexts_EventDetailsListContext__WEBPACK_IMPORTED_MODULE_10__["default"].Provider, {
    value: data
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "events-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "float-left"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: function onSubmit() {
      return console.log("Hello");
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "flex-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    value: "All"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "All"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Upcoming"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Completed"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Cancelled"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Rescheduled"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Ongoing"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-list group-message-list events-group-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "custom-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-row table-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-details-editable"
  }, "Event Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-type-editable"
  }, "Event Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-date-time-editable"
  }, "Event Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-amount-editable"
  }, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-duration-editable"
  }, "Duration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-hosted-by-editable"
  }, "Hosted By"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-status-editable"
  }, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell event-message-editable text-right"
  }, "Option")), state !== null && state !== void 0 && state.Preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_7__["UserEventsListSkeleton"], {
    count: 10
  }) : (state === null || state === void 0 ? void 0 : state.EventDetails.length) > 0 ? state === null || state === void 0 ? void 0 : state.EventDetails.map(function (res, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_ListView__WEBPACK_IMPORTED_MODULE_9__["Accordion"], {
      key: i,
      response: res || [],
      handleViewBooking: JoinRequestPopupHandling,
      cancelBooking: cancelBooking
    }));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "text-center mt-5"
  }, "No Bookings yet"), state !== null && state !== void 0 && state.OnScroll ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_7__["UserEventsListSkeleton"], {
    count: 10
  }) : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    active: state === null || state === void 0 ? void 0 : state.OnScroll
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_CreateEvent_Components_Join_JoinRequestContext_JoinRequestContext__WEBPACK_IMPORTED_MODULE_5__["default"].Provider, {
    value: state.joinRequestContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_CreateEvent_Components_Join_JoinRequestPopup__WEBPACK_IMPORTED_MODULE_6__["default"], {
    JoinUserRequest: JoinRequestPopupHandling
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_CreateEvent_Components_Modal_InviteUser_InviteUser__WEBPACK_IMPORTED_MODULE_13__["default"], {
    value: state
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_screens_CreateEvent_Components_Modal_QuickReply_QuickReply__WEBPACK_IMPORTED_MODULE_14__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (EventList);

/***/ }),

/***/ "./resources/js/User/EventList/Reducers/EventDetailsListReducer.js":
/*!*************************************************************************!*\
  !*** ./resources/js/User/EventList/Reducers/EventDetailsListReducer.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'EVENT_DETAILS':
      return _objectSpread(_objectSpread({}, state), {}, {
        EventDetails: payload
      });

    case 'SET_EVENT_DETAILS':
      return _objectSpread(_objectSpread({}, state), {}, {
        EventDetails: [].concat(_toConsumableArray(state === null || state === void 0 ? void 0 : state.EventDetails), _toConsumableArray(payload))
      });

    case 'PRELOADER':
      return _objectSpread(_objectSpread({}, state), {}, {
        Preloader: payload
      });

    case 'FILTER_BY':
      return _objectSpread(_objectSpread({}, state), {}, {
        FilterBy: payload
      });

    case 'SEARCH_QUERY':
      return _objectSpread(_objectSpread({}, state), {}, {
        SearchQuery: payload
      });

    case 'ON_SCROLL':
      return _objectSpread(_objectSpread({}, state), {}, {
        OnScroll: payload
      });

    case 'JOIN_REQUEST_CONTEXT':
      return _objectSpread(_objectSpread({}, state), {}, {
        joinRequestContext: payload
      });

    case 'SET_PAGINATION':
      return _objectSpread(_objectSpread({}, state), {}, {
        LastPage: payload.last_page,
        NextPage: payload.current_page + 1,
        CurrentPage: payload.current_page,
        NextPageUrl: payload.next_page_url,
        PreviewsPage: payload.prev_page_url
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./resources/js/User/Favorites/Components/FavoriteEvents/FavoriteEvents.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/User/Favorites/Components/FavoriteEvents/FavoriteEvents.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Context/UserFavoriteContext/UserFavoriteContext */ "./resources/js/User/Favorites/Context/UserFavoriteContext/UserFavoriteContext.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);






var FavoriteEvents = function FavoriteEvents(props) {
  var userFavoriteContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell favorite-icon-editable",
    "data-title": props.eventTitle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "favorite-icon-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return props.action({
        eventId: props.eventId
      });
    },
    "class": "favme av av-favorite-solid-icon active",
    style: {
      color: 'rgb(242, 50, 52)'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell event-details-editable",
    "data-title": props.eventTitle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/event?token=".concat(props.rememberToken, "&event=").concat(props.eventId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "cmn-profile-pic event-img"
  }, props.eventFiles.map(function (res, index) {
    return res.type == "jpeg" || "png" || "gif" || "jpg" || "svg" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      key: res.id,
      src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"] + res.file_url,
      alt: ""
    }) : '';
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, props.eventTitle)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell fav-date-time-editable",
    "data-title": "Duration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-text"
  }, moment__WEBPACK_IMPORTED_MODULE_4___default.a.utc(props.eventCreatedAt, 'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY h:mm A'), " "))));
};

/* harmony default export */ __webpack_exports__["default"] = (FavoriteEvents);

/***/ }),

/***/ "./resources/js/User/Favorites/Components/FavoriteUsers/FavoritesUsers.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/User/Favorites/Components/FavoriteUsers/FavoritesUsers.jsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Context/UserFavoriteContext/UserFavoriteContext */ "./resources/js/User/Favorites/Context/UserFavoriteContext/UserFavoriteContext.js");




var FavoritesUsers = function FavoritesUsers(props) {
  var userFavoriteContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell favorite-icon-editable",
    "data-title": "Favorite"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "favorite-icon-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return props.action({
        userId: props.toUser
      });
    },
    "class": "favme av av-favorite-solid-icon active",
    style: {
      color: 'rgb(242, 50, 52)'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell fav-event-details-editable",
    "data-title": "Event Details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/".concat(props.username)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "cmn-profile-pic",
    title: props.name
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: props.profilePicture,
    alt: props.name
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, props.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell fav-location-editable",
    "data-title": "Event Date"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-textt"
  }, props.country))));
};

/* harmony default export */ __webpack_exports__["default"] = (FavoritesUsers);

/***/ }),

/***/ "./resources/js/User/Favorites/Context/UserFavoriteContext/UserFavoriteContext.js":
/*!****************************************************************************************!*\
  !*** ./resources/js/User/Favorites/Context/UserFavoriteContext/UserFavoriteContext.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var UserFavoriteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
/* harmony default export */ __webpack_exports__["default"] = (UserFavoriteContext);

/***/ }),

/***/ "./resources/js/User/Favorites/Favorites.jsx":
/*!***************************************************!*\
  !*** ./resources/js/User/Favorites/Favorites.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Components_FavoriteEvents_FavoriteEvents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Components/FavoriteEvents/FavoriteEvents */ "./resources/js/User/Favorites/Components/FavoriteEvents/FavoriteEvents.jsx");
/* harmony import */ var _Components_FavoriteUsers_FavoritesUsers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/FavoriteUsers/FavoritesUsers */ "./resources/js/User/Favorites/Components/FavoriteUsers/FavoritesUsers.jsx");
/* harmony import */ var _Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Context/UserFavoriteContext/UserFavoriteContext */ "./resources/js/User/Favorites/Context/UserFavoriteContext/UserFavoriteContext.js");
/* harmony import */ var _components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
/* harmony import */ var _Reducer_FavoritesReducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Reducer/FavoritesReducer */ "./resources/js/User/Favorites/Reducer/FavoritesReducer.js");
/* harmony import */ var _components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/Comman/OnScrollLoader */ "./resources/js/components/Comman/OnScrollLoader.jsx");
var _this = undefined;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var initialState = {
  favorites: [],
  searchQuery: '',
  change: 0,
  preloader: true,
  onScroll: false
};

var Favorites = function Favorites(props) {
  var _state$favorites;

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(_Reducer_FavoritesReducer__WEBPACK_IMPORTED_MODULE_11__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_5__["default"]);
  var self = _this;
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    fetchData();
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        handleChange();
      }
    });
  }, []);

  var fetchData = function fetchData() {
    var data = {
      searchQuery: state.searchQuery
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._fetchFavorites(data).then(function (res) {
      if (res.data.status == 200) {
        var _res$data, _res$data$data;

        dispatch({
          type: 'GET_FAVORITES_INIT',
          payload: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$data = _res$data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.data
        });
        dispatch({
          type: 'PRELOADER',
          payload: false
        });
        self = res.data.data;
      }

      if (res.data.status === 'failed') {
        dispatch({
          type: 'PRELOADER',
          payload: false
        });
        toastr["error"](res.data.message);
      }

      console.log(res);
    })["catch"](function (error) {
      dispatch({
        type: 'PRELOADER',
        payload: false
      });
      toastr["error"](error.message);
    });
  };

  function handleChange() {
    if (self.next_page_url != null) {
      dispatch({
        type: 'ON_SCROLL',
        payload: true
      });
      var data = {
        searchQuery: state.searchQuery,
        nextPage: self.current_page + 1
      };

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._fetchFavorites(data).then(function (res) {
        if (res.data.status == 200) {
          var _res$data2, _res$data2$data;

          dispatch({
            type: 'GET_FAVORITES',
            payload: res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : (_res$data2$data = _res$data2.data) === null || _res$data2$data === void 0 ? void 0 : _res$data2$data.data
          });
          self = res.data.data, dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
        }

        if (res.data.status === 'failed') {
          toastr["error"](res.data.message);
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
        }

        console.log(res);
      })["catch"](function (error) {
        toastr["error"](error.message);
        dispatch({
          type: 'ON_SCROLL',
          payload: false
        });
      });
    } else {
      dispatch({
        type: 'ON_SCROLL',
        payload: false
      });
    }
  }

  var unFavorite = function unFavorite(obj) {
    var data = obj;
    var update = [];

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._favorite(data).then(function (res) {
      if (res.data.status == 200) {
        toastr["success"](res.data.message);

        if (data !== null && data !== void 0 && data.eventId) {
          update = state.favorites.filter(function (e) {
            return e.event_id != data.eventId;
          });
          dispatch({
            type: 'GET_FAVORITES_INIT',
            payload: update
          });
        }

        if (data !== null && data !== void 0 && data.userId) {
          update = state.favorites.filter(function (e) {
            return e.to_user != data.userId;
          });
          dispatch({
            type: 'GET_FAVORITES_INIT',
            payload: update
          });
        }
      }

      if (res.data.status == "failed") {
        toastr["error"](res.data.message);
      }
    })["catch"](function (error) {
      toastr["error"](error.message);
    });
  };

  var searchHandle = function searchHandle(e) {
    e.preventDefault();
  };

  var UserFavoriteValue = [state, dispatch];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Context_UserFavoriteContext_UserFavoriteContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
    value: UserFavoriteValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "favorites-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "float-left"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: function onSubmit() {
      return console.log("Hello");
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "flex-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    value: "All"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "All"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Events"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, "Users"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-list inbox-events-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "custom-table"
  }, state.preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_10__["FavoriteListSkeleton"], null) : ((_state$favorites = state.favorites) === null || _state$favorites === void 0 ? void 0 : _state$favorites.length) > 0 ? state.favorites.map(function (res) {
    var _res$my_favorite_user, _res$my_favorite_user2, _res$my_favorite_user3, _res$my_favorite_user4, _res$my_favorite_user5, _res$my_favorite_user6, _res$my_favorite_user7, _res$my_favorite_user8, _res$my_favorite_user9, _res$my_favorite_even, _res$my_favorite_even2, _res$my_favorite_even3, _res$my_favorite_even4, _res$my_favorite_even5;

    return res !== null && res !== void 0 && (_res$my_favorite_user = res.my_favorite_users) !== null && _res$my_favorite_user !== void 0 && _res$my_favorite_user.user_profile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_FavoriteUsers_FavoritesUsers__WEBPACK_IMPORTED_MODULE_8__["default"], {
      action: unFavorite,
      toUser: res === null || res === void 0 ? void 0 : res.to_user,
      profilePicture: res !== null && res !== void 0 && (_res$my_favorite_user2 = res.my_favorite_users) !== null && _res$my_favorite_user2 !== void 0 && (_res$my_favorite_user3 = _res$my_favorite_user2.user_profile) !== null && _res$my_favorite_user3 !== void 0 && _res$my_favorite_user3.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : (_res$my_favorite_user4 = res.my_favorite_users) === null || _res$my_favorite_user4 === void 0 ? void 0 : (_res$my_favorite_user5 = _res$my_favorite_user4.user_profile) === null || _res$my_favorite_user5 === void 0 ? void 0 : _res$my_favorite_user5.profile_picture) : "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"], "/public/assets/images/avatar.png"),
      country: (res === null || res === void 0 ? void 0 : (_res$my_favorite_user6 = res.my_favorite_users) === null || _res$my_favorite_user6 === void 0 ? void 0 : (_res$my_favorite_user7 = _res$my_favorite_user6.user_profile) === null || _res$my_favorite_user7 === void 0 ? void 0 : _res$my_favorite_user7.country) || 'N/A',
      name: res === null || res === void 0 ? void 0 : (_res$my_favorite_user8 = res.my_favorite_users) === null || _res$my_favorite_user8 === void 0 ? void 0 : _res$my_favorite_user8.name,
      username: res === null || res === void 0 ? void 0 : (_res$my_favorite_user9 = res.my_favorite_users) === null || _res$my_favorite_user9 === void 0 ? void 0 : _res$my_favorite_user9.username,
      key: res.id
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_FavoriteEvents_FavoriteEvents__WEBPACK_IMPORTED_MODULE_7__["default"], {
      action: unFavorite,
      eventTitle: (_res$my_favorite_even = res.my_favorite_events) === null || _res$my_favorite_even === void 0 ? void 0 : _res$my_favorite_even.event_title,
      eventCreatedAt: res === null || res === void 0 ? void 0 : res.created_at,
      eventUpdatedAt: res === null || res === void 0 ? void 0 : res.updated_at,
      rememberToken: (_res$my_favorite_even2 = res.my_favorite_events) === null || _res$my_favorite_even2 === void 0 ? void 0 : _res$my_favorite_even2.remember_token,
      eventId: res === null || res === void 0 ? void 0 : (_res$my_favorite_even3 = res.my_favorite_events) === null || _res$my_favorite_even3 === void 0 ? void 0 : _res$my_favorite_even3.id,
      eventFiles: (_res$my_favorite_even4 = res.my_favorite_events) !== null && _res$my_favorite_even4 !== void 0 && _res$my_favorite_even4.event_files ? JSON.parse((_res$my_favorite_even5 = res.my_favorite_events) === null || _res$my_favorite_even5 === void 0 ? void 0 : _res$my_favorite_even5.event_files) : [],
      key: res.id
    });
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "text-center mt-5"
  }, "No Favorites added yet"), state.onScroll ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_10__["FavoriteListSkeleton"], null) : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_12__["default"], {
    active: state === null || state === void 0 ? void 0 : state.onScroll
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Favorites);

/***/ }),

/***/ "./resources/js/User/Favorites/Reducer/FavoritesReducer.js":
/*!*****************************************************************!*\
  !*** ./resources/js/User/Favorites/Reducer/FavoritesReducer.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case "GET_FAVORITES_INIT":
      return _objectSpread(_objectSpread({}, state), {}, {
        favorites: payload,
        preloader: false
      });

    case "GET_FAVORITES":
      return _objectSpread(_objectSpread({}, state), {}, {
        favorites: [].concat(_toConsumableArray(state.favorites), _toConsumableArray(payload))
      });

    case "ON_SCROLL":
      return _objectSpread(_objectSpread({}, state), {}, {
        onScroll: payload
      });

    case "PRELOADER":
      return _objectSpread(_objectSpread({}, state), {}, {
        preloader: payload
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./resources/js/User/FileManager/Components/ActionButtons.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/User/FileManager/Components/ActionButtons.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
var _this = undefined;





var ActionButtons = function ActionButtons(_ref) {
  var SelectFiles = _ref.SelectFiles,
      Rename = _ref.Rename,
      Download = _ref.Download,
      Move = _ref.Move,
      Delete = _ref.Delete;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, (SelectFiles === null || SelectFiles === void 0 ? void 0 : SelectFiles.length) <= 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    "data-toggle": "modal",
    onClick: function onClick() {
      return Rename();
    },
    "data-target": "#host-info-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-edit-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Rename"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    "data-toggle": "modal",
    "data-target": "#host-info-btn-download",
    onClick: function onClick() {
      return Download(_this.props.SelectFiles[0]);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-download-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Save")))) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    "data-toggle": "modal",
    "data-target": "#host-info-btn-move",
    onClick: function onClick() {
      return Move();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-move-file-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Move"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "move-folder-toggle",
    className: "new-toggle-dropdown",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "move-to-bx"
  }, "Move to:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-files-icon"
  }), " Folder Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-files-icon"
  }), " Folder Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-files-icon"
  }), " Folder Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-files-icon"
  }), " Folder Name")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-files-icon"
  }), " Folder Name")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-tt-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    "data-toggle": "modal",
    onClick: function onClick() {
      return Delete(SelectFiles);
    },
    "data-target": "#host-info-btn-delete"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-delete-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-tt-text"
  }, "Delete")))));
};

/* harmony default export */ __webpack_exports__["default"] = (ActionButtons);

/***/ }),

/***/ "./resources/js/User/FileManager/Components/FileList.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/User/FileManager/Components/FileList.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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



var FileList = /*#__PURE__*/function (_Component) {
  _inherits(FileList, _Component);

  var _super = _createSuper(FileList);

  function FileList() {
    _classCallCheck(this, FileList);

    return _super.apply(this, arguments);
  }

  _createClass(FileList, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-ck-editable",
        "data-title": "Select"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "checkbox custom"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        onChange: function onChange(e) {
          return _this.props.SelectFiles(e, _this.props.id);
        },
        value: this.props.id
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-file-name-editable f-m-file-name",
        "data-title": "File Name"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "r-m-t-bx my-account-menu"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "cell fm-file-name-editable dropdown-toggle",
        "data-toggle": "dropdown",
        "data-display": "static",
        "aria-haspopup": "true",
        "aria-expanded": "false"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "file-type-title-icon"
      }, this.props.isDirectory == 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "file-type-name"
      }, this.props.type) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "file-type-name"
      }, this.props.type), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, this.props.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dropdown-menu dropdown-menu-lg-right"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, this.props.SelectFilesValue.length <= 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return _this.props.Download(_this.props.id);
        },
        className: "dropdown-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-download-icon"
      }, " "), " Download")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return _this.props.Rename(_this.props.id);
        },
        className: "dropdown-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-edit-icon"
      }), " Rename"))) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return _this.props.Move(_this.props.id);
        },
        className: "dropdown-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-move-file-icon"
      }), " Move")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: function onClick() {
          return _this.props.Delete([_this.props.id]);
        },
        className: "dropdown-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-delete-icon"
      }), " Delete"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-date-time-editable",
        "data-title": "Date & Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, this.props.dateTime, " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-size-editable",
        "data-title": "Size"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, this.props.size)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-type-editable",
        "data-title": "Type"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, this.props.type)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-source-editable",
        "data-title": "Source"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-delete-btn"
      }, "Purchased"))));
    }
  }]);

  return FileList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FileList);

/***/ }),

/***/ "./resources/js/User/FileManager/Components/FileManagerUpload.jsx":
/*!************************************************************************!*\
  !*** ./resources/js/User/FileManager/Components/FileManagerUpload.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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



var FileManagerUpload = /*#__PURE__*/function (_Component) {
  _inherits(FileManagerUpload, _Component);

  var _super = _createSuper(FileManagerUpload);

  function FileManagerUpload() {
    _classCallCheck(this, FileManagerUpload);

    return _super.apply(this, arguments);
  }

  _createClass(FileManagerUpload, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal fade default-popup upload-files-popup",
        id: "upload-files-popup",
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
      }, "Upload Files")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "upload-paid-files"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "file-upload"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        name: "file",
        onChange: function onChange(e) {
          return _this.props.FileUploadHandling(e);
        },
        className: "file-input",
        type: "file",
        multiple: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/upload-files-icon.svg",
        alt: ""
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-subtitle"
      }, "Add a Files (maximum file size 20mb)"))), this.props.UploadFormFiles.length > 0 ? this.props.UploadFormFiles.map(function (res, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "upload-files-list",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "u-p-files-list uploading-file-bx"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "custom-table"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "table-row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cell title-editable",
          "data-title": "Name"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "file-type-title-icon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "file-type-name"
        }, res.fileType), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, res.fileName))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cell file-progress-editable",
          "data-title": "Action"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "progress"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "progress-bar",
          style: {
            width: "".concat(_this.props.Progress, "%")
          }
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          type: "button",
          className: "btn default-btn cricle-icon-btn"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "av av-close-icon"
        })))))));
      }) : ''), this.props.FileUploaded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "modal-footer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-default btn-sm",
        "data-dismiss": "modal"
      }, "Close"))) : '')))));
    }
  }]);

  return FileManagerUpload;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FileManagerUpload);

/***/ }),

/***/ "./resources/js/User/FileManager/FileManager.jsx":
/*!*******************************************************!*\
  !*** ./resources/js/User/FileManager/FileManager.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ApiServer/FileManager/FileManagerService */ "./resources/js/ApiServer/FileManager/FileManagerService.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Components_ActionButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/ActionButtons */ "./resources/js/User/FileManager/Components/ActionButtons.jsx");
/* harmony import */ var _Components_FileList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/FileList */ "./resources/js/User/FileManager/Components/FileList.jsx");
/* harmony import */ var _Components_FileManagerUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/FileManagerUpload */ "./resources/js/User/FileManager/Components/FileManagerUpload.jsx");
/* harmony import */ var _Components_SearchFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/SearchFilter */ "./resources/js/User/FileManager/Components/SearchFilter.jsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Modals_Modals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Modals/Modals */ "./resources/js/components/Modals/Modals.jsx");
/* harmony import */ var js_file_download__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! js-file-download */ "./node_modules/js-file-download/file-download.js");
/* harmony import */ var js_file_download__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(js_file_download__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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















var FileManager = /*#__PURE__*/function (_Component) {
  _inherits(FileManager, _Component);

  var _super = _createSuper(FileManager);

  function FileManager() {
    var _this;

    _classCallCheck(this, FileManager);

    _this = _super.call(this);
    _this.state = {
      Files: [],
      SelectFiles: [],
      isChecked: false,
      UploadSelectFile: [],
      FileUploadProgress: 0,
      FileUploaded: false,
      UploadFormFiles: [],
      currentPage: 0,
      createFolder: '',
      nextPage: 0,
      previewPage: 0
    };
    _this.DeleteFile = _this.DeleteFile.bind(_assertThisInitialized(_this));
    _this.DuplicateFile = _this.DuplicateFile.bind(_assertThisInitialized(_this));
    _this.RenameFile = _this.RenameFile.bind(_assertThisInitialized(_this));
    _this.MoveFile = _this.MoveFile.bind(_assertThisInitialized(_this));
    _this.CopyFile = _this.CopyFile.bind(_assertThisInitialized(_this));
    _this.ShareFile = _this.ShareFile.bind(_assertThisInitialized(_this));
    _this.DownloadFile = _this.DownloadFile.bind(_assertThisInitialized(_this));
    _this.SelectFiles = _this.SelectFiles.bind(_assertThisInitialized(_this));
    _this.FileUploadHandling = _this.FileUploadHandling.bind(_assertThisInitialized(_this));
    _this.Download = _this.Download.bind(_assertThisInitialized(_this));
    _this.onScrollHandle = _this.onScrollHandle.bind(_assertThisInitialized(_this));
    _this.getFileManagerAllFile = _this.getFileManagerAllFile.bind(_assertThisInitialized(_this));
    _this.createFolderHandleSubmit = _this.createFolderHandleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FileManager, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getFileManagerAllFile();
    }
  }, {
    key: "getFileManagerAllFile",
    value: function getFileManagerAllFile() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_11___default.a.get('/api/fileManager', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_2__["default"].getAccessToken())
        }
      }).then(function (response) {
        if (response.data.status === 200) {
          _this2.setState(function () {
            return {
              Files: response.data.data.data,
              currentPage: response.data.data.current_page,
              nextPage: response.data.data.next_page_url ? response.data.data.current_page + 1 : response.data.data.current_page
            };
          });
        }
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }, {
    key: "SelectFiles",
    value: function SelectFiles(event, index) {
      var target = event.target;
      var value = target.value;

      if (target.checked) {
        this.state.SelectFiles.push(parseInt(value));
        this.setState({
          SelectFiles: this.state.SelectFiles
        });
      } else if (target.checked == false) {
        var _value = this.state.SelectFiles.indexOf(parseInt(index));

        if (_value !== -1) {
          this.state.SelectFiles.splice(_value, 1);
        }

        this.setState({
          SelectFiles: this.state.SelectFiles
        });
      } else {
        this.setState({
          SelectFiles: []
        });
      }
    }
  }, {
    key: "DeleteFile",
    value: function () {
      var _DeleteFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fileId) {
        var data, res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!fileId) {
                  _context.next = 7;
                  break;
                }

                data = {
                  fileId: fileId
                };
                _context.next = 4;
                return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_1__["default"].deleteMultipleFileService(data);

              case 4:
                res = _context.sent;

                if (res.data.status == 200) {
                  toastr['success'](res.data.message);
                  this.getFileManagerAllFile();
                  this.setState({
                    SelectFiles: []
                  });
                }

                if (res.data.status == "failed") {
                  toastr['error'](res.data.message);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function DeleteFile(_x) {
        return _DeleteFile.apply(this, arguments);
      }

      return DeleteFile;
    }()
  }, {
    key: "DuplicateFile",
    value: function () {
      var _DuplicateFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var data, res, authUserFiles, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {
                  eventId: this.state.SelectFiles
                };
                _context2.next = 3;
                return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_1__["default"].DuplicateFileService(data);

              case 3:
                res = _context2.sent;

                if (!(res.data.status == 200)) {
                  _context2.next = 11;
                  break;
                }

                authUserFiles = {
                  url: 'api/fileManager/'
                };
                _context2.next = 8;
                return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_1__["default"].authUserFileService(authUserFiles);

              case 8:
                response = _context2.sent;

                if (response.data.status === 200) {
                  this.setState(function () {
                    return {
                      Files: response.data.data.data
                    };
                  });
                }

                toastr['success'](res.data.message);

              case 11:
                if (res.data.status == "failed") {
                  toastr['error'](res.data.message);
                }

                console.log(res, "ResponseFile");

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function DuplicateFile() {
        return _DuplicateFile.apply(this, arguments);
      }

      return DuplicateFile;
    }()
  }, {
    key: "RenameFile",
    value: function RenameFile(res) {
      alert("RenameFile ".concat(res));
    }
  }, {
    key: "createFolderHandleSubmit",
    value: function createFolderHandleSubmit(e) {
      var _this3 = this;

      e.preventDefault();
      $('#create-folder-popup').modal('hide');

      if (this.state.createFolder) {
        _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_12__["ApiService"]._createFolder({
          folderName: this.state.createFolder
        }).then(function (res) {
          console.log(res, 'createFolder');

          if (res.data.status == 200) {
            _this3.getFileManagerAllFile();

            toastr['success'](res.data.message);
          } else {
            if (res.data.status == "failed") {
              var _res$data, _res$data$validation_;

              toastr['error']((_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$validation_ = _res$data.validation_error) === null || _res$data$validation_ === void 0 ? void 0 : _res$data$validation_.folderName[0]);
            } else {
              toastr['error'](res.data.message);
            }
          }
        })["catch"](function (error) {
          console.log(error);
        });
      } else {
        toastr['error']('Folder name is required!');
      }

      console.log(this.state);
    }
  }, {
    key: "MoveFile",
    value: function MoveFile(res) {
      alert("MoveFile ".concat(res));
    }
  }, {
    key: "CopyFile",
    value: function CopyFile(res) {
      alert("CopyFile ".concat(res));
    }
  }, {
    key: "Download",
    value: function Download(FileName, FilePath) {
      setTimeout(function () {
        js_file_download__WEBPACK_IMPORTED_MODULE_9___default()(FilePath, FileName);
      }, 100);
    }
  }, {
    key: "FileOpen",
    value: function FileOpen(FilePath) {
      setTimeout(function () {
        var response = {
          file: FilePath
        };
        window.open(response.file);
      }, 100);
    }
  }, {
    key: "DownloadFile",
    value: function () {
      var _DownloadFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
        var data, res;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = {
                  fileId: id
                };
                _context3.next = 3;
                return _ApiServer_FileManager_FileManagerService__WEBPACK_IMPORTED_MODULE_1__["default"].DownloadFileService(data);

              case 3:
                res = _context3.sent;

                if (res.data.status == 200) {
                  this.Download(res.data.data.FileName, res.data.data.FilePath);
                  toastr['success'](res.data.message);
                }

                if (res.data.status == "failed") {
                  toastr['error'](res.data.message);
                }

                console.log(res, "Response Download");

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function DownloadFile(_x2) {
        return _DownloadFile.apply(this, arguments);
      }

      return DownloadFile;
    }()
  }, {
    key: "ShareFile",
    value: function ShareFile(res) {
      alert("ShareFile ".concat(res));
    }
  }, {
    key: "FileUploadHandling",
    value: function () {
      var _FileUploadHandling = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(event) {
        var _this4 = this;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.setState({
                  UploadSelectFile: event.target.files
                });
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
                  var form_data, FileData, _iterator, _step, file, response;

                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!(_this4.state.UploadSelectFile.length === 0)) {
                            _context4.next = 2;
                            break;
                          }

                          return _context4.abrupt("return", toastr["error"]("No any file selected"));

                        case 2:
                          form_data = new FormData();
                          FileData = [];
                          _iterator = _createForOfIteratorHelper(_this4.state.UploadSelectFile);

                          try {
                            for (_iterator.s(); !(_step = _iterator.n()).done;) {
                              file = _step.value;
                              form_data.append('files[]', file, file.name);
                              FileData.push({
                                fileName: file.name,
                                fileType: file.type,
                                fileSize: file.size
                              });
                            }
                          } catch (err) {
                            _iterator.e(err);
                          } finally {
                            _iterator.f();
                          }

                          _this4.setState({
                            UploadFormFiles: FileData
                          });

                          _context4.prev = 7;
                          _context4.next = 10;
                          return axios__WEBPACK_IMPORTED_MODULE_11___default.a.post(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_10__["default"].multipleFileUploadUrl(), form_data, {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                              'Accept': 'application/json',
                              authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_2__["default"].getAccessToken())
                            },
                            onUploadProgress: function onUploadProgress(progressEvent) {
                              if (progressEvent.lengthComputable) {
                                var ProgressBar = parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total));

                                _this4.setState({
                                  FileUploadProgress: ProgressBar
                                });

                                if (ProgressBar == 100) {
                                  setTimeout(function () {
                                    _this4.setState({
                                      FileUploadProgress: 0
                                    });
                                  }, 2000);
                                }

                                console.log(_this4.state.FileUploadProgress, "propgress");
                              }
                            }
                          });

                        case 10:
                          response = _context4.sent;

                          if (response.data.status == 200) {
                            _this4.getFileManagerAllFile();

                            toastr["success"](response.data.message);

                            _this4.setState({
                              UploadFormFiles: [],
                              FileUploaded: true
                            });
                          }

                          if (response.data == "failed") {
                            toastr["success"](response.data.message);

                            _this4.setState({
                              FileUploaded: false
                            });
                          }

                          _context4.next = 18;
                          break;

                        case 15:
                          _context4.prev = 15;
                          _context4.t0 = _context4["catch"](7);
                          return _context4.abrupt("return", false);

                        case 18:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, null, [[7, 15]]);
                })), 2000);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function FileUploadHandling(_x3) {
        return _FileUploadHandling.apply(this, arguments);
      }

      return FileUploadHandling;
    }()
  }, {
    key: "onScrollHandle",
    value: function onScrollHandle(e) {
      var _this5 = this;

      var element = e.target;

      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        axios__WEBPACK_IMPORTED_MODULE_11___default.a.get("/api/fileManager?page=".concat(this.state.nextPage), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            authorization: "Bearer ".concat(_Routes_Auth__WEBPACK_IMPORTED_MODULE_2__["default"].getAccessToken())
          }
        }).then(function (response) {
          console.log([].concat(_toConsumableArray(_this5.state.Files), [response.data.data.data]), "onScroll");

          if (response.data.status === 200) {
            if (response.data.data.next_page_url) {
              _this5.setState(function (previousState) {
                return {
                  Files: _this5.state.Files.concat(response.data.data.data),
                  currentPage: response.data.data.current_page,
                  nextPage: response.data.data.next_page_url ? response.data.data.current_page + 1 : response.data.data.current_page
                };
              });

              toastr["success"]("Load More..");
            } else {
              toastr["error"]("No More Data !Found");
            }
          }
        })["catch"](function (error) {// toastr["error"](error.message);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$state = this.state,
          Files = _this$state.Files,
          UploadFormFiles = _this$state.UploadFormFiles,
          SelectFiles = _this$state.SelectFiles,
          isChecked = _this$state.isChecked;
      var Value = {
        Files: Files,
        SelectFiles: SelectFiles,
        isChecked: isChecked,
        UploadFormFiles: UploadFormFiles
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-content",
        "data-ah-tab-active": this.props.Active
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "file-manager-content-sec"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cmn-rit-top-heading-sec message-top-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "selected-events-ck"
      }, SelectFiles.length >= 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ActionButtons__WEBPACK_IMPORTED_MODULE_3__["default"], {
        SelectFiles: SelectFiles,
        Delete: this.DeleteFile,
        Download: this.DownloadFile,
        Share: this.ShareFile,
        Move: this.MoveFile,
        Rename: this.RenameFile,
        Duplicate: this.DuplicateFile
      }) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "selected-ck-status"
      }, SelectFiles.length > 1 ? " ".concat(0, " Folder, ", SelectFiles.length, " Files") : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_SearchFilter__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-list",
        onScroll: this.onScrollHandle
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "u-p-files-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "custom-table"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row table-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-ck-editable"
      }, "Select"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-file-name-editable"
      }, "File Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-date-time-editable"
      }, "Date & Time"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-size-editable"
      }, "Size"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-type-editable"
      }, "Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell fm-source-editable"
      }, "Source")), this.state.Files.map(function (res, i) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_FileList__WEBPACK_IMPORTED_MODULE_4__["default"], {
          SelectFilesValue: SelectFiles,
          value: Value,
          CopyFile: _this6.CopyFile,
          SelectFiles: _this6.SelectFiles,
          Delete: _this6.DeleteFile,
          Download: _this6.DownloadFile,
          Share: _this6.ShareFile,
          Move: _this6.MoveFile,
          Rename: _this6.RenameFile,
          Duplicate: _this6.DuplicateFile,
          key: i,
          id: res.id,
          type: res.type,
          dateTime: moment__WEBPACK_IMPORTED_MODULE_7___default.a.utc(res.date_time).local().format("D MMM, YYYY hh:mm A"),
          size: res.size,
          name: res.name,
          showHideDiv: _this6.props.showHideDiv,
          fileUrl: res.file_url,
          isDirectory: res.isDirectory
        });
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_FileManagerUpload__WEBPACK_IMPORTED_MODULE_5__["default"], {
        FileUploaded: this.state.FileUploaded,
        UploadFormFiles: UploadFormFiles,
        Progress: this.state.FileUploadProgress,
        onChange: this.onChangHandling,
        FileUploadHandling: this.FileUploadHandling
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modals_Modals__WEBPACK_IMPORTED_MODULE_8__["CreateFolderModal"], {
        handleSubmit: this.createFolderHandleSubmit,
        value: this.state.createFolder,
        onChange: function onChange(e) {
          return _this6.setState({
            createFolder: e.target.value
          });
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modals_Modals__WEBPACK_IMPORTED_MODULE_8__["default"], null));
    }
  }]);

  return FileManager;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (FileManager);

/***/ }),

/***/ "./resources/js/User/MainSettingPage.jsx":
/*!***********************************************!*\
  !*** ./resources/js/User/MainSettingPage.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Filter/FilterPopup */ "./resources/js/components/Filter/FilterPopup.jsx");
/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Footer/Footer */ "./resources/js/components/Footer/Footer.jsx");
/* harmony import */ var _components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Navbar/Navbar */ "./resources/js/components/Navbar/Navbar.jsx");
/* harmony import */ var _components_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Sidebar/Sidebar */ "./resources/js/components/Sidebar/Sidebar.jsx");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _Chats_ChatPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Chats/ChatPage */ "./resources/js/User/Chats/ChatPage.jsx");
/* harmony import */ var _EventList_EventList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EventList/EventList */ "./resources/js/User/EventList/EventList.jsx");
/* harmony import */ var _Favorites_Favorites__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Favorites/Favorites */ "./resources/js/User/Favorites/Favorites.jsx");
/* harmony import */ var _FileManager_FileManager__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FileManager/FileManager */ "./resources/js/User/FileManager/FileManager.jsx");
/* harmony import */ var _Notification_Notification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Notification/Notification */ "./resources/js/User/Notification/Notification.jsx");
/* harmony import */ var _Payments_Payments__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Payments/Payments */ "./resources/js/User/Payments/Payments.jsx");
/* harmony import */ var _Reviews_Reviews__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Reviews/Reviews */ "./resources/js/User/Reviews/Reviews.jsx");
/* harmony import */ var _Setting_Setting__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Setting/Setting */ "./resources/js/User/Setting/Setting.jsx");
















var MainSettingPage = function MainSettingPage(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Filter_FilterPopup__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "mid-content-sec in-page-content-sec "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "av-default-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TopMenu, {
    Page: props.Page
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content-wrapper"
  }, props.Page === "Chat" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chats_ChatPage__WEBPACK_IMPORTED_MODULE_7__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Chat" ? true : false
  }) : '', props.Page === "Bookings" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventList_EventList__WEBPACK_IMPORTED_MODULE_8__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Bookings" ? true : false
  }) : '', props.Page === "FileManager" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FileManager_FileManager__WEBPACK_IMPORTED_MODULE_10__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "FileManager" ? true : false
  }) : '', props.Page === "Payments" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Payments_Payments__WEBPACK_IMPORTED_MODULE_12__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Payments" ? true : false
  }) : '', props.Page === "Notification" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Notification_Notification__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Notification" ? true : false
  }) : '', props.Page === "Reviews" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Reviews_Reviews__WEBPACK_IMPORTED_MODULE_13__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Reviews" ? true : false
  }) : '', props.Page === "Favorites" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Favorites_Favorites__WEBPACK_IMPORTED_MODULE_9__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Favorites" ? true : false
  }) : '', props.Page === "Setting" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Setting_Setting__WEBPACK_IMPORTED_MODULE_14__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["showHideDiv"],
    Active: props.Page === "Setting" ? true : false
  }) : '')))))));
};

/* harmony default export */ __webpack_exports__["default"] = (MainSettingPage);

var TopMenu = function TopMenu(props) {
  document.title = props.Page;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Chat" ? true : false,
    to: "/messages"
  }, "Messages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Bookings" ? true : false,
    to: "/bookings"
  }, "Bookings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "FileManager" ? true : false,
    to: "/media/files"
  }, "File Manager"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Payments" ? true : false,
    to: "/payments"
  }, "Payments"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Notification" ? true : false,
    to: "/notifications"
  }, "Notifications"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Reviews" ? true : false,
    to: "/reviews"
  }, "Reviews"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Favorites" ? true : false,
    to: "/favorites"
  }, "Favorites"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    className: "ah-tab-item",
    "data-ah-tab-active": props.Page === "Setting" ? true : false,
    to: "/setting"
  }, "Settings"))));
};

/***/ }),

/***/ "./resources/js/User/Notification/Notification.jsx":
/*!*********************************************************!*\
  !*** ./resources/js/User/Notification/Notification.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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



var Notification = /*#__PURE__*/function (_Component) {
  _inherits(Notification, _Component);

  var _super = _createSuper(Notification);

  function Notification() {
    _classCallCheck(this, Notification);

    return _super.apply(this, arguments);
  }

  _createClass(Notification, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "ah-tab-content",
        "data-ah-tab-active": this.props.Active
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "notification-content-sec"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "notificaton-list-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "noti-heading"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cmn-rit-top-heading-sec message-top-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "inbox-message-number"
      }, "Notifications (", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "3"), " new) "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "inbox-rit-search"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "av av-setting-2-2-icon"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-list inbox-noti-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "u-p-files-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "custom-table"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row unread-notification"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "Just Now"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row unread-notification"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row unread-notification"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row unread-notification"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-user-editable",
        "data-title": "Notification User"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-user-bx"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "cmn-profile-pic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "../assets/images/user-1.jpg",
        alt: ""
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "William Adams")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell noti-message-editable",
        "data-title": "Notification Message"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "message-short-text"
      }, "User has started a new event")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cell notification-time-editable",
        "data-title": "Notification Time"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "c-table-text"
      }, "04:56 PM"))))))))));
    }
  }]);

  return Notification;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Notification);

/***/ }),

/***/ "./resources/js/User/Payments/Components/BankList/BankList.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/User/Payments/Components/BankList/BankList.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BankList = function BankList() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "payment-center-history-bx card-bank-tabs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "noti-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "cmn-rit-top-heading-sec noti-setting-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "noti-back-icon-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return dispatch({
        type: 'BANK_DETAILS',
        payload: false
      });
    },
    "class": "btn text-btm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "av av-reply-icon"
  }), " Back")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "inbox-message-number"
  }, "Payment Options"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "inbox-group-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "tabs-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "nav",
    id: "pills-tab",
    role: "tablist"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "nav-item",
    role: "presentation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    "class": "nav-link active",
    "data-toggle": "pill",
    href: "#card-tab",
    role: "tab",
    "aria-controls": "card-tab",
    "aria-selected": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Card"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "nav-item",
    role: "presentation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    "class": "nav-link",
    "data-toggle": "pill",
    href: "#bank-tab",
    role: "tab",
    "aria-controls": "bank-tab",
    "aria-selected": "false"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Withdraw to Bank"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "tab-content",
    id: "pills-tabContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "tab-pane fade show active",
    id: "card-tab",
    role: "tabpanel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "cards-add-pay-bx card-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "payment-summary-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "saved-card-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "default-active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "b-c-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "images/visa-img.jpg",
    alt: ""
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "VISA")), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "9865 ******** 65432"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "default-status-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "btn status-btn awaiting-status"
  }, "PRIMARY")), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn link-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "av av-delete-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "b-c-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "images/mastercard-img.jpg",
    alt: ""
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Mastercard")), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "6548 ******** 23654"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "make-default-status-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn default-btn"
  }, "Make Primary")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn link-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "av av-delete-icon"
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "payment-card-add"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn blue-bdr-btn",
    value: "Show/Hide",
    onClick: function onClick() {
      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["showHideDiv"])('add-card');
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "av av-add-plus-solid-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path3"
  })), "Add Card"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "add-card",
    "class": "write-review-content-bx new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-3 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardNumber"
  }, "Card Holder Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardNumber",
    placeholder: "Card Holder Name",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-3 col-md-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardNumber"
  }, "Card Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardNumber",
    placeholder: "XXX - XXXX - XXXX - XXXX",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-3 col-md-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardExpiryDate"
  }, "Card Expiry Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardExpiryDate",
    placeholder: "MM  / YY",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-3 col-md-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "Cvv"
  }, "CVV"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "Cvv",
    placeholder: "XXX",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "float-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn default-btn",
    "data-dismiss": "modal"
  }, "Save Card")))))))))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "tab-pane fade",
    id: "bank-tab",
    role: "tabpanel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "cards-add-pay-bx bank-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "payment-summary-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "saved-card-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "b-c-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "images/sbi-bank-icon.jpg",
    alt: ""
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "State Bank of India")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "110000000"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "make-default-status-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn default-btn"
  }, "Make Primary")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn link-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "av av-delete-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "default-active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "b-c-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "images/icici-bank-icon.jpg",
    alt: ""
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "ICICI Bank")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "110000000"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "default-status-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "btn status-btn awaiting-status"
  }, "PRIMARY")), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn link-btn"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    "class": "av av-delete-icon"
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "payment-card-add"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn blue-bdr-btn",
    value: "Show/Hide",
    onClick: function onClick() {
      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_1__["showHideDiv"])('add-bank');
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "av av-add-plus-solid-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path1"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "path3"
  })), "Add Bank"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "add-bank",
    "class": "write-review-content-bx new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-6 col-md-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardNumber"
  }, "Account Holder Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardNumber",
    placeholder: "Enter name",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-6 col-md-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardExpiryDate"
  }, "Bank Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardNumber",
    placeholder: "Enter bank name",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-6 col-md-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "CardNumber"
  }, "Account Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "CardNumber",
    placeholder: "Enter account number",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-6 col-md-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    "class": "form-label",
    "for": "Cvv"
  }, "Routing Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    "class": "form-control",
    id: "Cvv",
    placeholder: "XXXXXXXX",
    value: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-sm-12 col-md-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "make-default-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    checked: ""
  }), "Make Default")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    "class": "btn default-btn",
    "data-dismiss": "modal"
  }, "Save Bank"))))))))))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BankList);

/***/ }),

/***/ "./resources/js/User/Payments/Components/PaymetListHeader/PaymentListHeader.js":
/*!*************************************************************************************!*\
  !*** ./resources/js/User/Payments/Components/PaymetListHeader/PaymentListHeader.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserPaymentList_UserPaymentList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UserPaymentList/UserPaymentList */ "./resources/js/User/Payments/Components/UserPaymentList/UserPaymentList.js");
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var PaymentListHeader = function PaymentListHeader() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 3),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      handelSearchSubmit = _useContext2[2];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-list payment-history-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "custom-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row table-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell payment-order-number-editable"
  }, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell payment-order-number-editable"
  }, "Order Number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell payment-date-time-editable"
  }, "Date & Time"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell payment-amount-editable"
  }, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell payment-status-editable"
  }, "Status")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserPaymentList_UserPaymentList__WEBPACK_IMPORTED_MODULE_1__["default"], null)), state !== null && state !== void 0 && state.OnScroll ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "content-loader"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      width: '50px',
      height: '50px'
    },
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__["FileManagerPath"], "public/assets/images/loading.gif"),
    alt: "loading"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      minHeight: '50px'
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (PaymentListHeader);

/***/ }),

/***/ "./resources/js/User/Payments/Components/SearchPayment/SearchPayment.js":
/*!******************************************************************************!*\
  !*** ./resources/js/User/Payments/Components/SearchPayment/SearchPayment.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
/* harmony import */ var react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-date-range/dist/styles.css */ "./node_modules/react-date-range/dist/styles.css");
/* harmony import */ var react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_date_range_dist_styles_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-date-range/dist/theme/default.css */ "./node_modules/react-date-range/dist/theme/default.css");
/* harmony import */ var react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_date_range_dist_theme_default_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-date-range */ "./node_modules/react-date-range/dist/index.js");
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_date_range__WEBPACK_IMPORTED_MODULE_5__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




 // main style file



var Style = {
  width: '44%',
  height: 'auto',
  zIndex: 99999,
  // background:' transparent',
  background: ' #fff',
  position: 'absolute',
  marginLeft: '-400px',
  marginTop: '40px'
};

var SearchPayment = function SearchPayment() {
  var _state$Pagination, _state$Pagination2;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 3),
      state = _useContext2[0],
      dispatch = _useContext2[1],
      handelSearchSubmit = _useContext2[2];

  var selectionRange = {
    startDate: state.DateRangeStart,
    endDate: state.DateRangeEnd,
    key: 'selection'
  };

  var handleSelect = function handleSelect(ranges) {
    console.log(ranges, 'ranges');
    dispatch({
      type: 'DATE_PICKER',
      payload: {
        DateRangeStart: ranges.selection.startDate,
        DateRangeEnd: ranges.selection.endDate
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "float-left"
  }, parseInt(state === null || state === void 0 ? void 0 : (_state$Pagination = state.Pagination) === null || _state$Pagination === void 0 ? void 0 : _state$Pagination.ReceivedPayment) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn start-end-btn"
  }, "Withdraw All ($", state !== null && state !== void 0 && state.Pagination ? state === null || state === void 0 ? void 0 : (_state$Pagination2 = state.Pagination) === null || _state$Pagination2 === void 0 ? void 0 : _state$Pagination2.ReceivedPayment : 0, ")") : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handelSearchSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, state.UserPaymentFilter == "Date" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    "class": "multi-date-calendar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    style: {
      width: '330px'
    },
    onClick: function onClick() {
      return dispatch({
        type: 'DATE_PICKER_MODAL',
        payload: !state.DateRangePickerModal
      });
    },
    "class": "form-control",
    placeholder: "",
    value: moment__WEBPACK_IMPORTED_MODULE_0___default()(state.DateRangeStart).format('ddd, MMM D YYYY') + ' - ' + moment__WEBPACK_IMPORTED_MODULE_0___default()(state.DateRangeEnd).format('ddd, MMM D YYYY'),
    readOnly: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    "class": "av av-calendar-icon"
  })), state.DateRangePickerModal ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "card",
    style: Style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "card-body p-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_date_range__WEBPACK_IMPORTED_MODULE_5__["DateRangePicker"], {
    ranges: [selectionRange],
    onChange: handleSelect,
    rangeColors: "#145388",
    color: "#145388",
    months: 2,
    direction: "horizontal"
  }))) : '')) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "flex-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: function onChange(e) {
      return dispatch({
        type: 'USER_PAYMENT_SEARCH_FILTER',
        payload: e.target.value
      });
    },
    value: state === null || state === void 0 ? void 0 : state.UserPaymentFilter
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "All"
  }, "- All -"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "Received"
  }, "Received"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "Date"
  }, "Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
    value: "Sent"
  }, "Sent"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    className: "form-control",
    type: "text",
    onChange: function onChange(e) {
      return dispatch({
        type: 'USER_PAYMENT_SEARCH',
        payload: e.target.value
      });
    },
    value: state.UserPaymentSearch,
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  })))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (SearchPayment);

/***/ }),

/***/ "./resources/js/User/Payments/Components/UserPaymentHeader/UserPaymentHeader.js":
/*!**************************************************************************************!*\
  !*** ./resources/js/User/Payments/Components/UserPaymentHeader/UserPaymentHeader.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var UserPaymentHeader = function UserPaymentHeader() {
  var _state$Pagination, _state$Pagination2, _state$Pagination3, _state$Pagination4, _state$Pagination5, _state$Pagination6, _state$Pagination7, _state$Pagination8;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "payment-status-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-s-rit-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Bank"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Card Info")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "pay-s-lft-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#",
    className: "pay-s-lft-img",
    onClick: function onClick() {
      return dispatch({
        type: 'BANK_DETAILS',
        payload: true
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-arrow-right-line-icon"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-s-rit-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "$", state !== null && state !== void 0 && (_state$Pagination = state.Pagination) !== null && _state$Pagination !== void 0 && _state$Pagination.ReceivedPayment ? state === null || state === void 0 ? void 0 : (_state$Pagination2 = state.Pagination) === null || _state$Pagination2 === void 0 ? void 0 : _state$Pagination2.ReceivedPayment : 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Total Received")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "pay-s-lft-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"] + "/public/assets/images/payment-received-icon.svg",
    alt: ""
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-s-rit-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "$", state !== null && state !== void 0 && (_state$Pagination3 = state.Pagination) !== null && _state$Pagination3 !== void 0 && _state$Pagination3.SendPayment ? state === null || state === void 0 ? void 0 : (_state$Pagination4 = state.Pagination) === null || _state$Pagination4 === void 0 ? void 0 : _state$Pagination4.SendPayment : 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Total Sent")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "pay-s-lft-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"] + "/public//assets/images/payment-sent-icon.svg",
    alt: ""
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-s-rit-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "$", state !== null && state !== void 0 && (_state$Pagination5 = state.Pagination) !== null && _state$Pagination5 !== void 0 && _state$Pagination5.TotalAwaiting ? state === null || state === void 0 ? void 0 : (_state$Pagination6 = state.Pagination) === null || _state$Pagination6 === void 0 ? void 0 : _state$Pagination6.TotalAwaiting : 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Total Awaiting")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "pay-s-lft-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"] + "/public/assets/images/payment-awaiting-icon.svg",
    alt: ""
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "pay-s-rit-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "$", state !== null && state !== void 0 && (_state$Pagination7 = state.Pagination) !== null && _state$Pagination7 !== void 0 && _state$Pagination7.TotalWithdraw ? state === null || state === void 0 ? void 0 : (_state$Pagination8 = state.Pagination) === null || _state$Pagination8 === void 0 ? void 0 : _state$Pagination8.TotalWithdraw : 0), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Total Withdrawn")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "pay-s-lft-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"] + "/public/assets/images/total-withdraw-icon.svg",
    alt: ""
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (UserPaymentHeader);

/***/ }),

/***/ "./resources/js/User/Payments/Components/UserPaymentList/UserPaymentList.js":
/*!**********************************************************************************!*\
  !*** ./resources/js/User/Payments/Components/UserPaymentList/UserPaymentList.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var UserPaymentList = function UserPaymentList(props) {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, state !== null && state !== void 0 && state.Preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_5__["UserPaymentPreloader"], null) : (state === null || state === void 0 ? void 0 : state.UserPayments.length) > 0 ? state === null || state === void 0 ? void 0 : state.UserPayments.map(function (res, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res.id,
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-name-editable",
      "data-title": "Name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text payment-date-time-editable"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmn-cc-icon gray-bg-icon"
    }, currentUser.id == res.paid_user.id ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-sent-money-icon"
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-received-money-icon"
    })), " ", currentUser.id == res.paid_user.id ? res.to_user.name : res.paid_user.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-order-number-editable",
      "data-title": "Order Number"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"], {
      to: "/payments/invoice/".concat(Math.random())
    }, "#".concat(Math.random())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-date-time-editable",
      "data-title": "Event Date & Time"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, moment__WEBPACK_IMPORTED_MODULE_2___default()(res.event_date_time, 'YYYY-MM-DD HH:mm:ss').format('D MMM YYYY, h:mm A'), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-amount-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, "$", res.amount)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-status-editable",
      "data-title": "Status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "complite-cancel-status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "btn status-btn ".concat(res.amount_refunded ? 'withdrawn-status' : 'awaiting-status')
    }, res.amount_refunded ? "Refunded" : 'Awaiting'))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-*"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-center"
  }, "No Transactions here")))), state.OnScroll ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_5__["UserPaymentPreloader"], null) : '');
};

/* harmony default export */ __webpack_exports__["default"] = (UserPaymentList);

/***/ }),

/***/ "./resources/js/User/Payments/Payments.jsx":
/*!*************************************************!*\
  !*** ./resources/js/User/Payments/Payments.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Components_PaymetListHeader_PaymentListHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/PaymetListHeader/PaymentListHeader */ "./resources/js/User/Payments/Components/PaymetListHeader/PaymentListHeader.js");
/* harmony import */ var _Components_SearchPayment_SearchPayment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/SearchPayment/SearchPayment */ "./resources/js/User/Payments/Components/SearchPayment/SearchPayment.js");
/* harmony import */ var _Components_UserPaymentHeader_UserPaymentHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/UserPaymentHeader/UserPaymentHeader */ "./resources/js/User/Payments/Components/UserPaymentHeader/UserPaymentHeader.js");
/* harmony import */ var _Reducer_UserPaymentReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Reducer/UserPaymentReducer */ "./resources/js/User/Payments/Reducer/UserPaymentReducer.js");
/* harmony import */ var _UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./UserPaymentContext/UserPaymentContext */ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js");
/* harmony import */ var _Components_BankList_BankList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/BankList/BankList */ "./resources/js/User/Payments/Components/BankList/BankList.jsx");
var _this = undefined;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var Payments = function Payments(props) {
  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__["useReducer"])(_Reducer_UserPaymentReducer__WEBPACK_IMPORTED_MODULE_7__["default"], _Reducer_UserPaymentReducer__WEBPACK_IMPORTED_MODULE_7__["UserPaymentInitialState"]),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var self = _this;
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    _fetchUserPayment();

    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        handleScroll();
      }
    });
  }, [state.UserPaymentFilter, state.DateRangeEnd, state.DateRangeStart, state.UserPaymentSearch]);

  function _fetchUserPayment() {
    var data = {
      filterType: state.UserPaymentFilter,
      filterQuery: state.UserPaymentSearch,
      dateStart: state.DateRangeStart,
      dateEnd: state.DateRangeEnd,
      nextPage: ''
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._fetchAllPayments(data).then(function (res) {
      if (res.data.status == 200) {
        var _res$data, _res$data$data;

        dispatch({
          type: 'SET_PAYMENT_RESPONSE',
          payload: (_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$data = _res$data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.Payment.data
        });
        dispatch({
          type: 'SET_PAYMENT_PAGINATION',
          payload: res.data.data
        });
        dispatch({
          type: 'SET_PAYMENT_PRELOADER',
          payload: false
        });
        self = res.data.data;
      }

      if (res.data.status == 'failed') {
        dispatch({
          type: 'SET_PAYMENT_PRELOADER',
          payload: false
        });
      }
    })["catch"](function (error) {
      dispatch({
        type: 'SET_PAYMENT_PRELOADER',
        payload: false
      });
    });
  }

  var handelSearchSubmit = function handelSearchSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'SET_PAYMENT_PRELOADER',
      payload: true
    });

    _fetchUserPayment();
  };

  function handleScroll() {
    console.log("Scrolling", self);

    if (self.Payment.next_page_url != null) {
      dispatch({
        type: 'ON_SCROLL',
        payload: true
      });
      var data = {
        filterType: state.UserPaymentFilter,
        filterQuery: state.UserPaymentSearch,
        dateStart: state.DateRangeStart,
        dateEnd: state.DateRangeEnd,
        nextPage: self.Payment.current_page + 1
      };

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._fetchAllPayments(data).then(function (res) {
        if (res.data.status == 200) {
          var _res$data2, _res$data2$data;

          dispatch({
            type: 'SET_ON_SCROLL_RESPONSE',
            payload: (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : (_res$data2$data = _res$data2.data) === null || _res$data2$data === void 0 ? void 0 : _res$data2$data.Payment.data
          });
          dispatch({
            type: 'SET_PAYMENT_PAGINATION',
            payload: res.data.data
          });
          dispatch({
            type: 'SET_PAYMENT_PRELOADER',
            payload: false
          });
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
          self = res.data.data;
        }

        if (res.data.status == 'failed') {
          dispatch({
            type: 'SET_PAYMENT_PRELOADER',
            payload: false
          });
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
        }
      })["catch"](function (error) {
        dispatch({
          type: 'SET_PAYMENT_PRELOADER',
          payload: false
        });
        dispatch({
          type: 'ON_SCROLL',
          payload: false
        });
      });
    } else {
      dispatch({
        type: 'ON_SCROLL',
        payload: false
      });
    }
  }

  var PaymentContext = [state, dispatch, handelSearchSubmit];
  console.log(state);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_UserPaymentContext_UserPaymentContext__WEBPACK_IMPORTED_MODULE_8__["default"].Provider, {
    value: PaymentContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "payments-content-sec"
  }, state !== null && state !== void 0 && state.bankDetails ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_BankList_BankList__WEBPACK_IMPORTED_MODULE_9__["default"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "payments-status-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_UserPaymentHeader_UserPaymentHeader__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_SearchPayment_SearchPayment__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_PaymetListHeader_PaymentListHeader__WEBPACK_IMPORTED_MODULE_4__["default"], null))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Payments);

/***/ }),

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

/***/ "./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/User/Payments/UserPaymentContext/UserPaymentContext.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var UserPaymentContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (UserPaymentContext);

/***/ }),

/***/ "./resources/js/User/Reviews/Components/ReplyReviews/ReplyReviews.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/User/Reviews/Components/ReplyReviews/ReplyReviews.jsx ***!
  \****************************************************************************/
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../ReviewsContext/ReviewsContext */ "./resources/js/User/Reviews/ReviewsContext/ReviewsContext.js");
/* harmony import */ var _DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
/* harmony import */ var _StarRating_StarRating__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../StarRating/StarRating */ "./resources/js/User/Reviews/Components/StarRating/StarRating.jsx");
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













var ReplyReviews = function ReplyReviews(_ref) {
  var currentUserId = _ref.currentUserId,
      hostId = _ref.hostId,
      showHideDiv = _ref.showHideDiv,
      slotId = _ref.slotId,
      eventId = _ref.eventId,
      reviews = _ref.reviews,
      eventToken = _ref.eventToken,
      eventTitle = _ref.eventTitle,
      eventFile = _ref.eventFile,
      eventDate = _ref.eventDate,
      hostName = _ref.hostName,
      hostUserName = _ref.hostUserName,
      eventDuration = _ref.eventDuration,
      eventCost = _ref.eventCost;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_8__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var ReviewDuration = '00 Hour 00 Minute';
  var Hour = eventDuration.split(':')[0] > 1 ? eventDuration.split(':')[0] + ' Hours ' : eventDuration.split(':')[0] + ' Hour ';
  var Minutes = eventDuration.split(':')[1] > 1 ? eventDuration.split(':')[1] + " Minutes" : eventDuration.split(':')[1] + " Minute";
  ReviewDuration = Hour + Minutes;
  var Rating = parseFloat(reviews[0].rating);

  var replyToUser = function replyToUser(e) {
    e.preventDefault();
    var data = {
      eventId: eventId,
      slotId: slotId,
      hostId: hostId,
      userId: state.receiverId,
      comment: state.comment
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__["ApiService"]._addAndReplyReviews(data).then(function (res) {
      if (res.status == 200) {
        dispatch({
          type: 'RANDOM'
        });
        dispatch({
          type: 'INITIAL_SEND_REVIEW_STATE'
        });
      }

      console.log(res);
    })["catch"](function (error) {
      console.log(error);
    });
  };

  var editReview = function editReview(id) {
    if ("red-mode-" + id === state.EditModeId) {
      dispatch({
        type: 'EDIT_MODE_ID',
        payload: ""
      });
    } else {
      dispatch({
        type: 'EDIT_MODE_ID',
        payload: "red-mode-".concat(id)
      });
    }
  };

  var handleUpdate = function handleUpdate(e) {
    e.preventDefault();
    var data = {
      reviewId: state.reviewId,
      comment: state.comment,
      rating: state.rating,
      eventId: state.eventId,
      slotId: state.slotId
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__["ApiService"]._updateReviews(data).then( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch({
                  type: 'RANDOM'
                });
                dispatch({
                  type: 'INITIAL_STATE'
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }())["catch"](function (error) {});
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "c-table-row cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "cell review-details-editable",
    "data-title": "Event Details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/event?token=".concat(eventToken, "&event=").concat(eventId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
    className: "cmn-profile-pic event-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + eventFile[0].file_url,
    alt: eventTitle
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, eventTitle)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "cell review-date-time-editable",
    "data-title": "Event Date"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "c-table-text"
  }, eventDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "cell review-amount-editable",
    "data-title": "Amount"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "c-table-text"
  }, eventCost)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "cell review-duration-editable",
    "data-title": "Rating"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "c-table-text"
  }, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_7__["timeConverter"])(eventDuration, true))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "class": "cell review-hosted-by-editable",
    "data-title": "Hosted By"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "c-table-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/profile/".concat(hostUserName)
  }, hostName))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell review-write-editable text-right t-r-c-bx",
    "data-title": "Write Review"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "c-table-text text-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    href: void 0,
    value: "Show/Hide",
    className: "t-add-dd-c",
    onClick: function onClick() {
      return showHideDiv("reply-more".concat(slotId));
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-down-solid-arrow-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    id: "reply-more".concat(slotId),
    className: "events-users-show-bx",
    style: {
      display: 'none'
    }
  }, reviews.map(function (reviewRes) {
    var _reviewRes$sender, _reviewRes$sender$use, _reviewRes$sender2, _reviewRes$sender2$us, _reviewRes$sender3, _reviewRes$sender4, _reviewRes$receiver, _reviewRes$receiver$u, _reviewRes$receiver2, _reviewRes$receiver2$, _reviewRes$receiver3, _reviewRes$receiver4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      key: reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.id,
      id: "post-review-box".concat(reviewRes.id),
      "class": "write-review-content-bx new-toggle-dropdown post-review-box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
      "class": "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: reviewRes !== null && reviewRes !== void 0 && (_reviewRes$sender = reviewRes.sender) !== null && _reviewRes$sender !== void 0 && (_reviewRes$sender$use = _reviewRes$sender.user_profile) !== null && _reviewRes$sender$use !== void 0 && _reviewRes$sender$use.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + "".concat(reviewRes === null || reviewRes === void 0 ? void 0 : (_reviewRes$sender2 = reviewRes.sender) === null || _reviewRes$sender2 === void 0 ? void 0 : (_reviewRes$sender2$us = _reviewRes$sender2.user_profile) === null || _reviewRes$sender2$us === void 0 ? void 0 : _reviewRes$sender2$us.profile_picture) : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "user-name-rating"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, (reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.user_id) == currentUserId ? 'Me' : reviewRes === null || reviewRes === void 0 ? void 0 : (_reviewRes$sender3 = reviewRes.sender) === null || _reviewRes$sender3 === void 0 ? void 0 : _reviewRes$sender3.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      "class": "rating"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_9__["default"], {
      value: Rating
    })), (reviewRes === null || reviewRes === void 0 ? void 0 : (_reviewRes$sender4 = reviewRes.sender) === null || _reviewRes$sender4 === void 0 ? void 0 : _reviewRes$sender4.id) == currentUserId ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
      type: "button",
      "class": "btn link-btn review-edit-btn",
      onClick: function onClick() {
        editReview(reviewRes.id), dispatch({
          type: 'SET_EDIT_REVIEW',
          payload: {
            update: true,
            host: false,
            rating: Rating,
            eventId: eventId,
            slotId: slotId,
            comment: reviewRes.comment_to_host,
            reviewId: reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.id
          }
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
      className: "av av-edit-icon"
    })) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(reviewRes.created_at).local().format('DD MMM YYYY hh:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, reviewRes.comment_to_host, reviewRes.receiver == null && reviewRes.event_id == eventId && reviewRes.slot_id == slotId && currentUserId == hostId ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      "class": "link-btn",
      "data-toggle": "collapse",
      onClick: function onClick() {
        return dispatch({
          type: 'REPLY',
          payload: {
            receiverId: reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.user_id,
            commentId: reviewRes.id
          }
        });
      },
      href: "#review1".concat(reviewRes.id),
      role: "button",
      "aria-expanded": "false",
      "aria-controls": "collapseExample"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
      "class": "av av-reply-icon"
    }), " Reply") : ''), hostId != reviewRes.user_id && reviews.find(function (f) {
      return f.comment_id == reviewRes.id;
    }) ? "" : reviewRes !== null && reviewRes !== void 0 && reviewRes.receiver ? '' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "collapse",
      id: "review1".concat(reviewRes.id)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
      onSubmit: replyToUser
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "reply-textarea"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("textarea", {
      "class": "form-control",
      placeholder: "Comment",
      onChange: function onChange(e) {
        return dispatch({
          type: 'SET_COMMENT',
          payload: e.target.value
        });
      },
      value: state === null || state === void 0 ? void 0 : state.comment
    }, state === null || state === void 0 ? void 0 : state.comment), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
      type: "submit",
      disabled: state.comment ? false : true,
      "class": "btn default-btn"
    }, "Send")))))), reviewRes !== null && reviewRes !== void 0 && reviewRes.receiver ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "review-child-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "review-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
      "class": "n-m-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: reviewRes !== null && reviewRes !== void 0 && (_reviewRes$receiver = reviewRes.receiver) !== null && _reviewRes$receiver !== void 0 && (_reviewRes$receiver$u = _reviewRes$receiver.user_profile) !== null && _reviewRes$receiver$u !== void 0 && _reviewRes$receiver$u.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + "".concat(reviewRes === null || reviewRes === void 0 ? void 0 : (_reviewRes$receiver2 = reviewRes.receiver) === null || _reviewRes$receiver2 === void 0 ? void 0 : (_reviewRes$receiver2$ = _reviewRes$receiver2.user_profile) === null || _reviewRes$receiver2$ === void 0 ? void 0 : _reviewRes$receiver2$.profile_picture) : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["DefaultProfilePicture"],
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "rit-m-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "review-parent-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      "class": "user-name-rating"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, (reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.host_id) == currentUserId ? 'Me' : reviewRes === null || reviewRes === void 0 ? void 0 : (_reviewRes$receiver3 = reviewRes.receiver) === null || _reviewRes$receiver3 === void 0 ? void 0 : _reviewRes$receiver3.name), ((_reviewRes$receiver4 = reviewRes.receiver) === null || _reviewRes$receiver4 === void 0 ? void 0 : _reviewRes$receiver4.id) == currentUserId && reviewRes.receiver != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
      type: "button",
      "class": "btn link-btn review-edit-btn",
      "data-toggle": "modal",
      onClick: function onClick() {
        editReview(reviewRes.id), dispatch({
          type: 'SET_EDIT_REVIEW',
          payload: {
            update: true,
            host: true,
            rating: 0,
            eventId: eventId,
            slotId: slotId,
            comment: reviewRes.comment_to_user,
            reviewId: reviewRes === null || reviewRes === void 0 ? void 0 : reviewRes.id
          }
        });
      },
      "data-target": "#eidt-rating-review-popup"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
      "class": "av av-edit-icon"
    })) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(reviewRes.updated_at).local().format('DD MMM YYYY hh:mm A'), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, reviewRes.comment_to_user))))) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "write-review-content-bx new-toggle-dropdown ".concat("red-mode-" + reviewRes.id == state.EditModeId ? 'd-block' : 'd-none', " edit-reviews-collapse-dev")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "reply-textarea"
    }, state.host ? '' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      id: "half-stars-example",
      className: "half-stars-example"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "rating-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_StarRating_StarRating__WEBPACK_IMPORTED_MODULE_10__["default"], {
      value: parseInt(state === null || state === void 0 ? void 0 : state.rating),
      onChange: function onChange(newValue) {
        return dispatch({
          type: 'SET_RATING',
          payload: newValue
        });
      }
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
      onSubmit: handleUpdate
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "write-comment-rating"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("textarea", {
      className: "form-control",
      placeholder: "Write your Comment",
      onChange: function onChange(e) {
        return dispatch({
          type: 'SET_COMMENT',
          payload: e.target.value
        });
      },
      value: state === null || state === void 0 ? void 0 : state.comment
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
      type: "submit",
      disabled: state.host ? (state === null || state === void 0 ? void 0 : state.comment) != '' ? false : true : (state === null || state === void 0 ? void 0 : state.rating) > 0 && (state === null || state === void 0 ? void 0 : state.comment) != '' ? false : true,
      className: "btn default-btn"
    }, "Send")))))));
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (ReplyReviews);

/***/ }),

/***/ "./resources/js/User/Reviews/Components/SendReviews/SendReview.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/User/Reviews/Components/SendReviews/SendReview.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ReviewsContext/ReviewsContext */ "./resources/js/User/Reviews/ReviewsContext/ReviewsContext.js");
/* harmony import */ var _StarRating_StarRating__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../StarRating/StarRating */ "./resources/js/User/Reviews/Components/StarRating/StarRating.jsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var SendReview = function SendReview(_ref) {
  var currentUserId = _ref.currentUserId,
      showHideDiv = _ref.showHideDiv,
      hostId = _ref.hostId,
      slotId = _ref.slotId,
      eventId = _ref.eventId,
      eventToken = _ref.eventToken,
      eventTitle = _ref.eventTitle,
      eventFile = _ref.eventFile,
      eventDate = _ref.eventDate,
      hostName = _ref.hostName,
      hostUserName = _ref.hostUserName,
      eventDuration = _ref.eventDuration,
      eventCost = _ref.eventCost;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var formOnSubmit = function formOnSubmit(e) {
    e.preventDefault();
    var data = {
      eventId: eventId,
      slotId: slotId,
      hostId: hostId,
      comment: state.comment,
      rating: state.rating
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._addAndReplyReviews(data).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'RANDOM'
        });
        dispatch({
          type: 'INITIAL_SEND_REVIEW_STATE'
        });
      }
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-row cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-details-editable",
    "data-title": "Event Details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/event?token=".concat(eventToken, "&event=").concat(eventId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
    className: "cmn-profile-pic  event-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__["FileManagerPath"] + eventFile[0].file_url,
    alt: eventTitle
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, eventTitle)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-date-time-editable",
    "data-title": "Event Date"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, eventDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-amount-editable",
    "data-title": "Amount"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, eventCost)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-duration-editable",
    "data-title": "Rating"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_6__["timeConverter"])(eventDuration, true))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-hosted-by-editable",
    "data-title": "Hosted By"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/profile/".concat(hostUserName)
  }, currentUserId == hostId ? "Me" : hostName))), currentUserId == hostId ? '' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cell review-write-editable text-right",
    "data-title": "Write Review"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-table-text text-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    value: "Show/Hide",
    onClick: function onClick() {
      return showHideDiv("write-review-form".concat(slotId));
    }
  }, "Review"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "write-review-form".concat(slotId),
    className: "write-review-content-bx new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "reply-textarea"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "half-stars-example",
    className: "half-stars-example"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "rating-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StarRating_StarRating__WEBPACK_IMPORTED_MODULE_8__["default"], {
    value: 0,
    onChange: function onChange(newValue) {
      return dispatch({
        type: 'SET_RATING',
        payload: newValue
      });
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: formOnSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "write-comment-rating"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea", {
    className: "form-control",
    placeholder: "Write your Comment",
    onChange: function onChange(e) {
      return dispatch({
        type: 'SET_COMMENT',
        payload: e.target.value
      });
    },
    value: state === null || state === void 0 ? void 0 : state.comment
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "submit",
    disabled: (state === null || state === void 0 ? void 0 : state.rating) > 0 && (state === null || state === void 0 ? void 0 : state.comment) != '' ? false : true,
    className: "btn default-btn"
  }, "Send"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (SendReview);

/***/ }),

/***/ "./resources/js/User/Reviews/Components/StarRating/StarRating.jsx":
/*!************************************************************************!*\
  !*** ./resources/js/User/Reviews/Components/StarRating/StarRating.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-rating-stars-component */ "./node_modules/react-rating-stars-component/dist/react-stars.js");
/* harmony import */ var react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1__);



var StarRating = function StarRating(_ref) {
  var value = _ref.value,
      _onChange = _ref.onChange;
  var Rating = {
    size: 20,
    count: 5,
    color: "black",
    activeColor: "red",
    value: value,
    a11y: true,
    isHalf: true,
    emptyIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "rating__icon rating__icon--star fa fa-star",
      style: {
        color: '#a3a19c'
      }
    }),
    halfIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "rating__icon rating__icon--star fa fa-star-half"
    }),
    filledIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "rating__icon rating__icon--star fa fa-star"
    }),
    onChange: function onChange(newValue) {
      _onChange(newValue);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_rating_stars_component__WEBPACK_IMPORTED_MODULE_1___default.a, Rating));
};

/* harmony default export */ __webpack_exports__["default"] = (StarRating);

/***/ }),

/***/ "./resources/js/User/Reviews/Reviews.jsx":
/*!***********************************************!*\
  !*** ./resources/js/User/Reviews/Reviews.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_StarRating_StarRating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/StarRating/StarRating */ "./resources/js/User/Reviews/Components/StarRating/StarRating.jsx");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _ReviewsReducer_ReviewsReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReviewsReducer/ReviewsReducer */ "./resources/js/User/Reviews/ReviewsReducer/ReviewsReducer.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _Components_DefaultStars_DefaultStars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/DefaultStars/DefaultStars */ "./resources/js/User/Reviews/Components/DefaultStars/DefaultStars.jsx");
/* harmony import */ var _Components_SendReviews_SendReview__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Components/SendReviews/SendReview */ "./resources/js/User/Reviews/Components/SendReviews/SendReview.jsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ReviewsContext/ReviewsContext */ "./resources/js/User/Reviews/ReviewsContext/ReviewsContext.js");
/* harmony import */ var _Components_ReplyReviews_ReplyReviews__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Components/ReplyReviews/ReplyReviews */ "./resources/js/User/Reviews/Components/ReplyReviews/ReplyReviews.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/Comman/OnScrollLoader */ "./resources/js/components/Comman/OnScrollLoader.jsx");
/* harmony import */ var _components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/SkeletonLoading/SkeletonLoading */ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx");
var _this = undefined;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

















var Reviews = function Reviews(_ref) {
  var Active = _ref.Active,
      showHideDiv = _ref.showHideDiv;
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_11__["default"]);

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_ReviewsReducer_ReviewsReducer__WEBPACK_IMPORTED_MODULE_3__["default"], _ReviewsReducer_ReviewsReducer__WEBPACK_IMPORTED_MODULE_3__["initialState"]),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var self = _this;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    loadReviews();
    $(window).scroll(function () {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        handleScroll();
      }
    });
  }, [state === null || state === void 0 ? void 0 : state.random]);

  function loadReviews() {
    var data = {
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
      searchQuery: ''
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_12__["ApiService"]._fetchUserDashboardReviews(data).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'GET_REVIEWS_LIST',
          payload: res.data.data.data
        });
        dispatch({
          type: 'GET_PAGINATION',
          payload: res.data.data
        });
        dispatch({
          type: 'SET_PRELOADER',
          payload: false
        });
        self = res.data.data;
      } else {}
    })["catch"](function (error) {});
  }

  function handleScroll() {
    var _self;

    if (((_self = self) === null || _self === void 0 ? void 0 : _self.next_page_url) != null) {
      var _self2;

      dispatch({
        type: 'ON_SCROLL',
        payload: true
      });
      var data = {
        currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
        searchQuery: '',
        nextPage: ((_self2 = self) === null || _self2 === void 0 ? void 0 : _self2.current_page) + 1
      };

      _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_12__["ApiService"]._fetchUserDashboardReviews(data).then(function (res) {
        if (res.data.status == 200) {
          dispatch({
            type: 'GET_ON_SCROLL_REVIEWS_LIST',
            payload: res.data.data.data
          });
          dispatch({
            type: 'GET_PAGINATION',
            payload: res.data.data
          });
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
          self = res.data.data;
        } else {
          dispatch({
            type: 'ON_SCROLL',
            payload: false
          });
        }
      })["catch"](function (error) {
        dispatch({
          type: 'ON_SCROLL',
          payload: false
        });
      });
    }
  }

  var ReviewValue = [state, dispatch];
  console.log(state);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReviewsContext_ReviewsContext__WEBPACK_IMPORTED_MODULE_9__["default"].Provider, {
    value: ReviewValue
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "reviews-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "float-left"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit() {
      return console.log("Hello");
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    value: "All"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "All"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Upcoming"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Completed"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Cancelled"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Rescheduled"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Ongoing"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    type: "text",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-search-icon"
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-list review-events-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "custom-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "c-table-row table-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-details-editable"
  }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-date-time-editable"
  }, "Event Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-amount-editable"
  }, "Amount"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-duration-editable"
  }, "Duration"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-hosted-by-editable"
  }, "Hosted By"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cell review-write-editable text-right"
  }, "Write Review")), state.preloader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_14__["UserReviewsPreloader"], null) : state !== null && state !== void 0 && state.responseData ? state === null || state === void 0 ? void 0 : state.responseData.map(function (res) {
    var _res$reviews, _res$events, _res$events2, _res$events3, _res$events4, _res$events5, _res$events6, _res$events7, _res$events8, _res$events9, _res$events10, _res$events11, _res$events12, _res$events13, _res$events14, _res$events15, _res$events16;

    return ((_res$reviews = res.reviews) === null || _res$reviews === void 0 ? void 0 : _res$reviews.length) > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ReplyReviews_ReplyReviews__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: res.id,
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
      reviews: res === null || res === void 0 ? void 0 : res.reviews,
      showHideDiv: showHideDiv,
      slotId: res === null || res === void 0 ? void 0 : res.id,
      hostId: res === null || res === void 0 ? void 0 : (_res$events = res.events) === null || _res$events === void 0 ? void 0 : _res$events.event_create_user.id,
      eventDuration: (_res$events2 = res.events) === null || _res$events2 === void 0 ? void 0 : _res$events2.duration,
      eventCost: res.events.cost > 0 ? "$ ".concat(res.events.cost) : 'Free',
      hostUserName: res === null || res === void 0 ? void 0 : (_res$events3 = res.events) === null || _res$events3 === void 0 ? void 0 : _res$events3.event_create_user.username,
      hostName: res === null || res === void 0 ? void 0 : (_res$events4 = res.events) === null || _res$events4 === void 0 ? void 0 : _res$events4.event_create_user.name,
      eventId: (_res$events5 = res.events) === null || _res$events5 === void 0 ? void 0 : _res$events5.id,
      eventToken: (_res$events6 = res.events) === null || _res$events6 === void 0 ? void 0 : _res$events6.remember_token,
      eventFile: JSON.parse(res === null || res === void 0 ? void 0 : (_res$events7 = res.events) === null || _res$events7 === void 0 ? void 0 : _res$events7.event_files),
      eventTitle: res === null || res === void 0 ? void 0 : (_res$events8 = res.events) === null || _res$events8 === void 0 ? void 0 : _res$events8.event_title,
      eventDate: moment__WEBPACK_IMPORTED_MODULE_8___default()((res === null || res === void 0 ? void 0 : res.start_date) + (res === null || res === void 0 ? void 0 : res.start_time), 'DD-MM-YYYY h:mm A').format('D MMM YYYY h:mm A')
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_SendReviews_SendReview__WEBPACK_IMPORTED_MODULE_7__["default"], {
      key: res.id,
      currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
      showHideDiv: showHideDiv,
      slotId: res === null || res === void 0 ? void 0 : res.id,
      eventDuration: (_res$events9 = res.events) === null || _res$events9 === void 0 ? void 0 : _res$events9.duration,
      eventCost: res.events.cost > 0 ? "$ ".concat(res.events.cost) : 'Free',
      hostId: res === null || res === void 0 ? void 0 : (_res$events10 = res.events) === null || _res$events10 === void 0 ? void 0 : _res$events10.event_create_user.id,
      hostUserName: res === null || res === void 0 ? void 0 : (_res$events11 = res.events) === null || _res$events11 === void 0 ? void 0 : _res$events11.event_create_user.username,
      hostName: res === null || res === void 0 ? void 0 : (_res$events12 = res.events) === null || _res$events12 === void 0 ? void 0 : _res$events12.event_create_user.name,
      eventId: (_res$events13 = res.events) === null || _res$events13 === void 0 ? void 0 : _res$events13.id,
      eventToken: (_res$events14 = res.events) === null || _res$events14 === void 0 ? void 0 : _res$events14.remember_token,
      eventFile: JSON.parse(res === null || res === void 0 ? void 0 : (_res$events15 = res.events) === null || _res$events15 === void 0 ? void 0 : _res$events15.event_files),
      eventTitle: res === null || res === void 0 ? void 0 : (_res$events16 = res.events) === null || _res$events16 === void 0 ? void 0 : _res$events16.event_title,
      eventDate: moment__WEBPACK_IMPORTED_MODULE_8___default()((res === null || res === void 0 ? void 0 : res.start_date) + (res === null || res === void 0 ? void 0 : res.start_time), 'DD-MM-YYYY h:mm A').format('D MMM YYYY h:mm A')
    });
  }) : '', state.onScroll ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SkeletonLoading_SkeletonLoading__WEBPACK_IMPORTED_MODULE_14__["UserReviewsPreloader"], null) : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Comman_OnScrollLoader__WEBPACK_IMPORTED_MODULE_13__["default"], {
    active: state === null || state === void 0 ? void 0 : state.onScroll
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Reviews);

/***/ }),

/***/ "./resources/js/User/Reviews/ReviewsContext/ReviewsContext.js":
/*!********************************************************************!*\
  !*** ./resources/js/User/Reviews/ReviewsContext/ReviewsContext.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ReviewsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (ReviewsContext);

/***/ }),

/***/ "./resources/js/User/Reviews/ReviewsReducer/ReviewsReducer.js":
/*!********************************************************************!*\
  !*** ./resources/js/User/Reviews/ReviewsReducer/ReviewsReducer.js ***!
  \********************************************************************/
/*! exports provided: default, initialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  responseData: [],
  preloader: true,
  rating: 0,
  comment: '',
  commentId: '',
  userId: 0,
  reviewId: 0,
  eventId: 0,
  slotId: 0,
  receiverId: '',
  onScroll: false,
  sendReview: false,
  random: 0,
  update: false,
  host: false,
  EditModeId: ''
};

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'GET_REVIEWS_LIST':
      return _objectSpread(_objectSpread({}, state), {}, {
        responseData: payload
      });

    case 'GET_ON_SCROLL_REVIEWS_LIST':
      return _objectSpread(_objectSpread({}, state), {}, {
        responseData: [].concat(_toConsumableArray(state.responseData), _toConsumableArray(payload))
      });

    case 'GET_PAGINATION':
      return _objectSpread(_objectSpread({}, state), {}, {
        pagination: payload
      });

    case 'SET_PRELOADER':
      return _objectSpread(_objectSpread({}, state), {}, {
        preloader: payload
      });

    case 'SET_RATING':
      return _objectSpread(_objectSpread({}, state), {}, {
        rating: payload
      });

    case 'SET_COMMENT':
      return _objectSpread(_objectSpread({}, state), {}, {
        comment: payload
      });

    case 'RANDOM':
      return _objectSpread(_objectSpread({}, state), {}, {
        random: Math.random()
      });

    case 'INITIAL_SEND_REVIEW_STATE':
      return _objectSpread(_objectSpread({}, state), {}, {
        rating: 0,
        comment: ''
      });

    case 'REPLY':
      return _objectSpread(_objectSpread({}, state), {}, {
        commentId: payload.commentId,
        receiverId: payload.receiverId
      });

    case 'SET_EDIT_REVIEW':
      return _objectSpread(_objectSpread({}, state), {}, {
        update: payload.update,
        rating: payload.rating,
        comment: payload.comment,
        reviewId: payload.reviewId,
        eventId: payload.eventId,
        slotId: payload.slotId,
        host: payload.host
      });

    case 'SET_RATING_UPDATE':
      return _objectSpread(_objectSpread({}, state), {}, {
        updateRating: payload
      });

    case 'EDIT_MODE_ID':
      return _objectSpread(_objectSpread({}, state), {}, {
        EditModeId: payload
      });

    case 'SET_EDIT_COMMENT':
      return _objectSpread(_objectSpread({}, state), {}, {
        updateComment: payload
      });

    case 'ON_SCROLL':
      return _objectSpread(_objectSpread({}, state), {}, {
        onScroll: payload
      });

    case 'INITIAL_STATE':
      return _objectSpread(_objectSpread({}, state), {}, {
        rating: 0,
        comment: '',
        commentId: '',
        userId: 0,
        reviewId: 0,
        eventId: 0,
        slotId: 0,
        receiverId: '',
        onScroll: false,
        sendReview: false,
        random: 0,
        update: false,
        EditModeId: '',
        host: false
      });

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);


/***/ }),

/***/ "./resources/js/User/Setting/Setting.jsx":
/*!***********************************************!*\
  !*** ./resources/js/User/Setting/Setting.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");



var Setting = function Setting(_ref) {
  var Active = _ref.Active;
  var history = Object(react_router__WEBPACK_IMPORTED_MODULE_1__["useHistory"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notification-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notificaton-setting-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "noti-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec noti-setting-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "noti-back-icon-btn"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-message-number"
  }, "Email Settings "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "notificaton-setting-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Inbox messages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-1",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-1"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Reference site about Lorem Ipsum"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-2"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "giving information on its origins."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-3"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "You've visited this page many times"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-4",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-4"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Lorem Ipsum is filler text used by publishers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-5"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-5"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Lorem ipsum is a pseudo-Lati"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-6",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-6"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Inbox messages"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-7"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-7"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Reference site about Lorem Ipsum"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-8",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-8"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "giving information on its origins."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-9",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-9"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "You've visited this page many times"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-10"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-10"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Lorem Ipsum is filler text used by publishers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-11",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-11"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "setting-toggle-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Lorem Ipsum: usage Lorem ipsum"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "av-switch"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    className: "av-switch",
    id: "noti-setting-12",
    defaultChecked: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "noti-setting-12"
  }))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Setting);

/***/ }),

/***/ "./resources/js/components/Comman/OnScrollLoader.jsx":
/*!***********************************************************!*\
  !*** ./resources/js/components/Comman/OnScrollLoader.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");



var OnScrollLoader = function OnScrollLoader(_ref) {
  var active = _ref.active;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, active ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "content-loader"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      width: '50px',
      height: '50px'
    },
    src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"], "public/assets/images/loading.gif"),
    alt: "loading"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      minHeight: '50px'
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (OnScrollLoader);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext.jsx ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var JoinRequestContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext('');
/* harmony default export */ __webpack_exports__["default"] = (JoinRequestContext);

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