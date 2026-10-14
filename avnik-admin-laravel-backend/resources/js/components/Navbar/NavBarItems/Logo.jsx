import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FileManagerPath } from '../../../ApiServer/UrlService';


const Logo=()=>{

    return (
        <div className="logo">
            <Link to="/home">
                 <img className="d-logo" src={`${FileManagerPath}/public/assets/images/logo.svg`} alt="Avnik" />
                 <img className="m-logo" src={`${FileManagerPath}/public/assets/images/m-logo.svg`}  alt="" />
            </Link>
        </div>
    );
}

export default Logo;