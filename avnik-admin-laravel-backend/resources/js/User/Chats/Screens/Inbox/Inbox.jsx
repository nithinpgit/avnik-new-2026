import React, { useContext } from 'react';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import ChatContext from '../../ChatContext/ChatContext';

const Inbox = () => {
    const [state,dispatch] = useContext(ChatContext);
    return (
        <>
            <div className="message-right-bx">
                <div className="cmn-rit-top-heading-sec message-top-bx">
                    <div className="inbox-message-number">
                        {/* Inbox (<span>3</span> new messages) */}
                         </div>
                    <div className="inbox-rit-search">
                        {/* <div className="cmn-search-bx">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                        </div> */}
                    </div>
                </div>
                {/* <div className="message-list">
                    <div className="u-p-files-list">
                        <div className="custom-table">
                            <div className="c-table-row unread-message">
                                <div className="cell m-user-editable" data-title="Title">
                                    <div className="message-user-bx">
                                        <a href="#">
                                            <figure className="cmn-profile-pic">
                                                <img src={FileManagerPath+`public/assets/images/user-1.jpg`} alt="" />
                                            </figure>
                                            <span>William Adams</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="cell message-short-editable" data-title="Description">
                                    <div className="message-short-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                                </div>
                                <div className="cell m-time-editable" data-title="Cost">
                                    <div className="message-time">Just Now</div>
                                </div>
                                <div className="cell m-d-editable" data-title="Action">
                                    <div className="message-delete-btn"><button type="button" className="btn link-btn" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i></button></div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Inbox;
