import React, { useContext, useEffect, useState } from "react";
import { showHideDiv } from "../../../../utility/UtilityFunctions";
import UserPaymentContext from "../../UserPaymentContext/UserPaymentContext";
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddBankFrom from "./Components/AddBankFrom";
import BanksList from "./Components/BanksList";
import CardsList from "./Components/CardsList";
import AddCard from "./Components/AddCard";
import { ApiService } from "../../../../ApiServer/ApiService";
import BankVerificationFrom from "./Components/BankVerificationFrom";

const stripePromise = loadStripe('pk_test_SzN8dKdpVOi3egScdycPM9RB');

const BankList = () => {
    const [state, dispatch] = useContext(UserPaymentContext);
    useEffect(() => {
        getCardsList();
        getBankList();
        return () => {
            dispatch({type:'CARD_LIST',payload:{Type:'CARD_LIST',DebitCards:[],BankAccounts:[]}});
        };
    }, [])
    const ClickToAddBank = () => {

    };
    const addBankAccount = () => {

    };
   const getBankList =()=>{
    ApiService?._listBankAccount({}).then((res)=>{
        if(res.status==200){
        console.log(res,'bank account list')
        dispatch({type:'BANK_LIST',payload:{Type:'BANK_LIST',ConnectAccounts:res?.data,BankAccounts:res?.data?.external_accounts?.data}});
        }else{

        }
    }).catch((error)=>{
        console.log(error)
    })
   }
   const deleteBankAccount =(id)=>{
    ApiService?._deleteBankAccount(id).then((res)=>{
        if(res.status==200){
            // getBankList();
            toastr["success"]("account delete successfully");
            dispatch({type:'REMOVE_BANK_ACCOUNT',payload:{Type:'REMOVE_BANK_ACCOUNT',BankAccounts:state.BankAccounts.filter((resId)=>resId?.id!=id)}});

        }
    }).catch((error)=>{
        toastr["error"](error.response.data?.error);

        console.log(error.response.data)
    })
   }
   const defaultBankAccountUpdate=(bank_account)=>{
        ApiService._updateBankAccount({bank_account}).then((res)=>{
            if(res?.status==200){
                getBankList();
                toastr["success"]('Set primary account successfully... ');

            //   let  objIndex = state.BankAccounts.findIndex((obj => obj.id == bank_account));
            // dispatch({type:'UPDATE_BANK_ACCOUNT',payload:{Type:'UPDATE_BANK_ACCOUNT',BankAccounts:state.BankAccounts.filter((resId)=>resId?.id!=id)}});

            }
        }).catch((error)=>{
            toastr["error"](error.response.data?.error);
        })
   }

   const openVerificationModal=()=>{
        $('#bank-verification-popup').modal({backdrop: 'static', keyboard: false}) 
   }
   const handleVerification=(e)=>{
    e.preventDefault();
    dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:true}});

    let data={
        first_name:state?.FirstName,
        last_name:state?.LastName,
        type:"FL",
    } 
    let data2={
        SSN:state?.SSN,
        DOB:state?.DOB,
        type:"SSN",
    } 
    ApiService?._bankAccountVerification(state?.SSN?data2:data).then((res)=>{
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

        if(res?.status==200){
            getBankList();
            if(res?.data?.success=="success"){
                 $('#bank-verification-popup').modal('hide');
                 dispatch({type:"RESET",payload:{Type:"RESET",FirstName:'',
                 LastName:'',
                 SSN:'',
                 DOB:'',}}) 
            }

        }else{

        }
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

    }).catch((error)=>{
        console.log(error);
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

    })
   }

    
    
 // fetch add or remove cards
    const getCardsList = () => {
        ApiService._listCustomerCards().then((res)=>{
            console.log(res,'cards list')
            if(res.status==200){
                dispatch({type:'CARD_LIST',payload:{Type:'CARD_LIST',DebitCards:res?.data?.data}});
            }
        }).catch((error)=>{
            console.log(error);
        })

    };
    
    const AddCustomerCard=(paymentMethod)=>{
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:true}});

        ApiService._addCards({paymentMethod}).then((res)=>{
            if(res.status==200){
                dispatch({type:'CARD_LIST',payload:{Type:'CARD_LIST',DebitCards:[...state.DebitCards,res?.data]}});
            }
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

        }).catch((error)=>{
            toastr["error"](error?.response?.data?.message);
        dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

        })
    }
    const deleteCard=(id)=>{
        ApiService._DeleteCustomerCards(id).then((res)=>{
            if(res.status==200){
                dispatch({type:'CARD_LIST',payload:{Type:'CARD_LIST',DebitCards:state.DebitCards.filter((resId)=>resId?.id!=id)}});
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
   // fetch add or remove cards
   
    return (
        <>
            <div className="payment-center-history-bx card-bank-tabs">
                <div className="noti-heading">
                    <div className="cmn-rit-top-heading-sec noti-setting-heading">
                        <div className="noti-back-icon-btn">
                            <button
                                type="button"
                                onClick={() =>
                                    dispatch({
                                        type: "BANK_DETAILS",
                                        payload: false,
                                    })
                                }
                                className="btn text-btm"
                            >
                                <i className="av av-reply-icon"></i> Back
                            </button>
                        </div>
                        <div className="inbox-message-number">Payment Options</div>
                    </div>
                </div>
                <div className="inbox-group-box">
                    <div className="tabs-list">
                        <ul className="nav" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link active"
                                    data-toggle="pill"
                                    href="#card-tab"
                                    role="tab"
                                    aria-controls="card-tab"
                                    aria-selected="true"
                                >
                                    <span>Card</span>
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a
                                    className="nav-link"
                                    data-toggle="pill"
                                    href="#bank-tab"
                                    role="tab"
                                    aria-controls="bank-tab"
                                    aria-selected="false"
                                >
                                    <span>Withdraw to Bank</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="card-tab"
                            role="tabpanel"
                        >
                            <div className="cards-add-pay-bx card-tab">
                                <div className="payment-summary-content">
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="saved-card-list">
                                                <ul className="cmn-ul-list">
                                                   {state?.DebitCards?.length>0? state?.DebitCards.map((res)=><CardsList {...res} deleteCard={deleteCard} />):""}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="payment-card-add">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <div className="cmn-new-toggle">
                                                            <button
                                                                type="button"
                                                                className="btn blue-bdr-btn"
                                                                value="Show/Hide"
                                                                onClick={() =>
                                                                    showHideDiv(
                                                                        "add-card"
                                                                    )
                                                                }
                                                            >
                                                                <span className="av av-add-plus-solid-icon">
                                                                    <span className="path1"></span>
                                                                    <span className="path2"></span>
                                                                    <span className="path3"></span>
                                                                </span>
                                                                Add Card
                                                            </button>
                                                            <div
                                                                id="add-card"
                                                                className="write-review-content-bx new-toggle-dropdown"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            >
                                                                
                                                                <Elements stripe={stripePromise}>
                                                                    <AddCard AddCustomerCard={AddCustomerCard} preloader={state?.buttonPreloader}/>
                                                                </Elements>
                                                                
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="bank-tab"
                            role="tabpanel"
                        >
                            <div className="cards-add-pay-bx bank-tab">
                                <div className="payment-summary-content">
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="saved-card-list">
                                                <ul className="cmn-ul-list">
                                                   
                                                   {state?.BankAccounts?.length>0? state?.BankAccounts.map((res)=><BanksList {...res} openVerificationModal={openVerificationModal} ConnectAccounts={state?.ConnectAccounts} defaultBankAccountUpdate={defaultBankAccountUpdate} preloader={state?.buttonPreloader} deleteBankAccount={deleteBankAccount} />):""}

                                                   
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="payment-card-add">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <div className="cmn-new-toggle">
                                                            <button
                                                                type="button"
                                                                className="btn blue-bdr-btn"
                                                                value="Show/Hide"
                                                                onClick={() =>
                                                                    showHideDiv(
                                                                        "add-bank"
                                                                    )
                                                                }
                                                            >
                                                                <span className="av av-add-plus-solid-icon">
                                                                    <span className="path1"></span>
                                                                    <span className="path2"></span>
                                                                    <span className="path3"></span>
                                                                </span>
                                                                Add Bank
                                                            </button>
                                                            <div
                                                                id="add-bank"
                                                                className="write-review-content-bx new-toggle-dropdown"
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                            >
                                                                <Elements stripe={stripePromise}>
                                                                        <AddBankFrom getBankList={getBankList} />
                                                                </Elements>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BankVerificationFrom handleVerification={handleVerification} preloader={state?.buttonPreloader}/>
        </>
    );
};
export default BankList;
