import React, { Component, useContext } from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import UrlService, { FileManagerPath } from '../../../../../ApiServer/UrlService';
import  EventFilesUploadPoup  from './EventFileUpload/EventFilesUploadPoup';
import CreateEventContext from '../../Pages/CreateEventContext/CreateEventContext';
import { showHideDiv } from '../../../../../utility/UtilityFunctions';
import Auth from '../../../../../Routes/Auth';
const StepFour =({resetFormState,removeSetFiles,handleFormSubmit})=> {
    const [state,dispatch] = useContext(CreateEventContext);
    const inputFileRef = React.useRef();
    const onFileClick = () => {
        inputFileRef.current.click();
      };

    const onFileChangeCapture =async(e)=>{
        console.log(e.target.files)
        const form_data = new FormData();
        for (const file of e.target.files) {
            form_data.append('files[]', file, file.name);
        }
        try {
            // ApiService._uploadMultipleFiles(form_data).then((res)=>{
            //     console.log(res,'uploadFile');
            // }).catch((error)=>{
            //     console.log(error)
            // })
            const response = await axios.post(UrlService.multipleFileUploadUrl(), form_data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        authorization: `Bearer ${Auth.getAccessToken()}`,
                    },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.lengthComputable) {
                            let ProgressBar = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                            
                            dispatch({type:'fileUploadProgress',payload:{Type:'fileUploadProgress',fileUploadProgress: ProgressBar}});

                            if (ProgressBar == 100) {
                                setTimeout(() => {
                                    dispatch({type:'fileUploadProgress',payload:{Type:'fileUploadProgress',fileUploadProgress: 0}});
                                }, 2000);
                            }
                        }
                    }
                }
            );

            if (response.data.status == 200) {
                let eventFiles = []; 
                eventFiles = response.data.data; 

                dispatch({type:'eventFileIds',payload:{Type:'eventFileIds',eventFileIds: [...state.eventFileIds,...eventFiles] }});
                toastr["success"](response.data.message);
            }
            if (response.data == "failed") {
                toastr["success"](response.data.message);
            }

        } catch (error) {
            console.log(error)
            return false;
        }
    } 
   function onFilePriceChange(value, file) {
        console.log(this)
        let files = state.eventFileIds;
        let index = files.findIndex((i) => i.id == file.id);
        if (index >= 0) {
            files[index]['eventFileCost'] = value
        }
        
        dispatch({type:'eventFileIds',payload:{Type:'eventFileIds', eventFileIds: files }});
    }
   function onFileDescChange(value, file) {
        let files = state.eventFileIds;
        let index = files.findIndex((i) => i.id == file.id);
        if (index >= 0) {
            files[index]['eventFileDescription'] = value
        }
        dispatch({type:'eventFileIds',payload:{Type:'eventFileIds', eventFileIds: files }});
    }
    function eventFileCostType(value, file) {
        let files = state.eventFileIds;
        let index = files.findIndex((i) => i.id == file.id);
        if (index >= 0) {
            files[index]['eventFileCostType'] = value
            files[index]['eventFileCost'] = 1;
        }
        dispatch({type:'eventFileIds',payload:{Type:'eventFileIds', eventFileIds: files }});
    }
    
        return (
            <>

                <div className="modal left fade side-popup create-my-event-popup" id="create-my-event-step-5-popup" tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                    <div className="modal-dialog">

                        <div className="modal-content">

                            {false ? <PuffLoader size={150} color={"#123abc"} loading={true} /> :
                                <>
                                    <button type="button" className="close" onClick={() => resetFormState()} data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                                    <div className="modal-header"> <a href="#create-my-event-step-4-popup" className="btn link-btn float-left f-u-back-btn" data-toggle="modal" data-dismiss="modal"><i className="av av-arrow-left-line-icon"></i> Back</a> </div>
                                    <div className="modal-body input-bdr-btm calender-files-upload">

                                        <div className="row">
                                            <div className="col-12">
                                                <strong className="c-f-u-heading">Upload Files</strong>
                                            </div>
                                            <div className="col-12">
                                                <div className="upload-paid-files" onClick={onFileClick} >
                                                    <div className="file-upload" > <img src={`${FileManagerPath}/public/assets/images/upload-files-icon.svg`} alt="" />
                                                        <div className="card-subtitle">Add a File (maximum file size 20mb)</div>
                                                        <input ref={inputFileRef} type="file" onChangeCapture={onFileChangeCapture}  style={{display:"none"}} multiple={true}/>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="u-p-files-list uploading-file-bx">

                                                    {
                                                        (state.fileUploadProgress > 0) &&
                                                        <>
                                                            <div className="action-editable" data-title="Action">
                                                                <div className="progress"> <span className="file-type-name">pdf</span>
                                                                    <div className="progress-bar" style={{ width: `${state.fileUploadProgress}%` }}></div>
                                                                </div>
                                                                <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="message-list review-events-list">
                                                    <div className="u-p-files-list up-files-dis-cost">
                                                        <div className="custom-table">
                                                            {
                                                                state.eventFileIds?.map((res, index) => {
                                                                    return (
                                                                        <div key={index} className="c-table-row cmn-new-toggle">
                                                                            <div className="cell fm-file-name-editable" data-title="Event Details">
                                                                                <div className="file-type-title-icon"><span className="file-type-name">{res.type}</span> <strong>{res.name}</strong></div>
                                                                            </div>
                                                                            <div className="cell fm-size-editable" data-title="Amount">
                                                                                <div className="c-table-text">{res.size}</div>
                                                                            </div>
                                                                            <div className="cell fm-source-editable text-right" data-title="Write Review">
                                                                                <div className="c-table-text text-right">
                                                                                    <ul className="cmn-ul-list">
                                                                                        <li>
                                                                                            <button type="button" className={`btn link-btn ${res?.eventFileCost&&res?.eventFileDescription?'':'pulse-effect-btn'}`} onClick={() => showHideDiv(`files-cost-form-${res.id}`)}><img src={`${FileManagerPath}/public/assets/images/dis-n-cost-icon.svg`} title="Edit Cost" alt="Edit Cost" /></button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button type="button" className="btn link-btn" onClick={() => removeSetFiles(res.id)}><i className="av av-delete-icon"></i></button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div id={`files-cost-form-${res.id}`} className="write-review-content-bx new-toggle-dropdown" style={{ display: 'none' }}>
                                                                                <div className="cost-editable" data-title="Cost">
                                                                                    <div className="flex-container">
                                                                                        <select className="form-control custom-select-bx" name="eventFileCostType" onChange={(e)=>eventFileCostType(e.target.value, res)} style={{ width: "75px" }}  value={res?.eventFileCostType}>
                                                                                                                <option value="free"> Free</option>
                                                                                                                <option value="paid"> Paid</option>
                                                                                        </select>
                                                                                        <div className="input-u-f-bx input-u-f-price-bx w-100" style={res?.eventFileCostType=='free'?{display:'none'}:{display:'block'}}>
                                                                                         {/* <i className="av av-dollar-icon"></i> */}
                                                                                            <input type="number" style={{padding: '9px 30px 9px 10px'}} min="0" max="1000" className="form-control" placeholder="$ Enter Price..." onChange={(e) => onFilePriceChange(e.target.value, res)} value={res.eventFileCost} />
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <div className="tcs-col tcs-cost">
                                                                                        <div className="b-f-in">           
                                                                                            <span className="label-small-h">Cost</span>
                                                                                                <div className="free-paid-bx">
                                                                                                    <div className="flex-container">
                                                                                                        <div className="flex-select-bx">
                                                                                                            <select className="form-control custom-select-bx" name="eventFileCostType" onChange={(e)=>eventFileCostType(e.target.value, res)} style={{ width: "75px" }}  value={res?.eventFileCostType}>
                                                                                                                <option value="free"> Free</option>
                                                                                                                <option value="paid"> Paid</option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        <div className="flex-input-bx tcs-cost-input" style={res?.eventFileCostType=='free'?{display:'none'}:{display:'block'}}>
                                                                                                        <input type="number" className="form-control" name="eventFileCost" onChange={(e) => onFilePriceChange(e.target.value, res)}  value={res?.eventFileCost}/>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div> */}
                                                                                </div>
                                                                                <div className="description-editable" data-title="Description">
                                                                                    <div className="input-u-f-bx input-u-f-dis-bx">
                                                                                        <input type="textarea" className="form-control" placeholder="Enter File description..." onChange={(e) => onFileDescChange(e.target.value, res)} value={res.eventFileDescription} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cost-dic-btns">
                                                                                    <ul>
                                                                                        <li>
                                                                                            <button className="btn link-btn" onClick={() => showHideDiv(`files-cost-form-${res.id}`)}>Cancel</button>
                                                                                        </li>
                                                                                        <li>
                                                                                            <button className="btn default-btn" onClick={() => showHideDiv(`files-cost-form-${res.id}`)}>Save</button>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="step-line-bdr">
                                            <ul className="cmn-ul-list">
                                                <li className="complited"><span>&nbsp;</span></li>
                                                <li className="complited"><span>&nbsp;</span></li>
                                                <li className="active"><span>&nbsp;</span></li>
                                            </ul>
                                        </div>
                                        <div className="side-next-back-btn">
                                            <a href="#create-my-event-step-4-popup" className="btn default-btn float-left" data-toggle="modal" data-dismiss="modal">Back</a>
                                            <button type="submit" onClick={(e) => handleFormSubmit(e)} disabled={state?.formSubmit||state.eventFileIds?.length>0 && state.eventFileIds.filter((resF)=>resF?.eventFileDescription=='').length>0?true:false} className="btn default-btn float-right" >{state?.buttonPreloader?<span className='button-pre-loading'>wait...</span>:"Finish"}</button>
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
                <EventFilesUploadPoup />
            </>
       );
    
}

export default React.memo(StepFour);


