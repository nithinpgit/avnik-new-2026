(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./resources/js/User/Chats/ChatContext/ChatContext.js":
/*!************************************************************!*\
  !*** ./resources/js/User/Chats/ChatContext/ChatContext.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ChatContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext([]);
/* harmony default export */ __webpack_exports__["default"] = (ChatContext);

/***/ }),

/***/ "./resources/js/User/Chats/ChatPage.jsx":
/*!**********************************************!*\
  !*** ./resources/js/User/Chats/ChatPage.jsx ***!
  \**********************************************/
/*! exports provided: chatInitiate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chatInitiate", function() { return chatInitiate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Modals_CreateGroup_CreateGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modals/CreateGroup/CreateGroup */ "./resources/js/User/Chats/Modals/CreateGroup/CreateGroup.jsx");
/* harmony import */ var _Pages_GroupMessageTab_GroupMessageTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/GroupMessageTab/GroupMessageTab */ "./resources/js/User/Chats/Pages/GroupMessageTab/GroupMessageTab.jsx");
/* harmony import */ var _Screens_GroupChat_GroupChat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Screens/GroupChat/GroupChat */ "./resources/js/User/Chats/Screens/GroupChat/GroupChat.jsx");
/* harmony import */ var _Screens_Inbox_Inbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Screens/Inbox/Inbox */ "./resources/js/User/Chats/Screens/Inbox/Inbox.jsx");
/* harmony import */ var _Screens_SingleChat_SingleChat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Screens/SingleChat/SingleChat */ "./resources/js/User/Chats/Screens/SingleChat/SingleChat.jsx");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
/* harmony import */ var _Reducer_ChatReducer_ChatReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Reducer/ChatReducer/ChatReducer */ "./resources/js/User/Chats/Reducer/ChatReducer/ChatReducer.js");
/* harmony import */ var _Screens_ChatLeftSidebar_ChatLeftSidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Screens/ChatLeftSidebar/ChatLeftSidebar */ "./resources/js/User/Chats/Screens/ChatLeftSidebar/ChatLeftSidebar.jsx");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













 // import Echo from 'laravel-echo';



var initialState = {
  Inbox: true,
  GroupMessage: false,
  SingleMessage: false,
  GroupMessageTab: false,
  Conversations: [],
  ConversationsPagination: {
    current_page: 1,
    next_page: null
  },
  ChatList: [],
  ChatStartWith: '',
  Message: '',
  FilterBy: 'All',
  Room: '',
  CreateGroup: false,
  CurrentRoom: '',
  CurrentRoomChat: [],
  MyGroups: [],
  MyGroupsPagination: '',
  ContactUsers: [],
  RoomOnlineUser: 0,
  UserTyping: null,
  ContactListPagination: '',
  changes: false,
  SelectedUserIds: [],
  random: 0
};
var ChatStart = '';
var chatInitiate = function chatInitiate(toUser) {
  ChatStart = toUser;
};

var ChatPage = function ChatPage(props) {
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_13__["default"]);

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(_Reducer_ChatReducer_ChatReducer__WEBPACK_IMPORTED_MODULE_8__["default"], initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getConversation();
    getContactList();
  }, [state.random]);

  var getConversation = function getConversation() {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_14__["ApiService"]._fetchAllMessages().then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'CONVERSATIONS',
          payload: res.data.data.data
        });
        dispatch({
          type: 'CONVERSATIONS_PAGINATION',
          payload: {
            current_page: res.data.data.current_page,
            next_page: res.data.data.next_page_url
          }
        });
      }
    })["catch"](function (error) {});
  };

  var listenConversations = function listenConversations(res) {
    if (res.status == 200) {
      dispatch({
        type: 'CONVERSATIONS',
        payload: res.data.data
      });
      dispatch({
        type: 'CONVERSATIONS_PAGINATION',
        payload: {
          current_page: res.data.current_page,
          next_page: res.data.next_page_url
        }
      });
    }
  };

  var getContactList = function getContactList() {
    var data = {
      nextPage: undefined
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_14__["ApiService"]._fetchAllContacts(data).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'CONTACT_LIST',
          payload: res.data.data.data
        });
        dispatch({
          type: 'CONTACT_LIST_PAGINATION',
          payload: res.data.data.data
        });
      }
    })["catch"](function (error) {});
  };

  var DataChat = [state, dispatch]; // For Title

  document.title = "Messages";
  console.log(state);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_7__["default"].Provider, {
    value: DataChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ah-tab-content",
    "data-ah-tab-active": props.Active
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-content-sec"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Screens_ChatLeftSidebar_ChatLeftSidebar__WEBPACK_IMPORTED_MODULE_9__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Modals_CreateGroup_CreateGroup__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
};

/* harmony default export */ __webpack_exports__["default"] = (ChatPage);

/***/ }),

/***/ "./resources/js/User/Chats/Modals/CreateGroup/CreateGroup.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/User/Chats/Modals/CreateGroup/CreateGroup.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var CreateGroup = function CreateGroup() {
  var _React$createElement;

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_4__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      RoomName = _useState2[0],
      setRoomName = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      BroadCasting = _useState4[0],
      setBroadCasting = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])({
    tempSrc: '',
    original: ''
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      RoomImage = _useState6[0],
      setRoomImage = _useState6[1];

  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState8 = _slicedToArray(_useState7, 2),
      Error = _useState8[0],
      SetError = _useState8[1];

  var handleCreateRoom = function handleCreateRoom(e) {
    e.preventDefault();
    var form_data = '';

    if (RoomImage.tempSrc && RoomImage.original) {
      form_data = new FormData();
      form_data.append('file', RoomImage.original, RoomImage.original.name);
      form_data.append('roomName', RoomName);
      form_data.append('broadcasting', BroadCasting);
      form_data.append('roomUserIds', state.SelectedUserIds);
    } else {
      form_data = {
        roomName: RoomName,
        broadcasting: BroadCasting,
        roomUserIds: state.SelectedUserIds
      };
    }

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_2__["ApiService"]._createChatRoom(form_data).then(function (res) {
      if (res.data.status == 200) {
        SetError(false);
        setRoomName('');
        setBroadCasting(false);
        $('#create-group-popup').modal('hide');
        dispatch({
          type: "CREATE_GROUP",
          payload: true
        });
        dispatch({
          type: "RANDOM",
          payload: {
            Type: 'RANDOM',
            random: Math.random()
          }
        });
      }

      if (res.data.status == "failed") {
        SetError(true);
        toastr['error'](res.data.message);
      }
    })["catch"](function (error) {
      console.log(error);
    }); // dispatch({type:'CREATE_ROOM',payload:{}})

  };

  var setGroupImage = function setGroupImage(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      return setRoomImage({
        tempSrc: [reader.result],
        original: file
      });
    };
  };

  console.log(RoomImage);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal fade default-popup create-group-popup",
    id: "create-group-popup",
    tabIndex: "-1",
    "aria-labelledby": "exampleModalLabel",
    "aria-hidden": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-dialog"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleCreateRoom
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
  }, "Create Group")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "create-group-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "left-c-g-img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "avatar-upload"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "avatar-edit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "file",
    id: "imageUpload",
    onChange: setGroupImage,
    accept: ".png, .jpg, .jpeg"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    htmlFor: "imageUpload"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "avatar-preview"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "imagePreview",
    style: {
      backgroundImage: "url(".concat(RoomImage.tempSrc, ")")
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", (_React$createElement = {
    type: "text",
    className: Error ? "form-control is-invalid" : "form-control",
    onChange: function onChange(e) {
      return setRoomName(e.target.value);
    },
    placeholder: "Enter Group Name",
    maxLength: "2"
  }, _defineProperty(_React$createElement, "maxLength", "40"), _defineProperty(_React$createElement, "value", RoomName), _React$createElement)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "form-ck-forgot-p-link"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "checkbox",
    onChange: function onChange() {
      return setBroadCasting(!BroadCasting);
    },
    checked: BroadCasting
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "ck-bx-c"
  }, "Broadcast (Only host would be able to message)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn",
    type: "submit",
    disabled: RoomName.length > 0 ? false : true
  }, "Create"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CreateGroup);

