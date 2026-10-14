import React, { useContext, useEffect,lazy, useReducer } from "react";
import TopNavbar from "../../Navbar/Navbar";
import FilterPopup from "../../Filter/FilterPopup";
import Auth from "../../../Routes/Auth";

import CreateEventContext from "./Pages/CreateEventContext/CreateEventContext";
import CreateEventReducer from "./Pages/CreateEventReducer/CreateEventReducer";
import moment from "moment";
import 'moment-timezone';
import { TimeZoneOffset } from "../../../ApiServer/TimeZoneJSON/TimeZone";
import { ApiService } from "../../../ApiServer/ApiService";
import FindDateTime from "./Classes/FindDateTime/FindDateTime";
import FormValidation from "./Constants/FormValidation/FormValidation";
import CreateEventService from "../../../ApiServer/CreateEvent/CreateEventService";
import FormErrors from "./Errors/ValidationError/FormError";
// import StepOne from "./Components/Modal/StepOne";
// import StepTwo from "./Components/Modal/StepTwo";
// import StepThree from "./Components/Modal/StepThree";
// import StepFour from "./Components/Modal/StepFour";
// import StepFive from "./Components/Modal/StepFive";
const CreateEventPageSection = lazy(() => import('./Pages/CreateEventPageSection'));
const StepOne = lazy(() => import('./Components/Modal/StepOne'));
const StepTwo = lazy(() => import('./Components/Modal/StepTwo'));
const StepThree = lazy(() => import('./Components/Modal/StepThree'));
const StepFour = lazy(() => import('./Components/Modal/StepFour'));
const StepFive = lazy(() => import('./Components/Modal/StepFive'));

// import JoinRequestPopup from "./Components/Join/JoinRequestPopup";
import JoinRequestContext from "./Components/Join/JoinRequestContext/JoinRequestContext";
import GlobalReducer from "../../../Global/Reducer/GlobalReducer";
import GlobalContext from "../../../Global/Context/GlobalContext";

const JoinRequestPopup = lazy(() => import('./Components/Join/JoinRequestPopup'));
const InviteUser = lazy(() => import('./Components/Modal/InviteUser/InviteUser'));


