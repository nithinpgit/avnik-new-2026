import React,{useState} from 'react';
import { useContext } from 'react';
import Context from '../../../store/Context';

const FileList =(props)=>{
    const [state,dispatch] = useContext(Context);
    const rename =(id,name)=>{
        dispatch({type:"RENAME",payload:{Type:"RENAME",RenameFile:id,RenameFileName:name}})
    }
    const saveRename=()=>{
        if(state?.RenameFile>0&&state?.RenameFileName){
            props.Rename();
        }else{

        }
    }
    const cancelRename=()=>{
        dispatch({type:"RENAME",payload:{Type:"RENAME",RenameFile:0,RenameFileName:''}})
    }
        return (
            <>

                <div className="c-table-row" style={{background:state?.NewUploadFileIds?.find((res)=>props?.id==res)?'#dde6dd':''}} >
                    <div className="cell fm-ck-editable" data-title="Select">
                        <div className="message-time">
                            <div className="checkbox custom">
                                <label>
                                    <input type="checkbox" onChange={(e)=>props.SelectFiles(e,props.id)}  value={props.id} checked={props?.SelectFilesValue?.find((find)=>find==props.id)}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="cell fm-file-name-editable f-m-file-name" data-title="File Name">
                        
                   
                    {state?.RenameFile==props?.id&&state?.RenameFile>0&&state?.RenameFileName?<a className="cell fm-file-name-editables ">
                                <div className="file-type-title-icon"><span className="file-type-name">{props.type}</span> <input type="text" onChange={(e)=>dispatch({type:"RENAME",payload:{Type:"RENAME",RenameFileName:e.target.value}})} className="form-control" value={state?.RenameFileName}/><button onClick={cancelRename} className="btn btn-default btn-sm"><i className="fa fa-close"></i></button> <button onClick={saveRename} className="btn btn-success btn-sm"><i className="fa fa-check"></i></button></div>
                            </a>: <div className="r-m-t-bx my-account-menu">
                        <div className="btn-group">
                            <a className="cell fm-file-name-editable dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                                <div  className="file-type-title-icon">{props.isDirectory==1?<span className="file-type-name">{props.type}</span>:<span onDoubleClick={()=>rename(props.id,props?.name)}  className="file-type-name">{props.type}</span>} <strong onDoubleClick={()=>rename(props.id,props?.name)} >{props.name}</strong></div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg-right">
                                <ul>
                                   {props.SelectFilesValue.length<=1?
                                   <>
                                    <li><a  onClick={()=>props.Download(props.id)} className="dropdown-item"><i className="av av-download-icon" > </i> Download</a></li>
                                    <li><a  onClick={()=>rename(props.id,props?.name)} className="dropdown-item"><i className="av av-edit-icon"></i> Rename</a></li>
                                    {/* <li><a  onClick={()=>props.Share(props.id)} className="dropdown-item"><i className="av av-share-icon"></i> Share</a></li> */}
                                   </>
                                   :''}
                                    {/* <li><a  onClick={()=>props.CopyFile(props.id)} className="dropdown-item"><i className="av av-copy-icon"></i> Copy</a></li> */}
                                    {/* <li><a  onClick={()=>props.Move(props.id)} className="dropdown-item"><i className="av av-move-file-icon"></i> Move</a></li> */}
                                    <li><a  onClick={()=>props.Delete([props.id])} className="dropdown-item"><i className="av av-delete-icon"></i> Delete</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>}
                    </div>
                    <div className="cell fm-date-time-editable" data-title="Date & Time">
                        <div className="c-table-text">{props?.dateTime} </div>
                    </div>
                    <div className="cell fm-size-editable" data-title="Size">
                        <div className="c-table-text">{props?.size}</div>
                    </div>
                    <div className="cell fm-type-editable" data-title="Type">
                        <div className="c-table-text">{props?.type}</div>
                    </div>
                    <div className="cell fm-source-editable" data-title="Source">
                        <div className="message-delete-btn">{props?.from}</div>
                    </div>
                    
            
                </div>
            </>
        );
    }


export default FileList;
