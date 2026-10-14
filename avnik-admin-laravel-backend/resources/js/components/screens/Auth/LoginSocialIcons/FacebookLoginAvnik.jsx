import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import SocialLoginContext from './SocialLoginContext/SocialLoginContext';

const FacebookLoginAvnik = () => {
    const [signUp,responseFacebook,responseGoogle,responseTwitter,state] = useContext(SocialLoginContext);

    return (
        <>
            <FacebookLogin
                appId="303996060858861"
                autoLoad={false}
                fields="name,email,picture"
                cssClass="fb"
                tag="li"
                type=""
                callback={responseFacebook}
                textButton=""
                className="fb"
                icon={<Link to="#" ><i className="fa fa-facebook" aria-hidden="true"></i></Link>}
                />
        </>
    );
}

export default FacebookLoginAvnik;
