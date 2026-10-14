import moment from "moment"

const UserPaymentInitialState={
    UserPayments:[],
    Preloader:true,
    buttonPreloader:false,
    Countries:[],
    BankAccounts:[],
    ConnectAccounts:'',
    DebitCards:[],
    Countries:[],
    OnScroll:false,
    UserPaymentFilter:'All',
    UserPaymentSearch:'',
    Pagination:'',
    bankDetails:false,
    DateRangePickerModal:false,
    DateRangeStart:new Date(),
    DateRangeEnd:new Date(),
    country:"US",
    FirstName:'',
    LastName:'',
    SSN:'',
    DOB:'',
    currency:"USD",
    accountNumber:"",
    routingNumber:"",
    accountHolderName:"",
    accountHolderFirstName:"",
    accountHolderLastName:"",
    accountHolderType:"individual",
    refundedPaymentId:'',
    refundedPercentage:100,
    refundedDescription:'',
    refundedAmount:'',

}
const reducer =(state, { type, payload }) => {
    switch (type) {
    case "SET_PAYMENT_RESPONSE":
        return {...state, UserPayments:payload}
    case "SET_PAYMENT_PAGINATION":
        return {...state, Pagination:payload}
    case "SET_PAYMENT_PRELOADER":
        return {...state, Preloader:payload}
    case "ON_SCROLL":
        return {...state, OnScroll:payload}
    case "BANK_DETAILS":
            return {...state, bankDetails:payload}
    case "SET_ON_SCROLL_RESPONSE":
            return {...state, UserPayments:[...state.UserPayments,...payload]}
    case "USER_PAYMENT_SEARCH_FILTER":
        return {...state, UserPaymentFilter:payload}
    case "USER_PAYMENT_SEARCH":
        return {...state, UserPaymentSearch:payload}
    case "DATE_PICKER_MODAL":
            return {...state, DateRangePickerModal:payload}
    case "DATE_PICKER":
            return {...state, DateRangeStart:payload.DateRangeStart,DateRangeEnd:payload.DateRangeEnd}
    case payload.Type:
        return {...state,...payload}
    default:
        return state
    }
}
export default reducer;
export {UserPaymentInitialState};

