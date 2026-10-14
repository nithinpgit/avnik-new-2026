import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { ApiService } from '../../../../ApiServer/ApiService';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import Auth from '../../../../Routes/Auth';
import ChatContext from '../../ChatContext/ChatContext';

const ConversationList = ({type,bgColor,createdBy,profilePic,userName,lastMessage,lastMessageTime,isRoom,RoomId,broadcasting,eventSlot}) => {
    const [state,dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom] = useContext(ChatContext);
    return (
        <>
            <li className="active" style={{background:bgColor}} key={RoomId}>
                <div className="in-user-bx">
                    <figure className="cmn-profile-pic">
                        <img src={profilePic} alt={userName} />
                    </figure>
                    <div className="in-rit-user-bx">
                        <div className="name-date-text">
                            <p >
                                <span onClick={() =>EnterInChatRoom(RoomId,{type:type,eventSlot:eventSlot,broadcasting:broadcasting,createdBy:createdBy,roomImage:profilePic,isRoom:isRoom,roomId:RoomId,roomName:userName})}>
                                    {userName} {type==2?<small> ({moment(eventSlot).format('DD,MMM YY hh:mm A')})</small> :""}                                     
                                </span>
                            </p>
                            <span>{lastMessageTime?moment.utc(lastMessageTime).local().format('hh:mm A'):''}</span>
                        </div>
                        <div className="in-m-text-bx">
                            <p>{lastMessage}</p>
                            <a href="#"><i className="av av-favorite-icon"></i> </a>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default ConversationList;
