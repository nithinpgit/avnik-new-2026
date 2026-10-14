import React from 'react';
import { FileManagerPath } from '../../ApiServer/UrlService';

const OnScrollLoader = ({active}) => {
    return (
        <>{active?
           <span  className="content-loader" >
            <img style={{width: '50px',height: '50px'}} src={`${FileManagerPath}public/assets/images/loading.gif`} alt="loading" />
            </span>:<div style={{minHeight:'50px'}}></div>} 
        </>
    );
}

export default OnScrollLoader;
