import React, { useState,useContext } from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import {
    millisecondsConvert,
    FindHoursMinutes
} from "../../../../../../utility/UtilityFunctions";
import GlobalContext from "../../../../../../Global/Context/GlobalContext";
const SlotCounter = ({ values, currentUser, paymentHandle }) => {
    const [countDownArray, setCountDownArray] = useState([]);
    const [globalState, globalDispatch]= useContext(GlobalContext);
    const authUser = currentUser;
    if (values?.UpComingSlots) {
        var eventTime = new Date(
            `${moment(
                moment(
                    values?.UpComingSlots?.start_date +
                        "" +
                        values?.UpComingSlots?.start_time,
                    "YYYY-MM-DD HH:mm:ss"
                )
            ).format("MMMM DD, YYYY HH:mm:ss")}`
        ).getTime(); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
        // var countDownDate = eventTime;
        // setInterval(() => {
        //     var now = new Date().getTime();
        //     var timeleft = countDownDate - now;
        //     // code goes here
        //     setCountDownArray(millisecondsConvert(timeleft).split(":"));
        // }, 1000);
    }
console.log(values,'asd')
    return (
        <>
            <div className="meeting-short-info">
                {values.eventPreloader?<SlotsPreloader/>:values.UpComingSlots ? (
                    <>
                        <div className="event-countdown float-right mt-2">
                            {/* <ul className="cmn-ul-list">
                                <li>
                                    <div className="c-d-bx">
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) : (
                                            <>
                                                <span>
                                                    {countDownArray[0] || 0}
                                                </span>
                                                <p>Days</p>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) : (
                                            <>
                                                <span>
                                                    {countDownArray[1] || 0}
                                                </span>
                                                <p>Hour</p>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) : (
                                            <>
                                                <span>
                                                    {countDownArray[2] || 0}
                                                </span>
                                                <p>Min</p>
                                            </>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) : (
                                            <>
                                                <span>
                                                    {countDownArray[3] || 0}
                                                </span>
                                                <p>Sec</p>
                                            </>
                                        )}
                                    </div>
                                </li>
                            </ul> */}
                            <strong
                                className={
                                    moment.utc(
                                        values?.UpComingSlots?.end_date +
                                            "" +
                                            values?.UpComingSlots?.end_time,
                                        "YYYY-MM-DD HH:mm:ss"
                                    ).local() <= moment()
                                        ? "text-danger"
                                        : ""
                                }
                            >
                                {values.eventPreloader ? (
                                    <Skeleton width={140} height={24} />
                                ) : (
                                        moment.utc(
                                            values?.UpComingSlots?.start_date +
                                                "" +
                                                values?.UpComingSlots
                                                    ?.start_time,
                                            "YYYY-MM-DD HH:mm:ss"
                                        ).local().calendar(null, {
                                        lastDay: "[Yesterday] hh:mm A",
                                        sameDay: "[Today] @ hh:mm A",
                                        nextDay: "[Tomorrow] @ hh:mm A",
                                        lastWeek: "[Last Week] DD MMM, YYYY hh:mm A",
                                        nextWeek: "[Next Week] DD MMM, YYYY hh:mm A",
                                        sameElse: "DD MMM YYYY hh:mm A",
                                    })
                                )}
                            </strong>
                        </div>
                        <div className="meeting-space">
                            <h3>
                                {values.eventPreloader ? (
                                    <Skeleton width={140} height={24} />
                                ) : (
                                    "Meeting Specs"
                                )}
                            </h3>
                            <div className="m-s-info">
                                <ul className="cmn-ul-list">
                                    <li>
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<strong>Seats</strong>}
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :values.UpComingSlots
                                                        ?.total_seats- values.UpComingSlots
                                                        ?.booked_seats>0?<p>
                                            <i className="av av-seats-icon"></i>
                                            <span>
                                                {
                                                    values.UpComingSlots
                                                        ?.total_seats- values.UpComingSlots
                                                        ?.booked_seats
                                                }
                                                /
                                                {values.UpComingSlots?.total_seats}{" "}
                                                Seats Left
                                            </span>
                                        </p>:<p>
                                            <i className="av av-seats-icon"></i>
                                            <span>
                                                Seats Full
                                            </span>
                                        </p>}
                                    </li>
                                    <li>
                                       {values.eventPreloader ? (
                                            <Skeleton />
                                        ) : <strong>Duration</strong>}
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<p>
                                            <i className="av av-event-time-icon"></i>
                                            {/* <span>{moment.duration(moment(values.UpComingSlots?.end_date,'YYYY-MM-DD').diff(moment(values.UpComingSlots?.start_date,'YYYY-MM-DD')))} (HH:mm)</span> */}
                                            <span>
                                                {FindHoursMinutes(
                                                    values.UpComingSlots
                                                        .duration
                                                )}{" "}
                                                &nbsp;(HH:mm)
                                            </span>
                                        </p>}
                                    </li>
                                    <li>
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<strong>Cost</strong>}
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<p>
                                            <i className="av av-event-doller-icon"></i>
                                            <span>
                                                {values.UpComingSlots?.cost > 0
                                                    ? `$${values.UpComingSlots?.cost}`
                                                    : "Free"}
                                            </span>
                                        </p>}
                                    </li>
                                    <li>
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<strong>Type</strong>}
                                        {values.eventPreloader ? (
                                            <Skeleton />
                                        ) :<p>
                                            <i className="av av-webinar-icon"></i>
                                            <span>
                                                {
                                                    values.UpComingSlots?.events
                                                        ?.event_type
                                                }
                                            </span>
                                        </p>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="join-event-bx">
                            {values.eventPreloader ? (
                                <Skeleton width={110} height={36} />
                            ) : values?.UpComingSlots?.events?.user_fk_id ===
                              authUser?.id ?(values?.UpComingSlots?.status=="cancelled" || values?.UpComingSlots?.status=="cancelledByHost")?(
                                <button
                                    type="button"
                                    onClick={() =>
                                        paymentHandle(
                                            parseInt(
                                                values?.UpComingSlots?.events
                                                    ?.id
                                            ),
                                            parseInt(values?.UpComingSlots?.id),
                                            parseInt(
                                                values?.UpComingSlots?.cost
                                            )
                                        )
                                    }
                                    className="btn default-btn"
                                >
                                    Book Now
                                </button>
                            ) :(
                                <div
                                    className="btn default-btn booked-btn"
                                    style={{ backgroundColor: "#145388" }}
                                >
                                    Start
                                    <a
                                        href={`/join/?rm=${values?.UpComingSlots?.meeting_room_id}`}
                                        className="btn cmn-bdr-btn"
                                        title="Start Meeting"
                                    >
                                        <i className="av av-quick-start-icon"></i>
                                    </a>
                                </div>
                            ) : values?.UpComingSlots?.event_booking?.length >0 && (values?.UpComingSlots?.event_booking?.find((res)=>res?.status!="cancelled") || values?.UpComingSlots?.event_booking?.find((res)=>res?.status!="cancelledByHost")) && values?.UpComingSlots?.event_booking.find((payM)=>payM?.p_user_id === authUser?.id)
                                  ?(
                                <div className="btn default-btn booked-btn">
                                    Booked
                                    <a
                                        href={`/join/?rm=${values?.UpComingSlots?.meeting_room_id}`}
                                        className="btn cmn-bdr-btn"
                                        title="Booked"
                                    >
                                        <i className="av av-quick-start-icon"></i>
                                    </a>
                                </div>
                            ) : values?.UpComingSlots?.booked_seats === values?.UpComingSlots?.total_seats ? (
                                <button
                                    type="button"
                                    className="btn default-btn"
                                    disabled={true}
                                >
                                    Seats are full
                                </button>
                            ) : moment(
                                  values?.UpComingSlots?.start_date_time,
                                  "YYYY-MM-DD HH:mm"
                              ) <= moment() ? (
                                <button
                                    type="button"
                                    className="btn default-btn"
                                    disabled={true}
                                >
                                Time Expired
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() =>
                                        paymentHandle(
                                            parseInt(
                                                values?.UpComingSlots?.events
                                                    ?.id
                                            ),
                                            parseInt(values?.UpComingSlots?.id),
                                            parseInt(
                                                values?.UpComingSlots?.cost
                                            )
                                        )
                                    }
                                    className="btn default-btn"
                                >
                                    Book Now
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    "No Upcoming Event"
                )}
                <div></div>
            </div>
        </>
    );
};

