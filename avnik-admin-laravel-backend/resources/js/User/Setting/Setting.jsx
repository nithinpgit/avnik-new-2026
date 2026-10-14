import React, { Component } from 'react';
import { useHistory } from 'react-router';

const Setting=({Active}) => {
 const history= useHistory();
        return (
            <>
                <div className="ah-tab-content" data-ah-tab-active={Active}>
                                <div className="notification-content-sec">
                                <div className="notificaton-setting-bx">
                                        <div className="noti-heading">
                                            <div className="cmn-rit-top-heading-sec noti-setting-heading">
                                                <div className="noti-back-icon-btn">
                                                    {/* <button type="button" onClick={()=>history.goBack()} className="btn text-btm"><i className="av av-undo-icon"></i> Back</button> */}
                                                </div>
                                                <div className="inbox-message-number">Email Settings </div>
                                            </div>
                                        </div>
                                        <div className="notificaton-setting-list">
                                            <ul className="cmn-ul-list">
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Inbox messages</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-1" defaultChecked/>
                                                            <label htmlFor="noti-setting-1"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Reference site about Lorem Ipsum</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-2" />
                                                            <label htmlFor="noti-setting-2"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>giving information on its origins.</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-3" />
                                                            <label htmlFor="noti-setting-3"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>You've visited this page many times</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-4" defaultChecked/>
                                                            <label htmlFor="noti-setting-4"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Lorem Ipsum is filler text used by publishers</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-5" />
                                                            <label htmlFor="noti-setting-5"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Lorem ipsum is a pseudo-Lati</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-6" defaultChecked/>
                                                            <label htmlFor="noti-setting-6"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Inbox messages</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-7" />
                                                            <label htmlFor="noti-setting-7"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Reference site about Lorem Ipsum</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-8" defaultChecked/>
                                                            <label htmlFor="noti-setting-8"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>giving information on its origins.</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-9" defaultChecked/>
                                                            <label htmlFor="noti-setting-9"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>You've visited this page many times</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-10"/>
                                                            <label htmlFor="noti-setting-10"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Lorem Ipsum is filler text used by publishers</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-11" defaultChecked/>
                                                            <label htmlFor="noti-setting-11"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="setting-toggle-bx">
                                                        <strong>Lorem Ipsum: usage Lorem ipsum</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-12" defaultChecked/>
                                                            <label htmlFor="noti-setting-12"></label>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
            </>
        );
    }


export default Setting;
