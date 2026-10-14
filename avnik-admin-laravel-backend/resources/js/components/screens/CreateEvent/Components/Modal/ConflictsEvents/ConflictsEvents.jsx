import React from 'react';
import moment from 'moment';
const ConflictsEvents = ({events,id}) => {
    console.log(events,'')
    return (
 <>
<div className="modal fade default-popup repeat-event-popup" id={id || 'Conflicts-Events-modal'} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <form>
            <div className="modal-content">
                <div className="modal-header">
                        <h5>You have the following conflicting event(s)</h5>
                        <a href="#create-my-event-step-3-popup" className="close" data-dismiss="modal" aria-label="Close" ><i className="av av-close-icon"></i></a>
                </div>
                <div className="modal-body">
                        <div className="row main-div-con">
                            {events?.length>0?events.map((res,i)=>
                            <div key={res?.id} className="col-12 col-sm-12">
                                <div className="repeat-box">
                                    {/* <div className="radio custom">
                                        <label>
                                            <input type="radio" name="eventConflict" disabled={true}/>
                                        </label>
                                    </div> */}
                                    <div className="repeat-on-bx repeat-select-date-bx">
                                        <ul >
                                            <li key={res?.id}>
                                                <label>{res?.events?.event_title} {moment.utc(res?.start_date_time).local().format('DD MMM YYYY , hh:mm a')} - {moment.utc(res?.end_date_time).local().format('hh:mm a')} ${res?.cost}</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>): <div className="repeat-box"> There is no conflict events</div>}
                            
                        </div>
                        <div className="main-button-con">
                                <a href="#create-my-event-step-3-popup" className="btn default-btn " data-dismiss="modal" aria-label="Close"  >Ok</a>
                        </div>
                    </div>
               
            </div>
        </form>
    </div>
</div>
</>)
}
export default ConflictsEvents;