/***/ }),

/***/ "./resources/js/User/Chats/Pages/GroupMessageTab/GroupMessageTab.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/User/Chats/Pages/GroupMessageTab/GroupMessageTab.jsx ***!
  \***************************************************************************/
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
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
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










var GroupMessageTab = function GroupMessageTab(_ref) {
  var showHideDiv = _ref.showHideDiv;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    fetchMyGroups();
  }, [state.FilterBy]);

  var handleAddUser = function handleAddUser(e, id) {
    var target = e.target;
    var value = target.value;

    if (target.checked) {
      setSelectedUser([].concat(_toConsumableArray(SelectedUser), [parseInt(value)]));
    } else if (target.checked == false) {
      var _value = SelectedUser.indexOf(parseInt(id));

      if (_value !== -1) {
        SelectedUser.splice(_value, 1);
      }

      setSelectedUser(SelectedUser);
    } else {
      setSelectedUser([]);
    } // setSelectedUser([parseInt(value)]);

  };

  var fetchMyGroups = function fetchMyGroups() {
    var data = {
      roomType: state.FilterBy,
      nextPage: ''
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__["ApiService"]._fetchMyRoom(data).then(function (res) {
      if (res.data.status == 200) {
        dispatch({
          type: 'MyGroups',
          payload: {
            Type: 'MyGroups',
            MyGroups: res.data.data.data
          }
        });
        dispatch({
          type: 'MyGroupsPagination',
          payload: {
            Type: 'MyGroupsPagination',
            MyGroupsPagination: res.data.data
          }
        });
      } else {}
    })["catch"](function (error) {});
  };

  var handleChat = function handleChat(roomId) {
    var data = {
      roomId: roomId
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_4__["ApiService"]._enterChatRoom(data).then(function (res) {
      if (res.data.status == 200) {
        var _res$data;

        dispatch({
          type: 'CURRENT_ROOM_CHAT',
          payload: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data
        });
      }

      console.log(res);
    })["catch"](function (error) {
      console.log(error);
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-right-bx groups-right-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "inbox-message-number"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cmn-new-toggle move-group-dd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    className: "btn link-btn",
    type: "button",
    value: "Show/Hide",
    onClick: function onClick() {
      return showHideDiv('cmn-new-toggle');
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-move-file-icon"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    id: "cmn-new-toggle",
    className: "new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("strong", null, "Move to :"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-search-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", null, state === null || state === void 0 ? void 0 : state.Conversations.map(function (res) {
    var _res$chat_room;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, res === null || res === void 0 ? void 0 : (_res$chat_room = res.chat_room) === null || _res$chat_room === void 0 ? void 0 : _res$chat_room.room_name));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "add-group-popup"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn",
    "data-toggle": "modal",
    "data-target": "#create-group-popup"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-create-group-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-search-icon"
  }))))), state.FilterBy == "Contacts" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-list group-message-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "custom-table"
  }, state === null || state === void 0 ? void 0 : state.ContactUsers.map(function (res) {
    var _res$contact_id, _res$contact_id2, _res$contact_id3, _res$contact_id4, _res$contact_id4$user, _res$contact_id5, _res$contact_id5$user, _res$contact_id6, _res$contact_id6$user, _res$contact_id7, _res$contact_id7$user, _res$contact_id8, _res$contact_id8$user;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(GroupContactList, {
      key: res.id,
      userId: (_res$contact_id = res.contact_id) === null || _res$contact_id === void 0 ? void 0 : _res$contact_id.id,
      name: (_res$contact_id2 = res.contact_id) === null || _res$contact_id2 === void 0 ? void 0 : _res$contact_id2.name,
      userName: (_res$contact_id3 = res.contact_id) === null || _res$contact_id3 === void 0 ? void 0 : _res$contact_id3.username,
      country: (_res$contact_id4 = res.contact_id) === null || _res$contact_id4 === void 0 ? void 0 : (_res$contact_id4$user = _res$contact_id4.user_profile) === null || _res$contact_id4$user === void 0 ? void 0 : _res$contact_id4$user.country,
      profilePicture: (_res$contact_id5 = res.contact_id) !== null && _res$contact_id5 !== void 0 && (_res$contact_id5$user = _res$contact_id5.user_profile) !== null && _res$contact_id5$user !== void 0 && _res$contact_id5$user.profile_picture ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + ((_res$contact_id6 = res.contact_id) === null || _res$contact_id6 === void 0 ? void 0 : (_res$contact_id6$user = _res$contact_id6.user_profile) === null || _res$contact_id6$user === void 0 ? void 0 : _res$contact_id6$user.profile_picture) : (_res$contact_id7 = res.contact_id) !== null && _res$contact_id7 !== void 0 && (_res$contact_id7$user = _res$contact_id7.user_profile) !== null && _res$contact_id7$user !== void 0 && _res$contact_id7$user.social_profile_picture_url ? (_res$contact_id8 = res.contact_id) === null || _res$contact_id8 === void 0 ? void 0 : (_res$contact_id8$user = _res$contact_id8.user_profile) === null || _res$contact_id8$user === void 0 ? void 0 : _res$contact_id8$user.social_profile_picture_url : "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"], "/public/assets/images/userAvatar.png")
    });
  }))))) :
  /*#__PURE__*/
  //  state.FilterBy == "MyGroups"
  // ?
  // <div  className="message-list group-message-list">
  //       {state.MyGroups.map((res) =>
  //         <GroupsList 
  //             roomId={res?.id}
  //             roomType={res?.type == 1&&res?.type == 2? true : false}
  //             roomName={res?.room_name}
  //             groupImage={`${res?.group_image ? FileManagerPath + res?.group_image : FileManagerPath + `public/assets/images/groupAvatar.png`}`}
  //             createdAt={res?.created_at}
  //            />)}
  //     </div>
  // :
  // state.FilterBy == "Events"? 
  react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-list group-message-list"
  }, state === null || state === void 0 ? void 0 : state.Conversations.map(function (res) {
    var _res$chat_room2, _res$chat_room3, _res$chat_room4, _res$chat_room5, _res$chat_room6, _res$chat_room7, _res$chat_room8, _res$chat_room9;

    return (res === null || res === void 0 ? void 0 : (_res$chat_room2 = res.chat_room) === null || _res$chat_room2 === void 0 ? void 0 : _res$chat_room2.type) === 2 || (res === null || res === void 0 ? void 0 : (_res$chat_room3 = res.chat_room) === null || _res$chat_room3 === void 0 ? void 0 : _res$chat_room3.type) === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(GroupsList, {
      roomId: res === null || res === void 0 ? void 0 : res.room_id,
      roomType: (res === null || res === void 0 ? void 0 : (_res$chat_room4 = res.chat_room) === null || _res$chat_room4 === void 0 ? void 0 : _res$chat_room4.type) == 2 || (res === null || res === void 0 ? void 0 : (_res$chat_room5 = res.chat_room) === null || _res$chat_room5 === void 0 ? void 0 : _res$chat_room5.type) == 1 ? true : false,
      roomName: res === null || res === void 0 ? void 0 : (_res$chat_room6 = res.chat_room) === null || _res$chat_room6 === void 0 ? void 0 : _res$chat_room6.room_name,
      groupImage: "".concat((_res$chat_room7 = res.chat_room) !== null && _res$chat_room7 !== void 0 && _res$chat_room7.group_image ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + ((_res$chat_room8 = res.chat_room) === null || _res$chat_room8 === void 0 ? void 0 : _res$chat_room8.group_image) : _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"] + "public/assets/images/groupAvatar.png"),
      createdAt: res === null || res === void 0 ? void 0 : (_res$chat_room9 = res.chat_room) === null || _res$chat_room9 === void 0 ? void 0 : _res$chat_room9.created_at
    }) : '';
  })) // :
  //     <div className="message-list group-message-list">
  //     {state?.Conversations.map((res) =>
  //       <GroupsList 
  //        roomId={res?.room_id}
  //        roomType={res?.chat_room?.type == 2||res?.chat_room?.type == 1? true : false}
  //        roomName={res?.chat_room?.room_name}
  //        groupImage={`${res.chat_room?.group_image ? FileManagerPath + res.chat_room?.group_image : FileManagerPath + `public/assets/images/groupAvatar.png`}`}
  //        createdAt={res?.chat_room?.created_at}
  //       />
  //        )}
  //    </div> 
  ));
};

