import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../../../ApiServer/ApiService';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import Auth from '../../../../Routes/Auth';
import ChatContext from '../../ChatContext/ChatContext';
import { showHideDiv } from '../../../../utility/UtilityFunctions';
var visibleViewPeople=0;
const GroupMessageTab = ({ showHideDiv }) => {
    const [state, dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom,handleChat,DeleteChat,removeUserFromRoom,getContactList] = useContext(ChatContext);
    useEffect(() => {
        fetchMyGroups("");
        return ()=>{

        }
    }, [state.FilterBy]);

   

    const fetchMyGroups = (q,type) => {
        let data = {
            roomType: type?type:state.FilterBy,
            nextPage: '',
            search:q
        }
        ApiService._fetchMyRoom(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'MyGroups', payload: { Type: 'MyGroups', MyGroups: res.data.data.data } })
                dispatch({ type: 'MyGroupsPagination', payload: { Type: 'MyGroupsPagination', MyGroupsPagination: res.data.data } })
            } else {

            }

        }).catch((error) => {

        })
    }
    const editRoom=(obj)=>{
setTimeout(() => {
    dispatch({ type: 'EDIT_GROUP_MESSAGE', payload: { Type:'EDIT_GROUP_MESSAGE',SelectedUserIds:[],ContactsList:[],EditGroupContent:obj,EditGroupRoomId:obj?.id,EditGroup:true}})
}, 100);    
        $('#create-group-popup').modal('show');
    }

    return (
        <>
            <div className="message-right-bx groups-right-bx">
                <div className="cmn-rit-top-heading-sec message-top-bx">
                    <div className="inbox-message-number">
                        {/* You have (<span>3</span> new contacts) */}
                    </div>
                    <div className="inbox-rit-search">
                        <div className="cmn-new-toggle move-group-dd">
                            {state?.SelectedUserIds?.length>0?<button className="btn link-btn" type="button" value="Show/Hide" onClick={() => showHideDiv('cmn-new-toggle')}>
                                <i className="av av-move-file-icon"></i>
                            </button>:""}
                            <div id="cmn-new-toggle" className="new-toggle-dropdown" style={{ display: 'none' }}>
                                <strong> Add Contact {state?.SelectedUserIds?.length>1?"s":""} to :</strong>
                                <div className="inbox-rit-search">
                                    <div className="cmn-search-bx">
                                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>fetchMyGroups(e.target.value,"MyGroups")} />
                                        <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                    </div>
                                </div>
                                <ul>
                                {state?.MyGroups.map((res) =>
                                    <li><a href="#" className="dropdown-item" onClick={()=>addContactUserToRoom(res?.id)}>{res?.room_name}</a></li>
                                )}
                                </ul>
                            </div>
                        </div>
                        <div className="add-group-popup">
                            <button type="button" className="btn link-btn" onClick={()=>dispatch({ type: 'EDIT_GROUP_MESSAGE', payload: { Type:'EDIT_GROUP_MESSAGE',EditGroup:false,ContactsList:[],SelectedUserIds:[],EditGroupContent:''}})} data-toggle="modal" data-target="#create-group-popup"> <i className="av av-create-group-icon"></i></button>
                        </div>
                        <div className="cmn-search-bx">
                        {state.FilterBy == "Contacts"?
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>getContactList(e.target.value.toLowerCase())}  />:
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>fetchMyGroups(e.target.value,"MyGroups")}  />}
                            <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                        </div>
                    </div>
                </div>

                {state.FilterBy == "Contacts"
                 ?
                    <>
                        <div className="message-list group-message-list message-list-tab">
                            <div className="u-p-files-list">
                                <div className="custom-table">
                                    {state?.ContactUsers.map((res) =>
                                        <GroupContactList 
                                        key={res.id}
                                        userId={res.contact_id?.id}
                                        name={res.contact_id?.name}
                                        userName={res.contact_id?.username}
                                        country={res.contact_id?.user_profile?.country}
                                        profilePicture={res.contact_id?.user_profile?.profile_picture ? FileManagerPath + res.contact_id?.user_profile?.profile_picture : res.contact_id?.user_profile?.social_profile_picture_url ? res.contact_id?.user_profile?.social_profile_picture_url : `${FileManagerPath}/public/assets/images/userAvatar.png`}
                                        
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                    :
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
                                <div className="message-list group-message-list">
                                 {state?.MyGroups.map((res) =>
                                  res?.type === 2 || res?.type === 1 ?
                                   <GroupsList 
                                    roomId={res?.id}
                                    roomType={res?.type}
                                    roomName={res?.room_name}
                                    groupImage={`${res.group_image ? FileManagerPath + res.group_image : FileManagerPath + `public/assets/images/groupAvatar.png`}`}
                                    createdAt={res?.created_at}
                                    eventSlot={res?.event_slot?.start_date_time}
                                    editRoom={()=>editRoom(res)}
                                   />:'')}
                                </div> 
                    // :
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
                }
            </div>
        </>
    );
}

