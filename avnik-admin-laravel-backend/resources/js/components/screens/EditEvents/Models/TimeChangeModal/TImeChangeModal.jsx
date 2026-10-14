import React, { useContext ,useState, useEffect} from 'react';
import moment from 'moment';
import  DatePicker from "react-multi-date-picker"
import EditEventContext from '../../EditEventContext/EditEventContext';
const TimeChangeModal = () => {
    const [state,dispatch] = useContext(EditEventContext)
    const [value, setValue] = useState(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'));
    const [timeFR, setTimeFR] = useState(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('A'));
    const [timeMIN, setTimeMIN] = useState(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('m'));
    const [timeHR, setTimeHR] = useState(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('h'));
    var Hours = [];
    var Minutes = [];
    useEffect(()=>{
        setTimeFR(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('A'));
        setTimeMIN(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('m'));
        setTimeHR(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('h'));
        setValue(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'))
    },[state.ChangeTime.time,state.event_time_slot[state.ChangeTime.index]?.end_date_time,state.event_time_slot[state.ChangeTime.index]?.start_date_time])

    useEffect(()=>{
        setTimeFR(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('A'));
        setTimeMIN(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('m'));
        setTimeHR(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('h'));
        setValue(moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'))
    },[])

      for (let  i=1; i<13; i++) {
        Hours.push(<option key={i} value={i} selected={timeHR==i} >{i} hr</option>);
      }
      [0,15,30,45].map((res,i)=>{
        Minutes.push(<option key={i} value={res}  selected={timeMIN==res} >{('0' + res).slice(-2)} min</option>);
      });
      const onSave=()=>{
        let originalDate=moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
        let originalTime= moment(originalDate+''+('0' + timeHR).slice(-2)+''+('0' + timeMIN).slice(-2)+''+timeFR,'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
        let startTime=moment(state.event_time_slot[state.ChangeTime.index]?.start_date_time,'YYYY-MM-DD HH:mm:ss');       
            if(state.ChangeTime.type=="start"){
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }else if(state.ChangeTime.type=="end"){
                originalTime= moment(value+''+('0' + timeHR).slice(-2)+''+('0' + timeMIN).slice(-2)+''+timeFR,'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }else{
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }
      }
      const handleDate=(e)=>{
        setValue(moment(e.format(),'YYYY-MM-DD').format('YYYY-MM-DD'));
      }
      const onTimeChange=(e)=>{
            let name =e.target.name;
            let value=e.target.value;
            if(name=="Hours"){
                setTimeHR(value)
            }else if(name=="Minutes"){
                setTimeMIN(value)
            }else if(name=="TimeFormat"){
                setTimeFR(value)
            }            
        }
        const onSaveTimeChange=(time,index,type)=>{
            let eventDurationSlots=[...state.event_time_slot];
            let TimeOverlappedIndex=[...state.TimeOverlappedIndex];

            if(type=="start"){
                 eventDurationSlots[index]['start_date_time']=time;
                //  eventDurationSlots[index]['start_time']=time;
            }else if(type=="end"){
                    eventDurationSlots[index]['interval']=moment(time,"YYYY-MM-DD HH:mm:ss").diff(moment(state.event_time_slot[index].start_date_time,"YYYY-MM-DD HH:mm:ss"),'day');
                    eventDurationSlots[index]['end_date_time']=time;
                    // eventDurationSlots[index]['end_time']=time;
            }
            let overlapped = false;
    let overlappedIndex = [-1,-1];
    var timeCollection = eventDurationSlots;
    let iterations = timeCollection.length;  
      for (let i = 0; i < timeCollection.length; i++) {
        for (let a = 0; a < timeCollection.length; a++) {  
          if (i == a) {
            continue;
          }
          //if the start and end date are both the same with the comparison data.
          if(moment(timeCollection[i].start_date_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === moment(timeCollection[i].end_date_time,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss")) {
            overlapped = true; 
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment(timeCollection[i].start_date_time,"YYYY-MM-DD HH:mm:ss") == moment(timeCollection[i].end_date_time,"YYYY-MM-DD HH:mm:ss")) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment(timeCollection[i].start_date_time,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") === moment(timeCollection[i].end_date_time,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") ) {
              overlapped = true;
              overlappedIndex.push(i);
              overlappedIndex.push(a);
          } else if (moment(timeCollection[i].start_date_time,"YYYY-MM-DD HH:mm:ss").isBetween(moment(timeCollection[a].start_date_time,"YYYY-MM-DD HH:mm:ss"),moment(timeCollection[a].end_date_time,"YYYY-MM-DD HH:mm:ss")) || moment(timeCollection[i].end_date_time,"YYYY-MM-DD HH:mm:ss").isBetween(moment(timeCollection[a].start_date_time,"YYYY-MM-DD HH:mm:ss"), moment(timeCollection[a].end_date_time,"YYYY-MM-DD HH:mm:ss"))) {
            //checker to check if date and time are in between..
            //making sure also that the time belongs to the crew
            // if (!--iterations){
              toastr['error']('Time conflict');
            // }
            
            overlappedIndex.push(i);
            overlappedIndex.push(a);
            overlapped = true;
          }else if(moment(timeCollection[i].end_date_time,"YYYY-MM-DD HH:mm:ss").diff(moment(timeCollection[i].start_date_time,"YYYY-MM-DD HH:mm:ss"),'Hours')>6){
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          }else{
            // overlappedIndex.filter(res=>res!=i||a);
          }
        }
      }

    // if (overlapped) {
    //   dispatch({
    //     type: "TimeOverlapped",
    //     payload: { Type: "TimeOverlapped", TimeOverlapped: overlapped,TimeOverlappedIndex:overlappedIndex },
    //   });
    //  } else if (!overlapped) {
      
            if(moment(state.event_time_slot[index].end_date_time,"YYYY-MM-DD HH:mm:ss").diff(moment(state.event_time_slot[index].start_date_time,"YYYY-MM-DD HH:mm:ss"),'Hours')>6){
                toastr["error"]('Event duration can not be greater than 6 hours 5'); 
                overlappedIndex.push(index);
                // dispatch({
                //         type: "TimeOverlapped",
                //         payload: { Type: "TimeOverlapped", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
                //     });
            }else if(moment(state.event_time_slot[index].end_date_time,"YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')===moment(state.event_time_slot[index].start_date_time,"YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')) {
                toastr["error"]('Minimum 15 min of event duration required'); 
                overlappedIndex.push(index);
                // dispatch({
                //     type: "TimeOverlappedMin",
                //     payload: { Type: "TimeOverlappedMin", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
                // });
            }else if(moment(state.event_time_slot[index].end_date_time,"YYYY-MM-DD HH:mm:ss").diff(moment(state.event_time_slot[index].start_date_time,"YYYY-MM-DD HH:mm:ss"),'minutes')<15) {
                toastr["error"]('Start time can not be greater than end time'); 
                overlappedIndex.push(index);
                // dispatch({
                //     type: "TimeOverlappedMin",
                //     payload: { Type: "TimeOverlappedMin", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
                // });
            }else{
                // dispatch({
                //     type: "TimeOverlapped",
                //     payload: { Type: "TimeOverlapped", TimeOverlapped: false,TimeOverlappedIndex:TimeOverlappedIndex.filter((res)=>res!=index)},
                // });
            }
            dispatch({
                type: "TimeOverlappedFN",
                payload: { Type: "TimeOverlappedFN", TimeOverlapped: overlapped,TimeOverlappedIndex:[...new Set(overlappedIndex)] },
              });
            let duration = moment(
                moment(eventDurationSlots[index].end_time, "h:mm A").diff(
                  moment(eventDurationSlots[index].start_time, "h:mm A")
                )
              ).minutes();

              eventDurationSlots[index]['duration']=duration;
                dispatch({type:'eventDurationSlots',payload:{Type:'eventDurationSlots', event_time_slot:eventDurationSlots}});
                $('#EditTimeChangeModal').modal('hide');
                console.log(state.TimeOverlappedIndex,index,'TimeOverlappedIndex');
            
        }
    return (
    <>
        <div className="modal fade default-popup repeat-event-popup" id="EditTimeChangeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="repeat-event-popup">
                                    <a href="#create-my-event-step-3-popup" className="close" data-dismiss="modal" aria-label="Close" ><i className="av av-close-icon"></i></a>
                                    <div className="row">
                                    <div class={`col-12 col-sm-12 `}>
                                        <div class="repeat-box repeat-for-bx">
                                            <div class="repeat-every-bx">
                                                <ul class="cmn-ul-list">
                                                    <li class="w-100">
                                                        <div class="flex-select-bx w-100">
                                                            {state.ChangeTime.type=="end"?<DatePicker
                                                            inputClass="form-control"
                                                            minDate={new Date(moment(state.event_date,'YYYY-MM-DD').format('YYYY-MM-DD'))}
                                                            value={moment(state.event_time_slot[state.ChangeTime.index]?.end_date_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')}
                                                            format="YYYY-MM-DD"
                                                            onChange={handleDate}/>:<span class="label-small-h">{value}</span> }
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="col-12 col-sm-12">
                                        <div className="repeat-box repeat-for-bx">
                
                                        <div className="repeat-every-bx">
                                        <ul className="cmn-ul-list">
                                        {/* <li>
                                        <DatePicker
                                            disableDayPicker
                                            format="hh:mm A"
                                            plugins={[
                                                <TimePicker />
                                            ]} 
                                            value={moment(state.ChangeTime.time,'YYYY-MM-DD HH:mm:ss').format('hh:mm A')}
                                            />
                                        </li> */}
                                        <li style={{width:'30%'}}>
                                            <div className="flex-select-bx">
                                                <select className="form-control custom-select-bx" name="Hours" onChange={onTimeChange}>
                                                    {Hours}
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="flex-select-bx">
                                                <select className="form-control custom-select-bx" name="Minutes" onChange={onTimeChange}>
                                                {Minutes}
                                                </select>
                                            </div>
                                        </li>
                                        <li>
                                        <div className="flex-select-bx">
                                                <select className="form-control custom-select-bx" name="TimeFormat" onChange={onTimeChange} value={timeFR}>
                                                    <option value="AM" selected={timeFR==="AM"}>AM</option>
                                                    <option value="PM" selected={timeFR==="PM"}>PM</option>
                                                </select>
                                            </div>
                                        </li>
                                        </ul>
                                        </div>
                                        <div className="till-date-bx"></div>
                                        </div>
                                        </div>
                                        
                                        <div className="col-7 col-sm-7">
                                            <div className="repeat-event-btns">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <button type="button" className="btn default-btn" onClick={onSave} >Save</button>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default React.memo(TimeChangeModal);