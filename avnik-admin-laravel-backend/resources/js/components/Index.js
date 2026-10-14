import React,{useEffect,useState ,StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import Routes from '../Routes/Routes';
import QuickStartModel from './Navbar/QuickStartModel/QuickStartModel';
import '../../../node_modules/croppie/croppie.css';
const Index=(props)=> { 
    return (
        <>
        {/* <StrictMode> */}
            <Routes />
            <QuickStartModel/>
        {/* </StrictMode> */}
        </>
    );
}

export default withRouter(Index);

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}
