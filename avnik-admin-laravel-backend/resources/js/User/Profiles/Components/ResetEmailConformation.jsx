import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { FileManagerPath } from '../../../ApiServer/UrlService';
import moment from "moment";
import 'moment-timezone'; 
const ResetEmailConformation = () => {
   const {email,token}= useParams();
   const [EmailDetails, setEmailDetails] = useState({
      errorMessage:'',
      successMessage:'',
      error:false,
      success:false,
      time:10,
   });
  useEffect(() => {
      let data={
          email:email,
          token:token,
          tz:moment.tz.guess(),
      }
    Axios.post('/api/profile/email/conformation',data).then((res)=>{
        console.log(res);
        if(res.data.status==200){
            setEmailDetails({...EmailDetails,successMessage:res.data.message,error:false,success:true})
            localStorage.clear()
            sessionStorage.clear()
        }
        if(res.data.status=="failed"){
            setEmailDetails({...EmailDetails,errorMessage:res.data.message,error:true,success:false})
        }

    }).catch((error)=>{
        setEmailDetails({...EmailDetails,errorMessage:error.message,error:true,success:false})
        console.log(error);
    })  

    return;
  }, [])
 
 
  if(EmailDetails.success){
    
    setInterval(() => {
        setEmailDetails({...EmailDetails,time:EmailDetails.time-1}) 
    }, 1000);
    
       
  }
    return (

<>
            <main>
                <section className="sign-in-up-sec">
                    <div className="container-flex-bx" style={{ backgroundImage: `url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)` }}>
                        <div className="wrap-l-s-bx">
                            <div className="login-signup-form email-sent-form">
                                <figure className="sign-in-up-logo-icon">
                                    <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`} alt="logo" />
                                </figure>
                                <div className="form-heading">
                                    <h1>Email Confirmation</h1>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <figure><img src={`${FileManagerPath}/public/assets/images/${EmailDetails.error?"error.jpeg":"successfully-ck-icon.svg"}`} />
                                            <figcaption>
                                                <span>{EmailDetails.error?EmailDetails.errorMessage:EmailDetails.successMessage}</span>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className="form-group chnage-password-btn">

                                    {EmailDetails.success?<>
                                            <NavLink to="/login" className="btn default-btn">Login Again</NavLink>
                                    </>:''}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </section>
            </main>
        </>
    );
}

export default ResetEmailConformation;
