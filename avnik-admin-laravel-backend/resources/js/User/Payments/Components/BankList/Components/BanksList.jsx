import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

const BanksList = (props) => {
    return <>
        <li key={props?.id}>
                                                        <div className="b-c-box">
                                                            <p>
                                                                <img
                                                                    src="images/sbi-bank-icon.jpg"
                                                                    alt=""
                                                                />{" "}
                                                                <span>
                                                                    {props?.bank_name}
                                                                </span>
                                                            </p>
                                                            <strong>
                                                                ********{props?.last4}
                                                            </strong>
                                                            
                                                                {props?.default_for_currency?<div className="make-default-status-btn" style={{opacity:'1'}}><span className="btn status-btn awaiting-status">Primary</span></div>:<div className="make-default-status-btn"><button
                                                                    type="button"
                                                                    className="btn default-btn"
                                                                    onClick={()=>props?.defaultBankAccountUpdate(props?.id)}
                                                                >
                                                                    Make Primary
                                                                </button> </div>}
                                                            <button
                                                                type="button"
                                                                className="btn link-btn"
                                                                onClick={()=>props?.deleteBankAccount(props?.id)}
                                                            >
                                                                {" "}
                                                                <i className="av av-delete-icon"></i>
                                                            </button>
                                                             <span className='complite-cancel-status'>
                                                             {props?.default_for_currency?props?.ConnectAccounts?.verification?.fields_needed?.length>0? <button className="btn blue-bdr-btn float-right float-right ml-1 mr-5" type="button" onClick={props?.openVerificationModal}  > Verify Account</button>:<button className="btn blue-bdr-btn float-right ml-1 mr-5" type="button" disabled={true}>Account <i className="fa fa-check-circle"></i></button>:""}
                                                             </span>
                                                        </div>
                                                    </li>
    </>;
}

export default BanksList;