import React, { Component, lazy, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterPopup from '../components/Filter/FilterPopup';
import { InnerFooter } from '../components/Footer/Footer';
import TopNavbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { showHideDiv } from '../utility/UtilityFunctions';
import ChatPage from './Chats/ChatPage';
import EventList from './EventList/EventList';
import Favorites from './Favorites/Favorites';
import FileManager from './FileManager/FileManager';
import Notification from './Notification/Notification';
import Payments from './Payments/Payments';
import Reviews from './Reviews/Reviews';
import Setting from './Setting/Setting';
import MyEvents from './MyEvents/MyEvents';

const MainSettingPage=(props)=>{


        return (
            <>
                <main > 
                    <TopNavbar />
                    <Sidebar />
                    {/* <FilterPopup /> */}
                    <section className="mid-content-sec in-page-content-sec ">
                        <div className="inbox-wrapper">
                            <div className="container">
                                <div className="av-default-tabs">
                                    <TopMenu Page={props.Page}/>
                                    <div className="ah-tab-content-wrapper">
                                        {props.Page==="Chat"?<ChatPage showHideDiv={showHideDiv} Active={props.Page==="Chat"?true:false} />:''}
                                        {props.Page==="Bookings"?<EventList showHideDiv={showHideDiv} Active={props.Page==="Bookings"?true:false} />:''}
                                        {props.Page==="MyEvents"?<MyEvents showHideDiv={showHideDiv} Active={props.Page==="MyEvents"?true:false} />:''}
                                        {props.Page==="FileManager"?<FileManager showHideDiv={showHideDiv} Active={props.Page==="FileManager"?true:false} />:''}
                                        {props.Page==="Payments" ||props.Page==="Banks"||props.Page==="Verification"?<Payments showHideDiv={showHideDiv} Active={props.Page==="Payments" ||props.Page==="Banks"||props.Page==="Verification"?true:false} />:''}
                                        {props.Page==="Notification"?<Notification showHideDiv={showHideDiv} Active={props.Page==="Notification"?true:false} />:''}
                                        {props.Page==="Reviews"?<Reviews showHideDiv={showHideDiv} Active={props.Page==="Reviews"?true:false} />:''}
                                        {props.Page==="Favorites"?<Favorites showHideDiv={showHideDiv} Active={props.Page==="Favorites"?true:false} />:''}
                                        {/* {props.Page==="Setting"?<Setting showHideDiv={showHideDiv} Active={props.Page==="Setting"?true:false} />:''} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <InnerFooter/> */}
                </main>
            </>
        );
    
}

export default MainSettingPage;

const TopMenu =(props)=>{

document.title=props.Page;
       return (
            <>
                <div className="ah-tab-wrapper">
                    <div className="ah-tab">
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Chat"?true:false} to="/messages">Messages</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Bookings"?true:false} to="/bookings">Bookings</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="MyEvents"?true:false} to="/my-events">My Events</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="FileManager"?true:false} to="/media/files">File Manager</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Payments" ||props.Page==="Banks"||props.Page==="Verification"?true:false} to="/payments">Payments</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Notification"?true:false} to="/notifications">Notifications</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Reviews"?true:false} to="/reviews">Reviews</Link>
                        <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Favorites"?true:false} to="/favorites">Favorites</Link>
                        {/* <Link className="ah-tab-item" data-ah-tab-active={props.Page==="Setting"?true:false} to="/setting">Settings</Link> */}
                    </div>
                </div>
            </>

       );
   }
