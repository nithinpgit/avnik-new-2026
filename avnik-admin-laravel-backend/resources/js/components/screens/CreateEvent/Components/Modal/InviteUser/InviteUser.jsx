import React, { Component } from 'react';
import { FileManagerPath } from '../../../../../../ApiServer/UrlService';

class InviteUser extends Component {
    render() {
        return (
            <>
                <div className="modal left fade side-popup invite-link-popup" id="invite-link-popup" tabIndex="-1" aria-labelledby="invite-link-popup" aria-hidden="true">
                    <div className="modal-dialog">
                        <form>
                            <div className="modal-content">
                                <div className="modal-header"> <a href="#join-request-popup" className="btn link-btn float-left f-u-back-btn" data-dismiss="modal"><i className="av av-arrow-left-line-icon"></i> Back</a> </div>
                                <div className="modal-body input-bdr-btm invite-link-bx">
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="meeting-room-link">
                                                <h2>Send Meeting Room Link</h2>
                                                <div className="form-group">
                                                    <input type="text" placeholder="https://www.google.com/search?q=avnik+soft+teachrlz=1C1CHBF_en" className="form-control" />
                                                    <button className="btn cmn-btn">Copy URL</button>
                                                </div>
                                                <div className="form-group">
                                                    <div className="add-time-input">
                                                        <input type="text" className="form-control" placeholder="Email Id" />
                                                        <button className="btn default-btn"><i className="av av-send-2-icon"></i> Send</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="share-contact-group">
                                                <div className="flex-container">
                                                    <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                                        <select className="form-control custom-select-bx">
                                                            <option defaultValue>All</option>
                                                            <option>Groups</option>
                                                            <option>Events</option>
                                                        </select>
                                                    </div>
                                                    <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                                        <div className="cmn-search-bx">
                                                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                                            <button className="btn link-btn" type="button"><i className="av av-search-icon"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="share-c-g-bx">
                                                    <div className="invite-link-list">
                                                        <ul>
                                                            <li>
                                                                <div className="share-c-info">
                                                                    <div className="checkbox custom">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} />
                                                                            <figure className="cmn-profile-pic"><img src={`${FileManagerPath}/public/assets/images/user-2.jpg`} alt="logo" /></figure>
                                                                            <span>William Adams</span> <span>Nairobi, Kenya</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="share-c-info">
                                                                    <div className="checkbox custom">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} />
                                                                            <figure className="cmn-profile-pic"><img src={`${FileManagerPath}/public/assets/images/user-2.jpg`} alt="logo" /></figure>
                                                                            <span>William Adams</span> <span>Nairobi, Kenya</span> </label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="share-c-info">
                                                                    <div className="checkbox custom">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} />
                                                                            <figure className="cmn-profile-pic"><img src={`${FileManagerPath}/public/assets/images/user-2.jpg`} alt="logo" /></figure>
                                                                            <span>William Adams</span> <span>Nairobi, Kenya</span> </label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="share-c-info">
                                                                    <div className="checkbox custom">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} />
                                                                            <figure className="cmn-profile-pic"><img src={`${FileManagerPath}/public/assets/images/user-2.jpg`} alt="logo" /></figure>
                                                                            <span>William Adams</span> <span>Nairobi, Kenya</span> </label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="share-c-info">
                                                                    <div className="checkbox custom">
                                                                        <label>
                                                                            <input type="checkbox" defaultChecked={true} />
                                                                            <figure className="cmn-profile-pic"><img src={`${FileManagerPath}/public/assets/images/user-2.jpg`} alt="logo" /></figure>
                                                                            <span>William Adams</span> <span>Nairobi, Kenya</span> </label>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="side-next-back-btn">
                                        <button type="button" className="btn default-btn float-right" data-dismiss="modal">Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default InviteUser;
