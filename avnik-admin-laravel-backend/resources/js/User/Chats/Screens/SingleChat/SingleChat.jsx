import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react';
import 'moment-timezone';

import { FileManagerPath } from '../../../../ApiServer/UrlService';
import CurrentUser from '../../../../components/UserContext/CurrentUserContext/CurrentUser';
import ChatContext from '../../ChatContext/ChatContext';
import {Message} from '../Components/ChatList';


const SingleChat = ({showHideDiv}) => {
const currentUser = useContext(CurrentUser); 
const [state,dispatch,,,,,handleChat] = useContext(ChatContext);



const messageEls = useRef(null);
const messageInputs = useRef(null);

// Auto-scroll to bottom when new messages arrive
useEffect(() => {
  if (messageEls) {
        messageEls.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
  }
  if (messageInputs.current) {
    messageInputs.current.focus();
  }

  return () => {
    dispatch({
      type: "CurrentRoomChat",
      payload: { Type: "CurrentRoomChat", CurrentRoomChat: [] },
    });
  };
}, [state?.CurrentRoom?.roomId])
    return (
        <>
            <div className="user-message-chat-rit">
                                                <div className="cmn-rit-top-heading-sec u-m-c-top">
                                                    <div className="usr-top-left">
                                                        <figure className="cmn-profile-pic">
                                                            <img src={state?.CurrentRoom?.roomImage} alt={state?.CurrentRoom?.roomName} />
                                                        </figure>
                                                        <div className="main-user-msg">
                                                            <strong>{state?.ChatStartWith?.name||state?.CurrentRoom?.roomName}</strong>
                                                            {/* <span>{state?.ChatStartWith?.name?'last Seen':'Online'}</span> */}
                                                        </div>
                                                    </div>
                                                    <div className="usr-top-right">
                                                        <div className="cmn-new-toggle">
                                                            <button className="btn link-btn" type="button" value="Show/Hide" onClick={()=>showHideDiv('cmn-new-toggle')}> <i className="av av-setting-icon"></i> </button>
                                                            <div id="cmn-new-toggle" className="new-toggle-dropdown" style={{display:'none'}}>
                                                                <ul>
                                                                    <li><a href="#" className="dropdown-item"><i className="av av-notification-icon"></i> Mute</a></li>
                                                                    <li><a href="#" className="dropdown-item"><i className="av av-delete-icon"></i> Delete Chat</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="message-chat-list">
                                                <div className="chat start firstView">
                                                    <div className="msgSpace">
                                                        <div ref={messageEls}>
                                                            <div className="c-d-fix"> <span>{moment().format('DD MMMM YYYY ')}</span></div>
                                                            <ul className="msg">
                                                            {state?.CurrentRoomChat.map((res,index)=>
                                                                <Message
                                                                    key={index}
                                                                    isFile={res?.is_file}
                                                                    fileName={res?.file_name}
                                                                    file={res?.file ? FileManagerPath + res?.file : ""}
                                                                    fileType={res?.file_type}
                                                                    ClassName={res.sender_id?.id==currentUser?.id?'first':'second'}
                                                                    userName={res.sender_id?.username}
                                                                    name={res.sender_id?.id==currentUser?.id?null:res.sender_id?.name}
                                                                    Message={res?.content}
                                                                    Time={moment.utc(res?.created_at).local().format('hh:mm a')||moment().format('HH:MM A')}
                                                                />
                                                            )}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="chat-text-bx"> 
                                                    <div className="chat-input-inside">
                                                    <form onSubmit={handleChat} >
                                                        <div className="input">
                                                            <input type="text" ref={messageInputs} placeholder="Type here" onChange={(e)=>dispatch({type:'MESSAGE',payload:e.target.value.trimStart()})} value={state?.Message} />
                                                            <div className="btnAttach">
                                                                <input type="file" id="attachment" accept=".png, .jpg, .jpeg" />
                                                                <label htmlFor="attachment"><i className="av av-attach-icon"></i></label>
                                                            </div>
                                                            <button className="btn default-btn send" disabled={!state?.Message} type="submit">Send</button>
                                                        </div>
                                                    </form>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div> 
        </>
    );
}

export default SingleChat;
