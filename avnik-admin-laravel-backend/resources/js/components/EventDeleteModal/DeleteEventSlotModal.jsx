import React from "react";
const DeletedEventSlotModal = ({onChange,handleSubmit,ErrorResponse,value}) => {

    return (
        <>
            <div
                className="modal fade default-popup confirm-message-popup"
                id="DeletedEventSlotModal"
                tabIndex="-1"
                role="dialog"
                ariaLabelledBy="exampleModalLabel"
                ariaHidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
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
                                    {/* <div className="message-with-icon">
                                    <span className="info-icon"><i className="av av-info-icon"></i></span>
                                </div> */}
                                    {/* <strong>Are you sure you want to disable to this schedule?</strong> */}
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="deleteFor"
                                                    id="inlineRadio1"
                                                    value="FollowingEvent"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio1"
                                                >
                                                    Delete all following slots 
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="deleteFor"
                                                    id="inlineRadio2"
                                                    value="DeletePreviewsSlots"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio2"
                                                >
                                                    Delete all upcoming slots
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="deleteFor"
                                                    id="inlineRadio3"
                                                    value="option3"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio3"
                                                >
                                                    Delete this slot
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="no-yes-btns">
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <button
                                                type="button"
                                                className="btn blue-bdr-btn"
                                                data-dismiss="modal"
                                            >
                                                No
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="submit"
                                                className="btn default-btn"
                                                disabled={value?false:true}
                                            >
                                                Yes
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
export default DeletedEventSlotModal;
