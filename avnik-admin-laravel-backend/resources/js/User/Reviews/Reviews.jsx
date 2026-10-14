import React, { Component, useContext, useEffect, useReducer, useState } from 'react';
import StarRating from './Components/StarRating/StarRating';
import { FileManagerPath } from '../../ApiServer/UrlService'
import reducer, { initialState } from './ReviewsReducer/ReviewsReducer';
import Axios from 'axios';
import Auth from '../../Routes/Auth';
import DefaultStars from './Components/DefaultStars/DefaultStars';
import SendReview from './Components/SendReviews/SendReview';
import moment from 'moment';
import 'moment-timezone';
import ReviewsContext from './ReviewsContext/ReviewsContext';
import ReplyReviews from './Components/ReplyReviews/ReplyReviews';
import CurrentUser from '../../components/UserContext/CurrentUserContext/CurrentUser';
import { ApiService } from '../../ApiServer/ApiService';
import OnScrollLoader from '../../components/Comman/OnScrollLoader';
import { UserReviewsPreloader } from '../../components/SkeletonLoading/SkeletonLoading';
import GlobalContext from '../../Global/Context/GlobalContext';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';

const Reviews = ({ Active, showHideDiv }) => {

    const currentUser = useContext(CurrentUser);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [globalState,globalDispatch]=useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    var self = this;
    useEffect(() => {

    loadReviews();
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                handleScroll();
            }
        });
    }, [state?.random])

    useEffect(() => {
        loadReviews();
    }, [state?.filterBy, debouncedSearchTerm])


    function loadReviews() {
        let data = {
            currentUserId: currentUser?.id,
            searchQuery: debouncedSearchTerm,
            filterBy: state?.filterBy,
            tz:moment.tz.guess(),
        }
        ApiService._fetchUserDashboardReviews(data).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: 'GET_REVIEWS_LIST', payload: res.data.data.data });
                dispatch({ type: 'GET_PAGINATION', payload: res.data.data })
                dispatch({ type:'SET_PRELOADER', payload: false})
                self = res.data.data;
            } else {

            }

        }).catch((error) => {

        })
    }
    function handleScroll() {
        if (self?.next_page_url != null) {
            dispatch({ type: 'ON_SCROLL', payload: true });
            let data = {
                currentUserId: currentUser?.id,
                searchQuery: state?.searchQuery,
                filterBy: state?.filterBy,
                nextPage: self?.current_page + 1,
            }
            ApiService._fetchUserDashboardReviews(data).then((res) => {
                if (res.data.status == 200) {
                    dispatch({ type: 'GET_ON_SCROLL_REVIEWS_LIST', payload: res.data.data.data });
                    dispatch({ type: 'GET_PAGINATION', payload: res.data.data });
                    dispatch({ type: 'ON_SCROLL', payload: false });
                    self = res.data.data;
                } else {
                    dispatch({ type: 'ON_SCROLL', payload: false });
                }
            }).catch((error) => {
                dispatch({ type: 'ON_SCROLL', payload: false });
            })
        }
    }
   const  handleSearchSubmit=(e)=>{
    e.preventDefault();
   }

   const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
        dispatch({type:"SEARCH_QUERY_TEXT",payload:{Type:"SEARCH_QUERY_TEXT",searchQuery:searchValue}});
   }
    const ReviewValue = [state, dispatch];
    return (
        <>
            <ReviewsContext.Provider value={ReviewValue}>
                <div className="ah-tab-content" data-ah-tab-active={Active}>
                    <div className="reviews-content-sec">
                        <div className="cmn-rit-top-heading-sec message-top-bx">
                            <div className="float-left">

                            </div>
                            <form onSubmit={handleSearchSubmit}>
                                <div className="inbox-rit-search">
                                    <div className="flex-container">
                                        <div style={{ flexGrow: '5' }} className="flex-select-bx">
                                            <select className="form-control custom-select-bx" onChange={(e)=>dispatch({type:"SEARCH_QUERY_NEW",payload:{Type:"SEARCH_QUERY_NEW",filterBy:e.target.value}})} defaultValue={state?.filterBy} >
                                                <option value="All">All</option>
                                                <option value="Received">Received</option>
                                                <option value="Given">Given</option>
                                            </select>
                                        </div>
                                        <div style={{ flexGrow: '5' }} className="flex-input-bx">
                                            <div className="cmn-search-bx">
                                                <input className="form-control" type="text" placeholder="Search" onChange={(e)=>handleSearchChange(e.target.value)} value={searchTerm} aria-label="Search" />
                                                <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="message-list review-events-list">
                            <div className="u-p-files-list">
                                <div className="custom-table">
                                    <div className="c-table-row table-header">
                                        <div className="cell review-details-editable">Title</div>
                                        <div className="cell review-date-time-editable">Event Date</div>
                                        <div className="cell review-amount-editable">Amount</div>
                                        <div className="cell review-duration-editable">Duration</div>
                                        <div className="cell review-hosted-by-editable">Hosted By</div>
                                        <div className="cell review-write-editable text-right">Write Review</div>
                                    </div>
                                    {state.preloader?<UserReviewsPreloader/>:state?.responseData ? state?.responseData.map((res) =>
                                        res.reviews?.length > 0 ?
                                            <ReplyReviews key={res.id} currentUserId={currentUser?.id} reviews={res?.reviews} showHideDiv={showHideDiv} slotId={res?.id} hostId={res?.events?.event_create_user.id} eventDuration={res?.duration} eventCost={res.events.cost > 0 ? `$ ${res.events.cost}` : 'Free'} hostUserName={res?.events?.event_create_user.username} hostName={res?.events?.event_create_user.name} eventId={res.events?.id} eventToken={res.events?.remember_token} eventFile={JSON.parse(res?.events?.event_files)} eventTitle={res?.events?.event_title} eventDate={moment.utc(moment(res?.start_date_time, 'YYYY-MM-DD HH:mm:ss')).local().format('D MMM YYYY h:mm A')} /> :
                                            <SendReview key={res.id} currentUserId={currentUser?.id} showHideDiv={showHideDiv} slotId={res?.id} eventDuration={res?.duration} eventCost={res.events.cost > 0 ? `$ ${res.events.cost}` : 'Free'} hostId={res?.events?.event_create_user.id} hostUserName={res?.events?.event_create_user.username} hostName={res?.events?.event_create_user.name} eventId={res.events?.id} eventToken={res.events?.remember_token} eventFile={JSON.parse(res?.events?.event_files)} eventTitle={res?.events?.event_title} eventDate={moment.utc(res?.start_date_time, 'YYYY-MM-DD HH:mm:ss').local().format('D MMM YYYY h:mm A')} />
                                    ) : ''
                                    }
                                    {state.onScroll?<UserReviewsPreloader/>:''}
                                </div>
                            </div>
                        </div>
                        <OnScrollLoader active={state?.onScroll}/>
                    </div>
                </div>
            </ReviewsContext.Provider>
        </>
    );
}

export default Reviews;
