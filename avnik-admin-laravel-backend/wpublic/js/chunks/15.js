(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./resources/js/components/SkeletonLoading/SkeletonLoading.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/components/SkeletonLoading/SkeletonLoading.jsx ***!
  \*********************************************************************/
/*! exports provided: SlotsDetailsPreloader, UserEventsListSkeleton, UserReviewsPreloader, FavoriteListSkeleton, UserPaymentPreloader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotsDetailsPreloader", function() { return SlotsDetailsPreloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserEventsListSkeleton", function() { return UserEventsListSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserReviewsPreloader", function() { return UserReviewsPreloader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoriteListSkeleton", function() { return FavoriteListSkeleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPaymentPreloader", function() { return UserPaymentPreloader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-loading-skeleton */ "./node_modules/react-loading-skeleton/lib/index.js");
/* harmony import */ var react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");




var UserEventsListSkeleton = function UserEventsListSkeleton(_ref) {
  var count = _ref.count;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, [1, 2, 3, 4, 5].map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res,
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-details-editable",
      "data-title": "Event Name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 120
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-more-editable",
      "data-title": "Extend"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "event-more-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 15,
      width: 15
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-type-editable",
      "data-title": "Event Type"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 110
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-date-time-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-short-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 110
    }), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-amount-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 65
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-duration-editable",
      "data-title": "Duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 65
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-hosted-by-editable",
      "data-title": "Hosted By"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 110
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-status-editable",
      "data-title": "Status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "complite-cancel-status"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 110
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell event-message-editable",
      "data-title": "Message"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-delete-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "r-m-t-bx my-account-menu table-dd"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btn-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      height: 30,
      width: 20
    }))))));
  }));
};

var FavoriteListSkeleton = function FavoriteListSkeleton() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, [1, 2, 3, 4, 5].map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res,
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell favorite-icon-editable",
      "data-title": "Favorite"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 40,
      height: 30
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-event-details-editable",
      "data-title": "Event Details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-user-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 130,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-location-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 130,
      height: 30
    })));
  }));
};

var UserPaymentPreloader = function UserPaymentPreloader() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, [1, 2, 3, 4, 5].map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res,
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-order-name-editable",
      "data-title": "Name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text payment-date-time-editable"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      circle: true,
      width: 30,
      height: 30
    }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-order-number-editable",
      "data-title": "Order Number"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-date-time-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-amount-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-from-to-editable",
      "data-title": "Duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    })))));
  }));
};

var UserReviewsPreloader = function UserReviewsPreloader() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, [1, 2, 3, 4, 5].map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res,
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-order-name-editable",
      "data-title": "Name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text payment-date-time-editable"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      circle: true,
      width: 30,
      height: 30
    }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-order-number-editable",
      "data-title": "Order Number"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-date-time-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-amount-editable",
      "data-title": "Amount"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-from-to-editable",
      "data-title": "Duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell payment-from-to-editable",
      "data-title": "Duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell review-write-editable text-right",
      "data-title": "Write Review"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-text text-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 120,
      height: 30
    }))));
  }));
};

var SlotsDetailsPreloader = function SlotsDetailsPreloader() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, [1, 2, 3, 4, 5].map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      key: res
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-s-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-option"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "r-m-t-bx my-account-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btn-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 10,
      height: 20
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-time"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 200,
      height: 20
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ts-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_loading_skeleton__WEBPACK_IMPORTED_MODULE_1___default.a, {
      width: 84,
      height: 30
    })))));
  }));
};



/***/ }),

/***/ "./resources/js/utility/UtilityFunctions.js":
/*!**************************************************!*\
  !*** ./resources/js/utility/UtilityFunctions.js ***!
  \**************************************************/
/*! exports provided: showHideDiv, isValidURL, timeConverter, eventDetailsUrl, FindHoursMinutes, millisecondsConvert, convertMinutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showHideDiv", function() { return showHideDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidURL", function() { return isValidURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeConverter", function() { return timeConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventDetailsUrl", function() { return eventDetailsUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindHoursMinutes", function() { return FindHoursMinutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "millisecondsConvert", function() { return millisecondsConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertMinutes", function() { return convertMinutes; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);


function showHideDiv(ele) {
  var srcElement = document.getElementById(ele);

  if (srcElement != null) {
    if (srcElement.style.display == "block") {
      srcElement.style.display = "none";
    } else {
      srcElement.style.display = "block";
    }

    return false;
  }
}

function timeConverter(value, string) {
  var Duration = "0h 0min";

  if (string) {
    var Hour = value.split(":")[0] > 1 ? parseInt(value.split(":")[0]) + " h" : parseInt(value.split(":")[0]) > 0 ? " ".concat(parseInt(value.split(":")[0])) + " h" : "";
    var Minutes = value.split(":")[1] > 1 ? " ".concat(parseInt(value.split(":")[1])) + " min" : parseInt(value.split(":")[1]) > 0 ? " ".concat(parseInt(value.split(":")[1])) + " min" : "";
    Duration = Hour + Minutes;
    return Duration;
  } else {
    var seconds = value;
    var duration = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(seconds, "minutes");
    var formatted = duration.format("hh:mm:ss");
    return formatted;
  }
}

function convertMinutes(minutes) {
  if (minutes === null || minutes == 0 || isNaN(minutes)) return "Undefined";
  var h = Math.trunc(minutes / 60);
  var m = minutes % 60;
  var hDisplay = h > 0 ? h + (h === 1 ? " Hr " : " Hr ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " Min " : " Min ") : "";
  return hDisplay + mDisplay;
}

function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return res !== null;
}

function eventDetailsUrl(eventId, eventToken, slotId) {
  if (eventId && eventToken && slotId) {
    return "/event?token=".concat(eventToken, "&event=").concat(eventId, "&slot=").concat(slotId);
  } else {
    return "/event?token=".concat(eventToken, "&event=").concat(eventId);
  }
}

function FindHoursMinutes(minutes) {
  //create duration object from moment.duration
  var duration = moment__WEBPACK_IMPORTED_MODULE_0___default.a.duration(minutes, "minutes"); //calculate hours

  var hh = duration.years() * (365 * 24) + duration.months() * (30 * 24) + duration.days() * 24 + duration.hours(); //get minutes

  var mm = duration.minutes(); //return total time in hh:mm format

  return hh + ":" + mm;
}

function millisecondsConvert(ms) {
  var days = Math.floor(ms / (24 * 60 * 60 * 1000));
  var daysms = ms % (24 * 60 * 60 * 1000);
  var hours = Math.floor(daysms / (60 * 60 * 1000));
  var hoursms = ms % (60 * 60 * 1000);
  var minutes = Math.floor(hoursms / (60 * 1000));
  var minutesms = ms % (60 * 1000);
  var sec = Math.floor(minutesms / 1000);
  return days + ":" + hours + ":" + minutes + ":" + sec;
}



/***/ })

}]);