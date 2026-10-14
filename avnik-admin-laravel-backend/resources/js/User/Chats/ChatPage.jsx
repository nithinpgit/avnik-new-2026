import React, {
    Component,
    useContext,
    useEffect,
    useReducer,
    useState,
    useRef,
} from "react";
import { FileManagerPath } from "../../ApiServer/UrlService";
import CreateGroup from "./Modals/CreateGroup/CreateGroup";
import GroupMessageTab from "./Pages/GroupMessageTab/GroupMessageTab";
import GroupChat from "./Screens/GroupChat/GroupChat";
import Inbox from "./Screens/Inbox/Inbox";
import SingleChat from "./Screens/SingleChat/SingleChat";

import ChatContext from "./ChatContext/ChatContext";
import reducer from "./Reducer/ChatReducer/ChatReducer";
import ChatLeftSidebar from "./Screens/ChatLeftSidebar/ChatLeftSidebar";
import { Redirect } from "react-router";
import Auth from "../../Routes/Auth";
import Axios from "axios";
// import Echo from 'laravel-echo';

import CurrentUser from "../../components/UserContext/CurrentUserContext/CurrentUser";

import { ApiService } from "../../ApiServer/ApiService";
import { showHideDiv } from "../../utility/UtilityFunctions";
import io from "socket.io-client";
import moment from "moment";
import 'moment-timezone';

// Socket configuration constants - Dynamic for dev/prod
const hostname = window.location.hostname;
const protocol = window.location.protocol === "https:" ? "https" : "http";
const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";
const envSocketHost =
    process.env.MIX_SOCKET_HOST ||
    process.env.MIX_LARAVEL_WEBSOCKETS_HOST;
const envSocketPort =
    process.env.MIX_SOCKET_PORT ||
    process.env.MIX_LARAVEL_WEBSOCKETS_PORT ||
    (isLocalHost ? "8081" : "");
const envSocketScheme =
    process.env.MIX_SOCKET_SCHEME ||
    process.env.MIX_LARAVEL_WEBSOCKETS_SCHEME ||
    protocol;
const socketHost = envSocketHost || hostname;
const DEFAULT_PROD_SOCKET = "https://api.avnik.com";

