import React, { useContext } from 'react';
import { FileManagerPath } from '../../../ApiServer/UrlService';
import CreateEventContext from '../../Pages/CreateEventContext/CreateEventContext';
import $ from 'jquery';
import GlobalContext from '../../../Global/Context/GlobalContext';

const EditStepOne = () => {
const [globalState,globalDispatch] = useContext(GlobalContext)
    const nextButton = (eve) => {
        $(eve).modal({ backdrop: 'static', keyboard: false });
    }
    const onChange = (e) => {
        globalDispatch({ type: 'SelectWebinarType', payload: { Type: 'SelectWebinarType', SelectWebinarType: e.target.value } })
    }
    const { Appointments, Training, Webinar, Discussion } = state;
    const EventWebinarInfo =({webinarType,webinarMedia,webinarDetails})=> {
        return (
            <>
                <div className="col-12 col-sm-12">
                    <div className="content-event-list">
                        <h3 className="popup-sub-title">{webinarType}</h3>
                        <figure className="event-cat-img">
                            <img src={webinarMedia} alt={webinarType} />
                        </figure>
                        <p>{webinarDetails}</p>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="modal left fade side-popup create-my-event-popup" id="edit-create-myevent-step-1" tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    {/* <form> */}
                    <div className="modal-content">
                        <button type="button" className="close" onClick={resetFormState} data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                        <div className="modal-header">
                            <h2 className="modal-title">Create My Event</h2>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-sm-12">
                                    <div className="saved-card-list choose-cat-list">
                                        <ul>
                                            <li>
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event" onChange={onChange} value="Appointments" checked={state.SelectWebinarType == "Appointments" ? true : false} />
                                                        Appointments
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event" onChange={onChange} value="Training" checked={state.SelectWebinarType == "Training" ? true : false} />
                                                        Training </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event" onChange={onChange} value="Webinar" checked={state.SelectWebinarType == "Webinar" ? true : false} />
                                                        Webinar </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="radio custom">
                                                    <label>
                                                        <input type="radio" name="event" onChange={onChange} value="Discussion" checked={state.SelectWebinarType == "Discussion" ? true : false} />
                                                        Discussion
                                                                </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {state.SelectWebinarType != '' ? <EventWebinarInfo 
                                webinarType={state.SelectWebinarType} 
                                webinarMedia={state.SelectWebinarType === "Webinar" ? `${FileManagerPath}/public/assets/images/webinar.svg` : state.SelectWebinarType === "Discussion" ? `${FileManagerPath}/public/assets/images/meet-img.svg` : state.SelectWebinarType === "Appointments" ? `${FileManagerPath}/public/assets/images/appointments-img.svg` : state.SelectWebinarType === "Training" ? `${FileManagerPath}/public/assets/images/training-img.svg` : ''} 
                                webinarDetails={state.SelectWebinarType == 'Appointments' ? Appointments : state.SelectWebinarType == 'Discussion' ? Discussion : state.SelectWebinarType == 'Training' ? Training : state.SelectWebinarType == 'Webinar' ? Webinar : ''} /> : ''}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="side-next-back-btn">
                                {state.SelectWebinarType != '' ? <button type="button" onClick={() =>nextButton('#create-my-event-step-3-popup')} className="btn default-btn float-right" data-toggle="modal" data-dismiss="modal" disabled={state.SelectWebinarType?false:true}>Continue</button> : <button type="button" className="btn default-btn float-right" disabled={true}>Continue</button>}
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </>
    );

}

export default React.memo(EditStepOne);


