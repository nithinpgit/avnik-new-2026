import React, { useContext, useEffect, useState } from 'react';
import UserProfileContext from '../UserProfileContext/UserProfileContext';
import moment from 'moment';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import { FileManagerPath } from '../../../ApiServer/UrlService';
import ChatContext from '../../Chats/ChatContext/ChatContext';
import { Link, useParams } from 'react-router-dom';

import DefaultStars from '../../Reviews/Components/DefaultStars/DefaultStars';
import CropperModal from '../../../components/screens/CreateEvent/Cards/ImageCropper/CustomeCroppie';
import { FindHoursMinutes } from '../../../utility/UtilityFunctions';
import Skeleton from 'react-loading-skeleton';
import { UserProfileDataPreloader } from '../../../components/SkeletonLoading/SkeletonLoading';

const MyProfile = (props) => {
    const currentUser = useContext(CurrentUser);
    const [state, dispatch,ProfilePictureUpload,onCropImage,chatInitiate] = useContext(UserProfileContext);
    const [ProfilePicture, setProfilePicture] = useState([])
     const [buttonPreloader,setButtonPreloader]=useState(false);
    console.log(state,'profilestate')
    return (
        <>
            <div className="ah-tab-content" data-ah-tab-active={props.active}>
                <div className="my-profile-bx">
                    <div className="event-details-bx">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-7">
                                <div className="my-profile-left">
                                    <div className="h-evnt-d">
                                        {state.UserOnline ? <div className="e-des-tags-edit">
                                            <strong>Online</strong>
                                        </div> : <div className="e-des-tags-edit">
                                                <strong style={{ color: "black" }}>Offline</strong>
                                            </div>}
                                        <div className="pro-status-bx">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-6 col-lg-6">
                                                    <div className="lft-pro-pic">
                                                        <div className="avatar-upload">
                                                            {state.ProfileDetails?.id == currentUser?.id ?
                                                                <div className="avatar-edit">
                                                                    <input type='file' id="imageUpload" onChange={ProfilePictureUpload} accept=".png,.jpg,.jpeg" />
                                                                    <label htmlFor="imageUpload"></label>
                                                                </div> : ''}
                                                            <div className="avatar-preview">
                                                                <div id="imagePreview" style={{ backgroundImage: `url(${state.ProfileDetails?.user_profile?.profile_picture ? FileManagerPath + state.ProfileDetails?.user_profile?.profile_picture : state.ProfileDetails?.user_profile?.social_profile_picture_url ? state.ProfileDetails?.user_profile?.social_profile_picture_url : `${FileManagerPath}/public/assets/images/avatar.png`})` }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="footer-social-icn">
                                                        <ul>
                                                            <>
                                                                <li className="fb"><a href="https://facebook.com/"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                                <li className="google"><a href="https://gmail.com/"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                                                <li className="twitter"><a href="https://twitter.com/"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                            </>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-md-6 col-lg-6">
                                                    <div className="right-pro-text">
                                                        <strong className="p-usr-name">{state?.Preloader?<Skeleton width={100} height={30}/>:state.ProfileDetails?.name}</strong>
                                                        {/* <div className="all-reviews-status">
                                                            <strong>{state.ProfileDetails?.event_reviews?.average_rating?parseFloat(state.ProfileDetails?.event_reviews?.average_rating):0} {state.ProfileDetails?.event_reviews?.average_count > 1 ? 'Reviews' : 'Review'}</strong>
                                                            <ul className="cmn-ul-list">
                                                                <li>
                                                                    <DefaultStars value={parseFloat(state.ProfileDetails?.event_reviews?.average_rating) || 0} />
                                                                </li>
                                                            </ul>
                                                            <strong>{state.ProfileDetails?.event_reviews?.average_count}</strong>

                                                        </div> */}
                                                        {state?.Preloader?<UserProfileDataPreloader />:<div className="m-s-info">
                                                            <ul className="cmn-ul-list">
                                                                {state.ProfileDetails ?
                                                                    <li>
                                                                        <i className="av av-member-since-icon"></i>
                                                                        <span>Member Since {state.ProfileDetails ? moment(state.ProfileDetails?.joined_on, 'YYYY-MM-DD HH:mm:ss').format('D MMM YYYY') : 'not found'}</span>
                                                                    </li> : ''}
                                                                {state.ProfileDetails?.user_profile ?
                                                                    JSON.parse(state.ProfileDetails?.user_profile.language) != null ? <li className='my-profile-language'>
                                                                        <i className="av av-translate-icon"></i>
                                                                {JSON.parse(state.ProfileDetails?.user_profile.language).map((res,i)=><span key={res}>{res}</span>)}
                                                                    </li> : '' : ''}
                                                                {state.ProfileDetails?.user_profile ?
                                                                    state.ProfileDetails?.user_profile.country != null ? <li>
                                                                        <i className="av av-location-icon"></i>
                                                                        <span>{`${state.ProfileDetails?.user_profile.country ? state.ProfileDetails?.user_profile.country : ''}`}</span>
                                                                    </li> : '' : ''}
                                                                {state.ProfileDetails?.user_profile ?
                                                                    JSON.parse(state.ProfileDetails?.user_profile?.profession) != null ? <li className="my-profile-skill">
                                                                        <i className="av av-Profession-icon"></i>
                                                                {JSON.parse(state.ProfileDetails?.user_profile?.profession).map((res,i)=><><span key={res} className={i===0?'d-none skill-separator':'d-block skill-separator'}>|</span><span >{res}</span></>)}
                                                                    </li> : '' : ''}
                                                            </ul>
                                                        </div>}
                                                        {state?.Preloader?<Skeleton width={100} height={38}/>: state.ProfileDetails?.id != currentUser?.id ?
                                                            <div className="join-event-bx">
                                                                <a href='#' onClick={() => chatInitiate(state.ProfileDetails?.id)} className="btn default-btn"><i className="av av-message-icon"></i> Message</a>
                                                            </div> : ''}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-5">
                                <div className="event-right-content">
                                    <div className="meeting-short-info">
                                    {state.ProfileUpcomingSlots?.events==null?"No Upcoming Event":<>
                                        <div className="event-countdown">

                                            <ul className="cmn-ul-list">
                                                <li>
                                                    <h4>{state?.Preloader?<Skeleton width={100} height={30}/>:state.ProfileUpcomingSlots?.events?.event_title}</h4>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="meeting-space">
                                            <strong className="float-right">{state?.Preloader?<Skeleton width={200} height={30}/>:
                                            moment(moment(state.ProfileUpcomingSlots?.start_date+''+ state.ProfileUpcomingSlots?.start_time,'YYYY-MM-DD HH:mm:ss')).calendar(null,{
                                            lastDay : '[Yesterday] hh:mm A',
                                            sameDay : '[Today] @ hh:mm A',
                                            nextDay : '[Tomorrow] @ hh:mm A',
                                            lastWeek : '[Last Week] DD MMM, YYYY hh:mm A',
                                            nextWeek : '[Next Week] DD MMM, YYYY hh:mm A',
                                            sameElse : 'DD MMM YYYY hh:mm A'
                                        })}</strong>
                                            <h3>{state?.Preloader?<Skeleton width={100} height={30}/>:'Meeting Specs' }</h3>

                                            <div className="m-s-info">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <strong>{state?.Preloader?<Skeleton width={60} height={30}/>:'Seats'}</strong>
                                                        <p><i className="av av-seats-icon"></i> <span>
                                                
                                                {state?.Preloader?<Skeleton width={10} height={30}/>:
                                                    state.ProfileUpcomingSlots
                                                        ?.total_seats- state.ProfileUpcomingSlots
                                                        ?.booked_seats
                                                }
                                                {state?.Preloader?<Skeleton width={5} height={30}/>:'/'}
                                                {state?.Preloader?<Skeleton width={10} height={30}/>:
                                                    state.ProfileUpcomingSlots
                                                        ?.total_seats
                                                }{" "}
                                                {state?.Preloader?<Skeleton width={100} height={30}/>:'Seats Left'}
                                            </span></p>
                                                    </li>
                                                    <li>
                                                        <strong>{state?.Preloader?<Skeleton width={60} height={30}/>:'Duration'}</strong>
                                                        <p>{state?.Preloader?<Skeleton width={40} height={30}/>:<i className="av av-event-time-icon"></i>}<span>
                                                {state?.Preloader?<Skeleton width={140} height={30}/>:FindHoursMinutes(
                                                    state.ProfileUpcomingSlots?.duration
                                                )}
                                                &nbsp;{state?.Preloader?<Skeleton width={140} height={30}/>:'(HH:mm)'}
                                            </span></p>
                                                    </li>
                                                    <li>
                                                        <strong>{state?.Preloader?<Skeleton width={60} height={30}/>:'Cost'}</strong>
                                                        <p>{state?.Preloader?<Skeleton width={140} height={30}/>:<i className="av av-event-doller-icon"></i>}<span>{state?.Preloader?<Skeleton width={140} height={30}/>:state.ProfileUpcomingSlots?.cost>0?`$${state.ProfileUpcomingSlots?.cost}`:"Free"}</span></p>
                                                    </li>
                                                    <li>
                                                        <strong>{state?.Preloader?<Skeleton width={60} height={30}/>:'Type'}</strong>
                                                        <p>{state?.Preloader?<Skeleton width={140} height={30}/>:<i className="av av-webinar-icon"></i>}<span>{state?.Preloader?<Skeleton width={100} height={30}/>:
                                                            state.ProfileUpcomingSlots?.events
                                                        ?.event_type
                                                }</span></p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="join-event-bx">
                            {state.Preloader ? (
                                <Skeleton width={110} height={36} />
                            ) :state?.ProfileUpcomingSlots?.events?.user_fk_id ===
                              currentUser?.id ?state?.ProfileUpcomingSlots?.status=="cancelled" || state?.ProfileUpcomingSlots?.status=="cancelledByHost"?(
                                <button
                                    type="button"
                                    onClick={() =>
                                        props.paymentHandle(
                                            parseInt(
                                                state?.ProfileUpcomingSlots?.events
                                                    ?.id
                                            ),
                                            parseInt(state?.ProfileUpcomingSlots?.id),
                                            parseInt(
                                                state?.ProfileUpcomingSlots?.cost
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
                                        href={`/join/?rm=${state?.ProfileUpcomingSlots?.meeting_room_id}`}
                                        className="btn cmn-bdr-btn"
                                        title="Start Meeting"
                                    >
                                        <i className="av av-quick-start-icon"></i>
                                    </a>
                                </div>
                            ) : state?.ProfileUpcomingSlots?.event_payment?.length >
                                  0 &&
                              state?.ProfileUpcomingSlots?.event_payment.find((payM)=>payM?.user_fk_id === currentUser?.id)&&state?.ProfileUpcomingSlots?.event_booking?.length>0
                                  ?(
                                <div className="btn default-btn booked-btn">
                                    Booked
                                    <a
                                        href={`/join/?rm=${state?.ProfileUpcomingSlots?.meeting_room_id}`}
                                        className="btn cmn-bdr-btn"
                                        title="Join Meeting"
                                    >
                                        <i className="av av-quick-start-icon"></i>
                                    </a>
                                </div>
                            ) : state?.ProfileUpcomingSlots?.booked_seats ===
                              state?.ProfileUpcomingSlots?.total_seats ? (
                                <button
                                    type="button"
                                    className="btn default-btn"
                                    disabled={true}
                                >
                                    Seats are full
                                </button>
                            ) : moment(
                                  state?.ProfileUpcomingSlots?.start_date_time,
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
                                    onClick={() =>props.
                                        paymentHandle(
                                            parseInt(
                                                state?.ProfileUpcomingSlots?.events
                                                    ?.id
                                            ),
                                            parseInt(state?.ProfileUpcomingSlots?.id),
                                            parseInt(
                                                state?.ProfileUpcomingSlots?.cost
                                            )
                                        )
                                    }
                                    className="btn default-btn"
                                >
                                    Book Now
                                </button>
                            
                       
                            )}
                        </div></>}
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                                <div className="h-evnt-d">
                                    <div className="e-des-tags-edit">
                                        <strong>{state?.Preloader?<Skeleton width={60} height={30}/>:'About Me'}</strong>
                                        {currentUser?.id == state.ProfileDetails?.id ? state.UpdateProfile?.edit || state.ProfileDetails?.user_profile?.about_me == null ? <a href="#" onClick={props.handleEditProfile} className="d-edit-link">Save</a> : <a href="#" onClick={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile", UpdateProfile:{...state.UpdateProfile,edit: true} }})} className="d-edit-link">Edit</a> : ''}
                                    </div>
                                    <div className="des-content">

                                        {state.ProfileDetails?.user_profile != null 
                                        ? state.UpdateProfile?.edit || state.ProfileDetails?.user_profile?.about_me == null 
                                        ? <textarea className="form-control" cols="55" rows="5" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile", UpdateProfile:{...state.UpdateProfile, aboutMe: e.target.value, edit: true} }})} placeholder="Enter About Us" value={state.UpdateProfile.aboutMe}>{state.UpdateProfile.aboutMe}</textarea> 
                                        : <p>{state?.Preloader?<Skeleton width={140} height={30}/>:state?.UpdateProfile.aboutMe||state.ProfileDetails?.user_profile?.about_me}</p> 
                                        : state.UpdateProfile?.edit 
                                        ? <textarea className="form-control" cols="55" rows="5" onChange={(e) =>dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile", UpdateProfile:{...state.UpdateProfile, aboutMe: e.target.value}}})} ></textarea> 
                                        : state?.Preloader?<Skeleton width={140} height={30}/>:state.ProfileDetails?.user_profile?.about_me}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    

                </div>
            </div>

            <div className="modal fade" id="CropperModalPop" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CropperModal
                                options={{
                                    showZoomer: true,
                                    enableOrientation: true,
                                    // mouseWheelZoom: "ctrl",
                                    circle:true,
                                    enableResize: false,
                                    viewport: {
                                        width: 250,
                                        height: 250,
                                        type:"circle",
                                    },
                                    boundary: {
                                        width: 415,
                                        height: 415,
                                    }
                                }}
                                size={{
                                    width: 1280,
                                    height: 1280,
                                }}
                                buttonClassName="btn default-btn float-right"
                                onCrop={onCropImage}
                                value={state.ProfilePictureValue}
                                buttonPreloader={buttonPreloader}

                            />
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfile;

