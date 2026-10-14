import React, { useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import UserPaymentContext from "../../../UserPaymentContext/UserPaymentContext";
import { ApiService } from "../../../../../ApiServer/ApiService";

const AddBankFrom = (props) => {
    const [state, dispatch] = useContext(UserPaymentContext);
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [TAC, setTAC] = useState(false);
    const [defaultBank, setDefault] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);


        const { token, error } = await stripe.createToken('bank_account',
            {
                country: state?.country,
                currency: state?.currency,
                account_number: state?.accountNumber,
                routing_number: state?.routingNumber,
                account_holder_name: state?.accountHolderFirstName +' '+ state?.accountHolderLastName,
                account_holder_first_name: state?.accountHolderFirstName,
                account_holder_last_name: state?.accountHolderLastName,
                account_holder_type: state?.accountHolderType,
                account_default_bank:defaultBank
            }
        );
        if (error) {
            console.error(error?.message);
            toastr["error"](error?.message);
            setLoading(false);


        } else {
            if(state?.accountHolderFirstName&&state?.accountHolderLastName){
                token.firstName=state?.accountHolderFirstName;
                token.lastName=state?.accountHolderLastName;
            }
            ApiService._addBankAccount(token).then((res)=>{
                // console.log(res)
                if(res?.status==200){
                toastr["success"]('Bank account added');
                dispatch({type:'ADD_BANK_ACCOUNT',payload:{Type:'ADD_BANK_ACCOUNT',country:"US",
                currency:"USD",
                accountNumber:"",
                routingNumber:"",
                accountHolderFirstName:"",
                accountHolderLastName:"",
                accountHolderType:"individual",
                BankAccounts:[...state.BankAccounts,res?.data]}});
                document.getElementById("add-bank").style.display = "none";
                props?.getBankList()
                }
                setLoading(false);

            }).catch((error)=>{
              setLoading(false);

                console.log(error?.message)

            })
            // Send the token to your server for further processing
            console.log(token);
        }
    };
    const handleOnChange=(e)=>{
        let name=e.target.name
        let value=e.target.value
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                   {state?.BankAccounts?.length>0?"": <div className="col-sm-6 col-md-6" >
                        <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label" for="CardNumber">
                                    First Name <strong className="text-danger">*</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // id="CardNumber"
                                    required={true}

                                    name="accountHolderFirstName"
                                    onChange={handleOnChange}
                                    placeholder="Enter first name"
                                    value={state?.accountHolderFirstName}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <div className="form-group">
                                <label className="form-label" for="CardNumber">
                                    Last Name <strong className="text-danger">*</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    // id="CardNumber"
                                    required={true}

                                    name="accountHolderLastName"
                                    onChange={handleOnChange}
                                    placeholder="Enter last name"
                                    value={state?.accountHolderLastName}
                                />
                            </div>
                        </div>
                        </div>
                    </div>}
                    {/* <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="form-label" for="CardExpiryDate">
                                Bank Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                // id="CardNumber"
                                placeholder="Enter bank name"
                            />
                        </div>
                    </div> */}
                    <div className="col-sm-6 col-md-6" >
                        <div className="form-group">
                            <label className="form-label" for="CardNumber">
                                Account Number <strong className="text-danger">*</strong>
                            </label>
                            <input
                                type="number"
                                onChange={handleOnChange}
                                className="form-control"
                                required={true}
                                id="bank_account"
                                name="accountNumber"
                                placeholder="Enter account number"
                                value={state?.accountNumber}
                            />
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="form-label" for="Cvv">
                                Routing Number <strong className="text-danger">*</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                // id="Cvv"
                                name="routingNumber"
                                required={true}

                                onChange={handleOnChange}
                                value={state?.routingNumber}
                                placeholder="XXXXXXXX"
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="form-label" for="currency">
                                Currency <strong className="text-danger">*</strong>
                            </label>

                            <select className="form-control" name="currency" onChange={handleOnChange} defaultValue={state?.currency} >
                                <option value="USD" selected={state?.currency==="USD"}>US Dollar $</option>
                                <option value="CAD" selected={state?.currency==="CAD"}>Canadian Dollar $</option>
                                <option value="GBP" selected={state?.currency==="GBP"}>Pound £</option>
                                <option value="EUR" selected={state?.currency==="EUR"}>Euro €</option>
                                <option value="RUB" selected={state?.currency==="RUB"}>Russian Ruble ₽</option>
                                <option value="INR" selected={state?.currency==="INR"}>Indian Rupees ₹</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="form-label" for="accountHolderType">
                                Account Holder Type <strong className="text-danger">*</strong>
                            </label>

                            <select className="form-control" name="accountHolderType" onChange={handleOnChange} defaultValue={state?.accountHolderType} required={true}>
                                <option value="individual" selected={state?.accountHolderType==="individual"}>Individual</option>
                                <option value="company" selected={state?.accountHolderType==="company"}>Company</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label className="form-label" for="country">
                                Country <strong className="text-danger">*</strong>
                            </label>

                            <select
                                className="form-control custom-select-bx"
                                onChange={handleOnChange}
                                name="country"
                                value={state?.country}
                                required={true}

                            >
                                <option defaultValue disabled={true}>
                                    --Select Country--
                                </option>
                                {state.Countries.map((res, index) => (
                                    <option key={res.id} value={res.sortname} selected={state?.country==res?.sortname}>
                                        {res.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <div className="make-default-bx">
                            <ul className="cmn-ul-list">
                                <li>
                                    <div className="form-group">
                                        <div className="checkbox custom">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    onClick={(e)=>setTAC(!TAC)}
                                                    checked={TAC}
                                                    value={TAC}
                                                />
                                                I agree to the <a href="#">Term and Conditions </a> 
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <div className="checkbox custom">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={defaultBank}
                                                    onChange={(e)=>setDefault(!defaultBank)}
                                                />
                                                Make Default
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    {" "}
                                    <button
                                        type="submit"
                                        className="btn default-btn"
                                        disabled={TAC?false:true}
                                    >
                                       {loading?<span className='button-pre-loading'>wait...</span>:" Save Bank"}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddBankFrom;
