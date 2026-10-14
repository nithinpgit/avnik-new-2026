import React, { useEffect, useReducer,lazy, useState } from "react";
import { Route, Redirect,useHistory } from "react-router-dom";
import Auth from "../Auth";
import moment from "moment";
import 'moment-timezone';
import CurrentUser from "../../components/UserContext/CurrentUserContext/CurrentUser";
import { ApiService } from "../../ApiServer/ApiService";
import GlobalContext from "../../Global/Context/GlobalContext";
import GlobalReducer from "../../Global/Reducer/GlobalReducer";
import { FileManagerPath } from "../../ApiServer/UrlService";
const AddSlotModal  = lazy(() => import("../../components/screens/AddSlots/Modal/AddSlotModal"));
const ShareProfilePopup = lazy(() => import('../../User/Profiles/ProfileModals/ShareProfilePopup'));
const EditEventSection = lazy(() => import('../../components/screens/EditEvents/EditEventSection'));

const globalInitialState = {
    roomName: "",
    eventSlotEditId:0,
    EventEditId:0,
    AddSlotEventId:0,
    eventDeleteSlotId:0,
    eventDeleteId:0,
    eventDisableSlotId:0,
    eventDisableId:0,
    eventCancelSlotId:0,
    eventCancelId:0,
    eventActionType:'',
    responseEventId:'',
    timeZone:moment.tz.guess(),
    eventId: "",
    slotId: "",
    roomImage: "",
    broadcasting: false,
    slotTime: "",
    Redirect: "",
    Share:"",
    MyUpComing: [],
    report: {
        userId: "",
        eventId: "",
        report: "",
        comment: ""
    }
};
 const ProtectedRoute = ({ component: Component, ...rest }) => {
    // http://ip-api.com/json

    document.body.className = rest?.class;
    document.title=rest?.Page||"Avnik";
    const [CurrentUserDetails, setCurrentUserDetails] = useState();
    const history=useHistory();
    const [globalState, globalDispatch] = useReducer(
        GlobalReducer,
        globalInitialState
    );
        // chat initiate
        const chatInitiate=(userId)=>{
            if(Auth.getAccessToken()){
                ApiService._initiateChat({userId}).then((res)=>{
                    if(res.data.status==200){
                        localStorage.setItem('_cr',JSON.stringify({
                            "type": 0,
                            "broadcasting": 0,
                            "createdBy": res?.data?.data?.created_by?.id,
                            "roomImage": res?.data?.data?.group_image != null ?FileManagerPath + res?.data?.data?.group_image : `${FileManagerPath}${res?.chat_room?.type==1||res?.data?.data?.type==2?res?.data?.data?.broadcasting==1?'public/assets/images/broadcastAvatar.png':'public/assets/images/groupAvatar.png':'/public/assets/images/userAvatar.png'}`,
                            "isRoom": false,
                            "roomId": res?.data?.data?.id,
                            "roomName": res?.data?.data?.type == 0
                            ?res?.data?.data?.created_by?.id==CurrentUserDetails?.id
                            ?res?.data?.data?.chat_with?.id==CurrentUserDetails?.id
                            ?res?.data?.data?.created_by?.name
                            :res?.data?.data?.chat_with?.name
                            :res?.data?.data?.created_by?.name
                            :res?.data?.data?.room_name
                        }))
                        localStorage.setItem('last_active_room',res?.data?.data?.id);
                        return history.push('/messages');
                        
                    }
                    if(res.data.status=="failed"){
                    }
                }).catch((error)=>{
                    console.log(error);
                });  
            }else{
                return history.push('/login');
            }
            
        }
        //end  chat intiate
    const onChangeReport = (e, id, type) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name) {
            globalDispatch({
                type: "profileReport",
                payload: {
                    Type: "profileReport",
                    report: { ...globalState.report, [name]: value, [type]: id }
                }
            });
        }
    };
    useEffect(() => {
        getTimeFromIP();
        if (Auth.getAccessToken())
            ApiService._authUser()
                .then(res => {
                    if (res.data.status == 200) {
                        setCurrentUserDetails(res.data.data);
                    }
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        localStorage.clear();
                        sessionStorage.clear();
                    }
                    console.log(error);
                });
        if (Auth.getAccessToken()){
            getMyUpComingEvents();
        }
        return;
    }, [window.location.pathname]);

    const getTimeFromIP=()=>{
        // fetch('https://ipapi.co/json/')
        // .then(function(response) {
        //   return response.json();
        // }).then(function(myJson) {
        //     globalDispatch({
        //         type: "TIMEZONE",
        //         payload: {
        //             Type: "TIMEZONE",
        //             timeZone:myJson?.timezone?myJson?.timezone:moment.tz.guess()
        //         }
        //     });
        // });
        globalDispatch({
                type: "TIMEZONE",
                payload: {
                    Type: "TIMEZONE",
                    timeZone:moment.tz.guess()
                }
            });
    }
    const getMyUpComingEvents = () => {
        let data = {
            curretTime: moment().format("HH:mm"),
            curretDate: moment().format("DD-MM-YYYY"),
            curretDateTime: moment().format("DD-MM-YYYY HH:mm:ss"),
            tz: moment.tz.guess(),
        };
        ApiService._MyUpComingEvents(data).then((res)=>{
          console.log(res)
          if(res?.data.status==200){
            globalDispatch({
                type: "MyUpcomingEvents",
                payload: {
                    Type: "MyUpcomingEvents",
                    MyUpComing: res?.data?.data
                }
            });
          }
        }).catch((error)=>{
          console.log(error)
        })
    };

    // report profile or events handleForm
    const handleReportUserEvent = e => {
        e.preventDefault();
        // setError({ ...Error, formSubmit: true });
        const data = {
            userId: globalState.report?.userId,
            eventId: globalState.report.eventId,
            report: globalState.report.report,
            comment: globalState.report.comment
        };
        axios
            .post("/api/reports", data, {
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${Auth.getAccessToken()}`
                }
            })
            .then(res => {
                if (res.data.status == 200) {
                    globalDispatch({
                        type: "setReportUserProfile",
                        payload: {
                            Type: "setReportUserProfile",
                            report: {
                                userId: "",
                                eventId: "",
                                report: "",
                                comment: ""
                            }
                        }
                    });
                    $("#report-event-popup").modal("hide");
                    toastr["success"](res.data.message);
                    // setError({ ...Error, formSubmit: false });
                }
                if (res.data.status == "failed") {
                    toastr["error"](res.data.message);
                    // setError({ ...Error, formSubmit: false });
                }
            })
            .catch(error => {
                toastr["error"](error.response.message);
                // setError({ ...Error, formSubmit: false });
                console.log(error);
            });
    };
    console.log(globalState,'globalStatePR')
    let userDetails =
                    CurrentUserDetails ||
                    JSON.parse(localStorage.getItem("userData"));
    return (
        <GlobalContext.Provider
                        value={[
                            globalState,
                            globalDispatch,
                            handleReportUserEvent,
                            onChangeReport,
                            chatInitiate
                        ]}
                    >
                        <CurrentUser.Provider value={userDetails}>
        <Route
            {...rest}
            render={props => {
                
                return (
                    Auth.getAccessToken()?     
        <Component {...rest} />: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    
                            
                );
                //     if (!Auth.getAccessToken()) {
                //       // not logged in so redirect to login page with the return url
                //         return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                //     }
                // return ( <GlobalContext.Provider value={[globalState, globalDispatch]}>
                //         <CurrentUser.Provider value={userDetails} >
                //           <Component {...rest}  />
                //           <ReportProfilePopup/>
                //         </CurrentUser.Provider>
                //       </GlobalContext.Provider>
                //       );
            }}
        />
                            <ShareProfilePopup 
                            // title="Share Profile" 

                            />
                            <EditEventSection />
                            <AddSlotModal/>
                        </CurrentUser.Provider>
                    </GlobalContext.Provider>
    );
};
export default ProtectedRoute;
