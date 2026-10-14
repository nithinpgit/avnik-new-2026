import React,{useEffect,useState,CSSProperties, Suspense, lazy } from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { BarLoader } from 'react-spinners/index.js';

const AuthEmail = lazy(() => import('../components/screens/Auth/Password/Email'));
const AuthRegister = lazy(() => import('../components/screens/Auth/Register'));
const AuthLogin = lazy(() => import('../components/screens/Auth/Login'));
const Welcome = lazy(() => import('../components/screens/Welcome/Welcome'));
const HomePage = lazy(() => import('../components/screens/Homepage/HomePage'));
const Error404 = lazy(() => import('../components/screens/Pages/Errors/404'));
const MyEvents =lazy(()=>import('../User/MyEvents/MyEvents.jsx'))

const TestApp = lazy(() => import('../TestApp/TestApp'));
// import CreateEventPage from '../components/screens/CreateEvent/CreateEventPage';
const CreateEventPage = lazy(() => import('../components/screens/CreateEvent/CreateEventPage'));
const AuthReset = lazy(() => import('../components/screens/Auth/Password/Reset'));
const EventDetails = lazy(() => import('../components/screens/Events/EventsDetails/EventDetails'));
const Profile = lazy(() => import('../User/Profiles/Profile'));
const CompleteProfile = lazy(() => import('../User/Profiles/CompleteProfile'));
import '../../../public/assets/js/avnik-scroll.js';

const MainSettingPage = lazy(() => import('../User/MainSettingPage'));
const ProtectedRoute = lazy(() => import('./Protected/ProtectedRoute'));
const ResetEmailConformation = lazy(() => import('../User/Profiles/Components/ResetEmailConformation'));
const Invoice = lazy(() => import('../User/Payments/Invoice/Invoice'));
import '../components/screens/CreateEvent/Components/Tags/tagsStyle.css';
import PublicRoute from './Protected/PublicRoutes.js';
import AuthVerify from '../components/screens/Auth/Verify.jsx';
import EmailConformation from '../components/screens/Auth/EmailConformation.jsx';
const Support = lazy(() => import('../User/Support/Support.jsx'));

const Routes = () => {
    
    const LogOut=()=>{
        localStorage.clear();
        sessionStorage.clear();
        return( <Redirect to="/" /> );
    }
    return (

        <BrowserRouter>
        
        <Suspense fallback={
            // <BarLoader color="#185488" />
            <div className="position-fixed w-100 top-0 start-0 zindex-9999">
            <div style={{width:"{dynamic}-%",height:"3px",background:"#185488"}}/>
            </div>
        // <div></div>
        }>
            <Switch>
                <PublicRoute exact path="/" component={Welcome} className="user-welcome-page"/>
                <PublicRoute exact path="/home" Title={["Upcoming","Recommended"]} component={HomePage} className="user-home-page"/>
                <PublicRoute exact path="/upcoming" component={HomePage} Title={["Upcoming"]} className="user-ongoing-page"/>
                <PublicRoute exact path="/appointments" component={HomePage}  Title={["Appointments"]} className="user-appointments-page"/>
                <PublicRoute exact path="/discussion" component={HomePage} Title={["Discussion"]} className="user-discussion-page"/>
                <PublicRoute exact path="/webinars" component={HomePage } Title={["Webinars"]} className="user-webinars-page" />
                <PublicRoute exact path="/training" component={HomePage } Title={["Training"]} className="user-training-page"/>
                <PublicRoute exact path="/team" component={HomePage} Title={["Team"]}  className="user-meet-page"/>
                <PublicRoute exact path="/login" component={AuthLogin} className="user-login-page"/>
                <ProtectedRoute exact path="/Logout" component={LogOut}  />
                <PublicRoute exact path="/register" component={AuthRegister}  className="user-register-page"/>
                <PublicRoute exact path="/conformation-email" component={AuthVerify}  className="user-register-page"/>
                <PublicRoute exact path="/email-conform/:token/:email" component={EmailConformation}  className="user-register-page"/>
                <ProtectedRoute exact path="/testroute" component={TestApp} />
                <PublicRoute exact path="/password-reset" component={AuthEmail} className="user-reset-password-page" />    
                <PublicRoute exact path="/password/email" component={AuthReset} className="user-change-email-page"/>
                <ProtectedRoute exact path="/create-event" component={CreateEventPage} Page="Create Event" className="user-create-event-page"/>
                <PublicRoute exact path="/event" component={EventDetails} Page="Event Detail"  className="user-event-details-page"/>
                <ProtectedRoute exact path="/media/files" component={MainSettingPage} Page="FileManager" className="user-file-manager-page" />
                <ProtectedRoute exact path="/reviews" component={MainSettingPage} Page="Reviews"  className="user-reviews-page"/>
                <ProtectedRoute exact path="/notifications" component={MainSettingPage} Page="Notification"  className="user-notification-page"/>
                <ProtectedRoute exact path="/messages" component={MainSettingPage} Page="Chat" className="user-messages-page" />
                <ProtectedRoute exact path="/favorites" component={MainSettingPage} Page="Favorites" className="user-favorites-page" />
                <ProtectedRoute exact path="/bookings" component={MainSettingPage} Page="Bookings" className="user-booking-page" />
                <ProtectedRoute exact path="/my-events" component={MainSettingPage} Page="MyEvents" className="user-my-events-page" />
                <ProtectedRoute exact path="/support" component={Support} Page="Support" className="user-my-events-page" />
                <ProtectedRoute exact path="/payments" component={MainSettingPage} Page="Payments" className="user-payment-page"/>
                <ProtectedRoute exact path="/payments/banks" component={MainSettingPage} Page="Banks" className="user-payment-page"/>
                <ProtectedRoute exact path="/payments/bank/verification" component={MainSettingPage} Page="Verification" className="user-payment-page"/>
                <ProtectedRoute exact path="/payments/invoice/:id" component={Invoice} Page="Invoice" className="user-invoice-page" />
                <ProtectedRoute exact path="/setting" component={MainSettingPage} Page="Setting" className="user-profile-setting" />
                <PublicRoute exact path="/profile/:ProfileId" component={Profile} className="user-profile-page" />
                <ProtectedRoute exact path="/complete-profile" component={CompleteProfile} className="user-complete-profile-page" />
                <PublicRoute exact path="/reset/email/:email/:token" component={ResetEmailConformation} Page="Reset Email" className="user-reset-email-page"/>
                <ProtectedRoute exact component={Error404} h2="Oops! Page Not Be Found" p="Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"  backTo="Back to home" link="/home" />
                

            </Switch>
            </Suspense>

        </BrowserRouter>

    );

}



export default Routes;