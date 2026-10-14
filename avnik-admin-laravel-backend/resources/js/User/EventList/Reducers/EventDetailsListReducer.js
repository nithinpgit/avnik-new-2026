const reducer =(state, {type,payload}) => {

    switch (type) {
        case 'EVENT_DETAILS':
            return {...state,EventDetails:payload}  
        case 'SET_EVENT_DETAILS':
           return {...state, EventDetails:[...state?.EventDetails,...payload]}
        case 'PRELOADER':
            return {...state,Preloader:payload}  
        case 'FILTER_BY':
            return {...state,FilterBy:payload}  
        case 'SEARCH_QUERY':
            return {...state,SearchQuery:payload} 
        case 'ON_SCROLL':
        return {...state,OnScroll:payload} 
        case 'JOIN_REQUEST_CONTEXT':
            return {...state,joinRequestContext:payload} 
        case payload?.Type:
            return {...state,...payload} 
        case 'SET_PAGINATION':            
                return {
                    ...state,
                    LastPage:payload.last_page,
                    NextPage:payload.current_page+1,
                    CurrentPage:payload.current_page,
                    NextPageUrl:payload.next_page_url,
                    PreviewsPage:payload.prev_page_url
                }
           
        default:
            return state;
    }
}
export default reducer;