export default GroupMessageTab;
const RoomUserList = ({ Users, roomId }) => {
const [state, dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom,handleChat,DeleteChatRoom,removeUserFromRoom] = useContext(ChatContext);

    // select User to add another group 
const handleAddUser = (e, id) => {
    const target = e.target;
    var value = target.value;
    if(target.checked){
        dispatch({
            type: "SELECT_USER_IDS",
            payload: [...state.SelectedUserIds,parseInt(value)],
        });
    }else if(target.checked==false){
       const value= state.SelectedUserIds.indexOf(parseInt(id))
       if(value !== -1){
        state.SelectedUserIds.splice(value,1);
       }
       dispatch({
        type: "SELECT_USER_IDS",
        payload:state.SelectedUserIds,
     });

    }else{
        dispatch({
            type: "SELECT_USER_IDS",
            payload:[],
         });
        
    }
}
    return (
        <>
            <div id={`group-users-show-bx-${roomId}`} className="group-users-show-bx" style={{ display: visibleViewPeople==roomId?'block':'none' }}>
                {Users.map((user, index) =>
                    <div key={index} className="c-table-row ck-group-message unread-message">
                        <div className="cell m-d-editable" data-title="Cost">
                            <div className="message-time">
                                <div className="checkbox custom">
                                    <label>
                                        <input type="checkbox"  onChange={(e) =>handleAddUser(e,user?.user_id)} value={user?.user_id} checked={state?.SelectedUserIds?.find((find)=>find==user?.user_id)}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="cell m-user-editable" data-title="Title">
                            <div className="message-user-bx">
                                <a href="#">
                                    <figure className="cmn-profile-pic">
                                        <img src={user?.room_user?.user_profile?.profile_picture ? FileManagerPath + user?.room_user?.user_profile?.profile_picture : user?.room_user?.user_profile?.social_profile_picture_url ? user?.room_user?.user_profile?.social_profile_picture_url : `${FileManagerPath}/public/assets/images/avatar.png`} alt="" />
                                    </figure>
                                    <span>{user?.room_user?.name}</span>
                                </a>
                            </div>
                        </div>
                        <div className="cell message-short-editable" data-title="Description">
                            {/* <div className="message-short-text">Nairobi, Kenya</div> */}
                        </div>
                        <div className="cell m-d-editable">
                            <div className="message-delete-btn"> <button type="button" onClick={()=>removeUserFromRoom(roomId,user?.room_user?.id)} className="btn link-btn"><i className="av av-delete-icon"></i></button></div>
                        </div>
                    </div>)}
            </div>
        </>
    )
}

const GroupContactList = ({key, name, profilePicture, country, userName, userId }) => {
    const [state, dispatch] = useContext(ChatContext);
    const handleAddUser = (e, id) => {
        const target = e.target;
        var value = target.value;
        if(target.checked){
            dispatch({
                type: "SELECT_USER_IDS",
                payload: [...state.SelectedUserIds,parseInt(value)],
            });
        }else if(target.checked==false){
           const value= state.SelectedUserIds.indexOf(parseInt(id))
           if(value !== -1){
            state.SelectedUserIds.splice(value,1);
           }
           dispatch({
            type: "SELECT_USER_IDS",
            payload:state.SelectedUserIds,
         });

        }else{
            dispatch({
                type: "SELECT_USER_IDS",
                payload:[],
             });
            
        }
      
        // setSelectedUser([parseInt(value)]);
    }
    return (
        <>

            <div className="c-table-row ck-group-message unread-message" key={key}>
                <div className="cell m-d-editable" data-title="Cost">
                    <div className="message-time">
                        <div className="checkbox custom">
                            <label>
                                <input type="checkbox"  onChange={(e) =>handleAddUser(e,userId)} value={userId} checked={state?.SelectedUserIds?.find((find)=>find==userId)}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="cell m-user-editable" data-title="Title">
                    <div className="message-user-bx">
                        <Link to={`/profile/${userName}`}>
                            <figure className="cmn-profile-pic">
                                <img src={profilePicture} alt={name} />
                            </figure>
                            <span>{name}</span>
                        </Link>
                    </div>
                </div>
                <div className="cell message-short-editable" data-title="Description">
                    <div className="message-short-text">{country ? country : 'N/A'}</div>
                </div>
            </div>
        </>
    );
}

