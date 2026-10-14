import React, { Component, useContext, useEffect } from "react";
import moment from "moment";
import FindDateTime from "../../Classes/FindDateTime/FindDateTime";
import CreateEventContext from "../../Pages/CreateEventContext/CreateEventContext";
import TimePicker from "../../../../Comman/TimePicker";
import { useState } from "react";
const EventAddTime = () => {
  const [state, dispatch] = useContext(CreateEventContext);
  const onClickFormGroupButton = (index) => {
    let eventDurationSlots = [...state.eventDurationSlots];
    let TimeOverlappedIndex = [...state.TimeOverlappedIndex];
    eventDurationSlots.splice(index, 1);
    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        eventDurationSlots: eventDurationSlots,
        TimeOverlappedIndex:TimeOverlappedIndex.filter((res)=>res!=index)
      },
    });
  };

  const onChangeFormGroupInput = (index, event) => {
    let eventDurationSlots = [...state.eventDurationSlots];
    if (event.target.name === "startTime" || event.target.name === "endTime") {
      let duration = moment(
        moment(eventDurationSlots[index].endTime, "h:mm A").diff(
          moment(eventDurationSlots[index].startTime, "h:mm A")
        )
      ).minutes();
      eventDurationSlots[index].eventDuration = duration;
      eventDurationSlots[index][event.target.name] = moment(
        event.target.value,
        "h:mm A"
      ).format("HH:mm:ss");
    } else if (event.target.name === "cost" || event.target.name === "eventCostType") {
      if (event.target.name === "cost" && event.target.value <= 0) {
        eventDurationSlots[index][event.target.name] =event.target.value;
        // eventDurationSlots[index]["eventCostType"] = "free";
      } else if (event.target.name === "eventCostType" && event.target.value === "paid") {
        eventDurationSlots[index][event.target.name] =event.target.value;
        eventDurationSlots[index]["cost"] = 1;
      } else {
        eventDurationSlots[index][event.target.name] =event.target.value;
      }
    } else {
      eventDurationSlots[index][event.target.name] = event.target.value;
    }
    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        eventDurationSlots: eventDurationSlots,
      },
    });
  };
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
  const { startTimeFUN, endTimeFUN }= getCurrentStartAndEndTime();
  const onAddTime = () => {
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
  const changeTime = (time, index, type) => {
    $("#TimeChangeModal").modal({ backdrop: "static", keyboard: false });
    dispatch({
      type: "ChangeTime",
      payload: { Type: "ChangeTime", ChangeTime: { time, index, type } },
    });
  };
  
  useEffect(() => {
    let overlapped = false;
    let overlappedIndex = [-1,-1];
    var timeCollection = state.eventDurationSlots;
    let iterations = timeCollection.length;
      // if (state.eventTitle!='') {    
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
           overlappedIndex.push(i);
           overlappedIndex.push(a);
           overlapped = true;
            if (!--iterations){
              toastr['error']('Time conflict');
            }
            
            
            
          }else if(moment(timeCollection[i].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(timeCollection[i].startDateTime,"DD-MM-YYYY HH:mm:ss"),'Hours')>6){
            overlapped = true;
            overlappedIndex.push(i);
            overlappedIndex.push(a);
          }else{
            // overlappedIndex.filter(res=>res!=i||a);
            if(moment(state.eventDurationSlots[state.ChangeTime.index].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(state.eventDurationSlots[state.ChangeTime.index].startDateTime,"DD-MM-YYYY HH:mm:ss"),'Hours')>6){
              toastr["error"]('Event duration can not be greater than 6 hours 3'); 
              overlappedIndex.push(index);
              // dispatch({
              //         type: "TimeOverlapped",
              //         payload: { Type: "TimeOverlapped", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
              //     });
          }else if(moment(state.eventDurationSlots[state.ChangeTime.index].endDateTime,"DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')===moment(state.eventDurationSlots[state.ChangeTime.index].startDateTime,"DD-MM-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')) {
              toastr["error"]('Minimum 15 min of event duration required'); 
              overlappedIndex.push(index);
              // dispatch({
              //     type: "TimeOverlappedMin",
              //     payload: { Type: "TimeOverlappedMin", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
              // });
          }else if(moment(state.eventDurationSlots[state.ChangeTime.index].endDateTime,"DD-MM-YYYY HH:mm:ss").diff(moment(state.eventDurationSlots[state.ChangeTime.index].startDateTime,"DD-MM-YYYY HH:mm:ss"),'minutes')<15) {
              toastr["error"]('Start time can not be greater than end time'); 
              overlappedIndex.push(index);
              // dispatch({
              //     type: "TimeOverlappedMin",
              //     payload: { Type: "TimeOverlappedMin", TimeOverlapped: true,TimeOverlappedIndex:TimeOverlappedIndex },
              // });
          }
          }
        }
      }
    // } else {
    //   overlapped = true;
    // }

    // if (overlapped) {
    //   dispatch({
    //     type: "TimeOverlapped",
    //     payload: { Type: "TimeOverlapped", TimeOverlapped: overlapped,TimeOverlappedIndex:overlappedIndex },
    //   });
    //  } else if (!overlapped) {
      dispatch({
        type: "TimeOverlappedFN",
        payload: { Type: "TimeOverlappedFN", TimeOverlapped: overlapped,TimeOverlappedIndex:[...new Set(overlappedIndex)] },
      });
    // }
    console.log(overlapped,JSON.stringify(state.eventDurationSlots), "overlapped");
  }, [state.TimeOverlappedIndexSave,state.eventDurationSlots?.length,JSON.stringify(state.eventDurationSlots)?.length, state.eventTitle]);


  return (
    <>
      <div className="t-c-s-row float-right mb-2">
        <div className="tcs-col tcs-add-remove">
          <a
            className="dynamicForm__itemButton  default-btn js-btn-prev"
            // type="button"
            // onClick={()=>,console.log(state.eventDurationSlots,'adddededed')}
            onClick={onAddTime}
            // onClick={index === state.eventDurationSlots.length-1 ? onClickButtonAdder :()=> onClickFormGroupButton(index)}
            // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
            tabIndex="-1"
            style={{ top: "-1px" }}
          >
            {/* <i className="fa fa-plus"></i> */}
            Add
            {/* {index == state.eventDurationSlots.length-1 ? "+" : '-'} */}
          </a>
        </div>
      </div>

      {state.eventDurationSlots.map((value, index) => (
        console.log(state.TimeOverlappedIndex,index, "render add time 2"),

        <div className={`bdr-frm-bx tcs-outer ${state.TimeOverlappedIndex.find((res)=>res.toString()==index.toString())==false?"border border-5 border-danger rounded":state.TimeOverlappedIndex.find((res)=>res.toString()==index.toString())?"border border-5 border-danger rounded":""}`} key={index}>
          <div className="add-time-input">
            <div className="t-c-s-row">
              <div className="tcs-col tcs-from">
                <span className="label-small-h">From</span>
                {/* <TimePicker 
                className="dynamicForm__itemInput form-control custom-select-bx"
                onChange={(e)=>onChangeFormGroupInput(index,e)}
                name="startTime"
                minTime={moment(value.startTime,'HH:mm:ss').format('h:mm A')}
                defaultValue={moment(value.startTime,'HH:mm:ss').format('h:mm A')}
                /> */}
                <span className="dynamicForm__itemInput form-control custom-select-bx"  style={{cursor: 'pointer'}}
                  onClick={() =>
                    changeTime(
                      moment(
                        value?.startDateTime,
                        "DD-MM-YYYY HH:mm:ss"
                      ).format("DD-MM-YYYY HH:mm:ss"),
                      index,
                      "start"
                    )
                  }
                >
                  <span selected={true} disabled={true}>
                    {moment(
                      value?.startDateTime,
                      "DD-MM-YYYY HH:mm:ss"
                    ).format("hh:mm a")}
                  </span>
                </span>
              </div>
              <div className="tcs-col tcs-to">
                <span className="label-small-h">To</span>
                {/* <TimePicker 
                  className="dynamicForm__itemInput form-control custom-select-bx" 
                  onChange={(e)=>onChangeFormGroupInput(index,e)}
                  name="endTime" 
                  minTime={moment(value.startTime,'HH:mm:ss').add(15,'minutes').format('h:mm A')}
                  defaultValue={moment(value.endTime,'HH:mm:ss').format('h:mm A')}
                  /> */}
                <span
                  className="dynamicForm__itemInput form-control custom-select-bx" style={{cursor: 'pointer'}}
                  
                  onClick={() =>
                    changeTime(
                      moment(
                        value?.endDateTime,
                        "DD-MM-YYYY HH:mm:ss"
                      ).format("DD-MM-YYYY HH:mm:ss"),
                      index,
                      "end"
                    )
                  }
                >
                  <span selected={true}>
                    {moment(
                      value?.endDateTime,
                      "DD-MM-YYYY HH:mm:ss"
                    ).format("hh:mm a")}
                  </span>
                </span>
              </div>
              <div className="tcs-col tcs-cost">
                <div className="b-f-in">
                  <span className="label-small-h">Cost</span>
                  <div className="free-paid-bx">
                    <div className="flex-container">
                      <div className="flex-select-bx">
                        <select
                          className="form-control custom-select-bx"
                          name="eventCostType"
                          onChange={(e) =>
                            onChangeFormGroupInput(
                              index,
                              e
                            )
                          }
                          style={{ width: "75px" }}
                          value={value.eventCostType}
                        >
                          <option value="free">
                            {" "}
                            Free
                          </option>
                          <option value="paid">
                            {" "}
                            Paid
                          </option>
                        </select>
                      </div>
                      <div
                        className="flex-input-bx tcs-cost-input"
                        style={value.eventCostType =="free"? { display: "none" }: { display: "block" }}
                      >
                        <input
                          type="number"
                          className="form-control"
                          name="cost"
                          min="0"
                          onChange={(e) =>
                            onChangeFormGroupInput(
                              index,
                              e
                            )
                          }
                          value={value.cost}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tcs-col tcs-seats">
                <span className="label-small-h">Seats</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  onChange={(e) =>
                    onChangeFormGroupInput(index, e)
                  }
                  className="dynamicForm__itemInput form-control"
                  placeholder="1"
                  name="seats"
                  value={value.seats}
                />
              </div>
              {index == 0 ? (
                ""
              ) : (
                <div className="tcs-col tcs-add-remove">
                  <button
                    className="dynamicForm__itemButton btn default-btn js-btn-prev "
                    type="button"
                    onClick={() =>
                      onClickFormGroupButton(index)
                    }
                    // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
                    tabIndex="-1"
                    style={{ top: "-1px" }}
                  >
                    {/* <i className='fa fa-close fa-sm text-danger'></i> */}
                    <span className="text-danger">x</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default EventAddTime;
