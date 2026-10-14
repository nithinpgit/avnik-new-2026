import React, { Component, useContext } from 'react'
import fileDownload from 'js-file-download';
import FileManagerService from '../../../../../../ApiServer/FileManager/FileManagerService';
import { showHideDiv } from '../../../../../../utility/UtilityFunctions';
import Context from '../../../../../../store/Context';
import Auth from '../../../../../../Routes/Auth';
import { useHistory } from 'react-router-dom';
import CurrentUser from '../../../../../UserContext/CurrentUserContext/CurrentUser';
 const Download =(props)=> {
const currentUser=useContext(CurrentUser);
const [state,dispatch] = useContext(Context);
const history=useHistory();
const    Download=(FileName, FilePath) =>{
        setTimeout(() => {
            fileDownload(FilePath, FileName);
        }, 100);
    }
    const  DownloadFile = async (id)=> {
        const data = {
            fileId: id
        }
        const  res  = await  FileManagerService.DownloadFileService(data);
        if (res.data.status == 200) {
            Download(res.data.data.FileName, res.data.data.FilePath);
            toastr['success'](res.data.message);

        }
        if (res.data.status == "failed") {
            toastr['error'](res.data.message);
        }
    }

    const BuyFile=()=>{
        if(Auth?.getAccessToken()){
            $('#stripe_event_file_payment_modal').data('bs.modal',null);
            $('#stripe_event_file_payment_modal').modal('show');
        }else{
            history.push('/login');
        }

    }
        const { eventPreloader, EventByIdDetail ,EventFilesCart} = state;
        return (
            <>
                <div className="ah-tab-content" data-ah-tab-active={props.values.EventNavbarMenu === 4 ? true : false}>
                   {EventByIdDetail?.eventFiles?.length>0? <div className="e-d-download">
                        <div className="t-s-bx download-event-search">
                            <div className="ts-option">
                                Download
                            </div>
                            <div className="ts-time">
                                <form>
                                    <div className="cmn-search-bx">
                                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn link-btn" type="submit"><i className="av av-search-icon"></i></button>
                                    </div>
                                </form>
                            </div>
                            {EventFilesCart?.length>0?<div className="ts-btn">
                                <button type="button" onClick={BuyFile} className="btn default-btn">Buy ({EventFilesCart?.length})</button>
                            </div>:""}
                        </div>
                        <div className="download-files-download">
                            <div className="custom-table">
                                <div className="c-table-row table-header">
                                    <div className="cell download-title-name-editable">
                                        Title Name
                                    </div>
                                    <div className="cell download-cost-editable">
                                        Cost
                                    </div>
                                    <div className="cell download-size-editable">
                                        Size
                                    </div>
                                    <div className="cell download-total-download-editable">
                                        Total Download
                                    </div>
                                    <div className="cell download-action-editable text-right">
                                        Action
                                     </div>
                                </div>

                                {eventPreloader ? '' : EventByIdDetail.eventFiles.map((res, index) => 
                                        <FileList key={res.id} Download={DownloadFile} value={res} />
                                   
                                )
                                }

                            </div>
                        </div>
                    </div>:"No downloads here"}
                </div>
            </>
        )
    }

const FileList = (props) => {
    const [state,dispatch] = useContext(Context);
    const { eventPreloader, EventByIdDetail ,EventFilesCart} = state;
    const { eventFilePayment} = EventByIdDetail;
    const addToCart=(id,cost)=>{
        dispatch({type:"AddToCart",payload:{Type:"AddToCart",EventFilesCartAmount:parseInt(state.EventFilesCartAmount)+parseInt(cost),EventFilesCart:[...EventFilesCart,id]}});
    }
    const removeFromCart=(id,cost)=>{
        dispatch({type:"AddToCart",payload:{Type:"AddToCart",EventFilesCartAmount:parseInt(state.EventFilesCartAmount)-parseInt(cost),EventFilesCart:EventFilesCart.filter((filter)=>filter!=id)}});
    }
    return (
        <div className="c-table-row">
            <div className="cell download-title-name-editable" data-title="Title Name">
                <div className="c-t-in">
                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>{props.value.fileTitle}</strong></div>
                    <div className="f-dis-link-btn">
                        <button type="button" className="btn link-btn file-dis-view-link" value="Show/Hide" onClick={() => showHideDiv(`download-file-dis${props.value?.id}`)}>File Dis...</button>
                    </div>
                </div>
            </div>
            <div className="cell download-cost-editable" data-title="Cost">
                <div className="c-t-in">{parseInt(props.value.fileCost) > 0 ? `$${props.value.fileCost}` : 'Free'}</div>
            </div>
            <div className="cell download-size-editable" data-title="Size">
                <div className="c-t-in">
                    {props.value.size}
                </div>
            </div>
            <div className="cell download-total-download-editable" data-title="Total Download">
                <div className="c-t-in">
                    0 download
                            </div>
            </div>
            <div className="cell download-action-editable text-right" data-title="Action">
                <div className="c-t-in">
                    <div className="download-add-btn">
                        <ul className="cmn-ul-list">
                        <li>
                        {parseInt(props.value.fileCost) <= 0 ? 
                                <div className="av-tt-bx">
                                    <button type="button" className="btn link-btn" onClick={() => props.Download(props.value.fileManagerId)} data-toggle="modal" data-target="#host-info-btn">
                                        <i className="av av-download-icon"></i>
                                    </button>
                                    <span className="av-tt-text">Save</span>
                                </div>
                            :props?.value?.host>0||eventFilePayment?.find((find)=>find?.event_file_fk_id==props?.value?.fileManagerId)?
                                <div className="av-tt-bx">
                                    <button type="button" className="btn link-btn" onClick={() => props.Download(props.value.fileManagerId)} data-toggle="modal" data-target="#host-info-btn">
                                        <i className="av av-download-icon"></i>
                                    </button>
                                    <span className="av-tt-text">Save</span>
                                </div>
                            :parseInt(props.value.fileCost) > 0 ?EventFilesCart?.find((find)=>find==props?.value?.fileManagerId)?
                                <div className="av-tt-bx">
                                    <button type="button" onClick={()=>removeFromCart(props?.value?.fileManagerId,props.value.fileCost)} className="btn link-btn">
                                        <i className="av av-extended-duration-less-icon" aria-hidden="true"></i>
                                    </button>
                                    <span className="av-tt-text">Remove</span>
                                </div>:<div className="av-tt-bx">
                                    <button type="button" onClick={()=>addToCart(props?.value?.fileManagerId,props.value.fileCost)} className="btn link-btn">
                                        <i className="av av-add-plus-icon"></i>
                                    </button>
                                    <span className="av-tt-text">Add</span>
                                </div>
                                :""}
                            </li>
                            {/* <li>
                                <div className="av-tt-bx">
                                    <button type="button" className="btn link-btn" data-toggle="modal" data-target="#host-info-btn">
                                        <i className="av av-delete-icon"></i>
                                    </button>
                                    <span className="av-tt-text">Remove</span>
                                </div>
                            </li> */}
                        </ul>

                    </div>
                </div>
            </div>
            <div id={`download-file-dis${props.value?.id}`} className="download-file-dis-bx new-toggle-dropdown" style={{display: 'none'}}>{props.value?.fileDescription}</div>
        </div>
    );
}
export default Download