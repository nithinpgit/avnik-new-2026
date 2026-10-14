import React, { useContext } from "react";
import UserPaymentContext from "../../UserPaymentContext/UserPaymentContext";
import moment from "moment";
import "moment-timezone";
import Skeleton from "react-loading-skeleton";
import CurrentUser from "../../../../components/UserContext/CurrentUserContext/CurrentUser";
import { UserPaymentPreloader } from "../../../../components/SkeletonLoading/SkeletonLoading";
import { Link } from "react-router-dom";
import { ApiService } from "../../../../ApiServer/ApiService";
import { useState } from "react";
import GlobalContext from "../../../../Global/Context/GlobalContext";
const UserPaymentList = (props) => {
    const [state, dispatch,handelSearchSubmit,_fetchUserPayment] = useContext(UserPaymentContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [Amount, setAmount] = useState(0);
    const currentUser = useContext(CurrentUser);
    const [fullAmount, setfullAmount] = useState(0);

    const refundAmount = (id, amount) => {
        $("#RefundedAmountModal").modal("show");
        setAmount(amount);
        dispatch({
            type: "refundedPaymentId",
            payload: {
                Type: "refundedPaymentId",
                refundedAmount: amount,
                refundedPaymentId: id,
            },
        });
    };
    const setfullAmountFun = (se) => {
        setfullAmount(se);
        setAmount(state?.refundedAmount);
    };
    const refundModalOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == "refundedPercentage") {
            setAmount((state?.refundedAmount * value) / 100);
        }
        dispatch({ type: name, payload: { Type: name, [name]: value } });
    };
    const handleRefundSubmit = (e) => {
        e.preventDefault();
    dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:true}});

        let data = {
            paymentId: state?.refundedPaymentId,
            percentage: state?.refundedPercentage,
            description: state?.refundedDescription,
            tz: moment.tz.guess(),
        };
        ApiService.userPaymentRefund(data)
            .then((res) => {
                _fetchUserPayment();
                if (res?.data?.status == 200) {
                    toastr["success"]("refund amount successfully");
                } else {
                    toastr["error"]("refund amount failed");
                }
                $("#RefundedAmountModal").modal("hide");
    dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

            })
            .catch((error) => {
                $("#RefundedAmountModal").modal("hide");
    dispatch({type:'BUTTON_PRELOADER',payload:{Type:'BUTTON_PRELOADER',buttonPreloader:false}});

            });
    };
    return (
        <>
            {state?.Preloader ? (
                <UserPaymentPreloader />
            ) : state?.UserPayments.length > 0 ? (
                state?.UserPayments.map((res, index) => (
                    <div key={res.id} className="c-table-row">
                        <div
                            className="cell payment-name-editable"
                            data-title="Name"
                        >
                            <div className="c-table-text payment-date-time-editable">
                                <span className="cmn-cc-icon gray-bg-icon">
                                    {currentUser.id == res.paid_user.id ? (
                                        <i className="av av-sent-money-icon"></i>
                                    ) : (
                                        <i className="av av-received-money-icon"></i>
                                    )}
                                </span>{" "}
                                {currentUser.id == res.paid_user.id
                                    ? res.to_user.name
                                    : res.paid_user.name}
                            </div>
                        </div>
                        <div
                            className="cell payment-order-number-editable"
                            data-title="Event Title"
                        >
                            <div className="c-table-text">
                                <Link
                                    to={`/event?token=${res?.events?.remember_token}&event=${res?.events?.id}&slot=${res?.event_time_slot_id}`}
                                >{res?.events?.event_title}</Link>
                            </div>
                        </div>
                        <div
                            className="cell payment-date-time-editable"
                            data-title="Event Date & Time"
                        >
                            <div className="c-table-text">
                                {moment
                                    .utc(res.event_date_time, "YYYY-MM-DD HH:mm:ss")
                                    .local()
                                    .format("D MMM YYYY, h:mm A")}{" "}
                            </div>
                        </div>
                        <div
                            className="cell payment-amount-editable"
                            data-title="Amount"
                        >
                            <div className="c-table-text">
                                ${res.amount}{" "}
                                {res?.amount_refunded
                                    ? res.refunded_percentage > 0 &&
                                      res.refunded_percentage <=75
                                        ? `(${
                                              currentUser.id == res.paid_user.id
                                                  ? " + "
                                                  : " - "
                                          } $${res?.refunded_amount})`
                                        : ""
                                    : ``}
                            </div>
                        </div>

                        <div
                            className="cell event-status-editable"
                            data-title="Status"
                        >
                            <div className="complite-cancel-status">
                                <span
                                    className={`btn status-btn ${
                                        res.amount_refunded
                                            ? res.refunded_percentage > 0 &&
                                              res.refunded_percentage <= 75
                                                ? "awaiting-status"
                                                : "withdrawn-status"
                                            : "awaiting-status"
                                    }`}
                                >
                                    {res.amount_refunded
                                        ? res.refunded_percentage > 0 &&
                                          res.refunded_percentage <= 75
                                            ? ` ${currentUser.id == res.paid_user.id ? "Sent":"Received"} (${res.refunded_percentage}% Refund)`
                                            : "Refund"
                                        : res.withdraw_amount
                                        ? "Completed"
                                        : currentUser.id == res.paid_user.id ?"Sent":"Received"}
                                </span>
                            </div>
                        </div>
                        <div
                            className="cell event-message-editable"
                            data-title="Message"
                        >
                            <div className="message-delete-btn">
                                <div className="r-m-t-bx my-account-menu table-dd">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="btn dropdown-toggle dots-btn"
                                            data-toggle="dropdown"
                                            data-display="static"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="av av-dots-icon"></i>
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-lg-right">
                                            <ul>
                                                <li>
                                                    <a href={`/payments/invoice/${res.id}`}
                                                        // data-toggle="modal"
                                                        title="View Invoice"
                                                        target="_blank"
                                                        className="dropdown-item"
                                                    >
                                                        <i className="av av av-eye-icon"></i>
                                                        View Invoice
                                                    </a>
                                                </li>
                                                {currentUser.id ==
                                                    res.to_user.id &&
                                                !res.amount_refunded ? (
                                                    <li>
                                                        <a
                                                            data-toggle="modal"
                                                            href="#"
                                                            onClick={() =>
                                                                refundAmount(
                                                                    res?.id,
                                                                    res?.amount
                                                                )
                                                            }
                                                            title="Refund"
                                                            className="dropdown-item"
                                                        >
                                                            <i className="av av-extended-duration-more-icon"></i>{" "}
                                                            Refund
                                                        </a>
                                                    </li>
                                                ) : (
                                                    ""
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-*">
                            <p className="text-center">No Transactions here</p>
                        </div>
                    </div>
                </div>
            )}
            {state.OnScroll ? <UserPaymentPreloader /> : ""}
            <RefundedAmountModal
                handleSubmit={handleRefundSubmit}
                fullAmount={fullAmount}
                setfullAmount={setfullAmountFun}
                refundedPercentage={state?.refundedPercentage}
                amount={Amount}
                preloader={state?.buttonPreloader}
                description={state?.refundedDescription}
                onChange={refundModalOnChange}
            />
        </>
    );
};

export default UserPaymentList;

const RefundedAmountModal = (props) => {
    return (
        <>
            <div
                className="modal fade default-popup confirm-message-popup"
                id="RefundedAmountModal"
                tabIndex="-1"
                role="dialog"
                ariaLabelledBy="exampleModalLabel"
                ariaHidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={props.handleSubmit}>
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <i className="av av-close-icon"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="message-m-box">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    for="CardNumber"
                                                >
                                                    Full Amount
                                                </label>
                                                <input
                                                    type="radio"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        props.setfullAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={0}
                                                    checked={
                                                        props?.fullAmount == 0
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    for="CardNumber"
                                                >
                                                    Custom Amount
                                                </label>
                                                <input
                                                    type="radio"
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        props?.setfullAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={1}
                                                    checked={
                                                        props.fullAmount == 1
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {props.fullAmount == 1 ? (
                                            <div className="col-sm-6 col-md-6">
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <input
                                                            type="radio"
                                                            className="form-control"
                                                            value="25"
                                                            onChange={
                                                                props.onChange
                                                            }
                                                            name="refundedPercentage"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            for="CardNumber"
                                                        >
                                                            25%
                                                        </label>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <input
                                                            type="radio"
                                                            onChange={
                                                                props.onChange
                                                            }
                                                            className="form-control"
                                                            value="50"
                                                            name="refundedPercentage"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            for="CardNumber"
                                                        >
                                                            50%
                                                        </label>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <input
                                                            type="radio"
                                                            onChange={
                                                                props.onChange
                                                            }
                                                            className="form-control"
                                                            value="75"
                                                            name="refundedPercentage"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            for="CardNumber"
                                                        >
                                                            75%
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div
                                            className={`col-sm-${
                                                props.fullAmount == 0
                                                    ? "12"
                                                    : "6"
                                            } col-md-${
                                                props.fullAmount == 0
                                                    ? "12"
                                                    : "6"
                                            }`}
                                        >
                                            <div className="input-group">
                                                <div class="input-group-prepend">
                                                    <span
                                                        class="input-group-text"
                                                        id="basic-addon1"
                                                    >
                                                        $
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={props.amount}
                                                    readOnly={true}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className={`col-sm-12 col-md-12`}>
                                            <div className="form-group">
                                                <textarea
                                                    type="textarea"
                                                    className="form-control"
                                                    onChange={props.onChange}
                                                    placeholder="reason for refund"
                                                    rows="4"
                                                    cols="50"
                                                    name="refundedDescription"
                                                    value={
                                                        props.refundedDescription
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="no-yes-btns">
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <button
                                                type="submit"
                                                className="btn default-btn"
                                                disabled={props?.preloader}
                                            >
                                                {props?.preloader?<span className='button-pre-loading'>wait...</span>:"REFUND"}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
