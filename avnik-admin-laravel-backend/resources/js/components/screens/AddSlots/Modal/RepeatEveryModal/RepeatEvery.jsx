import React, {useState, useContext, useEffect } from 'react';
import moment from 'moment';

import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import FindDateTime from '../../../CreateEvent/Classes/FindDateTime/FindDateTime';
import Context from '../../../../../store/Context';

const RepeatEvery = () => {
    const [state, dispatch] = useContext(Context);
    const [repeatNumberError, setRepeatNumberError] = useState(false);
    const [repeatNumber, setRepeatNumber] = useState(1);
    const [eventRepeatBy, setEventRepeatBy] = useState("");
    const [eventTillDate, setEventTillDate] = useState(moment().add(15, "days").format("YYYY-MM-DD"));
    const [eventSingleDate, setEventSingleDate] = useState(state?.eventSingleDate);
    const [SelectedStartDate,setSelectedStartDate]=useState([]);
    const [SelectedEndDate,setSelectedEndDate]=useState([]);
    const [eventRepeatDays, setEventRepeatDays] = useState([moment().day()]);
    const [eventRepeatSave,setEventRepeatSave]=useState(false);
    const [eventTillDateError, setEventTillDateError] = useState(false);
    const [chooseDateError, setChooseDateError] = useState(false);
    useEffect(()=>{
        setEventSingleDate(state?.eventSingleDate);
        setEventTillDate(moment(state?.eventSingleDate,'DD-MM-YYYY').add(15, "days").format("YYYY-MM-DD"));
        setEventRepeatSave(state?.eventRepeatSave);
    },[state?.eventRepeat])
    const WeekDaysObject=[{
        shortName:'S',
        fullName:'Sunday',
        day:0,
    },{
        shortName:'M',
        fullName:'Monday',
        day:1,
    },
    {
        shortName:'T',
        fullName:'Tuesday',
        day:2,
    },{
        shortName:'W',
        fullName:'Wednesday',
        day:3,
    },{
        shortName:'T',
        fullName:'Thursday',
        day:4,
    },{
        shortName:'F',
        fullName:'Friday',
        day:5,
    },{
        shortName:'S',
        fullName:'Saturday',
        day:6,
    }];

    const onRepeatChange = (re, eve, choose) => {
        setRepeatNumberError(re);
        setEventTillDateError(eve);
        setChooseDateError(choose);
    }
    console.log(repeatNumber,eventRepeatBy,eventSingleDate,eventTillDate,SelectedEndDate,SelectedStartDate,eventRepeatDays,'repeat states');

    function saveRepeatValidation() {
        if (eventRepeatBy == "Weeks") {
            if (parseInt(repeatNumber) > 0) {
                dispatch({type:'eventRepeatSaveByWeek',payload:{Type:'eventRepeatSaveByWeek',eventTillDate:eventTillDate,eventRepeatDays:eventRepeatDays,repeatNumber:repeatNumber,SelectedStartDate:SelectedStartDate,SelectedEndDate:SelectedEndDate,eventRepeatBy:"Weeks",eventRepeatSave:true}});
                $('#repeat-event-popup').modal('hide');
                $('#repeat-event-popup').data('bs.modal',null);
            } else {
                toastr["error"]('please enter repeat number grater then 0');
            }
        } else if (eventRepeatBy == "TillDate") {
            if (eventTillDate) {
                $('#repeat-event-popup').modal('hide');
                $('#repeat-event-popup').data('bs.modal',null);
                dispatch({type:'eventRepeatSaveByTillDate',payload:{Type:'eventRepeatSaveByTillDate',eventTillDate:eventTillDate,eventRepeatDays:eventRepeatDays,repeatNumber:repeatNumber,repeatNumber:repeatNumber,SelectedStartDate:SelectedStartDate,SelectedEndDate:SelectedEndDate,eventRepeatBy:"TillDate",eventRepeatSave:true}});
            } else {
                toastr["error"]('sorry you have,t selected any TillDate')
            }
        } else if (eventRepeatBy == "MultipleDate") {
            dispatch({type:'eventRepeatSaveByMultipleDate',payload:{Type:'eventRepeatSaveByMultipleDate',eventTillDate:eventTillDate,eventRepeatDays:eventRepeatDays,repeatNumber:repeatNumber,repeatNumber:repeatNumber,SelectedStartDate:SelectedStartDate,SelectedEndDate:SelectedEndDate,eventRepeatBy:"MultipleDate",eventRepeatSave:true}});
            if (SelectedStartDate?.length > 1) {
                $('#repeat-event-popup').modal('hide');
                $('#repeat-event-popup').data('bs.modal',null);
            }
        } else {
            $('#repeat-event-popup').modal('hide');
            $('#repeat-event-popup').data('bs.modal',null);
            toastr["error"]("you are not selected any multiple option");
        }
        setEventRepeatSave(true);
        
    }
    const RepeatDays = () => {
        const onChangeHandel = (e,resData,toggle) => {
            setTimeout(() => {
                if (repeatNumber == 0 && eventRepeatBy === "Weeks") {
                    dispatch({
                        type: 'REP_BY_DAY', payload: {
                            Type: 'REP_BY_DAY',
                            sunday: moment.utc().format('dddd') === "Sunday" ? true : false,
                            monday: moment.utc().format('dddd') === "Monday" ? true : false,
                            tuesday: moment.utc().format('dddd') === "Tuesday" ? true : false,
                            wednesday: moment.utc().format('dddd') === "Wednesday" ? true : false,
                            thursday: moment.utc().format('dddd') === "Thursday" ? true : false,
                            friday: moment.utc().format('dddd') === "Friday" ? true : false,
                            saturday: moment.utc().format('dddd') === "Saturday" ? true : false,
                        }
                    });
                }
                if (repeatNumber > 0 && eventRepeatBy === "Weeks") {
                    let Weeks = eventRepeatDays;
                    if(toggle){
                        Weeks= eventRepeatDays.filter((res)=>res!=resData?.day.toString());
                    }else {                       
                        Weeks=[...eventRepeatDays,resData?.day.toString()];
                    }
                  let findWeekDates= FindDateTime.findWeeksBetweenTwoDatesDays(moment(eventSingleDate,'DD-MM-YYYY'),parseInt(repeatNumber),Weeks,'DD-MM-YYYY')
    
                    if(findWeekDates?.length>0){
                        setEventRepeatDays(Weeks)
                        setSelectedStartDate(findWeekDates)
                        setSelectedEndDate(findWeekDates)
                    }
                    console.log(findWeekDates,'findDate By weeks');
                }
            }, 200);
        }

        return (
            <>
                {WeekDaysObject.map((res,index)=><li key={index}>
                <div className="checkbox custom">
                    <label>
                        <input type="checkbox" onChange={(e) =>onChangeHandel(e,res,eventRepeatDays?.find((find)=>res.day==find))} name={res?.fullName} defaultChecked={eventRepeatDays?.find((find)=>res.day==find)} disabled={repeatNumber>0?false:true} value={res?.fullName} />
                        <span>{res?.shortName}</span>
                    </label>
                </div>
            </li>)
            }
            </>
        );
    }

    const resetPopup=()=>{  
        if(!eventRepeatSave&&state?.eventRepeatSave) {
            setRepeatNumber(state?.repeatNumber);
            setEventRepeatBy(state?.eventRepeatBy);
            setEventTillDate(state.eventTillDate)
            setSelectedStartDate(state?.SelectedStartDate);
            setSelectedEndDate(state?.SelectedEndDate);
            setEventRepeatDays(state?.eventRepeatDays);
            setEventRepeatSave(false);
            dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeat:state?.eventRepeat,eventRepeatSave:state?.eventRepeatSave,eventTillDate: state.eventTillDate,repeatNumber: state?.repeatNumber,eventRepeatBy:state?.eventRepeatBy,SelectedStartDate: state?.SelectedStartDate,SelectedEndDate: state?.SelectedEndDate}}); 
        }else if(state?.eventRepeatSave&&eventRepeatSave){
            setRepeatNumber(state?.repeatNumber);
            setEventRepeatBy(state?.eventRepeatBy);
            setEventTillDate(state.eventTillDate)
            setSelectedStartDate(state?.SelectedStartDate);
            setSelectedEndDate(state?.SelectedEndDate);
            setEventRepeatDays(state?.eventRepeatDays);
            setEventRepeatSave(false);
            dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeat:state?.eventRepeat,eventRepeatSave:state?.eventRepeatSave,eventTillDate: state.eventTillDate,repeatNumber: state?.repeatNumber,eventRepeatBy:state?.eventRepeatBy,SelectedStartDate: state?.SelectedStartDate,SelectedEndDate: state?.SelectedEndDate}}); 
        }else{
            setRepeatNumber(1);
            setEventRepeatBy("");
            setEventTillDate(moment(state?.eventSingleDate,'DD-MM-YYYY').add(15, "days").format("YYYY-MM-DD"))
            setSelectedStartDate([state?.eventSingleDate]);
            setSelectedEndDate([state?.eventSingleDate]);
            setEventRepeatDays([moment().day()]);
            setEventRepeatSave(false);
            dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeat:false,eventRepeatSave:false,eventTillDate: state.eventTillDate,repeatNumber: 0,eventRepeatBy:"",SelectedStartDate: [state?.eventSingleDate],SelectedEndDate: [state?.eventSingleDate]}}); 
        }
    }
    const resetButtonPopup=()=>{  
        
            setRepeatNumber(1);
            setEventRepeatBy("");
            setEventTillDate(moment(state?.eventSingleDate,'DD-MM-YYYY').add(15, "days").format("YYYY-MM-DD"))
            setSelectedStartDate([state?.eventSingleDate]);
            setSelectedEndDate([state?.eventSingleDate]);
            setEventRepeatDays([moment().day()]);
            setEventRepeatSave(false);
            dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeat:false,eventRepeatSave:false,eventTillDate: state.eventTillDate,repeatNumber: 0,eventRepeatBy:"",SelectedStartDate: [state?.eventSingleDate],SelectedEndDate: [state?.eventSingleDate]}}); 
        
    }
    // const resetPopup=()=>dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeatSave:eventRepeatSave,eventRepeat:eventRepeatSave,eventTillDate: eventTillDate,repeatNumber: repeatNumber,eventRepeatBy:eventRepeatBy,SelectedStartDate: SelectedStartDate,SelectedEndDate: SelectedEndDate}}); 
    
    const EventTillDate=(e)=>{
        if(moment(e.target.value,'YYYY-MM-DD').diff(moment(eventSingleDate,'DD-MM-YYYY'),'Months')<=2){
        setEventTillDate(e.target.value);
        let date = FindDateTime.editFindDaysBetweenTwoDates(moment(eventSingleDate,'DD-MM-YYYY').format('YYYY-MM-DD'), e.target.value,'DD-MM-YYYY');
        setRepeatNumber(0);
        date.push(eventSingleDate);
        setSelectedEndDate(date);
        setSelectedStartDate(date);
        setEventRepeatDays([]);
        }else{
            toastr["error"]('maximum event till date 2 months only');
        }
        }

    const changeRepeatNumber =(number)=>{
        let findWeekDates= FindDateTime.findWeeksBetweenTwoDatesDays(moment(eventSingleDate,'DD-MM-YYYY'),parseInt(number),eventRepeatDays,'DD-MM-YYYY')
    
                    if(findWeekDates?.length>0){
                        setSelectedStartDate(findWeekDates)
                        setSelectedEndDate(findWeekDates)
                    }
        setRepeatNumber(number);

    }   
    const setMultipleChoose=(e)=>{
        var dataObj=[]
        if(e?.length>0){
            e.map((res)=>
                dataObj.push(moment(res.format(),'DD-MM-YYYY').format('DD-MM-YYYY'))   
            )
        }
        setRepeatNumber(0);
        setSelectedEndDate(dataObj);
        setSelectedStartDate(dataObj);
        setEventRepeatDays([]); 
    }
    const eventRepeatByChange=(type)=>{
        setEventRepeatBy(type);
        setEventRepeatSave(false);
        if(type==="TillDate"){
            let date = FindDateTime.editFindDaysBetweenTwoDates(moment(eventSingleDate,'DD-MM-YYYY').format('YYYY-MM-DD'), eventTillDate,'DD-MM-YYYY');
            setRepeatNumber(0);
            date.push(eventSingleDate);
            setSelectedEndDate(date);
            setSelectedStartDate(date);
            setEventRepeatDays([]);
        }else if(type==="Weeks"){
            let findWeekDates= FindDateTime.findWeeksBetweenTwoDatesDays(moment(eventSingleDate,'DD-MM-YYYY'),parseInt(repeatNumber),eventRepeatDays,'DD-MM-YYYY')
            if(findWeekDates?.length>0){
                setSelectedStartDate(findWeekDates)
                setSelectedEndDate(findWeekDates)
                setEventRepeatDays([moment().day()]);
            }
        }
        // dispatch({ type: "eventRepeatBy", payload: { Type: 'eventRepeatBy', eventRepeatBy: 'Weeks' ,eventTillDate:moment().add(15, 'days').format('YYYY-MM-DD'), SelectedStartDate: [], SelectedEndDate: []} }) 
    }
    return (
        <>
            <div className="modal fade default-popup repeat-event-popup" id="repeat-event-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="repeat-event-popup">
                                    <a href="#create-my-event-step-3-popup" className="close" data-dismiss="modal" aria-label="Close" onClick={resetPopup}><i className="av av-close-icon"></i></a>
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-box repeat-for-bx">
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio"
                                                         name="eventRepeatBy" 
                                                         onChange={() => { 
                                                            onRepeatChange(true, false, true),
                                                            eventRepeatByChange('Weeks')
                                                            // dispatch({ type: "eventRepeatBy", payload: { Type: 'eventRepeatBy', eventRepeatBy: 'Weeks' ,eventTillDate:moment().add(15, 'days').format('YYYY-MM-DD'), SelectedStartDate: [], SelectedEndDate: []} }) 
                                                            
                                                            }} 
                                                         checked={eventRepeatBy === 'Weeks' ? true : false} 
                                                         />
                                                    </label>
                                                </div>
                                                <div className="repeat-every-bx">
                                                    <ul className="cmn-ul-list">
                                                        <li>
                                                            <label>Repeat for</label>
                                                        </li>
                                                        <li>
                                                            <div className="week-day-number-select">
                                                                <input type="number" className="form-control" onChange={(e) => {
                                                                    if (parseInt(e.target.value) >0) {
                                                                        if(e.target.value<=8){
                                                                            changeRepeatNumber(e.target.value)
                                                                        }
                                                                    } else {
                                                                        changeRepeatNumber(1)
                                                                    }
                                                                }} name="repeatNumber" placeholder="0" min="1" max="8" title="Repeat" disabled={repeatNumberError||eventRepeatBy=="Weeks"?false:true} value={repeatNumber} />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex-select-bx">
                                                                <select  className="form-control custom-select-bx" disabled={repeatNumberError} value={eventRepeatBy}>
                                                                    <option value="Weeks">{repeatNumber > 1 ? 'Weeks' : 'Week'}</option>
                                                                </select>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="till-date-bx">
                                                    {eventRepeatBy == "Weeks" ?
                                                        <>
                                                            <ul className="cmn-ul-list">
                                                                <RepeatDays />
                                                            </ul>
                                                        </>
                                                        : ''}
                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-box">
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="eventRepeatBy" onChange={() => {
                                                            onRepeatChange(true, false, true);
                                                            eventRepeatByChange('TillDate')
                                                            // let date = FindDateTime.editFindDaysBetweenTwoDates(moment(eventSingleDate,'DD-MM-YYYY').format('YYYY-MM-DD'), eventTillDate,'DD-MM-YYYY');
                                                        //  return    dispatch({ type: 'SelectedStartDate', payload: { Type: 'SelectedStartDate', eventRepeatBy: 'TillDate', SelectedStartDate: date, SelectedEndDate: date, repeatNumber: 1 } });
                                                        }} checked={eventRepeatBy === 'TillDate' ? true : false} />
                                                    </label>
                                                </div>
                                                <div className="repeat-on-bx">
                                                    <ul className="cmn-ul-list">
                                                        <li><label>Till date</label></li>
                                                        <li>
                                                        
                                                        <input type="date" className="form-control" onChange={EventTillDate}
                                                            placeholder="17 June 2020" disabled={eventTillDateError} min={moment().format('DD/MM/YYYY')} name="eventTillDate" value={eventTillDate}  /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-box">
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="eventRepeatBy" onChange={() => {
                                                            onRepeatChange(true, true, false);
                                                            eventRepeatByChange('MultipleDate')
                                                            // dispatch({ type: 'eventRepeatBy', payload: { Type: 'eventRepeatBy', eventRepeatBy: 'MultipleDate', repeatNumber: 1,eventTillDate:moment().add(15, 'days').format('YYYY-MM-DD'), SelectedStartDate: [eventSingleDate], SelectedEndDate: [eventSingleDate] } })
                                                        }} checked={eventRepeatBy === 'MultipleDate' ? true : false} />
                                                    </label>
                                                </div>
                                                <div className="repeat-on-bx repeat-select-date-bx">
                                                    <ul className="cmn-ul-list">
                                                        <li>
                                                            <label>Select date(s)</label>
                                                        </li>
                                                        <li>

                                                            {chooseDateError ? <input type='text' disabled={true} /> : 
                                                            
                                                            <DatePicker
                                                                multiple
                                                                mapDays={({ date }) => {
                                                                    if (moment(date.format(),'DD-MM-YYYY').format('DD-MM-YYYY')===eventSingleDate) return {
                                                                    disabled: true,
                                                                    style: { color: "#28a745" },
                                                                      onClick: () => toastr['error']("start date are disabled")
                                                                    }
                                                                }}
                                                                minDate={new Date()}
                                                                value={SelectedStartDate}
                                                                onChange={setMultipleChoose}
                                                                inputClass="form-control"
                                                                format="DD-MM-YYYY"
                                                                plugins={[<DatePanel />]}
                                                                disabled={eventRepeatBy==="MultipleDate"?false:true}
                                                                // maxDate={new Date().setDate(60)}
                                                            />
                                                            }


                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-event-btns">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <button type="button" className="btn link-btn" onClick={resetButtonPopup}>Reset</button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn default-btn" onClick={saveRepeatValidation} >Save</button>
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
}

export default React.memo(RepeatEvery);



