const initialState={
    responseData:[],
    preloader:true,
    buttonPreloader:false,
    searchQuery:'',
    filterBy:'All',
    rating:0,
    comment:'',
    commentId:'',
    userId:0,
    reviewId:0,
    eventId:0,
    slotId:0,
    receiverId:'',
    onScroll:false,
    sendReview:false,
    random:0,
    update:false,
    host:false,
    EditModeId:'',

    
}

const reducer =(state, {type,payload}) => {
    
    switch (type) {
        case 'GET_REVIEWS_LIST':
            return {...state,responseData:payload} 
        case 'GET_ON_SCROLL_REVIEWS_LIST':
                return {...state,responseData:[...state.responseData,...payload]}   
        case 'GET_PAGINATION':
                return {...state,pagination:payload}  
        case 'SET_PRELOADER':
                    return {...state,preloader:payload}  
        case 'SET_RATING':
            return {...state,rating:payload}
        case 'SET_COMMENT':
            return {...state,comment:payload}  
        case 'RANDOM':
            return {...state,random:Math.random()}  
        case 'INITIAL_SEND_REVIEW_STATE':
            return{...state,rating:0,comment:''}  
        case 'REPLY':
                return{...state,commentId:payload.commentId,receiverId:payload.receiverId} 
        case 'SET_EDIT_REVIEW':
            return{...state,
                update:payload.update,
                rating:payload.rating,
                comment:payload.comment,
                reviewId:payload.reviewId,
                eventId:payload.eventId,
                slotId:payload.slotId,
                host:payload.host,
            }
        case 'SET_RATING_UPDATE':
            return {...state,updateRating:payload} 
        case 'EDIT_MODE_ID':
        return{...state,EditModeId:payload}
        case 'SET_EDIT_COMMENT':
            return{...state,updateComment:payload} 
        case 'ON_SCROLL':
                return{...state,onScroll:payload}   
        case 'INITIAL_STATE':
                    return{...state, rating:0,
                        comment:'',
                        commentId:'',
                        userId:0,
                        reviewId:0,
                        eventId:0,
                        slotId:0,
                        receiverId:'',
                        onScroll:false,
                        sendReview:false,
                        random:0,
                        update:false,
                        EditModeId:'',
                        host:false} 
        case payload.Type:
            return{...state,...payload}                   
        default:
            return state;
    }
}
export default reducer;
export {initialState};
