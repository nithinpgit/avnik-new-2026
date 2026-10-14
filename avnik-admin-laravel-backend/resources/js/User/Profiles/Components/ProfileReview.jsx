import moment from 'moment';
import React, { Component, useContext, useEffect, useState } from 'react';
import { ApiService } from '../../../ApiServer/ApiService';
import { DefaultProfilePicture, FileManagerPath } from '../../../ApiServer/UrlService';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import DefaultStars from '../../Reviews/Components/DefaultStars/DefaultStars';
import GlobalContext from '../../../Global/Context/GlobalContext';
const initialState={

}
const ProfileReview =(props)=>{
const currentUser = useContext(CurrentUser);
const [globalState,globalDispatch]=useContext(GlobalContext);
const [stateReviews, setReviews] = useState([]);
const [paginationReviews, setPaginationReviews] = useState();
    useEffect(() => {
        fetchProfileReviews();
    }, [props.active]);
function fetchProfileReviews(){
    let data={
        userId:props?.value?.id
    }
    ApiService._fetchUserProfileReviews(data).then((res)=>{
        if(res.data.status == 200){
            setReviews(res.data.data.data);
            setPaginationReviews(res.data.data);
        }else{
            console.log(res.data.message)
        }
    }).catch((error)=>{
        console.log(error)
    })
}
const loadMore=()=>{
    if(paginationReviews.next_page_url!=null){
        let data={
            userId:props?.value?.id,
            nextPage:paginationReviews.current_page+1,
        }
        ApiService._fetchUserProfileReviews(data).then((res)=>{
            if(res.data.status == 200){
                setReviews({...stateReviews,...res.data.data.data});
                setPaginationReviews(res.data.data);
            }else{
                console.log(res.data.message)
            }
        }).catch((error)=>{
            console.log(error)
        })
    }else{
        alert('no more reviews');
    }

}

    return (
            <>
                <div className="ah-tab-content" data-ah-tab-active={props.active}>
                    <div className="e-d-review">
                        
                                {stateReviews?.length>0?'':'No Reviews'}
                            
                        <div className="all-reviews-list">
                            <ul>
                                {stateReviews.map((res,index)=>
                                <li key={index}>
                                <div className="review-bx">
                                    <figure className="n-m-pic"><img src={res.sender.user_profile?FileManagerPath+res.sender.user_profile.profile_picture:DefaultProfilePicture} alt="" /></figure>
                                    <div className="rit-m-bx">
                                        <div className="review-parent-bx">
                                            <strong>{currentUser?.id==res.user_id?'Me':res.sender.name} <span><DefaultStars value={parseFloat(res.rating)} /></span></strong>
                                            <span>{moment.utc(res.created_at).tz(globalState?.timeZone).format('D MMM YYYY h:mm A')} </span>
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
                                                        <strong>
                                                            {currentUser?.id==res.host_id?'Me':res.receiver?.name}
                                                            </strong>
                                                        <span>{moment.utc(res.updated_at).tz(globalState?.timeZone).format('D MMM YYYY h:mm A')} </span>
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
                            {paginationReviews?.next_page_url!=null?
                            <div className="load-more-btn">
                                <button className="btn white-shadow-btn" type="button" onClick={()=>loadMore()}><i className="av av-loading-icon"></i> Load More</button>
                            </div>:''}
                        </div>
                    </div>
                </div>
            </>
        );
    }


export default ProfileReview;
