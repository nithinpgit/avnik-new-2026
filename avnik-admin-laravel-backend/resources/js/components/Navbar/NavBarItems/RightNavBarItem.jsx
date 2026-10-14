import React, { useState } from 'react';
import ProfileCard from './Cards/ProfileCard';
import NotificationCard from './Cards/NotificationCard';
import FavoriteCard from './Cards/FavoriteCard';
import ChatCard from './Cards/ChatCard';
import HomeButtonCard from './Cards/HomeButtonCard';
import MenuCard from './Cards/MenuCard';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import QuickStartButton from './Cards/QuickStartButton';
import CreateEventButton from './Cards/CreateEventButton';
import Auth from '../../../Routes/Auth';
import { NavLink } from 'react-router-dom';
const RightNavbarItem=()=>{
        return(
            
              <>  
           {Auth.getAccessToken()?<div className="h-rit-bx">
                <QuickStartButton />
                <CreateEventButton />
                <HomeButtonCard />
                <MenuCard />
                <ChatCard />
                <FavoriteCard />
                <NotificationCard />
                <ProfileCard />
            </div>
            :
            <div className="h-rit-bx">
                <QuickStartButton />
                <div className="r-m-t-bx create-event-menu"> <NavLink className="btn default-btn" to="/login">Login</NavLink></div>
                <div className="r-m-t-bx create-event-menu"> <NavLink className="btn cmn-bdr-btn" to="/register"><i className="av av av-user-icon"></i> Sign Up</NavLink></div>
            </div>}
            
      </>
        );
   
     
      
}
export default RightNavbarItem;