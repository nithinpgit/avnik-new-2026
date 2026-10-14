import React, { useRef, useContext, useEffect } from "react";
import FullCalendar, { CustomContentRenderContext } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import allLocales from "@fullcalendar/core/locales-all";
import TimeZone, {
    TimeZoneOffset,
} from "../../../../../ApiServer/TimeZoneJSON/TimeZone";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import moment from "moment";
import CurrentUserEventsContext from "../../../Events/Constant/CurrentUserEventContext/CurrentUserEventsContext";
import { withRouter } from "react-router-dom";
import CreateEventContext from "../../Pages/CreateEventContext/CreateEventContext";
import GlobalContext from "../../../../../Global/Context/GlobalContext";
// const GlobalContext = lazy(() => import('../../../../../Global/Context/GlobalContext'));

import { ApiService } from "../../../../../ApiServer/ApiService";


const calendarComponentRef = React.createRef();
const ChoseEventCalendar = React.memo((props) => {
    const [
        state,
        dispatch,
        resetFormState,
        onChangeCalendar,
        onDragSelect,
        removeSetImage,
        removeSetFiles,
        MyEventsList,
        CancelParticipantBooking,
        JoinRequestPopupHandling,
        handleFormSubmit,
        CalenderDots,
        onChangeWeeklyCalendar,
    ] = useContext(CreateEventContext);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const datesSetRef = useRef(null);

    useEffect(() => {
        $(".fc-today-button").click(function () {
            dispatch({
                type: "ChangeCalendar",
                payload: {
                    Type: "ChangeCalendar",
                    SelectedCalendarDate: new Date(),
                },
            });
        });

    }, []);
    const DeleteSlot = (slotId, eventId) => {
        globalDispatch({
            type: "DeleteEvent",
            payload: {
                Type: "DeleteEvent",
                eventDeleteId: eventId,
                eventDeleteSlotId: slotId,
            },
        });
        $("#DeleteFollowingEventModal").modal("show");
    };
    const DisableEventSlot = (slotId, eventId) => {
        globalDispatch({
            type: "EditEvent",
            payload: {
                Type: "EditEvent",
                eventDisableId: eventId,
                eventDisableSlotId: slotId,
            },
        });
        $("#DisableFollowingEventModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    };

    const EditEvent = (eventId, slotId) => {
        globalDispatch({
            type: "EditEvent",
            payload: {
                Type: "EditEvent",
                EventEditId: eventId,
                eventSlotEditId: slotId,
            },
        });
        $("#EditFollowingEventModal").modal("show");
    };
    const CancelEvent = (eventId, slotId) => {
        globalDispatch({
            type: "eventCancel",
            payload: {
                Type: "eventCancel",
                eventCancelId: eventId,
                eventCancelSlotId: slotId,
            },
        });
        $("#CancelFollowingEventModal").modal("show");
    };

    const RightCalendarWeekDates = (arg) => {
        console.log(arg, 'RightCalendarWeekDates');
        // onChangeWeeklyCalendar({startDate: moment(arg.view.activeStart).format('YYYY-MM-DD'),endDate: moment(arg.view.activeEnd).format('YYYY-MM-DD')})
        dispatch({
            type: "RightCalendarWeekDates",
            payload: {
                Type: "RightCalendarWeekDates",
                RightCalendarWeekDates: {
                    startDate: moment(arg.view.activeStart).format(
                        "YYYY-MM-DD"
                    ),
                    endDate: moment(arg.view.activeEnd).format("YYYY-MM-DD"),
                },
            },
        });
    };
    useEffect(() => {
        let calendarApi = calendarComponentRef.current.getApi();
        calendarApi.gotoDate(
            moment(state?.eventSingleDate, "DD-MM-YYYY").format("YYYY-MM-DD")
        );
    }, [state?.eventSingleDate]);
    const eventContent = (e) => {
        console.log(e.event, "timetext");
        const booked = { minWidth: "100px" };
        return (
            <>
                <span
                    type="button"
                    className=" text-light btn dropdown-toggle"
                    data-toggle="dropdown"
                    data-display="static"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <div className="r-m-t-bx cmn-new-toggle" style={booked}>
                        <p className="text-light" style={{ fontSize: "12px" }}>
                            {e.event.title || "No title"}
                        </p>
                        <p className="text-light" style={{ fontSize: "12px" }}>
                            {e.timeText}
                        </p>
                    </div>
                </span>
                <div
                    className="btn-group text-light"
                    style={{ marginTop: "-10px" }}
                >
                    <div className="dropdown-menu dropdown-menu-lg-right">
                        <ul>
                            {e.event.extendedProps?.host == 1 ? (
                                e.event?.extendedProps?.status == "disabled" ? (
                                    <>
                                        <li>
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    DeleteSlot(
                                                        parseInt(e.event.id),
                                                        parseInt(
                                                            e.event
                                                                ?.extendedProps
                                                                ?.eventId
                                                        )
                                                    )
                                                }
                                                className="dropdown-item"
                                            >
                                                <i className="av av-delete-icon"></i>{" "}
                                                Remove
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    DisableEventSlot(
                                                        parseInt(e.event.id),
                                                        parseInt(
                                                            e.event
                                                                ?.extendedProps
                                                                ?.eventId
                                                        )
                                                    )
                                                }
                                                className="dropdown-item"
                                            >
                                                <i class="av av-disable-icon"></i>{" "}
                                                Enable
                                            </a>
                                        </li>
                                        {e.event?.extendedProps?.booking > 0 &&
                                            e.event?.extendedProps?.expiredTime ==
                                            false ? (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        CancelEvent(
                                                            e.event
                                                                ?.extendedProps
                                                                ?.eventId,
                                                            e.event.id
                                                        )
                                                    }
                                                    className="dropdown-item"
                                                >
                                                    <i className="av av-delete-icon"></i>{" "}
                                                    Cancel
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        <li>
                                            <a
                                                href={`/event?token=${e.event?.extendedProps?.rememberToken}&event=${e.event?.extendedProps?.eventId}&slot=${e.event.id}`}
                                                className="dropdown-item"
                                                target="_blank"
                                            >
                                                <i className="av av-delete-icon"></i>{" "}
                                                View
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`/join/?rm=${e.event?.extendedProps?.meetingRoomId}`}
                                                target="_blank"
                                                className="dropdown-item"
                                            >
                                                <i className="av av-delete-icon"></i>{" "}
                                                Meet
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {e.event?.extendedProps?.booking > 0 ? (
                                            ""
                                        ) : e.event?.extendedProps
                                            ?.expiredTime ? (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        DeleteSlot(
                                                            parseInt(
                                                                e.event.id
                                                            ),
                                                            parseInt(
                                                                e.event
                                                                    ?.extendedProps
                                                                    ?.eventId
                                                            )
                                                        )
                                                    }
                                                    className="dropdown-item"
                                                >
                                                    <i className="av av-delete-icon"></i>{" "}
                                                    Remove
                                                </a>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <a
                                                        href={void 0}
                                                        onClick={() =>
                                                            EditEvent(
                                                                e.event
                                                                    ?.extendedProps
                                                                    ?.eventId,
                                                                e.event.id
                                                            )
                                                        }
                                                        className="dropdown-item"
                                                    >
                                                        <i className="av av-edit-icon"></i>{" "}
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        onClick={() =>
                                                            DeleteSlot(
                                                                parseInt(
                                                                    e.event.id
                                                                ),
                                                                parseInt(
                                                                    e.event
                                                                        ?.extendedProps
                                                                        ?.eventId
                                                                )
                                                            )
                                                        }
                                                        className="dropdown-item"
                                                    >
                                                        <i className="av av-delete-icon"></i>{" "}
                                                        Remove
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        onClick={() =>
                                                            DisableEventSlot(
                                                                parseInt(
                                                                    e.event.id
                                                                ),
                                                                parseInt(
                                                                    e.event
                                                                        ?.extendedProps
                                                                        ?.eventId
                                                                )
                                                            )
                                                        }
                                                        className="dropdown-item"
                                                    >
                                                        <i class="av av-disable-icon"></i>{" "}
                                                        Disable
                                                    </a>
                                                </li>
                                            </>
                                        )}

                                        {e.event?.extendedProps?.booking > 0 &&
                                            e.event?.extendedProps?.expiredTime ==
                                            false ? (
                                            <li>
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        CancelEvent(
                                                            e.event
                                                                ?.extendedProps
                                                                ?.eventId,
                                                            e.event.id
                                                        )
                                                    }
                                                    className="dropdown-item"
                                                >
                                                    <i className="av av-delete-icon"></i>{" "}
                                                    Cancel
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        <li>
                                            <a
                                                href={void 0}
                                                onClick={() =>
                                                    props.JoinRequestHandling(
                                                        e.event.id
                                                    )
                                                }
                                                className="dropdown-item"
                                            >
                                                <i className="av av-calendar-icon"></i>{" "}
                                                Bookings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`/event?token=${e.event?.extendedProps?.rememberToken}&event=${e.event?.extendedProps?.eventId}&slot=${e.event.id}`}
                                                className="dropdown-item"
                                                target="_blank"
                                            >
                                                <i className="av av-delete-icon"></i>{" "}
                                                View
                                            </a>
                                        </li>
                                        {/* <li>
                                        <a href="#" className="dropdown-item">
                                            <i className="av av-invite-icon"></i>{" "}
                                            Invite
                                        </a>
                                    </li> */}
                                        <li>
                                            <a
                                                data-toggle="modal"
                                                href="#share-profile-popup"
                                                className="dropdown-item"
                                                onClick={() =>
                                                    globalDispatch({
                                                        type: "share",
                                                        payload: {
                                                            Type: "share",
                                                            Share: `${window.location.origin}/share/event/${e.event?.extendedProps?.eventId}`,
                                                        },
                                                    })
                                                }
                                            >
                                                <i className="av av-share-icon"></i>{" "}
                                                Share
                                            </a>
                                            {/* <a href="#" className="dropdown-item">
                                            <i className="av av-share-icon"></i>{" "}
                                            Share
                                        </a> */}
                                        </li>
                                        <li>
                                            <a
                                                href={`/join/?rm=${e.event?.extendedProps?.meetingRoomId}`}
                                                className="dropdown-item"
                                            >
                                                <i className="av av-delete-icon"></i>{" "}
                                                Meet
                                            </a>
                                        </li>
                                    </>
                                )
                            ) : (
                                <>
                                    <li>
                                        <a
                                            data-toggle="modal"
                                            href="#share-profile-popup"
                                            className="dropdown-item"
                                            onClick={() =>
                                                globalDispatch({
                                                    type: "share",
                                                    payload: {
                                                        Type: "share",
                                                        Share: `${window.location.origin}/share/event/${e.event?.extendedProps?.eventId}`,
                                                    },
                                                })
                                            }
                                        >
                                            <i className="av av-share-icon"></i>{" "}
                                            Share
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`/join/?rm=${e.event?.extendedProps?.meetingRoomId}`}
                                            className="dropdown-item"
                                        >
                                            <i className="av av-delete-icon"></i>{" "}
                                            Meet
                                        </a>
                                    </li>
                                    {e.event?.extendedProps?.expiredTime ? (
                                        ""
                                    ) : (
                                        <li>
                                            <a
                                                href={void 0}
                                                onClick={() =>
                                                    props.cancelParticipantBooking(
                                                        parseInt(e.event.id)
                                                    )
                                                }
                                                className="dropdown-item"
                                            >
                                                <i className="av av-logout-icon"></i>{" "}
                                                Cancel
                                            </a>
                                        </li>
                                    )}
                                    {/* <li>
                                        <a href="#" className="dropdown-item">
                                            <i className="av av-logout-icon"></i>{" "}
                                            Quit
                                        </a>
                                    </li> */}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <FullCalendar
                initialView="timeGridWeek"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={state?.showEventsOnCalendar}
                // dateClick={props.onClickSelect}
                selectable={true}
                longPressDelay={1}
                selectLongPressDelay={1}
                eventLongPressDelay={1}
                // eventSources={[
                //     (arg) =>
                //         onChangeWeeklyCalendar({
                //             startDate: moment(arg.start).format("YYYY-MM-DD"),
                //             endDate: moment(arg.end).format("YYYY-MM-DD"),
                //         }),
                // ]}
                // timeZone={TimeZone}
                progressiveEventRendering={true}
                nowIndicator={true}
                eventDragStart={(info) => {
                    console.log(info);
                }}
                select={props.onDragSelect}
                allDaySlot={false}
                views={{
                    timeGridWeek: {
                        titleFormat: {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                        },
                    },
                }}
                dayHeaderContent={(args) => moment(args.date).format("ddd Do")}
                slotDuration={"00:15:00"}
                //headerToolbar={{ left: 'prev,next today',
                //     center: 'title',
                //     right: 'dayGridMonth,timeGridWeek,timeGridDay'}}

                selectMirror={true}
                // viewDidMount={(info)=> {
                // console.log(info,'view MountFC')
                //     if(info.view.type == 'dayGridWeek') {
                //     info.view.calendar.setOption('firstDay', moment().toDate().getDay());
                // } else if (info.view.type == 'dayGridMonth') {
                //     info.view.calendar.setOption('firstDay', 0);
                // }
                // }
                // }
                ref={calendarComponentRef}
                selectMinDistance={0}
                eventClick={function (info) {
                    info.el.style.borderColor = "#d31111";
                    console.log(info, "event clicked");
                }}
                selectOverlap={false}
                datesSet={RightCalendarWeekDates}
                rerenderDelay={100}
                // themeSystem="bootstrap"
                customButtons={{
                    myCustomButton: {
                        text: (
                            <>
                                <div
                                    className="legend-dd"
                                    style={{ margin: "-12px" }}
                                >
                                    <div className="l-g-bx dot-dd-bx">
                                        <div className="dropdown dd-right-side">
                                            <a
                                                className="link-btn dropdown-toggle"
                                                href="#"
                                                id="my-account-dd"
                                                data-toggle="dropdown"
                                            >
                                                Legend{" "}
                                                <i className="lb lb-dropdown-icon"></i>
                                            </a>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="my-account-dd"
                                            >
                                                <div className="side-nav-bx">
                                                    <ul>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx booked-color"></em>
                                                                Booked By Me
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx bot-booked-color"></em>
                                                                Not Yet Booked
                                                                (Webinar/Class/Group)
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx ava-appointment-color"></em>
                                                                Availability For
                                                                Appointment
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx blocked-time-color"></em>
                                                                Blocked Time
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx somebody-booed-color"></em>
                                                                Somebody Booked
                                                                Me
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx somebody-disable-color "></em>
                                                                Disable
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <em className="color-bx somebody-time-expired-color "></em>
                                                                Time Expired
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ),
                    },
                }}
                headerToolbar={{
                    start: "title", // will normally be on the left. if RTL, will be on the right
                    center: "myCustomButton",
                    end: "today prev,next", // will normally be on the right. if RTL, will be on the left
                }}
                eventContent={(e) => eventContent(e)}
                initialEvents={moment(
                    state?.eventSingleDate,
                    "DD-MM-YYYY"
                ).format("YYYY-MM-DD")}
                timeZone="local"
                now={`${moment().format("YYYY-MM-DD HH:mm:ss")}`}
            />
        </>
    );
});

export default withRouter(ChoseEventCalendar);
