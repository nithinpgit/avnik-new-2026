import React from 'react';

const PaymentCenterHistory = () => {
    return (
        <>
            <div className="payment-center-history-bx">
                                        <div className="noti-heading">
                                            <div className="cmn-rit-top-heading-sec noti-setting-heading">
                                                <div className="noti-back-icon-btn">
                                                    <button type="button" className="btn text-btm"><i className="av av-undo-icon"></i> Back</button>
                                                </div>
                                                <div className="inbox-message-number">Payment Center</div>
                                            </div>
                                        </div>

                                        <div className="inbox-group-box">
                                            <div className="option-to-pay"><strong>Select An Option To Pay</strong><span>(Transaction ID: 11932840554)</span></div>
                                            <div className="add-amount-bx">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12">
                                                        <label className="form-label" htmlFor="EventTitle">Add Money To Your Account</label>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Enter Amount" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <button type="button" className="btn default-btn" data-toggle="modal" data-target="#join-event-popup">Add Money</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cards-add-pay-bx">
                                                <div className="payment-summary-content">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-12">
                                                            <div className="amount-payable-list">
                                                                <ul className="cmn-ul-list">
                                                                    <li className="ac-payable">
                                                                        <span>Amount Payable</span> <strong>$50</strong>
                                                                    </li>
                                                                    <li className="total-amount">
                                                                        <span>Total Amount</span> <strong>$50</strong>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12">
                                                            <div className="saved-card-list">
                                                                <ul className="cmn-ul-list">
                                                                    <li>
                                                                        <div className="radio custom">
                                                                            <label>
                                                                                <input type="radio" defaultChecked name="foo" />Sbi Credit card <span>XX XXX 432</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="radio custom">
                                                                            <label>
                                                                                <input type="radio" name="foo" />ICICI Credit card <span>XX XXX 375</span>
                                                                            </label>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12">
                                                            <div className="payment-card-add">
                                                                <ul className="cmn-ul-list">
                                                                    <li>
                                                                        <div className="cmn-new-toggle">
                                                                            <button type="button" className="btn blue-bdr-btn" defaultValue="Show/Hide" onClick={this.props.showHideDiv('add-card')}><span className="av av-add-plus-solid-icon"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span> Add Card</button>
                                                                            <div id="add-card" className="write-review-content-bx new-toggle-dropdown" style={{display: 'none'}}>
                                                                                <div className="row">
                                                                                    <div className="col-12 col-sm-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-label" htmlFor="CardNumber">Card Number</label>
                                                                                            <input type="text" className="form-control" id="CardNumber" placeholder="XXX - XXXX - XXXX - XXXX" defaultValue="9876 - 9587 - 9658 - 3625" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-label" htmlFor="CardExpiryDate">Card Expiry Date</label>
                                                                                            <input type="text" className="form-control" id="CardExpiryDate" placeholder="MM  / YY" defaultValue="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-4">
                                                                                        <div className="form-group">
                                                                                            <label className="form-label" htmlFor="Cvv">CVV</label>
                                                                                            <input type="text" className="form-control" id="Cvv" placeholder="XXX" defaultValue="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-sm-12">
                                                                                        <div className="form-group">
                                                                                            <div className="checkbox custom">
                                                                                                <label>
                                                                                                    <input type="checkbox" defaultChecked />
                                                                                                    Save this card for future payments.
                                                                                                </label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <button type="button" className="btn default-btn" data-dismiss="modal">Pay</button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
        </>
    );
}

export default PaymentCenterHistory;
