

const reducer =(state, {type,payload}) => {
    switch (type) {
    case 'GROUP_MESSAGE':
        return {...state,CurrentRoom:payload, GroupMessage:true,GroupMessageTab:true,Inbox:false,SingleMessage:false}
    case 'INBOX':
            return {...state, Inbox:payload.Inbox,GroupMessageTab: payload.GroupMessageTab}
    case 'SINGLE_MESSAGE':
            return {...state, SingleMessage:payload.SingleMessage}
    case 'GROUP_MESSAGE_TAB':
        return {...state, GroupMessageTab:payload.GroupMessageTab,GroupMessage:false, Inbox: payload.Inbox,SingleMessage:payload.SingleMessage}
    case 'CHAT_MESSAGES':
        return {...state, ChatList:[...state.ChatList,payload]}
    case 'MESSAGE':
            return {...state, Message:payload}
    case 'SEND_MESSAGE':
        return {...state, Message:payload.Message}
    case 'SELECT_USER_IDS':
        return {...state,SelectedUserIds:payload}
    case 'CONVERSATIONS':
        return {...state,Conversations:payload}
    case 'CHAT_INITIATE':
        return {...state, ChatStartWith:payload,Inbox:true,SingleMessage:true}
    case 'GET_CHAT_ROOM':
            return {...state, Room:payload}
    case 'CONTACT_LIST':
        return {...state,ContactUsers:payload}
    case 'SELECTED_CONVERSATION':
        return {...state,CurrentRoom:payload,GroupMessage:payload?.isRoom==1?true:false,Inbox:true,SingleMessage:payload?.isRoom==1?false:true}
    case 'CURRENT_ROOM_CHAT':
        return {...state,CurrentRoomChat:payload}
    case 'CURRENT_ROOM_CHAT_ADD':
        return {...state,CurrentRoomChat:[...state.CurrentRoomChat,payload]}
    case 'CURRENT_ROOM_CHAT_CONVERSATION':
        return {...state,CurrentRoomChat:[].concat(state.CurrentRoomChat,payload)}
    case 'CREATE_GROUP':
        return {...state,CreateGroup:payload}   
    case 'CONVERSATIONS_PAGINATION':
        return {...state,ConversationsPagination:{next_page:payload.next_page_url,current_page:payload.current_page_url}}   
    case 'CONTACT_LIST_PAGINATION':
        return {...state,ContactListPagination:{next_page:payload.next_page_url,current_page:payload.current_page_url}}   
    case 'CONVERSATION_FILTER':
        return {...state,FilterBy:payload}  
    case 'VIEW_GROUP_PEOPLE':
        return {...state,viewGroupPeoples:payload}  
    case payload.Type:
            return {...state,...payload}  
    default:
        return state;
    }
}

export default reducer;