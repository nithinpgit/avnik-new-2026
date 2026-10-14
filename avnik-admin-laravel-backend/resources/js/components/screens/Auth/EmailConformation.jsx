import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom';

import { Link,useParams ,useHistory} from 'react-router-dom';
import { FileManagerPath } from '../../../ApiServer/UrlService';
import { ApiService } from '../../../ApiServer/ApiService';


const EmailConformation=(props)=>{
const {token,email}=useParams();
const history=useHistory();
const [ErrorMessage,setErrorMessage]=useState('');
const [RedirectLogin,setRedirectLogin]=useState(0);
// const confirmEmail=()=>{
    useEffect(()=>{
        setTimeout(()=>{
            getEmailConfirm();
        },2000);
    },[]);
 const getEmailConfirm=()=>{
    ApiService._confirmEmail({token,email}).then((res)=>{
        if(res.data.status==200){
            history.push('/login');
        }else if(res.data.status==201){
            setTimeout(()=>{
                history.push('/login');
            },5000)
    
            setRedirectLogin(1)
            setErrorMessage(res.data.message)
           
        }else{
            setErrorMessage(res.data.message)
        }
     }).catch((error)=>{
        console.log(error);
     })
 }
 
// }
    return(
        <main className="fix-footer"> 
        <section className="sign-in-up-sec">
            <div className="container-flex-bx" style={{backgroundImage:`url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)`}}>
                <div className="wrap-l-s-bx">
                    <div className="login-signup-form email-sent-form">
                        <figure className="sign-in-up-logo-icon">
                            <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`} alt="logo"/>
                        </figure>
                        <div className="form-heading">
                            <h1>Click Continue to Explore Avnik</h1>
                        </div>
                        <form>                         
                            <div className="form-group">
                                <figure><img src={FileManagerPath+`public/assets/images/successfully-ck-icon.svg`} />
                                <figcaption><span>Email Conformed</span>
                                            {ErrorMessage!=''?<p>{ErrorMessage} {RedirectLogin>0?'Auto redirect in 5 second to login':''}</p>:''}
                                            {/* <p>Didn't get the a verification link? <Link to="#">Resend</Link></p> */}
                                    </figcaption>
                                </figure>                                
                            </div>
                            <div className="form-group chnage-password-btn">
                                <Link className="btn default-btn" to="/login">{RedirectLogin>0?'Login':'Login'}</Link>
                            </div>                           
                        </form>
                    </div>
                </div>
            </div>


</section>
    </main>   
    );
}
export default EmailConformation;