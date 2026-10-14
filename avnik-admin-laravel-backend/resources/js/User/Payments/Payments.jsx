import Axios from 'axios';
import React, { Component,useEffect,useContext, useState, useReducer} from 'react';
import { ApiService } from '../../ApiServer/ApiService';
import Auth from '../../Routes/Auth';
import PaymentListHeader from './Components/PaymetListHeader/PaymentListHeader';
import SearchPayment from './Components/SearchPayment/SearchPayment';
import UserPaymentHeader from './Components/UserPaymentHeader/UserPaymentHeader';
import reducer, { UserPaymentInitialState } from './Reducer/UserPaymentReducer';
import  UserPaymentContext from './UserPaymentContext/UserPaymentContext';
import BankList from './Components/BankList/BankList';

const Payments =(props)=>  {

const [state, dispatch] = useReducer(reducer, UserPaymentInitialState);
var self=this;
    useEffect(() => {  
        _fetchUserPayment();
        $(window).scroll(function() {  
            if($(window).scrollTop() + $(window).height()== $(document).height()) {
                handleScroll();
            }
         });
    
    }, [state.UserPaymentFilter,state.DateRangeEnd,state.DateRangeStart,state.UserPaymentSearch]);
    useEffect(() => {
        _getCounterList();
        return () => {
            dispatch({type:"countries",payload:{Type:"countries",Countries:[]}});
        };
    }, [])
    function _getCounterList(){
        Axios.get('/api/countries', {
            headers: {
                'Accept': 'application/json',
                authorization: `Bearer ${Auth.getAccessToken()}`
            }
        }).then((res) => {
            if (res.status == 200) {
                dispatch({type:"countries",payload:{Type:"countries",Countries:res.data}});
            }
        }).catch((error) => {
            console.log(error)
        })
    }

   function _fetchUserPayment(){
    const data={
        filterType:state.UserPaymentFilter,
        filterQuery:state.UserPaymentSearch,
        dateStart:state.DateRangeStart,
        dateEnd:state.DateRangeEnd,
        nextPage:'',
    }
    ApiService._fetchAllPayments(data).then((res)=>{
        if(res.data.status==200){
            dispatch({type:'SET_PAYMENT_RESPONSE',payload:res.data?.data?.Payment.data})
            dispatch({type:'SET_PAYMENT_PAGINATION',payload:res.data.data})
            dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
            self=res.data.data;
        }
        if(res.data.status=='failed'){
            dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
        }    
       
    })
    .catch((error)=>{
        dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
    });
   }
    const handelSearchSubmit=(e)=>{
        e.preventDefault();
        dispatch({type:'SET_PAYMENT_PRELOADER',payload:true}) 
        _fetchUserPayment();
    }
    function handleScroll(){
     
        console.log("Scrolling",self)
        if(self.Payment.next_page_url!=null){ 
            dispatch({type:'ON_SCROLL',payload:true});
                const data={
                    filterType:state.UserPaymentFilter,
                    filterQuery:state.UserPaymentSearch,
                    dateStart:state.DateRangeStart,
                    dateEnd:state.DateRangeEnd,
                    nextPage:self.Payment.current_page+1,
                }
                ApiService._fetchAllPayments(data).then((res)=>{
                    if(res.data.status==200){
                        dispatch({type:'SET_ON_SCROLL_RESPONSE',payload:res.data?.data?.Payment.data})
                        dispatch({type:'SET_PAYMENT_PAGINATION',payload:res.data.data})
                        dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
                        dispatch({type:'ON_SCROLL',payload:false})
                        self=res.data.data;
                    }
                    if(res.data.status=='failed'){
                        dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
                        dispatch({type:'ON_SCROLL',payload:false})

                    }    
                   
                })
                .catch((error)=>{
                    dispatch({type:'SET_PAYMENT_PRELOADER',payload:false})
                    dispatch({type:'ON_SCROLL',payload:false})


                });
        }else{
            dispatch({type:'ON_SCROLL',payload:false})
        }

            
    }
    const PaymentContext=[state, dispatch,handelSearchSubmit,_fetchUserPayment];
  
console.log(state)
    return (
            <>
            <UserPaymentContext.Provider value={PaymentContext}>
                <div className="ah-tab-content" data-ah-tab-active={props.Active}>
                    <div className="payments-content-sec">
                        {state?.bankDetails?<BankList/>:<div className="payments-status-bx">
                            <UserPaymentHeader />
                            <SearchPayment fetch={_fetchUserPayment} />
                            <PaymentListHeader />
                        </div>}
                    </div>
                </div>
            </UserPaymentContext.Provider>
            </>
        );
    
}

export default Payments;
