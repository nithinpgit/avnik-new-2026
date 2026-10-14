import React, { Component, useContext } from 'react';
import { useEffect } from 'react';
import { ApiService } from '../../../ApiServer/ApiService';
import Context from '../../../store/Context';

const ActionButtons =({SelectFiles,Rename,Download,Move,Delete})=> {
const [state,dispatch] = useContext(Context)
const renameFile=()=>{
    dispatch({type:"RENAME",payload:{Type:"RENAME",RenameFile:SelectFiles[0],RenameFileName:state?.Files.find((find)=>find?.id==SelectFiles[0])?.name}})
}
        return (
            <>
                <ul className="cmn-ul-list">
                    {SelectFiles?.length <= 1 ? <>
                        <li>
                            <div className="av-tt-bx">
                                <button type="button" className="btn link-btn" onClick={() => renameFile()} >
                                    <i className="av av-edit-icon"></i>
                                </button>
                                <span className="av-tt-text">Rename</span>
                            </div>
                        </li>
                        <li>
                            <div className="av-tt-bx">
                                <button type="button" className="btn link-btn" data-toggle="modal" data-target="#host-info-btn-download" onClick={() =>Download(this.props.SelectFiles[0])}>
                                    <i className="av av-download-icon"></i>
                                </button>
                                <span className="av-tt-text" >Save</span>
                            </div>
                        </li>
                    </> : ''}
                    {/* <li>
                        <div className="av-tt-bx">
                            <button type="button" className="btn link-btn" data-toggle="modal" data-target="#host-info-btn-move" onClick={() =>Move()}>
                                <i className="av av-move-file-icon"></i>
                            </button>
                            <span className="av-tt-text" >Move</span>
                            <div id="move-folder-toggle" className="new-toggle-dropdown" style={{ display: 'block' }}>
                                <div className="move-to-bx">Move to:
								<div className="inbox-rit-search">
                                        <div className="cmn-search-bx">
                                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <ul>
                                    <li><a href="#" className="dropdown-item"><i className="av av-files-icon"></i> Folder Name</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-files-icon"></i> Folder Name</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-files-icon"></i> Folder Name</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-files-icon"></i> Folder Name</a></li>
                                    <li><a href="#" className="dropdown-item"><i className="av av-files-icon"></i> Folder Name</a></li>
                                </ul>
                            </div>
                        </div>

                    </li> */}
                    <li>
                        <div className="av-tt-bx">
                            <button type="button" className="btn link-btn" data-toggle="modal" onClick={() => Delete(SelectFiles)} data-target="#host-info-btn-delete">
                                <i className="av av-delete-icon"></i>
                            </button>
                            <span className="av-tt-text" >Delete</span>
                        </div>
                    </li>
                </ul>

            </>
        );
    
}

export default ActionButtons;
