import React, { useState } from 'react'
import EventDetailsSection from './Cards/EventDetailsSection'
import TopNavbar from '../../../Navbar/Navbar'
import Sidebar from '../../../Sidebar/Sidebar'
import Footer, { InnerFooter } from '../../../Footer/Footer'
import Modals, { ReportEventModel, RescheduleEventsModel} from '../../../Modals/Modals'
import EventDetailsSectionPreload from './Cards/Preloader/EventDetailsSectionPreload'
import Auth from '../../../../Routes/Auth'
import { Redirect, useLocation } from 'react-router-dom'
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser'


 const EventDetails=(props)=>{

        return (
            <CurrentUser.Consumer>
                {(user)=><>

                    <main>
                            <TopNavbar/>
                            <Sidebar currentUser={user} />
                            <EventDetailsSection />
                            <InnerFooter currentUser={user} />
                    </main>
                        {Auth.isAuthenticated()?
                            <>
                                <Modals currentUser={user} modalId="delete-confirm-message-popup" message="Are you sure you want to delete this schedule?"></Modals>
                                <Modals currentUser={user} modalId="disable-confirm-message-popup" message="Are you sure you want to disable to this schedule?"></Modals>
                                <RescheduleEventsModel currentUser={user} />
                                {/* <ReportEventModel currentUser={user} /> */}
                            </>
                        :''}
                </>}
            </CurrentUser.Consumer>
        )   
    
}
export default EventDetails;