/* harmony default export */ __webpack_exports__["default"] = (GroupMessageTab);

var RoomUserList = function RoomUserList(_ref2) {
  var Users = _ref2.Users,
      roomId = _ref2.roomId;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    id: "group-users-show-bx ".concat(roomId),
    className: "group-users-show-bx",
    style: {
      display: 'none'
    }
  }, Users.map(function (user, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      key: index,
      className: "c-table-row ck-group-message unread-message"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "cell m-d-editable",
      "data-title": "Cost"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "message-time"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "checkbox custom"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
      type: "checkbox"
    }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "cell m-user-editable",
      "data-title": "Title"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "message-user-bx"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
      href: "#"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
      className: "cmn-profile-pic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
      src: "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_5__["FileManagerPath"], "public/assets/images/user-1.jpg"),
      alt: ""
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, user.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "cell message-short-editable",
      "data-title": "Description"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "message-short-text"
    }, "Nairobi, Kenya")));
  })));
};

var GroupContactList = function GroupContactList(_ref3) {
  var name = _ref3.name,
      profilePicture = _ref3.profilePicture,
      country = _ref3.country,
      userName = _ref3.userName,
      userId = _ref3.userId;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "c-table-row ck-group-message unread-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell m-d-editable",
    "data-title": "Cost"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-time"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "checkbox custom"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
    type: "checkbox",
    onChange: function onChange(e) {
      return handleAddUser(e, userId);
    },
    value: userId
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell m-user-editable",
    "data-title": "Title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/profile/".concat(userName)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: profilePicture,
    alt: name
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell message-short-editable",
    "data-title": "Description"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-short-text"
  }, country ? country : 'N/A'))));
};

var GroupsList = function GroupsList(_ref4) {
  var roomId = _ref4.roomId,
      roomType = _ref4.roomType,
      roomName = _ref4.roomName,
      groupImage = _ref4.groupImage,
      createdAt = _ref4.createdAt;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "u-p-files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "custom-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "c-table-row my-group-message unread-message"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell m-user-editable"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    href: "#",
    onClick: function onClick() {
      handleChat(roomId), dispatch({
        type: 'GROUP_MESSAGE',
        payload: {
          isRoom: roomType,
          roomId: roomId,
          roomName: roomName
        }
      }); // ,dispatch({type:'SELECTED_CONVERSATION', payload: {broadcasting:res?.broadcasting,roomImagechat_room?.:res.group_image ? FileManagerPath + res.group_image : FileManagerPath + `public/assets/images/groupAvatar.png`,isRoom: res?.type == 1 ? true : false,roomId:res?.id,roomName:res?.room_name}});
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: groupImage,
    alt: roomName
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, roomName)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell message-short-editable"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-short-text"
  }, "Created on ", moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(createdAt).local().format('DD MMM YYYY hh:mm A'), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell m-time-editable"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-time view-people-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    href: "#",
    value: "Show/Hide",
    onClick: function onClick() {
      return showHideDiv("group-users-show-bx ".concat(roomId));
    }
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-eye-icon v-p-icon"
  }), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "View People")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cell m-d-editable"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "message-delete-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-event-edit-icon"
  })), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    type: "button",
    className: "btn link-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-delete-icon"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(RoomUserList, {
    roomId: roomId,
    Users: []
  }))));
};

/***/ }),

/***/ "./resources/js/User/Chats/Reducer/ChatReducer/ChatReducer.js":
/*!********************************************************************!*\
  !*** ./resources/js/User/Chats/Reducer/ChatReducer/ChatReducer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case 'GROUP_MESSAGE':
      console.log('GROUP_MESSAGE', payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        CurrentRoom: payload,
        GroupMessage: true,
        GroupMessageTab: true,
        Inbox: false,
        SingleMessage: false
      });

    case 'INBOX':
      return _objectSpread(_objectSpread({}, state), {}, {
        Inbox: payload.Inbox,
        GroupMessageTab: payload.GroupMessageTab
      });

    case 'SINGLE_MESSAGE':
      return _objectSpread(_objectSpread({}, state), {}, {
        SingleMessage: payload.SingleMessage
      });

    case 'GROUP_MESSAGE_TAB':
      return _objectSpread(_objectSpread({}, state), {}, {
        GroupMessageTab: payload.GroupMessageTab,
        GroupMessage: false,
        Inbox: payload.Inbox,
        SingleMessage: payload.SingleMessage
      });

    case 'CHAT_MESSAGES':
      return _objectSpread(_objectSpread({}, state), {}, {
        ChatList: payload
      });

    case 'MESSAGE':
      return _objectSpread(_objectSpread({}, state), {}, {
        Message: payload
      });

    case 'SEND_MESSAGE':
      return _objectSpread(_objectSpread({}, state), {}, {
        Message: payload.Message
      });

    case 'CONVERSATIONS':
      return _objectSpread(_objectSpread({}, state), {}, {
        Conversations: payload
      });

    case 'CHAT_INITIATE':
      console.log('CHAT_INITIATE');
      return _objectSpread(_objectSpread({}, state), {}, {
        ChatStartWith: payload,
        Inbox: true,
        SingleMessage: true
      });

    case 'GET_CHAT_ROOM':
      console.log('GET_CHAT_ROOM');
      return _objectSpread(_objectSpread({}, state), {}, {
        Room: payload
      });

    case 'CONTACT_LIST':
      return _objectSpread(_objectSpread({}, state), {}, {
        ContactUsers: payload
      });

    case 'SELECTED_CONVERSATION':
      console.log('SELECTED_CONVERSATION', payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        CurrentRoomChat: [],
        CurrentRoom: payload,
        GroupMessage: (payload === null || payload === void 0 ? void 0 : payload.isRoom) == 1 ? true : false,
        Inbox: true,
        SingleMessage: (payload === null || payload === void 0 ? void 0 : payload.isRoom) == 1 ? false : true
      });

    case 'CURRENT_ROOM_CHAT':
      console.log('CURRENT_ROOM_CHAT', payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        CurrentRoomChat: payload
      });

    case 'CURRENT_ROOM_CHAT_CONVERSATION':
      console.log('CURRENT_ROOM_CHAT_CONVERSATION', payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        CurrentRoomChat: [].concat(state.CurrentRoomChat, payload)
      });

    case 'CREATE_GROUP':
      console.log('CREATE_GROUP', payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        CreateGroup: payload
      });

    case 'CONVERSATIONS_PAGINATION':
      return _objectSpread(_objectSpread({}, state), {}, {
        ConversationsPagination: {
          next_page: payload.next_page_url,
          current_page: payload.current_page_url
        }
      });

    case 'CONTACT_LIST_PAGINATION':
      return _objectSpread(_objectSpread({}, state), {}, {
        ContactListPagination: {
          next_page: payload.next_page_url,
          current_page: payload.current_page_url
        }
      });

    case 'CONVERSATION_FILTER':
      return _objectSpread(_objectSpread({}, state), {}, {
        FilterBy: payload
      });

    case payload.Type:
      return _objectSpread(_objectSpread({}, state), payload);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./resources/js/User/Chats/Screens/ChatLeftSidebar/ChatLeftSidebar.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/User/Chats/Screens/ChatLeftSidebar/ChatLeftSidebar.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
/* harmony import */ var _Pages_GroupMessageTab_GroupMessageTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Pages/GroupMessageTab/GroupMessageTab */ "./resources/js/User/Chats/Pages/GroupMessageTab/GroupMessageTab.jsx");
/* harmony import */ var _Components_ConversationList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Components/ConversationList */ "./resources/js/User/Chats/Screens/Components/ConversationList.jsx");
/* harmony import */ var _GroupChat_GroupChat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../GroupChat/GroupChat */ "./resources/js/User/Chats/Screens/GroupChat/GroupChat.jsx");
/* harmony import */ var _Inbox_Inbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Inbox/Inbox */ "./resources/js/User/Chats/Screens/Inbox/Inbox.jsx");
/* harmony import */ var _SingleChat_SingleChat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../SingleChat/SingleChat */ "./resources/js/User/Chats/Screens/SingleChat/SingleChat.jsx");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
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













