import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../../../ApiServer/ApiService';
import {DefaultProfilePicture, FileManagerPath, assetUrl} from '../../../../ApiServer/UrlService';
import Auth from '../../../../Routes/Auth';
import { convertMinutes, showHideDiv, timeConverter } from '../../../../utility/UtilityFunctions';
import ReviewsContext from '../../ReviewsContext/ReviewsContext';
import DefaultStars from '../DefaultStars/DefaultStars';
import StarRating from '../StarRating/StarRating';
import GlobalContext from '../../../../Global/Context/GlobalContext';

const ReplyReviews = ({ currentUserId, hostId, showHideDiv, slotId, eventId, reviews, eventToken, eventTitle, eventFile, eventDate, hostName, hostUserName, eventDuration, eventCost }) => {

    const [state, dispatch] = useContext(ReviewsContext)
    const [globalState, globalDispatch] =useContext(GlobalContext);
    var ReviewDuration = '00 Hour 00 Minute';
    let Hour = eventDuration.split(':')[0] > 1 ? eventDuration.split(':')[0] + ' Hours ' : eventDuration.split(':')[0] + ' Hour ';
    let Minutes = eventDuration.split(':')[1] > 1 ? eventDuration.split(':')[1] + ` Minutes` : eventDuration.split(':')[1] + ` Minute`;
    ReviewDuration = Hour + Minutes;
    const Rating = parseFloat(reviews[0].rating);

    const replyToUser = (e) => {
        e.preventDefault();
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:true}});

        let data = {
            eventId: eventId,
            slotId: slotId,
            hostId: hostId,
            userId: state.receiverId,
            comment: state.comment,
        }
        ApiService._addAndReplyReviews(data).then((res) => {
            if (res.status == 200) {
                dispatch({ type: 'RANDOM' });
                dispatch({ type: 'INITIAL_SEND_REVIEW_STATE' });
            }
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

            console.log(res)
        }).catch((error) => {
            console.log(error);
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

        })
    }
    const editReview = (id) => {

       if(`red-mode-`+id===state.EditModeId){
           dispatch({type:'EDIT_MODE_ID',payload:``})
       }else{
        dispatch({type:'EDIT_MODE_ID',payload:`red-mode-${id}`})
       } 
       
        
    }
    const handleUpdate = (e) => {
        e.preventDefault();
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:true}});

        let data={
            reviewId:state.reviewId,
            comment:state.comment,
            rating:state.rating,
            eventId:state.eventId,
            slotId:state.slotId,
        }
        ApiService._updateReviews(data).then(async(res)=>{
                dispatch({type:'RANDOM'})
                dispatch({type:'INITIAL_STATE'})   
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

        }).catch((error)=>{
            dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

        })
    }
    return (
        <>

            <div class="c-table-row cmn-new-toggle">
                <div class="cell review-details-editable" data-title="Event Details">
                    <div class="message-user-bx">
                        <Link to={`/event?token=${eventToken}&event=${eventId}`}>
                            <figure className="cmn-profile-pic event-img">
                                <img src={assetUrl(eventFile[0].file_url)} alt={eventTitle} />
                            </figure>
                            <span>{eventTitle}</span>
                        </Link>
                    </div>
                </div>

                <div class="cell review-date-time-editable" data-title="Event Date">
                    <div class="c-table-text">{eventDate}</div>
                </div>
                <div class="cell review-amount-editable" data-title="Amount">
                    <div class="c-table-text">{eventCost}</div>
                </div>
                <div class="cell review-duration-editable" data-title="Rating">
                    <div class="c-table-text">
                        {convertMinutes(eventDuration)}
                    </div>
                </div>
                <div class="cell review-hosted-by-editable" data-title="Hosted By">
                    <div className="c-table-text"><Link to={`/profile/${hostUserName}`}>{hostName}</Link></div>
                </div>
                <div className="cell review-write-editable text-right t-r-c-bx" data-title="Write Review">
                    <div className="c-table-text text-right">
                        <a href={void (0)} value="Show/Hide" className="t-add-dd-c" onClick={() => showHideDiv(`reply-more${slotId}`)}><i className="av av-down-solid-arrow-icon"></i></a>
                        {/* <button type="button" className="btn default-btn" value="Show/Hide" onClick={() => showHideDiv(`reply-more${slotId}`)}>View Reply</button> */}
                    </div>
                </div>
                <div id={`reply-more${slotId}`} className="events-users-show-bx" style={{ display: 'none' }}>
                    {reviews.map((reviewRes) =>
                        <div key={reviewRes?.id} id={`post-review-box${reviewRes.id}`} class="write-review-content-bx new-toggle-dropdown post-review-box">
                            <div class="review-bx">
                                <figure class="n-m-pic">
                                    <img src={reviewRes?.sender?.user_profile?.profile_picture ? FileManagerPath + `${reviewRes?.sender?.user_profile?.profile_picture}` : DefaultProfilePicture} alt="" />
                                </figure>
                                <div class="rit-m-bx">
                                    <div class="review-parent-bx">
                                        <div class="user-name-rating">
                                            <strong>{reviewRes?.user_id==currentUserId?'Me':reviewRes?.sender?.name}</strong>
                                            <span class="rating">
                                                <DefaultStars value={Rating} />
                                            </span>
                                            {reviewRes?.sender?.id == currentUserId ?
                                                <button type="button" class="btn link-btn review-edit-btn" onClick={() => { editReview(reviewRes.id), dispatch({ type: 'SET_EDIT_REVIEW', payload: { update: true,host: false, rating: Rating,eventId:eventId,slotId:slotId, comment: reviewRes.comment_to_host, reviewId: reviewRes?.id } }) }}><i className="av av-edit-icon"></i></button>
                                            : ''}
                                        </div>
                                        <span>{moment.utc(reviewRes.created_at).local().format('DD MMM YYYY hh:mm A')} </span>
                                        <p>
                                            {reviewRes.comment_to_host}
                                            {reviewRes.receiver == null && reviewRes.event_id == eventId && reviewRes.slot_id == slotId && currentUserId == hostId ?
                                                <a class="link-btn" data-toggle="collapse" onClick={() => dispatch({ type: 'REPLY', payload: { receiverId: reviewRes?.user_id, commentId: reviewRes.id } })} href={`#review1${reviewRes.id}`} role="button" aria-expanded="false" aria-controls="collapseExample"><i class="av av-reply-icon"></i> Reply</a>
                                                : ''}
                                        </p>
                                        {hostId != reviewRes.user_id && reviews.find((f) => f.comment_id == reviewRes.id) ? "" :
                                            reviewRes?.receiver ? '' :
                                                <div class="collapse" id={`review1${reviewRes.id}`}>
                                                    <form onSubmit={replyToUser}>
                                                        <div class="reply-textarea">
                                                            <textarea class="form-control" placeholder="Comment" onChange={(e) => dispatch({ type: 'SET_COMMENT', payload: e.target.value })} value={state?.comment} >{state?.comment}</textarea>
                                                            <button type="submit" disabled={state.comment ? false : true} class="btn default-btn">{state?.buttonPreloader?<span className='button-pre-loading'>wait...</span>:"Send"}</button>
                                                        </div>
                                                    </form>
                                                </div>}
                                    </div>

                                </div>
                                {reviewRes?.receiver ?
                                    <div class="review-child-bx">
                                        <div class="review-bx">
                                            <figure class="n-m-pic"><img src={reviewRes?.receiver?.user_profile?.profile_picture ? FileManagerPath + `${reviewRes?.receiver?.user_profile?.profile_picture}` : DefaultProfilePicture} alt="" /></figure>
                                            <div class="rit-m-bx">
                                                <div class="review-parent-bx">
                                                    <div class="user-name-rating">
                                                        <strong>{reviewRes?.host_id==currentUserId?'Me':reviewRes?.receiver?.name}</strong>
                                                        {reviewRes.receiver?.id == currentUserId && reviewRes.receiver != null ?
                                                            <button type="button" class="btn link-btn review-edit-btn" data-toggle="modal" onClick={() => { editReview(reviewRes.id), dispatch({ type: 'SET_EDIT_REVIEW', payload: { update: true,host: true, rating: 0,eventId:eventId,slotId:slotId, comment: reviewRes.comment_to_user, reviewId: reviewRes?.id } }) }} data-target="#eidt-rating-review-popup"><i class="av av-edit-icon"></i></button>
                                                            : ''
                                                        }
                                                    </div>
                                                    <span>{moment.utc(reviewRes.updated_at).local().format('DD MMM YYYY hh:mm A')} </span>
                                                    <p>
                                                        {reviewRes.comment_to_user}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div> : ''}

                                    <div className={`write-review-content-bx new-toggle-dropdown ${`red-mode-`+reviewRes.id==state.EditModeId?'d-block':'d-none' } edit-reviews-collapse-dev`} >
                                        <div className="reply-textarea">
                                            {state.host?'':
                                            <div id="half-stars-example" className="half-stars-example">
                                                <div className="rating-group">
                                                    <StarRating value={parseInt(state?.rating)} onChange={(newValue) => dispatch({ type: 'SET_RATING', payload: newValue })} />
                                                </div>
                                            </div> }
                                            <form onSubmit={handleUpdate}>
                                                <div className="write-comment-rating">
                                                    <textarea className="form-control" placeholder="Write your Comment" onChange={(e) => dispatch({ type: 'SET_COMMENT', payload: e.target.value })} value={state?.comment}></textarea>
                                                    <button type="submit" disabled={state.host?state?.comment != '' ? false : true:state?.rating > 0 && state?.comment != '' ? false : true} className="btn default-btn">{state?.buttonPreloader?<span className='button-pre-loading'>wait...</span>:"Send"}</button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>

                            </div>


                        </div>

                    )}
                </div>
            </div>
        </>
    );
}

export default ReplyReviews;
