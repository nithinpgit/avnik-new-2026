import React, {
    useContext,
} from "react";
import ChoseEventCalendar from "../Components/Calendar/ChoseEventCalendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from 'moment'
import UpComingEvents from "../Components/UpComingEvents/UpComingEvents";
import { Link} from "react-router-dom";
import GlobalContext from "../../../../Global/Context/GlobalContext";
import CreateEventContext from "./CreateEventContext/CreateEventContext";
import { CalendarPreloader } from "../../../SkeletonLoading/SkeletonLoading";

const CreateEventPageSection = () => {
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const [state,dispatch,resetFormState,onChangeCalendar,onDragSelect,removeSetImage,removeSetFiles,MyEventsList,CancelParticipantBooking,JoinRequestPopupHandling,handleFormSubmit,CalenderDots,onChangeWeeklyCalendar] = useContext(CreateEventContext);
    console.log("events create event page section");
    return (
        <>
            {state?.Preloader?<CalendarPreloader/>:<section className="mid-content-sec in-page-content-sec events-calender">
                <div className="calender-events-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main-calender-event-view">
                                    <div className="white-content-bx">
                                        <div className="event-calender-bx">
                                            <figure>
                                                <ChoseEventCalendar
                                                    JoinRequestHandling={
                                                        JoinRequestPopupHandling
                                                    }
                                                    cancelParticipantBooking={CancelParticipantBooking}
                                                    onDragSelect={onDragSelect}
                                                />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="month-wise-calendar">
                                    <div className="white-content-bx">
                                        <figure>
                                            <Calendar
                                                tileContent={CalenderDots}
                                                showNavigation={true}
                                                onChange={onChangeCalendar}
                                                onActiveStartDateChange={(e)=>onChangeCalendar(e.activeStartDate)}
                                                value={
                                                    state.SelectedCalendarDate
                                                }
                                                defaultActiveStartDate={
                                                    state.SelectedCalendarDate
                                                }
                                            />
                                        </figure>
                                        <div className="dot-instructions-point">
                                            <ul className="cmn-ul-list">
                                                <li>
                                                    <div className="d-i-p-bx">
                                                        <i>&nbsp;</i>
                                                        <span>I am host</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-i-p-bx d-i-green">
                                                        <i>&nbsp;</i>
                                                        <span>
                                                            I am participant
                                                        </span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="d-i-p-bx d-i-blue">
                                                        <i>&nbsp;</i>
                                                        <span>Both</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="upcoming-events">
                                    <div className="white-content-bx">
                                        <div className="tab-heading">
                                            <h2 className="float-left">
                                                Bookings
                                            </h2>
                                            <Link
                                                to="/bookings"
                                                className="link-btn float-right"
                                            >
                                                See all...
                                            </Link>
                                        </div>

                                        <UpComingEvents
                                            events={globalState.MyUpComing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            
        </>
    );
};

export default React.memo(CreateEventPageSection);
