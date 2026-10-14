import React, { Component, useState, useContext, useEffect } from 'react';
import moment from 'moment';
import FindDateTime from '../../../../screens/CreateEvent/Classes/FindDateTime/FindDateTime';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import EditEventContext from '../../EditEventContext/EditEventContext';

const EditRepeat = () => {
    const [state, dispatch] = useContext(EditEventContext);
    const [repeatNumberError, setRepeatNumberError] = useState(false);
    const [eventTillDateError, setEventTillDateError] = useState(false);
    const [chooseDateError, setChooseDateError] = useState(false);
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
    function repeatValidation() {

        if (state?.event_repeat_type == "Weeks") {

            if (parseInt(state?.event_repeat_interval) > 0) {
                $('#edit-repeat-event-popup').modal('hide');
                dispatch({type:'eventRepeatSave',payload:{Type:'eventRepeatSave',eventRepeatSave:true}});
            } else {
                toastr["error"]('please enter repeat number grater then 0');
            }
        } else if (state?.event_repeat_type == "TillDate") {
            if (state.event_till_date) {
                $('#edit-repeat-event-popup').modal('hide');
                dispatch({type:'eventRepeatSave',payload:{Type:'eventRepeatSave',eventRepeatSave:true}});
            } else {
                toastr["error"]('sorry you have,t selected any TillDate')
            }
        } else if (state?.event_repeat_type == "MultipleDate") {
            dispatch({type:'eventRepeatSave',payload:{Type:'eventRepeatSave',eventRepeatSave:true}});
            if (state.event_start_dates?.length > 0) {
                $('#edit-repeat-event-popup').modal('hide');
            }
        } else {
            $('#edit-repeat-event-popup').modal('hide');
            toastr["error"]("you are not selected any multiple option");
        }
    }
    const RepeatDays = () => {
        const onChangeHandel = (e,resData,toggle) => {
            setTimeout(() => {
                if (state?.event_repeat_interval == 0 && state?.event_repeat_type === "Weeks") {
                    dispatch({
                        type: 'REP_BY_DAY', payload: {
                            Type: 'REP_BY_DAY',
                            event_repeat_days:[moment().day()]
                        }
                    });
                }
                if(parseInt(state?.event_repeat_interval)>0&&state?.event_repeat_type==="Weeks"){
                let Weeks = state.event_repeat_days;
                    if(toggle){
                        Weeks= state?.event_repeat_days.filter((res)=>res!=resData?.day.toString());
                    }else {                       
                        Weeks=[...state?.event_repeat_days,resData?.day.toString()];
                    }
                    // dispatch({ type: 'RANDOM_TYPE', payload: { Type: 'RANDOM_TYPE',event_repeat_days:Weeks} });
                  let findWeekDates= FindDateTime.findWeeksBetweenTwoDatesDays(moment(state.event_date,'YYYY-MM-DD'),parseInt(state?.event_repeat_interval),Weeks,'YYYY-MM-DD')
                //   let findWeekDates= [];
                    if(findWeekDates?.length>0){
                        dispatch({ type: 'SelectedStartDate', payload: { Type: 'SelectedStartDate',event_repeat_days:Weeks, event_start_dates: findWeekDates, event_end_dates: findWeekDates } });
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
                        <input type="checkbox" 
                        disabled={state?.FollowingBy=="ThisEvent"?false:true}
                        onChange={state?.FollowingBy=="ThisEvent"?(e) =>onChangeHandel(e,res,state?.event_repeat_days?.find((find)=>res.day==find)):""} 
                        name={res?.fullName} defaultChecked={state?.event_repeat_days?.find((find)=>res.day==find)} value={res?.fullName} />
                        <span>{res?.shortName}</span>
                    </label>
                </div>
            </li>)

            }
            </>
        );
    }
    const repeatWeeksInterval=(e)=>{
        let findWeekDates= FindDateTime.findWeeksBetweenTwoDatesDays(moment(state.event_date,'YYYY-MM-DD'),parseInt(state?.event_repeat_interval),state?.event_repeat_days,'YYYY-MM-DD')
            if (parseInt(e.target.value) >0) {
                if(e.target.value<=8){
                    dispatch({ type: e.target.name, payload: { Type: e.target.name, event_repeat_interval: e.target.value,event_start_dates: findWeekDates, event_end_dates: findWeekDates } });
                }
            } else {

                dispatch({ type:e.target.name, payload: { Type:e.target.name, event_repeat_interval: 1 ,event_start_dates: findWeekDates, event_end_dates: findWeekDates} });
            }
    }
    const resetPopup=()=>dispatch({type: 'eventTillDate',payload: {Type: 'eventTillDate',eventRepeatSave:false,eventRepeat:false,event_till_date: moment(state.event_date,'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'),repeatNumber: 1,eventRepeatBy: '',event_start_dates: [moment(state.event_date,'YYYY-MM-DD').format('YYYY-MM-DD')],event_end_dates: [moment(state.event_date,'YYYY-MM-DD').format('YYYY-MM-DD')]}}); 
    
    const EventTillDate=(e)=>{
        console.log(e.target.value);
        let date = FindDateTime.editFindDaysBetweenTwoDates(moment(state.event_date,'YYYY-MM-DD').format('YYYY-MM-DD'), e.target.value,'YYYY-MM-DD');
        dispatch({ type:e.target.name, payload: { Type:e.target.name, event_till_date: e.target.value, event_start_dates: date, event_end_dates: date, event_repeat_type: 'TillDate', repeatNumber: 1 } });
    }
    const setMultipleChoose=(e)=>{
        var dataObj=[]
        if(e?.length>0){
            e.map((res)=>
                dataObj.push(moment(res.format(),'YYYY-MM-DD').format('YYYY-MM-DD'))   
            )
        }
        dispatch({ type:"setMultipleChoose", payload: { Type:"setMultipleChoose", event_start_dates: dataObj, event_end_dates: dataObj} });

        console.log(dataObj,e,'res')    
    }
    // const multipleDateValue=[]
    // if(state.SelectedStartDate?.length>0){
    //     state.SelectedStartDate.map((res)=>
    //         multipleDateValue.push(moment(res,'YYYY-MM-DD').format('D MMM YY'))
    //     )   
    // }
    return (
        <>
            <div className="modal fade default-popup repeat-event-popup" id="edit-repeat-event-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="repeat-event-popup">
                                    <a href="#create-my-event-step-3-popup" className="close" data-dismiss="modal" aria-label="Close"
                                     onClick={state?.FollowingBy=="ThisEvent"?()=>!state?.eventRepeatSave && resetPopup():""}
                                     ><i className="av av-close-icon"></i></a>
                                    <div className="row">
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-box repeat-for-bx">
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event_repeat_type"
                                                         onChange={state?.FollowingBy=="ThisEvent"?() => { onRepeatChange(false, true, false), dispatch({ type: "eventRepeatBy", payload: { Type: 'eventRepeatBy', event_repeat_type: 'Weeks' ,event_till_date:moment(state.event_date,'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'), event_start_dates: [], event_end_dates: []} })}:""}
                                                        checked={state?.event_repeat_type === 'Weeks' ? true : false} 
                                                        disabled={state?.FollowingBy=="ThisEvent"?false:true}
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
                                                                <input type="number" className="form-control"
                                                                 onChange={state?.FollowingBy=="ThisEvent"?repeatWeeksInterval:()=>{}}
                                                                //   name="event_repeat_interval" placeholder="0" min="1" max="8" title="Repeat" 
                                                                //   disabled={true} 
                                                                //   value={state?.event_repeat_interval} />
                                                                  
                                                                  name="event_repeat_interval" placeholder="0" min="1" max="8" title="Repeat" disabled={state?.FollowingBy=="ThisEvent"?false:repeatNumberError||state?.event_repeat_type=="Weeks"?false:true} value={state?.event_repeat_interval} />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="flex-select-bx">
                                                                <select  className="form-control custom-select-bx" 
                                                                // onChange={(e) => dispatch({ type:e.target.name, payload: { Type: e.target.name, event_repeat_type: e.target.value } })} 
                                                                // name="event_repeat_type" disabled={true} value={state?.event_repeat_type}>
                                                                name="event_repeat_type" disabled={state?.FollowingBy=="ThisEvent"?false:repeatNumberError?repeatNumberError:true} value={state?.event_repeat_type}>
                                                                    <option value="Weeks">{state?.event_repeat_interval > 1 ? 'Weeks' : 'Week'}</option>
                                                                </select>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="till-date-bx">
                                                    {state?.event_repeat_type == "Weeks" ?
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
                                                        <input type="radio" name="event_repeat_type" 
                                                        onChange={state?.FollowingBy=="ThisEvent"?() => {
                                                            onRepeatChange(true, false, true);
                                                            let date = FindDateTime.editFindDaysBetweenTwoDates(moment(state.event_date,'YYYY-MM-DD').format('YYYY-MM-DD'), state.event_till_date,'YYYY-MM-DD');
                                                         return    dispatch({ type: 'event_start_dates', payload: { Type: 'event_start_dates', event_repeat_type: 'TillDate', event_start_dates: date, event_end_dates: date, repeatNumber: 1 } });
                                                        }:""} 
                                                        disabled={state?.FollowingBy=="ThisEvent"?false:true}
                                                        checked={state?.event_repeat_type === 'TillDate' ? true : false} />
                                                    </label>
                                                </div>
                                                <div className="repeat-on-bx">
                                                    <ul className="cmn-ul-list">
                                                        <li><label>Till date</label></li>
                                                        <li><input type="date" className="form-control" 
                                                        onChange={state?.FollowingBy=="ThisEvent"?EventTillDate:""}
                                                            placeholder="17 June 2020"
                                                            // disabled={true} 
                                                             disabled={state?.FollowingBy=="ThisEvent"?false:eventTillDateError} 
                                                            min={moment().format('DD/MM/YYYY')} name="event_till_date" value={state.event_till_date}  /></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-box">
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event_repeat_type" 
                                                        onChange={state?.FollowingBy=="ThisEvent"?() => {
                                                            onRepeatChange(true, true, false);
                                                            dispatch({ type: 'eventRepeatBy', payload: { Type: 'eventRepeatBy', event_repeat_type: 'MultipleDate', repeatNumber: 1,event_till_date:moment(state.event_date,'YYYY-MM-DD').add(15, 'days').format('YYYY-MM-DD'), event_start_dates: [state.event_date], event_end_dates: [state.event_date] } })
                                                        }:""}
                                                         checked={state?.event_repeat_type === 'MultipleDate' ? true : false} />
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
                                                                    if (moment(date.format(),"YYYY-MM-DD").format('YYYY-MM-DD')===state.event_date) return {
                                                                    disabled: true,
                                                                    style: { color: "#28a745" },
                                                                    onClick: () => toastr['error']("start date are disabled")
                                                                    }
                                                                }}
                                                                // mapDays={({ date }) => {
                                                                //     if (moment(date.format(),"YYYY-MM-DD").format('YYYY-MM-DD')) return {
                                                                //     disabled: true,
                                                                //     style: { color: "#28a745" },
                                                                //     // onClick: () => toastr['error']("start date are disabled")
                                                                //     }
                                                                // }}
                                                                minDate={new Date()}
                                                                value={state.event_start_dates}
                                                                onChange={setMultipleChoose}
                                                                inputClass="form-control"
                                                                format="YYYY-MM-DD"
                                                                plugins={[<DatePanel 
                                                                removeButton={state?.FollowingBy=="ThisEvent"?true:false} 

                                                                />]}
                                                                disabled={state?.event_repeat_type==="MultipleDate"?false:true}
                                                                // maxDate={new Date().setDate(60)}
                                                            />
                                                            }


                                                        </li>
                                                        {/* <MultipleDatePicker onSubmit={dates => {

                                                                let Dates = [state.eventSingleDate];
                                                                dates.map((res) => {
                                                                    Dates.push(moment(res).format('DD-MM-YYYY'));
                                                                });
                                                                dispatch({ type: 'SelectedStartDate', payload: { Type: 'SelectedStartDate', SelectedStartDate: Dates, SelectedEndDate: Dates, event_repeat_type: 'MultipleDate', repeatNumber: 1 } });



                                                            }} minDate={new Date()} value={state.SelectedStartDate} disabled={chooseDateError} /> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12">
                                            <div className="repeat-event-btns">
                                                {state?.FollowingBy=="ThisEvent"?<ul className="cmn-ul-list">
                                                    <li>
                                                        <button type="button" className="btn link-btn" onClick={resetPopup}>Reset</button>
                                                    </li>
                                                    <li>
                                                        <button type="button" className="btn default-btn" onClick={repeatValidation} >Save</button>
                                                    </li>
                                                </ul>:""}
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

export default React.memo(EditRepeat);