let SOCKET_URL;
if (envSocketHost || envSocketPort) {
    SOCKET_URL = `${envSocketScheme}://${socketHost}${envSocketPort ? `:${envSocketPort}` : ""}`;
} else if (isLocalHost) {
    // use current origin for local development
    SOCKET_URL = window.location.origin;
} else {
    // default to live domain without port
    SOCKET_URL = DEFAULT_PROD_SOCKET;
}
const SOCKET_OPTIONS = {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
    autoConnect: true,
    secure: SOCKET_URL.startsWith("https"),
    path: '/socket.io'
};
const initialState = {
    Inbox: true,
    GroupMessage: false,
    ChatFile:"",
    SingleMessage: false,
    GroupMessageTab: false,
    Conversations: [],
    ConversationsPagination: {
        current_page: 1,
        next_page: null,
    },
    ChatList: [],
    ChatStartWith: "",
    Message: "",
    FilterBy: "All",
    Room: "",
    CreateGroup: false,
    CurrentRoom: JSON.parse(localStorage.getItem('_cr'))?JSON.parse(localStorage.getItem('_cr')):'',
    CurrentRoomChat: [],
    ContactsList: [],
    MyGroups: [],
    Preloader:true,
    EditGroupContent:'',
    EditGroupRoomId:'',
    EditGroup: false,
    MyGroupsPagination: "",
    ContactUsers: [],
    RoomOnlineUser: 0,
    viewGroupPeoples:[],
    UserTyping: null,
    ContactListPagination: "",
    changes: false,
    SelectedUserIds: [],
    random: 0,
};
var ChatStart = "";
export const chatInitiate = (toUser) => {
    ChatStart = toUser;
};
const buildRoomSelection = (roomData, currentUser) => {
    if (!roomData) {
        return null;
    }

    const chatRoom = roomData?.chat_room || roomData;
    const isGroupedRoom = chatRoom?.type == 1 || chatRoom?.type == 2 || chatRoom?.type == 3;
    const singleChatUser =
        chatRoom?.type == 0
            ? chatRoom?.created_by?.id == currentUser?.id
                ? chatRoom?.chat_with
                : chatRoom?.created_by
            : null;

    return {
        type: chatRoom?.type,
        eventSlot: chatRoom?.event_slot?.start_date_time,
        broadcasting: chatRoom?.broadcasting,
        createdBy: chatRoom?.created_by?.id,
        roomImage:
            chatRoom?.group_image != null
                ? FileManagerPath + chatRoom?.group_image
                : singleChatUser?.user_profile?.profile_picture
                ? FileManagerPath + singleChatUser?.user_profile?.profile_picture
                : singleChatUser?.user_profile?.social_profile_picture_url
                ? singleChatUser?.user_profile?.social_profile_picture_url
                : `${FileManagerPath}${
                      isGroupedRoom
                          ? chatRoom?.broadcasting == 1
                              ? "public/assets/images/broadcastAvatar.png"
                              : "public/assets/images/groupAvatar.png"
                          : "/public/assets/images/userAvatar.png"
                  }`,
        isRoom: isGroupedRoom,
        roomId: roomData?.room_id || chatRoom?.id,
        roomName: chatRoom?.type == 0 ? singleChatUser?.name : chatRoom?.room_name,
    };
};
const ChatPage = (props) => {
    const currentUser = useContext(CurrentUser);
    const [state, dispatch] = useReducer(reducer, initialState);
    const socketRef = useRef(null);
    const [socketConnected, setSocketConnected] = useState(false);

    // Initialize Socket connection
    useEffect(() => {
        if (!currentUser?.id) return; // Don't connect if no user
        
        // Create socket connection with proper configuration
        const socketInstance = io.connect(SOCKET_URL, SOCKET_OPTIONS);
        
        // Store instance in ref immediately for immediate access
        socketRef.current = socketInstance;

        // Connection event
        socketInstance.on('connect', () => {
            console.log('Socket connected with ID:', socketInstance.id);
            setSocketConnected(true);
            // Send user identification to server
            if (currentUser?.id) {
                socketInstance.emit('userIdentification', { userId: currentUser.id });
            }
        });

        // Receive new message
        socketInstance.on('onReceiveSendToAllAVF', (data) => {
            try {
                const content = typeof data === 'string' ? JSON.parse(data) : data;
                if (content?.room_id === state?.CurrentRoom?.roomId) {
                    dispatch({ type: "CURRENT_ROOM_CHAT_ADD", payload: content });
                }
            } catch (error) {
                console.error('Error parsing message data:', error);
            }
        });

        // Receive conversation update
        socketInstance.on('getConversationAllAVF', (data) => {
            try {
                console.log('Conversation update received:', data);
                getConversation();
            } catch (error) {
                console.error('Error processing conversation update:', error);
            }
        });

        // User typing indicator
        socketInstance.on('userTypingAVF', (data) => {
            try {
                const typingData = typeof data === 'string' ? JSON.parse(data) : data;
                console.log('User typing data received:', typingData);
                dispatch({ type: "USER_TYPING", payload: typingData });
            } catch (error) {
                console.error('Error processing typing indicator:', error);
            }
        });

        // Room member online/offline status
        socketInstance.on('roomUsersOnlineAVF', (data) => {
            try {
                const userCount = typeof data === 'number' ? data : data?.count;
                dispatch({ type: "ROOM_ONLINE_USER", payload: userCount || 0 });
            } catch (error) {
                console.error('Error processing online users:', error);
            }
        });

        // Connection error handling
        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', {
                message: error?.message,
                description: error?.description,
                type: error?.type,
                transport: socketInstance?.io?.engine?.transport?.name,
                url: SOCKET_URL
            });
            setSocketConnected(false);
        });

        // Reconnection event
        socketInstance.on('reconnect', () => {
            console.log('Socket reconnected');
            setSocketConnected(true);
            if (currentUser?.id) {
                socketInstance.emit('userIdentification', { userId: currentUser.id });
            }
        });

        // Disconnection event
        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            setSocketConnected(false);
        });

        // Cleanup on unmount
        return () => {
            socketInstance.off('connect');
            socketInstance.off('onReceiveSendToAllAVF');
            socketInstance.off('getConversationAllAVF');
            socketInstance.off('userTypingAVF');
            socketInstance.off('roomUsersOnlineAVF');
            socketInstance.off('connect_error');
            socketInstance.off('reconnect');
            socketInstance.off('disconnect');
            socketInstance.disconnect();
            socketRef.current = null;
            setSocketConnected(false);
        };
    }, [currentUser?.id]);

    // Initialize conversations and contacts on mount
    useEffect(() => {
        getConversation();
        getContactList();
    }, [state.random]);

    // Handle localStorage chat room on mount
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('_cr'))) {
            dispatch({
                type: 'SINGLE_CHAT_TRUE',
                payload: { Type: 'SINGLE_CHAT_TRUE', SingleMessage: true }
            });
        }
    }, []);
