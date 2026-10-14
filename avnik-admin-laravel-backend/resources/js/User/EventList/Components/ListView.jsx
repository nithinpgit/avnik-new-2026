import moment from 'moment';
import React, { useContext, useState } from 'react';
import { Eye } from 'react-feather';
import { Link } from 'react-router-dom';
import {FileManagerPath, assetUrl} from '../../../ApiServer/UrlService';
import FindDateTime from '../../../components/screens/CreateEvent/Classes/FindDateTime/FindDateTime';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import { showHideDiv, secondsToHms, convertMinutes } from '../../../utility/UtilityFunctions';
import GlobalContext from '../../../Global/Context/GlobalContext';


export { Accordion }

const Accordion = ({ response, handleViewBooking, cancelBooking, removeBooking, preloader }) => {
    const currentUser = useContext(CurrentUser);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [removeModal, setRemoveModal] = useState('');

    var onlyImage = '';
    var EventDates = '';
    const eventImage = JSON.parse(response?.events?.event_files);
    onlyImage = eventImage[0].file_url;
    if (response) {
        let dates = [];
        dates.push(moment(moment(`${moment(response.start_date, 'DD-MM-YYYY').format('DD-MM-YYYY')} ${moment(response.start_time, 'hh:mm:ss').format('hh:mm:ss')}`, 'DD-MM-YYYY HH:mm:ss')));
        EventDates = FindDateTime.checkUpcomingDate(dates);
    }
    const status = {
        1: { title: 'Ongoing', className: 'awaiting-status' },
        2: { title: 'Upcoming', className: 'withdrawn-status' },
        3: { title: 'Cancelled', className: 'refunded-status' },
        4: { title: 'Completed', className: 'completed-status' },
        5: { title: 'N/A', className: 'completed-status' },
        6: { title: 'Cancelled By Host', className: 'refunded-status' },
    }
    const checkStatusRender = (endDateTime, startDateTime, resStatus) => {
        // if(resStatus==="enabled"&&moment(endDateTime, 'YYYY-MM-DD HH:mm:ss')>moment()&&moment()<moment(startDateTime,'YYYY-MM-DD HH:mm:ss')){      
        //     return<> 
        //     <span className={`btn status-btn ${status[1].className}`}>
        //     {status[1].title}
        //     </span>
        //     </> 
        // }else 
        if (resStatus === "enabled" && moment() < moment.utc(endDateTime, 'YYYY-MM-DD HH:mm:ss').local() && moment() > moment.utc(startDateTime, 'YYYY-MM-DD HH:mm:ss').local()) {
            return <>
                <span className={`btn status-btn ${status[1].className}`}>
                    {status[1].title}
                </span>
            </>
        } else if (resStatus === "enabled" && moment() < moment.utc(startDateTime, 'YYYY-MM-DD HH:mm:ss').local()) {
            return <>
                <span className={`btn status-btn ${status[2].className}`}>
                    {status[2].title}
                </span>
            </>
        } else if (resStatus === "cancelled") {
            return <>
                <span className={`btn status-btn ${status[3].className}`}>
                    {status[3].title}
                </span>
            </>
        } else if (resStatus === "cancelledByHost") {
            return <>
                <span className={`btn status-btn ${status[6].className}`}>
                    {status[6].title}
                </span>
            </>
        } else if (resStatus === "enabled" && moment() > moment.utc(startDateTime, 'YYYY-MM-DD HH:mm:ss').local() && moment() > moment.utc(endDateTime, 'YYYY-MM-DD HH:mm:ss').local()) {
            return <>
                <span className={`btn status-btn ${status[4].className}`}>
                    {status[4].title}
                </span>
            </>
        } else {
            return <>
                <span className={`btn status-btn ${status[5].className}`}>
                    {status[5].title}
                </span>
            </>
        }

    }

    const removeBookingModal = (val) => {
        // setTimeout(()=>{
        setRemoveModal(val);
        // },200)
        $('#delete-booking-confirm-popup').modal('show');
    }
    return (
        <>
            <div className="c-table-row">
                <div className="cell event-details-editable" data-title="Event Name">
                    <div className="message-user-bx">

                        <Link to={`/event?token=${response?.events?.remember_token}&event=${response?.events?.id}&slot=${response?.event_slot_id}`}>
                            <figure className="cmn-profile-pic">
                                <img src={assetUrl(onlyImage)} alt={response?.events?.event_type} />
                            </figure>
                            <span>{response?.events?.event_title}</span>
                        </Link>
                    </div>
                </div>

                <div className="cell event-type-editable" data-title="Event Type">
                    <div className="c-table-text">{response?.events?.event_type}</div>
                </div>
                <div className="cell event-date-time-editable" data-title="Event Date">
                    {/* <div className="message-short-text">{EventDates ? moment(EventDates).format('D MMM YYYY h:mm A') : ''} </div> */}
                    <div className="message-short-text">{`${moment.utc(response.start_date_time, 'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY h:m A')}`} </div>
                </div>
                <div className="cell event-amount-editable" data-title="Amount">
                    <div className="c-table-text">{response?.cost > 0 ? '$ ' + response?.cost : 'Free'}</div>
                </div>
                <div className="cell event-hosted-by-editable" data-title="Privacy">
                    <div className="c-table-text">{response?.events?.event_visible ? 'Public' : 'Private'} </div>
                </div>
                {response?.extended?.length > 0 ?
                    <div className="cell event-more-editable" data-title="Extend">
                        <div className="event-more-btn">
                            <a href="#0" value="Show/Hide" onClick={() => showHideDiv(`event-more${response?.event_slot_id}`)}><i className="av av-extended-duration-more-icon"></i></a>
                        </div>
                    </div> : ''}
                <div className="cell event-duration-editable" data-title="Duration">
                    {/* {console.log(moment(moment.duration(response?.duration, "minutes").hours()+':'+moment.duration(response?.duration, "minutes").minutes(),'h:m').format('h:m') )} */}
                    <div className="c-table-text">{convertMinutes(response?.duration)}</div>
                </div>
                <div className="cell event-hosted-by-editable" data-title="Hosted By">
                    <div className="c-table-text"><Link to={`/profile/${response?.events?.event_create_user?.username}`}>{currentUser?.id == response?.events?.event_create_user?.id ? 'Me' : response?.events?.event_create_user?.name}</Link></div>
                </div>
                <div className="cell event-status-editable" data-title="Status">
                    <div className="complite-cancel-status">
                        {checkStatusRender(response?.end_date_time, response?.start_date_time, response?.status)}
                    </div>
                </div>

                <div className="cell event-message-editable" data-title="Message">
                    <div className="message-delete-btn">

                        <div className="r-m-t-bx my-account-menu table-dd">
                            <div className="btn-group">
                                <button type="button" className="btn dropdown-toggle dots-btn" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                    <i className="av av-dots-icon"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                    <ul>
                                        {currentUser?.id == response?.events?.event_create_user?.id && <li><a href="#" className="dropdown-item" onClick={() => handleViewBooking(response?.event_slot_id)}><Eye size={14} /> &nbsp; View Booking</a></li>}
                                        <li><a href={`/join/?rm=${response?.meeting_room_id}`} target="_blank" className="dropdown-item"><i className="meet-icon-img"><img src={`${FileManagerPath}/public/assets/images/online-meeting-icon.svg`} alt="" /></i> Meet</a></li>
                                        {currentUser?.id == response?.events?.event_create_user?.id
                                            ? response?.status === "cancelled" || response?.status === "cancelledByHost"
                                                ? <li><a href="#" onClick={() => removeBookingModal(response?.event_slot_id)} className="dropdown-item" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i> Remove</a></li>
                                                : response === "enabled" && moment() < moment.utc(response?.start_date_time, 'YYYY-MM-DD HH:mm:ss').local() && moment() > moment.utc(response?.end_date_time, 'YYYY-MM-DD HH:mm:ss').local() ? ""
                                                    : moment() > moment.utc(response?.end_date_time, 'YYYY-MM-DD HH:mm:ss').local() ? <li><a href="#" onClick={() => removeBookingModal(response?.event_slot_id)} className="dropdown-item" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i> Remove</a></li> : <li><a href={void (0)} onClick={() => cancelBooking(response?.events?.id, response?.event_slot_id, response?.created_at)} className="dropdown-item"><i className="fa fa-times text-danger"></i> Cancel</a></li>
                                            : response?.status === "cancelled" || response?.status === "cancelledByHost" ? <li><a href="#" onClick={() => removeBookingModal(response?.event_slot_id)} className="dropdown-item" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i> Remove</a></li>
                                                : response === "enabled" && moment() < moment.utc(response?.start_date_time, 'YYYY-MM-DD HH:mm:ss').local() && moment() > moment.utc(response?.end_date_time, 'YYYY-MM-DD HH:mm:ss').local() ? ""
                                                    : moment() > moment.utc(response?.end_date_time, 'YYYY-MM-DD HH:mm:ss').local() ? <li><a href="#" onClick={() => removeBookingModal(response?.event_slot_id)} className="dropdown-item" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i> Remove</a></li> : <li><a href={void (0)} onClick={() => cancelBooking(0, response?.event_slot_id, response?.created_at)} className="dropdown-item"><i className="fa fa-times text-danger"></i> Cancel</a></li>}

                                        <li>
                                            <a data-toggle="modal"
                                                href="#share-profile-popup"
                                                onClick={() => globalDispatch({ type: "share", payload: { Type: "share", Share: window.location.origin + `/share/event/${response?.events?.id}` } })}
                                                title="Share"
                                                className="dropdown-item" ><i className="av av-share-icon"></i> Share</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`event-more${response?.event_slot_id}`} className="events-users-show-bx" style={{ display: 'none' }}>
                {response?.extended?.length > 0 ? response?.extended.map((extend, i) =>
                    <div key={i} className="c-table-row ck-group-message">

                        <div className="cell event-details-editable" data-title="Event Name">
                            {/* <div className="message-user-bx"> */}

                            {/* <Link to={`/event?token=${response.remember_token}&event=${response?.event_slot_id}`}> */}
                            {/* <figure className="cmn-profile-pic">
                                        <img src={assetUrl(onlyImage)} alt={response?.events?.event_type} />
                                    </figure> */}
                            {/* <span>{response?.events?.event_title}</span> */}
                            <span>Extended Time</span>
                            {/* </Link> */}
                            {/* </div> */}
                        </div>
                        <div className="cell event-date-time-editable" data-title="Event Date">
                            <div className="message-short-text">
                                {/* {moment(extend?.created_at).format('D MMM YYYY h:mm A')}  */}
                                {`${moment.utc(response.start_date_time, 'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY h:m A')}`}
                            </div>
                        </div>
                        <div className="cell event-date-time-editable" data-title="Event Date">
                            <div className="message-short-text">${extend?.cost} </div>
                        </div>
                        <div className="cell event-duration-editable" data-title="Duration">
                            <div className="c-table-text">{secondsToHms(extend?.duration, true)}</div>
                        </div>
                        {/* <div className="cell event-status-editable" data-title="Status">
                            <div className="complite-cancel-status"><span className="btn status-btn awaiting-status">Awaiting</span></div>
                        </div> */}
                    </div>
                ) : ''}
            </div>
            {/* delete modal */}
            <div className="modal fade default-popup confirm-message-popup" id="delete-booking-confirm-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="message-m-box">
                                <div className="message-with-icon">
                                    <span className="info-icon"><i className="av av-info-icon"></i></span>
                                </div>
                                <strong>Are you sure you want to remove?</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="no-yes-btns">
                                <ul className="cmn-ul-list">
                                    <li><button type="button" className="btn blue-bdr-btn" onClick={() => setRemoveModal('')} data-dismiss="modal">No</button></li>
                                    <li><button type="button" onClick={() => removeBooking(0, removeModal)} className="btn default-btn" disabled={preloader}>{preloader ? <span className='button-pre-loading'>wait...</span> : "Yes"}</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}