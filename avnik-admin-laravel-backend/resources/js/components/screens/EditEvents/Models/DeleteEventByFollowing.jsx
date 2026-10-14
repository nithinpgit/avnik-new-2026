import React from "react";
const DeleteEventByFollowing = ({onChange,handleSubmit,ErrorResponse,value,cancel}) => {

    return (
        <>
            <div
                className="modal fade default-popup confirm-message-popup"
                id="DeleteFollowingEventModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
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
                                                    name="followingType"
                                                    onChange={onChange}
                                                    value="FollowingSlots"
                                                    checked={value==="FollowingSlots"?true:false}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio1"
                                                >
                                                    Delete this and following slots range
                                                </label>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="followingType"
                                                    onChange={onChange}
                                                    value="ThisSlot"
                                                    checked={value==="ThisSlot"?true:false}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio3"
                                                >
                                                    Delete this slot
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="followingType"
                                                    onChange={onChange}
                                                    value="ThisEvent"
                                                    checked={value==="ThisEvent"?true:false}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="inlineRadio2"
                                                >
                                                    Delete This Event
                                                </label>
                                            </div>
                                        </li>
                                        {value==="ThisEvent"?<span className="form-check-label text-center"> <strong className="text-danger text-bold">Warning: </strong> Deleting this event will remove all its content, slots and files</span>:""}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="no-yes-btns">
                                    <ul className="cmn-ul-list">
                                        
                                        <li>
                                            <button
                                                type="submit"
                                                className="btn default-btn"
                                                disabled={value?false:true} 
                                            >
                                                Yes
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="btn default-btn btn-sm"
                                                data-dismiss="modal"
                                                onClick={cancel}
                                            >
                                                No
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
export default DeleteEventByFollowing;
