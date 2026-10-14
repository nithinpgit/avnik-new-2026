import React, { Component, useEffect, useContext } from "react";
import EventDetailsSectionPreload from "../Preloader/EventDetailsSectionPreload";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Auth from "../../../../../../Routes/Auth";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import GlobalLink from "../../../../../../ApiServer/GlobalLink";
import moment from "moment";
import FindDateTime from "../../../../CreateEvent/Classes/FindDateTime/FindDateTime";
import EventPayment from "../../../Constant/EventPayment";
import {
    DefaultProfilePicture,
    FileManagerPath
} from "../../../../../../ApiServer/UrlService";
import ReviewRatingNumber from "../../utility/ReviewRatingNumber";
import { Link } from "react-router-dom";
import SlotCounter from "./SlotCounter";
import Context from "../../../../../../store/Context";
import CurrentUser from "../../../../../UserContext/CurrentUserContext/CurrentUser";
import DefaultStars from "../../../../../../User/Reviews/Components/DefaultStars/DefaultStars";

const Detail = props => {
    const [state,dispatch] = useContext(Context);
    const  currentUser  = useContext(CurrentUser);
    const {
        eventType,
        userAverage,
        eventCreatedUser,
        eventDescription,
        eventImages,
        eventFiles,
        eventReview,
        eventTimeSlot,
        eventTags,
        eventTitle,
        favoriteEvents,
        numberOfSeats,
        id,
        status,
        timezone,
        reviewAverage
    } = state.EventByIdDetail;


    const ProfilePicture = eventCreatedUser;

    const Profile = ProfilePicture?.profilePicture?.profile_picture
        ? FileManagerPath + ProfilePicture?.profilePicture?.profile_picture
        : ProfilePicture?.profilePicture?.social_profile_picture_url
        ? ProfilePicture?.profilePicture?.social_profile_picture_url
        : DefaultProfilePicture;

    const SliderPreloader = () => {
        return (
            <div className="item">
                <figure className="event-lft-img">
                    <a href="#">
                        <Skeleton width={657} height={438} duration={2} />
                    </a>
                </figure>
            </div>
        );
    };

    return (
        <>
            <div
                className="ah-tab-content"
                data-ah-tab-active={
                    state.EventNavbarMenu === 1 ? true : false
                }
            >
                <div className="event-details-bx">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-7">
                            <div className="insert-file-slider e-d-gallery">
                                {/* <div id="e-d-gallery" className="owl-carousel owl-theme"> */}
                                {state.eventPreloader ? (
                                    <SliderPreloader />
                                ) : (
                                    <OwlCarousel
                                        className="owl-carousel owl-theme"
                                        loop
                                        autoplay={true}
                                        margin={10}
                                        nav
                                        items={1}
                                        dotData={true}
                                        dots={false}
                                    >
                                        {eventImages.map((res, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`item ${
                                                        index === 1
                                                            ? `active`
                                                            : ""
                                                    }`}
                                                >
                                                    <figure className="event-lft-img">
                                                        <a href="#">
                                                            {" "}
                                                            <img
                                                                src={
                                                                    GlobalLink.FileManagerPathURL(res.fileUrl)
                                                                }
                                                                alt={`Slider`}
                                                            />
                                                        </a>
                                                    </figure>
                                                    <div className="h-i-profile">
                                                        <div className="e-d-g-pro">
                                                            <figure className="cmn-profile-pic">
                                                                <img
                                                                    src={
                                                                        Profile
                                                                    }
                                                                    alt={
                                                                        ProfilePicture?.name
                                                                    }
                                                                    title={
                                                                        ProfilePicture?.name
                                                                    }
                                                                />
                                                            </figure>
                                                            <Link
                                                                to={`/profile/${eventCreatedUser?.userName}`}
                                                            >
                                                                <span>
                                                                    {
                                                                        eventCreatedUser?.name
                                                                    }
                                                                </span>
                                                                <p>
                                                                <DefaultStars value={parseFloat(userAverage?.average_rating) || 0} />
                                                                    
                                                                    {/* {
                                                                        userAverage
                                                                            ? userAverage?.average_count
                                                                            : 0
                                                                    } */}
                                                                </p>
                                                            </Link>
                                                        </div>
                                                        <div className="message-link">
                                                            <a href="#" onClick={()=>props.chatInitiate(eventCreatedUser?.id)}>
                                                                <i className="av av-chat-notify-icon"></i>{" "}
                                                                Message
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </OwlCarousel>
                                )}
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-5">
                            <div className="event-right-content">
                                <SlotCounter
                                    values={state}
                                    currentUser={currentUser}
                                    paymentHandle={props.paymentHandle}
                                />
                                <div className="h-evnt-d h-event-tags event-tags-list">
                                    {/*<div className="e-des-tags-edit">
                                            <strong>{state.eventPreloader?<Skeleton width={50} /> :'Tags'} </strong>
                                            {state.eventPreloader?<a href="#" className="d-edit-link"><Skeleton width={50} /></a>:eventCreatedUser?.id===currentUser?.id ?<a href="#" className="d-edit-link">Edit</a>:''}
                                        </div>*/}
                                    {/* <div className="e-d-tags">
                                        <div className="tags-list">
                                            <ul className="ul-row-col">
                                                {state.eventPreloader ? (
                                                    <>
                                                        <li>
                                                            <Skeleton
                                                                width={100}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                    </>
                                                ) : (
                                                    state?.EventByIdDetail?.eventTags.map(
                                                        (res, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <div className="tag-bx">
                                                                        <span>
                                                                            {
                                                                                res
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            );
                                                        }
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="event-botom-dis-tags-sec">
                                <div className="h-evnt-d">
                                <div className="h-evnt-d h-event-tags event-tags-list">
                                <div className="e-d-tags">
                                        <div className="tags-list">
                                            <ul className="ul-row-col">
                                                {state.eventPreloader ? (
                                                    <>
                                                        <li>
                                                            <Skeleton
                                                                width={100}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                        <li>
                                                            <Skeleton
                                                                width={90}
                                                                height={33}
                                                            />
                                                        </li>
                                                    </>
                                                ) : (
                                                    state?.EventByIdDetail?.eventTags.map(
                                                        (res, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <div className="tag-bx">
                                                                        <span>
                                                                            {
                                                                                res
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            );
                                                        }
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="category-rit-bx">
                                        {state.eventPreloader ? (
                                            <Skeleton width={200} />
                                        ) : (
                                            <>
                                                <span>Category : </span>
                                                <p>{state.EventByIdDetail?.eventCategory?.name} / {state.EventByIdDetail?.eventSubCategory?.name}</p>
                                            </>
                                        )}
                                    </div>
                                    <div className="e-des-tags-edit">
                                        <strong>
                                            {state.eventPreloader ? (
                                                <Skeleton width={200} />
                                            ) : (
                                                "Description"
                                            )}
                                        </strong>
                                        {/* { state.eventPreloader? <a href="#" className="d-edit-link"><Skeleton width={50} height={20} /></a>:eventCreatedUser?.id===currentUser?.id?<a href="#" className="d-edit-link"> Edit</a>:''} */}
                                    </div>
                                    <div className="des-content">
                                        {state.eventPreloader ? (
                                            <div
                                                style={{
                                                    fontSize: 20,
                                                    lineHeight: 1.5
                                                }}
                                            >
                                                {<Skeleton count={4} />}
                                            </div>
                                        ) : (
                                            <p>
                                                {eventDescription}{" "}
                                                    <a
                                                        href={void 0}
                                                        onClick={() =>
                                                            alert("More")
                                                        }
                                                    >
                                                    More
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Detail;