const SearchConversation=(query)=>{
    let data={
        search:query,
    }
    getConversation(data);
}
// handle chat messages 
const handleChat = (e) => {
    e.preventDefault();

    // Check actual socket connection state, not just the state variable
    if (!socketRef.current || !socketRef.current.connected) {
        console.warn('Socket not ready:', { 
            hasSocket: !!socketRef.current, 
            connected: socketRef.current?.connected,
            stateConnected: socketConnected
        });
        toastr["error"]('Connecting to chat... Please try again.');
        return;
    }

    var form_data;
    if (state.ChatFile && state.Message == "") {
        form_data = new FormData();
        form_data.append("file", state.ChatFile, state.ChatFile.name);
        form_data.append("roomId", state?.CurrentRoom?.roomId);
        form_data.append("message", state.Message);
        form_data.append("tz", moment.tz.guess());
    } else {
        form_data = {
            roomId: state?.CurrentRoom?.roomId,
            message: state.Message,
            tz: moment.tz.guess(),
        };
    }
    ApiService._sendMessage(form_data)
        .then((res) => {
            if (res.data.status == 200) {
                console.log('Message sent:', res.data.data);
                if (JSON.parse(localStorage.getItem('_cr'))) {
                    localStorage.removeItem('_cr');
                }
                localStorage.setItem('last_active_room', res?.data?.data?.room_id);

                dispatch({ type: "CHAT_FILE_DATA", payload: { Type: "CHAT_FILE_DATA", ChatFile: "" } });
                
                // Update local state
                if (state?.Room != "") {
                    dispatch({
                        type: "CHAT_MESSAGES",
                        payload: res?.data.data,
                    });
                }
                dispatch({
                    type: "GET_CHAT_ROOM",
                    payload: res?.data?.data,
                });
                dispatch({
                    type: "SEND_MESSAGE",
                    payload: { Message: "" },
                });
                dispatch({ type: "CURRENT_ROOM_CHAT_ADD", payload: res.data.data });

                // Emit events to other users via socket
                if (socketRef.current && socketRef.current.connected) {
                    socketRef.current.emit("sendToAllAVF", res.data.data);
                    socketRef.current.emit('sendConversationAllAVF', res.data.data);
                } else {
                    console.warn('Socket not connected when emitting after message send', {
                        hasSocket: !!socketRef.current,
                        connected: socketRef.current?.connected
                    });
                }
            }
            if (res.data.status == "failed") {
                toastr["error"](res.data.message || 'Failed to send message');
                dispatch({
                    type: "SEND_MESSAGE",
                    payload: { Message: "" },
                });
            }
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            toastr["error"]('Error sending message. Please try again.');
        });
};

