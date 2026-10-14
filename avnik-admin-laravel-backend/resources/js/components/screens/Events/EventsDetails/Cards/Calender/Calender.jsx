import React, { useContext, useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import EventPayment from "../../../Constant/EventPayment";
import { Link } from "react-router-dom";
import { SlotsDetailsPreloader } from "../../../../../SkeletonLoading/SkeletonLoading";
import Context from "../../../../../../store/Context";
import CurrentUser from "../../../../../UserContext/CurrentUserContext/CurrentUser";
import GlobalContext from "../../../../../../Global/Context/GlobalContext";
const Calender = props => {
    const [state, dispatch] = useContext(Context);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const currentUser = useContext(CurrentUser)
    const findSlotByDate = e => {
        props.findSlotByDate(e);
    };
    const eventContent = e => {
        return (
            <>
                <div className="dot-instructions-point">
                    <ul className="cmn-ul-list">
                        <li>
                            <div className="d-i-p-bx">
                                <i>&nbsp;</i>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        );
    };

    const { CalenderSlots, SlotsDetails, SlotsPreloader } = state;
    const {
        eventCreatedUser,
        eventPayment,
        eventBooking,
        timezone
    } = state.EventByIdDetail;

    var eventsList = [];
    CalenderSlots?.map(res => eventsList.push({
        display: "background",
        start: res.local_start_date || moment.utc(res.start_date_time, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD'),
    }))
    console.log(SlotsDetails, "Props__111");
    return (
        <>
            <div
                className="ah-tab-content"
                data-ah-tab-active={
                    state.EventNavbarMenu === 2 ? true : false
                }
            >
                <div className="e-d-calender">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-7">
                            <div className="left-e-cal">
                                <div className="event-calender-bx">
                                    {state.EventNavbarMenu === 2 ||
                                        CalenderSlots?.length > 0 ? (
                                        <FullCalendar
                                            // initialView='timeGridWeek'
                                            initialView="dayGridMonth"
                                            dateClick={findSlotByDate}
                                            events={eventsList}
                                            selectable={true}
                                            plugins={[
                                                dayGridPlugin,
                                                timeGridPlugin,
                                                interactionPlugin
                                            ]}
                                            allDaySlot={false}
                                            views={{
                                                timeGridWeek: {
                                                    titleFormat: {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "2-digit"
                                                    }
                                                }
                                            }}
                                            // eventContent={e =>
                                            //     console.log(e, "sdfghjkl")
                                            // }
                                            dayHeaderContent={args =>
                                                moment(args.date).format(
                                                    "ddd Do"
                                                )
                                            }
                                            datesSet={props.RightCalendarWeekDates}
                                            nowIndicator={true}
                                            // customButtons={{
                                            //     myCustomButton: {
                                            //         text: (
                                            //             <>
                                            //                 <div
                                            //                     className="legend-dd"
                                            //                     style={{
                                            //                         margin:
                                            //                             "-12px"
                                            //                     }}
                                            //                 >
                                            //                     <div className="l-g-bx dot-dd-bx">
                                            //                         <div className="dropdown dd-right-side">
                                            //                             <a
                                            //                                 className="link-btn dropdown-toggle"
                                            //                                 href="#"
                                            //                                 id="my-account-dd"
                                            //                                 data-toggle="dropdown"
                                            //                             >
                                            //                                 Legend{" "}
                                            //                                 <i className="lb lb-dropdown-icon"></i>
                                            //                             </a>
                                            //                             <div
                                            //                                 className="dropdown-menu"
                                            //                                 aria-labelledby="my-account-dd"
                                            //                             >
                                            //                                 <div className="side-nav-bx">
                                            //                                     <ul>
                                            //                                         <li>
                                            //                                             <a href="#">
                                            //                                                 <em className="color-bx booked-color"></em>
                                            //                                                 Booked
                                            //                                                 By
                                            //                                                 Me
                                            //                                             </a>
                                            //                                         </li>
                                            //                                         <li>
                                            //                                             <a href="#">
                                            //                                                 <em className="color-bx bot-booked-color"></em>
                                            //                                                 Not
                                            //                                                 Yet
                                            //                                                 Booked
                                            //                                                 (Webinar/Class/Group)
                                            //                                             </a>
                                            //                                         </li>
                                            //                                         <li>
                                            //                                             <a href="#">
                                            //                                                 <em className="color-bx ava-appointment-color"></em>
                                            //                                                 Availability
                                            //                                                 For
                                            //                                                 Appointment
                                            //                                             </a>
                                            //                                         </li>
                                            //                                         <li>
                                            //                                             <a href="#">
                                            //                                                 <em className="color-bx blocked-time-color"></em>
                                            //                                                 Blocked
                                            //                                                 Time
                                            //                                             </a>
                                            //                                         </li>
                                            //                                         <li>
                                            //                                             <a href="#">
                                            //                                                 <em className="color-bx somebody-booed-color"></em>
                                            //                                                 Somebody
                                            //                                                 Booked
                                            //                                                 Me
                                            //                                             </a>
                                            //                                         </li>
                                            //                                     </ul>
                                            //                                 </div>
                                            //                             </div>
                                            //                         </div>
                                            //                     </div>
                                            //                 </div>
                                            //             </>
                                            //         )
                                            //     }
                                            // }}
                                            headerToolbar={{
                                                start: "title", // will normally be on the left. if RTL, will be on the right
                                                // center: "myCustomButton",
                                                end: "today prev,next" // will normally be on the right. if RTL, will be on the left
                                            }}
                                            now={moment().format("YYYY-MM-DD")}
                                            timeZone="local"
                                        />
                                    ) : (
                                        "Sorry We Are Not Found Anything"
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-5">
                            <div className="tab-heading">
                                <h2>Time slots</h2>
                                <a
                                    href={void 0}
                                    onClick={() => findSlotByDate("SeeAll")}
                                    className="link-btn float-right"
                                >
                                    See all...
                                </a>
                            </div>

                            <div
                                className="time-slot-list"
                                style={{
                                    minHeight: "476px",
                                    maxHeight: "480px",
                                    overflowY: "scroll"
                                }}
                            >
                                <ul>
                                    {SlotsPreloader ? (
                                        <SlotsDetailsPreloader />
                                    ) : SlotsDetails?.length > 0 ? (
                                        SlotsDetails.map(res => {
                                            {/* moment(res.start_date_time,'YYYY-MM-DD HH:mm:ss')>moment(moment(),'YYYY-MM-DD HH:mm:ss')? */ }

                                            return (
                                                moment.utc(res.start_date_time, 'YYYY-MM-DD HH:mm:ss').local() ?
                                                    <li key={res.id}>
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
                                                                                            onClick={() => globalDispatch({
                                                                                                type: "share", payload: {
                                                                                                    Type: "share", Share: `${window.location.origin}/share/event/${props
                                                                                                        .values
                                                                                                        .EventByIdDetail
                                                                                                        .id}`
                                                                                                }
                                                                                            })}
                                                                                        >
                                                                                            <i className="av av-share-icon"></i> Share
                                                                                        </a></li>
                                                                                        <li><Link to={`/event?token=${props
                                                                                            .values
                                                                                            .EventByIdDetail
                                                                                            .rememberToken}&event=${props
                                                                                                .values
                                                                                                .EventByIdDetail
                                                                                                .id}&slot=${res.id}`}

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
                                                                    {
                                                                        moment.utc(
                                                                            `${res.start_date} ${res.start_time}`,
                                                                            "YYYY-MM-DD HH:mm A"
                                                                        ).local().format(
                                                                            "D MMM YYYY, h:mm a"
                                                                        )} - {moment.utc(`${res.end_time}`, "HH:mm A").local().format("h:mm a")} {res?.cost > 0 ? `$${res?.cost}` : 'Free'}
                                                                </span>
                                                            </div>
                                                            <div className="ts-btn">
                                                                {eventCreatedUser?.id ==
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
                                                                            href={`/join/?rm=${res.meeting_room_id}`}
                                                                            className="btn cmn-bdr-btn"
                                                                            title="Start Meeting"
                                                                        >
                                                                            <i className="av av-quick-start-icon"></i>
                                                                        </a>
                                                                    </div>
                                                                ) : eventPayment?.find(
                                                                    Pay =>
                                                                        Pay.eventTimeSlotId ==
                                                                        res.id &&
                                                                        res.id ===
                                                                        Pay.eventTimeSlotId &&
                                                                        currentUser?.id ==
                                                                        Pay.userId
                                                                ) && eventBooking?.find(booking => booking.eventSlotId == res.id && res.id === booking.eventSlotId && currentUser?.id == booking.pUserId && booking?.status == "enabled")

                                                                    ? (
                                                                        <div className="btn default-btn booked-btn">
                                                                            Booked
                                                                            <a
                                                                                href={`/join/?rm=${res.meeting_room_id}`}
                                                                                className="btn cmn-bdr-btn"
                                                                                title="Join Meeting"
                                                                            >
                                                                                <i className="av av-quick-start-icon"></i>
                                                                            </a>
                                                                        </div>
                                                                    ) : res.total_seats == res?.booked_seats ? (
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
                                                                    ) : moment() > moment.utc(res?.start_date_time, 'YYYY-MM-DD HH:mm').local() ? <div className="btn default-btn booked-btn">
                                                                        Time Expired
                                                                        <a
                                                                            href='#'
                                                                            className="btn cmn-bdr-btn"
                                                                            title="Seats Full"
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
                                                                                props.paymentHandle(parseInt(res?.event_fk_id), parseInt(res.id), parseInt(res?.cost))
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


                                            );
                                        })
                                    ) : (
                                        <li>
                                            <div className="t-s-bx alert alert-danger">
                                                <span className="ts-time">
                                                    No slots here
                                                </span>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calender;