const GroupsList = ({roomId,roomType,roomName,groupImage,createdAt,eventSlot,editRoom}) => {
const [state, dispatch,SearchConversation,addContactUserToRoom,viewGroupPeoples,EnterInChatRoom,handleChat,DeleteChatRoom] = useContext(ChatContext);
// View Group People Toggle with ViewGroupPeoples API get data

const FunctionViewGroupPeoples=(roomId,ShowID)=>{
    // showHideDiv(ShowID)
    
    if(visibleViewPeople==roomId){
        visibleViewPeople=0;
    }else{
      visibleViewPeople=roomId;
    }
    viewGroupPeoples(roomId)
}

const enterInGroup=(roomId)=>{
    let roomData=state.MyGroups.filter((filter)=>filter?.id===roomId)[0];
    EnterInChatRoom(roomId,{type:roomData?.type,eventSlot:roomData?.event_slot?.start_date_time,broadcasting:roomData?.broadcasting,createdBy:roomData?.created_by?.id,roomImage:roomData?.group_image != null ? FileManagerPath + roomData?.group_image : `${FileManagerPath}${roomData?.type==1||roomData?.type==2?roomData?.broadcasting==1?'public/assets/images/broadcastAvatar.png':'public/assets/images/groupAvatar.png':'/public/assets/images/userAvatar.png'}`,isRoom:roomData?.type == 1 || roomData?.type == 3 ? true : false,roomId:roomData?.id,roomName:roomData?.room_name});
    dispatch({type:"SELECTED_CONVERSATION_CURRENT_ROOM", payload: {Type:"SELECTED_CONVERSATION_CURRENT_ROOM",Inbox:true,GroupMessage:true,GroupMessageTab: false,CurrentRoomChat:[]}});
}
return (
        <>
            <div className="u-p-files-list" key={roomId}>
                <div className="custom-table">
                    <div className="c-table-row my-group-message unread-message">
                        <div className="cell m-user-editable">
                            <div className="message-user-bx">
                                <a href="#" >
                                    <figure className="cmn-profile-pic">
                                        <img src={groupImage} alt={roomName} />
                                    </figure>
                                    <span>{roomName} {roomType == 2?<small> ({moment(eventSlot).format('DD,MMM YY hh:mm A')})</small>:""}</span>
                                </a>
                            </div>
                        </div>
                        <div className="cell message-short-editable">
                            <div className="message-short-text">Created on {moment.utc(createdAt).local().format('DD MMM YYYY hh:mm A')} </div>
                        </div>
                        <div className="cell m-time-editable">
                            <div className="message-time view-people-btn"><a href="#" value="Show/Hide" onClick={() => FunctionViewGroupPeoples(roomId,`group-users-show-bx-${roomId}`)}> <i className='av av-eye-icon v-p-icon'></i> <span>View People</span></a></div>
                        </div>
                        <div className="cell m-d-editable">
                            <div className="message-delete-btn">{roomType == 2?"":<button type="button" onClick={editRoom} className="btn link-btn"><i className="av av-edit-icon"></i></button>} <button type="button" onClick={()=>enterInGroup(roomId)} className="btn link-btn"><i className="av av-inbox-icon"></i></button> <button type="button" onClick={()=>DeleteChatRoom(roomId)} className="btn link-btn"><i className="av av-delete-icon"></i></button></div>
                        </div>
                    </div>
                    <RoomUserList roomId={roomId} Users={state?.viewGroupPeoples} />
                </div>
            </div>
        </>
    )
}
