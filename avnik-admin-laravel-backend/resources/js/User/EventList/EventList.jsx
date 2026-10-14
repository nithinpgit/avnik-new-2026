import Axios from 'axios';
import React, { Component,useState, useContext, useEffect, useReducer, useMemo } from 'react';
import { ApiService } from '../../ApiServer/ApiService';
import { FileManagerPath } from '../../ApiServer/UrlService';
import OnScrollLoader from '../../components/Comman/OnScrollLoader';
import JoinRequestContext from '../../components/screens/CreateEvent/Components/Join/JoinRequestContext/JoinRequestContext';
import JoinRequestPopup from '../../components/screens/CreateEvent/Components/Join/JoinRequestPopup';
import { UserEventsListSkeleton } from '../../components/SkeletonLoading/SkeletonLoading';
import Auth from '../../Routes/Auth';
import { Accordion } from './Components/ListView';
import EventDetailsListContext from './Contexts/EventDetailsListContext';
import reducer from './Reducers/EventDetailsListReducer';
import moment from 'moment';
import 'moment-timezone';
import $ from 'jquery';
import InviteUser from '../../components/screens/CreateEvent/Components/Modal/InviteUser/InviteUser';
import GlobalContext from '../../Global/Context/GlobalContext';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';
const initialState={
    EventDetails:[],
    SearchQuery:'',
    FilterBy:'All',
    CurrentPage:1,
    LastPage:0,
    NextPage:0,
    NextPageUrl:'',
    joinRequestContext: '',
    PreviewsPageUrl:'',
    PreviewsPage:'',
    Preloader:true,
    buttonPreloader:false,
    OnScroll:false,
    eventId:'',
    slotId:'',
    slotTime:'',
}

const EventList=({Active})=>{
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const[globalState,globalDispatch] = useContext(GlobalContext);
    
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
    getBookingEventList();
}, [state.FilterBy, debouncedSearchTerm]);

  var self=this;

  const getBookingEventList=()=>{
    let data={
        filterBy:state.FilterBy,
        searchQuery:state.SearchQuery,
        tz:moment.tz.guess()
    }
    console.log(data,'booking event list data')
    Axios.post('/api/booking',data,{
        headers: {
            'Accept': 'application/json',
            authorization: `Bearer ${Auth.getAccessToken()}`
        }
    }).then((res)=>{
        if(res.data.status==200){
            dispatch({type:'EVENT_DETAILS',payload:res.data.data.data})
            dispatch({type:'PRELOADER',payload:false});
            dispatch({type:'SET_PAGINATION',payload:res.data.data})
            self=res.data.data;
        }else{

        }
    }).catch((error)=>{

    })
   }
    useEffect(() => {
        getBookingEventList();
       $(window).scroll(function() {  
            if($(window).scrollTop() + $(window).height()== $(document).height()) {
                dispatch({type:'ON_SCROLL',payload:true});
            
                 handleChange();
            }
         });
         return ()=>{
            $(window).off('scroll');
            dispatch({type:"Reset",payload:{Type:"Reset", EventDetails:[],
            SearchQuery:'',
            FilterBy:'All',
            CurrentPage:1,
            LastPage:0,
            NextPage:0,
            NextPageUrl:'',
            joinRequestContext: '',
            PreviewsPageUrl:'',
            PreviewsPage:'',
            Preloader:true,
            OnScroll:false}})
         }
    }, []);
