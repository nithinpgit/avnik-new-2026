import Axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FileManagerPath } from "../../../../ApiServer/UrlService";
import Auth from "../../../../Routes/Auth";
import ChatContext from "../../ChatContext/ChatContext";
import { Message } from "../Components/ChatList";
import CurrentUser from "../../../../components/UserContext/CurrentUserContext/CurrentUser";
import moment from "moment";
import { ApiService } from "../../../../ApiServer/ApiService";
import { showHideDiv } from "../../../../utility/UtilityFunctions";
const GroupChat = () => {
    const [state, dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom,handleChat,DeleteChatRoom,removeUserFromRoom] = useContext(ChatContext);
    const currentUser = useContext(CurrentUser);
    const [SelectedUser, setSelectedUser] = useState([]);

    var SelectedUserCheck = [];

    const messageEl = useRef(null);
    const messageInput = useRef(null);

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener("DOMNodeInserted", (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: "smooth" });
            });
        }
        messageInput.current.focus();
        
        return () => {
            dispatch({
                type: "CurrentRoomChat",
                payload: { Type: "CurrentRoomChat", CurrentRoomChat: [] },
            });
        };
    }, [state?.CurrentRoom?.roomId]);
    
    const chatListing = (red) => {
        let chat = state.CurrentRoomChat;
        console.log(chat, "Chat");
        dispatch({
            type: "CurrentRoomChat",
            payload: { Type: "CurrentRoomChat", CurrentRoomChat: chat },
        });
    };

    const RoomOnlineUser = (count) => {
        dispatch({
            type: "RoomOnlineUser",
            payload: { Type: "RoomOnlineUser", RoomOnlineUser: count },
        });
    };
    const UserTyping = (typing) => {
        dispatch({
            type: "UserTyping",
            payload: { Type: "UserTyping", UserTyping: typing },
        });
    };
    const handleAddUser = (e, id) => {
        const target = e.target;
        var value = target.value;

        if (target.checked) {
            setSelectedUser([...SelectedUser, parseInt(value)]);
        } else if (target.checked == false) {
            const value = SelectedUser.indexOf(parseInt(id));
            if (value !== -1) {
                SelectedUser.splice(value, 1);
            }
            setSelectedUser(SelectedUser);
        } else {
            setSelectedUser([]);
        }

        // setSelectedUser([parseInt(value)]);
    };

    console.log(SelectedUser,'SelectedUser');
    const handleSubmit = () => {
        let data = {
            roomId: state?.CurrentRoom.roomId,
            userIds: SelectedUser,
        };
        ApiService._addUserIntoRoom(data)
            .then((res) => {
                console.log(res);
                if (res.data.status == 200) {
                    setSelectedUser([]);
                } else {
                    console.log(res, "Error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleFile = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = (e) => dispatch({type:"CHAT_FILE_DATA",payload:{Type:"CHAT_FILE_DATA",ChatFile:file}});
    };
   
    const broadcastingToggle = (e) => {
        e.preventDefault();
       
        const form_data = {
                roomId: state?.CurrentRoom?.roomId,
            };
        
        ApiService.broadcastingToggle(form_data)
            .then((res) => {
                if (res.data.status == 200) {
                    dispatch({type:"SET_BROADCAST",payload:{Type:"SET_BROADCAST",CurrentRoom:{...state.CurrentRoom,...{broadcasting:res.data.data}}}});
                     toastr["success"](res.data.message);
                     }
                if (res.data.status == "failed") {
                 toastr["erorr"](res.data.message);
                    
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    console.log(state, "CHatState");
    console.log(state.CurrentRoom.createdBy,state.broadcasting , currentUser?.id, "check");
    return (
        <>
            <div className="user-message-chat-rit group-message-chat-rit">
                <div className="cmn-rit-top-heading-sec u-m-c-top">
                    <div className="usr-top-left">
                        <figure className="cmn-profile-pic">
                            <img
                                src={state?.CurrentRoom?.roomImage}
                                alt={state?.CurrentRoom?.roomName}
                            />
                        </figure>
                        <div className="main-user-msg">
                            <strong>{state?.CurrentRoom?.roomName} {state?.CurrentRoom?.type == 2?<small> ({moment(state?.CurrentRoom?.eventSlot).format('DD,MMM YY hh:mm A')})</small>:""}</strong>
                            {state?.CurrentRoom?.type == 0 ? (
                                <span>Last Seen {moment().calendar(null, {
                                        lastDay: "[Yesterday] hh:mm A",
                                        sameDay: "[Today] @ hh:mm A",
                                        nextDay: "[Tomorrow] @ hh:mm A",
                                        lastWeek: "[Last Week] DD MMM, YYYY",
                                        nextWeek: "[Next Week] DD MMM, YYYY",
                                        sameElse: "L"
                                    })} </span>
                            ) : (
                                <span>
                                    <a href="#">Active</a>
                                </span>
                                
                            )}
                        </div>
                    </div>
                    {state?.CurrentRoom?.createdBy==currentUser?.id&&state?.CurrentRoom?.type>0?<div className="cmn-search-bx col-md-3">
                            <label>Broadcasting</label>

                            <input
                                className="form-control flo"
                                type="checkbox"
                                onChange={broadcastingToggle}
                                checked={state?.CurrentRoom?.broadcasting}
                                value={state?.CurrentRoom?.broadcasting}
                            />
                        </div>:''}
                    <div className="usr-top-right">
                        
                        {/* <div className="cmn-search-bx">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search this converstion"
                                aria-label="Search"
                            />
                            <button className="btn link-btn" type="submit">
                                <i className="av av-search-icon"></i>
                            </button>
                        </div> */}
                        <div className="cmn-new-toggle">
                            <button
                                className="btn link-btn"
                                type="button"
                                value="Show/Hide"
                                onClick={() => showHideDiv("cmn-new-toggle")}
                            >
                                {" "}
                                <i className="av av-setting-icon"></i>{" "}
                            </button>
                            <div
                                id="cmn-new-toggle"
                                className="new-toggle-dropdown"
                                style={{ display: "none" }}
                            >
                                <ul>
                                    <li>
                                        <a href="#" className="dropdown-item">
                                            <i className="av av-notification-icon"></i>{" "}
                                            Mute
                                        </a>
                                    </li>
                                    {state?.CurrentRoom?.type == 0 ?"":<li>
                                        <a href="#" onClick={()=>removeUserFromRoom(state?.CurrentRoom?.roomId,currentUser?.id)} className="dropdown-item">
                                            <i className="av av-delete-icon"></i>{" "}
                                            Leave Chat
                                        </a>
                                    </li>}
                                    {state?.CurrentRoom?.type == 0 ? (
                                        ""
                                    ) : ""}
                                    {/* (
                                        <li>
                                            <a
                                                href="#"
                                                className="dropdown-item chat-add-user"
                                                onClick={() =>
                                                    showHideDiv(
                                                        "cmn-new-toggle-add-user"
                                                    )
                                                }
                                            >
                                                <i className="av av-user-icon"></i>{" "}
                                                Add User
                                            </a>
                                        </li>
                                    ) */}
                                </ul>
                                <div
                                    id="cmn-new-toggle-add-user"
                                    className="new-toggle-dropdown cmn-new-toggle-add-user"
                                    style={{ display: "none" }}
                                >
                                    <strong>Users :</strong>
                                    <div className="inbox-rit-search">
                                        <div className="cmn-search-bx">
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                            <button
                                                className="btn link-btn"
                                                type="submit"
                                            >
                                                <i className="av av-search-icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <ul>
                                        {state?.ContactUsers.map((res) => (
                                            <li key={res.id}>
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        handleAddUser(
                                                            e,
                                                            res.contact_id?.id
                                                        )
                                                    }
                                                    value={res.contact_id?.id}
                                                />
                                                <a
                                                    href="#"
                                                    className="dropdown-item"
                                                >
                                                    {res.contact_id?.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        className="btn default-btn"
                                        disabled={SelectedUser.length == 0}
                                        onClick={handleSubmit}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="message-chat-list">
                <div className="chat start firstView">
                    <div className="msgSpace">
                        <div ref={messageEl}>
                            <ul className="msg">
                                {state?.CurrentRoomChat.map((res, index) => (
                                    <Message
                                        key={index}
                                        isFile={res?.is_file}
                                        fileName={res?.file_name}
                                        file={FileManagerPath + res?.file}
                                        fileType={res?.file_type}
                                        ClassName={
                                            res.sender_id?.id == currentUser?.id
                                                ? "first"
                                                : "second"
                                        }
                                        userName={res.sender_id?.username}
                                        name={
                                            res.sender_id?.id == currentUser?.id
                                                ? null
                                                : res.sender_id?.name
                                        }
                                        Message={res?.content}
                                        Time={
                                            moment
                                                .utc(res?.created_at)
                                                .local()
                                                .format("hh:mm a") ||
                                            moment().format("HH:MM A")
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    {
                    (state.CurrentRoom.broadcasting === 1 &&
                        state.CurrentRoom.createdBy === currentUser?.id) ? (
                        <div className="chat-text-bx">
                            <div className="chat-input-inside">
                                <form onSubmit={handleChat}>
                                    <div className="input">
                                        <input
                                            type="text"
                                            ref={messageInput}
                                            id="msgInput"
                                            placeholder="Type here"
                                            onChange={(e) =>
                                                dispatch({
                                                    type: "MESSAGE",
                                                    payload:
                                                        e.target.value.trimStart(),
                                                })
                                            }
                                            value={state?.Message}
                                            autoComplete="off"
                                        />
                                        <div className="btnAttach">
                                            <input
                                                type="file"
                                                id="attachment"
                                                onChange={handleFile}
                                            />
                                            <label htmlFor="attachment">
                                                <i className="av av-attach-icon"></i>
                                            </label>
                                        </div>
                                        <button
                                            className="btn default-btn send"
                                            disabled={
                                                state?.Message || state?.ChatFile
                                                    ? false
                                                    : true
                                            }
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : state.CurrentRoom.broadcasting == 0 ? (
                        <form onSubmit={handleChat}>
                            <div className="input">
                                <input
                                    type="text"
                                    ref={messageInput}
                                    id="msgInput"
                                    placeholder="Type here"
                                    onChange={(e) =>
                                        dispatch({
                                            type: "MESSAGE",
                                            payload: e.target.value.trimStart(),
                                        })
                                    }
                                    value={state?.Message}
                                />
                                <div className="btnAttach">
                                    <input
                                        type="file"
                                        id="attachment"
                                        onChange={handleFile}
                                    />
                                    <label htmlFor="attachment">
                                        <i className="av av-attach-icon"></i>
                                    </label>
                                </div>
                                <button
                                    className="btn default-btn send"
                                    disabled={
                                        state?.Message || state?.ChatFile
                                            ? false
                                            : true
                                    }
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleChat}>
                            <div className="input">
                                <input
                                    type="text"
                                    ref={messageInput}
                                    id="msgInput"
                                    placeholder="Only host can send message"
                                    disabled={true}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default GroupChat;
