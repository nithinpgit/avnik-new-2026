import Axios from 'axios';
import React, { useContext, useState } from 'react';
import FormErrors from '../../../components/screens/CreateEvent/Errors/ValidationError/FormError';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import Auth from '../../../Routes/Auth';

const EmailChangePopup = (props) => {

const currentUser = useContext(CurrentUser);    
const [Email, setEmail] = useState('');
const [submit, setSubmit] = useState({
    submit:false,
    response:false,
});

const onChange=(e)=>{
    console.log(e.target.value,e.target.name,Email);
}
 const handleChange=(e)=>{
    e.preventDefault();
    setSubmit(true);
    let data={
        currentUserId:currentUser?.id,
        email:Email,
    }
    Axios.post('/api/profile/resetEmail',data,{
        headers:{'Accept':'application/json',
                    authorization:`Bearer ${Auth.getAccessToken()}`
                }
    ,}).then((res)=>{
        
        if(res.data.status==200){
            
            $('#change-email-address-popup').modal('hide');
            setEmail('');
            setSubmit({...submit,submit:false,response:true});
             toastr["success"](res.data.message);

            
        }
        if(res.data.status=="failed"){
            setSubmit({...submit,submit:false,response:false});

            if(res.data.validation_error){
                let EmailError=res.data.validation_error?.email;
                if(EmailError){
                    FormErrors.responseValidationError(EmailError);
                }
            }
        }

        console.log(res);

    }).catch((error)=>{

        toastr["error"](error.message);
        console.log(error);
        setSubmit({...submit,submit:false,response:false});

    })
 }
    return (
        <>
            <div className="modal fade default-popup create-folder-popup" id="change-email-address-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form  onSubmit={handleChange} >
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title">Change Email Address</h2>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">New Email Address:</label>
                                  <input type="email" className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter new  email address" value={Email} />
                                    
                                </div>
                                <div className="form-ck-forgot-p-link">
                                <div className="forgot-link">
                                        <button type="submit" className="btn default-btn" disabled={submit?.submit} >Send</button>
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

export default EmailChangePopup;
