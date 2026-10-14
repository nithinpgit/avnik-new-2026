import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react'
import '../../../../public/assets/js/bootstrap-datepicker.js';
import '../../../../public/assets/js/bootstrap-datepicker.min.js';

const Modals = (props) => {
    return (
        <>
            <div className="modal fade default-popup confirm-message-popup" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="message-m-box">
                                <div className="message-with-icon">
                                    <span className="info-icon"><i className="av av-info-icon"></i></span>
                                </div>
                                <strong>{props.message}</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="no-yes-btns">
                                <ul className="cmn-ul-list">
                                    <li><button type="button" className="btn blue-bdr-btn" data-dismiss="modal">No</button></li>
                                    <li><button type="button" className="btn default-btn">Yes</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const FileMangerModel = () => {

    return (
        <>
            <div className="modal fade cmn-modal file-manager-popup" id="presenter-btn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
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
                                        <a className="ah-tab-item" data-ah-tab-active="true" href="">Upload</a>
                                        <a className="ah-tab-item" href="">Choose</a>
                                    </div>
                                </div>
                                <div className="ah-tab-content-wrapper">
                                    <div className="ah-tab-content" data-ah-tab-active="true">
                                        <div className="insert-files-bx">
                                            <div className="choose-images-video-icons">
                                                <figure>
                                                    <img src="../assets/images/choose-images-video-icons.svg" alt="" />
                                                </figure>
                                            </div>
                                            <div className="file-upload">
                                                <input className="file-input" type="file" id="files" name="files" multiple />
                                                <div className="card-subtitle">Please choose images / video file(s) from your system</div>
                                            </div>
                                        </div>

                                        <div className="insert-btn"><button type="button" className="btn default-btn" data-dismiss="modal">Insert</button></div>
                                    </div>
                                    <div className="ah-tab-content">
                                       
                                        <div className="image-video-list">
                                            <ul className="cmn-ul-list">
                                                <li>
                                                    <input type="checkbox" id="myCheckbox1" />
                                                    <label htmlFor="myCheckbox1"><img src="../assets/images/event-img.jpg" /></label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" id="myCheckbox2" />
                                                    <label htmlFor="myCheckbox2"><img src="../assets/images/event-img.jpg" /></label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="insert-btn"><button type="button" className="btn default-btn" data-dismiss="modal">Insert</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
const CreateEventModel = () => {
    return (
        <>
            <div className="create-event-menu">
                <ul id="menu" className="mfb-component--br mfb-slidein" data-mfb-toggle="hover">
                    <li className="mfb-component__wrap">
                        <a href="#" className="mfb-component__button--main" data-mfb-label="Create Event">
                            <i className="mfb-component__main-icon--resting av av-event-edit-icon"></i>
                            <i className="mfb-component__main-icon--active av av-close-icon"></i>
                        </a>
                        <ul className="mfb-component__list">
                            <li>
                                <a data-toggle="modal" href="#create-event-content" data-mfb-label="Quick Start" className="mfb-component__button--child">
                                    <i className="mfb-component__child-icon av av-traning-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="modal" href="#create-event-content" data-mfb-label="Team" className="mfb-component__button--child">
                                    <i className="mfb-component__child-icon av av-team-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="modal" href="#create-event-content" data-mfb-label="Traning" className="mfb-component__button--child">
                                    <i className="mfb-component__child-icon av av-traning-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="modal" href="#create-event-content" data-mfb-label="Appointments" className="mfb-component__button--child">
                                    <i className="mfb-component__child-icon av av-appointments-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a data-toggle="modal" href="#create-event-content" data-mfb-label="Webinars" className="mfb-component__button--child">
                                    <i className="mfb-component__child-icon av av-webinar-icon"></i>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}
const RescheduleEventsModel = () => {

    useEffect(() => {
        $('.single-date').datepicker({
            // multidate: true,
            format: 'dd-mm-yyyy'
        });
    }, []);

    return (
        <>
            <div className="modal fade default-popup reschedule-event-popup" id="reschedule-event-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-body">
                                <div className="reschedule-wrapper">
                                    <div className="r-e-left">
                                        <div className="info-icon"><i className="av av-info-icon"></i></div>
                                        <strong>By rescheduling the appointment you agree to these points:</strong>
                                        <ul className="dot-li-list">
                                            <li>Rescheduling will deduct 10% of total cost for your booking </li>
                                            <li>Rescheduling will deduct 10% of total cost for your booking </li>
                                        </ul>
                                    </div>
                                    <div className="r-e-right">
                                        <h2>Reschedule Appointment</h2>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="EventTitle">Select Date & Time</label>
                                            <div className="icon-input"><input type="text" className="form-control single-date" placeholder="Pick the multiple dates" /></div>
                                        </div>
                                        <button className="btn default-btn js-btn-prev" type="button" title="Reschedule">Reschedule</button>
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

const FilterPopupModel = () => {

    return (
        <div className="modal fade default-popup filter-popup" id="filter-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form>
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                        <div className="modal-header">
                            <h2 className="modal-title" id="exampleModalLabel">Filter</h2>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="inputState">Select Categories</label>
                                        <div className="custom-select-bx">
                                            <select className="form-control">
                                                <option selected>-Select-</option>
                                                <option>Logo design</option>
                                                <option>Web design</option>
                                                <option>App design</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="inputState">Event Type</label>
                                        <div className="custom-select-bx">
                                            <select className="form-control">
                                                <option selected>-Select-</option>
                                                <option>Webinars</option>
                                                <option>Webinars</option>
                                                <option>Webinars</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="inputState">Country Name</label>
                                        <div className="custom-select-bx">
                                            <select className="form-control">
                                                <option selected>-Select-</option>
                                                <option>India</option>
                                                <option>India</option>
                                                <option>India</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="inputState">Event Cost</label>
                                        <div className="custom-select-bx">
                                            <select className="form-control">
                                                <option selected>-Select-</option>
                                                <option>Free</option>
                                                <option>Free</option>
                                                <option>Free</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="apply-btn"><button type="button" className="btn default-btn" data-dismiss="modal">Apply</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
const ReportEventModel = () => {
    return (
        <>
            <div className="modal fade default-popup report-event-popup" id="report-event-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="tag">Why are you reporting this event</label>
                                    <ul>
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio" defaultChecked name="foo" />
                                            Lorem Ipsum is simply
                                        </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio" name="foo" />
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio" defaultChecked name="foo" />
                                            Lorem Ipsum is simply
                                        </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn default-btn js-btn-prev" type="button" title="Reschedule">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
const DeleteScheduleModal = () => {
    return (
        <div className="modal fade default-popup confirm-message-popup" id="disable-confirm-message-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="message-m-box">
                            <div className="message-with-icon">
                                <span className="info-icon"><i className="av av-info-icon"></i></span>
                            </div>
                            <strong>Are you sure you want to disable to this schedule?</strong>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="no-yes-btns">
                            <ul className="cmn-ul-list">
                                <li><button type="button" className="btn blue-bdr-btn" data-dismiss="modal">No</button></li>
                                <li><button type="button" className="btn default-btn">Yes</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const DisableScheduleModal = () => {
    return (
        <>
            <div className="modal fade default-popup confirm-message-popup" id="disable-confirm-message-popup" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true"><i className="av av-close-icon"></i></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="message-m-box">
                                <div className="message-with-icon">
                                    <span className="info-icon"><i className="av av-info-icon"></i></span>
                                </div>
                                <strong>Are you sure you want to disable to this schedule?</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="no-yes-btns">
                                <ul className="cmn-ul-list">
                                    <li><button type="button" className="btn blue-bdr-btn" data-dismiss="modal">No</button></li>
                                    <li><button type="button" className="btn default-btn">Yes</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const CreateFolderModal = ({onChange,value,handleSubmit}) => {
    return (
        <>
            <div className="modal fade default-popup create-folder-popup" id="create-folder-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title">Create Folder</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Folder name:</label>
                                    <input type="text" className="form-control" placeholder="Folder Name" name="createFolder" onChange={onChange} value={value}/>
                                </div>
                                <div className="form-ck-forgot-p-link">
                                    
                                    <div className="forgot-link">
                                        <button type="submit" disabled={value?false:true} className="btn default-btn" >Save</button>
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
// Upload FileManager Modal 
const UploadFileModal = () => {
    return (
        <>
            <div className="modal fade default-popup upload-files-popup" id="upload-files-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title">Upload Files</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group insert-files-form">
                                    <div className="upload-event-image">
                                        <div className="choose-images-video-icons" data-toggle="modal" data-target="#presenter-btn">
                                            <figure>
                                                <img src="images/choose-images-video-icons.svg" alt="" />
                                                <figcaption>Add a File or Folder (maximum file size 20mb) </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>

                                <div className="upload-files-list">
                                    <div className="u-p-files-list uploading-file-bx">
                                        <div className="custom-table">
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                            <div className="table-row">
                                                <div className="cell title-editable" data-title="Name">
                                                    <div className="file-type-title-icon"><span className="file-type-name">jpg</span> <strong>Hip Hop Tutorial</strong></div>
                                                </div>
                                                <div className="cell file-progress-editable" data-title="Action">
                                                    <div className="progress">
                                                        <div className="progress-bar" style="width:20%"></div>
                                                    </div>
                                                    <button type="button" className="btn default-btn cricle-icon-btn"><i className="av av-close-icon"></i></button>
                                                </div>
                                            </div>
                                        </div>
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

export {CreateFolderModal, DisableScheduleModal, DeleteScheduleModal, ReportEventModel, CreateEventModel, FilterPopupModel, FileMangerModel, RescheduleEventsModel };
export default Modals;
