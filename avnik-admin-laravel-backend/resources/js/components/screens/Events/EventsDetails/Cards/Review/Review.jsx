import Axios from 'axios';
import moment from 'moment';
import React, { Component, useContext, useEffect, useState } from 'react';
import { ApiService } from '../../../../../../ApiServer/ApiService';
import { DefaultProfilePicture, FileManagerPath } from '../../../../../../ApiServer/UrlService';
import DefaultStars from '../../../../../../User/Reviews/Components/DefaultStars/DefaultStars';
import ReviewsDetails from '../../../../../ReviewsDetails/ReviewsDetails';
import CurrentUser from '../../../../../UserContext/CurrentUserContext/CurrentUser';
import ReviewRatingNumber from '../../utility/ReviewRatingNumber';
import { Redirect401Login } from '../../../../../../utility/UtilityFunctions';
import GlobalContext from '../../../../../../Global/Context/GlobalContext';

const Review = (props) => {
    
const { eventType,userAverage, eventCreatedUser,totalReviews, eventDescription, eventImages, eventFiles, eventReview, eventTimeSlot, eventTags, eventTitle, favoriteEvents, numberOfSeats, id, status, timezone, reviewAverage } = props.values.EventByIdDetail;
const currentUser= useContext(CurrentUser);
const [globalState, globalDispatch]= useContext(GlobalContext);
const [Reviews, setReviews] = useState([])
const [Pagination, setPagination] = useState([])
 useEffect(() => {
   fetchReviews();
 }, [props.values.EventByIdDetail]);

 function fetchReviews(){
    let data={
        eventId:id,
     }
    ApiService._fetchEventDetailsReviews(data).then((res)=>{

        if(res.data.status==200){
            setReviews(res.data.data.data);
            setPagination(res.data.data)
        }
    }).catch((error)=>{
        Redirect401Login(error);

        console.log(error)
    });
 }

 function loadMore(){
     if(Pagination.next_page_url!=null){
        let data={
            eventId:id,
            nexPage:Pagination.current_page+1
         }
        ApiService._fetchEventDetailsReviews(data).then((res)=>{

            if(res.data.status==200){
                setReviews({...Pagination,...res.data.data.data});
                setPagination(res.data.data)
            }
        }).catch((error)=>{
            Redirect401Login(error);

            console.log(error)
        });
     }else{
        alert('no more reviews');
     }
   
 }

   

   
    return (
        <>
            <div className="ah-tab-content" data-ah-tab-active={props.values.EventNavbarMenu === 3 ? true : false}>
                <div className="e-d-review">
                    <div className="all-reviews-status">
                        {Reviews?.length>0?'':'No Reviews'}
                    </div>
                    <div className="all-reviews-list">
                            <ul>
                               {Reviews.map((res,index)=>
                               <li key={index}>
                                    <div className="review-bx">
                                        <figure className="n-m-pic"><img src={res.sender.user_profile?FileManagerPath+res.sender.user_profile.profile_picture:DefaultProfilePicture} alt="" /></figure>
                                        <div className="rit-m-bx">
                                            <div className="review-parent-bx">
                                                <strong>{currentUser?.id==res.user_id?'Me':res.sender.name} <span><DefaultStars value={parseFloat(res.rating)} /></span></strong>
                                                <span>{moment.utc(res.created_at).local().format('D MMM YYYY h:mm A')} </span>
                                                <p>
                                                {res.comment_to_host}
                                                </p>
                                            </div>
                                            {res.receiver?
                                            <div className="review-child-bx">
                                                <div className="review-bx">
                                                    <figure className="n-m-pic"><img src={res.receiver.user_profile?FileManagerPath+res.receiver.user_profile.profile_picture:DefaultProfilePicture} alt="" /></figure>
                                                    <div className="rit-m-bx">
                                                        <div className="review-parent-bx">
                                                            <strong>{currentUser?.id==res.host_id?'Me':res.receiver?.name}
                                                            
                                                                </strong>
                                                            <span>{moment.utc(res.updated_at).local().format('D MMM YYYY h:mm A')} </span>
                                                            <p>
                                                                
                                                                {res.comment_to_user}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>:''}
                                        </div>
                                    </div>
                                </li>
                                )}
                       
                            </ul>
                            <div className="load-more-btn">
                            {Pagination?.next_page_url!=null?<button className="btn white-shadow-btn" onClick={()=>loadMore()}><i className="av av-loading-icon"></i> Load More</button>:''}
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Review;