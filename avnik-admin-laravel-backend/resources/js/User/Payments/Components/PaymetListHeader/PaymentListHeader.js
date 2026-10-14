import React, { useContext } from 'react';
import UserPaymentList from '../UserPaymentList/UserPaymentList';
import UserPaymentContext from '../../UserPaymentContext/UserPaymentContext';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
const PaymentListHeader = () => {
    const [state,dispatch,handelSearchSubmit]=useContext(UserPaymentContext);

    return (
        <>
            <div className="message-list payment-history-list" >
                <div className="u-p-files-list">
                    <div className="custom-table">
                        <div className="c-table-row table-header">
                            <div className="cell payment-order-number-editable">Name</div>
                            <div className="cell payment-order-number-editable">Event Title</div>
                            <div className="cell payment-date-time-editable">Date & Time</div>
                            <div className="cell payment-amount-editable">Amount</div>
                            <div className="cell payment-status-editable">Status</div>
                        </div>
                        <UserPaymentList/>
                       
                    </div>
                    {state?.OnScroll?<span  className="content-loader" >
                                    <img style={{width: '50px',height: '50px'}} src={`${FileManagerPath}public/assets/images/loading.gif`} alt="loading" />
                                </span>:<div style={{minHeight:'50px'}}></div>}
                </div>
            </div>
        </>
    );
}

export default PaymentListHeader;