const handleChange=()=>{
    if(self?.next_page_url!=null){ 
        let data={
            filterBy:state.FilterBy,
            searchQuery:state.SearchQuery,
        }
        Axios.post(`/api/booking?page=${self?.current_page+1}`,data,{
            headers: {
                'Accept': 'application/json',
                authorization: `Bearer ${Auth.getAccessToken()}`
                }
        }).then((res)=>{

            if(res.data.status==200){
                self=res.data.data,
                handelResponse(res);
            }else{
                dispatch({type:'ON_SCROLL',payload:false});
            
            }
        }).catch((error)=>{
            dispatch({type:'ON_SCROLL',payload:false});

        })
    }else{
        dispatch({type:'ON_SCROLL',payload:false});
    } 
}
const handelResponse=(res)=>{
    dispatch({type:'ON_SCROLL',payload:false});
    dispatch({type:'SET_EVENT_DETAILS',payload:res.data.data.data});
    dispatch({type:'SET_PAGINATION',payload:res.data.data});
}
const JoinRequestPopupHandling=(SlotId)=>{
    $('#join-request-popup').modal({ backdrop: 'static', keyboard: false });
    ApiService._joiningRequestPop(SlotId).then((res) => {
        if (res.data.status == 200) {
            dispatch({type:"JOIN_REQUEST_CONTEXT",payload: res.data.data})
        }
        if (res.data.status == 'failed') {
            toastr.error(res.data.message)
            $('#join-request-popup').modal('hide');
        }
    }).catch((error) => {
        $('#join-request-popup').modal('hide');
        toastr.error('!oops server error');
        console.log(error);

    })
}
const cancelBookingHandleSubmit = (e) => {
    e.preventDefault();
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:true}});
    let data={
        eventSlotId:state?.slotId,
        tz:moment.tz.guess()
    }
    ApiService._cancelBooking(data).then((res) => {
        dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});
        getBookingEventList();
        if (res.data.status == 200) {
            toastr.error(res.data.message)
            getBookingEventList()
        }
        if (res.data.status == 'failed') {
            toastr.error(res.data.message)
        }
        $('#CancelEventBookingModal').modal('hide');
    }).catch((error) => {
        $('#CancelEventBookingModal').modal('hide');

        toastr.error('!oops server error');
        console.log(error);
        dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

    })
}
const cancelBooking=(eventId,slotId,startDateTime)=>{
    if(eventId>0&&slotId>0){
    globalDispatch({type:"eventCancel",payload:{Type:"eventCancel",eventCancelId:eventId,eventCancelSlotId:slotId}});
    $("#CancelFollowingEventModal").modal('show');     
    }else{
        $('#CancelEventBookingModal').modal('show');
        dispatch({type:"CANCEL_EVENT_ADD_SLOT",payload:{Type:"CANCEL_EVENT_ADD_SLOT",slotId:slotId,slotTime:startDateTime}})
    }   
}
const removeBooking=(eventId,slotId)=>{
    if(eventId>0&&slotId>0){
    globalDispatch({type:"eventCancel",payload:{Type:"eventCancel",eventCancelId:eventId,eventCancelSlotId:slotId}});
    $("#CancelFollowingEventModal").modal('show'); 

    }else{
    // if(confirm('Are you sure you want to Remove?')){
        console.log(eventId,slotId,'delete-booking-confirm-popup')
        dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:true}});
        let data={
            eventSlotId:slotId,
            tz:moment.tz.guess()
        }
        ApiService._removeBooking(data).then((res) => {
            getBookingEventList();
            $('#delete-booking-confirm-popup').modal('hide');

            if (res.data.status == 200) {
                toastr.error(res.data.message)
                getBookingEventList()
            }
            if (res.data.status == 'failed') {
                toastr.error(res.data.message)
            }
            dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});
        }).catch((error) => {
            toastr.error('!oops server error');
            console.log(error);
            dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});
    
        })
    // }
    }
    
}
const handleFilterSubmit=(e)=>{
    e.preventDefault();
    getBookingEventList();
}
    const data=[state, dispatch];
        return (
            <>
            <EventDetailsListContext.Provider value={data}>
                <div className="ah-tab-content" data-ah-tab-active={Active}>
                                <div className="events-content-sec">
                                    <div className="cmn-rit-top-heading-sec message-top-bx">
                                    <div className="float-left">
                                        
                                    </div>
                                    <form onSubmit={handleFilterSubmit}>                    
                                        <div className="inbox-rit-search">
                                            <div className="flex-container">
                                                <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                                    <select className="form-control custom-select-bx" onChange={(e)=>dispatch({type:"SEARCH_QUERY_NEW",payload:{Type:"SEARCH_QUERY_NEW",FilterBy:e.target.value}})} defaultValue={state?.FilterBy}>
                                                            <option value="All">All</option>
                                                            <option value="Upcoming">Upcoming</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            {/* <option value="Ongoing">Ongoing</option> */}
                                                    </select>
                                                </div>
                                                <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                                    <div className="cmn-search-bx">
                                                        <input className="form-control" type="text" onChange={(e)=>handleSearchChange(e.target.value)}  placeholder="Search" aria-label="Search" value={state?.SearchQuery} />
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
                                                    <div className="cell event-date-time-editable">Event Date</div>
                                                    <div className="cell event-amount-editable">Cost</div>
                                                    <div className="cell event-amount-editable">Privacy</div>
                                                    <div className="cell event-duration-editable">Duration</div>
                                                    <div className="cell event-hosted-by-editable">Hosted By</div>
                                                    <div className="cell event-status-editable">Status</div>
                                                    <div className="cell event-message-editable text-right">Option</div>
                                                </div>
                                                {state?.Preloader?<UserEventsListSkeleton count={10}/>:state?.EventDetails.length>0?state?.EventDetails.map((res,i)=>
                                                        <>
                                                         <Accordion key={i}  response={res||[]} preloader={state?.buttonPreloader} handleViewBooking={JoinRequestPopupHandling} removeBooking={removeBooking} cancelBooking={cancelBooking}/>        
                                                        </>
                                                ):<div className="text-center mt-5">No Bookings yet</div>
                                                }
                                               { state?.OnScroll?<UserEventsListSkeleton count={10}/>:''}
                                            </div>
                                        </div>
                                    </div>
                                    <OnScrollLoader active={state?.OnScroll}/>
                                </div>
                            </div>
                </EventDetailsListContext.Provider>
                <JoinRequestContext.Provider value={state.joinRequestContext}>
                        <JoinRequestPopup JoinUserRequest={JoinRequestPopupHandling} />
                </JoinRequestContext.Provider>
                <InviteUser value={state} />
                <CancelEventBookingModal 
                handleSubmit={cancelBookingHandleSubmit}
                preloader={state?.buttonPreloader}
                slotTime={state?.slotTime}
                />
                {/* <QuickReply /> */}
            </>
        );
    }
