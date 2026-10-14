import React, { useContext ,useState, useEffect} from 'react';
import moment from 'moment';
// import RepeatEvery from './RepeatEveryModal/RepeatEvery';

import { ApiService } from '../../../ApiServer/ApiService';
import EditEventContext from './EditEventContext/EditEventContext';
import EventEditTime from './Components/EventEditTime';

const EditStepTwo =({resetFormState,conflictCheck})=> {
const [state,dispatch] = useContext(EditEventContext)
const [next, setNext] = useState(true);
const [BTNContinue, setBTNContinue] = useState(0);
const [back, setBack] = useState(true);
const { eventTillDate, EventTimeZone, eventAutoParticipants, eventDurationSlots,eventVisibility, repeatNumber, eventRepeatBy, eventTitle, SelectedStartDate, SelectedEndDate, SelectedStartTime, SelectedEndTime } = state;    
   const nextStep=(eve)=>{
    if(conflictCheck(eve)){
        $(eve).modal({ backdrop: 'static', keyboard: false })
    }
   }
    useEffect(() => {
    //   state?.eventDurationSlots.map((object,i) => {
    //     var time = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
    //     beforeTime = moment(moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss'),
    //     afterTime = moment(moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'HH:mm:ss');
    //     if (state?.eventTitle) {
    //         return   setBTNContinue(i+1);
    //     }else{
    //           return  setBTNContinue(0)
    //     }
    //     });
    }, [state?.eventDurationSlots,state?.eventTitle])
   const prevStep=(eve)=> {
        $(eve).modal({backdrop: 'static', keyboard: false}, 'show');
    }
    const onChange=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:value}});
    }
    const SetValueOnChange=(e)=>{
        let name =e.target.name;
        let value =e.target.value;
        dispatch({type:name,payload:{Type:name,[name]:!state?.eventRepeat}});             
    }
    // useEffect(() => {
    //     if (state?.eventRepeat){
    //         $('#edit-repeat-event-popup').modal({backdrop: 'static', keyboard: false}, 'show');
    //     }else {
    //         $('#edit-repeat-event-popup').modal('hide');
    //     } 
    // }, [state?.eventRepeat])
    
        return (
            <>
                <div className="modal left fade side-popup create-my-event-popup" id="edit-create-myevent-step-2" tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">
                        <form onSubmit={(e) => console.log("Step Two Submit Successfully")}>
                            <div className="modal-content">
                                <button type="button" className="close" onClick={resetFormState} data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                                <div className="modal-header">
                                    <h2 className="modal-title">Edit My Event</h2>
                                </div>
                                <div className="modal-body input-bdr-btm">
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <div className="bdr-frm-bx">
                                                <span className="label-small-h">Title</span>
                                                <input type="text" name="event_title" 
                                                // onChange={onChange} 
                                                className="form-control" placeholder="Enter Title" value={state?.event_title} autoComplete="off" disabled={true}   />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="bdr-frm-bx">
                                                <div className="b-f-in">
                                                    <span className="label-small-h">Date</span>
                                                    <input type="date" name="eventSingleDate" onChange={(e) => {

                                                        // const eventDurationSlotsNew = state?.eventDurationSlots.map(object => {
                                                        //     return {...object, endDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.endDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss'),startDateTime:moment(moment(e.target.value,'YYYY-MM-DD').format('DD-MM-YYYY')+' '+moment(object.startDateTime,'DD-MM-YYYY HH:mm:ss').format('HH:mm:ss'),'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')};
                                                        // });
                                                        if (moment(e.target.value) >= moment()) {
                                                            // dispatch({type:'setEventDate',payload:{Type:'setEventDate',eventDurationSlots:eventDurationSlotsNew, eventSingleDate: moment(e.target.value).format('DD-MM-YYYY'), SelectedStartDate: [moment(e.target.value).format('DD-MM-YYYY')], SelectedEndDate: [moment(e.target.value).format('DD-MM-YYYY')] }});
                                                        } else {
                                                            toastr["error"]('please select grater and equal to current date');
                                                        }
                                                    }} className="form-control" placeholder="Tuesday, October 20" value={moment(state?.event_date, 'YYYY-MM-DD').format('YYYY-MM-DD')} 
                                                    // disabled={state?.SelectedStartDate.length > 1 || state?.eventRepeatBy == "Weeks" || state?.eventRepeatBy == "MultipleDate" || state?.eventRepeatBy == "TillDate" || parseInt(state?.repeatNumber) > 1 ? true : false}
                                                    disabled={true}
                                                     />
                                                </div>
                                                <div className="b-f-in ">
                                                    <span className="label-small-h">Privacy</span>
                                                    {/* <div className="flex-select-bx"> */}
                                                        <select className="form-control custom-select-bx p-0" onChange={onChange} value={state?.event_visible} name="event_visible">
                                                            <option selected={state?.event_visible=="public"} value="public">Public</option>
                                                            <option selected={state?.event_visible=="private"} value="private">Private</option>
                                                        </select>
                                                    {/* </div> */}
                                                </div>
                                                

                                                {/* <div className="b-f-in">
                                                    <div className="flex-select-bx">
                                                        <span className="label-small-h">Time Zone</span>
                                                        <input type="text" name="eventTimeZone" onChange={onChange} className="form-control" readOnly={true} value={state?.EventTimeZone} />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </li>
                                        <li>
                                            <EventEditTime  />            
                                        </li>
                                        {state?.FollowingBy=="ThisSlot"?"":state?.FollowingBy=="ThisEvent"?<li>
                                            <div className="bdr-frm-bx repeat-events-bx">
                                                <div className="checkbox custom">
                                                <label>
                                                    <input 
                                                    type="checkbox" 
                                                    name="eventRepeat" 
                                                    onChange={SetValueOnChange} 
                                                    disabled={state?.eventRepeatSave} checked={state?.eventRepeat}  value={state?.eventRepeat}/>
                                                    Repeat
                                                    </label>
                                                    </div>
                                                   {state?.eventRepeatSave && <button className="btn btn-default btn-sm" type="button" onClick={()=>$('#edit-repeat-event-popup').modal({ backdrop: 'static', keyboard: false })}>View</button>}
                                               
                                            </div>
                                        </li>:
                                        <li>
                                            <div className="bdr-frm-bx repeat-events-bx">
                                                <div className="checkbox custom">
                                                <label>
                                                    <input 
                                                    type="checkbox" 
                                                    name="eventRepeat" 
                                                    onChange={SetValueOnChange} 
                                                    disabled={state?.eventRepeatSave} checked={state?.eventRepeat}  value={state?.eventRepeat}/>
                                                    Repeat
                                                    </label>
                                                    </div>
                                                   {state?.eventRepeatSave && <button className="btn btn-default btn-sm" type="button" onClick={()=>$('#edit-repeat-event-popup').modal({ backdrop: 'static', keyboard: false })}>View</button>}
                                               
                                            </div>
                                        </li>}

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
                                        <button type="button" className="btn default-btn float-left"  onClick={() => prevStep('#create-my-event-popup')} data-toggle="modal" data-dismiss="modal">Back</button>
                                        <button type="button" className="btn default-btn float-right" disabled={state?.TimeOverlapped} onClick={() => nextStep('#edit-create-myevent-step-3')} >Continue</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
}

export default React.memo(EditStepTwo);