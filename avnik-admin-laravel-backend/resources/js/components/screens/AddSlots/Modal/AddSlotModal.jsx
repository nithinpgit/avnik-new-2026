import React, { useContext ,useState, useEffect, useReducer} from 'react';
import EventAddTime from '../Components/EventAddTime/EventAddTime';
import moment from 'moment';
import RepeatEvery from './RepeatEveryModal/RepeatEvery';

import { ApiService } from '../../../../ApiServer/ApiService';
import ConflictsEvents from './ConflictsEvents/ConflictsEvents';
import TImeChangeModal from './TimeChangeModal/TImeChangeModal';
import reducer from '../../../Home/Cards/HomeReducer/HomeReducer';
import Context from '../../../../store/Context';
import GlobalContext from '../../../../Global/Context/GlobalContext';
const initialState={
    eventDurationSlots:[],
    EventId:0,
    SlotId:0,
    eventRepeat: false,
    eventRepeatSave: false,
    eventRepeatBy: "",
    eventRepeatDays: [],
    ConflictsEvents:[],
    TimeOverlapped:false,
    TimeOverlappedIndex:[-1,-1],
    ChangeTime:{time:moment().format('YYYY-MM-DD HH:mm:ss'),index:0,type:'none'},
    event_title:'',
    eventFileIds:[],
    SelectedStartDate: [],
    SelectedEndDate: [],
    eventSingleDate: moment().format("DD-MM-YYYY"),
    SelectedStartTime: [`${moment(moment(), "hh:mm A").format("hh:mm")}`],
    SelectedEndTime: [`${moment(moment(), "hh:mm A").add(30,'minutes').format("hh:mm")}`],
    event_type:'',
    event_description:'',
    event_visible:'',
    event_repeat_type:'',
    event_repeat_interval:1,
    event_repeat_days:[],
    event_start_dates:[],
    eventSingleDate: moment().format("DD-MM-YYYY"),
    event_end_dates:[],
    // eventRepeatSave:true,
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
}
const AddSlotModal =({resetFormState})=> {
const [state,dispatch] = useReducer(reducer,initialState);
const [globalState,globalDispatch] = useContext(GlobalContext);
const [next, setNext] = useState(true);
const [BTNContinue, setBTNContinue] = useState(0);
const [back, setBack] = useState(true);
const { eventTillDate, EventTimeZone, eventAutoParticipants, eventDurationSlots,eventVisibility, repeatNumber, eventRepeatBy, eventTitle, SelectedStartDate, SelectedEndDate, SelectedStartTime, SelectedEndTime } = state;    
   const handleSubmit=(e)=>{
          e.preventDefault();
        let data={
            "startDateTime": SelectedStartDate,
            "endDateTime": SelectedEndDate,
            "eventId": globalState?.AddSlotEventId,
            "eventDurationSlots":eventDurationSlots,
            "eventRepeatBy":eventRepeatBy,
        }
        ApiService._addEventSlots(data).then((res)=>{
            if(res.data.status==200){
                $('#AddSlotsModal').modal('hide');
                resetState();
            }else if(res.data.status=="events"){
                dispatch({type:'ConflictsEvents',payload:{Type:'ConflictsEvents', ConflictsEvents:res.data.data}});
                toastr["error"](
                    "Conflict Error"
                );
                $('#addSlot-Conflicts-Events-modal').modal('show');
            }else{
                toastr["error"](
                    "Conflict Error"
                );
            }
        }).catch((error)=>{
            console.log(error,'error');
        })
    }
    useEffect(() => {
        onAddTime();

        return () => {
            
        };
    }, [])
    function addQuarterHourToDate(originalDate) {
        // Create a Moment.js object from the original date
        const momentObj = moment(originalDate,'DD-MM-YYYY HH:mm:ss');
        // Get the current minutes
        const currentMinutes = momentObj.minutes();
        // Calculate the next closest quarter-hour
        const nextQuarterHour = Math.ceil(currentMinutes / 15) * 15;
        // Set the minutes to the next closest quarter-hour
        momentObj.minutes(nextQuarterHour);
        // If you want the result as a JavaScript Date object, you can use toDate():
        const newDate = momentObj.toDate();
        return moment(newDate,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss');
    }
    function getCurrentStartAndEndTime() {
      // Get the current time
      const currentTime = moment();
    
      // Calculate the end time by adding 15 minutes to the current time
      const endTime = currentTime.clone().add(15, 'minutes');
    
      // Format the times as strings
      const startTimeString = currentTime.format('HH:mm:ss');
      const endTimeString = endTime.format('HH:mm:ss');
    
      // Return an object with start and end times
      return {
        startTimeFUN: startTimeString,
        endTimeFUN: endTimeString,
      };
    }

    const onAddTime = () => {
        console.log('addSlotModal')

        const { startTimeFUN, endTimeFUN }= getCurrentStartAndEndTime();

        // let startTime = moment(
        //   state.eventSingleDate + " " + moment().format("HH:mm:ss"),
        //   "DD-MM-YYYY HH:mm:ss"
        // ).format("DD-MM-YYYY HH:mm:ss");
        // let endTime = moment(
        //   state.eventSingleDate + " " + moment().format("HH:mm:ss"),
        //   "DD-MM-YYYY HH:mm:ss"
        // ).format("DD-MM-YYYY HH:mm:ss");
        let startTime =addQuarterHourToDate(moment(
            state.eventSingleDate + " " + startTimeFUN,
            "DD-MM-YYYY HH:mm:ss"
          ).format("DD-MM-YYYY HH:mm:ss"));
          let endTime = addQuarterHourToDate(moment(
            state.eventSingleDate + " " + endTimeFUN,
            "DD-MM-YYYY HH:mm:ss"
          ).format("DD-MM-YYYY HH:mm:ss"));
        dispatch({
          type: "eventDurationSlots",
          payload: {
            Type: "eventDurationSlots",
            eventDurationSlots: [
              ...state.eventDurationSlots,
              {
                startDateTime: startTime,
                endDateTime: endTime,
                cost: 0,
                eventCostType: "free",
                eventDuration: 15,
                seats: 1,
                interval: 0,
                ChangeTime: {
                  time: moment().format("DD-MM-YYYY HH:mm:ss"),
                  index: 0,
                  type: "none",
                },
              },
            ],
          },
        });


      };
    useEffect(() => {
      state.eventDurationSlots.map((object,i) => {
        var time = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
        beforeTime = moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
        afterTime = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss');
       
        });
        if (state.eventTitle) {
            return   setBTNContinue(i+1);
        }else{
            return  setBTNContinue(0)
        }
    }, [state.eventDurationSlots])
   const CancelAddSlots=(eve)=> {
        $(eve).modal({backdrop: 'static', keyboard: false}, 'show');
        resetState();
    }
    const resetState=()=>{
        dispatch({type:"RESET",payload:{Type:"RESET",
            
        eventDurationSlots:[{
            "startDateTime": moment().format('DD-MM-YYYY HH:mm:ss'),
            "endDateTime": moment().add(15,'minutes').format('DD-MM-YYYY HH:mm:ss'),
            "cost": "0",
            "eventCostType": "free",
            "eventDuration": 15,
            "seats": "10",
            "interval": 0,
            "ChangeTime": {"time": moment().format('DD-MM-YYYY HH:mm:ss'),"index": 0,"type": "none"}
        }],
        EventId:0,
        SlotId:0,
        eventRepeat: false,
        eventRepeatSave: false,
        eventRepeatBy: "",
        eventRepeatDays: [],
        ConflictsEvents:[],
        TimeOverlapped:false,
        TimeOverlappedIndex:[-1,-1],
        ChangeTime:{time:moment().format('YYYY-MM-DD HH:mm:ss'),index:0,type:'none'},
        event_title:'',
        eventFileIds:[],
        SelectedStartDate: [],
        SelectedEndDate: [],
        eventSingleDate: moment().format("DD-MM-YYYY"),
        SelectedStartTime: [`${moment(moment(), "hh:mm A").format("hh:mm")}`],
        SelectedEndTime: [`${moment(moment(), "hh:mm A").add(30,'minutes').format("hh:mm")}`],
        event_type:'',
        event_description:'',
        event_visible:'',
        event_repeat_type:'',
        event_repeat_interval:1,
        event_repeat_days:[],
        event_start_dates:[],
        eventSingleDate: moment().format("DD-MM-YYYY"),
        event_end_dates:[],
        // eventRepeatSave:true,
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
    }})
    }
    const onChange=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }
    const SetValueOnChange=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:!state.eventRepeat}});             
    }
    useEffect(() => {
        if(state.eventRepeat){
            $('#repeat-event-popup').modal({backdrop: 'static', keyboard: false}, 'show');
        }else {
            $('#repeat-event-popup').modal('hide');
            $('#repeat-event-popup').data('bs.modal',null);
        } 
    }, [state.eventRepeat])
    
    console.log(state,'addSlots state')
        return (
            <>
            <Context.Provider value={[state,dispatch]}>
                <div className="modal left fade side-popup create-my-event-popup" id="AddSlotsModal" tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <button type="button" className="close" onClick={resetFormState} data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                                <div className="modal-header">
                                    <h2 className="modal-title">Add Event Slots</h2>
                                </div>
                                <div className="modal-body input-bdr-btm">
                                    <ul className="cmn-ul-list">
                                       
                                        <li>
                                            <div className="bdr-frm-bx">
                                                <div className="b-f-inn">
                                                    <span className="label-small-h">Date</span>
                                                    <input type="date" name="eventSingleDate" onChange={(e) => {

                                                        const eventDurationSlotsNew = state.eventDurationSlots.map(object => {
                                                            return {...object, endDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'),startDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')};
                                                        });
                                                        if (moment(e.target.value) >= moment()) {
                                                            dispatch({type:'setEventDate',payload:{Type:'setEventDate',eventDurationSlots:eventDurationSlotsNew, eventSingleDate: moment(e.target.value).format('DD-MM-YYYY'), SelectedStartDate: [moment(e.target.value).format('DD-MM-YYYY')], SelectedEndDate: [moment(e.target.value).format('DD-MM-YYYY')] }});
                                                        } else {
                                                            toastr["error"]('please select grater and equal to current date');
                                                        }
                                                    }} className="form-control" placeholder="Tuesday, October 20" value={moment(state.eventSingleDate, 'DD-MM-YYYY').format('YYYY-MM-DD')} 
                                                    // disabled={state.SelectedStartDate.length > 1 || state.eventRepeatBy == "Weeks" || state.eventRepeatBy == "MultipleDate" || state.eventRepeatBy == "TillDate" || parseInt(state.repeatNumber) > 1 ? true : false}
                                                    disabled={true}
                                                     />
                                                </div>

                                                

                                                {/* <div className="b-f-in">
                                                    <div className="flex-select-bx">
                                                        <span className="label-small-h">Time Zone</span>
                                                        <input type="text" name="eventTimeZone" onChange={onChange} className="form-control" readOnly={true} value={state.EventTimeZone} />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </li>
                                        
                                        
                                        
                                        <li>
                                        <EventAddTime  />            
                                        </li>
                                        <li>
                                            <div className="bdr-frm-bx repeat-events-bx">
                                                <div className="checkbox custom">
                                                <label>
                                                    <input 
                                                    type="checkbox"  
                                                    name="eventRepeat" 
                                                    onChange={SetValueOnChange} 
                                                    // disabled={state?.eventRepeatSave} 
                                                    checked={state?.eventRepeat}  
                                                    value={state?.eventRepeat}/>
                                                    Repeat
                                                    </label>
                                                    </div>
                                                   {state.eventRepeatSave && <button className="btn btn-default btn-sm" type="button" onClick={()=>$('#repeat-event-popup').modal({ backdrop: 'static', keyboard: false }, 'show')}>View</button>}
                                               
                                            </div>
                                        </li>

                                        {/* <li>
                                            <div className="bdr-frm-bx">
                                                <div className="setting-toggle-bx"> <strong>Auto Accept Participants</strong>
                                                    <p>Lorem ipsum dolor site meet, loream adipiscing elite, sed do eiusmod.</p>
                                                    <span className="av-switch">
                                                        <label></label>
                                                        <input type="checkbox" className="av-switch" id="noti-setting-3" onChange={(e) => this.props.setAnyState({ eventAutoParticipants: !this.props.value.eventAutoParticipants })} name="eventAutoParticipants" checked={this.props.value.eventAutoParticipants}  />
                                                        <label htmlFor="noti-setting-3"></label>
                                                    </span>
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <div className="step-line-bdr">
                                        <ul className="cmn-ul-list">
                                            <li className="active"><span>&nbsp;</span></li>
                                            <li><span>&nbsp;</span></li>
                                            <li><span>&nbsp;</span></li>
                                        </ul>
                                    </div>
                                    <div className="side-next-back-btn">
                                        <button type="button" className="btn default-btn float-left"  onClick={CancelAddSlots} data-toggle="modal" data-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn default-btn float-right" disabled={state.TimeOverlapped} >Add Slots</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <RepeatEvery show={true} />
                <TImeChangeModal/>
                <ConflictsEvents events={state.ConflictsEvents}/>
            </Context.Provider>

            </>
        );
}

export default React.memo(AddSlotModal);