var ChatLeftSidebar = function ChatLeftSidebar() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_9__["default"]);

  var getConversation = function getConversation(data) {
    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_10__["ApiService"]._fetchAllMessages(data).then(function (res) {
      console.log(state.ConversationsPagination.next_page);

      if (res.data.status == 200) {
        dispatch({
          type: 'CONVERSATIONS',
          payload: [].concat(_toConsumableArray(state.Conversations), _toConsumableArray(res.data.data.data))
        });
        dispatch({
          type: 'CONVERSATIONS_PAGINATION',
          payload: res.data.data.data
        });
      }
    })["catch"](function (error) {});
  };

  var onScrollHandle = function onScrollHandle(e) {
    var element = e.target;
    console.log(state);

    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (state.ConversationsPagination.next_page != null) {
        var data = {
          nextPage: state.ConversationsPagination.current_page + 1
        };
        getConversation(data);
      }
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-sidebar-outer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-sidebar-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-group-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tabs-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "nav",
    id: "pills-tab",
    role: "tablist"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "nav-item",
    role: "presentation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "nav-link ".concat(state !== null && state !== void 0 && state.Inbox ? 'active' : ''),
    onClick: function onClick() {
      return dispatch({
        type: 'INBOX',
        payload: {
          Inbox: true,
          GroupMessageTab: false
        }
      });
    },
    id: "pills-home-tab",
    "data-toggle": "pill",
    href: "#pills-home",
    role: "tab",
    "aria-controls": "pills-home",
    "aria-selected": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-email-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Inbox"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "nav-item",
    role: "presentation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "nav-link ".concat(state !== null && state !== void 0 && state.GroupMessageTab ? 'active' : ''),
    onClick: function onClick() {
      return dispatch({
        type: 'GROUP_MESSAGE_TAB',
        payload: {
          GroupMessageTab: true,
          Inbox: false,
          SingleMessage: false
        }
      });
    },
    id: "pills-profile-tab",
    "data-toggle": "pill",
    href: "#",
    role: "tab",
    "aria-controls": "pills-profile",
    "aria-selected": "false"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-event-attended-icon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Groups"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-content",
    id: "pills-tabContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-pane fade ".concat(state !== null && state !== void 0 && state.Inbox ? 'show active' : ''),
    id: "pills-home",
    role: "tabpanel",
    "aria-labelledby": "pills-home-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-users-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-select-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control custom-select-bx",
    onChange: function onChange(e) {
      return dispatch({
        type: 'CONVERSATION_FILTER',
        payload: e.target.value
      });
    },
    value: state === null || state === void 0 ? void 0 : state.FilterBy
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    defaultValue: true
  }, "All"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Groups"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Events"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flexGrow: '5'
    },
    className: "flex-input-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    onChange: function onChange(e) {
      return dispatch({
        type: 'SEARCH_CONVERSATION',
        payload: e.target.value
      });
    },
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-search-icon"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-meg-usr-bx",
    onScroll: onScrollHandle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, state === null || state === void 0 ? void 0 : state.Conversations.map(function (res) {
    var _res$chat_room, _res$chat_room$create, _res$chat_room2, _res$chat_room3, _res$chat_room4, _res$chat_room5, _res$chat_room6, _res$chat_room7, _res$chat_room8, _res$chat_room9, _res$chat_room10, _res$chat_room10$mess, _res$chat_room11, _res$chat_room12, _res$chat_room13, _res$chat_room14, _res$chat_room14$mess, _res$chat_room15, _res$chat_room15$mess, _res$chat_room16, _res$chat_room16$mess, _res$chat_room17, _res$chat_room17$mess, _res$chat_room18, _res$chat_room19, _res$chat_room20, _res$chat_room21, _res$chat_room21$mess;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ConversationList__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: res === null || res === void 0 ? void 0 : res.room_id,
      RoomId: res === null || res === void 0 ? void 0 : res.room_id,
      createdBy: res === null || res === void 0 ? void 0 : (_res$chat_room = res.chat_room) === null || _res$chat_room === void 0 ? void 0 : (_res$chat_room$create = _res$chat_room.created_by) === null || _res$chat_room$create === void 0 ? void 0 : _res$chat_room$create.id,
      broadcasting: res === null || res === void 0 ? void 0 : (_res$chat_room2 = res.chat_room) === null || _res$chat_room2 === void 0 ? void 0 : _res$chat_room2.broadcasting,
      userName: res === null || res === void 0 ? void 0 : (_res$chat_room3 = res.chat_room) === null || _res$chat_room3 === void 0 ? void 0 : _res$chat_room3.room_name,
      profilePic: (res === null || res === void 0 ? void 0 : (_res$chat_room4 = res.chat_room) === null || _res$chat_room4 === void 0 ? void 0 : _res$chat_room4.group_image) != null ? _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : (_res$chat_room5 = res.chat_room) === null || _res$chat_room5 === void 0 ? void 0 : _res$chat_room5.group_image) : "".concat(_ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__["FileManagerPath"]).concat((res === null || res === void 0 ? void 0 : (_res$chat_room6 = res.chat_room) === null || _res$chat_room6 === void 0 ? void 0 : _res$chat_room6.type) == 1 || (res === null || res === void 0 ? void 0 : (_res$chat_room7 = res.chat_room) === null || _res$chat_room7 === void 0 ? void 0 : _res$chat_room7.type) == 2 ? (res === null || res === void 0 ? void 0 : (_res$chat_room8 = res.chat_room) === null || _res$chat_room8 === void 0 ? void 0 : _res$chat_room8.broadcasting) == 1 ? 'public/assets/images/broadcastAvatar.png' : 'public/assets/images/groupAvatar.png' : '/public/assets/images/userAvatar.png'),
      lastMessage: res !== null && res !== void 0 && (_res$chat_room9 = res.chat_room) !== null && _res$chat_room9 !== void 0 && _res$chat_room9.message ? res === null || res === void 0 ? void 0 : (_res$chat_room10 = res.chat_room) === null || _res$chat_room10 === void 0 ? void 0 : (_res$chat_room10$mess = _res$chat_room10.message) === null || _res$chat_room10$mess === void 0 ? void 0 : _res$chat_room10$mess.content : "Create Room ".concat((res === null || res === void 0 ? void 0 : (_res$chat_room11 = res.chat_room) === null || _res$chat_room11 === void 0 ? void 0 : _res$chat_room11.type) == 1 || (res === null || res === void 0 ? void 0 : (_res$chat_room12 = res.chat_room) === null || _res$chat_room12 === void 0 ? void 0 : _res$chat_room12.type) == 3 ? res === null || res === void 0 ? void 0 : (_res$chat_room13 = res.chat_room) === null || _res$chat_room13 === void 0 ? void 0 : _res$chat_room13.room_name : currentUser.id == (res === null || res === void 0 ? void 0 : (_res$chat_room14 = res.chat_room) === null || _res$chat_room14 === void 0 ? void 0 : (_res$chat_room14$mess = _res$chat_room14.message) === null || _res$chat_room14$mess === void 0 ? void 0 : _res$chat_room14$mess.sender_id.id) ? 'You: ' + (res === null || res === void 0 ? void 0 : (_res$chat_room15 = res.chat_room) === null || _res$chat_room15 === void 0 ? void 0 : (_res$chat_room15$mess = _res$chat_room15.message) === null || _res$chat_room15$mess === void 0 ? void 0 : _res$chat_room15$mess.content) : "".concat(res === null || res === void 0 ? void 0 : (_res$chat_room16 = res.chat_room) === null || _res$chat_room16 === void 0 ? void 0 : (_res$chat_room16$mess = _res$chat_room16.message) === null || _res$chat_room16$mess === void 0 ? void 0 : _res$chat_room16$mess.sender_id.name, ": ") + (res === null || res === void 0 ? void 0 : (_res$chat_room17 = res.chat_room) === null || _res$chat_room17 === void 0 ? void 0 : (_res$chat_room17$mess = _res$chat_room17.message) === null || _res$chat_room17$mess === void 0 ? void 0 : _res$chat_room17$mess.content)),
      isRoom: (res === null || res === void 0 ? void 0 : (_res$chat_room18 = res.chat_room) === null || _res$chat_room18 === void 0 ? void 0 : _res$chat_room18.type) == 1 || (res === null || res === void 0 ? void 0 : (_res$chat_room19 = res.chat_room) === null || _res$chat_room19 === void 0 ? void 0 : _res$chat_room19.type) == 3 ? true : false,
      type: res === null || res === void 0 ? void 0 : (_res$chat_room20 = res.chat_room) === null || _res$chat_room20 === void 0 ? void 0 : _res$chat_room20.type,
      lastMessageTime: res === null || res === void 0 ? void 0 : (_res$chat_room21 = res.chat_room) === null || _res$chat_room21 === void 0 ? void 0 : (_res$chat_room21$mess = _res$chat_room21.message) === null || _res$chat_room21$mess === void 0 ? void 0 : _res$chat_room21$mess.created_at
    });
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "tab-pane fade ".concat(state !== null && state !== void 0 && state.GroupMessageTab ? 'show active' : ''),
    id: "pills-profile",
    role: "tabpanel",
    "aria-labelledby": "pills-profile-tab"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-groups-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: state.FilterBy == 'MyGroups' ? "active" : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return dispatch({
        type: 'CONVERSATION_FILTER',
        payload: 'MyGroups'
      });
    }
  }, "Groups")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: state.FilterBy == 'Contacts' ? "active" : ''
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: void 0,
    onClick: function onClick() {
      return dispatch({
        type: 'CONVERSATION_FILTER',
        payload: 'Contacts'
      });
    }
  }, "Contacts")))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-sidebar-content"
  }, state !== null && state !== void 0 && state.Inbox && state !== null && state !== void 0 && state.GroupMessage && (state === null || state === void 0 ? void 0 : state.GroupMessageTab) == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GroupChat_GroupChat__WEBPACK_IMPORTED_MODULE_5__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.GroupMessageTab ? 'active' : '',
    type: state.CurrentRoom.type
  }) : state !== null && state !== void 0 && state.Inbox && (state === null || state === void 0 ? void 0 : state.GroupMessage) == false && (state === null || state === void 0 ? void 0 : state.GroupMessageTab) == false && state !== null && state !== void 0 && state.SingleMessage ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GroupChat_GroupChat__WEBPACK_IMPORTED_MODULE_5__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.GroupMessageTab ? 'active' : '',
    type: state.CurrentRoom.type
  }) : state !== null && state !== void 0 && state.Inbox && (state === null || state === void 0 ? void 0 : state.GroupMessage) == false && (state === null || state === void 0 ? void 0 : state.GroupMessageTab) == false && (state === null || state === void 0 ? void 0 : state.SingleMessage) == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Inbox_Inbox__WEBPACK_IMPORTED_MODULE_6__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.Inbox ? 'active' : ''
  }) : (state === null || state === void 0 ? void 0 : state.Inbox) == false && (state === null || state === void 0 ? void 0 : state.GroupMessage) == false && state !== null && state !== void 0 && state.GroupMessageTab && (state === null || state === void 0 ? void 0 : state.SingleMessage) == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Pages_GroupMessageTab_GroupMessageTab__WEBPACK_IMPORTED_MODULE_3__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.GroupMessageTab ? 'active' : ''
  }) : (state === null || state === void 0 ? void 0 : state.Inbox) == false && state !== null && state !== void 0 && state.GroupMessage && state !== null && state !== void 0 && state.GroupMessageTab && (state === null || state === void 0 ? void 0 : state.SingleMessage) == false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GroupChat_GroupChat__WEBPACK_IMPORTED_MODULE_5__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.GroupMessageTab ? 'active' : ''
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Inbox_Inbox__WEBPACK_IMPORTED_MODULE_6__["default"], {
    showHideDiv: _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_8__["showHideDiv"],
    active: state !== null && state !== void 0 && state.Inbox ? 'active' : ''
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (ChatLeftSidebar);

/***/ }),

