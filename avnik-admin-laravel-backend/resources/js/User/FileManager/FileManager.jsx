import React, { Component, useContext ,useEffect, useReducer, useState } from 'react';
import FileManagerService from '../../ApiServer/FileManager/FileManagerService';
import Auth from '../../Routes/Auth';
import ActionButtons from './Components/ActionButtons';
import FileList from './Components/FileList';
import FileManagerUpload from './Components/FileManagerUpload';
import SearchFilter from './Components/SearchFilter';
import moment from 'moment';
import Modals, { CreateFolderModal } from '../../components/Modals/Modals';
import fileDownload from 'js-file-download';
import UrlService from '../../ApiServer/UrlService';
import axios from 'axios';
import { ApiService } from '../../ApiServer/ApiService';
import Reducer from '../../utility/Reducer';
import Context from '../../store/Context';
import Skeleton from 'react-loading-skeleton';
import { UserEventsListSkeleton } from '../../components/SkeletonLoading/SkeletonLoading';
import { authHeader } from '../../ApiServer/Config';
import GlobalContext from '../../Global/Context/GlobalContext';
import useDebounce from '../../components/Hooks/UseDebounce/UseDebounce';
const initialState = {
    Files: [],
    SelectFiles: [],
    searchQuery:'',
    filterBy:'All',
    RenameFile: 0,
    Preloader: false,
    RenameFileName: '',
    isChecked: false,
    UploadSelectFile: [],
    NewUploadFileIds: [],
    FileUploadProgress: 0,
    FileUploaded: false,
    UploadFormFiles: [],
    currentPage: 0,
    createFolder:'',
    nextPage: 0,
    previewPage: 0,

}
const FileManager = (props)=> {
    
const  [state, dispatch] = useReducer(Reducer, initialState)
const [globalState,globalDispatch]=useContext(GlobalContext)
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        getFileManagerAllFile(state?.filterBy);
        return () => {
            dispatch({type:"RESET_FILE",payload:{Type:"RESET_FILE", Files: [],
            SelectFiles: [],
            searchQuery:'',
            filterBy:'All',
            RenameFile: 0,
            Preloader: false,
            RenameFileName: '',
            isChecked: false,
            UploadSelectFile: [],
            NewUploadFileIds: [],
            FileUploadProgress: 0,
            FileUploaded: false,
            UploadFormFiles: [],
            currentPage: 0,
            createFolder:'',
            nextPage: 0,
            previewPage: 0, }});
            
        };
    }, [])

    // Debounced search effect - triggers API call after debounce delay
    useEffect(() => {
        getFileManagerAllFile(state?.filterBy);
    }, [state?.filterBy, debouncedSearchTerm]);
    const onChangeFilterType=(type)=>{
        dispatch({type:"SEARCH_QUERY_NEW",payload:{Type:"SEARCH_QUERY_NEW",filterBy:type}});  
    }

    // Immediate UI update + delayed API trigger
    const onHandleSubmitSearch=(e)=>{
        e.preventDefault();
    }

    const handleSearchChange=(searchValue)=>{
        setSearchTerm(searchValue); // Local state for immediate UI update
        dispatch({type:"SEARCH_QUERY_NEW",payload:{Type:"SEARCH_QUERY_NEW",searchQuery:searchValue}}); // Update Redux/Reducer state for UI
    }
   const getFileManagerAllFile=(filterBy)=>{
        let data={searchQuery:debouncedSearchTerm,filterBy:filterBy}
        axios.post('/api/fileManager/list',data, authHeader()).then((response) => {
            if (response.data.status === 200) {
                dispatch({type:"getFileManagerAllFile",payload:{Type:"getFileManagerAllFile",
                        Files: response.data.data.data,
                        Preloader:true,
                        SelectFiles: [],
                        currentPage: response.data.data.current_page,
                        nextPage: response.data.data.next_page_url ? response.data.data.current_page + 1 : response.data.data.current_page,
                    }
                });
            }
        }
        ).catch((error) => {
            console.log(error);
        })
    }

   const selectFiles=(event, index)=> {

        const target = event.target;
        var value = target.value;

        if (target.checked) {
            state.SelectFiles.push(parseInt(value));
            // dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: state.SelectFiles }});
        } else if (target.checked == false) {
            const value = state.SelectFiles.indexOf(parseInt(index))
            if (value !== -1) {
                state.SelectFiles.splice(value, 1);
            }
            // dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: state.SelectFiles }});
        } else {
            dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: [] }});

        }
        dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: state.SelectFiles }});

    }


   const  DeleteFile = async(fileId)=> {

        if (fileId) {
            const data = {
                fileId: fileId
            }
             await ApiService._deleteMultipleFile(data).then((res)=>{
                if (res.data.status == 200) {
                    toastr['success'](res.data.message);
            dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: [] }});
            getFileManagerAllFile(state?.filterBy);

                    
                }
                if (res.data.status == "failed") {
    
                    toastr['error'](res.data.message);
                }
            }).catch((error)=>{

            });
            


        }


    }
    const DuplicateFile=async()=> {

        const data = {

            eventId: state.SelectFiles

        }

        const res = await FileManagerService.DuplicateFileService(data);

        if (res.data.status == 200) {
            const authUserFiles = {
                url: 'api/fileManager/'
            }

            let response = await FileManagerService.authUserFileService(authUserFiles);

            if (response.data.status === 200) {
                dispatch({type:"Files",payload:{Type:"Files", Files: response.data.data.data, }});
            }
            toastr['success'](res.data.message);
        }

        if (res.data.status == "failed") {

            toastr['error'](res.data.message);
        }

        console.log(res, "ResponseFile");

    }

   const RenameFile=(fileId,name) =>{
        if (state?.RenameFile>0&&state?.RenameFileName) {
            // Remove extension from RenameFileName if it exists
            const lastDotIndex = state?.RenameFileName?.lastIndexOf('.');
            const fileNameWithoutExtension = lastDotIndex > 0 ? state?.RenameFileName?.substring(0, lastDotIndex) : state?.RenameFileName;
            // Get the file extension from state
            // const fileExtension = state?.FileExtension || '';
            // Combine: filename without extension + extension
            const newFileName = fileNameWithoutExtension;
            
            const data = {
                fileId: state?.RenameFile,
                name: newFileName,
            }
             ApiService._FileRename(data).then((res)=>{
                if (res.data.status == 200) {
                    toastr['success'](res.data.message);
                    getFileManagerAllFile(state?.filterBy);
                    dispatch({type:"SelectFiles",payload:{Type:"SelectFiles", SelectFiles: [],RenameFile:0,RenameFileName:'' }});

                    
                }
                if (res.data.status == "failed") {
                    toastr['error'](res.data.message);
                }
            }).catch((error)=>{

            });
            


        }else{
            toastr['error']('!error');
        }


    }
    const createFolderHandleSubmit=(e)=>{
        e.preventDefault();
        $('#create-folder-popup').modal('hide');
        if(state.createFolder){
            ApiService._createFolder({folderName:state.createFolder}).then((res)=>{
                console.log(res,'createFolder');
                if(res.data.status==200){
                    getFileManagerAllFile(state?.filterBy);
                    toastr['success'](res.data.message);
                }else{
                    if (res.data.status == "failed") {

                        toastr['error'](res.data?.validation_error?.folderName[0]);
            
                    }else{
                        toastr['error'](res.data.message);
                    }
                }
            }).catch((error)=>{
                console.log(error);
            })
        }else{
            toastr['error']('Folder name is required!');
        }
console.log(state);

    }

   const MoveFile=(res)=> {

        alert(`MoveFile ${res}`);

    }
   const CopyFile=(res) =>{

        alert(`CopyFile ${res}`);

    }
    const Download=(FileName, FilePath)=> {
        setTimeout(() => {

            fileDownload(FilePath, FileName);

        }, 100);
    }
   const FileOpen=(FilePath)=> {
        setTimeout(() => {
            const response = {
                file: FilePath,
            };
            window.open(response.file);
        }, 100);
    }

    const DownloadFile=async(id)=> {


        const data = {

            fileId: id

        }

        const res = await FileManagerService.DownloadFileService(data);


        if (res.data.status == 200) {
            Download(res.data.data.FileName, res.data.data.FilePath);
            toastr['success'](res.data.message);
        }

        if (res.data.status == "failed") {

            toastr['error'](res.data.message);

        }

        console.log(res, "Response Download");

    }

   const ShareFile =async(res)=> {

        alert(`ShareFile ${res}`);

    }


    const FilUploaded= async(form_data)=>{
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

                        
    dispatch({type:"FileUploadProgress",payload:{Type:"FileUploadProgress", FileUploadProgress: ProgressBar}});


                            if (ProgressBar == 100) {
                                setTimeout(() => {

                                    dispatch({type:"FileUploadProgress",payload:{Type:"FileUploadProgress", FileUploadProgress: 0}});

                                }, 2000);
                            }

                            console.log(state.FileUploadProgress, "propgress");

                        }
                    }
                }
            );

            if (response.data.status == 200) {
                getFileManagerAllFile(state?.filterBy);
                toastr["success"](response.data.message);
                let FileIds=[];
                if(response.data?.data?.length>0){
                    response.data?.data.map((res)=>{
                        FileIds.push(res?.id);
                    })
                }

    dispatch({type:"FileUploadProgressDone",payload:{Type:"FileUploadProgressDone",NewUploadFileIds:FileIds, UploadFormFiles: [],FileUploaded: true}});
setTimeout(() => {
    dispatch({type:"FileUploadProgressDone",payload:{Type:"FileUploadProgressDone",NewUploadFileIds:[], UploadFormFiles: [],FileUploaded: true}});
    
}, 5000);

            }

            if (response.data == "failed") {

                toastr["error"](response.data.message);

    
    dispatch({type:"FileUploadProgressDone",payload:{Type:"FileUploadProgressDone", FileUploaded: false}});

            }

        } catch (error) {
            return false;
        }
    }
    const FileUploadHandling=(event)=> {
        // FilUploaded();
        // dispatch({type:"UploadSelectFile",payload:{Type:"UploadSelectFile", UploadSelectFile: event.target.files }});

        // setTimeout(async () => {
            if (event.target.files.length === 0) {
                return toastr["error"]("No any file selected");
            }
            const form_data = new FormData();
            // let FileData = [];
            for (const file of event.target.files) {
                form_data.append('files[]', file, file.name);
                // FileData.push({ fileName: file.name, fileType: file.type, fileSize: file.size })
            }
            FilUploaded(form_data);


            
        // dispatch({type:"UploadFormFiles",payload:{Type:"UploadFormFiles", UploadFormFiles: FileData}});



            
        // }, 2000);

    }
   const onScrollHandle=(e)=> {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            axios.get(`/api/fileManager?page=${state.nextPage}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    authorization: `Bearer ${Auth.getAccessToken()}`,
                },
            }).then((response) => {
                console.log([...state.Files, response.data.data.data], "onScroll")
                if (response.data.status === 200) {
                    if (response.data.data.next_page_url) {
                        
        dispatch({type:"onScrollHandle",payload:{Type:"onScrollHandle",
        Files: state.Files.concat(response.data.data.data),
        currentPage: response.data.data.current_page,
        nextPage: response.data.data.next_page_url ? response.data.data.current_page + 1 : response.data.data.current_page
    }});

                        toastr["success"]("Load More..");
                    } else {
                        toastr["error"]("No More Data !Found");
                    }

                }
            }
            ).catch((error) => {
                // toastr["error"](error.message);

            })

        }
    }

        const { Files, UploadFormFiles, SelectFiles, isChecked } = state;
        const Value = { Files, SelectFiles, isChecked, UploadFormFiles };
        console.log(state,'fileMnagerstate');

        return (
            <>
            <Context.Provider value={[state,dispatch,onChangeFilterType,handleSearchChange]}>
                <div className="ah-tab-content" data-ah-tab-active={props.Active}>
                    <div className="file-manager-content-sec">
                        <div className="cmn-rit-top-heading-sec message-top-bx">

                            <div className="selected-events-ck">
                                {SelectFiles.length >= 1 ?

                                    <ActionButtons SelectFiles={SelectFiles} Delete={DeleteFile} Download={DownloadFile} Share={ShareFile} Move={MoveFile} Rename={RenameFile} Duplicate={DuplicateFile} />
                                    : ''}
                            </div>
                            <div className="selected-ck-status">{SelectFiles.length > 1 ? `${SelectFiles.length} Files` : ''}</div>
                            {/* <div className="inbox-message-number">Select Folder & File To See Options</div> */}


                            <SearchFilter FileUploadHandling={FileUploadHandling}/>
                        </div>
                        <div className="message-list" onScroll={onScrollHandle}>
                            <div className="u-p-files-list">
                                <div className="custom-table">
                                   {state.Files?.length>0? <div className="c-table-row table-header">
                                        <div className="cell fm-ck-editable">Select</div>
                                        <div className="cell fm-file-name-editable">File Name</div>
                                        <div className="cell fm-date-time-editable">Date & Time</div>
                                        <div className="cell fm-size-editable">Size</div>
                                        <div className="cell fm-type-editable">Type</div>
                                        <div className="cell fm-source-editable">Source</div>
                                    </div>:''}

                                    {state?.Preloader?state.Files.map((res, i) => {
                                        return <FileList 
                                        SelectFilesValue={SelectFiles}
                                        value={Value} 
                                        CopyFile={CopyFile} 
                                        SelectFiles={selectFiles} 
                                        Delete={DeleteFile} 
                                        Download={DownloadFile}
                                        Share={ShareFile}
                                        Move={MoveFile}
                                        Rename={RenameFile}
                                        Duplicate={DuplicateFile}
                                        key={i}
                                        id={res.id}
                                        type={res.type}
                                        dateTime={moment.utc(res.date_time).tz(globalState?.timeZone).format("D MMM, YYYY hh:mm A")}
                                        size={res.size}
                                        name={res.name}
                                        showHideDiv={props.showHideDiv}
                                        fileUrl={res.file_url}
                                        isDirectory={res.isDirectory}
                                        from={res?.from==""|| res?.from==null?"Me":"Purchased"}
                                        />
                                    }):<UserEventsListSkeleton count={10}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <FileManagerUpload FileUploaded={state.FileUploaded} UploadFormFiles={UploadFormFiles} Progress={state.FileUploadProgress} onChange={()=>{}} FileUploadHandling={FileUploadHandling} />
                <CreateFolderModal handleSubmit={createFolderHandleSubmit} value={state.createFolder} onChange={(e)=>dispatch({type:"createFolder",payload:{Type:"createFolder",createFolder:e.target.value}})}/>
                <Modals />
                </Context.Provider>
            </>
        );
    }



export default FileManager;
