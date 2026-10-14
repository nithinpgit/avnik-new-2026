import React, { useContext } from 'react';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import ChatContext from '../../ChatContext/ChatContext';
import GroupMessageTab from '../../Pages/GroupMessageTab/GroupMessageTab';
import ConversationList from '../Components/ConversationList';
import GroupChat from '../GroupChat/GroupChat';
import Inbox from '../Inbox/Inbox';
import SingleChat from '../SingleChat/SingleChat';
import { showHideDiv } from '../../../../utility/UtilityFunctions'
import CurrentUser from '../../../../components/UserContext/CurrentUserContext/CurrentUser';
import { ApiService } from '../../../../ApiServer/ApiService';
import Skeleton from 'react-loading-skeleton';
import { MessageConversationPreloader } from '../../../../components/SkeletonLoading/SkeletonLoading';
const ChatLeftSidebar = () => {
    const [state, dispatch,SearchConversation] = useContext(ChatContext);
    const currentUser = useContext(CurrentUser);

const getConversation=(data)=>{
        ApiService._fetchAllMessages(data).then((res)=>{
            console.log(state.ConversationsPagination.next_page);
            if(res.data.status==200){
                dispatch({ type:'CONVERSATIONS',payload:[...state.Conversations,...res.data.data.data]});
                dispatch({ type:'CONVERSATIONS_PAGINATION',payload:res.data.data.data});
            }
        }).catch((error)=>{
    
        })
}

 const onScrollHandle=(e)=>{
        let element = e.target
        console.log(state,'leftsidescroll');
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                if(state.ConversationsPagination.next_page!=null){
                    let data ={
                        nextPage:state.ConversationsPagination.current_page+1,
                        search:'',
                    }
                    getConversation(data);
                }
            }
    }
    return(
        <>
            <div className="cmn-sidebar-outer">
                <div className="cmn-sidebar-left">
                    <div className="inbox-group-box">
                        <div className="tabs-list">
                            <ul className="nav" id="pills-tab" role="tablist">
                                {<li className="nav-item" role="presentation">
                                    {state?.Preloader?<Skeleton width={120} height={100}/>:<a className={`nav-link ${state?.Inbox ? 'active' : ''}`} onClick={() => dispatch({ type: 'INBOX', payload: { Inbox: true, GroupMessageTab: false } })} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                        <i className="av av-email-icon"></i>
                                        <span>Inbox</span>
                                    </a>}
                                </li>}
                                <li className="nav-item" role="presentation">
                                   {state?.Preloader?<Skeleton width={120} height={100}/>:<a className={`nav-link ${state?.GroupMessageTab ? 'active' : ''}`} onClick={() => dispatch({ type: 'GROUP_MESSAGE_TAB', payload: { GroupMessageTab: true, Inbox: false, SingleMessage: false } })} id="pills-profile-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-profile" aria-selected="false">
                                        <i className="av av-event-attended-icon"></i>
                                        <span>Groups</span>
                                    </a>}
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                            <div className={`tab-pane fade ${state?.Inbox ? 'show active' : ''}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="inbox-users-list">
                                    <div className="flex-container">
                                        {/* <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                            <select className="form-control custom-select-bx" onChange={(e) => dispatch({ type: 'CONVERSATION_FILTER', payload: e.target.value })} value={state?.FilterBy}>
                                                <option defaultValue>All</option>
                                                <option>Groups</option>
                                                <option>Events</option>
                                            </select>
                                        </div> */}
                                        <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                            {state?.Preloader?<Skeleton width={200} height={30}/>:<div className="cmn-search-bx">
                                                <input className="form-control" type="search" onChange={(e) => SearchConversation(e.target.value)} placeholder="Search" aria-label="Search" /><button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="inbox-meg-usr-bx" onScroll={onScrollHandle}>
                                        <ul>
                                            {state?.Preloader?<MessageConversationPreloader/>:state?.Conversations.map((res) =>
                                                <ConversationList 
                                                key={res?.room_id} 
                                                RoomId={res?.room_id}
                                                createdBy={res?.chat_room?.created_by?.id}
                                                broadcasting={res?.chat_room?.broadcasting}
                                                userName={
                                                res?.chat_room?.type == 0
                                                ?res?.chat_room?.created_by?.id==currentUser.id
                                                ?res?.chat_room?.chat_with?.id==currentUser.id
                                                ?res?.chat_room?.created_by?.name
                                                :res?.chat_room?.chat_with?.name
                                                :res?.chat_room?.created_by?.name
                                                :res?.chat_room?.room_name
                                                }
                                                profilePic={res?.chat_room?.group_image != null ?FileManagerPath + res?.chat_room?.group_image : `${FileManagerPath}${res?.chat_room?.type==1||res?.chat_room?.type==2?res?.chat_room?.broadcasting==1?'public/assets/images/broadcastAvatar.png':'public/assets/images/groupAvatar.png':'/public/assets/images/userAvatar.png'}`}
                                                lastMessage={res?.chat_room?.message ? res?.chat_room?.message?.content : `${res?.chat_room?.type == 0?"Send message":'Create Room'} ${res?.chat_room?.type == 1 || res?.chat_room?.type == 2 ? res?.chat_room?.room_name : currentUser.id == res?.chat_room?.message?.sender_id.id ? 'You: ' + res?.chat_room?.message?.content :res?.chat_room?.type == 0?'' :`${res?.chat_room?.message?.sender_id?.name}: ` + res?.chat_room?.message?.content}`}
                                                isRoom={res?.chat_room?.type == 1 || res?.chat_room?.type == 2 ? true : false} 
                                                type={res?.chat_room?.type} 
                                                lastMessageTime={res?.chat_room?.message?.created_at}
                                                eventSlot={res?.chat_room?.event_slot?.start_date_time}
                                                bgColor={state?.CurrentRoom?.roomId==res?.room_id?"#eee":""}
                                                 />
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${state?.GroupMessageTab ? 'show active' : ''}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="inbox-groups-list">
                                    <ul>
                                        {/* <li className={state.FilterBy=='All'?"active":''}>
                                            <a href={void(0)} onClick={() => dispatch({ type: 'CONVERSATION_FILTER', payload: 'All' })}>All</a>
                                        </li> */}
                                        <li className={state.FilterBy=='MyGroups'?"active":''}>
                                            <a href={void(0)} onClick={() => dispatch({ type: 'CONVERSATION_FILTER', payload: 'MyGroups' })}>Groups</a>
                                        </li>
                                        <li className={state.FilterBy=='Contacts'?"active":''}>
                                            <a href={void(0)} onClick={() => dispatch({ type: 'CONVERSATION_FILTER', payload: 'Contacts' })}>Contacts</a>
                                        </li>
                                        
                                        {/* <li className={state.FilterBy=='Events'?"active":''}>
                                            <a href={void(0)} onClick={() => dispatch({ type: 'CONVERSATION_FILTER', payload: 'Events' })}>Events</a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cmn-sidebar-content">
                    {state?.Inbox && state?.GroupMessage && state?.GroupMessageTab == false?
                    <GroupChat 
                    showHideDiv={showHideDiv} 
                    active={state?.GroupMessageTab ? 'active' : ''}
                    type={state.CurrentRoom.type}
                    />
                    : state?.Inbox && state?.GroupMessage == false && state?.GroupMessageTab == false && state?.SingleMessage ?
                    <SingleChat 
                    showHideDiv={showHideDiv} 
                    active={state?.GroupMessageTab ? 'active' : ''}
                    type={state.CurrentRoom.type}
                    />
                    : state?.Inbox && state?.GroupMessage == false && state?.GroupMessageTab == false && state?.SingleMessage == false ? 
                    <Inbox 
                    showHideDiv={showHideDiv} 
                    active={state?.Inbox ? 'active' : ''} 
                    /> 
                    : state?.Inbox == false && state?.GroupMessage == false && state?.GroupMessageTab && state?.SingleMessage == false ?
                    <GroupMessageTab 
                    showHideDiv={showHideDiv} 
                    active={state?.GroupMessageTab ? 'active' : ''} 
                    /> 
                    : state?.Inbox == false && state?.GroupMessage && state?.GroupMessageTab && state?.SingleMessage == false ?
                    <GroupChat 
                    showHideDiv={showHideDiv} 
                    active={state?.GroupMessageTab ? 'active' : ''} 
                    /> 
                    : 
                    <Inbox 
                    showHideDiv={showHideDiv} 
                    active={state?.Inbox ? 'active' : ''} 
                    />}
                </div>
            </div>
        </>
    );
}

export default ChatLeftSidebar;
