import React, { useContext } from 'react'
import moment from 'moment';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventSlotList from './EventSlotList';
import UserProfileContext from '../UserProfileContext/UserProfileContext';
export default function ProfileScheduler(props) {
    const [state,dispatch] = useContext(UserProfileContext);
    const eventFilterByDate = (event) => {
        dispatch({type:"StartDate",payload:{Type:"StartDate",StartDate:moment(event.dateStr, 'YYYY-MM-DD').format('YYYY-MM-DD')}});
    }

    var eventsList = [];
    state.showEventsProfileCalenders?.map(res=>{eventsList.push({
        display: "background",
        start:res.start_date,
    })
    }
    )
    return (
        <div className="ah-tab-content" data-ah-tab-active={props.active}>
            <div className="e-d-calender">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-7">
                        <div className="left-e-cal">
                            <div className="event-calender-bx">
                                <FullCalendar

                                    initialView='dayGridMonth'
                                    // initialView='dayGridMonth'

                                    events={eventsList}

                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                                    allDaySlot={false}
                                    // views={{
                                    //     dayGridMonth: {
                                    //         titleFormat: { year: 'numeric', month: 'long', day: '2-digit' }
                                    //     }
                                    // }}
                                    dateClick={eventFilterByDate}

                                    // dayHeaderContent={(args) => moment(args.date).format('ddd Do')}
                                    // customButtons={{
                                    //     myCustomButton: {
                                    //         text: <>
                                    //             <div className="legend-dd" style={{ margin: '-12px' }}>
                                    //                 <div className="l-g-bx dot-dd-bx">
                                    //                     <div className="dropdown dd-right-side">
                                    //                         <a className="link-btn dropdown-toggle" href="#" id="my-account-dd" data-toggle="dropdown">Legend <i className="lb lb-dropdown-icon"></i></a>
                                    //                         <div className="dropdown-menu" aria-labelledby="my-account-dd">
                                    //                             <div className="side-nav-bx">
                                    //                                 <ul>
                                    //                                     <li><a href="#"><em className="color-bx booked-color"></em>Booked By Me</a></li>
                                    //                                     <li><a href="#"><em className="color-bx bot-booked-color"></em>Not Yet Booked (Webinar/Class/Group)</a></li>
                                    //                                     <li><a href="#"><em className="color-bx ava-appointment-color"></em>Availability For Appointment</a></li>
                                    //                                     <li><a href="#"><em className="color-bx blocked-time-color"></em>Blocked Time</a></li>
                                    //                                     <li><a href="#"><em className="color-bx somebody-booed-color"></em>Somebody Booked Me</a></li>
                                    //                                 </ul>
                                    //                             </div>
                                    //                         </div>
                                    //                     </div>
                                    //                 </div>
                                    //             </div>
                                    //         </>
                                    //     },
                                    // }}
                                    datesSet={props.RightCalendarWeekDates}
                                    headerToolbar={{
                                        start: 'title', // will normally be on the left. if RTL, will be on the right
                                        // center: 'myCustomButton',
                                        end: 'today prev,next', // will normally be on the right. if RTL, will be on the left
                                    }}
                                    nowIndicator={true}
                                    selectable={true}
                                    timeZone="local"
                                    now={moment().format('YYYY-MM-DD')}

                                />
                            </div>
                        </div>
                    </div>
                    <EventSlotList paymentHandle={props.paymentHandle} />
                </div>
            </div>
        </div>
    )
}
