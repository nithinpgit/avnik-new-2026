import React, { useContext } from 'react';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import UserPaymentContext from '../../UserPaymentContext/UserPaymentContext';
import Skeleton from 'react-loading-skeleton';

const UserPaymentHeader = () => {

    const [state,dispatch]=useContext(UserPaymentContext);

    return (
        <>
            <div className="payment-status-sec">
                <ul className="cmn-ul-list">
                    <li>
                        <div className="pay-status-bx">
                            <div className="pay-s-rit-text">
                                <strong>{state?.Preloader ?<Skeleton width={144} height={31}/>:'Bank'}</strong>
                               
                            {state?.Preloader ?<Skeleton width={144} height={20}/>:<span>Card Info

                                </span>}
                            </div>
                            {state?.Preloader ?<Skeleton circle={true} width={46} height={46}/>:
                            <figure className="pay-s-lft-img">
                             <a href="#" className="pay-s-lft-img" onClick={()=>dispatch({type:'BANK_DETAILS',payload:true})}><i className="av av-arrow-right-line-icon"></i></a>
                            </figure>}
                        </div>
                    </li>
                    <li>
                        <div className="pay-status-bx">
                            <div className="pay-s-rit-text">
                                <strong>{state?.Preloader ?<Skeleton width={144} height={31}/>:`$${state?.Pagination?.ReceivedPayment?state?.Pagination?.ReceivedPayment:0}`}</strong>
                            {state?.Preloader ?<Skeleton width={144} height={20}/>:
                                <span>Total Received</span>}
                            </div>
                            {state?.Preloader ?<Skeleton circle={true} width={50} height={50}/>: <figure className="pay-s-lft-img">
                                <img src={FileManagerPath+`/public/assets/images/payment-received-icon.svg`} alt="" />
                            </figure>}
                        </div>
                    </li>
                    <li>
                        <div className="pay-status-bx">
                            <div className="pay-s-rit-text">
                                <strong>{state?.Preloader ?<Skeleton width={144} height={31}/>:`$${state?.Pagination?.SendPayment?state?.Pagination?.SendPayment:0}`}</strong>
                                {state?.Preloader ?<Skeleton width={144} height={20}/>:<span>Total Sent</span>}
                            </div>
                            {state?.Preloader ?<Skeleton circle={true} width={50} height={50}/>:<figure className="pay-s-lft-img">
                                <img src={FileManagerPath+`/public//assets/images/payment-sent-icon.svg`} alt="" />
                            </figure>}
                        </div>
                    </li>
                    <li>
                        <div className="pay-status-bx">
                            <div className="pay-s-rit-text">
                                <strong>{state?.Preloader ?<Skeleton width={144} height={20}/>:`$${state?.Pagination?.TotalAwaiting?state?.Pagination?.TotalAwaiting:0}`}</strong>
                                {state?.Preloader ?<Skeleton width={144} height={20}/>:<span>Total Awaiting</span>}
                            </div>
                            {state?.Preloader ?<Skeleton circle={true} width={50} height={50}/>: <figure className="pay-s-lft-img">
                                <img src={FileManagerPath+`/public/assets/images/payment-awaiting-icon.svg`} alt="" />
                            </figure>}
                        </div>
                    </li>
                    <li>
                        <div className="pay-status-bx">
                            <div className="pay-s-rit-text">
                                <strong>{state?.Preloader ?<Skeleton width={144} height={20}/>:`$${state?.Pagination?.TotalWithdraw?state?.Pagination?.TotalWithdraw:0}`}</strong>
                                {state?.Preloader ?<Skeleton width={144} height={20}/>:<span>Total Withdrawn</span>}
                            </div>
                            {state?.Preloader ?<Skeleton circle={true} width={50} height={50}/>:<figure className="pay-s-lft-img">
                                <img src={FileManagerPath+`/public/assets/images/total-withdraw-icon.svg`} alt="" />
                            </figure>}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default UserPaymentHeader;
