import React,{useContext, useEffect, useReducer} from 'react';
import moment from 'moment';
import 'moment-timezone';
import Reducer from '../../../utility/Reducer';
import EditEventContext from './EditEventContext/EditEventContext';
import EditStepTwo from './EditStepTwo';
import EventEditFollowing from './Models/EventEditFollowing';
import GlobalContext from '../../../Global/Context/GlobalContext';
import { ApiService } from '../../../ApiServer/ApiService';
import EditStepThree from './EditStepThree';
import EditStepFour from './EditStepFour';
import EditRepeat from './Components/EditRepeat/EditRepeat';
import ConflictsEvents from '../CreateEvent/Components/Modal/ConflictsEvents/ConflictsEvents';
import DeleteEventByFollowing from './Models/DeleteEventByFollowing';
import CancelEventByFollowing from './Models/CancelEventByFollowing';
import TImeChangeModal from './Models/TimeChangeModal/TImeChangeModal';
import EditStepFive from './EditStepFive';
import DisableEventByFollowing from './Models/DisableEventByFollowing';
import EventHandlingServices from '../../../ApiServer/EventHandling/EventHandlingServices';
import Auth from '../../../Routes/Auth';
const initialState = {
   FollowingBy:'',
   deleteBy:'',
   cancelBy:'',
   disableBy:'',
   EventId:0,
   SlotId:0,
   buttonPreloader:false,
   ConflictsEvents:[],
   TimeOverlapped:false,
   TimeOverlappedIndex:[-1,-1],
   ChangeTime:{time:moment().format('YYYY-MM-DD HH:mm:ss'),index:0,type:'none'},
   event_title:'',
   eventFileIds:[],
   event_type:'',
   event_description:'',
   event_visible:'',
   event_repeat_type:'',
   event_repeat_interval:1,
   event_repeat_days:[],
   event_start_dates:[],
   event_end_dates:[],
   eventRepeatSave:true,
   eventRepeat: false,
   event_sub_category:'SubCategory',
   event_category:'Category',
   event_tags:[],
   eventTag: "",
   event_till_date:moment()
   .add(15, "days")
   .format("YYYY-MM-DD"),
   event_time_slot:[],
   delete_event_time_slot:[],
   event_files:[],
   delete_event_download_file:[],
   event_download_file:[],
   parentCategories: [],
   childCategories: [],
   eventImages:[],

};
const EditEventSection = () => {
const [state, dispatch] = useReducer(Reducer, initialState);
const [globalState, globalDispatch] = useContext(GlobalContext);


// fetch categories
useEffect(() => {
    if(Auth.getAccessToken()){
    
    getCategories();
    }
    return () => {
        dispatch({
            type: "getCategories",
            payload: { Type: "getCategories", parentCategories: [] }
        });
        // resetFormState();
    };
    return ()=>{
        // reset init state 
    }
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

const getChildCategories = (id) => {
    ApiService.childCategories({parentId:id}).then(res => {
            if (res.data.status === 200) {
                dispatch({
                    type: "getCategories",
                    payload: {
                        Type: "getCategories",
                        childCategories: res.data.data
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
// end fetch categories
// :::::::::: end Categories :::::::::

// handle response on edit get data by Event and slot id
const handleFollowingResponse =(e)=>{
    e.preventDefault();
    $("#EditFollowingEventModal").modal('hide'); 
    let data={
        FollowingBy:state.FollowingBy,
        EventId:globalState?.EventEditId,
        SlotId:globalState?.eventSlotEditId,
        tz:moment.tz.guess(),
    }
    if(state.FollowingBy!=''&&globalState?.EventEditId>0&&globalState?.eventSlotEditId>0){
    $("#edit-create-myevent-step-2").modal({backdrop: 'static', keyboard: false}); 
        ApiService._editMyEventsFetch(data).then((res)=>{
            if(res.data.status==200){
                // console.log(res?.data?.data?.event_time_slot.sort((a,b)=>a-b)[0],'')
                let eventFile=res?.data?.data?.event_file;
                eventFile.map((res)=> res['file_cost_type']=res?.file_cost>0?"paid":"free");
                dispatch({type:"eventData",payload:{Type:"eventData",
                event_title:res?.data?.data?.event_title,
                event_type:res?.data?.data?.event_type,
                event_date:res?.data?.data?.event_start_dates?.length>0?moment(res?.data?.data?.event_start_dates.reduce(function (a, b) { return a < b ? a : b; }),'YYYY-MM-DD').format('YYYY-MM-DD'):moment().format('YYYY-MM-DD'),
                event_till_date:res?.data?.data?.event_end_dates?.length>0?moment(res?.data?.data?.event_end_dates.reduce(function (a, b) { return a > b ? a : b; }),'YYYY-MM-DD').format('YYYY-MM-DD'):moment()
                .add(15, "days")
                .format("YYYY-MM-DD"),
               
                event_description:res?.data?.data?.event_description,
                event_visible:res?.data?.data?.event_visible=="0"?"private":"public",
                event_sub_category:res?.data?.data?.event_sub_category,
                event_category:res?.data?.data?.event_category,
                event_tags:JSON.parse(res?.data?.data?.event_tags),
                event_time_slot:res?.data?.data?.event_time_slot,
                event_files:JSON.parse(res?.data?.data?.event_files),
                event_repeat_type:res?.data?.data?.event_repeat_type,
                eventRepeatSave:res?.data?.data?.event_repeat_type==""?false:true,
                eventRepeat:res?.data?.data?.event_repeat_type==""?false:true,
                event_repeat_days:JSON.parse(res?.data?.data?.event_repeat_by_day),
                event_repeat_interval:res?.data?.data?.event_repeat_interval,
                event_start_dates:res?.data?.data?.event_start_dates,
                event_end_dates:res?.data?.data?.event_end_dates,
                event_download_file:eventFile}})
                
                getChildCategories(res?.data?.data?.event_category)
            }
            if(res.data.status==="failed"){
                toastr['error']('!Something wrong')
                $(".modal").modal('hide'); 

            }
           })
    }else if(state.FollowingBy='ThisEvent'&&globalState?.EventEditId>0){
    $("#edit-create-myevent-step-2").modal({backdrop: 'static', keyboard: false}); 
        ApiService._editMyEventsFetch(data).then((res)=>{
            if(res.data.status==200){
                // console.log(res?.data?.data?.event_time_slot.sort((a,b)=>a-b)[0],'')
                let eventFile=res?.data?.data?.event_file;
                eventFile.map((res)=> res['file_cost_type']=res?.file_cost>0?"paid":"free");
                dispatch({type:"eventData",payload:{Type:"eventData",
                event_title:res?.data?.data?.event_title,
                event_type:res?.data?.data?.event_type,
                event_date:res?.data?.data?.event_start_dates?.length>0?moment(res?.data?.data?.event_start_dates.reduce(function (a, b) { return a < b ? a : b; }),'YYYY-MM-DD').format('YYYY-MM-DD'):moment().format('YYYY-MM-DD'),
                event_till_date:res?.data?.data?.event_end_dates?.length>0?moment(res?.data?.data?.event_end_dates.reduce(function (a, b) { return a > b ? a : b; }),'YYYY-MM-DD').format('YYYY-MM-DD'):moment()
                .add(15, "days")
                .format("YYYY-MM-DD"),
               
                event_description:res?.data?.data?.event_description,
                event_visible:res?.data?.data?.event_visible=="0"?"private":"public",
                event_sub_category:res?.data?.data?.event_sub_category,
                event_category:res?.data?.data?.event_category,
                event_tags:JSON.parse(res?.data?.data?.event_tags),
                event_time_slot:res?.data?.data?.event_time_slot,
                event_files:JSON.parse(res?.data?.data?.event_files),
                event_repeat_type:res?.data?.data?.event_repeat_type,
                eventRepeatSave:res?.data?.data?.event_repeat_type==""?false:true,
                eventRepeat:res?.data?.data?.event_repeat_type==""?false:true,
                event_repeat_days:JSON.parse(res?.data?.data?.event_repeat_by_day),
                event_repeat_interval:res?.data?.data?.event_repeat_interval,
                event_start_dates:res?.data?.data?.event_start_dates,
                event_end_dates:res?.data?.data?.event_end_dates,
                event_download_file:eventFile}})
                
                getChildCategories(res?.data?.data?.event_category)
            }
            if(res.data.status==="failed"){
                toastr['error']('!Something wrong')
                $(".modal").modal('hide'); 

            }
           })
    }else{
        toastr['error']('!Something wrong')
        $(".modal").modal('hide'); 
    }
}
const parentFunction = (eventId) => {
   
    return eventId;
  };

// edit on Change following popup
const onChangeFollowing =(e)=>{
    let name = e.target.name;
    let value=e.target.value;
    dispatch({type:"FollowingBy",payload:{Type:"FollowingBy",FollowingBy:value}})
 }
//  cancel edit event following popup
const CancelFollowing =(e)=>{
    globalDispatch({type:"EditEvent",payload:{Type:"EditEvent",EventEditId:0,EventEditSlotId:0}}); 
    dispatch({type:"FollowingBy",payload:{Type:"FollowingBy",FollowingBy:''}})
 }


// delete events
const handleDeleteResponse =(e)=>{
    e.preventDefault(); 
    let data={
        FollowingBy:state.deleteBy,
        EventId:globalState?.eventDeleteId,
        SlotId:globalState?.eventDeleteSlotId,
        tz:moment.tz.guess(),
    }
    if(state.deleteBy!=''&&(globalState?.eventDeleteId>0||globalState?.eventDeleteSlotId>0)){
        ApiService._DeleteMyFollowingEvent(data).then((res)=>{
            if(res.data.status==200){
                toastr['error'](res.data?.messages)
                setTimeout(() => {
                 globalDispatch({type:"responseEventId",payload:{Type:"responseEventId",responseEventId:globalState?.eventDeleteId}})   
                }, 2000);
            }
            $("#DeleteFollowingEventModal").modal('hide'); 
            if(res.data.status==="failed"){
                toastr['error'](res.data?.messages)
            }
           })
    }else{
        toastr['error']('!server error')
    }
}

// delete on Change following popup
const onChangeDeleteEventFollowing =(e)=>{
    let name = e.target.name;
    let value=e.target.value;
    console.log(name,value,'response');
    dispatch({type:"deleteBy",payload:{Type:"deleteBy",deleteBy:value}})
}
//  cancel delete event following popup
const CancelDeleteEventFollowing =(e)=>{
    globalDispatch({type:"EditEvent",payload:{Type:"EditEvent",EventEditId:0,EventEditSlotId:0}}); 
    dispatch({type:"FollowingBy",payload:{Type:"FollowingBy",FollowingBy:''}})
}

// CancelStatus events
const handleCancelStatusResponse =(e)=>{
    e.preventDefault(); 
    let data={
        FollowingBy:state.cancelBy,
        EventId:globalState?.eventCancelId,
        SlotId:globalState?.eventCancelSlotId,
        tz:moment.tz.guess(),
    }
    if(globalState?.eventCancelId>0&&globalState?.eventCancelSlotId>0){
        ApiService._CancelMyFollowingEvent(data).then((res)=>{
            if(res.data.status==200){
                toastr['error'](res.data?.messages)
                setTimeout(() => {
                globalDispatch({type:"responseEventId",payload:{Type:"responseEventId",responseEventId:globalState?.eventCancelId}})
                    
                }, 2000);
            }
            $("#CancelFollowingEventModal").modal('hide'); 
            if(res.data.status==="failed"){
                toastr['error'](res.data?.messages)
            }
           })
    }else{
        toastr['error']('!server error')
    }
}

// CancelStatus on Change following popup
const onChangeCancelStatusEventFollowing =(e)=>{
    let name = e.target.name;
    let value=e.target.value;
    console.log(name,value,'response');
    dispatch({type:"cancelBy",payload:{Type:"cancelBy",cancelBy:value}})
}
//  cancel delete event following popup
const CancelStatusEventFollowing =(e)=>{
    globalDispatch({type:"EditEvent",payload:{Type:"EditEvent",eventCancelId:0,eventCancelSlotId:0}}); 
    dispatch({type:"FollowingBy",payload:{Type:"FollowingBy",cancelBy:''}})
}
 
// disable Handle Events and slot
// disable events
const handleDisableResponse  =async(e)=>{
    e.preventDefault(); 

    let data={
        FollowingBy:state?.disableBy,
        EventId:globalState?.eventDisableId,
        SlotId:globalState?.eventDisableSlotId,
        tz:moment.tz.guess(),
    }
    if(state.disabledBy!=''&&globalState?.eventDisableId>0&&globalState?.eventDisableSlotId>0){
        ApiService._DisableMyFollowingEvent(data).then((res)=>{
            $('#DisableFollowingEventModal').modal('hide');

            if(res.data.status==200){

                setTimeout(() => {
                    globalDispatch({type:"responseEventId",payload:{Type:"responseEventId",responseEventId:globalState?.eventDisableId}})
                    
                }, 2000);
                return toastr["success"](res.data.messages);

             }else if(res.data.status=='failed'){
                return toastr["error"](res.data.messages);
             }
        }).catch((error)=>{
            console.log(error)
        }); 

    }else{
        toastr['error']('!server error')
    }

      
}

// disable on Change following popup
const DisableOnchangeEventFollowing =(e)=>{
    let name = e.target.name;
    let value=e.target.value;
    dispatch({type:"disableBy",payload:{Type:"disableBy",disableBy:value}})
}
//  disable event following popup
const CancelDisableEventFollowing =(e)=>{
    globalDispatch({type:"CancelDisableEventFollowing",payload:{Type:"CancelDisableEventFollowing",eventDisableId:0,eventDisableSlotId:0}}); 
    dispatch({type:"FollowingBy",payload:{Type:"FollowingBy",disableBy:''}})
}
// end disable event
const checkConflictsOfEvents=(eve)=>{
    // return false;
    let data={
        "startDateTime": state?.event_start_dates,
        "endDateTime": state?.event_end_dates,
        "eventDurationSlots":state?.event_time_slot,
        "eventRepeatBy":state?.event_repeat_type,
        "FollowingBy":state?.FollowingBy,
        "tz":moment.tz.guess(),

    }
    ApiService.EditEventTimeConflictsChecks(data).then((res)=>{
        if(res.data.status==200){
                $(eve).modal({ backdrop: 'static', keyboard: false })
            $('#edit-create-myevent-step-3').modal('hide');
        }else if(res.data.status=="events"){
            dispatch({type:'ConflictsEvents',payload:{Type:'ConflictsEvents', ConflictsEvents:res.data.data}});
            toastr["error"](
                "Conflict Error"
            );
            $('#Conflicts-Events-modal').modal('show');
        }else{
            dispatch({type:'ConflictsEvents',payload:{Type:'ConflictsEvents', ConflictsEvents:[]}});

            toastr["error"](
                "Conflict Error"
            );
        }
    }).catch((error)=>{
        toastr["error"](
            "!server error"
        );
        // $(eve).modal({ backdrop: 'static', keyboard: false })
        console.log(error,'error');
    })
}
// Update Event handle
const editFormValidation=(state)=>{
return true;
}
const handleUpdateEventFormSubmit = async e => {
    e.preventDefault();
    dispatch({
        type: "BUTTON_PRELOADER",
        payload: {
            Type: "BUTTON_PRELOADER",
            buttonPreloader: true
        }
    });
    if (editFormValidation(state)) {
        // dispatch({
        //     type: "formSubmit",
        //     payload: {
        //         Type: "formSubmit",
        //         formSubmit: true
        //     }
        // });

        const formData = {
            EventId:globalState?.EventEditId,
            SlotId:globalState?.eventSlotEditId,
            eventStartDate: state.event_start_dates,
            eventEndDate: state.event_end_dates,
            eventDurationSlots: state?.event_time_slot,
            eventDescription: state?.event_description,
            eventImages: state.event_files,
            followingBy: state?.FollowingBy,
            eventFiles: state.event_download_file,
            removedEventFiles: state.delete_event_download_file,
            removedEventSlot: state.delete_event_time_slot,
            eventRepeat: state?.eventRepeat,
            eventRepeatBy: state?.event_repeat_type,
            eventRepeatDays:state?.event_repeat_days,
            eventTags: state?.event_tags,
            eventTillDate: state?.event_till_date,
            eventVisibility: state?.event_visible,
            repeatNumber: state?.event_repeat_interval,
            tz:moment.tz.guess(),
        };
     ApiService._updateEvent(formData).then((response)=>{
        dispatch({
            type: "BUTTON_PRELOADER",
            payload: {
                Type: "BUTTON_PRELOADER",
                buttonPreloader: false
            }
        });
            if (response.data.status === 200) {
                toastr["success"](response.data.message);
                $("#edit-my-event-step-6-popup").modal({
                    backdrop: "static",
                    keyboard: false
                });
                // resetFormState();
                // MyEventsList();
            }
            if (response.data.status === "failed") {
                dispatch({
                    type: "formSubmit",
                    payload: {
                        Type: "formSubmit",
                        formSubmit: false
                    }
                });
                toastr["error"](response.data.message);
                
            }
        }).catch((error)=>{
            dispatch({
                type: "BUTTON_PRELOADER",
                payload: {
                    Type: "BUTTON_PRELOADER",
                    buttonPreloader: false
                }
            });
        });
        
        
    } else {
        dispatch({
            type: "BUTTON_PRELOADER",
            payload: {
                Type: "BUTTON_PRELOADER",
                buttonPreloader: false
            }
        });
        toastr["error"]("form validation failed");
    }
};
// Repeat Event Actions all

console.log(state,'editstate',state?.ChangeTime)
    return (
            <>
            <EditEventContext.Provider value={[state,dispatch,handleUpdateEventFormSubmit]}>
            {/* <EditStepOne /> */}
            <EditStepTwo conflictCheck={checkConflictsOfEvents}/>
            <EditStepThree/>
            <EditStepFour/>
            <EditStepFive/>
            <CancelEventByFollowing handleSubmit={handleCancelStatusResponse} cancel={CancelStatusEventFollowing} onChange={onChangeCancelStatusEventFollowing} value={state?.cancelBy}/>
            <DisableEventByFollowing handleSubmit={handleDisableResponse} cancel={CancelDisableEventFollowing} onChange={DisableOnchangeEventFollowing} value={state?.disableBy}/>
            <DeleteEventByFollowing handleSubmit={handleDeleteResponse} cancel={CancelDeleteEventFollowing} onChange={onChangeDeleteEventFollowing} value={state?.deleteBy}/>
            <EventEditFollowing handleSubmit={handleFollowingResponse} cancel={CancelFollowing} onChange={onChangeFollowing} value={state?.FollowingBy}/>
            <EditRepeat />
            <TImeChangeModal/>
            <ConflictsEvents events={state?.ConflictsEvents}/>
            </EditEventContext.Provider>

            </>
            );
}
export default EditEventSection;