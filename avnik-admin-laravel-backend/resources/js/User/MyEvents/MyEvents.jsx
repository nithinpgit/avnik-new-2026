import React, { useReducer, useEffect, useContext, useState } from 'react'
import { UserEventsListSkeleton } from '../../components/SkeletonLoading/SkeletonLoading'
import OnScrollLoader from '../../components/Comman/OnScrollLoader';
import reducer from '../EventList/Reducers/EventDetailsListReducer';
import { Accordion } from '../EventList/Components/ListView';
import { ApiService } from '../../ApiServer/ApiService';
import { Link } from 'react-router-dom';
import GlobalContext from '../../Global/Context/GlobalContext';
import {FileManagerPath, assetUrl} from '../../ApiServer/UrlService';
import moment from 'moment';
import 'moment-timezone';
import CurrentUser from '../../components/UserContext/CurrentUserContext/CurrentUser';
import { Edit } from 'react-feather';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';

const initialState = {
    EventDetails: [],
    SearchQuery: '',
    FilterBy: 'All',
    CurrentPage: 1,
    LastPage: 0,
    NextPage: 0,
    NextPageUrl: '',
    joinRequestContext: '',
    PreviewsPageUrl: '',
    PreviewsPage: '',
    Preloader: true,
    OnScroll: false,
}
export default function MyEvents({ Active }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [globalState, globalDispatch] = useContext(GlobalContext);

    // Inside your component
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    // 1. Immediate UI Update
    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue); // Local state for the input field
        dispatch({
            type: "SEARCH_QUERY_TEXT",
            payload: { Type: "SEARCH_QUERY_TEXT", SearchQuery: searchValue }
        });
    };

    // 2. Delayed API Trigger
    useEffect(() => {
        getMyEvent();
    }, [state.FilterBy, debouncedSearchTerm]);

    useEffect(() => {
        getMyEvent();
        return () => {
            dispatch({ type: "Reset", payload: { Type: "Reset", EventDetails: [] } });
        };
    }, [])
    const getMyEvent = () => {
        ApiService._MyEvents({ tz: moment.tz.guess(), searchQuery: state?.SearchQuery, filterBy: state?.FilterBy }).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'EVENT_DETAILS', payload: res.data.data.data })
                dispatch({ type: 'PRELOADER', payload: false });
                dispatch({ type: 'SET_PAGINATION', payload: res.data.data })
            }
        }).catch((error) => {
            console.log(error);
        })

    }
    useEffect(() => {
        getMyEvent()
    }, [globalState?.responseEventId])
    const handelFilterSubmit = (e) => {
        e.preventDefault();
        ApiService._MyEvents({ tz: moment.tz.guess(), searchQuery: state?.SearchQuery, filterBy: state?.FilterBy }).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'EVENT_DETAILS', payload: res.data.data.data })
                dispatch({ type: 'PRELOADER', payload: false });
                dispatch({ type: 'SET_PAGINATION', payload: res.data.data })
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className="ah-tab-content" data-ah-tab-active={Active}>
            <div className="events-content-sec">
                <div className="cmn-rit-top-heading-sec message-top-bx">
                    <div className="float-left">

                    </div>
                    <form onSubmit={handelFilterSubmit}>
                        <div className="inbox-rit-search">
                            <div className="flex-container">
                                <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                    <select className="form-control custom-select-bx" onChange={(e) => dispatch({ type: "SEARCH_QUERY_NEW", payload: { Type: "SEARCH_QUERY_NEW", FilterBy: e.target.value } })} defaultValue={state?.FilterBy}>
                                        <option value="All">All</option>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        {/* <option value="Ongoing">Ongoing</option> */}
                                    </select>
                                </div>
                                <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                    <div className="cmn-search-bx">
                                        <input className="form-control" type="text" onChange={(e) => handleSearchChange(e.target.value)} value={state?.SearchQuery} placeholder="Search" aria-label="Search" />
                                        <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
                <div className="message-list group-message-list events-group-table">
                    <div className="u-p-files-list">
                        <div className="custom-table">
                            <div className="c-table-row table-header">
                                <div className="cell event-details-editable">Event Name</div>
                                <div className="cell event-type-editable">Event Type</div>
                                <div className="cell event-date-time-editable">Created On</div>
                                {/* <div className="cell event-amount-editable">Cost</div>
                                                    <div className="cell event-duration-editable">Duration</div> */}
                                <div className="cell event-hosted-by-editable">Next slot</div>
                                <div className="cell event-hosted-by-editable">Cost</div>
                                <div className="cell event-hosted-by-editable">Privacy</div>
                                {/* <div className="cell event-status-editable">Status</div> */}
                                <div className="cell event-message-editable text-right">Option</div>
                            </div>
                            {state?.Preloader ? <UserEventsListSkeleton count={10} /> : state?.EventDetails.length > 0 ? state?.EventDetails.map((res, i) =>
                                <>
                                    <MyEventList key={i} getMyEvent={getMyEvent} response={res || []} />
                                </>
                            ) : <div className="text-center mt-5">You have no events. <a href="/create-event">Go to scheduler </a> to create an event.</div>
                            }
                            {state?.OnScroll ? <UserEventsListSkeleton count={10} /> : ''}
                        </div>
                    </div>
                </div>
                <OnScrollLoader active={state?.OnScroll} />
            </div>
        </div>
    )
}

