import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const HomeButtonCard=()=>{
    return (
        <div className="r-m-t-bx home-menu tr-h-icon"> 
            <Link to="/home">
                <i className="av av-home-icon"></i>
            </Link>
        </div>
    );
}
export default HomeButtonCard;