export default EventList;
const CancelEventBookingModal = (props) => {
    var initialTime = 0; 
    const [seconds, setSeconds] = useState(initialTime);
    useEffect(() => {
        const endTime = moment(props.slotTime).add(1, 'minute').local();
        const now = moment();
        const remainingSeconds = Math.max(0, moment.duration(endTime.diff(now)).asSeconds());
        const truncatedTrunc = Math.trunc(Math.floor(remainingSeconds));
        const truncatedParseInt = parseInt(truncatedTrunc);
        setSeconds(truncatedParseInt);
        const intervalId = setInterval(() => {
          setSeconds((prev) => Math.max(0, prev - 1)); // Decrease countdown every second
        }, 1000);
        return () => clearInterval(intervalId); // Clear interval on unmount or when countdown ends
      }, [props.slotTime]);
    return (
        <>
            <div
                className="modal fade default-popup confirm-message-popup"
                id="CancelEventBookingModal"
                tabIndex="-1"
                role="dialog"
                ariaLabelledBy="exampleModalLabel"
                ariaHidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={props.handleSubmit}>
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <i className="av av-close-icon"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="message-m-box">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 text-center">
                                            <h6> Are you sure you wish to cancel? </h6>
                                            <span className={`${seconds>0?'':'d-none'}`}>Time remaining to get full refund {seconds} seconds</span>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="no-yes-btns">
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <button
                                                type="button"
                                                className="btn default-btn"
                                                // disabled={value?false:true}
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                        >
                                                No
                                            </button>
                                            </li>
                                        <li>
                                            <button
                                                type="submit"
                                                className="btn default-btn"
                                                // disabled={value?false:true}
                                            >
                                                {props?.preloader?<span className='button-pre-loading'>wait...</span>:"Yes"}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};