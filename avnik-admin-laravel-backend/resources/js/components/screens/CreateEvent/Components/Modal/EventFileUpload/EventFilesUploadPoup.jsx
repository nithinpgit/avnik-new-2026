import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import FileManagerService from '../../../../../../ApiServer/FileManager/FileManagerService';
import GlobalLink from '../../../../../../ApiServer/GlobalLink';
import UrlService, { FileManagerPath } from '../../../../../../ApiServer/UrlService';
import Auth from '../../../../../../Routes/Auth';
import Pagination from '../../../../../Pagination/Pagination';
import CreateEventContext from '../../../Pages/CreateEventContext/CreateEventContext';



 const EventFilesUploadPoup =()=>{

const [state,dispatch] = useContext(CreateEventContext);
const [AuthUserFiles,setAuthUserFiles]=useState([]);
const [eventSelectedFiles,setEventSelectedFiles]=useState([]);
const [eventCheckBoxSelectedFiles,setEventCheckBoxSelectedFiles]=useState([]);
const [eventFiles,setEventFiles]=useState([]);
const [eventFileMangerURL,setEventFileMangerURL]=useState([]);
const [FileUploadError,setFileUploadError]=useState(false);
const [isLoading,setIsLoading]=useState(false);
const [isModalClose,setIsModalClose]=useState(false);
const [isChecked,setIsChecked]=useState(false);
const [nextPage,setNextPage]=useState('');
const [loadMore,setLoadMore]=useState(false);
const [noMore,setNoMore]=useState(false);
const [upload,setUpload]=useState(true);
const [choose,setChoose]=useState(false);

useEffect(() => {
    // getAuthUserFilesMangerData();
}, [])

    // get all file of Current user 
  const getAuthUserFilesMangerData = async ()=>{
    let data = {
        url: 'api/fileManager/'
    }
    let response = await FileManagerService.authUserFileService(data);
    if (response.data.status === 200) {
        dispatch({type:'AuthUserFiles',payload:{Type:'AuthUserFiles',AuthUserFiles: response.data.data }});
    }
  }

    // handle Multiple File Select From Input
  function  handleFileUpload(e) {
        setEventSelectedFiles(e.target.files);
        setIsModalClose(false);
    }

    // Load More Files  
   const PaginationFile= async(e)=> {
    setLoadMore(true);


        if (nextPage != null) {

            const authPaginateUserFiles = {
                token: localStorage.getItem('accessToken'),
                url: `api/fileManager/${nextPage}`,
            }

            let response = await FileManagerService.authUserFileService(authPaginateUserFiles);
            if (response.data.status == 200) {

                if (response.data.data.data.length>0) {
                    console.log([...AuthUserFiles,response.data.data.data], "response");
                    dispatch({type:'AuthUserFiles',payload:{Type:'AuthUserFiles',AuthUserFiles: [...state.AuthUserFiles,response.data.data.data] }});
                }

                if (response.data.data.next_page_url) {
                    setNextPage(Pagination.NextPageURl(response.data.data.next_page_url));
                    setLoadMore(false);
                } else {
                    setNoMore(true);
                    return toastr["error"]("No more Files");
                }

            }

            if (response.data.status == "failed") {
                setLoadMore(false);
            }
        } else {
            setIsLoading(false);

            return toastr["error"]("No more Files");

        }
    }

    // Uploading Multiple Files
    const uploadFormHandel = async(event)=> {
        event.preventDefault();
        setIsLoading(true);

        if (eventSelectedFiles.length === 0) {
            setIsLoading(false);
            return toastr["error"]("No any file selected");

        }
        const form_data = new FormData();

        for (const file of eventSelectedFiles) {

            form_data.append('files[]', file, file.name);

        }
        try {
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

            if (response&&response.data&&response.data.status == 200) {

                let eventFiles = []; 
                if ( eventFiles && eventFiles.length > 0 ) {
                    eventFiles = eventFiles;
                    
                    if ( response && response.data && response.data.data.length > 0 ) {
                        let files = response.data.data;
                        for ( let i = 0; i < files.length; i++ ) {
                            eventFiles.push(files[i]);
                        }
                    }
                } else {
                    eventFiles = response.data.data; 
                }
                // eventFiles = [...eventFiles,...{eventFileCostType:'free',eventFileCost:0}];
                setEventFiles(eventFiles);
                setIsLoading(false);
                setIsModalClose(true);
                setEventSelectedFiles([]);
                dispatch({type:'eventFileIds',payload:{Type:'eventFileIds',eventFileIds: [...state.eventFileIds,...eventFiles] }});
                toastr["success"](response.data.message);
                console.log(response.data, eventFiles);
            }
            if (response.data == "failed") {
                toastr["success"](response.data.message);
            }

        } catch (error) {
            return false;
        }

    }

    // File manager File Selected 
   function fileManagerFileHandel(e, event) {

        setIsModalClose(false);
        if(eventCheckBoxSelectedFiles.find((find)=>parseInt(find.id)==parseInt(event.id))){
            setEventCheckBoxSelectedFiles(eventCheckBoxSelectedFiles.filter((find)=>find.id!=event.id))
            console.log("yes alerdy exist");
        }else{
            console.log("yes new ");
            setEventCheckBoxSelectedFiles(eventCheckBoxSelectedFiles.push(event));
        }
        console.log(e , event,'eventsClick',eventCheckBoxSelectedFiles);
        // setEventCheckBoxSelectedFiles([...eventCheckBoxSelectedFiles, event]);
        // dispatch({type:'eventFileIds',payload:{Type:'eventFileIds',eventFileIds: eventCheckBoxSelectedFiles }});
    }

    // Click to send parent 
   function fileManagerFile() {
    setIsModalClose(true);
    setEventCheckBoxSelectedFiles([]);
    dispatch({type:'eventFileIds',payload:{Type:'eventFileIds',eventFileIds: [...state.eventFileIds,...eventCheckBoxSelectedFiles] }});
    }
    function fileChooseUploadFun(up,ch){
        setUpload(up);
        setChoose(ch);
    }
        const File = (props) => {
            // onChange={(e)=>fileManagerFileHandel(props.id,props)}
            return (
                <li>
                <div   className="selected-img-video-ck active">
                <input type="checkbox" name="file_url" id={`event-file${props.id+1}`} defaultChecked={isChecked} value={props.id}  onChange={(e)=>fileManagerFileHandel(e.target.value,props)}/>
                <label htmlFor={`myCheckbox${props.id+1}`} >
                   {props.type!='mp4'?<img src={props.src} loading="lazy" alt={props.alt}/>:
                    <p title={props.name}>                        
                       <img src={`${FileManagerPath}/public/assets/images/video-camera.png`} loading="lazy" style={{padding:'25px'}} alt={props.name} />
                    </p>
                    }
                </label>
                </div>
            </li>
            )
        }
        return (
            <>
                <div className="modal fade cmn-modal file-manager-popup" id="event-file-sys" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document" style={{ left: "170px" }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">File Manager</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="av-default-tabs">
                                    <div className="ah-tab-wrapper">
                                        <div className="ah-tab">
                                            <a className="ah-tab-item" data-ah-tab-active={upload} onClick={(e) => fileChooseUploadFun(true,false)} href="#">Upload</a>
                                            {/* <a className="ah-tab-item" data-ah-tab-active={choose} onClick={(e) =>fileChooseUploadFun(false,true)} href="#">Choose</a> */}
                                        </div>
                                    </div>
                                    <div className="ah-tab-content-wrapper">
                                        <form onSubmit={uploadFormHandel}>
                                            <div className="ah-tab-content" data-ah-tab-active={upload} >
                                                <div className="insert-files-bx">
                                                    <div className="choose-images-video-icons">
                                                        <figure>
                                                            {isLoading ? <img src={`${FileManagerPath}/public/assets/images/loader.gif`} loading="lazy" alt="loader" width="100" /> : <img src={`${FileManagerPath}/public/assets/images/choose-images-video-icons.svg`} loading="lazy" alt="video/image" />}
                                                        </figure>
                                                    </div>
                                                    <div className="file-upload" style={{minWidth: '395px'}}>
                                                        <input className="file-input"  type="file" onChange={handleFileUpload} name="files" multiple={true}/>
                                                        <div className="card-subtitle">
                                                            {
                                                                (eventSelectedFiles.length > 0) ?
                                                                ( eventSelectedFiles.length + ' File/s Selected' ) :
                                                                'Please choose images / video file(s) from your system'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="insert-btn">
                                                    {isModalClose ?
                                                        <button type="button" className="btn default-btn" data-dismiss="modal">Close</button> :
                                                        <button type="submit" className="btn default-btn" >Insert</button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="ah-tab-content" data-ah-tab-active={choose}>
                                                
                                                <div className="image-video-list">
                                                    {state.AuthUserFiles?.data?.length > 0 ? <ul className="cmn-ul-list" style={{ maxHeight: '371px', overflow: 'overlay' }}>
                                                        {state.AuthUserFiles?.data.map((res, index) => {
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
                                                    {isModalClose ?
                                                        <button type="button" className="btn default-btn" data-dismiss="modal">Close</button> :
                                                        <button type="button" className="btn default-btn" onClick={fileManagerFile} >Insert</button>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    
}

export default React.memo(EventFilesUploadPoup);