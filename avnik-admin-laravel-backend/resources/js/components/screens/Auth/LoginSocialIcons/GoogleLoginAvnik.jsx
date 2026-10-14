import React,{useEffect,useContext} from 'react';
import GoogleLogin from 'react-google-login';
import SocialLoginContext from './SocialLoginContext/SocialLoginContext';
const GoogleLoginAvnik = () => {
    const [signUp,responseFacebook,responseGoogle,responseTwitter,state] = useContext(SocialLoginContext);
    return (
        <>
       
            <GoogleLogin  
                clientId="771157266627-goet082p5m00pptcp0h68qdake5jrn8v.apps.googleusercontent.com"            
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                icon={false}
                tag="li"
                Style={{padding:'8px 15px 12px 3px'}}
                className="google"
            >
                <a href="#">
                    
                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                </a>
            </GoogleLogin>
        
        </>
    );
}

export default GoogleLoginAvnik;
