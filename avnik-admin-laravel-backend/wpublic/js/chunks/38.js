(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[38],{

/***/ "./resources/js/components/Comman/TimePicker.js":
/*!******************************************************!*\
  !*** ./resources/js/components/Comman/TimePicker.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);



var TimePicker = function TimePicker(props) {
  function isEarlierThanEndLimit(timeValue, endLimit, lastValue) {
    var timeValueIsEarlier = moment__WEBPACK_IMPORTED_MODULE_1___default()(timeValue, 'h:mm A').diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(endLimit, 'h:mm A')) < 0;
    var timeValueIsLaterThanLastValue = lastValue === undefined ? true : moment__WEBPACK_IMPORTED_MODULE_1___default()(lastValue, 'h:mm A').diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeValue, 'h:mm A')) < 0;
    return timeValueIsEarlier && timeValueIsLaterThanLastValue;
  }

  var timeValue = props.beginLimit || "12:00AM";
  var lastValue;
  var endLimit = props.endLimit || "11:59PM";
  var step = props.step || 15;
  var options = [];
  var Hours = [];
  var Minutes = []; // options.push(<option key={timeValue} value={timeValue}>{timeValue}</option>);
  // while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
  //     lastValue = timeValue;
  //     timeValue = moment(timeValue, 'h:mm A').add(step, 'minutes').format('h:mm A');
  //     if(props?.minTime!=undefined){
  //         if(moment(timeValue,'h:mm A')>=moment(props?.minTime, 'h:mm A')){
  //             options.push(<option key={timeValue} value={timeValue} selected={props.defaultValue===timeValue?true:false}  >{timeValue}</option>)
  //         }
  //     }else{
  //         options.push(<option key={timeValue} value={timeValue} selected={props.defaultValue===timeValue?true:false}  >{timeValue}</option>)
  //     }
  // }

  for (var i = 1; i < 13; i++) {
    Hours.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: i
    }, i, " hr"));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    placeholder: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('hh:mm a'),
    onClick: function onClick() {
      return $('#TimeChangeModal').modal('show');
    },
    value: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('hh:mm a'),
    readOnly: true
  }));
}; // #endregion


/* harmony default export */ __webpack_exports__["default"] = (TimePicker);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/EventAddTime/EventAddTime.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/EventAddTime/EventAddTime.jsx ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _Comman_TimePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Comman/TimePicker */ "./resources/js/components/Comman/TimePicker.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var EventAddTime = function EventAddTime() {
  var _state$eventDurationS, _JSON$stringify;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var onClickFormGroupButton = function onClickFormGroupButton(index) {
    var eventDurationSlots = _toConsumableArray(state.eventDurationSlots);

    var TimeOverlappedIndex = _toConsumableArray(state.TimeOverlappedIndex);

    eventDurationSlots.splice(index, 1);
    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        eventDurationSlots: eventDurationSlots,
        TimeOverlappedIndex: TimeOverlappedIndex.filter(function (res) {
          return res != index;
        })
      }
    });
  };

  var onChangeFormGroupInput = function onChangeFormGroupInput(index, event) {
    var eventDurationSlots = _toConsumableArray(state.eventDurationSlots);

    if (event.target.name === "startTime" || event.target.name === "endTime") {
      var duration = moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].endTime, "h:mm A").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(eventDurationSlots[index].startTime, "h:mm A"))).minutes();
      eventDurationSlots[index].eventDuration = duration;
      eventDurationSlots[index][event.target.name] = moment__WEBPACK_IMPORTED_MODULE_1___default()(event.target.value, "h:mm A").format("HH:mm:ss");
    } else if (event.target.name === "cost" || event.target.name === "eventCostType") {
      if (event.target.name === "cost" && event.target.value <= 0) {
        eventDurationSlots[index][event.target.name] = event.target.value;
        eventDurationSlots[index]["eventCostType"] = "free";
      } else if (event.target.name === "eventCostType" && event.target.value === "paid") {
        eventDurationSlots[index][event.target.name] = event.target.value;
        eventDurationSlots[index]["cost"] = 1;
      } else {
        eventDurationSlots[index][event.target.name] = event.target.value;
      }
    } else {
      eventDurationSlots[index][event.target.name] = event.target.value;
    }

    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        eventDurationSlots: eventDurationSlots
      }
    });
  };

  console.log(state === null || state === void 0 ? void 0 : state.eventDurationSlots, "add time on create");

  var onAddTime = function onAddTime() {
    var startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
    var endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");

    if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 0) {
      startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":15:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
      endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":15:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").add(15, "minutes").format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 15) {
      startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":30:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
      endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":30:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").add(15, "minutes").format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 30) {
      startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":45:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
      endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":45:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").add(15, "minutes").format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") > 45) {
      startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":59:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
      endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":00:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").add(1, "hour").add(15, "minutes").format("DD-MM-YYYY HH:mm:ss");
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()().format("m") == 0) {
      startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":00:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss");
      endTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate + " " + moment__WEBPACK_IMPORTED_MODULE_1___default()(moment__WEBPACK_IMPORTED_MODULE_1___default()().format("HH") + ":15:" + moment__WEBPACK_IMPORTED_MODULE_1___default()().format("ss"), "HH:mm:ss").format("HH:mm:ss"), "DD-MM-YYYY HH:mm:ss").add(15, "minutes").format("DD-MM-YYYY HH:mm:ss");
    }

    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        eventDurationSlots: [].concat(_toConsumableArray(state.eventDurationSlots), [{
          startDateTime: startTime,
          endDateTime: endTime,
          cost: 0,
          eventCostType: "free",
          eventDuration: 15,
          seats: 1,
          interval: 0,
          ChangeTime: {
            time: moment__WEBPACK_IMPORTED_MODULE_1___default()().format("DD-MM-YYYY HH:mm:ss"),
            index: 0,
            type: "none"
          }
        }])
      }
    });
  };

  var changeTime = function changeTime(time, index, type) {
    $("#TimeChangeModal").modal({
      backdrop: "static",
      keyboard: false
    });
    dispatch({
      type: "ChangeTime",
      payload: {
        Type: "ChangeTime",
        ChangeTime: {
          time: time,
          index: index,
          type: type
        }
      }
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var overlapped = false;
    var overlappedIndex = [-1, -1];
    var timeCollection = state.eventDurationSlots;
    var iterations = timeCollection.length;

    if (state.eventTitle != '') {
      for (var i = 0; i < timeCollection.length; i++) {
        for (var a = 0; a < timeCollection.length; a++) {
          if (i == a) {
            continue;
          } //if the start and end date are both the same with the comparison data.


          if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") === moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].endDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss") == moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].endDateTime, "DD-MM-YYYY HH:mm:ss")) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") === moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].endDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss").isBetween(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].startDateTime, "DD-MM-YYYY HH:mm:ss"), moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].endDateTime, "DD-MM-YYYY HH:mm:ss")) || moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].endDateTime, "DD-MM-YYYY HH:mm:ss").isBetween(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].startDateTime, "DD-MM-YYYY HH:mm:ss"), moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[a].endDateTime, "DD-MM-YYYY HH:mm:ss"))) {
            //checker to check if date and time are in between..
            //making sure also that the time belongs to the crew
            // if (!--iterations){
            toastr['error']('Time conflict'); // }

            overlappedIndex.push(i);
            overlappedIndex.push(a);
            overlapped = true;
          } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].endDateTime, "DD-MM-YYYY HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss"), 'Hours') > 6) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else {// overlappedIndex.filter(res=>res!=i||a);
          }
        }
      }
    } else {
      overlapped = true;
    } // if (overlapped) {
    //   dispatch({
    //     type: "TimeOverlapped",
    //     payload: { Type: "TimeOverlapped", TimeOverlapped: overlapped,TimeOverlappedIndex:overlappedIndex },
    //   });
    //  } else if (!overlapped) {


    dispatch({
      type: "TimeOverlappedFN",
      payload: {
        Type: "TimeOverlappedFN",
        TimeOverlapped: overlapped,
        TimeOverlappedIndex: overlappedIndex
      }
    }); // }

    console.log(overlapped, JSON.stringify(state.eventDurationSlots), "overlapped");
  }, [state.TimeOverlappedIndexSave, (_state$eventDurationS = state.eventDurationSlots) === null || _state$eventDurationS === void 0 ? void 0 : _state$eventDurationS.length, (_JSON$stringify = JSON.stringify(state.eventDurationSlots)) === null || _JSON$stringify === void 0 ? void 0 : _JSON$stringify.length, state.eventTitle]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "t-c-s-row float-right mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tcs-col tcs-add-remove"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "dynamicForm__itemButton  default-btn js-btn-prev" // type="button"
    // onClick={()=>,console.log(state.eventDurationSlots,'adddededed')}
    ,
    onClick: onAddTime // onClick={index === state.eventDurationSlots.length-1 ? onClickButtonAdder :()=> onClickFormGroupButton(index)}
    // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
    ,
    tabIndex: "-1",
    style: {
      top: "-1px"
    }
  }, "Add"))), state.eventDurationSlots.map(function (value, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "bdr-frm-bx tcs-outer ".concat(state.TimeOverlappedIndex.find(function (res) {
        return res.toString() == index.toString();
      }) == false ? "border border-5 border-danger rounded" : state.TimeOverlappedIndex.find(function (res) {
        return res.toString() == index.toString();
      }) ? "border border-5 border-danger rounded" : ""),
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "add-time-input"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "t-c-s-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-from"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "From"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "dynamicForm__itemInput form-control custom-select-bx",
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return changeTime(moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.startDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss"), index, "start");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      selected: true,
      disabled: true
    }, moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.startDateTime, "DD-MM-YYYY HH:mm:ss").format("hh:mm a")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-to"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "To"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "dynamicForm__itemInput form-control custom-select-bx",
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return changeTime(moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.endDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss"), index, "end");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      selected: true
    }, moment__WEBPACK_IMPORTED_MODULE_1___default()(value === null || value === void 0 ? void 0 : value.endDateTime, "DD-MM-YYYY HH:mm:ss").format("hh:mm a")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-cost"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "b-f-in"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "Cost"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "free-paid-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-select-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "form-control custom-select-bx",
      name: "eventCostType",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      style: {
        width: "75px"
      },
      value: value.eventCostType
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "free"
    }, " ", "Free"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "paid"
    }, " ", "Paid"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "flex-input-bx tcs-cost-input",
      style: value.eventCostType == "free" ? {
        display: "none"
      } : {
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      className: "form-control",
      name: "cost",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      value: value.cost
    })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-seats"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "label-small-h"
    }, "Seats"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      min: "1",
      max: "20",
      onChange: function onChange(e) {
        return onChangeFormGroupInput(index, e);
      },
      className: "dynamicForm__itemInput form-control",
      placeholder: "1",
      name: "seats",
      value: value.seats
    })), index == 0 ? "" : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tcs-col tcs-add-remove"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "dynamicForm__itemButton btn default-btn js-btn-prev ",
      type: "button",
      onClick: function onClick() {
        return onClickFormGroupButton(index);
      } // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
      ,
      tabIndex: "-1",
      style: {
        top: "-1px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-danger"
    }, "x"))))));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (EventAddTime);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);