/***/ "./resources/js/User/Chats/Screens/Components/ChatList.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/User/Chats/Screens/Components/ChatList.jsx ***!
  \*****************************************************************/
/*! exports provided: SendFile, Message, SendImageFile, ShowChatDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendFile", function() { return SendFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendImageFile", function() { return SendImageFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowChatDate", function() { return ShowChatDate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");




var Message = function Message(_ref) {
  var Message = _ref.Message,
      Time = _ref.Time,
      ClassName = _ref.ClassName,
      userName = _ref.userName,
      name = _ref.name,
      isFile = _ref.isFile,
      file = _ref.file,
      fileType = _ref.fileType,
      fileName = _ref.fileName;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, isFile ? fileType == "jpg" || fileType == "png" || fileType == "gif" || fileType == "jpeg" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SendImageFile, {
    Message: Message,
    file: file,
    fileName: fileName,
    fileType: fileType,
    Time: Time,
    ClassName: ClassName,
    userName: userName,
    name: name
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SendFile, {
    Message: Message,
    file: file,
    fileName: fileName,
    fileType: fileType,
    Time: Time,
    ClassName: ClassName,
    userName: userName,
    name: name
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SimpleMessage, {
    Message: Message,
    Time: Time,
    ClassName: ClassName,
    userName: userName,
    name: name
  }));
};

var SimpleMessage = function SimpleMessage(_ref2) {
  var Message = _ref2.Message,
      Time = _ref2.Time,
      ClassName = _ref2.ClassName,
      userName = _ref2.userName,
      name = _ref2.name;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: ClassName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-inside"
  }, name ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/".concat(userName)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "g-m-name"
  }, name)) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_2__["isValidURL"])(Message) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: Message,
    target: "_blank"
  }, Message) : Message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", null, Time))));
};

var SendFile = function SendFile(_ref3) {
  var Message = _ref3.Message,
      Time = _ref3.Time,
      ClassName = _ref3.ClassName,
      userName = _ref3.userName,
      name = _ref3.name,
      isFile = _ref3.isFile,
      file = _ref3.file,
      fileType = _ref3.fileType,
      fileName = _ref3.fileName;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: ClassName + " img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-inside"
  }, name ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/".concat(userName)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "g-m-name"
  }, name)) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "chat-download-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "file-type-title-icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "file-type-name"
  }, fileType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, fileName, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "av av-download-icon"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", null, Time))));
};

var SendImageFile = function SendImageFile(_ref4) {
  var Message = _ref4.Message,
      Time = _ref4.Time,
      ClassName = _ref4.ClassName,
      userName = _ref4.userName,
      name = _ref4.name,
      isFile = _ref4.isFile,
      file = _ref4.file,
      fileType = _ref4.fileType,
      fileName = _ref4.fileName;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: ClassName + " img"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "chat-inside"
  }, name ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: "/profile/".concat(userName)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "class": "g-m-name"
  }, name)) : '', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: file,
    alt: fileName
  }), Message ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "caption"
  }, Message) : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", null, Time))));
};

var ShowChatDate = function ShowChatDate() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "chat-date"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Today")));
};



/***/ }),

