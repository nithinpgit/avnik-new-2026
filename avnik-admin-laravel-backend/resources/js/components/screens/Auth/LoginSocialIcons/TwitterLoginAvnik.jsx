import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SocialLogin from 'react-social-login';
import TwitterLogin from 'react-twitter-login';
import SocialLoginContext from './SocialLoginContext/SocialLoginContext';

const TwitterLoginAvnik = () => {
    const [signUp,responseFacebook,responseGoogle,responseTwitter,state] = useContext(SocialLoginContext);

    return (
        <>
             {/* <TwitterLogin
                            buttonTheme	= "dark"
                            authCallback={responseTwitter}
                            consumerKey="HMU3fVnBOj0ZikVQvFP2Dzt58"
                            consumerSecret="kYMn4tzlH7awi4VeoolFrQfD2mKz3BSKJZGvngAfPlGo6fUgMj"
                            // callbackUrl="http://localhost:8000/login"
                            className="m-0 p-0"
                            children={<li className="twitter"><Link to="#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>}
            /> */}
            <SocialLogin
                provider='twitter'
                appId='HMU3fVnBOj0ZikVQvFP2Dzt58'
                callback={responseTwitter}
                >
                <button>Login with Google</button>
            </SocialLogin>
        </>
    );
}

export default TwitterLoginAvnik;
