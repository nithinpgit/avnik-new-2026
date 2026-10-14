import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';


export default class EditStepFive extends Component{
    closeModal(){
        $('.modal').modal('hide');
    }
    render(){
        return(
            <>
                <div className="modal left fade side-popup create-my-event-popup" id="edit-my-event-step-6-popup" tabIndex="-1" aria-labelledby="myModalLabel2" aria-hidden="true">
                        <div className="modal-dialog">
                            {/* <form> */}
                            <div className="modal-content">
                                
                            <button type="button" className="close" onClick={()=>this.closeModal()} aria-label="Close"> <i className="av av-close-icon"></i></button>
                                <div className="modal-header">
                                <h2 className="modal-title">Edit My Event</h2>
                                </div>
                                <div className="modal-body input-bdr-btm calender-files-upload">
                                
                                 <div className="container">
                                        <div className="card">
                                            <div className="card-body m-5 text-center">
                                                <h3 className=""> Thank You! </h3>
                                                <h6>Your event updated successfully!</h6>
                                            </div>

                                            <div className="row">

                                                <div className="col-sm-12 d-flex justify-content-center mb-2">

                                                <Link to="/home" onClick={()=>this.closeModal()} className="btn white-shadow-btn">Take Me <i className="av av-home-icon"></i></Link>
                                                    <br/>
                                                <button type="button" onClick={()=>this.closeModal()} className="btn white-shadow-btn">Check Updated Event</button>
                                            
                                            </div>
                                            
                                            </div>  
                                            </div>
                                        </div>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
            </>
        );
    }
}