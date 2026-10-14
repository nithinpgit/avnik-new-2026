
const reducer =(state, { type, payload }) => {
    switch (type) {
    case "GET_FAVORITES_INIT":
        return {...state, favorites:payload,preloader:false }
    case "GET_FAVORITES":
            return {...state, favorites:[...state.favorites,...payload]}
    case "ON_SCROLL":
            return {...state, onScroll:payload }
    case "PRELOADER":
    return {...state, preloader:payload}
    case payload.Type:
        
    return {...state, ...payload}
    default:
        return state
    }
}
export default reducer;

