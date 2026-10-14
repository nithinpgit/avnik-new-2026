(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

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

/***/ "./resources/js/components/screens/CreateEvent/Components/Calendar/ChoseEventCalendar.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Calendar/ChoseEventCalendar.jsx ***!
  \************************************************************************************************/
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
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.js");
/* harmony import */ var _fullcalendar_core_locales_all__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fullcalendar/core/locales-all */ "./node_modules/@fullcalendar/core/locales-all.js");
/* harmony import */ var _fullcalendar_core_locales_all__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fullcalendar_core_locales_all__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ApiServer_TimeZoneJSON_TimeZone__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../ApiServer/TimeZoneJSON/TimeZone */ "./resources/js/ApiServer/TimeZoneJSON/TimeZone.js");
/* harmony import */ var _fullcalendar_daygrid_main_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fullcalendar/daygrid/main.css */ "./node_modules/@fullcalendar/daygrid/main.css");
/* harmony import */ var _fullcalendar_daygrid_main_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fullcalendar_daygrid_main_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fullcalendar_timegrid_main_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fullcalendar/timegrid/main.css */ "./node_modules/@fullcalendar/timegrid/main.css");
/* harmony import */ var _fullcalendar_timegrid_main_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fullcalendar_timegrid_main_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Events_Constant_CurrentUserEventContext_CurrentUserEventsContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../Events/Constant/CurrentUserEventContext/CurrentUserEventsContext */ "./resources/js/components/screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















 // const GlobalContext = lazy(() => import('../../../../../Global/Context/GlobalContext'));


var calendarComponentRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();

