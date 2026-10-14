import Axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../../../ApiServer/ApiService';
import {FileManagerPath, assetUrl} from '../../../../ApiServer/UrlService';
import Auth from '../../../../Routes/Auth';
import { convertMinutes, timeConverter } from '../../../../utility/UtilityFunctions';
import ReviewsContext from '../../ReviewsContext/ReviewsContext';
import StarRating from '../StarRating/StarRating';

const SendReview = ({currentUserId,showHideDiv,hostId,slotId,eventId,eventToken,eventTitle,eventFile,eventDate,hostName,hostUserName,eventDuration,eventCost}) => {

const [state,dispatch] = useContext(ReviewsContext);
 


const formOnSubmit=(e)=>{
    e.preventDefault();
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:true}});
    let data={
        eventId:eventId,
        slotId:slotId,
        hostId:hostId,
        comment:state.comment,
        rating:state.rating,
    }
    ApiService._addAndReplyReviews(data).then((res)=>{
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

            if(res.data.status==200){
                dispatch({type:'RANDOM'});
                dispatch({type:'INITIAL_SEND_REVIEW_STATE'});
            }
    }).catch((error)=>{
    dispatch({type:"BUTTON_PRELOADER",payload:{Type:"BUTTON_PRELOADER",buttonPreloader:false}});

    })

}


    return (
        <>
            <div className="c-table-row cmn-new-toggle">
                <div className="cell review-details-editable" data-title="Event Details">
                    <div className="message-user-bx">
                        <Link to={`/event?token=${eventToken}&event=${eventId}`}>
                            <figure className="cmn-profile-pic  event-img">
                                <img src={assetUrl(eventFile[0].file_url)} alt={eventTitle} />
                            </figure>
                            <span>{eventTitle}</span>
                        </Link>
                    </div>
                </div>
                <div className="cell review-date-time-editable" data-title="Event Date">
                    <div className="c-table-text">{eventDate}</div>
                </div>
                <div className="cell review-amount-editable" data-title="Amount">
                    <div className="c-table-text">{eventCost}</div>
                </div>
                <div className="cell review-duration-editable" data-title="Rating">
                    <div className="c-table-text">
                    {convertMinutes(eventDuration)}

                    </div>
                </div>
                <div className="cell review-hosted-by-editable" data-title="Hosted By">
                    <div className="c-table-text"><Link to={`/profile/${hostUserName}`}>{currentUserId==hostId?"Me":hostName}</Link></div>
                </div>
                {currentUserId==hostId?'':
                <>
                <div className="cell review-write-editable text-right" data-title="Write Review">
                    <div className="c-table-text text-right">
                        <button type="button" className="btn default-btn" value="Show/Hide" onClick={() => showHideDiv(`write-review-form${slotId}`)}>Review</button>
                    </div>
                </div>
                <div id={`write-review-form${slotId}`} className="write-review-content-bx new-toggle-dropdown" style={{ display: 'none' }}>
                    <div className="reply-textarea">
                        <div id="half-stars-example" className="half-stars-example">
                            <div className="rating-group">
                                <StarRating value={0} onChange={(newValue) =>dispatch({type:'SET_RATING',payload:newValue})} />
                            </div>
                        </div>
                        
                        <form onSubmit={formOnSubmit}>
                        <div className="write-comment-rating">
                            <textarea className="form-control" placeholder="Write your Comment" onChange={(e)=>dispatch({type:'SET_COMMENT',payload:e.target.value})} value={state?.comment}></textarea>
                            <button type="submit" disabled={state?.rating>0&&state?.comment!=''?false:true} className="btn default-btn">{state?.buttonPreloader?<span className='button-pre-loading'>wait...</span>:"Send"}</button>
                        </div>
                        </form>
                        
                    </div>
                </div>
                </>
        }
            </div>
        </>
    );
}

export default SendReview;