var ConflictsEvents = function ConflictsEvents(_ref) {
  var events = _ref.events,
      id = _ref.id;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: id || 'Conflicts-Events-modal',
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "You have the following conflicting event(s)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row main-div-con"
  }, (events === null || events === void 0 ? void 0 : events.length) > 0 ? events.map(function (res) {
    var _res$events;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-12 col-sm-12"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "repeat-box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "repeat-on-bx repeat-select-date-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, res === null || res === void 0 ? void 0 : (_res$events = res.events) === null || _res$events === void 0 ? void 0 : _res$events.event_title, " ", moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : res.start_date_time).format('DD MMM YYYY , hh:mm a'), " - ", moment__WEBPACK_IMPORTED_MODULE_1___default()(res === null || res === void 0 ? void 0 : res.end_date_time).format('hh:mm a'), " $", res === null || res === void 0 ? void 0 : res.cost))))));
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, " There is no conflict events")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "main-button-con"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "btn default-btn ",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, "Ok"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ConflictsEvents);

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/RepeatEveryModal/RepeatEvery.jsx":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/RepeatEveryModal/RepeatEvery.jsx ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Classes/FindDateTime/FindDateTime */ "./resources/js/components/screens/CreateEvent/Classes/FindDateTime/FindDateTime.jsx");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-multi-date-picker */ "./node_modules/react-multi-date-picker/build/index.js");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-multi-date-picker/plugins/date_panel */ "./node_modules/react-multi-date-picker/plugins/date_panel.js");
/* harmony import */ var react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var RepeatEvery = function RepeatEvery() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      repeatNumberError = _useState2[0],
      setRepeatNumberError = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      eventTillDateError = _useState4[0],
      setEventTillDateError = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState6 = _slicedToArray(_useState5, 2),
      chooseDateError = _useState6[0],
      setChooseDateError = _useState6[1];

  var onRepeatChange = function onRepeatChange(re, eve, choose) {
    setRepeatNumberError(re);
    setEventTillDateError(eve);
    setChooseDateError(choose);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (parseInt(state.repeatNumber) > 0 && state.eventRepeatBy === "Weeks") {
      var Weeks = [];

      if (state.sunday) {
        Weeks.push('0');
      }

      if (state.monday) {
        Weeks.push('1');
      }

      if (state.tuesday) {
        Weeks.push('2');
      }

      if (state.wednesday) {
        Weeks.push('3');
      }

      if (state.thursday) {
        Weeks.push('4');
      }

      if (state.friday) {
        Weeks.push('5');
      }

      if (state.saturday) {
        Weeks.push('6');
      }

      var findWeekDates = _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].findWeeksBetweenTwoDatesDays(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY'), parseInt(state.repeatNumber), Weeks);

      if ((findWeekDates === null || findWeekDates === void 0 ? void 0 : findWeekDates.length) > 0) {
        dispatch({
          type: 'SelectedStartDate',
          payload: {
            Type: 'SelectedStartDate',
            SelectedStartDate: findWeekDates,
            eventRepeatDays: Weeks,
            SelectedEndDate: findWeekDates
          }
        });
      }

      console.log(findWeekDates, 'findDate By weeks');
    }

    return function () {};
  }, [state.eventRepeatBy, state.repeatNumber, state.sunday, state.monday, state.tuesday, state.wednesday, state.thursday, state.friday, state.saturday]);

  function repeatValidation() {
    if (state.eventRepeatBy == "Weeks") {
      if (parseInt(state.repeatNumber) > 0) {
        $('#repeat-event-popup').modal('hide');
        dispatch({
          type: 'eventRepeatSave',
          payload: {
            Type: 'eventRepeatSave',
            eventRepeatSave: true
          }
        });
      } else {
        toastr["error"]('please enter repeat number grater then 0');
      }
    } else if (state.eventRepeatBy == "TillDate") {
      if (state.eventTillDate) {
        $('#repeat-event-popup').modal('hide');
        dispatch({
          type: 'eventRepeatSave',
          payload: {
            Type: 'eventRepeatSave',
            eventRepeatSave: true
          }
        });
      } else {
        toastr["error"]('sorry you have,t selected any TillDate');
      }
    } else if (state.eventRepeatBy == "MultipleDate") {
      var _state$SelectedStartD;

      dispatch({
        type: 'eventRepeatSave',
        payload: {
          Type: 'eventRepeatSave',
          eventRepeatSave: true
        }
      });

      if (((_state$SelectedStartD = state.SelectedStartDate) === null || _state$SelectedStartD === void 0 ? void 0 : _state$SelectedStartD.length) > 1) {
        $('#repeat-event-popup').modal('hide');
      }
    } else {
      $('#repeat-event-popup').modal('hide');
      toastr["error"]("you are not selected any multiple option");
    }
  }

  var RepeatDays = function RepeatDays() {
    var onChangeHandel = function onChangeHandel(e) {
      setTimeout(function () {
        if (state.repeatNumber == 0 && state.eventRepeatBy === "Weeks") {
          dispatch({
            type: 'REP_BY_DAY',
            payload: {
              Type: 'REP_BY_DAY',
              sunday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Sunday" ? true : false,
              monday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Monday" ? true : false,
              tuesday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Tuesday" ? true : false,
              wednesday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Wednesday" ? true : false,
              thursday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Thursday" ? true : false,
              friday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Friday" ? true : false,
              saturday: moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc().format('dddd') === "Saturday" ? true : false
            }
          });
        }

        if (state.repeatNumber > 0 && state.eventRepeatBy === "Weeks") {
          var FindDays = [];

          if (state.sunday) {
            FindDays.push('Sunday');
          }

          if (state.monday) {
            FindDays.push('Monday');
          }

          if (state.tuesday) {
            FindDays.push('Tuesday');
          }

          if (state.wednesday) {
            FindDays.push('Wednesday');
          }

          if (state.thursday) {
            FindDays.push('Thursday');
          }

          if (state.friday) {
            FindDays.push('Friday');
          }

          if (state.saturday) {
            FindDays.push('Saturday');
          }

          dispatch({
            type: 'eventSelectedDays',
            payload: {
              Type: 'eventSelectedDays',
              eventSelectedDays: FindDays
            }
          });
          setTimeout(function () {
            var repeatNumber = state.repeatNumber,
                eventRepeatBy = state.eventRepeatBy,
                eventTillDate = state.eventTillDate,
                eventSelectedDays = state.eventSelectedDays; // let Dates = FindDateTime.findDateByDaysWeeks(repeatNumber, eventRepeatBy, eventTillDate, eventSelectedDays);
            // if (Dates?.length > 0) {
            //     dispatch({ type: 'SelectedStartDate', payload: { Type: 'SelectedStartDate', SelectedStartDate: Dates, SelectedEndDate: Dates } });
            // }
          }, 200);
        }
      }, 200);
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            sunday: !state.sunday
          }
        });
        onChangeHandel(e);
      },
      name: "sunday",
      defaultChecked: state.sunday,
      value: "Sunday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "S")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            monday: !state.monday
          }
        });
        onChangeHandel(e);
      },
      name: "monday",
      defaultChecked: state.monday,
      value: "Monday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "M")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "tuesday",
      defaultChecked: state.tuesday,
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            tuesday: !state.tuesday
          }
        });
        onChangeHandel(e);
      },
      value: "Tuesday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "T")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "wednesday",
      defaultChecked: state.wednesday,
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            wednesday: !state.wednesday
          }
        });
        onChangeHandel(e);
      },
      value: "Wednesday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "W")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "thursday",
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            thursday: !state.thursday
          }
        });
        onChangeHandel(e);
      },
      defaultChecked: state.thursday,
      value: "Thursday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "T")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "friday",
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            friday: !state.friday
          }
        });
        onChangeHandel(e);
      },
      defaultChecked: state.friday,
      value: "Friday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "F")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      name: "saturday",
      onChange: function onChange(e) {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            saturday: !state.saturday
          }
        });
        onChangeHandel(e);
      },
      defaultChecked: state.saturday,
      value: "Saturday"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "S")))));
  };

  var resetPopup = function resetPopup() {
    return dispatch({
      type: 'eventTillDate',
      payload: {
        Type: 'eventTillDate',
        eventRepeatSave: false,
        eventRepeat: false,
        eventTillDate: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(15, 'days').format('YYYY-MM-DD'),
        repeatNumber: 1,
        eventRepeatBy: '',
        SelectedStartDate: [moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY').format('DD-MM-YYYY')],
        SelectedEndDate: [moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY').format('DD-MM-YYYY')]
      }
    });
  };

  var EventTillDate = function EventTillDate(e) {
    var date = _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].findDaysBetweenTwoDates(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), e.target.value);
    dispatch({
      type: e.target.name,
      payload: {
        Type: e.target.name,
        eventTillDate: e.target.value,
        SelectedStartDate: date,
        SelectedEndDate: date,
        eventRepeatBy: 'TillDate',
        eventRepeatDays: [],
        repeatNumber: 1
      }
    });
  };

  var setMultipleChoose = function setMultipleChoose(e) {
    var dataObj = [];

    if ((e === null || e === void 0 ? void 0 : e.length) > 0) {
      e.map(function (res) {
        return dataObj.push(moment__WEBPACK_IMPORTED_MODULE_1___default()(res.format(), 'DD-MM-YYYY').format('DD-MM-YYYY'));
      });
    }

    dispatch({
      type: "setMultipleChoose",
      payload: {
        Type: "setMultipleChoose",
        SelectedStartDate: dataObj,
        eventRepeatDays: [],
        repeatNumber: 1,
        SelectedEndDate: dataObj
      }
    });
    console.log(dataObj, e, 'res');
  }; // const multipleDateValue=[]
  // if(state.SelectedStartDate?.length>0){
  //     state.SelectedStartDate.map((res)=>
  //         multipleDateValue.push(moment(res,'YYYY-MM-DD').format('D MMM YY'))
  //     )   
  // }


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: "repeat-event-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close",
    onClick: function onClick() {
      return !(state !== null && state !== void 0 && state.eventRepeatSave) && resetPopup();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "eventRepeatBy",
    onChange: function onChange() {
      onRepeatChange(false, true, false), dispatch({
        type: "eventRepeatBy",
        payload: {
          Type: 'eventRepeatBy',
          eventRepeatBy: 'Weeks',
          eventTillDate: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(15, 'days').format('YYYY-MM-DD'),
          SelectedStartDate: [],
          SelectedEndDate: []
        }
      });
    },
    checked: state.eventRepeatBy === 'Weeks' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Repeat for")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "week-day-number-select"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "number",
    className: "form-control",
    onChange: function onChange(e) {
      if (parseInt(e.target.value) > 0) {
        if (e.target.value <= 8) {
          dispatch({
            type: e.target.name,
            payload: {
              Type: e.target.name,
              repeatNumber: e.target.value
            }
          });
        }
      } else {
        dispatch({
          type: e.target.name,
          payload: {
            Type: e.target.name,
            repeatNumber: 1
          }
        });
      }
    },
    name: "repeatNumber",
    placeholder: "0",
    min: "1",
    max: "8",
    title: "Repeat",
    disabled: repeatNumberError || state.eventRepeatBy == "Weeks" ? false : true,
    value: state.repeatNumber
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: function onChange(e) {
      return dispatch({
        type: e.target.name,
        payload: {
          Type: e.target.name,
          eventRepeatBy: e.target.value
        }
      });
    },
    name: "eventRepeatBy",
    disabled: repeatNumberError,
    value: state.eventRepeatBy
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "Weeks"
  }, state.repeatNumber > 1 ? 'Weeks' : 'Week')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "till-date-bx"
  }, state.eventRepeatBy == "Weeks" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RepeatDays, null))) : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "eventRepeatBy",
    onChange: function onChange() {
      onRepeatChange(true, false, true);
      var date = _Classes_FindDateTime_FindDateTime__WEBPACK_IMPORTED_MODULE_2__["default"].findDaysBetweenTwoDates(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD'), state.eventTillDate);
      return dispatch({
        type: 'SelectedStartDate',
        payload: {
          Type: 'SelectedStartDate',
          eventRepeatBy: 'TillDate',
          SelectedStartDate: date,
          SelectedEndDate: date,
          repeatNumber: 1
        }
      });
    },
    checked: state.eventRepeatBy === 'TillDate' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-on-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Till date")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "date",
    className: "form-control",
    onChange: EventTillDate,
    placeholder: "17 June 2020",
    disabled: eventTillDateError,
    min: moment__WEBPACK_IMPORTED_MODULE_1___default()().format('DD/MM/YYYY'),
    name: "eventTillDate",
    value: state.eventTillDate
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "radio custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "radio",
    name: "eventRepeatBy",
    onChange: function onChange() {
      onRepeatChange(true, true, false);
      dispatch({
        type: 'eventRepeatBy',
        payload: {
          Type: 'eventRepeatBy',
          eventRepeatBy: 'MultipleDate',
          repeatNumber: 1,
          eventTillDate: moment__WEBPACK_IMPORTED_MODULE_1___default()().add(15, 'days').format('YYYY-MM-DD'),
          SelectedStartDate: [state.eventSingleDate],
          SelectedEndDate: [state.eventSingleDate]
        }
      });
    },
    checked: state.eventRepeatBy === 'MultipleDate' ? true : false
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-on-bx repeat-select-date-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Select date(s)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, chooseDateError ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    disabled: true
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default.a, {
    multiple: true,
    mapDays: function mapDays(_ref) {
      var date = _ref.date;
      if (moment__WEBPACK_IMPORTED_MODULE_1___default()(date.format(), 'DD-MM-YYYY').format('DD-MM-YYYY') === state.eventSingleDate) return {
        disabled: true,
        style: {
          color: "#28a745"
        },
        onClick: function onClick() {
          return toastr['error']("start date are disabled");
        }
      };
    },
    minDate: new Date(),
    value: state.SelectedStartDate,
    onChange: setMultipleChoose,
    inputClass: "form-control",
    format: "DD-MM-YYYY",
    plugins: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker_plugins_date_panel__WEBPACK_IMPORTED_MODULE_4___default.a, null)],
    disabled: state.eventRepeatBy === "MultipleDate" ? false : true // maxDate={new Date().setDate(60)}

  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    onClick: resetPopup
  }, "Reset")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    onClick: repeatValidation
  }, "Save")))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(RepeatEvery));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/StepTwo.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/StepTwo.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EventAddTime_EventAddTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventAddTime/EventAddTime */ "./resources/js/components/screens/CreateEvent/Components/EventAddTime/EventAddTime.jsx");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _RepeatEveryModal_RepeatEvery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RepeatEveryModal/RepeatEvery */ "./resources/js/components/screens/CreateEvent/Components/Modal/RepeatEveryModal/RepeatEvery.jsx");
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConflictsEvents/ConflictsEvents */ "./resources/js/components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents.jsx");
/* harmony import */ var _TimeChangeModal_TImeChangeModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TimeChangeModal/TImeChangeModal */ "./resources/js/components/screens/CreateEvent/Components/Modal/TimeChangeModal/TImeChangeModal.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var StepTwo = function StepTwo(_ref) {
  var resetFormState = _ref.resetFormState;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      next = _useState2[0],
      setNext = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
      _useState4 = _slicedToArray(_useState3, 2),
      BTNContinue = _useState4[0],
      setBTNContinue = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true),
      _useState6 = _slicedToArray(_useState5, 2),
      back = _useState6[0],
      setBack = _useState6[1];

  var eventTillDate = state.eventTillDate,
      EventTimeZone = state.EventTimeZone,
      eventAutoParticipants = state.eventAutoParticipants,
      eventDurationSlots = state.eventDurationSlots,
      eventVisibility = state.eventVisibility,
      repeatNumber = state.repeatNumber,
      eventRepeatBy = state.eventRepeatBy,
      eventTitle = state.eventTitle,
      SelectedStartDate = state.SelectedStartDate,
      SelectedEndDate = state.SelectedEndDate,
      SelectedStartTime = state.SelectedStartTime,
      SelectedEndTime = state.SelectedEndTime;

  var nextStep = function nextStep(eve) {
    var data = {
      "startDateTime": SelectedStartDate,
      "endDateTime": SelectedEndDate,
      "eventDurationSlots": eventDurationSlots,
      "eventRepeatBy": eventRepeatBy
    };
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_5__["ApiService"].TimeConflictsChecks(data).then(function (res) {
      if (res.data.status == 200) {
        if (eventTitle) {
          $(eve).modal({
            backdrop: 'static',
            keyboard: false
          });
          setNext(true);
          return true;
        } else {
          $(eve).modal({
            backdrop: 'static',
            keyboard: false
          });
          setNext(false);
        }

        $('#create-my-event-step-3-popup').modal('hide');
      } else if (res.data.status == "events") {
        dispatch({
          type: 'ConflictsEvents',
          payload: {
            Type: 'ConflictsEvents',
            ConflictsEvents: res.data.data
          }
        });
        toastr["error"]("Conflict Error");
        $('#Conflicts-Events-modal').modal('show');
      } else {
        toastr["error"]("Conflict Error");
      }
    })["catch"](function (error) {
      console.log(error, 'error');
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    state.eventDurationSlots.map(function (object, i) {
      var time = moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(object.endDateTime, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'), 'HH:mm:ss'),
          beforeTime = moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(object.startDateTime, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'), 'HH:mm:ss'),
          afterTime = moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(object.endDateTime, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'), 'HH:mm:ss');

      if (state.eventTitle) {
        return setBTNContinue(i + 1);
      } else {
        return setBTNContinue(0);
      }
    });
  }, [state.eventDurationSlots, state.eventTitle]);

  var prevStep = function prevStep(eve) {
    $(eve).modal({
      backdrop: 'static',
      keyboard: false
    }, 'show');
  };

  var onChange = function onChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    dispatch({
      type: name,
      payload: _defineProperty({
        Type: name
      }, name, value)
    });
  };

  var SetValueOnChange = function SetValueOnChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    dispatch({
      type: name,
      payload: _defineProperty({
        Type: name
      }, name, !state.eventRepeat)
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (state.eventRepeat) {
      $('#repeat-event-popup').modal({
        backdrop: 'static',
        keyboard: false
      }, 'show');
    } else {
      $('#repeat-event-popup').modal('hide');
    }
  }, [state.eventRepeat]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal left fade side-popup create-my-event-popup",
    id: "create-my-event-step-3-popup",
    tabIndex: "-1",
    "aria-labelledby": "myModalLabel2",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return console.log("Step Two Submit Successfully");
    }
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
    className: "modal-body input-bdr-btm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Title"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "text",
    name: "eventTitle",
    onChange: onChange,
    className: "form-control",
    placeholder: "Enter Title",
    value: state.eventTitle,
    autoComplete: "off"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "b-f-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "date",
    name: "eventSingleDate",
    onChange: function onChange(e) {
      var eventDurationSlotsNew = state.eventDurationSlots.map(function (object) {
        return _objectSpread(_objectSpread({}, object), {}, {
          endDateTime: moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY') + ' ' + moment__WEBPACK_IMPORTED_MODULE_2___default()(object.endDateTime, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'), 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'),
          startDateTime: moment__WEBPACK_IMPORTED_MODULE_2___default()(moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value, 'YYYY-MM-DD').format('DD-MM-YYYY') + ' ' + moment__WEBPACK_IMPORTED_MODULE_2___default()(object.startDateTime, 'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'), 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')
        });
      });

      if (moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value) >= moment__WEBPACK_IMPORTED_MODULE_2___default()()) {
        dispatch({
          type: 'setEventDate',
          payload: {
            Type: 'setEventDate',
            eventDurationSlots: eventDurationSlotsNew,
            eventSingleDate: moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value).format('DD-MM-YYYY'),
            SelectedStartDate: [moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value).format('DD-MM-YYYY')],
            SelectedEndDate: [moment__WEBPACK_IMPORTED_MODULE_2___default()(e.target.value).format('DD-MM-YYYY')]
          }
        });
      } else {
        toastr["error"]('please select grater and equal to current date');
      }
    },
    className: "form-control",
    placeholder: "Tuesday, October 20",
    value: moment__WEBPACK_IMPORTED_MODULE_2___default()(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD') // disabled={state.SelectedStartDate.length > 1 || state.eventRepeatBy == "Weeks" || state.eventRepeatBy == "MultipleDate" || state.eventRepeatBy == "TillDate" || parseInt(state.repeatNumber) > 1 ? true : false}
    ,
    disabled: true
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "b-f-in "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label-small-h"
  }, "Privacy"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx p-0",
    onChange: onChange,
    value: state.eventVisibility,
    name: "eventVisibility"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    defaultValue: "public"
  }, "Public"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "private"
  }, "Private"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EventAddTime_EventAddTime__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bdr-frm-bx repeat-events-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    name: "eventRepeat",
    onChange: SetValueOnChange,
    disabled: state.eventRepeatSave,
    checked: state.eventRepeat,
    value: state.eventRepeat
  }), "Repeat")), state.eventRepeatSave && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-default btn-sm",
    type: "button",
    onClick: function onClick() {
      return $('#repeat-event-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }, "View"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "step-line-bdr"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\xA0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "side-next-back-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn float-left",
    onClick: function onClick() {
      return prevStep('#create-my-event-popup');
    },
    "data-toggle": "modal",
    "data-dismiss": "modal"
  }, "Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn float-right",
    disabled: state.TimeOverlapped,
    onClick: function onClick() {
      return nextStep('#create-my-event-step-4-popup');
    }
  }, "Continue"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RepeatEveryModal_RepeatEvery__WEBPACK_IMPORTED_MODULE_3__["default"], {
    show: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TimeChangeModal_TImeChangeModal__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConflictsEvents_ConflictsEvents__WEBPACK_IMPORTED_MODULE_6__["default"], {
    events: state.ConflictsEvents
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(StepTwo));

/***/ }),