var ChoseEventCalendar = function ChoseEventCalendar(props) {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_13__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_14__["default"]),
      _useContext4 = _slicedToArray(_useContext3, 2),
      globalState = _useContext4[0],
      globalDispatch = _useContext4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    $('.fc-today-button').click(function () {
      dispatch({
        type: "ChangeCalendar",
        payload: {
          Type: "ChangeCalendar",
          SelectedCalendarDate: new Date()
        }
      });
    });
  }, []);

  var DeleteSlot = function DeleteSlot(slotId, eventId) {
    globalDispatch({
      type: "DeleteEvent",
      payload: {
        Type: "DeleteEvent",
        eventDeleteId: eventId,
        eventDeleteSlotId: slotId
      }
    });
    $("#DeleteFollowingEventModal").modal('show');
  };

  var EditEvent = function EditEvent(eventId, slotId) {
    globalDispatch({
      type: "EditEvent",
      payload: {
        Type: "EditEvent",
        EventEditId: eventId,
        eventSlotEditId: slotId
      }
    });
    $("#EditFollowingEventModal").modal('show');
  };

  var CancelEvent = function CancelEvent(eventId, slotId) {
    globalDispatch({
      type: "eventCancel",
      payload: {
        Type: "eventCancel",
        eventCancelId: eventId,
        eventCancelSlotId: slotId
      }
    });
    $("#CancelFollowingEventModal").modal('show');
  };

  var RightCalendarWeekDates = function RightCalendarWeekDates(arg) {
    console.log(arg, {
      startDate: moment__WEBPACK_IMPORTED_MODULE_10___default()(arg.view.activeStart).format('YYYY-MM-DD'),
      endDate: moment__WEBPACK_IMPORTED_MODULE_10___default()(arg.view.activeEnd).format('YYYY-MM-DD')
    }, 'rgcu');
    dispatch({
      type: "RightCalendarWeekDates",
      payload: {
        Type: "RightCalendarWeekDates",
        RightCalendarWeekDates: {
          startDate: moment__WEBPACK_IMPORTED_MODULE_10___default()(arg.view.activeStart).format('YYYY-MM-DD'),
          endDate: moment__WEBPACK_IMPORTED_MODULE_10___default()(arg.view.activeEnd).format('YYYY-MM-DD')
        }
      }
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var calendarApi = calendarComponentRef.current.getApi();
    calendarApi.gotoDate(moment__WEBPACK_IMPORTED_MODULE_10___default()(props.value.eventSingleDate, "DD-MM-YYYY").format("YYYY-MM-DD"));
  }, [props.value.eventSingleDate]);

  var _eventContent = function eventContent(e) {
    var _e$event$extendedProp;

    console.log(e, 'timetext');
    var booked = {
      minWidth: "100px"
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      type: "button",
      className: " text-light btn dropdown-toggle",
      "data-toggle": "dropdown",
      "data-display": "static",
      "aria-haspopup": "true",
      "aria-expanded": "false"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "r-m-t-bx cmn-new-toggle",
      style: booked
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-light",
      style: {
        fontSize: "12px"
      }
    }, e.event.title || 'No title'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text-light",
      style: {
        fontSize: "12px"
      }
    }, e.timeText))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "btn-group text-light",
      style: {
        marginTop: "-10px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dropdown-menu dropdown-menu-lg-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, ((_e$event$extendedProp = e.event.extendedProps) === null || _e$event$extendedProp === void 0 ? void 0 : _e$event$extendedProp.host) == 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: void 0,
      onClick: function onClick() {
        var _e$event, _e$event$extendedProp2;

        return EditEvent((_e$event = e.event) === null || _e$event === void 0 ? void 0 : (_e$event$extendedProp2 = _e$event.extendedProps) === null || _e$event$extendedProp2 === void 0 ? void 0 : _e$event$extendedProp2.eventId, e.event.id);
      },
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-edit-icon"
    }), " ", "Edit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      onClick: function onClick() {
        var _e$event2, _e$event2$extendedPro;

        return DeleteSlot(parseInt(e.event.id), parseInt((_e$event2 = e.event) === null || _e$event2 === void 0 ? void 0 : (_e$event2$extendedPro = _e$event2.extendedProps) === null || _e$event2$extendedPro === void 0 ? void 0 : _e$event2$extendedPro.eventId));
      },
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    }), " ", "Delete")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      "class": "av av-disable-icon"
    }), " ", "Disable")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      onClick: function onClick() {
        var _e$event3, _e$event3$extendedPro;

        return CancelEvent((_e$event3 = e.event) === null || _e$event3 === void 0 ? void 0 : (_e$event3$extendedPro = _e$event3.extendedProps) === null || _e$event3$extendedPro === void 0 ? void 0 : _e$event3$extendedPro.eventId, e.event.id);
      },
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    }), " ", "Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: void 0,
      onClick: function onClick() {
        return props.JoinRequestHandling(e.event.id);
      },
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-calendar-icon"
    }), " ", "Bookings")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    }), " ", "View")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      "data-toggle": "modal",
      href: "#share-profile-popup",
      className: "dropdown-item",
      onClick: function onClick() {
        var _e$event4, _e$event4$extendedPro, _e$event5, _e$event5$extendedPro;

        return globalDispatch({
          type: "share",
          payload: {
            Type: "share",
            Share: "".concat(window.location.hostname, "/event?token=").concat((_e$event4 = e.event) === null || _e$event4 === void 0 ? void 0 : (_e$event4$extendedPro = _e$event4.extendedProps) === null || _e$event4$extendedPro === void 0 ? void 0 : _e$event4$extendedPro.rememberToken, "&event=").concat((_e$event5 = e.event) === null || _e$event5 === void 0 ? void 0 : (_e$event5$extendedPro = _e$event5.extendedProps) === null || _e$event5$extendedPro === void 0 ? void 0 : _e$event5$extendedPro.eventId, "&slot=").concat(e.event.id)
          }
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-share-icon"
    }), " Share")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-delete-icon"
    }), " ", "Meet"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      "data-toggle": "modal",
      href: "#share-profile-popup",
      className: "dropdown-item",
      onClick: function onClick() {
        var _e$event6, _e$event6$extendedPro, _e$event7, _e$event7$extendedPro;

        return globalDispatch({
          type: "share",
          payload: {
            Type: "share",
            Share: "".concat(window.location.hostname, "/event?token=").concat((_e$event6 = e.event) === null || _e$event6 === void 0 ? void 0 : (_e$event6$extendedPro = _e$event6.extendedProps) === null || _e$event6$extendedPro === void 0 ? void 0 : _e$event6$extendedPro.rememberToken, "&event=").concat((_e$event7 = e.event) === null || _e$event7 === void 0 ? void 0 : (_e$event7$extendedPro = _e$event7.extendedProps) === null || _e$event7$extendedPro === void 0 ? void 0 : _e$event7$extendedPro.eventId, "&slot=").concat(e.event.id)
          }
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-share-icon"
    }), " Share")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "av av-logout-icon"
    }), " ", "Quit")))))));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fullcalendar_react__WEBPACK_IMPORTED_MODULE_1__["default"], {
    initialView: "timeGridWeek",
    plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_2__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_3__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__["default"]],
    events: props.events // dateClick={props.onClickSelect}
    ,
    selectable: true,
    longPressDelay: 1,
    selectLongPressDelay: 1,
    eventLongPressDelay: 1 // timeZone={TimeZone}
    ,
    progressiveEventRendering: true,
    nowIndicator: true,
    eventDragStart: function eventDragStart(info) {
      console.log(info);
    },
    select: props.onDragSelect,
    allDaySlot: false,
    views: {
      timeGridWeek: {
        titleFormat: {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }
      }
    },
    dayHeaderContent: function dayHeaderContent(args) {
      return moment__WEBPACK_IMPORTED_MODULE_10___default()(args.date).format("ddd Do");
    },
    slotDuration: "00:15:00" //headerToolbar={{ left: 'prev,next today',
    //     center: 'title',
    //     right: 'dayGridMonth,timeGridWeek,timeGridDay'}}
    ,
    selectMirror: true // viewDidMount={(info)=> {
    //         if(info.view.type == 'dayGridWeek') {
    //         info.view.calendar.setOption('firstDay', moment().toDate().getDay());
    //     } else if (info.view.type == 'dayGridMonth') {
    //         info.view.calendar.setOption('firstDay', 0);
    //     }
    // }
    // }
    ,
    ref: calendarComponentRef,
    selectMinDistance: 0,
    eventClick: function eventClick(info) {
      info.el.style.borderColor = "#d31111";
      console.log(info, 'event clicked');
    },
    selectOverlap: false,
    datesSet: RightCalendarWeekDates,
    rerenderDelay: 200 // themeSystem="bootstrap"
    ,
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
    eventContent: function eventContent(e) {
      return _eventContent(e);
    },
    initialEvents: moment__WEBPACK_IMPORTED_MODULE_10___default()(props.value.eventSingleDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    now: "".concat(moment__WEBPACK_IMPORTED_MODULE_10___default()().format("YYYY-MM-DD HH:mm:ss"))
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_12__["withRouter"])(ChoseEventCalendar));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/UpComingEvents/UpComingEvents.jsx":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/UpComingEvents/UpComingEvents.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");




