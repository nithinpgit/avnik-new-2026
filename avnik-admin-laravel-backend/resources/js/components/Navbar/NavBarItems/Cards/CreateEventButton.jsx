import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CreateEventButton extends Component {
    render() {
        return (
            <>
                <div className="r-m-t-bx create-event-menu"> <NavLink className="btn cmn-bdr-btn create-event-btn"  to="/create-event" data-mfb-label="Quick Start"> <i className="av av-calendar-icon"></i><span>Scheduler</span> </NavLink> </div>      
            </>
        );
    }
}

export default CreateEventButton;
