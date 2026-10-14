import React, { useState,Component, useContext, useEffect } from "react";
import moment from "moment";
import EditEventContext from "../EditEventContext/EditEventContext";
const EventEditTime = () => {
  const [state, dispatch] = useContext(EditEventContext);
  const onClickFormGroupButton = (index) => {
    let eventDurationSlots = [...state.event_time_slot];
    let TimeOverlappedIndex = [...state.TimeOverlappedIndex];
    console.log(eventDurationSlots.filter((res,ind)=>ind==index))
    dispatch({
      type: "eventDurationSlots",
      payload: {
        Type: "eventDurationSlots",
        delete_event_time_slot:eventDurationSlots.filter((res,ind)=>ind==index),
        event_time_slot: eventDurationSlots.filter((res,ind)=>ind!=index),
        TimeOverlappedIndex:TimeOverlappedIndex.filter((res)=>res!=index)
      },
    });
  };

  const onChangeFormGroupInput = (index, event) => {
    let eventDurationSlots = [...state.event_time_slot];
    if (event.target.name === "startTime" ||event.target.name === "endTime") {
      let duration = moment(
        moment(eventDurationSlots[index].end_date_time, "h:mm A").diff(
          moment(eventDurationSlots[index].start_date_time, "h:mm A")
        )
      ).minutes();
      eventDurationSlots[index].duration = duration;
      eventDurationSlots[index][event.target.name] = moment(
        event.target.value,
        "h:mm A"
      ).format("HH:mm:ss");
    } else if (event.target.name === "cost" || event.target.name === "cost_type") {
      if (event.target.name === "cost" && event.target.value <= 0) {
        eventDurationSlots[index][event.target.name] =event.target.value;
        eventDurationSlots[index]["cost_type"] = "free";
      } else if (event.target.name === "cost_type" && event.target.value === "paid") {
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
        event_time_slot: eventDurationSlots,
      },
    });
  };
  console.log(state?.event_time_slot, "add time on create");
  const onAddTime = () => {
    let startTime = moment(
      state.eventSingleDate + " " + moment().format("HH:mm:ss"),
      "DD-MM-YYYY HH:mm:ss"
    ).format("DD-MM-YYYY HH:mm:ss");
    let endTime = moment(
      state.eventSingleDate + " " + moment().format("HH:mm:ss"),
      "DD-MM-YYYY HH:mm:ss"
    ).format("DD-MM-YYYY HH:mm:ss");
    if (moment().format("m") > 0) {
      // startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment().format("m") > 15) {
      // startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":30:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":30:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment().format("m") > 30) {
      // startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":45:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":45:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment().format("m") > 45) {
      // startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":59:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":00:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(1, "hour")
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    } else if (moment().format("m") == 0) {
      // startTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":00:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // ).format("DD-MM-YYYY HH:mm:ss");
      // endTime = moment(
      //   state.eventSingleDate +
      //   " " +
      //   moment(
      //     moment().format("HH") + ":15:" + moment().format("ss"),
      //     "HH:mm:ss"
      //   ).format("HH:mm:ss"),
      //   "DD-MM-YYYY HH:mm:ss"
      // )
      //   .add(15, "minutes")
      //   .format("DD-MM-YYYY HH:mm:ss");
    }
    // dispatch({
    //   type: "eventDurationSlots",
    //   payload: {
    //     Type: "eventDurationSlots",
    //     eventDurationSlots: [
    //       ...state.event_time_slot,
    //       {
    //         startDateTime: startTime,
    //         endDateTime: endTime,
    //         cost: 0,
    //         eventCostType: "free",
    //         eventDuration: 15,
    //         seats: 1,
    //         interval: 0,
    //         ChangeTime: {
    //           time: moment().format("DD-MM-YYYY HH:mm:ss"),
    //           index: 0,
    //           type: "none",
    //         },
    //       },
    //     ],
    //   },
    // });
  };
  const changeTime = (time, index, type) => {
    $("#EditTimeChangeModal").modal({ backdrop: "static", keyboard: false });
    dispatch({
      type: "ChangeTime",
      payload: { Type: "ChangeTime", ChangeTime: { time, index, type } },
    });
  };
  
  useEffect(() => {
    let overlapped = false;
    let overlappedIndex = [-1,-1];
    var timeCollection = state.event_time_slot;
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
      dispatch({
        type: "TimeOverlappedFN",
        payload: { Type: "TimeOverlappedFN", TimeOverlapped: overlapped,TimeOverlappedIndex:overlappedIndex },
      });
    // }
    console.log(overlapped,JSON.stringify(state.event_time_slot), "overlapped");
  }, [state.TimeOverlappedIndexSave,state.event_time_slot?.length,JSON.stringify(state.event_time_slot)?.length]);


  return (
    <>
      <div className="t-c-s-row float-right mb-2">
        {/*<div className="tcs-col tcs-add-remove">
          <a
            className="dynamicForm__itemButton  default-btn js-btn-prev"
            // type="button"
            // onClick={()=>,console.log(state.event_time_slot,'adddededed')}
            onClick={onAddTime}
            // onClick={index === state.event_time_slot.length-1 ? onClickButtonAdder :()=> onClickFormGroupButton(index)}
            // disabled={index === 0 ? !isFormGroupDeletionAllowed : undefined}
            tabIndex="-1"
            style={{ top: "-1px" }}
          >
            {/* <i className="fa fa-plus"></i> 
            Add
            {/* {index == state.event_time_slot.length-1 ? "+" : '-'} 
          </a>
        </div>*/}
      </div>

      {state.event_time_slot.map((value, index) => (
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
                      moment(value?.start_date_time,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("YYYY-MM-DD HH:mm:ss"),
                      index,
                      "start"
                    )
                  }
                >
                  <span selected={true} disabled={true}>
                    {moment(
                      value?.start_date_time,
                      "YYYY-MM-DD HH:mm:ss"
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
                        value?.end_date_time,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("YYYY-MM-DD HH:mm:ss"),
                      index,
                      "end"
                    )
                  }
                >
                  <span selected={true}>
                    {moment(
                      value?.end_date_time,
                      "YYYY-MM-DD HH:mm:ss"
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
                          name="cost_type"
                          onChange={(e) =>
                            onChangeFormGroupInput(
                              index,
                              e
                            )
                          }
                          style={{ width: "75px" }}
                          value={value.cost_type}
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
                        style={value.cost_type =="free"? { display: "none" }: { display: "block" }}
                      >
                        <input
                          type="number"
                          className="form-control"
                          name="cost"
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
                  name="total_seats"
                  value={value?.total_seats}
                />
              </div>
             
                <div className="tcs-col tcs-add-remove">
                  {state.event_time_slot?.length>1?<button
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
                  </button>:""}
                </div>
              
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default EventEditTime;
