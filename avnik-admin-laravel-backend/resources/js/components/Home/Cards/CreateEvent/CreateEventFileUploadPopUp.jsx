import React, { Component, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import CreateEventService from '../../../../ApiServer/CreateEvent/CreateEventService';
import FileManagerService from '../../../../ApiServer/FileManager/FileManagerService';
import GlobalLink from '../../../../ApiServer/GlobalLink';
import UrlService, { FileManagerPath } from '../../../../ApiServer/UrlService';
import Pagination from '../../../Pagination/Pagination';
import CreateEventContext from '../../../screens/CreateEvent/Pages/CreateEventContext/CreateEventContext';
import CustomeCroppie from '../../../screens/CreateEvent/Cards/ImageCropper/CustomeCroppie';
import CropperModal from '../../../screens/CreateEvent/Cards/ImageCropper/CustomeCroppie';
 
const CreateEventFileUploadPopUp=(props)=>{

  const [state,dispatch] = useContext(CreateEventContext)
  const [buttonPreloader,setButtonPreloader]=useState(false);
    const handleDispatchState=(name,value)=>{
        dispatch({type:name,payload:{Type:name,name:value}});
        if(name=='isModalClose'){
            $('#presenter-btn').modal('hide');
        }
    }
    // handle Multiple File Select From Input
//    const handleFileUpload=(e)=>{
       
//         dispatch({type:'eventSelectedFiles',payload:{Type:'eventSelectedFiles',eventSelectedFiles:e.target.files,isModalClose: false}});
//     }



    // Uploading Multiple Files
    const  uploadFormHandel= async(event)=>{
        event.preventDefault();
        
    }
    const { noMore, loadMore, isModalClose,eventFiles, isLoading, isChecked } = state;

        // const File = (props) => {
        //     return (
        //     <li>
        //         <div className="selected-img-video-ck active">
        //             <input type="checkbox" name="file_url" id={`event-files${props.id+1}`} defaultChecked={isChecked} value={props.id}  onChange={(e)=>fileManagerFileHandel(e,props)} />
        //             <label htmlFor={`myCheckbox${props.id+1}`} >
        //                 {props.type!='mp4'?<img src={props.src} alt={props.alt}/>:
        //                     <p title={props.name}>                        
        //                         <img src={`${FileManagerPath}/public/assets/images/video-camera.png`} style={{padding:'25px'}} alt={props.name} />
        //                     </p>
        //                 }
        //             </label>
        //         </div>
        //     </li>
        //     )
        // }

        const onCropImage=async(obj)=>{
            setButtonPreloader(true);
            dispatch({type:'eventCropedImage',
            payload:{Type:'eventCropedImage',
            eventCropedImage:obj
          }});
          handleDispatchState(isLoading,true);
        if (obj==null) {
            handleDispatchState("isLoading",false);
            return toastr["error"]("No any file selected");
        }
        const form_data = new FormData();
        // for (const file of state.eventSelectedFiles) {

            form_data.append('files[]', obj);

        // }

        const response = await FileManagerService.multipleFileUploadService(form_data);

        if ( response && response.data && response.data.status == 200) {
            setButtonPreloader(false);

            let eventFiles = []; 
            if ( state.eventFiles && state.eventFiles.length > 0 ) {
                eventFiles = state.eventFiles;
                if ( response && response.data && response.data.data.length > 0 ) {
                    let files = response.data.data;
                    for ( let i = 0; i < files.length; i++ ) {
                        eventFiles.push(files[i]);
                    }
                }
            } else {
                eventFiles = response.data.data; 
            }
                      
        dispatch({
            type:'afterResponse',
            payload:{
                Type:'afterResponse',
                isLoading: false,
                eventFiles: eventFiles,
                eventImages: eventFiles,
                isModalClose: true,
                eventCropedUrl:'',
                eventCropedImage:'',
                eventSelectedFiles: []
            }});

            toastr["success"](response.data.message);
            
         $('#presenter-btn').modal('hide');
        }
        if (response.data == "failed") {
            setButtonPreloader(false);
            toastr["error"](response.data.message);
        }
        }
console.log(state,'upload popup create event UPPOP');
        return (
            <>
                <div className="modal fade cmn-modal file-manager-popup ce-iv-upload-popup" id="presenter-btn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-close-btn">                                
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={uploadFormHandel}>                                          
                                                <div className="insert-files-bx pt-0 pb-0">
                                                    <div className="choose-images-video-icons">
                                                    {state.isLoading ? <figure>
                                                             <img src={`${FileManagerPath}/public/assets/images/loader.gif`} alt="loader" width="100" /> 
                                                            {/* // <img src={`${FileManagerPath}/public/assets/images/choose-images-video-icons.svg`} alt="" /> */}
                                                            
                                                        </figure>:''}

                                                    </div>
                                                    <CropperModal
                                                    options={{
                                                        showZoomer:true,
                                                        enableOrientation: true,
                                                        // mouseWheelZoom: "ctrl",
                                                        circle:false,
                                                        enableResize:false,
                                                        viewport:{
                                                            width:400,
                                                            height:225,
                                                            type:"square",
                                                        },
                                                        boundary:{
                                                            width:415,
                                                            height:415,
                                                        }
                                                    }}
                                                    size={{
                                                        width: 1280,
                                                        height: 720,
                                                    }}
                                                    buttonClass="btn default-btn"
                                                    onCrop={onCropImage}
                                                    value={state.eventCropedUrl}
                                                    buttonPreloader={buttonPreloader}
                                                    
                                                    />
                                                </div>

                                                {/* <div className="insert-btn"> */}
                                                    {/* {state.isModalClose ? */}
                                                        {/* <button type="button" onClick={()=>handleDispatchState("isModalClose",false)} className="btn default-btn">Close</button> : */}
                                                        {/* <button type="submit" className="btn default-btn" disabled={state.eventCropedImage?false:true} >Upload</button> */}
                                                    {/* } */}
                                                {/* </div> */}
                                          
                                            {/* <div className="ah-tab-content" data-ah-tab-active={state.choose}>
                                                <div className="tab-content-heading">
                                                    <h2>Choose Videos and Images</h2>
                                                </div>
                                                <div className="image-video-list">
                                                    {AuthUserFiles.length > 0 ? <ul className="cmn-ul-list" style={{ maxHeight: '371px', overflow: 'overlay' }}>
                                                        {AuthUserFiles.map((res, index) => {
                                                            return (
                                                                <File key={res.id} type={res.type} id={res.id} file_path={res.file_path} file_url={res.file_url} src={GlobalLink.FileManagerPathURL(res.file_url)} name={res.name} date_time={res.date_time} size={res.size} alt={res.name}></File>
                                                            )
                                                        })}
                                                    </ul> :
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-center">
                                                                <p> <i className="fa fa-folder-o"></i> Empty</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="insert-btn">
                                                    <button type="button" disabled={loadMore} onClick={loadMore ? () => { return toastr["error"]("No more Files") } : PaginationFile} className="btn default-btn"> <i className="fa fa-refresh"></i>{noMore ? "No More Files" : "Load More"} </button>
                                                    {
                                                        isModalClose ?
                                                        <button type="button" className="btn default-btn" data-dismiss="modal">Close</button> :
                                                        <button type="button" className="btn default-btn" onClick={fileManagerFile} >Insert</button>
                                                    }
                                                </div>
                                            </div> */}
                                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default React.memo(CreateEventFileUploadPopUp);