import React, { useContext } from "react";
import UserProfileContext from "../UserProfileContext/UserProfileContext";
import moment from "moment";
import CurrentUser from "../../../components/UserContext/CurrentUserContext/CurrentUser";
import { SlotsDetailsPreloader } from "../../../components/SkeletonLoading/SkeletonLoading";
import { eventDetailsUrl } from "../../../utility/UtilityFunctions";
import { Link } from "react-router-dom";
import GlobalContext from "../../../Global/Context/GlobalContext";
const EventSlotList = (props) => {
    const [state, dispatch] = useContext(UserProfileContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const currentUser = useContext(CurrentUser);
    return (
        <>
            <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="time-slot-right">
                    <div className="tab-heading">
                        <h2>Time slots</h2>
                        <a
                            href={void 0}
                            onClick={() =>
                                dispatch({
                                    type: "setStartDate",
                                    payload: {
                                        Type: "setStartDate",
                                        StartDate: ""
                                    }
                                })
                            }
                            className="link-btn float-right"
                        >
                            See all...
                        </a>
                    </div>
                    <div id="accordion">
                        {state.SlotPreloader ? (
                            <SlotsDetailsPreloader />
                        ) : state.SlotDetails?.length > 0 ? (
                            state.SlotDetails.map((res, index) => (
                                <div key={res.id} className="card">
                                    <div className="card-header">
                                        <div className="t-s-bx">
                                            <div className="ts-option">
                                                {res.event_create_user?.id ==
                                                    currentUser?.id ? (
                                                    <>
                                                        {/* <a data-toggle="modal" href="#reschedule-event-popup" className="dropdown-item"><i className="av av-share-icon"></i></a> */}
                                                        {/* <div className="r-m-t-bx my-account-menu">
                                            <div className="btn-group">
                                                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                                    <i className="av av-event-menu-icon"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <ul>
                                                        <li><a data-toggle="modal" href="#reschedule-event-popup" className="dropdown-item"><i className="av av-reschedule-icon"></i> Reschedule</a></li>
                                                        <li><a data-toggle="modal" href="#disable-confirm-message-popup" className="dropdown-item"><i className="av av-disable-icon"></i> Disable</a></li>
                                                        <li><a data-toggle="modal" href="#delete-confirm-message-popup" className="dropdown-item"><i className="av av-delete-icon"></i> Delete</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="ts-time">
                                                <span>{res.event_title}</span>
                                            </div>
                                            <div className="ts-btn">
                                                <a
                                                    className="link"
                                                    data-toggle="collapse"
                                                    href={`#collapseOne${res.id}`}
                                                >
                                                    <i className="av av-add-plus-icon"></i>
                                                    {/* <i className="av av-extended-duration-less-icon"></i> */}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id={`collapseOne${res.id}`}
                                        className={`collapse ${res.id == 1 ? "show" : ""
                                            }`}
                                        data-parent="#accordion"
                                    >
                                        <div className="card-body">
                                            <div className="time-slot-list">
                                                <ul>
                                                    {res.event_time_slot.map(
                                                        (slot, sIndex) => (

                                                            moment(slot.start_date_time, 'YYYY-MM-DD HH:mm:ss') ?
                                                                <li key={slot.id}>
                                                                    <div className="t-s-bx">
                                                                        {
                                                                            <>
                                                                                {/* eventCreatedUser?.id == currentUser?.id ?  */}
                                                                                <div className="ts-option">
                                                                                    <div className="r-m-t-bx my-account-menu">
                                                                                        <div className="btn-group">
                                                                                            <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                                                                                <i className="av av-event-menu-icon"></i>
                                                                                            </button>
                                                                                            <div className="dropdown-menu" >
                                                                                                <ul>
                                                                                                    <li><a
                                                                                                        data-toggle="modal"
                                                                                                        href="#share-profile-popup"
                                                                                                        className="dropdown-item"
                                                                                                        onClick={() => globalDispatch({ type: "share", payload: { Type: "share", Share: `${window.location.origin}/share/event/${res?.id}` } })}
                                                                                                    >
                                                                                                        <i className="av av-share-icon"></i> Share
                                                                                                    </a></li>
                                                                                                    <li><Link to={`/event?token=${res?.remember_token}&event=${res?.id}&slot=${slot?.id}`}

                                                                                                        className="dropdown-item"
                                                                                                    >
                                                                                                        <i className="av av-eye-icon"></i> View
                                                                                                    </Link></li>
                                                                                                    {/* <li><a data-toggle="modal" onClick={() => alert(res.id)} href="#disable-confirm-message-popup" className="dropdown-item"><i className="av av-disable-icon"></i> Disable</a></li> */}
                                                                                                    {/* <li><a data-toggle="modal" onClick={() => alert(res.id)} href="#delete-confirm-message-popup" className="dropdown-item"><i className="av av-delete-icon"></i> Delete</a></li> */}
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <div className="ts-option"> */}
                                                                                {/* <div className="r-m-t-bx my-account-menu">
                                                                  <div className="btn-group">
                                                                    <a data-toggle="modal" onClick={() => alert(res.id)} href="" className="dropdown-item share-time-slots-link"><i className="av av-share-icon"></i></a>
                                                                   </div>
                                                                </div> */}
                                                                                {/* <a
                                                                        data-toggle="modal"
                                                                        href="#share-profile-popup"
                                                                        className="dropdown-item"
                                                                        onClick={()=>globalDispatch({type:"share",payload:{Type:"share",Share:`${window.location.hostname}/event?token=${props
                                                                                    .values
                                                                                    .EventByIdDetail
                                                                                    .rememberToken}&event=${props
                                                                                    .values
                                                                                    .EventByIdDetail
                                                                                    .id}&slot=${res.id}`}})}
                                                                    >
                                                                        <i className="av av-share-icon"></i>
                                                                    </a> */}
                                                                                {/* </div> */}
                                                                            </>
                                                                        }
                                                                        <div className="ts-time">
                                                                            <span>
                                                                                {moment(
                                                                                    moment(
                                                                                        `${slot.start_date} ${slot.start_time}`,
                                                                                        "YYYY-MM-DD HH:mm A"
                                                                                    )
                                                                                ).format(
                                                                                    "D MMM YYYY, h:mm a"
                                                                                )} - {moment(`${slot.end_time}`, "HH:mm A").format("h:mm a")} {slot?.cost > 0 ? `$${slot?.cost}` : 'Free'}
                                                                            </span>
                                                                        </div>
                                                                        <div className="ts-btn">
                                                                            {res?.user_fk_id ==
                                                                                currentUser?.id ? (
                                                                                // ? <a href={`/join/?rm=${res.meeting_room_id}`} target="_blank" className="btn default-btn">Start</a>
                                                                                <div
                                                                                    className="btn default-btn booked-btn"
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            "#145388"
                                                                                    }}
                                                                                >
                                                                                    Start
                                                                                    <a
                                                                                        href={`/join/?rm=${slot.meeting_room_id}`}
                                                                                        className="btn cmn-bdr-btn"
                                                                                        title="Start Meeting"
                                                                                    >
                                                                                        <i className="av av-quick-start-icon"></i>
                                                                                    </a>
                                                                                </div>
                                                                            ) : slot?.event_payment?.find(
                                                                                Pay =>
                                                                                    Pay.event_time_slot_id ==
                                                                                    slot.id &&
                                                                                    slot.id ===
                                                                                    Pay.event_time_slot_id &&
                                                                                    currentUser?.id ==
                                                                                    Pay.user_fk_id
                                                                            ) && slot?.event_booking?.find(booking => booking.event_slot_id == slot?.id && slot?.id === booking.event_slot_id && currentUser?.id == booking.p_user_id && booking?.status == "enabled")

                                                                                ? (
                                                                                    <div className="btn default-btn booked-btn">
                                                                                        Booked
                                                                                        <a
                                                                                            href={`/join/?rm=${slot?.meeting_room_id}`}
                                                                                            className="btn cmn-bdr-btn"
                                                                                            title="Join Meeting"
                                                                                        >
                                                                                            <i className="av av-quick-start-icon"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                ) : slot.total_seats == slot?.booked_seats ? (
                                                                                    <div className="btn default-btn booked-btn">
                                                                                        Seats Full
                                                                                        <a
                                                                                            href='#'
                                                                                            className="btn cmn-bdr-btn"
                                                                                            title="Seats Full"
                                                                                        >
                                                                                            <i className="av av-quick-start-icon"></i>
                                                                                        </a>
                                                                                    </div>
                                                                                ) : moment() > moment(slot?.start_date_time, 'YYYY-MM-DD HH:mm') ? <div className="btn default-btn booked-btn">
                                                                                    Time Expired
                                                                                    <a
                                                                                        href='#'
                                                                                        className="btn cmn-bdr-btn"
                                                                                        title="Time Expired"
                                                                                    >
                                                                                        <i className="av av-quick-start-icon"></i>
                                                                                    </a>
                                                                                </div> :
                                                                                    <button
                                                                                        type="button"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                "#145388",
                                                                                            cursor:
                                                                                                "pointer"
                                                                                        }}
                                                                                        className="btn default-btn booked-btn"
                                                                                        onClick={() =>
                                                                                            props.paymentHandle(parseInt(slot?.event_fk_id), parseInt(slot.id), parseInt(slot?.cost))
                                                                                        }
                                                                                    >
                                                                                        Book Now
                                                                                        <a
                                                                                            href="#"
                                                                                            style={{
                                                                                                pointerEvents:
                                                                                                    "none"
                                                                                            }}
                                                                                            className="btn cmn-bdr-btn"
                                                                                            title="Book Now"
                                                                                        >
                                                                                            <i className="av av-quick-start-icon"></i>
                                                                                        </a>
                                                                                    </button>

                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </li> : <li>
                                                                    <div className="t-s-bx alert alert-danger">
                                                                        <span className="ts-time">
                                                                            No Upcoming Slots
                                                                        </span>
                                                                    </div>
                                                                </li>




                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <li className="list-unstyled">
                                <div className="t-s-bx alert alert-danger">
                                    <span className="ts-time">
                                        No slots here
                                    </span>
                                </div>
                            </li>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventSlotList;