/***/ "./resources/js/User/Chats/Screens/Components/ConversationList.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/User/Chats/Screens/Components/ConversationList.jsx ***!
  \*************************************************************************/
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
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var ConversationList = function ConversationList(_ref) {
  var type = _ref.type,
      createdBy = _ref.createdBy,
      profilePic = _ref.profilePic,
      userName = _ref.userName,
      lastMessage = _ref.lastMessage,
      lastMessageTime = _ref.lastMessageTime,
      isRoom = _ref.isRoom,
      RoomId = _ref.RoomId,
      broadcasting = _ref.broadcasting;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var handleChat = function handleChat() {
    var data = {
      roomId: RoomId
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_3__["ApiService"]._enterChatRoom(data).then(function (res) {
      if (res.data.status == 200) {
        var _res$data;

        dispatch({
          type: 'CURRENT_ROOM_CHAT',
          payload: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data.data
        });
      }

      console.log(res);
    })["catch"](function (error) {
      console.log(error);
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("li", {
    className: "active"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "in-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    src: profilePic,
    alt: userName
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "in-rit-user-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "name-date-text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    onClick: function onClick() {
      handleChat(), dispatch({
        type: 'SELECTED_CONVERSATION',
        payload: {
          type: type,
          broadcasting: broadcasting,
          createdBy: createdBy,
          roomImage: profilePic,
          isRoom: isRoom,
          roomId: RoomId,
          roomName: userName
        }
      });
    }
  }, userName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, lastMessageTime ? moment__WEBPACK_IMPORTED_MODULE_1___default.a.utc(lastMessageTime).local().format('hh:mm A') : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "in-m-text-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, lastMessage), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", {
    href: "#"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", {
    className: "av av-favorite-icon"
  }), " "))))));
};

/* harmony default export */ __webpack_exports__["default"] = (ConversationList);

/***/ }),

/***/ "./resources/js/User/Chats/Screens/GroupChat/GroupChat.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/User/Chats/Screens/GroupChat/GroupChat.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
/* harmony import */ var _Components_ChatList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Components/ChatList */ "./resources/js/User/Chats/Screens/Components/ChatList.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
/* harmony import */ var _utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../utility/UtilityFunctions */ "./resources/js/utility/UtilityFunctions.js");
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












