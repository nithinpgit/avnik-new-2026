import React, { useContext ,useState, useEffect} from 'react';
import moment from 'moment';
import  DatePicker from "react-multi-date-picker"
import Context from '../../../../../store/Context';
const TimeChangeModal = () => {
    const [state,dispatch] = useContext(Context)
    const [value, setValue] = useState(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'));
    const [timeFR, setTimeFR] = useState(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('A'));
    const [timeMIN, setTimeMIN] = useState(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('m'));
    const [timeHR, setTimeHR] = useState(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('h'));
    var Hours = [];
    var Minutes = [];
    useEffect(()=>{
        setTimeFR(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('A'));
        setTimeMIN(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('m'));
        setTimeHR(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('h'));
        setValue(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'))
    },[state.ChangeTime.time,state.eventDurationSlots[state.ChangeTime.index]?.endDateTime,state.eventDurationSlots[state.ChangeTime.index]?.startDateTime])

    useEffect(()=>{
        setTimeFR(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('A'));
        setTimeMIN(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('m'));
        setTimeHR(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('h'));
        setValue(moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'))
    },[])

      for (let  i=1; i<13; i++) {
        Hours.push(<option key={i} value={i} selected={timeHR==i} >{i} hr</option>);
      }
      [0,15,30,45].map((res,i)=>{
        Minutes.push(<option key={i} value={res}  selected={timeMIN==res} >{('0' + res).slice(-2)} min</option>);
      });
      const onSave=()=>{
        let originalDate=moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY');
        let originalTime= moment(originalDate+''+('0' + timeHR).slice(-2)+''+('0' + timeMIN).slice(-2)+''+timeFR,'DD-MM-YYYY hh:mm A').format('DD-MM-YYYY HH:mm:ss');
        let startTime=moment(state.eventDurationSlots[state.ChangeTime.index]?.startDateTime,'DD-MM-YYYY HH:mm:ss');       
            if(state.ChangeTime.type=="start"){
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }else if(state.ChangeTime.type=="end"){
                originalTime= moment(value+''+('0' + timeHR).slice(-2)+''+('0' + timeMIN).slice(-2)+''+timeFR,'DD-MM-YYYY hh:mm A').format('DD-MM-YYYY HH:mm:ss');
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }else{
                onSaveTimeChange(originalTime,state.ChangeTime.index,state.ChangeTime.type);
            }
      }
      const handleDate=(e)=>{
        setValue(moment(e.format(),'DD-MM-YYYY').format('DD-MM-YYYY'));
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
            let eventDurationSlots=[...state.eventDurationSlots];
            let TimeOverlappedIndex=[...state.TimeOverlappedIndex];
            if(type=="start"){
                 eventDurationSlots[index]['startDateTime']=time;
            }else if(type=="end"){
                    eventDurationSlots[index]['interval']=moment(time,"DD-MM-YYYY HH:mm:ss").diff(moment(state.eventDurationSlots[index].startDateTime,"DD-MM-YYYY HH:mm:ss"),'day');
                    eventDurationSlots[index]['endDateTime']=time;
            }
    let overlapped = false;
    let overlappedIndex = [-1,-1];
    var timeCollection = eventDurationSlots;
    let iterations = timeCollection.length;
    //   if (state.eventTitle!='') {    
      for (let i = 0; i < timeCollection.length; i++) {
        for (let a = 0; a < timeCollection.length; a++) {  
          if (i == a) {
            continue;
          }
          //if the start and end date are both the same with the comparison data.
          if(moment(timeCollection[i].startDateTime, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") === moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss")) {
            overlapped = true; 
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment(timeCollection[i].startDateTime,"DD-MM-YYYY HH:mm:ss") == moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss")) {
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          } else if (moment(timeCollection[i].startDateTime,"DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") === moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY HH:mm:ss") ) {
              overlapped = true;
              overlappedIndex.push(i);
              overlappedIndex.push(a);
          } else if (moment(timeCollection[i].startDateTime,"DD-MM-YYYY HH:mm:ss").isBetween(moment(timeCollection[a].startDateTime,"DD-MM-YYYY HH:mm:ss"),moment(timeCollection[a].endDateTime,"DD-MM-YYYY HH:mm:ss")) || moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss").isBetween(moment(timeCollection[a].startDateTime,"DD-MM-YYYY HH:mm:ss"), moment(timeCollection[a].endDateTime,"DD-MM-YYYY HH:mm:ss"))) {
            //checker to check if date and time are in between..
            //making sure also that the time belongs to the crew
            // if (!--iterations){
              toastr['error']('Time conflict');
            // }
            
            overlappedIndex.push(i);
            overlappedIndex.push(a);
            overlapped = true;
          }else if(moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(timeCollection[i].startDateTime,"DD-MM-YYYY HH:mm:ss"),'Hours')>6){
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          }else{
            // overlappedIndex.filter(res=>res!=i||a);
          }
        }
      }
    // } else {
    //   overlapped = true;
    // }
    
      
            if(moment(state.eventDurationSlots[index].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(state.eventDurationSlots[index].startDateTime,"DD-MM-YYYY HH:mm:ss"),'Hours')>6){
                toastr["error"]('Event duration can not be greater than 6 hours'); 
                overlappedIndex.push(index);
                // dispatch({
                //         type: "TimeOverlapped",
                //         payload: { Type: "TimeOverlapped", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
                //     });
            }else if(moment(state.eventDurationSlots[index].endDateTime,"DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')===moment(state.eventDurationSlots[index].startDateTime,"DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')) {
                toastr["error"]('Minimum 15 min of event duration required'); 
                overlappedIndex.push(index);
                // dispatch({
                //     type: "TimeOverlappedMin",
                //     payload: { Type: "TimeOverlappedMin", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
                // });
            }else if(moment(state.eventDurationSlots[index].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(state.eventDurationSlots[index].startDateTime,"DD-MM-YYYY HH:mm:ss"),'minutes')<15) {
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
                dispatch({type:'eventDurationSlots',payload:{Type:'eventDurationSlots', eventDurationSlots:eventDurationSlots}});
                $('#TimeChangeModal').modal('hide');
                console.log(state.TimeOverlappedIndex,state.TimeOverlapped,index,'TimeOverlappedIndex');
            
        }
    return (
    <>
        <div className="modal fade default-popup repeat-event-popup" id="TimeChangeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
 minDate={new Date(moment(state.eventSingleDate,'DD-MM-YYYY').format('YYYY-MM-DD'))}
  value={moment(state.eventDurationSlots[state.ChangeTime.index]?.endDateTime,'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')}
  format="DD-MM-YYYY"
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
                                            value={moment(state.ChangeTime.time,'DD-MM-YYYY HH:mm:ss').format('hh:mm A')}
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