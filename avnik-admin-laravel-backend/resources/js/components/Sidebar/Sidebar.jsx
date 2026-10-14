import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, useHistory } from 'react-router-dom';

const Sidebar=(props)=>{
    const sidebarText={Home:"Home",Ongoing:"Upcoming",Webinars:"Webinars",Appointments:"Appointments",Meet:"Discussion",Training:"Training",Team:"Team"} 
    const history=useHistory();
    const current=history.location.pathname;    
    const [state, setState] = useState({
        Ongoing:`l-s-item ${current=='/upcoming'?'active':''}`,
        Training:`l-s-item ${current=='/training'?'active':''}`,
        Webinars:`l-s-item ${current=='/webinars'?'active':''}`,
        Appointments:`l-s-item ${current=='/appointments'?'active':''}`,
        Meet:`l-s-item ${current=='/meet'?'active':''}`,
        Team:`l-s-item ${current=='/team'?'active':''}`,
        sidebar:["Upcoming","Recommended"]
});

// props.sidebarHandel(state.sidebar);

// if(current==='/ongoing'){

//     props.ActiveSidebar(sidebarText.Ongoing);
   
// }else if(current=='/training'){
//       props.ActiveSidebar(sidebarText.Training);

// }else if(current=='/webinars'){

//       props.ActiveSidebar(sidebarText.Webinars);
// }else if(current=='/appointments'){
//       props.ActiveSidebar(sidebarText.Appointments);
// }else if(current=='/meet'){
//       props.ActiveSidebar(sidebarText.Meet);
// }else if(current=='/team'){
//       props.ActiveSidebar(sidebarText.Team);

// }
return(
<>
        <div className={`sidebar-menu ${current==="/home"?'':'remove-sidebar-menu'} `}>
        <div className="left-side-nav">
            <div className="scroll multiple">
                <div className="scrollDiv">
                    <div className="scrollContent">

                        <div className={state.Ongoing}   >
                            <NavLink  to="/upcoming" onClick={(event)=>{setState({
                                    Ongoing:"l-s-item active",
                                    Training:"l-s-item",
                                    Webinars:"l-s-item",
                                    Appointments:"l-s-item",
                                    Meet:"l-s-item",
                                    Team:"l-s-item",
                                    sidebar:[sidebarText.Ongoing]
                            })}}>
                                <div className="side-icon"><i className="av av-ongoing-icon"></i></div>
                                <span>{sidebarText.Ongoing}</span>
                            </NavLink>
                        </div>
                        <div className={state.Webinars} >
                            <NavLink to="/webinars" onClick={(event)=>{setState({
                                    Ongoing:"l-s-item ",
                                    Training:"l-s-item",
                                    Webinars:"l-s-item active",
                                    Appointments:"l-s-item",
                                    Meet:"l-s-item",
                                    Team:"l-s-item",
                                    sidebar:[sidebarText.Webinars]
                            })}}>
                                <div className="side-icon"><i className="av av-webinar-icon"></i></div>
                                <span>{sidebarText.Webinars}</span>
                            </NavLink>
                        </div>
                        <div className={state.Appointments} >
                            <NavLink to="/appointments" onClick={(event)=>{setState({
                                    Ongoing:"l-s-item ",
                                    Training:"l-s-item",
                                    Webinars:"l-s-item",
                                    Appointments:"l-s-item active",
                                    Meet:"l-s-item",
                                    Team:"l-s-item",
                                    sidebar:[sidebarText.Appointments]
                            })}}>
                                <div className="side-icon"><i className="av av-appointments-icon"></i></div>
                                <span>{sidebarText.Appointments}</span>
                            </NavLink>
                        </div>
                        <div className={state.Meet} >
                            <NavLink to="/discussion" onClick={(event)=>{setState({
                                    Ongoing:"l-s-item ",
                                    Training:"l-s-item",
                                    Webinars:"l-s-item",
                                    Appointments:"l-s-item",
                                    Meet:"l-s-item active",
                                    Team:"l-s-item",
                                    sidebar:[sidebarText.Meet],
                            })}}>
                                <div className="side-icon"><i className="av av-Meet-icon"></i></div>
                                <span>{sidebarText.Meet}</span>
                            </NavLink>
                        </div>
                        <div className={state.Training} >
                            <NavLink to="/training" onClick={(event)=>{setState({
                                    Ongoing:"l-s-item ",
                                    Training:"l-s-item active",
                                    Webinars:"l-s-item",
                                    Appointments:"l-s-item",
                                    Meet:"l-s-item",
                                    Team:"l-s-item",
                                    sidebar:[sidebarText.Training]
                            })}}>
                                <div className="side-icon"><i className="av av-traning-icon"></i></div>
                                <span>{sidebarText.Training}</span>
                            </NavLink>
                        </div>
                       {/* <div className={state.Team} >
                                <NavLink to="/team" onClick={(event)=>{setState({
                                        Ongoing:"l-s-item ",
                                        Training:"l-s-item",
                                        Webinars:"l-s-item",
                                        Appointments:"l-s-item",
                                        Meet:"l-s-item",
                                        Team:"l-s-item active",
                                        sidebar:[sidebarText.Team]
                                        })}}>
                                    <div className="side-icon"><i className="av av-team-icon"></i></div>
                                    <span>{sidebarText.Team}</span>
                                </NavLink>
                                    </div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default Sidebar;