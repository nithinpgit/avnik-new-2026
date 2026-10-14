import React, { useContext, useRef } from 'react';
import Context from '../../../store/Context';

const SearchFilter=(props)=> {
    const [state,dispatch,onChangeFilterType,handleSearchChange] = useContext(Context);
     const fileUpload = useRef(null)
     const eventImageRefClick = () => {
        fileUpload.current.click();
    };
        return (
            <>
                <div className="inbox-rit-search">
                    <div className="flex-container">
                    {/* <div className="create-folder-popup">
                        <button type="button" className="btn link-btn" data-toggle="modal" data-target="#create-folder-popup"> <i className="av av-create-folder-icon"></i></button>
                    </div> */}
                    {state?.FileUploadProgress>0?<div className="action-editable" style={{minWidth:"150px"}} data-title="Action">
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${state?.FileUploadProgress}%` }}></div>
                        </div>
                    </div>:
                    <div className="upload-files-popup">
                        <button type="button" className="btn link-btn" onClick={eventImageRefClick}> <i className="av av-upload-file-icon">
                        <input name="file" ref={fileUpload} onChange={(e) => props.FileUploadHandling(e)} className="file-input" type="file" hidden multiple />

                        </i></button>
                    </div>}
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="inbox-rit-search">
                                    <div className="flex-container">
                    <div style={{ flexGrow: '5' }} className="flex-select-bx">
                            <select className="form-control custom-select-bx" onChange={(e)=>onChangeFilterType(e.target.value)}>
                                <option value="All">All File</option>
                                {/* <option>Shared</option> */}
                                <option value="Purchased">Purchased</option>
                                {/* <option>Downloaded</option> */}
                            </select>
                        </div>
                        <div style={{ flexGrow: '5' }} className="flex-input-bx">
                            <div className="cmn-search-bx">
                                <input className="form-control" type="search" onChange={(e)=>handleSearchChange(e.target.value)} value={state?.searchQuery} placeholder="Search" aria-label="Search" />
                                <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
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

export default SearchFilter;