// join room function 
const joinRoom = (RoomId) => {
    // Check actual socket.connected property, not just the state
    if (socketRef.current && socketRef.current.connected) {
        console.log('Joining room:', RoomId, 'with userId:', currentUser?.id);
        socketRef.current.emit("joinChatRoomAVF", {
            roomId: RoomId,
            userId: currentUser?.id
        });
    } else {
        console.warn('Socket not connected, cannot join room', {
            hasSocket: !!socketRef.current,
            connected: socketRef.current?.connected,
            stateConnected: socketConnected
        });
        // Try again in 500ms
        setTimeout(() => {
            if (socketRef.current && socketRef.current.connected) {
                console.log('Retrying room join after 500ms:', RoomId);
                socketRef.current.emit("joinChatRoomAVF", {
                    roomId: RoomId,
                    userId: currentUser?.id
                });
            } else {
                console.warn('Socket still not connected after 500ms retry');
            }
        }, 500);
    }
}

// Enter Rooms
const EnterInChatRoom = (RoomId, obj) => {
    let data = {
        roomId: RoomId
    }
    ApiService._enterChatRoom(data).then((res) => {
        if (res.data.status == 200) {
            dispatch({ type: 'PRELOADER', payload: { Type: 'PRELOADER', Preloader: false } });

            setTimeout(() => {
                if (JSON.parse(localStorage.getItem('_cr'))?.roomId == RoomId) {
                    // Already in room
                } else {
                    dispatch({ type: 'CURRENT_ROOM_CHAT', payload: res?.data?.data.data })
                }
                joinRoom(RoomId);  // This will now pass userId with roomId
                // localStorage.setItem('last_active_room', RoomId);
            }, 100);
            if (JSON.parse(localStorage.getItem('_cr'))?.roomId == RoomId) {
                // Already in room
            } else {
                dispatch({ type: 'SELECTED_CONVERSATION', payload: obj })
            }
        }
        dispatch({ type: 'PRELOADER', payload: { Type: 'PRELOADER', Preloader: false } });

    }).catch((error) => {
        console.error('Error entering chat room:', error);
        dispatch({ type: 'PRELOADER', payload: { Type: 'PRELOADER', Preloader: false } });
    })
}
// Delete Room

