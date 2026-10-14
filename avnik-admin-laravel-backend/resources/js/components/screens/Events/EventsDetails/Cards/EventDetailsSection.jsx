import React, { useContext, useEffect, useReducer, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Detail from "./Detail/Detail";
import Calender from "./Calender/Calender";
import Review from "./Review/Review";
import Download from "./Download/Download";
import AllEventsDetails from "../../../../../ApiServer/AllEventsDetails";
import Auth from "../../../../../Routes/Auth";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import 'moment-timezone';
import { Redirect, useLocation } from "react-router-dom";
import StripePaymentModal from "../../../Events/Payments/Modals/StripePaymentModal";
import UserAuthService from "../../../../../ApiServer/UserAuthService";
import axios from "axios";
import Error404 from "../../../Pages/Errors/404";
import { ApiService } from "../../../../../ApiServer/ApiService";
import ShareProfilePopup from "../../../../../User/Profiles/ProfileModals/ShareProfilePopup";
import Context from "../../../../../store/Context";
import Reducer from "../../../../../utility/Reducer";
import CurrentUser from "../../../../UserContext/CurrentUserContext/CurrentUser";
import ReportProfilePopup from "../../../../../User/Profiles/ProfileModals/ReportProfilePopup";
import GlobalContext from "../../../../../Global/Context/GlobalContext";
import ConflictsEvents from "../../../CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents";
import StripeEventFilePaymentModal from "../../Payments/Modals/StripeEventFilePaymentModal";
import DefaultStars from "../../../../../User/Reviews/Components/DefaultStars/DefaultStars";
import { Redirect401Login } from "../../../../../utility/UtilityFunctions";
const initialState = {
    eventPreloader: true,
    errorPage: false,
    isAuthenticated: Auth.isAuthenticated(),
    ConflictsEvents: [],
    EventByIdDetail: [],
    SlotsDetails: [],
    CalenderSlots: [],
    UpComingSlots: null,
    SlotsPreloader: true,
    EventFiles: [],
    EventFilesCart: [],
    EventFilesCartAmount: 0,
    RightCalendarWeekDates: {},
    startDate: "",
    EventNavbarMenu: 1,
    FavoriteCounter: 0,
    eventId: 0,
    slotId: 0,
    amount: 0,
    error: false
};
const EventDetailsSection = props => {
    const currentURL = useLocation();
    const currentUser = useContext(CurrentUser);
    const [globalState, globalDispatch, handleReportUserEvent, onChangeReport, chatInitiate] = useContext(GlobalContext);
    let params = { slot: null, event: null, token: null };
    currentURL.search
        .slice(1)
        .split("&")
        .forEach(elm => {
            if (elm === "") return;
            let spl = elm.split("=");
            const d = decodeURIComponent;
            params[d(spl[0])] = spl.length >= 2 ? d(spl[1]) : true;
        });
    const [eventId, setEventId] = useState(params.event);
    const [eventToken, setEventToken] = useState(params?.token);
    const [eventSlot, setEventSlot] = useState(params?.slot);
    const CleanMyState = () => {
        dispatch({
            type: "onPaymentOfFiles",
            payload: {
                Type: "onPaymentOfFiles",
                eventPreloader: true,
                errorPage: false,
                isAuthenticated: Auth.isAuthenticated(),
                ConflictsEvents: [],
                EventByIdDetail: [],
                SlotsDetails: [],
                CalenderSlots: [],
                UpComingSlots: null,
                SlotsPreloader: true,
                EventFiles: [],
                EventFilesCart: [],
                EventFilesCartAmount: 0,
                RightCalendarWeekDates: {},
                startDate: "",
                EventNavbarMenu: 1,
                FavoriteCounter: 0,
                eventId: 0,
                slotId: 0,
                amount: 0,
                error: false
            }
        });
    }
    const [state, dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
        getEventDetails();
        getSlotsDetails();
        fetchUpComingSlots();
        return () => {
            CleanMyState()
        };
    }, []);
    const RightCalendarWeekDates = arg => {
        // dispatch({ type: "", payload: { Type: "", SlotsPreloader: true } });
        const data = {
            eventId: eventId,
            slotId: eventSlot,
            activeStart: moment(arg.view.activeStart).format("YYYY-MM-DD"),
            activeEnd: moment(arg.view.activeEnd).format("YYYY-MM-DD"),
            tz: moment.tz.guess(),
        };
        ApiService._eventSlotsDetails(data)
            .then(res => {
                if (res.data.status == "failed" && res.data.success == false) {
                    toastr["error"](res.data.message);
                }
                if (res.data.data) {
                    if (res.data.status == 200) {
                        const responseData = res.data.data.map((slot) => ({
                            ...slot,
                            local_start_date: moment.utc(slot.start_date_time, 'YYYY-MM-DD HH:mm:ss').local().format('YYYY-MM-DD'),
                        }));
                        dispatch({
                            type: "CalenderSlotsSPLT",
                            payload: {
                                Type: "CalenderSlotsSPLT",
                                CalenderSlots: responseData,
                                SlotsPreloader: false
                            }
                        });
                    }
                }
            })
            .catch(error => {
                // dispatch({ type: "", payload: { Type: "", errorPage: true } });
            });

        dispatch({
            type: "RightCalendarWeekDates",
            payload: {
                Type: "RightCalendarWeekDates",
                RightCalendarWeekDates: {
                    startDate: moment(arg.view.activeStart).format(
                        "YYYY-MM-DD"
                    ),
                    endDate: moment(arg.view.activeEnd).format("YYYY-MM-DD")
                }
            }
        });
    };
    useEffect(() => {
        getEventDetails();
        getSlotsDetails();
        return () => {
            // CleanMyState()

        };
    }, [state.startDate]);

    const getEventDetails = prevState => {
        const data = `${eventId}/${eventToken}`;
        ApiService._fetchEventDetails(data)
            .then(res => {
                if (res.data.status == "failed" && res.data.success == false) {
                    toastr["error"](res.data.message);
                    dispatch({
                        type: "",
                        payload: { Type: "", errorPage: true }
                    });
                }
                if (prevState != res.data.data) {
                    if (res.data.status == 200) {
                        dispatch({
                            type: "",
                            payload: {
                                Type: "",
                                eventPreloader: false,
                                EventByIdDetail: res.data.data
                            }
                        });
                    }
                }
            })
            .catch(error => {
                Redirect401Login(error);
                dispatch({ type: "", payload: { Type: "", errorPage: true } });
            });
    };
    const onPaymentOfFiles = (status, data) => {
        if (status) {
            $('#stripe_event_file_payment_modal').modal('hide');
            getEventDetails();
            getSlotsDetails();
            fetchUpComingSlots();
            dispatch({
                type: "onPaymentOfFiles",
                payload: {
                    Type: "onPaymentOfFiles",
                    EventFilesCart: [],
                    EventFilesCartAmount: 0,
                }
            });

        }
    }
    const fetchUpComingSlots = () => {
        dispatch({ type: "", payload: { Type: "", SlotsPreloader: true } });
        const data = {
            eventId: eventId,
            slotId: eventSlot,
            startDate: state.startDate,
            tz: moment.tz.guess()
        };
        ApiService._fetchUpComingSlots(data)
            .then(res => {
                if (res.data.status == "failed" && res.data.success == false) {
                    toastr["error"](res.data.message);
                    dispatch({
                        type: "",
                        payload: {
                            Type: ""
                            // errorPage: true,
                        }
                    });
                }
                if (res.data.data) {
                    if (res.data.status == 200) {
                        dispatch({
                            type: "",
                            payload: {
                                Type: "",
                                UpComingSlots: res.data.data,
                                SlotsPreloader: false
                            }
                        });
                    }
                }
            })
            .catch(error => {
                Redirect401Login(error);
                dispatch({ type: "", payload: { Type: "", errorPage: true } });
            });
    };
    const getSlotsDetails = () => {
        dispatch({ type: "", payload: { Type: "", SlotsPreloader: true } });
        const data = {
            eventId: eventId,
            slotId: eventSlot,
            startDate: state.startDate,
            tz: moment.tz.guess(),
        };
        ApiService._eventSlotsDetails(data)
            .then(res => {
                if (res.data.status == "failed" && res.data.success == false) {
                    toastr["error"](res.data.message);
                    dispatch({
                        type: "",
                        payload: {
                            Type: ""
                            // errorPage: true,
                        }
                    });
                }
                if (res.data.data) {
                    if (res.data.status == 200) {
                        dispatch({
                            type: "",
                            payload: {
                                Type: "",
                                SlotsDetails: res.data.data,
                                SlotsPreloader: false
                            }
                        });
                    }
                }
            })
            .catch(error => {
                Redirect401Login(error);
                dispatch({ type: "", payload: { Type: "", errorPage: true } });
            });
    };
    const findSlotByDate = e => {
        if (e === "SeeAll") {
            dispatch({ type: "", payload: { Type: "", startDate: "" } });
        } else {
            dispatch({
                type: "",
                payload: {
                    Type: "",
                    startDate: state.CalenderSlots.some(slot => slot.local_start_date === e.dateStr)
                        ? e.dateStr
                        : ""
                }
            });
        }
    };
    const EventNavbarMenuFun = event => {
        dispatch({ type: "", payload: { Type: "", EventNavbarMenu: event } });
    };
    const stripePaymentResponse = (payment, data) => {
        $("#stripe_payment_modal").modal("hide");
        getEventDetails();
        getSlotsDetails();
        fetchUpComingSlots();
    };
    const handlePaymentModal = (eventId, slotId, amount) => {
        dispatch({
            type: "",
            payload: {
                Type: "",
                amount: amount,
                slotId: slotId,
                eventId: eventId
            }
        });
        BookingTimeConflictsCheck(eventId, slotId);
    };

    const BookingTimeConflictsCheck = (eventId, slotId) => {
        ApiService.BookingTimeConflictsChecks({ eventId, slotId }).then((res) => {
            if (res.data.status == "events") {
                dispatch({
                    type: "ConflictsEvents",
                    payload: {
                        Type: "ConflictsEvents",
                        ConflictsEvents: res.data.data,
                    }
                });
                toastr["error"](res.data.message);
                $("#booking-conflicts-events").modal('show');
            } else {
                $("#stripe_payment_modal").modal("show");
            }
        }).catch((error) => {
            Redirect401Login(error);
        })
    }
    const handelFavorite = eventId => {
        let data = {
            eventId: eventId
        };
        ApiService._favorite(data)
            .then(res => {
                if (res.data.status == 200) {
                    toastr["success"](res.data.message);
                    getEventDetails();
                    getSlotsDetails();
                }
                if (res.data.status == "failed") {
                    toastr["error"](res.data.message);
                }
            })
            .catch(error => {
                Redirect401Login(error);
                toastr["error"](error.message);
            });
    };
    const {
        errorPage,
        EventFiles,
        isAuthenticated,
        EventByIdDetail,
        eventPreloader,
        EventNavbarMenu,
        SlotsDetails,
        UpComingSlots,
        SlotsPreloader
    } = state;
    const Values = {
        EventFiles,
        UpComingSlots,
        SlotsDetails,
        errorPage,
        isAuthenticated,
        EventNavbarMenu,
        EventByIdDetail,
        eventPreloader,
        SlotsPreloader
    };
    // if (errorPage) {
    //     return (
    //         <Error404
    //             h2="Oops! Event Not Be Found"
    //             p="Sorry but the Event you are looking for does not exist, have been removed. name changed or is temporarily unavailable"
    //             backTo="Back to home"
    //             link="/home"
    //         />
    //     );
    // }

    if (
        eventId == null ||
        eventId == "" ||
        eventToken == null ||
        eventToken == ""
    ) {
        return <Redirect to="/home" />;
    }
    console.log(state, '');
    return (
        <>
            <Context.Provider value={[state, dispatch]}>
                <section className={`mid-content-sec in-page-content-sec ${Values.EventNavbarMenu === 2 ? "event-time-slots" : ""}`}>
                    <div className="event-details">
                        <div className="container">
                            <div className="e-d-heding">
                                <h1>
                                    {eventPreloader ? (
                                        <Skeleton
                                            width={300}
                                            height={37}
                                            duration={2}
                                        />
                                    ) : (
                                        EventByIdDetail.eventTitle
                                    )}
                                </h1>
                                <div className="ed-top-btns">
                                    <ul className="cmn-ul-list">
                                        {currentUser?.id ==
                                            EventByIdDetail?.eventCreatedUser
                                                ?.id || currentUser == null ? (
                                            ""
                                        ) : (
                                            <>
                                                {" "}
                                                <li>
                                                    {eventPreloader ? (
                                                        <Skeleton
                                                            width={100}
                                                            height={37}
                                                        />
                                                    ) : (
                                                        <a
                                                            className="bdr-btn"
                                                            data-toggle="modal"
                                                            href="#report-event-popup"
                                                            title="Report"
                                                        >
                                                            <i className="av av-report-icon"></i>
                                                        </a>
                                                    )}
                                                </li>
                                                <li>
                                                    {eventPreloader ? (
                                                        <Skeleton
                                                            width={100}
                                                            height={37}
                                                        />
                                                    ) : (
                                                        <a
                                                            className="bdr-btn"
                                                            href="#"
                                                            onClick={() =>
                                                                handelFavorite(
                                                                    EventByIdDetail?.id
                                                                )
                                                            }
                                                            title="Favorite"
                                                        >
                                                            {currentUser?.id ==
                                                                EventByIdDetail
                                                                    ?.favoriteEvents
                                                                    ?.userId ? (
                                                                <i className="av av-favorite-solid-icon active"></i>
                                                            ) : (
                                                                <i className="av av-favorite-line-icon"></i>
                                                            )}
                                                            {/* <span className="badge badge-pill badge-light">
                                                                {eventPreloader
                                                                    ? 0
                                                                    : Values
                                                                          .EventByIdDetail
                                                                          ?.favoriteCount}
                                                            </span> */}
                                                        </a>
                                                    )}
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            {eventPreloader ? (
                                                <Skeleton
                                                    width={100}
                                                    height={37}
                                                />
                                            ) : (
                                                <a
                                                    className="bdr-btn"
                                                    data-toggle="modal"
                                                    href="#share-profile-popup"
                                                    title="Share"
                                                    onClick={() => globalDispatch({ type: "share", payload: { Type: "share", Share: `${window.location.origin}/share/event/${EventByIdDetail?.id}` } })}
                                                >
                                                    <i className="av av-share-icon"></i>{" "}
                                                </a>
                                            )}
                                        </li>
                                        <li>
                                            {eventPreloader ? (
                                                <Skeleton
                                                    width={100}
                                                    height={37}
                                                />
                                            ) : (
                                                EventByIdDetail?.totalReviews > 0 ? <div className="all-reviews-status">
                                                    <strong>{Math.round(EventByIdDetail?.reviewAverage * 10) / 10}</strong>
                                                    <ul className="cmn-ul-list">
                                                        <li><DefaultStars value={parseFloat(EventByIdDetail?.reviewAverage)} /></li>
                                                    </ul>
                                                    <strong>({EventByIdDetail?.totalReviews} {EventByIdDetail?.totalReviews > 1 ? 'Ratings' : 'Rating'})</strong>
                                                </div> : ""
                                            )}
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="e-d-tabs-bx">
                                <div className="av-default-tabs">
                                    <Navbar
                                        values={Values}
                                        currentUser={currentUser}
                                        EventNavbarMenu={EventNavbarMenuFun}
                                    />
                                    <div className="ah-tab-content-wrapper">
                                        <Detail
                                            paymentHandle={handlePaymentModal}
                                            eventSlot={eventSlot}
                                            chatInitiate={chatInitiate}
                                        />
                                        <Calender
                                            values={Values}
                                            currentUser={currentUser}
                                            findSlotByDate={findSlotByDate}
                                            RightCalendarWeekDates={
                                                RightCalendarWeekDates
                                            }
                                            paymentHandle={handlePaymentModal}
                                        />
                                        <Review
                                            values={Values}
                                            currentUser={currentUser}
                                        />
                                        <Download
                                            values={Values}
                                            currentUser={currentUser}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ReportProfilePopup
                    onChange={onChangeReport}
                    comment={globalState?.report.comment}
                    value={globalState?.report.report}
                    handleSubmit={handleReportUserEvent}
                    reportId={EventByIdDetail?.id}
                    type="eventId"
                />
                <StripePaymentModal
                    onChange={stripePaymentResponse}
                    currentUser={currentUser}
                    amount={state.amount}
                    slotId={state.slotId}
                    eventId={state.eventId}
                />
                <StripeEventFilePaymentModal
                    amount={state.EventFilesCartAmount}
                    onChange={onPaymentOfFiles}
                    filesIds={state?.EventFilesCart}
                />
            </Context.Provider>
            <ConflictsEvents id="booking-conflicts-events" events={state.ConflictsEvents} />
        </>
    );
};
export default EventDetailsSection;
