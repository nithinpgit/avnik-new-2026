import React from 'react';
const ReportProfilePopup = (props) => {
    const json=[{name:"Fake profile"},{name:"Unusual activity"},{name:"Report for abusing"},{name:"Other"}];
    return (
        <>
        <div className="modal fade default-popup report-event-popup" id="report-event-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <form  onSubmit={props.handleSubmit}>
                <div className="modal-content">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label" htmlFor="tag">Reason for reporting</label>
                            <ul>
                                {json.map((res,i)=>
                                <li key={i}>
                                    <div className="radio custom">
                                        <label>
                                            <input type="radio" onChange={(e)=>props.onChange(e,props.reportId,props.type)} checked={props.value==''?false:props?.value===res.name?true:false} name="report" value={res?.name}/>
                                            {res?.name}
                                        </label>
                                    </div>
                                </li>)}
                            </ul>
                        </div>
						<div className="form-group report-comment">						
						<label className="form-label" htmlFor="CardNumber">Message</label>
						<textarea className="form-control" placeholder="Enter Report Info" name="comment" onChange={(e)=>props.onChange(e,props.reportId,props.type)} required={true} value={props?.comment}>{props?.comment}</textarea></div>
						<button className="btn default-btn js-btn-prev" type="submit" disabled={props?.comment==''||props?.value==''?true:false} title="Report">Report</button>
                    </div>                   
                </div>
            </form>
        </div>
    </div> 
        </>
    );
}
export default ReportProfilePopup;