/***/ "./resources/js/components/screens/CreateEvent/Components/Modal/TimeChangeModal/TImeChangeModal.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/screens/CreateEvent/Components/Modal/TimeChangeModal/TImeChangeModal.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Pages/CreateEventContext/CreateEventContext */ "./resources/js/components/screens/CreateEvent/Pages/CreateEventContext/CreateEventContext.js");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-multi-date-picker */ "./node_modules/react-multi-date-picker/build/index.js");
/* harmony import */ var react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var TimeChangeModal = function TimeChangeModal() {
  var _state$eventDurationS, _state$eventDurationS2, _state$eventDurationS4;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_Pages_CreateEventContext_CreateEventContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('A')),
      _useState4 = _slicedToArray(_useState3, 2),
      timeFR = _useState4[0],
      setTimeFR = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('m')),
      _useState6 = _slicedToArray(_useState5, 2),
      timeMIN = _useState6[0],
      setTimeMIN = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('h')),
      _useState8 = _slicedToArray(_useState7, 2),
      timeHR = _useState8[0],
      setTimeHR = _useState8[1];

  var Hours = [];
  var Minutes = [];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeFR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('A'));
    setTimeMIN(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('m'));
    setTimeHR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('h'));
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'));
  }, [state.ChangeTime.time, (_state$eventDurationS = state.eventDurationSlots[state.ChangeTime.index]) === null || _state$eventDurationS === void 0 ? void 0 : _state$eventDurationS.endDateTime, (_state$eventDurationS2 = state.eventDurationSlots[state.ChangeTime.index]) === null || _state$eventDurationS2 === void 0 ? void 0 : _state$eventDurationS2.startDateTime]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeFR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('A'));
    setTimeMIN(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('m'));
    setTimeHR(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('h'));
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'));
  }, []);

  for (var i = 1; i < 13; i++) {
    Hours.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: i,
      selected: timeHR == i
    }, i, " hr"));
  }

  [0, 15, 30, 45].map(function (res, i) {
    Minutes.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: i,
      value: res,
      selected: timeMIN == res
    }, ('0' + res).slice(-2), " min"));
  });

  var onSave = function onSave() {
    var _state$eventDurationS3;

    var originalDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(state.ChangeTime.time, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY');
    var originalTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(originalDate + '' + ('0' + timeHR).slice(-2) + '' + ('0' + timeMIN).slice(-2) + '' + timeFR, 'DD-MM-YYYY hh:mm A').format('DD-MM-YYYY HH:mm:ss');
    var startTime = moment__WEBPACK_IMPORTED_MODULE_1___default()((_state$eventDurationS3 = state.eventDurationSlots[state.ChangeTime.index]) === null || _state$eventDurationS3 === void 0 ? void 0 : _state$eventDurationS3.startDateTime, 'DD-MM-YYYY HH:mm:ss');

    if (state.ChangeTime.type == "start") {
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    } else if (state.ChangeTime.type == "end") {
      originalTime = moment__WEBPACK_IMPORTED_MODULE_1___default()(value + '' + ('0' + timeHR).slice(-2) + '' + ('0' + timeMIN).slice(-2) + '' + timeFR, 'DD-MM-YYYY hh:mm A').format('DD-MM-YYYY HH:mm:ss');
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    } else {
      onSaveTimeChange(originalTime, state.ChangeTime.index, state.ChangeTime.type);
    }
  };

  var handleDate = function handleDate(e) {
    setValue(moment__WEBPACK_IMPORTED_MODULE_1___default()(e.format(), 'DD-MM-YYYY').format('DD-MM-YYYY'));
  };

  var onTimeChange = function onTimeChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    if (name == "Hours") {
      setTimeHR(value);
    } else if (name == "Minutes") {
      setTimeMIN(value);
    } else if (name == "TimeFormat") {
      setTimeFR(value);
    }
  };

  var onSaveTimeChange = function onSaveTimeChange(time, index, type) {
    var eventDurationSlots = _toConsumableArray(state.eventDurationSlots);

    var TimeOverlappedIndex = _toConsumableArray(state.TimeOverlappedIndex);

    if (type == "start") {
      eventDurationSlots[index]['startDateTime'] = time;
    } else if (type == "end") {
      eventDurationSlots[index]['interval'] = moment__WEBPACK_IMPORTED_MODULE_1___default()(time, "DD-MM-YYYY HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].startDateTime, "DD-MM-YYYY HH:mm:ss"), 'day');
      eventDurationSlots[index]['endDateTime'] = time;
    }

    if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].endDateTime, "DD-MM-YYYY HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].startDateTime, "DD-MM-YYYY HH:mm:ss"), 'Hours') > 6) {
      toastr["error"]('Event duration can not be greater than 6 hours');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlapped",
        payload: {
          Type: "TimeOverlapped",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].endDateTime, "DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss') === moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].startDateTime, "DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')) {
      toastr["error"]('Minimum 15 min of event duration required');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlappedMin",
        payload: {
          Type: "TimeOverlappedMin",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else if (moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].endDateTime, "DD-MM-YYYY HH:mm:ss").diff(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventDurationSlots[index].startDateTime, "DD-MM-YYYY HH:mm:ss"), 'minutes') < 15) {
      toastr["error"]('Start time can not be greater than end time');
      TimeOverlappedIndex.push(index);
      dispatch({
        type: "TimeOverlappedMin",
        payload: {
          Type: "TimeOverlappedMin",
          TimeOverlapped: true,
          TimeOverlappedIndex: TimeOverlappedIndex
        }
      });
    } else {
      dispatch({
        type: "TimeOverlapped",
        payload: {
          Type: "TimeOverlapped",
          TimeOverlapped: false,
          TimeOverlappedIndex: TimeOverlappedIndex.filter(function (res) {
            return res != index;
          })
        }
      });
    }

    dispatch({
      type: 'eventDurationSlots',
      payload: {
        Type: 'eventDurationSlots',
        eventDurationSlots: eventDurationSlots
      }
    });
    $('#TimeChangeModal').modal('hide');
    console.log(state.TimeOverlappedIndex, index, 'TimeOverlappedIndex');
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal fade default-popup repeat-event-popup",
    id: "TimeChangeModal",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#create-my-event-step-3-popup",
    className: "close",
    "data-dismiss": "modal",
    "aria-label": "Close"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-close-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "col-12 col-sm-12 "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    "class": "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    "class": "w-100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "class": "flex-select-bx w-100"
  }, state.ChangeTime.type == "end" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_multi_date_picker__WEBPACK_IMPORTED_MODULE_3___default.a, {
    inputClass: "form-control",
    minDate: new Date(moment__WEBPACK_IMPORTED_MODULE_1___default()(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD')),
    value: moment__WEBPACK_IMPORTED_MODULE_1___default()((_state$eventDurationS4 = state.eventDurationSlots[state.ChangeTime.index]) === null || _state$eventDurationS4 === void 0 ? void 0 : _state$eventDurationS4.endDateTime, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'),
    format: "DD-MM-YYYY",
    onChange: handleDate
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "label-small-h"
  }, value))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12 col-sm-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-box repeat-for-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-every-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    style: {
      width: '30%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "Hours",
    onChange: onTimeChange
  }, Hours))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "Minutes",
    onChange: onTimeChange
  }, Minutes))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    name: "TimeFormat",
    onChange: onTimeChange,
    value: timeFR
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "AM",
    selected: timeFR === "AM"
  }, "AM"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "PM",
    selected: timeFR === "PM"
  }, "PM")))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "till-date-bx"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-7 col-sm-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "repeat-event-btns"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "cmn-ul-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    onClick: onSave
  }, "Save")))))))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TimeChangeModal));

/***/ })

}]);