const initialState = {
    sunday: moment.utc().format("dddd") === "Sunday" ? true : false,
    monday: moment.utc().format("dddd") === "Monday" ? true : false,
    tuesday: moment.utc().format("dddd") === "Tuesday" ? true : false,
    wednesday: moment.utc().format("dddd") === "Wednesday" ? true : false,
    thursday: moment.utc().format("dddd") === "Thursday" ? true : false,
    friday: moment.utc().format("dddd") === "Friday" ? true : false,
    saturday: moment.utc().format("dddd") === "Saturday" ? true : false,
    ChangeTime:{time:moment().format('DD-MM-YYYY HH:mm:ss'),index:0,type:'none'},
    ConflictsEvents:[],
    AuthUserFiles:[],
    eventTitle: "",
    buttonPreloader: false,
    TimeOverlapped:false,
    TimeOverlappedIndex:[-1,-1],
    TimeOverlappedIndexSave:0,
    EventTimeZone: TimeZoneOffset,
    SelectedStartDate: [],
    SelectedEndDate: [],
    eventSingleDate: moment().format("DD-MM-YYYY"),
    SelectedStartTime: [`${moment(moment(), "hh:mm A").format("hh:mm")}`],
    SelectedEndTime: [],
    SelectWebinarType: "",
    showEventsOnCalendar:[],
    eventVisibility: "public",
    eventDuration: "00:15",
    eventDurationSlots: [],
    eventCostType: "free",
    eventRepeat: false,
    eventRepeatSave: false,
    eventRepeatBy: "",
    eventRepeatDays: [],
    eventCostSelect: false,
    eventSelectedDays: [],
    eventTillDate: moment()
        .add(15, "days")
        .format("YYYY-MM-DD"),
    repeatNumber: 1,
    eventAutoParticipants: false,
    eventCategory: "Category",
    eventSubCategory: "SubCategory",
    eventDescription: "",
    eventFileDescription: "",
    eventFileCost: 0,
    eventFileIds: [],
    eventTags: [],
    eventTag: "",
    eventImages: [],
    eventFiles: [],
    parentCategories: [],
    childCategories: [],
    eventCost: [],
    eventSeats: [],
    eventDiscount: "",
    eventFileUploaded: false,
    formValidation: false,
    formStep: 0,
    fileUploadProgress: 0,
    formSubmit: false,
    joinRequestContext: "",
    eventSelectedFiles: [],
    eventCropedImage: "",
    eventCropedUrl: "",
    eventFileMangerURL: [],
    FileUploadError: false,
    isLoading: false,
    isModalClose: false,
    isChecked: false,
    nextPage: "",
    loadMore: false,
    noMore: false,
    upload: true,
    choose: false,
    Preloader:true,
    RightCalendarWeekDates: {
        startDate:moment().subtract(moment().daysInMonth()>15?15:7,'days').format('YYYY-MM-DD'),
        endDate:moment().add(moment().daysInMonth()>15?15:7,'days').format('YYYY-MM-DD'),
    },
    Appointments:
        "Appointment - You will have all the controls and will be able to pass the controls to the participant. You can take back the controls any time you wish during the meeting.",
    Training:
        "Training - You will have all the controls and will be able to pass the controls to the participants, However they will not be able to pass the controls to anyone else. You can take back the controls any time you wish during the meeting.",
    Webinar:
        "Webinar - You will have all the controls, however passing the controls to another participant is not allowed.",
    Discussion:
        "Discussion - You will have all the controls and will be able to pass the controls to the participants. Participants will be able to pass controls to anybody in the room. However you can take back control any time you wish."
};
const CreateEventPage = () => {
    const [state, dispatch] = useReducer(CreateEventReducer, initialState);
    const [globalState, globalDispatch] = useContext(GlobalContext);
    // useEffect onload data 
    useEffect(() => {
        if(Auth.getAccessToken()){

        getCategories();
        }
        // setTimeout(() => {
            MyEventsList(state?.RightCalendarWeekDates);
        // }, 5000);
        return () => {
            dispatch({
                type: "getCategories",
                payload: { Type: "getCategories", parentCategories: [] ,childCategories:[]}
            });
            resetFormState();
        };
        
    }, []);
    // Get Parent or Child Categories Array[] for event create
    const getCategories = () => {
        ApiService.parentCategories()
            .then(res => {
                if (res.data.status === 200) {
                    dispatch({
                        type: "getCategories",
                        payload: {
                            Type: "getCategories",
                            parentCategories: res.data.data
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    
    // end categories

// onchange Calender
const onChangeCalendar = newDate => {
    MyEventsList({
        startDate:moment(newDate,'DD-MM-YYYY').subtract(1,'months').format('YYYY-MM-DD'),
        endDate:moment(newDate,'DD-MM-YYYY').add(1,'months').format('YYYY-MM-DD'),
    })
    if (moment(newDate, "DD-MM-YYYY") >= moment(moment(), "DD-MM-YYYY")) {
        dispatch({
            type: "ChangeCalendar",
            payload: {
                Type: "ChangeCalendar",
                eventSingleDate: moment(newDate).format("DD-MM-YYYY"),
                SelectedStartDate: [moment(newDate).format("DD-MM-YYYY")],
                SelectedEndDate: [moment(newDate).format("DD-MM-YYYY")],
                SelectedCalendarDate: newDate
            }
        });
    } else {
        dispatch({
            type: "ChangeCalendar",
            payload: {
                Type: "ChangeCalendar",
                eventSingleDate: moment(newDate).format("DD-MM-YYYY"),
                SelectedCalendarDate: newDate
            }
        });
        // toastr["error"]('Please select a date & time greater than current date & time');
    }
};
// on Drag select
const onDragSelect = newTime => {
    console.log(newTime, moment(newTime.startStr).format("YYYY-MM-DD HH:mm:ss Z"));
    resetFormState();
    let dateCheck = moment(newTime.startStr).tz(globalState?.timeZone) >= moment().tz(globalState?.timeZone);
    if (dateCheck) {
        let startTime = moment(newTime.start).tz(globalState?.timeZone).format("HH:mm:ss a");
        let endTime = moment(newTime.end).tz(globalState?.timeZone).format("HH:mm:ss a");
        let duration = moment(moment(newTime.endStr).tz(globalState?.timeZone)).diff(moment(newTime.startStr).tz(globalState?.timeZone),'minutes');
        let findDates = FindDateTime.findDaysBetweenTwoDates(newTime.start,newTime.end);
        if(moment(moment(newTime.endStr).tz(globalState?.timeZone)).diff(moment(newTime.startStr).tz(globalState?.timeZone),'Hours')>6){
            toastr["error"]('maximum event duration 6 hour only');
        }else{
            console.log(duration ,'duariton crate event ')
            if (findDates?.length > 0) {
                dispatch({
                    type: "onDragSelect",
                    payload: {
                        Type: "onDragSelect",
                        SelectedStartDate:moment(newTime.end).tz(globalState?.timeZone)>moment(newTime.start).tz(globalState?.timeZone)?[moment(newTime.start).tz(globalState?.timeZone).format('DD-MM-YYYY')]: findDates,
                        SelectedEndDate: moment(newTime.end).tz(globalState?.timeZone)>moment(newTime.start).tz(globalState?.timeZone)?[moment(newTime.end).tz(globalState?.timeZone).format('DD-MM-YYYY')]: findDates,
                        eventSingleDate: moment(newTime.start).tz(globalState?.timeZone).format(
                            "DD-MM-YYYY"
                        ),
                        repeatNumber:findDates.length > 1 ? findDates?.length : 0,
                        eventDurationSlots: [
                            {
                                startDateTime: moment(newTime.start).tz(globalState?.timeZone).format("DD-MM-YYYY HH:mm:ss"),
                                endDateTime: moment(newTime.end).tz(globalState?.timeZone).format("DD-MM-YYYY HH:mm:ss"),
                                cost: 0,
                                eventCostType: "free",
                                eventDuration: duration,
                                seats: 1,
                                interval:0
                            }
                        ]
                    }
                });
            } else {
                dispatch({
                    type: "eventSingleDate",
                    payload: {
                        Type: "eventSingleDate",
                        eventSingleDate: [
                            moment(newTime.start).tz(globalState?.timeZone).format("MM-DD-YYYY")
                        ],
                        eventDuration: duration
                    }
                });
            }
            $("#create-my-event-popup").modal({
                backdrop: "static",
                keyboard: false
            });
        }
        

        
    } else {
        toastr["error"](
            "Please select a date & time greater than current date & time"
        );
    }
    return true;
};
// onDragSelect Function End
// file manager handling function 
const removeSetImage = ImageId => {
    const filteredImages = state.eventImages.filter(
        images => images.id !== ImageId
    );
    dispatch({
        type: "eventImages",
        payload: {
            Type: "eventImages",
            eventImages: filteredImages,
            eventFiles:filteredImages,
        }
    });
    toastr["error"]("File Removed");
};
const onChangeWeeklyCalendar=(obj)=>{
  
}
const removeSetFiles = ImageId => {
    let filteredFiles = state.eventFileIds.filter(
        images => images.id !== ImageId
    );
    
    dispatch({
        type: "eventFileIds",
        payload: {
            Type: "eventFileIds",
            eventFileIds:filteredFiles
        }
    });
    console.log(state.eventFileIds,filteredFiles)
    toastr["error"]("File Removed");
};
// end file manager handling functions 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const MyEventsList = (obj) => {
    dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",Preloader:true}});
    
    if (obj!='') {
        const {startDate,endDate}=obj
        const {tz} ={tz:moment.tz.guess()}
        let data={
            startDate,
            endDate,
            tz
        }
        ApiService._myEvents(data)
            .then(res => {
                dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",Preloader:false}});
                if (res.data.status == 200) {
                    const eventsPush = [];
                    res.data.data?.Create.map((res, index) => {
                        eventsPush.push({
                            title: res.eventTitle,
                            meetingRoomId: res?.meetingRoomId,
                            rememberToken: res.rememberToken,
                            startTime: moment
                                .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD  HH:mm")
                                .local()
                                .format("DD-MM-YYYY HH:mm"),
                            endTime: moment
                                .utc(`${res.endDate} ${res.endTime}`, "YYYY-MM-DD  HH:mm")
                                .local()
                                .format("DD-MM-YYYY HH:mm"),
                            date: moment
                                .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD  HH:mm")
                                .local()
                                .toDate(),
                            eventId: res.id,
                            id: res.slotId,
                            status: res?.status,
                            host: 1,
                            booking: res?.booking,
                            expiredTime: moment().isAfter(
                                moment.utc(res?.startDateTime, "YYYY-MM-DD HH:mm").local()
                            ),
                            start: moment
                                .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD HH:mm")
                                .local()
                                .toDate(),
                            end: moment
                                .utc(`${res.endDate} ${res.endTime}`, "YYYY-MM-DD HH:mm")
                                .local()
                                .toDate(),
                            startDate: moment.utc(res.startDate, "YYYY-MM-DD").local(),
                            description: res.description,
                            backgroundColor:
                                res?.status == "disabled"
                                    ? "#6c757d"
                                    : moment().isAfter(moment.utc(res?.startDateTime, "YYYY-MM-DD HH:mm").local())
                                    ? "#aeadad96"
                                    : res?.booking > 0
                                    ? "#1caf00"
                                    : "#F9A03E"
                        });
                    });
                    const BookedEvents = [];
                    res.data.data?.Booked.map((res, index) => {
                        BookedEvents.push({
                            title: res.eventTitle,
                            meetingRoomId: res?.meetingRoomId,
                            rememberToken: res.rememberToken,
                            startTime: moment
                                .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD  HH:mm")
                                .local()
                                .format("DD-MM-YYYY HH:mm"),
                            endTime: moment
                                .utc(`${res.endDate} ${res.endTime}`, "YYYY-MM-DD  HH:mm")
                                .local()
                                .format("DD-MM-YYYY HH:mm"),
                            date: new Date(
                                moment
                                    .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD  HH:mm")
                                    .local()
                            ),
                            booking: res?.booking,
                            expiredTime:
                                moment() >
                                moment
                                    .utc(res?.startDateTime, "YYYY-MM-DD HH:mm")
                                    .local(),
                            eventId: res.id,
                            id: res.slotId,
                            status: res?.status,
                            host: 0,
                            start: new Date(
                                moment
                                    .utc(`${res.startDate} ${res.startTime}`, "YYYY-MM-DD  HH:mm")
                                    .local()
                            ),
                            end: new Date(
                                moment
                                    .utc(`${res.endDate} ${res.endTime}`, "YYYY-MM-DD  HH:mm")
                                    .local()
                            ),
                            startDate: moment
                                .utc(res.startDate, "YYYY-MM-DD")
                                .local(),
                            description: res.description,
                            backgroundColor:
                                res?.status == "disabled"
                                    ? "#6c757d"
                                    : moment() >
                                      moment
                                          .utc(res?.startDateTime, "YYYY-MM-DD HH:mm")
                                          .local()
                                    ? "#aeadad96"
                                    : "#4AC7B9"
                        });
                    });
                        dispatch({type:"showEventsOnCalendar",payload:{Type:"showEventsOnCalendar",Preloader:false,showEventsOnCalendar:[...eventsPush, ...BookedEvents]}});
                }
            })
            .catch(error => {     
            dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",Preloader:false}}); 
            console.log(error)
        });
    }
};
useEffect(() => {
        MyEventsList({
            startDate:moment.utc(state?.eventSingleDate,'DD-MM-YYYY').subtract(1,'months').local().format('YYYY-MM-DD'),
            endDate:moment.utc(state?.eventSingleDate,'DD-MM-YYYY').add(1,'months').local().format('YYYY-MM-DD'),
        });
    
    return () => {
        // dispatch((prevState) => {

        //                 return CreateEventReducer(prevState, {Type:"showEventsOnCalendar",showEventsOnCalendar:prevState?.showEventsOnCalendar});
        //               });
        // dispatch({type:"showEventsOnCalendar",payload:{Type:"showEventsOnCalendar",showEventsOnCalendar:[]}});

    };
}, [state.eventSingleDate]);
useEffect(() => {
    if(globalState?.responseEventId>0){
        MyEventsList({
            startDate: moment.utc(state?.eventSingleDate, 'DD-MM-YYYY').subtract(1, 'months').local().format('YYYY-MM-DD'),
            endDate: moment.utc(state?.eventSingleDate, 'DD-MM-YYYY').add(1, 'months').local().format('YYYY-MM-DD'),
        });
    }

  }, [globalState?.responseEventId])
// }, [state.RightCalendarWeekDates]);

// Cancel Participant Booking 
const CancelParticipantBooking=(slotId)=>{
    if(confirm('Are you sure you want to cancel?')){
        let data={
            eventSlotId:slotId,
            tz:moment.tz.guess()
        }
        ApiService._cancelBooking(data).then((res) => {
            if (res.data.status == 200) {
                toastr.error(res.data.message)
                MyEventsList(state?.RightCalendarWeekDates);
            }
            if (res.data.status == 'failed') {
                toastr.error(res.data.message)
            }
        }).catch((error) => {
            toastr.error('!oops server error');
            console.log(error);
    
        })
    }
}
//End Cancel Participant Booking 

const JoinRequestPopupHandling = SlotId => {
    $("#join-request-popup").modal({ backdrop: "static", keyboard: false });

    ApiService._joiningRequestPop(SlotId)
        .then(res => {
            if (res.data.status == 200) {
                dispatch({
                    type: "joinRequestContext",
                    payload: {
                        Type: "joinRequestContext",
                        joinRequestContext: res.data.data
                    }
                });
            }
            if (res.data.status == "failed") {
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// Submit Form

const handleFormSubmit = async e => {
    e.preventDefault();
    dispatch({
        type: "buttonPreloader",
        payload: {
            Type: "buttonPreloader",
            buttonPreloader:true
        }
    });
    if (FormValidation.formValidation(state)) {
        dispatch({
            type: "formSubmit",
            payload: {
                Type: "formSubmit",
                formSubmit: true
            }
        });

        const formData = {
            eventTitle: state.eventTitle,
            eventTimeZone: state.EventTimeZone,
            eventType: state.SelectWebinarType,
            eventStartDate: state.SelectedStartDate,
            eventEndDate: state.SelectedEndDate,
            eventStartTime: state.SelectedStartTime,
            eventEndTime: state.SelectedEndTime,
            eventAutoParticipants: state.eventAutoParticipants,
            eventCategory: state.eventCategory,
            eventDurationSlots: state.eventDurationSlots,
            eventCost: state.eventCost,
            eventCostType: state.eventCostType,
            eventDescription: state.eventDescription,
            eventDiscount: state.eventDiscount,
            eventDuration: state.eventDuration,
            eventFileCost: state.eventFileCost,
            eventFileDescription: state.eventFileDescription,
            eventImages: state.eventImages,
            eventFiles: state.eventFileIds,
            eventRepeat: state.eventRepeat,
            eventRepeatBy: state.eventRepeatBy,
            eventRepeatDays:state.eventRepeatDays,
            eventSubCategory: state.eventSubCategory,
            eventTags: state.eventTags,
            eventTillDate: state.eventTillDate,
            eventVisibility: state.eventVisibility,
            repeatNumber: state.repeatNumber,
            tz:globalState?.timeZone,
        };
        const response = await CreateEventService.PostCreateEventService(
            formData
        );
        if (response.data.status === 200) {
            toastr["success"](response.data.message);
            $("#create-my-event-step-6-popup").modal({
                backdrop: "static",
                keyboard: false
            });
            resetFormState();
            MyEventsList(state?.RightCalendarWeekDates);
            dispatch({
                type: "buttonPreloader",
                payload: {
                    Type: "buttonPreloader",
                    buttonPreloader:false
                }
            });
        }else{
            dispatch({
                type: "formSubmit",
                payload: {
                    Type: "formSubmit",
                    formSubmit: true,
                    buttonPreloader:false
                }
            });
        }
        if (response.data.status === "failed") {
            dispatch({
                type: "formSubmit",
                payload: {
                    Type: "formSubmit",
                    formSubmit: false
                }
            });
            let ErrorEventTitle =
                response.data.validation_error?.eventTitle;
            let ErrorEventDescription =
                response.data.validation_error?.eventDescription;
            let ErrorEventCost = response.data.validation_error?.eventCost;
            let ErrorEventCostType =
                response.data.validation_error?.eventCostType;
            let ErrorEventCategory =
                response.data.validation_error?.eventCategory;
            let ErrorEventSubCategory =
                response.data.validation_error?.eventSubCategory;
            let ErrorEventType = response.data.validation_error?.eventType;
            let ErrorEventFiles =
                response.data.validation_error?.eventFiles;
            let ErrorEventImages =
                response.data.validation_error?.eventImages;
            let ErrorEventTags = response.data.validation_error?.eventTags;
            let ErrorEventStartTime =
                response.data.validation_error?.eventStartTime;
            let ErrorEventEndTime =
                response.data.validation_error?.eventEndTime;
            let ErrorEventEndDate =
                response.data.validation_error?.eventEndDate;
            let ErrorEventStartDate =
                response.data.validation_error?.eventStartDate;
            let ErrorEventVisibility =
                response.data.validation_error?.eventVisibility;
            let ErrorEventRepeatNumber =
                response.data.validation_error?.repeatNumber;
            let ErrorEventDiscount =
                response.data.validation_error?.eventDiscount;
            let ErrorEventDuration =
                response.data.validation_error?.eventDuration;
            let ErrorEventFileDescription =
                response.data.validation_error?.eventFileDescription;

            if (ErrorEventFileDescription) {
                FormErrors.responseValidationError(
                    ErrorEventFileDescription
                );
            }
            if (ErrorEventImages) {
                FormErrors.responseValidationError(ErrorEventImages);
            }

            if (ErrorEventVisibility) {
                FormErrors.responseValidationError(ErrorEventVisibility);
            }
            if (ErrorEventDiscount) {
                FormErrors.responseValidationError(ErrorEventDiscount);
            }
            if (ErrorEventDuration) {
                FormErrors.responseValidationError(ErrorEventDuration);
            }
            if (ErrorEventRepeatNumber) {
                FormErrors.responseValidationError(ErrorEventRepeatNumber);
            }
            if (ErrorEventTitle) {
                FormErrors.responseValidationError(ErrorEventTitle);
            }
            if (ErrorEventDescription) {
                FormErrors.responseValidationError(ErrorEventDescription);
            }
            if (ErrorEventCost) {
                FormErrors.responseValidationError(ErrorEventCost);
            }
            if (ErrorEventCostType) {
                FormErrors.responseValidationError(ErrorEventCostType);
            }
            if (ErrorEventCategory) {
                FormErrors.responseValidationError(ErrorEventCategory);
            }
            if (ErrorEventSubCategory) {
                FormErrors.responseValidationError(ErrorEventSubCategory);
            }
            if (ErrorEventType) {
                FormErrors.responseValidationError(ErrorEventType);
            }
            if (ErrorEventFiles) {
                FormErrors.responseValidationError(ErrorEventFiles);
            }
            if (ErrorEventTags) {
                FormErrors.responseValidationError(ErrorEventTags);
            }
            if (ErrorEventStartTime) {
                FormErrors.responseValidationError(ErrorEventStartTime);
            }
            if (ErrorEventEndTime) {
                FormErrors.responseValidationError(ErrorEventEndTime);
            }
            if (ErrorEventEndDate) {
                FormErrors.responseValidationError(ErrorEventEndDate);
            }
            if (ErrorEventStartDate) {
                FormErrors.responseValidationError(ErrorEventStartDate);
            }
        }
    } else {
        dispatch({
            type: "buttonPreloader",
            payload: {
                Type: "buttonPreloader",
                buttonPreloader:false
            }
        });
        toastr["error"]("form validation failed");
    }
};

const CheckIsValue = ({ host, dots }) => {
    return dots ? (
        <ul className="cmn-ul-list calendar-dots">
            <li>
                {host == 1 ? (
                    <div className="d-i-p-bx ">
                        <i>&nbsp;</i>
                    </div>
                ) : host == 0 ? (
                    <div className="d-i-p-bx d-i-green calendar-dots-green">
                        <i>&nbsp;</i>
                    </div>
                ) : host == 3 ? (
                    <div className="d-i-p-bx d-i-blue calendar-dots-blue">
                        <i>&nbsp;</i>
                    </div>
                ) : (
                    ""
                )}
            </li>
        </ul>
    ) : (
        ""
    );
};

const CalenderDots = ({ date, view }) => {
    // if (view == "month")
    //     return state.showEventsOnCalendar?.find(res =>(moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY") && res.host === 0 && res.host === 1))? 
    //     (
    //         <CheckIsValue host={3} dots={true} />
    //     ) : state.showEventsOnCalendar?.find(res =>(moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY") && res.host === 0&&res.host != 1)) ? 
    //     (
    //         <CheckIsValue host={0} dots={true} />
    //     ) : state.showEventsOnCalendar?.find(res =>(moment(res.startTime, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY") == moment(date).format("DD-MM-YYYY") && res.host === 1 && res.host !=0)) ?
    //     (
    //         <CheckIsValue host={1} dots={true} />
    //     ) : ("");
    // return;

    if (view == "month"){

//     const filteredHostOneAndZero = state?.showEventsOnCalendar?.filter(res =>
// state?.showEventsOnCalendar.some(
//             otherObj =>
//                 otherObj.host === 1 && moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")
//         ) &&
//         state?.showEventsOnCalendar.some(otherObj =>otherObj.host === 0 && moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")
//         )
//     );
    
//     const filteredHostZero = state?.showEventsOnCalendar?.filter(res =>
//         state?.showEventsOnCalendar.some(
//             otherObj =>
//                 otherObj.host === 0 && moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")
//         )
//     );
    
//     const filteredHostOne = state?.showEventsOnCalendar?.filter(res =>
//         state?.showEventsOnCalendar.some(
//             otherObj =>
//                 otherObj.host === 1 && moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY")
//         )
//     );
    
//     return filteredHostOneAndZero.length > 0 ? (
//         <CheckIsValue host={3} dots={true} />
//     ) : filteredHostZero.length > 0 ? (
//         <CheckIsValue host={0} dots={true} />
//     ) : filteredHostOne.length > 0 ? (
//         <CheckIsValue host={1} dots={true} />
//     ) : ("");
//     }
const hasHostOneAndZero = state?.showEventsOnCalendar?.some(
    (res) => moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY") && res.host === 1 && res.host === 0
);

const hasHostZero = state?.showEventsOnCalendar?.some((res) => moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY") &&res.host === 0&& res.host != 1);

const hasHostOne = state?.showEventsOnCalendar?.some((res) => moment(res.date, "DD-MM-YYYY").format("DD-MM-YYYY") === moment(date).format("DD-MM-YYYY") && res.host === 1 && res.host != 0);
if (hasHostZero&&hasHostOne) {
    return <CheckIsValue host={3} dots={true} />;
}else if(hasHostZero) {
    return <CheckIsValue host={0} dots={true} />;
}else if(hasHostOne) {
        return <CheckIsValue host={1} dots={true} />;
}
}
return null; // or return an empty string or other default component if none of the conditions match

    return;
};
// reset State of the createEvent 
const resetFormState = () =>dispatch({ type: "Reset", payload:{Type:"Reset",  sunday: moment.utc().format("dddd") === "Sunday" ? true : false,
monday: moment.utc().format("dddd") === "Monday" ? true : false,
tuesday: moment.utc().format("dddd") === "Tuesday" ? true : false,
wednesday: moment.utc().format("dddd") === "Wednesday" ? true : false,
thursday: moment.utc().format("dddd") === "Thursday" ? true : false,
friday: moment.utc().format("dddd") === "Friday" ? true : false,
saturday: moment.utc().format("dddd") === "Saturday" ? true : false,
ChangeTime:{time:moment().format('DD-MM-YYYY HH:mm:ss'),index:0,type:'none'},
ConflictsEvents:[],
AuthUserFiles:[],
eventTitle: "",
TimeOverlapped:false,
TimeOverlappedIndex:[-1,-1],
TimeOverlappedIndexSave:0,
EventTimeZone: TimeZoneOffset,
SelectedStartDate: [],
buttonPreloader: false,
SelectedEndDate: [],
eventSingleDate: moment().format("DD-MM-YYYY"),
SelectedStartTime: [`${moment(moment(), "hh:mm A").format("hh:mm")}`],
SelectedEndTime: [],
SelectWebinarType: "",
// showEventsOnCalendar:[],
eventVisibility: "public",
eventDuration: "00:15",
eventDurationSlots: [],
eventCostType: "free",
eventRepeat: false,
eventRepeatSave: false,
eventRepeatBy: "",
eventRepeatDays: [],
eventCostSelect: false,
eventSelectedDays: [],
eventTillDate: moment()
    .add(15, "days")
    .format("YYYY-MM-DD"),
repeatNumber: 1,
eventAutoParticipants: false,
eventCategory: "Category",
eventSubCategory: "SubCategory",
eventDescription: "",
eventFileDescription: "",
eventFileCost: 0,
eventFileIds: [],
eventTags: [],
eventTag: "",
eventImages: [],
eventFiles: [],
eventCost: [],
eventSeats: [],
eventDiscount: "",
eventFileUploaded: false,
formValidation: false,
formStep: 0,
fileUploadProgress: 0,
formSubmit: false,
joinRequestContext: "",
eventSelectedFiles: [],
eventCropedImage: "",
eventCropedUrl: "",
eventFileMangerURL: [],
FileUploadError: false,
isLoading: false,
isModalClose: false,
isChecked: false,
nextPage: "",
loadMore: false,
noMore: false,
upload: true,
choose: false,
RightCalendarWeekDates: "",
Appointments:
    "Appointment - You will have all the controls and will be able to pass the controls to the participant. You can take back the controls any time you wish during the meeting.",
Training:
    "Training - You will have all the controls and will be able to pass the controls to the participants, However they will not be able to pass the controls to anyone else. You can take back the controls any time you wish during the meeting.",
Webinar:
    "Webinar - You will have all the controls, however passing the controls to another participant is not allowed.",
Discussion:
    "Discussion - You will have all the controls and will be able to pass the controls to the participants. Participants will be able to pass controls to anybody in the room. However you can take back control any time you wish."} });
    console.log(state.eventDurationSlots, state,`createEvent main page`);
    const StateValue=[state,dispatch,resetFormState,onChangeCalendar,onDragSelect,removeSetImage,removeSetFiles,MyEventsList,CancelParticipantBooking,JoinRequestPopupHandling,handleFormSubmit,CalenderDots,onChangeWeeklyCalendar];
    return (
        <>
            <CreateEventContext.Provider value={StateValue}>
                <main className="calender-events">
                    <TopNavbar />
                    {/* <FilterPopup /> */}
                    <CreateEventPageSection resetFormState={resetFormState} />
                    <StepOne resetFormState={resetFormState} />
                    <StepTwo resetFormState={resetFormState} />
                    <StepThree
                        resetFormState={resetFormState}
                        removeSetImage={removeSetImage}
                    />
                    <StepFour
                        resetFormState={resetFormState}
                        handleFormSubmit={handleFormSubmit}
                        removeSetFiles={removeSetFiles}
                    />
                    <StepFive />
                    <JoinRequestContext.Provider value={state.joinRequestContext}>
                        <JoinRequestPopup JoinUserRequest={JoinRequestPopupHandling} />
                    </JoinRequestContext.Provider>
                    <InviteUser value={state} />
                    {/* <QuickReply /> */}
                </main>
            </CreateEventContext.Provider>
        </>
    );
};

export default React.memo(CreateEventPage);