var UpComingEvents = function UpComingEvents(_ref) {
  var events = _ref.events;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, (events === null || events === void 0 ? void 0 : events.lenght) > 0 ? events.map(function (res) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-list inbox-events-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: res.id,
      className: "u-p-files-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "custom-table"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-event-details-editable",
      "data-title": "Event Details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-user-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "cmn-profile-pic"
    }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"], "/public/assets/images/user-1.jpg"),
      alt: "event"
    }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Hip Hop Tutorial")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-location-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-textt"
    }, "17 June 2020  04:45 PM"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-event-details-editable",
      "data-title": "Event Details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "message-user-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
      className: "cmn-profile-pic"
    }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"], "/public/assets/images/user-1.jpg"),
      alt: ""
    }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Hip Hop Tutorial")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cell fav-location-editable",
      "data-title": "Event Date"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "c-table-textt"
    }, "17 June 2020  04:45 PM"))))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "No upcoming scheduled event"));
};

/* harmony default export */ __webpack_exports__["default"] = (UpComingEvents);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Pages/CreateEventPageSection.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Pages/CreateEventPageSection.jsx ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Calendar_ChoseEventCalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/Calendar/ChoseEventCalendar */ "./resources/js/components/screens/CreateEvent/Components/Calendar/ChoseEventCalendar.jsx");
/* harmony import */ var react_calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-calendar */ "./node_modules/react-calendar/dist/esm/index.js");
/* harmony import */ var react_calendar_dist_Calendar_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-calendar/dist/Calendar.css */ "./node_modules/react-calendar/dist/Calendar.css");
/* harmony import */ var react_calendar_dist_Calendar_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_calendar_dist_Calendar_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Components_UpComingEvents_UpComingEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/UpComingEvents/UpComingEvents */ "./resources/js/components/screens/CreateEvent/Components/UpComingEvents/UpComingEvents.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Global/Context/GlobalContext */ "./resources/js/Global/Context/GlobalContext.js");
/* harmony import */ var _CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var CreateEventPageSection = function CreateEventPageSection() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Global_Context_GlobalContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      globalState = _useContext2[0],
      globalDispatch = _useContext2[1];

  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext4 = _slicedToArray(_useContext3, 11),
      state = _useContext4[0],
      dispatch = _useContext4[1],
      resetFormState = _useContext4[2],
      onChangeCalendar = _useContext4[3],
      onDragSelect = _useContext4[4],
      removeSetImage = _useContext4[5],
      removeSetFiles = _useContext4[6],
      MyEventsList = _useContext4[7],
      JoinRequestPopupHandling = _useContext4[8],
      handleFormSubmit = _useContext4[9],
      CalenderDots = _useContext4[10];

  console.log("events create event page section");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "mid-content-sec in-page-content-sec events-calender"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "calender-events-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-8"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "main-calender-event-view"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "white-content-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "event-calender-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Calendar_ChoseEventCalendar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    events: state === null || state === void 0 ? void 0 : state.showEventsOnCalendar,
    value: state,
    JoinRequestHandling: JoinRequestPopupHandling,
    onDragSelect: onDragSelect
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-lg-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "month-wise-calendar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "white-content-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_calendar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    tileContent: CalenderDots,
    showNavigation: true,
    onChange: onChangeCalendar,
    value: state.SelectedCalendarDate
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "dot-instructions-point"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-i-p-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "I am host"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-i-p-bx d-i-green"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "I am participant"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "d-i-p-bx d-i-blue"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Both"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "upcoming-events"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "white-content-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "float-left"
  }, "Bookings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    to: "/bookings",
    className: "link-btn float-right"
  }, "See all...")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_UpComingEvents_UpComingEvents__WEBPACK_IMPORTED_MODULE_4__["default"], {
    events: globalState.MyUpComing
  })))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(CreateEventPageSection));

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

/***/ })

}]);