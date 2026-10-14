import React, { Component, useState } from 'react';
import TopNavbar from '../../Navbar/Navbar';
import Sidebar from '../../Sidebar/Sidebar';
import { Redirect, useHistory } from 'react-router-dom';
import UserAuthService from '../../../ApiServer/UserAuthService';
import AllEventsDetails from '../../../ApiServer/AllEventsDetails';
import FilterPopup from '../../Filter/FilterPopup';
import HomeSection from '../../Home/Cards/HomeSection';
import Auth from '../../../Routes/Auth';
import CurrentUser from '../../UserContext/CurrentUserContext/CurrentUser';
import { InnerFooter } from '../../Footer/Footer';

class HomePage extends Component {

    constructor(props) {

        super();

        const Token = localStorage.getItem("accessToken");

        let IsLogin = true;

        if (Token == null) {
            IsLogin = false
        }

        this.state = {
            IsLogin,
            SideBar:{
                ActiveSidebar:'',
                EventType:'',
            },
            Preloader:true,
            allEventsResponse: {}
        }
        this.topSearchHandel=this.topSearchHandel.bind(this);
        this.topFilterHandel=this.topFilterHandel.bind(this);
        this.sidebarHandel=this.sidebarHandel.bind(this);

    }

    topSearchHandel(e){

        console.log(e,"searchHandel");
    
    }
    topFilterHandel(e){
    
        console.log(e,"topFilterHandel");
    
    }
    sidebarHandel(e){
        
        console.log(e,"SideBarHandel");
    
    }

    render() {
        document.title = "Home";
        return (
            <>
            <CurrentUser.Consumer>
               {(user)=><main>
                            <TopNavbar/>
                            <Sidebar currentUser={user} sidebarHandel={this.sidebarHandel} ></Sidebar>
                            {/* <FilterPopup currentUser={user} /> */}
                            <HomeSection currentUser={user} topFilterHandel={this.topFilterHandel} topSearchHandel={this.topSearchHandel} Title={this.props.Title} />
                        </main>}
            </CurrentUser.Consumer>
            </>
        );

    }

}
export default HomePage;