var GroupChat = function GroupChat() {
  var _state$CurrentRoom4, _state$CurrentRoom5, _state$CurrentRoom6, _state$CurrentRoom7, _state$CurrentRoom8;

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_4__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_6__["default"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      SelectedUser = _useState2[0],
      setSelectedUser = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''),
      _useState4 = _slicedToArray(_useState3, 2),
      ChatFile = _useState4[0],
      setChatFile = _useState4[1];

  var SelectedUserCheck = [];
  var messageEl = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var messageInput = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var _state$CurrentRoom;

    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', function (event) {
        var target = event.currentTarget;
        target.scroll({
          top: target.scrollHeight,
          behavior: 'smooth'
        });
      });
    } //   window.Echo.join(`SendMessageChannel.${state.CurrentRoom?.roomId}`)
    //   window.Echo.join(`SendMessageChannel`)
    //   .here((users) => {
    //       //
    //       console.log(users,'here')
    //   })
    //   .joining((user) => {
    //       console.log(user.name,'Joining');
    //   })
    //   .listen('.SendUserMessage', (e) => {
    //       console.log(e,'SendUserMessage')
    //   })
    //   .leaving((user) => {
    //       console.log(user.name,"Leaving");
    //   });


    window.Echo["private"]("SendMessageChannel.".concat((_state$CurrentRoom = state.CurrentRoom) === null || _state$CurrentRoom === void 0 ? void 0 : _state$CurrentRoom.roomId)).listen('.SendUserMessage', function (e) {
      console.log(e, 'SendUserMessage');
      chatListing(e);
    });
    messageInput.current.focus();
  }, []);

  var chatListing = function chatListing(red) {
    var chat = state.CurrentRoomChat;
    console.log(chat, 'Chat');
    dispatch({
      type: 'CurrentRoomChat',
      payload: {
        Type: 'CurrentRoomChat',
        CurrentRoomChat: chat
      }
    });
  };

  var RoomOnlineUser = function RoomOnlineUser(count) {
    dispatch({
      type: 'RoomOnlineUser',
      payload: {
        Type: 'RoomOnlineUser',
        RoomOnlineUser: count
      }
    });
  };

  var UserTyping = function UserTyping(typing) {
    dispatch({
      type: 'UserTyping',
      payload: {
        Type: 'UserTyping',
        UserTyping: typing
      }
    });
  };

  var handleAddUser = function handleAddUser(e, id) {
    var target = e.target;
    var value = target.value;

    if (target.checked) {
      setSelectedUser([].concat(_toConsumableArray(SelectedUser), [parseInt(value)]));
    } else if (target.checked == false) {
      var _value = SelectedUser.indexOf(parseInt(id));

      if (_value !== -1) {
        SelectedUser.splice(_value, 1);
      }

      setSelectedUser(SelectedUser);
    } else {
      setSelectedUser([]);
    } // setSelectedUser([parseInt(value)]);

  };

  console.log(SelectedUser);

  var handleSubmit = function handleSubmit() {
    var data = {
      roomId: state === null || state === void 0 ? void 0 : state.CurrentRoom.roomId,
      userIds: SelectedUser
    };

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._addUserIntoRoom(data).then(function (res) {
      console.log(res);

      if (res.data.status == 200) {
        setSelectedUser([]);
      } else {
        console.log(res, "Error");
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  var handleFile = function handleFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      return setChatFile(file);
    };
  };

  var handleChat = function handleChat(e) {
    e.preventDefault();
    var form_data;

    if (ChatFile && state.Message == '') {
      var _state$CurrentRoom2;

      form_data = new FormData();
      form_data.append('file', ChatFile, ChatFile.name);
      form_data.append('roomId', state === null || state === void 0 ? void 0 : (_state$CurrentRoom2 = state.CurrentRoom) === null || _state$CurrentRoom2 === void 0 ? void 0 : _state$CurrentRoom2.roomId);
      form_data.append('message', state.Message);
    } else {
      var _state$CurrentRoom3;

      form_data = {
        roomId: state === null || state === void 0 ? void 0 : (_state$CurrentRoom3 = state.CurrentRoom) === null || _state$CurrentRoom3 === void 0 ? void 0 : _state$CurrentRoom3.roomId,
        message: state.Message
      };
    }

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._sendMessage(form_data).then(function (res) {
      if (res.data.status == 200) {
        var _res$data;

        console.log(res);
        setChatFile('');

        if ((state === null || state === void 0 ? void 0 : state.Room) != '') {
          dispatch({
            type: 'CHAT_MESSAGES',
            payload: res === null || res === void 0 ? void 0 : res.data.data
          });
        }

        dispatch({
          type: 'GET_CHAT_ROOM',
          payload: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data
        });
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            Message: ''
          }
        });
      }

      if (res.data.status == "failed") {
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            Message: ''
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  console.log(state, 'CHatState');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "user-message-chat-rit group-message-chat-rit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec u-m-c-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "usr-top-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: state === null || state === void 0 ? void 0 : (_state$CurrentRoom4 = state.CurrentRoom) === null || _state$CurrentRoom4 === void 0 ? void 0 : _state$CurrentRoom4.roomImage,
    alt: state === null || state === void 0 ? void 0 : (_state$CurrentRoom5 = state.CurrentRoom) === null || _state$CurrentRoom5 === void 0 ? void 0 : _state$CurrentRoom5.roomName
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "main-user-msg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, state === null || state === void 0 ? void 0 : (_state$CurrentRoom6 = state.CurrentRoom) === null || _state$CurrentRoom6 === void 0 ? void 0 : _state$CurrentRoom6.roomName), (state === null || state === void 0 ? void 0 : (_state$CurrentRoom7 = state.CurrentRoom) === null || _state$CurrentRoom7 === void 0 ? void 0 : _state$CurrentRoom7.type) == 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "last Seen 4:14 PM ") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#"
  }, "View People")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "usr-top-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    placeholder: "Search this converstion",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "button",
    value: "Show/Hide",
    onClick: function onClick() {
      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_9__["showHideDiv"])('cmn-new-toggle');
    }
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-setting-icon"
  }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "cmn-new-toggle",
    className: "new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-notification-icon"
  }), " Mute")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-delete-icon"
  }), " Delete Chat")), (state === null || state === void 0 ? void 0 : (_state$CurrentRoom8 = state.CurrentRoom) === null || _state$CurrentRoom8 === void 0 ? void 0 : _state$CurrentRoom8.type) == 0 ? '' : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item chat-add-user",
    onClick: function onClick() {
      return Object(_utility_UtilityFunctions__WEBPACK_IMPORTED_MODULE_9__["showHideDiv"])('cmn-new-toggle-add-user');
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-user-icon"
  }), " Add User"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "cmn-new-toggle-add-user",
    className: "new-toggle-dropdown cmn-new-toggle-add-user",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Users :"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "inbox-rit-search"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-search-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    className: "form-control",
    type: "search",
    placeholder: "Search",
    "aria-label": "Search"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-search-icon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, state === null || state === void 0 ? void 0 : state.ContactUsers.map(function (res) {
    var _res$contact_id2, _res$contact_id3;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
      key: res.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
      type: "checkbox",
      onChange: function onChange(e) {
        var _res$contact_id;

        return handleAddUser(e, (_res$contact_id = res.contact_id) === null || _res$contact_id === void 0 ? void 0 : _res$contact_id.id);
      },
      value: (_res$contact_id2 = res.contact_id) === null || _res$contact_id2 === void 0 ? void 0 : _res$contact_id2.id
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "#",
      className: "dropdown-item"
    }, (_res$contact_id3 = res.contact_id) === null || _res$contact_id3 === void 0 ? void 0 : _res$contact_id3.name));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "btn default-btn",
    disabled: SelectedUser.length == 0,
    onClick: handleSubmit
  }, "Add"))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-chat-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat start firstView"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "msgSpace"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    ref: messageEl
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "msg"
  }, state === null || state === void 0 ? void 0 : state.CurrentRoomChat.map(function (res, index) {
    var _res$sender_id, _res$sender_id2, _res$sender_id3, _res$sender_id4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_ChatList__WEBPACK_IMPORTED_MODULE_5__["Message"], {
      key: index,
      isFile: res === null || res === void 0 ? void 0 : res.is_file,
      fileName: res === null || res === void 0 ? void 0 : res.file_name,
      file: _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__["FileManagerPath"] + (res === null || res === void 0 ? void 0 : res.file),
      fileType: res === null || res === void 0 ? void 0 : res.file_type,
      ClassName: ((_res$sender_id = res.sender_id) === null || _res$sender_id === void 0 ? void 0 : _res$sender_id.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? 'first' : 'second',
      userName: (_res$sender_id2 = res.sender_id) === null || _res$sender_id2 === void 0 ? void 0 : _res$sender_id2.username,
      name: ((_res$sender_id3 = res.sender_id) === null || _res$sender_id3 === void 0 ? void 0 : _res$sender_id3.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? null : (_res$sender_id4 = res.sender_id) === null || _res$sender_id4 === void 0 ? void 0 : _res$sender_id4.name,
      Message: res === null || res === void 0 ? void 0 : res.content,
      Time: moment__WEBPACK_IMPORTED_MODULE_7___default.a.utc(res === null || res === void 0 ? void 0 : res.created_at).local().format('hh:mm a') || moment__WEBPACK_IMPORTED_MODULE_7___default()().format('HH:MM A')
    });
  })))), state.CurrentRoom.type === 2 ||  true && state.CurrentRoom.broadcasting === 1 && state.CurrentRoom.createdBy === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat-text-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat-input-inside"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    ref: messageInput,
    id: "msgInput",
    placeholder: "Type here",
    onChange: function onChange(e) {
      return dispatch({
        type: 'MESSAGE',
        payload: e.target.value.trimStart()
      });
    },
    value: state === null || state === void 0 ? void 0 : state.Message,
    autoComplete: "off"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "btnAttach"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "file",
    id: "attachment",
    onChange: handleFile
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    htmlFor: "attachment"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-attach-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn send",
    disabled: state !== null && state !== void 0 && state.Message || ChatFile ? false : true,
    type: "submit"
  }, "Send"))))) : state.CurrentRoom.broadcasting === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    ref: messageInput,
    id: "msgInput",
    placeholder: "Type here",
    onChange: function onChange(e) {
      return dispatch({
        type: 'MESSAGE',
        payload: e.target.value.trimStart()
      });
    },
    value: state === null || state === void 0 ? void 0 : state.Message
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "btnAttach"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "file",
    id: "attachment",
    onChange: handleFile
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    htmlFor: "attachment"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-attach-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn send",
    disabled: state !== null && state !== void 0 && state.Message || ChatFile ? false : true,
    type: "submit"
  }, "Send"))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    ref: messageInput,
    id: "msgInput",
    placeholder: "Only host can send message",
    disabled: true
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (GroupChat);

