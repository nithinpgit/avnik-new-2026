
const reducer =(state, { type, payload }) => {
    switch (type) {

    case "PAGINATION":
        return {...state, ...payload }
    case "SET_EVENTS_RESPONSE":
        return {...state, ...payload }
    case "PRELOADER":
        return {...state, ...payload }
    case "FAVORITE":
            return {...state, ...payload }
    case payload.Type:
        return {...state, ...payload }
    default:
        return state
    }
}
export default reducer;