const MyEventList = ({ response }) => {
    var onlyImage = '';
    var EventDates = '';
    const currentUser = useContext(CurrentUser)
    const eventImage = JSON.parse(response?.event_files);
    onlyImage = eventImage[0].file_url;
    const [globalState, globalDispatch] = useContext(GlobalContext);
    const addSlots = (eventId) => {

        globalDispatch({
            type: "ADD_SLOTS",
            payload: {
                Type: "ADD_SLOTS",
                AddSlotEventId: eventId,
            },
        });
        $("#AddSlotsModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    }
    const disableEvent = (eventId, slotId) => {
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
    const editEvent = (eventId, slotId) => {
        globalDispatch({
            type: "EditEvent",
            payload: {
                Type: "EditEvent",
                EventEditId: eventId,
                eventSlotEditId: slotId,
            },
        });
        $("#EditFollowingEventModal").modal(
            { backdrop: "static", keyboard: false },
            "show"
        );
    };
    const deleteEvent = (eventId, slotId) => {
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
    return (
        <>
            <div className="c-table-row">
                <div className="cell event-details-editable" data-title="Event Name">
                    <div className="message-user-bx">

                        <Link to={`/event?token=${response?.remember_token}&event=${response?.id}`}>
                            <figure className="cmn-profile-pic">
                                <img src={assetUrl(onlyImage)} alt={response?.event_type} />
                            </figure>
                            <span>{response?.event_title}</span>
                        </Link>
                    </div>
                </div>
                {response?.extended?.length > 0 ?
                    <div className="cell event-more-editable" data-title="Extend">
                        <div className="event-more-btn">
                            <a href="#0" value="Show/Hide" onClick={() => showHideDiv(`event-more${response?.event_slot_id}`)}><i className="av av-extended-duration-more-icon"></i></a>
                        </div>
                    </div> : ''}
                <div className="cell event-type-editable" data-title="Event Type">
                    <div className="c-table-text">{response?.event_type}</div>
                </div>
                <div className="cell event-date-time-editable" data-title="Event Date">
                    {/* <div className="message-short-text">{EventDates ? moment(EventDates).format('D MMM YYYY h:mm A') : ''} </div> */}
                    <div className="message-short-text">{`${moment.utc(response.created_at, 'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY h:m A')}`} </div>
                </div>
                {/* <div className="cell event-amount-editable" data-title="Amount">
                    <div className="c-table-text">{response?.cost > 0 ? '$ ' + response?.cost : 'Free'}</div>
                </div>
                <div className="cell event-duration-editable" data-title="Duration">

                    <div className="c-table-text">{convertMinutes(response?.duration)}</div>
                </div> */}
                <div className="cell event-hosted-by-editable" data-title="Next Time Slot">
                    <div className="message-short-text">{response?.event_time_slot?.length > 0 ? response?.event_time_slot[0]?.start_date_time ? moment.utc(response?.event_time_slot[0]?.start_date_time, 'YYYY-MM-DD HH:mm').local().format('D MMM YYYY h:m A') : 'N/A' : "N/A"} </div>
                </div>
                <div className="cell event-hosted-by-editable" data-title="Cost">
                    <div className="c-table-text">{response?.event_time_slot?.length > 0 ? response?.event_time_slot[0]?.cost > 0 ? `$${response?.event_time_slot[0]?.cost}` : 'Free' : 'N/A'} </div>
                </div>
                <div className="cell event-hosted-by-editable" data-title="Privacy">
                    <div className="c-table-text">{response?.event_visible ? 'Public' : 'Private'} </div>
                </div>

                {/* <div className="cell event-status-editable" data-title="Status">
                    <div className="complite-cancel-status">
                     {checkStatusRender(response?.end_date_time,response?.start_date_time,response?.status)}
                     </div>
                </div> */}

                <div className="cell event-message-editable" data-title="Message">
                    <div className="message-delete-btn">

                        <div className="r-m-t-bx my-account-menu table-dd">
                            <div className="btn-group">
                                <button type="button" className="btn dropdown-toggle dots-btn" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                    <i className="av av-dots-icon"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg-right">
                                    <ul>
                                        <li><a href="#" className="dropdown-item" onClick={() => editEvent(
                                            response?.id,
                                            response?.event_time_slot[0]?.id
                                        )}><Edit size={14} /> &nbsp; Edit Event</a></li>
                                        <li><a href="#" className="dropdown-item" onClick={() =>
                                            disableEvent(
                                                response?.id,
                                                response?.event_time_slot[0]?.id
                                            )
                                        }><i className="av av-disable-icon"></i> Disabled</a></li>

                                        <li><a href="#" onClick={() => deleteEvent(response?.id, response?.event_time_slot[0]?.id)} className="dropdown-item" data-toggle="modal" data-target="#alert-delete-message"><i className="av av-delete-icon"></i> Delete</a></li>

                                        <li>
                                            <a data-toggle="modal"
                                                href="#share-profile-popup"
                                                onClick={() => globalDispatch({ type: "share", payload: { Type: "share", Share: window.location.origin + `/share/event/${response?.id}` } })}
                                                title="Share"
                                                className="dropdown-item" ><i className="av av-share-icon"></i> Share
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="modal"
                                                href="#"
                                                onClick={() => addSlots(response?.id)}
                                                title="Share"
                                                className="dropdown-item" ><i className="av av-extended-duration-more-icon"></i> Add Slots
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}