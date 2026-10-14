import React from 'react';
import moment from 'moment';
const TimePicker = (props) => {

    function isEarlierThanEndLimit(timeValue, endLimit, lastValue) {
        var timeValueIsEarlier = moment(timeValue, 'h:mm A').diff(moment(endLimit, 'h:mm A')) < 0
        var timeValueIsLaterThanLastValue = lastValue === undefined ? true : moment(lastValue, 'h:mm A').diff(moment(timeValue, 'h:mm A')) < 0
        return timeValueIsEarlier && timeValueIsLaterThanLastValue;
    }

    var timeValue =props.beginLimit || "12:00AM";
    var lastValue;
    var endLimit = props.endLimit || "11:59PM";
    var step = props.step || 15;
    var options = [];
    var Hours = [];
    var Minutes = [];
    // options.push(<option key={timeValue} value={timeValue}>{timeValue}</option>);
    // while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
    //     lastValue = timeValue;
    //     timeValue = moment(timeValue, 'h:mm A').add(step, 'minutes').format('h:mm A');
    //     if(props?.minTime!=undefined){
    //         if(moment(timeValue,'h:mm A')>=moment(props?.minTime, 'h:mm A')){
    //             options.push(<option key={timeValue} value={timeValue} selected={props.defaultValue===timeValue?true:false}  >{timeValue}</option>)
    //         }
    //     }else{
    //         options.push(<option key={timeValue} value={timeValue} selected={props.defaultValue===timeValue?true:false}  >{timeValue}</option>)
    //     }
    // }
    for (let  i=1; i<13; i++) {
        Hours.push(<option key={i} value={i} >{i} hr</option>);
      }
    return ( 
        <>
        <input className="form-control" placeholder={moment().format('hh:mm a')} onClick={()=>$('#TimeChangeModal').modal('show')} value={moment().format('hh:mm a')} readOnly={true}/>
        {/*  <select className={props.className || "form-control"} defaultValue={props.defaultValue} onChange={props.onChange} name={props.name} >
             {options}
        </select> */}

        </>         
    )

};
// #endregion

export default TimePicker;