export default SlotCounter;

const SlotsPreloader=()=>{
    return (
        <div className="meeting-short-info">
                
                    <>
                        <div className="event-countdown">
                            <ul className="cmn-ul-list">
                                <li>
                                    <div className="c-d-bx">
                                        
                                            <Skeleton />
                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        
                                            <Skeleton />
                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        
                                            <Skeleton />
                                        
                                    </div>
                                </li>
                                <li>
                                    <div className="c-d-bx">
                                        
                                            <Skeleton />
                                        
                                    </div>
                                </li>
                            </ul>
                            <strong>
                                    <Skeleton width={140} height={24} />
                                
                            </strong>
                        </div>
                        <div className="meeting-space">
                            <h3>
                                    <Skeleton width={140} height={24} />
                                
                            </h3>
                            <div className="m-s-info">
                                <ul className="cmn-ul-list">
                                    <li>
                                        {/* {values.eventPreloader ? ( */}
                                            <Skeleton />
                                        {/* ) :<strong>Seats</strong>} */}
                                        
                                            <Skeleton />
                                        
                                        
                                    </li>
                                    <li>
                                      
                                            <Skeleton />
                                            <Skeleton />
                                        
                                    </li>
                                    <li>
                                            <Skeleton />

                                            <Skeleton />
                                        
                                    </li>
                                    <li>
                                        
                                            <Skeleton />
                                            <Skeleton />
                                            
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="join-event-bx">
                                <Skeleton width={110} height={36} />
                        </div>
                    </>
                <div></div>
            </div>
    )
}