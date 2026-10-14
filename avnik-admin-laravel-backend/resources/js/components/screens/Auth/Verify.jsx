import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import { Link, useHistory } from 'react-router-dom';
import { FileManagerPath } from '../../../ApiServer/UrlService';

const AuthVerify=(props)=>{


    // const history=useHistory();
    // const [state, setState] = useState(history.go(0));

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
                            <h1>Check Your Email</h1>
                        </div>
                        <form>                         
                            <div className="form-group">
                                <figure><img src={FileManagerPath+`public/assets/images/successfully-ck-icon.svg`} />
                                <figcaption><span>We sent you a verification link by email</span>
                                            {/* <p>Didn't get the a verification link? <Link to="#">Resend</Link></p> */}
                                    </figcaption>
                                </figure>                                
                            </div>
                            <div className="form-group chnage-password-btn">
                                {/* <button className="btn default-btn">Resend</button> */}
                            </div>                           
                        </form>
                    </div>
                </div>
            </div>


</section>
    </main>   
    );
}
export default AuthVerify;