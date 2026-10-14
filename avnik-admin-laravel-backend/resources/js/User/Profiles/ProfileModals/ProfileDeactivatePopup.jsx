import React from 'react';

const ProfileDeactivatePopup = () => {
    return (
        <>
    <div className="modal fade default-popup deactivate-account-popup" id="deactivate-account-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <form>
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                    <div className="modal-header">
                        <h2 className="modal-title">You want to deactivate</h2>
                    </div>
                    <div className="modal-body">
                        <div className="regin-deactivate-account">
                            <label className="form-label">You can always activate your account later</label>
                            <ul className="cmn-ul-list">
                                <li>
                                    <div className="checkbox custom">
                                        <label>
                                            <input type="checkbox" defaultChecked/>
                                            Lorem Ipsum is simply
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="checkbox custom">
                                        <label>
                                            <input type="checkbox"/>
                                            Lorem Ipsum is simply
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="checkbox custom">
                                        <label>
                                            <input type="checkbox"/>
                                            Lorem Ipsum is simply
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="checkbox custom">
                                        <label>
                                            <input type="checkbox"/>
                                            Lorem Ipsum is simply
                                        </label>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </div>
                    <div className="modal-footer">
                        <div className="forgot-link">
                            <button type="button" className="btn default-btn deactivate-btn" data-dismiss="modal">Yes Deactivate</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
        </>
    );
}

export default ProfileDeactivatePopup;
