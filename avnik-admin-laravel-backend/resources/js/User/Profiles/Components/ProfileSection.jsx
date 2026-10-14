import axios from "axios";
import React, { useEffect, useState, useContext, useReducer } from "react";
import { Redirect, useParams } from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';
import { ApiService } from "../../../ApiServer/ApiService";
import FormErrors from "../../../components/screens/CreateEvent/Errors/ValidationError/FormError";
import StripePaymentModal from "../../../components/screens/Events/Payments/Modals/StripePaymentModal";
import CurrentUser from "../../../components/UserContext/CurrentUserContext/CurrentUser";
import GlobalContext from "../../../Global/Context/GlobalContext";
import Auth from "../../../Routes/Auth";
import Reducer from "../../../utility/Reducer";
import ReportProfilePopup from "../ProfileModals/ReportProfilePopup";
import UserProfileContext from "../UserProfileContext/UserProfileContext";
import MyAccount from "./MyAccount";
import MyEvent from "./MyEvent";
import MyProfile from "./MyProfile";
import ProfileReview from "./ProfileReview";
import ProfileScheduler from "./ProfileScheduler";
import DeletedEventModal from "../../../components/EventDeleteModal/DeleteEventModal";


import ConflictsEvents from "../../../components/screens/CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents";
import DefaultStars from "../../Reviews/Components/DefaultStars/DefaultStars";
import { Redirect401Login } from "../../../utility/UtilityFunctions";
import Skeleton from "react-loading-skeleton";
const initialState = {
    Languages: [],
    ProfileNav: {
        profileNav: true,
        eventNav: false,
        scheduleNav: false,
        accountNav: false,
        reviewsNav: false
    },
    ConflictsEvents: [],
    ProfileDetails: "",
    ProfileEvents: [],
    SlotDetails: [],
    showEventsProfileCalenders: [],
    StartDate: "",
    BookedSlot: '',
    ProfileUpcomingSlots: "",
    SlotPreloader: true,
    Preloader: true,
    Countries: [],
    UserOnline: false,
    ReportUserProfile: {
        currentId: "",
        userId: "",
        eventId: "",
        report: "",
        comment: ""
    },
    ProfilePictureValue: [],
    UpdateProfile: {
        currentUserId: "",
        aboutMe: "",
        edit: false,
        profilePicture: "",
        language: [],
        profession: [],
        country: "",
        email: "",
        phone: "",
        name: "",
        username: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        password_confirmation: "",
        updated: false
    }
};
const ProfileSection = () => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const { ProfileId } = useParams("ProfileId");
    const currentUser = useContext(CurrentUser);
    const [
        globalState,
        globalDispatch,
        handleReportUserEvent,
        onChangeReport,
        chatInitiate
    ] = useContext(GlobalContext);
    const [Error, setError] = useState({
        userNotFound: false,
        formSubmit: false
    });
    useEffect(() => {
        dispatch({ type: "UpdateProfile", payload: { Type: "UpdateProfile", ...state.UpdateProfile, aboutMe: state.ProfileDetails?.user_profile?.about_me } })
        if (state.ProfileDetails?.last_activity) {
            let diff = moment(moment()).diff(moment.utc(state.ProfileDetails?.last_activity).local().format("YYYY-MM-DD HH:mm:ss"), 'minutes');
            if (diff <= 2) {
                dispatch({ type: "onlineCheck", payload: { Type: "onlineCheck", UserOnline: true } });
            }
        }
        return;
    }, [state.ProfileDetails])
    useEffect(() => {
        getUpcomingSlotDetails();
    }, [ProfileId])
    useEffect(() => {
        if (globalState?.responseEventId > 0) {
            // let eventsRes=state?.ProfileEvents.filter(event => event.id != globalState?.responseEventId,
            dispatch({ type: 'SET_EVENTS_RESPONSE', payload: { Type: "SET_EVENTS_RESPONSE", ProfileEvents: state?.ProfileEvents.filter(event => event.id != globalState?.responseEventId) } })
        }

        console.log(globalState?.responseEventId, "responseEventID")
    }, [globalState?.responseEventId])
    useEffect(() => {
        getProfileDetail();
        getProfileDetailSlots();
        dispatch({
            type: "UpdateProfile",
            payload: {
                Type: "UpdateProfile",
                UpdateProfile: {
                    ...state?.UpdateProfile,
                    currentUserId: currentUser?.id
                }
            }
        });
        return () => { };
    }, [state.ProfileNav, ProfileId, state.StartDate]);


    // get user Profile Data 
    const getProfileDetail = () => {
        dispatch({
            type: "setProfileDetails",
            payload: { Type: "setProfileDetails", SlotPreloader: true }
        });

        axios.post(`/api/profile/username`, { username: ProfileId, tz: moment.tz.guess() }, {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Auth.getAccessToken()}`
            }
        })
            .then(res => {
                if (res.data.status == 200) {
                    dispatch({
                        type: "setProfileDetails",
                        payload: {
                            Type: "setProfileDetails",
                            ProfileDetails: res.data.userProfile,
                            ProfileEvents: res.data.userProfile?.events,
                            SlotPreloader: false,
                            Preloader: false
                        }
                    });
                }
                if (res.data.status == "failed") {
                    setError({ ...Error, userNotFound: true });
                }
                dispatch({
                    type: "setProfileDetails",
                    payload: { Type: "setProfileDetails", SlotPreloader: false }
                });
            })
            .catch(error => {
                //  Redirect401Login(error);

                dispatch({
                    type: "setProfileDetails",
                    payload: { Type: "setProfileDetails", SlotPreloader: false }
                });
                console.log(error);
            });
    };

    const getProfileDetailSlots = () => {
        let data = {
            profileId: ProfileId,
            startDate: state.StartDate,
            tz: moment.tz.guess()
        };
        ApiService._myProfileSlotsDetails(data)
            .then(res => {
                if (res.data.status == 200) {
                    dispatch({
                        type: "slotDetails",
                        payload: {
                            Type: "slotDetails",
                            SlotDetails: res.data.slotDetails
                        }
                    });
                }
            })
            .catch(error => {
                // Redirect401Login(error);

                console.log(error, "error");
            });
    };
    // edit user profile 
    const handleEditProfile = e => {
        e.preventDefault();
        const data = state.UpdateProfile;
        axios.put(`/api/profile/update/${currentUser?.id}`, data, {
            headers: {
                Accept: "application/json",
                authorization: `Bearer ${Auth.getAccessToken()}`
            }
        }).then(res => {
            if (res.data.status == 200) {
                dispatch({
                    type: "UpdateProfile",
                    payload: {
                        Type: "UpdateProfile",
                        UpdateProfile: {
                            ...state.UpdateProfile,
                            currentUserId: currentUser?.id,
                            edit: false,
                            updated: true
                        }
                    }
                });

                // if(state.UpdateProfile.aboutMe==''){
                //     localStorage.setItem('userData',JSON.stringify(res.data.data));
                // }
                toastr["success"](res.data.message);
            }
            if (res.data.status == "failed" && res.data.success == false) {
                let ErrorPassword = res.data.validation_error.password;
                let ErrorEmail = res.data.validation_error.email;
                let ErrorName = res.data.validation_error.name;
                if (ErrorPassword) {
                    FormErrors.responseValidationError(ErrorPassword);
                }
                if (ErrorEmail) {
                    FormErrors.responseValidationError(ErrorEmail);
                }
                if (ErrorName) {
                    FormErrors.responseValidationError(ErrorName);
                }
            }
            // if(res.data.status=="failed"){
            //     toastr["error"](res.data.message);
            // }
        }).catch(error => {
            Redirect401Login(error);

            // toastr["error"](error.response.message);
        });
    };
    // handle Payment of all events
    const paymentSlotHandle = (Payment, Data) => {
        // setBookedSlot({ ...BookedSlot, payment: true });
        getUpcomingSlotDetails();
        $("#stripe_payment_modal").modal("hide");
    };
    const paymentSlotHandleOnChange = (eventId, slotId, amount) => {
        dispatch({
            type: "bookedSlot", payload: {
                Type: "bookedSlot",
                BookedSlot: {
                    ...state.BookedSlot,
                    eventId: parseInt(eventId),
                    slotId: parseInt(slotId),
                    amount: parseInt(amount),
                    payment: true
                }
            }
        })
        BookingTimeConflictsCheck(eventId, slotId);
    };
    const BookingTimeConflictsCheck = (eventId, slotId) => {
        ApiService.BookingTimeConflictsChecks({ eventId, slotId }).then((res) => {
            if (res.data.status == "events") {
                dispatch({
                    type: "ConflictsEvents",
                    payload: {
                        Type: "ConflictsEvents",
                        ConflictsEvents: res.data.data,
                    }
                });
                toastr["error"](res.data.message);
                $("#booking-conflicts-events").modal('show');
            } else {
                $("#stripe_payment_modal").modal("show");
            }
        }).catch((error) => {
            Redirect401Login(error);

            console.log(error)
        })
    }

    // show event on calender with pagination
    const RightCalendarWeekDates = arg => {
        console.log(arg)
        // dispatch({ type: "SlotsPreloader", payload: { Type: "SlotsPreloader", SlotPreloader: true } });
        const data = {
            profileId: ProfileId,
            activeStart: moment(arg.view.activeStart).format("YYYY-MM-DD"),
            activeEnd: moment(arg.view.activeEnd).format("YYYY-MM-DD")
        };
        ApiService.showEventsProfileCalenders(data)
            .then(res => {
                if (res.data.status == "failed" && res.data.success == false) {
                    toastr["error"](res.data.message);
                }
                if (res.data.data) {
                    if (res.data.status == 200) {
                        dispatch({
                            type: "",
                            payload: {
                                Type: "",
                                showEventsProfileCalenders: res.data.data,
                                SlotPreloader: false
                            }
                        });
                    }
                }
                dispatch({ type: "SlotsPreloader", payload: { Type: "SlotsPreloader", SlotPreloader: false } });
            })
            .catch(error => {
                // Redirect401Login(error);

                dispatch({ type: "", payload: { Type: "", SlotPreloader: false } });
            });
    };

    const favoriteUser = () => {
        let data = {
            userId: state.ProfileDetails?.id
        };
        ApiService._favorite(data)
            .then(res => {
                if (res.data.status == 200) {
                    toastr["success"](res.data.message);
                    getProfileDetail();
                }
                if (res.data.status == "failed") {
                    toastr["error"](res.data.message);
                }
            })
            .catch(error => {
                Redirect401Login(error);

                toastr["error"](error.message);
            });
    };



    const getUpcomingSlotDetails = () => {
        ApiService._profileUpcomingEventsSlot({ profileId: ProfileId, tz: moment.tz.guess() }).then((res) => {
            if (res.data.status == 200) {
                dispatch({ type: "profileUpcomingSlots", payload: { Type: "profileUpcomingSlots", ProfileUpcomingSlots: res.data.data } });
            }
        }).catch((error) => {
            // Redirect401Login(error);

            console.log(error)
        })
    };
    const ProfilePictureUpload = (e) => {
        $('#CropperModalPop').modal('show');
        dispatch({ type: "ProfilePictureValue", payload: { Type: "ProfilePictureValue", ProfilePictureValue: e.target.files } });
    }

    const onCropImage = (obj) => {
        const form_data = new FormData();
        // for (let file of e.target.files) {
        form_data.append('file', obj, obj.name);
        // }
        axios.post('/api/profile', form_data, {
            headers: {
                'Accept': 'application/json',
                authorization: `Bearer ${Auth.getAccessToken()}`
            }
            ,
        }).then((res) => {
            if (res.data.status == 200) {
                $('#CropperModalPop').modal('hide');
                toastr["success"](res.data.message);
                getProfileDetail();
                localStorage.setItem('userData', JSON.stringify(res.data.data));
            }
            if (res.data.status == "failed") {
                toastr["error"](res.data.message);

            }

        }).catch((error) => {
            Redirect401Login(error);
            console.log(error)
        });
        setProfilePicture({});
    }

    return (
        <>
            <UserProfileContext.Provider value={[state, dispatch, ProfilePictureUpload, onCropImage, chatInitiate]}>
                <section className="mid-content-sec in-page-content-sec">
                    <div className="my-profile">
                        <div className="container">
                            <div className="e-d-heding">
                                {state?.Preloader ? <Skeleton width={150} height={30} /> : <h1>{state.ProfileDetails?.name} </h1>}
                                {<div className="all-reviews-status">
                                    {state?.Preloader ? <Skeleton className="all-reviews-status pr-2" width={150} height={30} /> : state.ProfileDetails?.event_reviews?.average_count > 0 && <><strong>
                                        {Math.round(parseFloat(state.ProfileDetails?.event_reviews?.average_rating) * 10) / 10}
                                    </strong>
                                        <ul className="cmn-ul-list">
                                            <li>
                                                <DefaultStars value={parseFloat(state.ProfileDetails?.event_reviews?.average_rating) || 0} />
                                            </li>
                                        </ul>
                                        <strong>
                                            {state.ProfileDetails?.event_reviews?.average_count > 1 ? `(${state.ProfileDetails?.event_reviews?.average_count + ' Ratings'})` : `(${state.ProfileDetails?.event_reviews?.average_count + ' Rating'})`}
                                        </strong></>}
                                </div>}
                                <div className="ed-top-btns">
                                    <ul className="cmn-ul-list">
                                        {state.ProfileDetails?.id ==
                                            currentUser?.id ? (
                                            ""
                                        ) : state.ProfileDetails?.id !=
                                            currentUser?.id ? (<>
                                                <li>
                                                    {state?.Preloader ? <Skeleton width={40} height={30} /> : <a
                                                        data-toggle="modal"
                                                        href="#report-event-popup"
                                                    >
                                                        <i className="av av-report-icon"></i>
                                                    </a>}
                                                </li>

                                                <li>
                                                    <div className="favorite-number">
                                                        {state?.Preloader ? <Skeleton width={40} height={30} /> : <a
                                                            href="#"
                                                            onClick={favoriteUser}
                                                        >
                                                            {currentUser?.id ==
                                                                state.ProfileDetails
                                                                    ?.my_favorite_users
                                                                    ?.user_id ? currentUser ? (
                                                                        <i className="av av-favorite-solid-icon active"></i>
                                                                    ) : <i className="av av-favorite-line-icon"></i> : (
                                                                <i className="av av-favorite-line-icon"></i>
                                                            )}
                                                        </a>}{" "}
                                                        {/* <span>
                                                    {state.ProfileDetails
                                                        ?.favorite_user_count
                                                        ? state.ProfileDetails
                                                              ?.favorite_user_count
                                                              .length
                                                        : 0}
                                                </span> */}
                                                    </div>
                                                </li>
                                            </>
                                        ) : ""}
                                        <li>
                                            {state?.Preloader ? <Skeleton width={40} height={30} /> : <a
                                                data-toggle="modal"
                                                href="#share-profile-popup"
                                                onClick={() =>
                                                    globalDispatch({
                                                        type: "share",
                                                        payload: {
                                                            Type: "share",
                                                            Share: `${window.location.origin}/share/profile/${state.ProfileDetails?.username}`
                                                        }
                                                    })
                                                }
                                            >
                                                <i className="av av-share-icon"></i>
                                            </a>}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="e-d-tabs-bx">
                                <div className="av-default-tabs">
                                    <div className="ah-tab-wrapper">
                                        <div className="ah-tab">
                                            {state?.Preloader ? <Skeleton width={140} height={30} /> : <a
                                                className="ah-tab-item"
                                                onClick={() =>
                                                    dispatch({
                                                        type: "setProfileNav",
                                                        payload: {
                                                            Type:
                                                                "setProfileNav",
                                                            ProfileNav: {
                                                                profileNav: true,
                                                                eventNav: false,
                                                                accountNav: false,
                                                                reviewsNav: false,
                                                                scheduleNav: false
                                                            }
                                                        }
                                                    })
                                                }
                                                data-ah-tab-active={
                                                    state.ProfileNav.profileNav
                                                }
                                                href="#"
                                            >
                                                Profile
                                            </a>}
                                            {state?.Preloader ? <Skeleton width={140} height={30} /> : <a
                                                className="ah-tab-item"
                                                onClick={() =>
                                                    dispatch({
                                                        type: "setProfileNav",
                                                        payload: {
                                                            Type:
                                                                "setProfileNav",
                                                            ProfileNav: {
                                                                profileNav: false,
                                                                eventNav: true,
                                                                accountNav: false,
                                                                reviewsNav: false,
                                                                scheduleNav: false
                                                            }
                                                        }
                                                    })
                                                }
                                                data-ah-tab-active={
                                                    state.ProfileNav.eventNav
                                                }
                                                href="#"
                                            >
                                                Events
                                            </a>}
                                            {state?.Preloader ? <Skeleton width={140} height={30} /> : <a
                                                className="ah-tab-item"
                                                onClick={() =>
                                                    dispatch({
                                                        type: "setProfileNav",
                                                        payload: {
                                                            Type:
                                                                "setProfileNav",
                                                            ProfileNav: {
                                                                profileNav: false,
                                                                eventNav: false,
                                                                accountNav: false,
                                                                reviewsNav: false,
                                                                scheduleNav: true
                                                            }
                                                        }
                                                    })
                                                }
                                                data-ah-tab-active={
                                                    state.ProfileNav.scheduleNav
                                                }
                                                href="#"
                                            >
                                                Schedule
                                            </a>}
                                            {state?.Preloader ? <Skeleton width={140} height={30} /> : <a
                                                className="ah-tab-item"
                                                onClick={() =>
                                                    dispatch({
                                                        type: "setProfileNav",
                                                        payload: {
                                                            Type:
                                                                "setProfileNav",
                                                            ProfileNav: {
                                                                profileNav: false,
                                                                eventNav: false,
                                                                accountNav: false,
                                                                reviewsNav: true,
                                                                scheduleNav: false
                                                            }
                                                        }
                                                    })
                                                }
                                                data-ah-tab-active={
                                                    state.ProfileNav.reviewsNav
                                                }
                                                href="#"
                                            >
                                                Reviews
                                            </a>}
                                            {currentUser?.id ==
                                                state.ProfileDetails?.id ? (
                                                state?.Preloader ? <Skeleton width={140} height={30} /> : <a
                                                    className="ah-tab-item"
                                                    onClick={() =>
                                                        dispatch({
                                                            type:
                                                                "setProfileNav",
                                                            payload: {
                                                                Type:
                                                                    "setProfileNav",
                                                                ProfileNav: {
                                                                    profileNav: false,
                                                                    eventNav: false,
                                                                    accountNav: true,
                                                                    scheduleNav: false,
                                                                    reviewsNav: false
                                                                }
                                                            }
                                                        })
                                                    }
                                                    data-ah-tab-active={
                                                        state.ProfileNav
                                                            .accountNav
                                                    }
                                                    href="#"
                                                >
                                                    Account
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div className="ah-tab-content-wrapper">
                                        <MyProfile
                                            active={state.ProfileNav.profileNav}
                                            handleEditProfile={
                                                handleEditProfile
                                            }
                                            paymentHandle={paymentSlotHandleOnChange}

                                        />
                                        <MyEvent
                                            active={state.ProfileNav.eventNav}
                                        />
                                        <ProfileScheduler
                                            active={
                                                state.ProfileNav.scheduleNav
                                            }
                                            paymentHandle={paymentSlotHandleOnChange}
                                            RightCalendarWeekDates={RightCalendarWeekDates}
                                        />
                                        {currentUser?.id ==
                                            state.ProfileDetails?.id ? (
                                            <MyAccount
                                                active={
                                                    state.ProfileNav.accountNav
                                                }
                                                handleEditProfile={
                                                    handleEditProfile
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}
                                        <ProfileReview
                                            value={state.ProfileDetails}
                                            active={state.ProfileNav.reviewsNav}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <StripePaymentModal
                    onChange={paymentSlotHandle}
                    currentUser={currentUser}
                    amount={state.BookedSlot?.amount}
                    slotId={state.BookedSlot?.slotId}
                    eventId={state.BookedSlot?.eventId}
                />
                <ReportProfilePopup
                    onChange={onChangeReport}
                    comment={globalState?.report.comment}
                    value={globalState?.report.report}
                    handleSubmit={handleReportUserEvent}
                    reportId={state.ProfileDetails?.id}
                    type="userId"
                />

            </UserProfileContext.Provider>
            <DeletedEventModal />
            <ConflictsEvents id="booking-conflicts-events" events={state.ConflictsEvents} />
        </>
    );
};

export default ProfileSection;
