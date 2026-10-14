import React, { Component, useRef } from "react";
import UrlService, {FileManagerPath, assetUrl} from "../../../../../ApiServer/UrlService";
import CreateEventFileUploadPopUp from "../../../../Home/Cards/CreateEvent/CreateEventFileUploadPopUp";
import Tags from "../Tags/Tags";
import { useContext } from "react";
import CreateEventContext from "../../Pages/CreateEventContext/CreateEventContext";
import { ApiService } from "../../../../../ApiServer/ApiService";

const StepThree = props => {
    const [state, dispatch] = useContext(CreateEventContext);
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
        $("#presenter-btn").modal("show");
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
                eventCategory:
                    e.target.value,eventSubCategory:'SubCategory'
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
                eventSubCategory:
                    e.target.value,
            }
        })
}


    return (
        <>
            <div
                className="modal left fade side-popup create-my-event-popup"
                id="create-my-event-step-4-popup"
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
                            <h2 className="modal-title">Create My Event</h2>
                        </div>
                        <div className="modal-body input-bdr-btm">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="flex-select-bx ce-category-s-bx">
                                            <select
                                                className="form-control custom-select-bx"
                                                onChange={onChangeParentHandle}
                                                name="eventCategory"
                                                value={state.eventCategory}
                                            >
                                                <option
                                                    defaultValue="Category"
                                                    disabled={true}
                                                    
                                                >
                                                    Category
                                                </option>
                                               {state?.parentCategories.map(res=> <option key={res.id} value={res.id}>{res.name}</option>)}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="form-group">
                                        <div className="flex-select-bx ce-category-s-bx">
                                            <select
                                                className="form-control custom-select-bx"
                                                onChange={onChangeChildHandle}
                                                name="eventSubCategory"
                                                value={state.eventSubCategory}
                                            >
                                                <option disabled={true} defaultValue="SubCategory" value="SubCategory">
                                                    SubCategory
                                                </option>
                                                {state?.childCategories.map(res=> <option key={res.id} value={res.id} >{res.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12">
                                    <div className="form-group">
                                        <textarea
                                            className={
                                                state.eventDescription.length <
                                                    150 ||
                                                state.eventDescription.length >
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
                                                        formSubmit:false,
                                                        eventDescription:
                                                            e.target.value
                                                    }
                                                })
                                            }
                                            value={state.eventDescription}
                                            placeholder="Description"
                                        ></textarea>
                                        <span className="float-left label-small-h">
                                            min 150
                                        </span>{" "}
                                        <span className="float-right label-small-h">
                                            {" "}
                                            {state.eventDescription?.length}/max 600
                                        </span>
                                    </div>
                                </div>

                                {/* <div className="col-12 col-sm-12">
                                              <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="Tags" name="tags" />
                                              </div>                
                                          </div> */}

                                <Tags
                                    value={props.value}
                                    setAnyState={props.setAnyState}
                                />
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
                                            {state.eventImages.map(
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
                                                                    onClick={() =>
                                                                        props.removeSetImage(
                                                                            res.id
                                                                        )
                                                                    }
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
                                            "#create-my-event-step-3-popup"
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
                                            "#create-my-event-step-5-popup"
                                        )
                                    }
                                    disabled={state.eventFiles?.length>0&&state.eventSubCategory!=""&&state.eventSubCategory!="SubCategory"&&state.eventCategory!="Category"&&state.eventCategory!=""&&state?.eventTags?.length>0&&state.eventDescription?.length>=150?false:true}
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
            <CreateEventFileUploadPopUp  edit={false}/>
        </>
    );
};
export default React.memo(StepThree);
