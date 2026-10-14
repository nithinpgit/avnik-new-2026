import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

const ChatCard=()=>{
    return (
<div className="r-m-t-bx others-menu">
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"><i className="av av-menu-box-icon"></i> </button>
                <div className="dropdown-menu dropdown-menu-lg-right">
                    <ul>
                        <li> <NavLink to={`/payments`} className="dropdown-item"> <i className="av av-payment-icon"></i> <span>Payments</span> </NavLink> </li>
                        <li> <NavLink to={`/bookings`} className="dropdown-item"> <i className="av av-event-time-icon"></i> <span>Bookings</span> </NavLink> </li>
                        <li> <NavLink to={`/media/files`} className="dropdown-item"> <i className="av av-files-icon"></i> <span>File Manager</span> </NavLink> </li>
                        <li> <NavLink to={`/reviews`} className="dropdown-item"> <i className="av av-review-line-icon"></i> <span>Reviews</span> </NavLink> </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default ChatCard;