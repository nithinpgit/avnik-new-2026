import moment from 'moment';
import React, { useContext, useState } from 'react';
import { DefaultProfilePicture, FileManagerPath } from '../../ApiServer/UrlService';
import DefaultStars from '../../User/Reviews/Components/DefaultStars/DefaultStars';
import CurrentUser from '../UserContext/CurrentUserContext/CurrentUser';

const ReviewsDetails = ({ value, host }) => {
    const [state, setState] = useState({
        rating: 0,
        comment: '',

    });
    const currentUser = useContext(CurrentUser);

    const replyToUser = () => {

    }
    const HostReview = ({profilePicture,userName,createdAt,comment}) => {

        return (
            <>
                <div className="review-child-bx">
                    <div className="review-bx">
                        <figure className="n-m-pic"><img src={profilePicture} /></figure>
                        <div className="rit-m-bx">
                            <div className="review-parent-bx">
                                <strong>{userName}<span></span></strong>
                                <span>{createdAt}</span>
                                <p>
                                    {comment}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const UserReview = ({userId,profilePicture,userName,createdAt,comment,rating}) => {
    
        return (
            <>
                <div className="review-parent-bx">
                    <strong>{userName}<span><DefaultStars value={parseFloat(rating)} /></span></strong>
                    <span>{createdAt}</span>
                    <p>
                        {comment}
    
                        {userId == host?.id && userId == currentUser?.id ?
                            <a className="link-btn" data-toggle="collapse" href="#review2" role="button" aria-expanded="false" aria-controls="collapseExample"><i className="av av-undo-icon"></i> Reply</a>
                            : ''}
                    </p>
                    {userId == host?.id && userId== currentUser?.id ?
                        <div className="collapse" id="review2">
                            <div className="reply-textarea">
                                <textarea className="form-control" placeholder="Comment"></textarea>
                                <button type="button" className="btn default-btn">Send</button>
                            </div>
                        </div>
                        : ''
                    }
                </div>
            </>
        )
    }

    return (
        <>
            {value.length > 0 ? value.map((res) =>
                <div key={res.id} className="all-reviews-list">
                    <ul>
                        <li>
                        
                            <div className="review-bx">
                                <figure className="n-m-pic"><img src={res?.user_id != host?.id ? res?.sender?.user_profile ? FileManagerPath + res?.sender?.user_profile?.profile_picture : res?.sender?.user_profile?.social_profile_picture_url : DefaultProfilePicture} alt={res?.user_id != host?.id ? res?.sender?.name : ''} /></figure>
                                <div className="rit-m-bx">
                                        <UserReview 
                                            profilePicture={res?.user_id == host?.id ? res?.sender?.user_profile ? FileManagerPath + res?.sender?.user_profile?.profile_picture : res?.sender?.user_profile?.social_profile_picture_url : DefaultProfilePicture} 
                                            userName={res?.user_id != host?.id ? res?.sender?.name : ''}
                                            rating={res?.user_id != host?.id ? res?.rating : 0}
                                            createdAt={res?.user_id != host?.id ? moment.utc(res?.created_at).local().format('D MMM YYYY hh:mm A') : 'N/A'}
                                            comment={res?.user_id != host?.id ? res?.comment : ''}
                                            userId={res?.user_id}

                                        />
                                    {res.user != host.id && res.comment_id == res.id ?
                                            <HostReview 
                                                profilePicture={res?.user_id == host?.id ? res?.sender?.user_profile ? FileManagerPath + res?.sender?.user_profile?.profile_picture : res?.sender?.user_profile?.social_profile_picture_url : DefaultProfilePicture} 
                                                userName={res?.user_id == host?.id ? res?.sender?.name : ''}
                                                createdAt={res?.user_id == host?.id ? moment.utc(res?.created_at).local().format('D MMM YYYY hh:mm A') : 'N/A'}
                                                comment={res?.user_id == host?.id ? res?.comment : ''}
                                            
                                            />:''}
                                    
                                </div>
                            </div>
                        </li>

                    </ul>
                    {/* <div className="load-more-btn">
                                                <button className="btn white-shadow-btn"><i className="av av-add-time-icon"></i> Load More</button>
                                            </div> */}
                </div>


            )

                : ''}


        </>
    );
}

export default ReviewsDetails;



