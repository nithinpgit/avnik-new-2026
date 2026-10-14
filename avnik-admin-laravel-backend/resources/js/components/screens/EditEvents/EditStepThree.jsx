import React, { Component,useContext, useRef } from "react";
import UrlService, {FileManagerPath, assetUrl} from "../../../ApiServer/UrlService";
import CreateEventFileUploadPopUp from "./Components/CreateEventFileUploadPopUp";
import Tags from "./Components/Tags/Tags";
import { ApiService } from "../../../ApiServer/ApiService";
import EditEventContext from "./EditEventContext/EditEventContext";

const EditStepThree = props => {
    const [state, dispatch] = useContext(EditEventContext);
    const eventImageRef = useRef(null);
    const eventImageRefClick = () => {
        eventImageRef.current.click();
    };
    const prevButton = eve => {
        $(eve).modal({ backdrop: "static", keyboard: false });
    };
    const nextButton = eve => {
        $(eve).modal({ backdrop: "static", keyboard: false });
    };
    const onChangeImage = e => {
        $("#edit-presenter-btn").modal("show");
        dispatch({
            type: "eventCropedUrl",
            payload: {
                Type: "eventCropedUrl",
                eventCropedUrl: e.target.files,
                eventSelectedFiles: e.target.files,
                eventCropedImage: "",
                isModalClose: false
            }
        });
    };
    const getChildCategories = (id) => {
        ApiService.childCategories({parentId:id}).then(res => {
                if (res.data.status === 200) {
                    dispatch({
                        type: "getCategories",
                        payload: {
                            Type: "getCategories",
                            childCategories: res.data.data
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
    const onChangeParentHandle=(e)=>{
        console.log(e.target.name);
        dispatch({
            type: e.target.name,
            payload: {
                Type: e.target.name,
                event_category:
                    e.target.value,event_sub_category:'SubCategory'
            }
        })
        getChildCategories(e.target.value);
    }
    const onChangeChildHandle=(e)=>{
        console.log(e.target.value);
        dispatch({
            type: e.target.name,
            payload: {
                Type: e.target.name,
                event_sub_category:
                    e.target.value,
            }
        })
}

// remove image from data 
const removeSetImage=(ImageId)=>{
    if(state.event_files?.length>1){
        const filteredImages = state?.event_files.filter(
        images => images.id !== ImageId
    );
    dispatch({
        type: "eventImages",
        payload: {
            Type: "eventImages",
            event_files: filteredImages,
        }
    });
    toastr["error"]("File Removed");
    }else{
        toastr["error"]("min 1 image is required");
    }
}

    return (
        <>
            <div
                className="modal left fade side-popup create-my-event-popup"
                id="edit-create-myevent-step-3"
                tabIndex="-1"
                aria-labelledby="myModalLabel2"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    {/* <form onChange={(e)=>this.handleForm(e)} > */}
                    <div className="modal-content">
                        <button
                            type="button"
                            className="close"
                            onClick={() => props.resetFormState()}
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            {" "}
                            <i className="av av-close-icon"></i>
                        </button>
                        <div className="modal-header">
                            <h2 className="modal-title">Edit My Event</h2>
                        </div>
                        <div className="modal-body input-bdr-btm">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="flex-select-bx ce-category-s-bx">
                                            <select
                                                className="form-control custom-select-bx"
                                                // onChange={onChangeParentHandle}
                                                disabled={true}
                                                name="eventCategory"
                                                value={state?.event_category}
                                            >
                                                <option
                                                    defaultValue="Category"
                                                    disabled={true}
                                                    
                                                >
                                                    Category
                                                </option>
                                               {state?.parentCategories.map(res=> <option key={res.id} selected={state?.event_category==res?.id} value={res.id}>{res.name}</option>)}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="flex-select-bx ce-category-s-bx">
                                            <select
                                                className="form-control custom-select-bx"
                                                // onChange={onChangeChildHandle}
                                                name="eventSubCategory"
                                                value={state?.event_sub_category}
                                                disabled={true}
                                            >
                                                <option disabled={true} defaultValue="SubCategory" value="SubCategory">
                                                    SubCategory
                                                </option>
                                                {state?.childCategories.map(res=> <option key={res.id} selected={state?.event_sub_category==res?.id} value={res.id} >{res.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12">
                                    <div className="form-group">
                                        <textarea
                                            className={
                                                state?.event_description?.length <
                                                    150 ||
                                                state?.event_description?.length >
                                                    600
                                                    ? "form-control border-danger"
                                                    : "form-control border-success"
                                            }
                                            name="eventDescription"
                                            onChange={e =>
                                                dispatch({
                                                    type: e.target.name,
                                                    payload: {
                                                        Type: e.target.name,
                                                        event_description:
                                                            e.target.value
                                                    }
                                                })
                                            }
                                            value={state?.event_description}
                                            placeholder="Description"
                                        ></textarea>
                                        <span className="float-left label-small-h">
                                            min 150
                                        </span>{" "}
                                        <span className="float-right label-small-h">
                                            {" "}
                                            {state?.event_description?.length}/max 600
                                        </span>
                                    </div>
                                </div>

                                {/* <div className="col-12 col-sm-12">
                                              <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="Tags" name="tags" />
                                              </div>                
                                          </div> */}

                                <Tags  />
                                <div className="col-12 col-sm-12">
                                    <div className="form-group insert-files-form left-side-upload-popup">
                                        <div className="upload-event-image">
                                            <div
                                                onClick={eventImageRefClick}
                                                className="choose-images-video-icons"
                                                data-toggle="modal"
                                            >
                                                <figure>
                                                    {" "}
                                                    <img
                                                        src={`${FileManagerPath}/public/assets/images/choose-images-video-icons.svg`}
                                                        alt="logo"
                                                    />
                                                    <input
                                                        type="file"
                                                        ref={eventImageRef}
                                                        onChange={onChangeImage}
                                                        accept="image/*"
                                                        hidden
                                                    />
                                                    {/* <input type="file" ref={eventImageRef} onChange={onChangeImage}  accept="image/*,video/*" hidden/> */}
                                                    <figcaption>
                                                      Click to add image(s) for your event
                                                    </figcaption>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12">
                                    <div className="form-group event-uploaded-list">
                                        <ul className="cmn-ul-list">
                                            {state?.event_files.map(
                                                (res, index) => {
                                                    return (
                                                        <li key={res.id}>
                                                            <div className="insert-file-bx">
                                                                <div className="file-uploaded-outer">
                                                                    <img
                                                                                                                                                src={
                                                                            assetUrl(res.file_url)
                                                                        }
                                                                        alt={
                                                                            res.name
                                                                        }
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>removeSetImage(res.id)}
                                                                    className="btn link-btn"
                                                                >
                                                                    <i className="av av-delete-icon"></i>
                                                                </button>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="step-line-bdr">
                                <ul className="cmn-ul-list">
                                    <li className="complited">
                                        <span>&nbsp;</span>
                                    </li>
                                    <li className="active">
                                        <span>&nbsp;</span>
                                    </li>
                                    <li>
                                        <span>&nbsp;</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="side-next-back-btn">
                                {" "}
                                <button
                                    onClick={() =>
                                        prevButton(
                                            "#edit-create-myevent-step-2"
                                        )
                                    }
                                    className="btn default-btn float-left"
                                    data-toggle="modal"
                                    data-dismiss="modal"
                                >
                                    Back
                                </button>{" "}
                                <button
                                    type="button"
                                    onClick={() =>
                                        nextButton(
                                            "#edit-create-myevent-step-4"
                                        )
                                    }
                                    disabled={state?.event_files?.length>0&&state?.event_sub_category!=""&&state?.event_sub_category!="SubCategory"&&state?.event_category!="Category"&&state?.event_category!=""&&state?.event_tags?.length>0&&state?.event_description?.length>=150?false:true}
                                    className="btn default-btn float-right"
                                    data-toggle="modal"
                                    data-dismiss="modal"
                                >
                                    Continue
                                </button>{" "}
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
            <CreateEventFileUploadPopUp edit={true} />
        </>
    );
};
export default React.memo(EditStepThree);