const DeleteChatRoom=(roomId)=>{
    if(confirm('Are you sure to delete this group?')){
        ApiService._deleteRoom({roomId}).then((res)=>{
            if(res?.data.status==200){
                dispatch({type:"DELETE_ROOM",payload:{Type:"DELETE_ROOM",MyGroups:state?.MyGroups?.filter((room)=>room?.id!=roomId),Conversations:state?.Conversations?.filter((room)=>room?.room_id!=roomId)}})
            }
        }).catch((error)=>{
            console.log(error);
        })   
    } 
}
// end Delete Room
// search contacts for create room
const searchMyContacts=(search)=>{
    let data={
        selectedUser:[],
        search:search,
        roomId:state?.EditGroup?state?.EditGroupRoomId:'',
    }
    ApiService._searchMyContacts(data).then((res)=>{
        if(res.data.status==200){
            dispatch({type:'SEARCH_CONTACTS_LIST',payload:{Type:'SEARCH_CONTACTS_LIST',ContactsList:res.data.data}});
        }
    }).catch((error)=>{
        console.log(error);
    })
}
// end search contacts

    const getConversation = (data) => {
        ApiService._fetchAllMessages(data)
            .then((res) => {
             dispatch({ type:'PRELOADER',payload:{Type:'PRELOADER',Preloader:false}});

                if (res.data.status == 200) {
                    dispatch({
                        type: "CONVERSATIONS",
                        payload: res.data.data.data,
                    });
                    dispatch({
                        type: "CONVERSATIONS_PAGINATION",
                        payload: {
                            current_page: res.data.data.current_page,
                            next_page: res.data.data.next_page_url,
                        },
                    });

                    setTimeout(() => {
                        if(res.data.data.data?.length>0){
                            const rooms = res.data.data.data;
                            const storedCurrentRoom = JSON.parse(localStorage.getItem('_cr') || 'null');
                            const preferredRoomId =
                                storedCurrentRoom?.roomId ||
                                localStorage.getItem('last_active_room') ||
                                currentUser?.last_active_room;
                            const roomData =
                                rooms?.find((resData) => String(resData?.room_id) === String(preferredRoomId)) ||
                                rooms[0];
                            const selectedRoom = buildRoomSelection(roomData, currentUser);

                            if (roomData && selectedRoom) {
                                EnterInChatRoom(roomData?.room_id, selectedRoom);
                            }
                        }
                    }, 2000);

                }
            })
            .catch((error) => {
                dispatch({ type:'PRELOADER',payload:{Type:'PRELOADER',Preloader:false}});
            });
    };
    const listenConversations = (res) => {
        if (res.status == 200) {
            dispatch({ type: "CONVERSATIONS", payload: res.data.data });
            dispatch({
                type: "CONVERSATIONS_PAGINATION",
                payload: {
                    current_page: res.data.current_page,
                    next_page: res.data.next_page_url,
                },
            });
        }
    };

    const getContactList = (search) => {
        let data = {
            nextPage: undefined,
            query: search ? search : "",
        };
        ApiService._fetchAllContacts(data)
            .then((res) => {
                if (res.data.status == 200) {
                    dispatch({
                        type: "CONTACT_LIST",
                        payload: res.data.data.data,
                    });
                    dispatch({
                        type: "CONTACT_LIST_PAGINATION",
                        payload: res.data.data.data,
                    });
                }
            })
            .catch((error) => {});
    };

    const addContactUserToRoom=(room)=>{
        if(state?.SelectedUserIds?.length>0&&room>0){
            let data={
                roomId: room,
            userIds: state?.SelectedUserIds,
            }
            ApiService._addUserIntoRoom(data).then((res)=>{
                if(res.data.status==200){
                    // $('.modal').hide();
                    
                    showHideDiv('cmn-new-toggle')
                    toastr["success"]('User added successfully');
                }else{
                    showHideDiv('cmn-new-toggle')
                    toastr["error"](res.data.message);
                }
                dispatch({
                        type: "SELECT_USER_IDS",
                        payload: [],
                    });
            }).catch((error)=>{
                console.log(error)
                return toastr["error"]('Something went wrong');
            })
        } 
    }

    // _viewGroupPeoples List

    const viewGroupPeoples =(room)=>{
        dispatch({
                        type:"VIEW_GROUP_PEOPLE",
                        payload:[]
                    })
        let data={
            roomId:room
        }
        ApiService._viewGroupPeoples(data).then((res)=>{
            if(res.data.status==200){
                if(res.data.data.data?.length>0){
                    dispatch({
                        type:"VIEW_GROUP_PEOPLE",
                        payload:res.data.data.data
                    })
                }
            }else{

            }
        }).catch((error)=>{
            console.log(error);
        })
    }
// end viewGroupPeoples

// remove user from room
const removeUserFromRoom = (roomId, userId) => {
    if(confirm('Are you sure?')){
        let data={
            userIds:[userId],
            roomId:roomId
        }
        ApiService._removeUserFromRoom(data).then((res)=>{
            if(res?.data.status==200){
             dispatch({type:"RemoveROOMUser",payload:{Type:"RemoveROOMUser",Conversations:state?.Conversations?.filter((filter)=>filter?.room_id!=roomId),GroupMessage:false,viewGroupPeoples:state?.viewGroupPeoples.filter((user)=>user?.room_user?.id!=userId)}});
             
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
// end remove user from room
    const DataChat = [state, dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom,handleChat,DeleteChatRoom,removeUserFromRoom,getContactList];
    // For Title
    document.title = "Messages";
    console.log(state,'main');
    return (
        <>
            <ChatContext.Provider value={DataChat}>
                <div
                    className="ah-tab-content"
                    data-ah-tab-active={props.Active}
                >
                    <div className="message-content-sec">
                        <ChatLeftSidebar />
                    </div>
                </div>
                <CreateGroup searchMyContacts={searchMyContacts}/>
            </ChatContext.Provider>
        </>
    );
};
export default ChatPage;