/***/ }),

/***/ "./resources/js/User/Chats/Screens/Inbox/Inbox.jsx":
/*!*********************************************************!*\
  !*** ./resources/js/User/Chats/Screens/Inbox/Inbox.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Inbox = function Inbox() {
  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "message-right-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec message-top-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "inbox-message-number"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Inbox);

/***/ }),

/***/ "./resources/js/User/Chats/Screens/SingleChat/SingleChat.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/User/Chats/Screens/SingleChat/SingleChat.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ApiServer_UrlService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ApiServer/UrlService */ "./resources/js/ApiServer/UrlService.jsx");
/* harmony import */ var _components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/UserContext/CurrentUserContext/CurrentUser */ "./resources/js/components/UserContext/CurrentUserContext/CurrentUser.js");
/* harmony import */ var _Routes_Auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Routes/Auth */ "./resources/js/Routes/Auth.js");
/* harmony import */ var _ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ChatContext/ChatContext */ "./resources/js/User/Chats/ChatContext/ChatContext.js");
/* harmony import */ var _Components_ChatList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Components/ChatList */ "./resources/js/User/Chats/Screens/Components/ChatList.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../ApiServer/ApiService */ "./resources/js/ApiServer/ApiService.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var SingleChat = function SingleChat(_ref) {
  var _state$CurrentRoom2, _state$CurrentRoom3, _state$ChatStartWith3, _state$CurrentRoom4;

  var showHideDiv = _ref.showHideDiv;
  var currentUser = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_components_UserContext_CurrentUserContext_CurrentUser__WEBPACK_IMPORTED_MODULE_3__["default"]);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_ChatContext_ChatContext__WEBPACK_IMPORTED_MODULE_5__["default"]),
      _useContext2 = _slicedToArray(_useContext, 2),
      state = _useContext2[0],
      dispatch = _useContext2[1];

  var messageEls = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  var messageInputs = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (messageEls) {
      messageEls.current.addEventListener('DOMNodeInserted', function (event) {
        var target = event.currentTarget;
        target.scroll({
          top: target.scrollHeight,
          behavior: 'smooth'
        });
      });
    }

    messageInputs.current.focus();
  }, [state === null || state === void 0 ? void 0 : state.CurrentRoom]);

  var handleChat = function handleChat(e) {
    e.preventDefault();
    var Init = '';

    if (state !== null && state !== void 0 && state.CurrentRoom) {
      var _state$ChatStartWith, _state$CurrentRoom;

      Init = {
        senderId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
        toUserId: state === null || state === void 0 ? void 0 : (_state$ChatStartWith = state.ChatStartWith) === null || _state$ChatStartWith === void 0 ? void 0 : _state$ChatStartWith.id,
        message: state.Message,
        roomId: state === null || state === void 0 ? void 0 : (_state$CurrentRoom = state.CurrentRoom) === null || _state$CurrentRoom === void 0 ? void 0 : _state$CurrentRoom.roomId
      };
    } else {
      var _state$ChatStartWith2;

      Init = {
        senderId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
        toUserId: state === null || state === void 0 ? void 0 : (_state$ChatStartWith2 = state.ChatStartWith) === null || _state$ChatStartWith2 === void 0 ? void 0 : _state$ChatStartWith2.id,
        message: state.Message
      };
    }

    _ApiServer_ApiService__WEBPACK_IMPORTED_MODULE_8__["ApiService"]._initiateChat(Init).then(function (res) {
      console.log(res, state);

      if (res.data.status == 200) {
        var _res$data;

        dispatch({
          type: 'GET_CHAT_ROOM',
          payload: res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data
        });
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            Message: ''
          }
        });
      }

      if (res.data.status == "failed") {
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            Message: ''
          }
        });
      }
    })["catch"](function (error) {
      console.log(error);
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "user-message-chat-rit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-rit-top-heading-sec u-m-c-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "usr-top-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", {
    className: "cmn-profile-pic"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: state === null || state === void 0 ? void 0 : (_state$CurrentRoom2 = state.CurrentRoom) === null || _state$CurrentRoom2 === void 0 ? void 0 : _state$CurrentRoom2.roomImage,
    alt: state === null || state === void 0 ? void 0 : (_state$CurrentRoom3 = state.CurrentRoom) === null || _state$CurrentRoom3 === void 0 ? void 0 : _state$CurrentRoom3.roomName
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "main-user-msg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, (state === null || state === void 0 ? void 0 : (_state$ChatStartWith3 = state.ChatStartWith) === null || _state$ChatStartWith3 === void 0 ? void 0 : _state$ChatStartWith3.name) || (state === null || state === void 0 ? void 0 : (_state$CurrentRoom4 = state.CurrentRoom) === null || _state$CurrentRoom4 === void 0 ? void 0 : _state$CurrentRoom4.roomName)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "usr-top-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "cmn-new-toggle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn link-btn",
    type: "button",
    value: "Show/Hide",
    onClick: function onClick() {
      return showHideDiv('cmn-new-toggle');
    }
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-setting-icon"
  }), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    id: "cmn-new-toggle",
    className: "new-toggle-dropdown",
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-notification-icon"
  }), " Mute")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
    href: "#",
    className: "dropdown-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-delete-icon"
  }), " Delete Chat")))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "message-chat-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat start firstView"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "msgSpace"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    ref: messageEls
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "c-d-fix"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, moment__WEBPACK_IMPORTED_MODULE_0___default()().format('DD MMMM YYYY '))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
    className: "msg"
  }, state === null || state === void 0 ? void 0 : state.CurrentRoomChat.map(function (res, index) {
    var _res$sender_id, _res$sender_id2, _res$sender_id3, _res$sender_id4;

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_ChatList__WEBPACK_IMPORTED_MODULE_6__["Message"], {
      key: index,
      ClassName: ((_res$sender_id = res.sender_id) === null || _res$sender_id === void 0 ? void 0 : _res$sender_id.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? 'first' : 'second',
      userName: (_res$sender_id2 = res.sender_id) === null || _res$sender_id2 === void 0 ? void 0 : _res$sender_id2.username,
      name: ((_res$sender_id3 = res.sender_id) === null || _res$sender_id3 === void 0 ? void 0 : _res$sender_id3.id) == (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? null : (_res$sender_id4 = res.sender_id) === null || _res$sender_id4 === void 0 ? void 0 : _res$sender_id4.name,
      Message: res === null || res === void 0 ? void 0 : res.content,
      Time: moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(res === null || res === void 0 ? void 0 : res.created_at).local().format('hh:mm a') || moment__WEBPACK_IMPORTED_MODULE_0___default()().format('HH:MM A')
    });
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat-text-bx"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "chat-input-inside"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
    onSubmit: handleChat
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "input"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "text",
    ref: messageInputs,
    placeholder: "Type here",
    onChange: function onChange(e) {
      return dispatch({
        type: 'MESSAGE',
        payload: e.target.value.trimStart()
      });
    },
    value: state === null || state === void 0 ? void 0 : state.Message
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "btnAttach"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    type: "file",
    id: "attachment",
    accept: ".png, .jpg, .jpeg"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", {
    htmlFor: "attachment"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
    className: "av av-attach-icon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    className: "btn default-btn send",
    disabled: !(state !== null && state !== void 0 && state.Message),
    type: "submit"
  }, "Send"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (SingleChat);

/***/ })

}]);