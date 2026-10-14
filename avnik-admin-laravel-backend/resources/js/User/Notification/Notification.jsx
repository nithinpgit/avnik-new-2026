import React, { useEffect,useContext, useReducer } from 'react';
import { ApiService } from '../../ApiServer/ApiService';
import Reducer from '../../utility/Reducer';
import moment from 'moment';
import { FileManagerPath } from '../../ApiServer/UrlService';
import { UserNotificationSkeleton } from '../../components/SkeletonLoading/SkeletonLoading';
import GlobalContext from '../../Global/Context/GlobalContext';
const initialState={
Notifications:[],
preloader:false
}
const Notification  =(props)=> {
    const [state,dispatch] =useReducer(Reducer,initialState);
    const [globalState, globalDispatch]=useContext(GlobalContext);
    useEffect(() => {
        let abort=true;
        if(abort){
            getNotifications();
        }
        return () => {
            abort=false;            
        };
    }, [])
const getNotifications=()=>{
    dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",preloader:true}});

    ApiService._getNotifications().then((res)=>{
        console.log(res,'_getNotifications');
        dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",preloader:false}});

        if(res.data.status==200){
            dispatch({type:"NewNotifications",payload:{Type:"NewNotifications",Notifications:res?.data?.data?.data}});
        }else{

        }
        
    }).catch((error)=>{
        dispatch({type:"PRELOADER",payload:{Type:"PRELOADER",preloader:false}});
        console.log(error);
    })
}
const readNotifications=(id)=>{
    ApiService._readNotifications({id}).then((res)=>{
      if(res?.data?.status==200){
        getNotifications();
      }
    }).catch((error)=>{
        console.log(error,'read notifications page');
    })
    }
        return (
            <>
                <div className="ah-tab-content" data-ah-tab-active={props.Active}>
                                <div className="notification-content-sec">
                                    <div className="notificaton-list-bx">
                                        <div className="noti-heading">
                                            <div className="cmn-rit-top-heading-sec message-top-bx">
                                                <div className="inbox-message-number">Notifications 
                                                {/* (<span>3</span> new)  */}
                                                </div>
                                                <div className="inbox-rit-search">
                                                    <button type="button" className="btn"> <i className="av av-setting-2-2-icon"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="message-list inbox-noti-list">
                                            <div className="u-p-files-list">
                                                <div className="custom-table">

                                                   {state?.preloader?<UserNotificationSkeleton count={10} />:state?.Notifications.length>0?state?.Notifications.map((res)=><div key={res?.id} onClick={res?.read_at?'':()=>readNotifications(res?.id)} className={`c-table-row ${res?.read_at?'':'unread-notification'}`}>
                                                        <div className="cell noti-user-editable" data-title="Notification User">
                                                            <div className="message-user-bx">
                                                                <a href="#">
                                                                    <figure className="cmn-profile-pic">
                                                                        <img src={res?.data?.image?FileManagerPath+res?.data?.image:FileManagerPath+'public/assets/images/bell.png'} alt={res?.data?.title}/>
                                                                    </figure>
                                                                    <span dangerouslySetInnerHTML={{__html: res?.data?.title}}></span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="cell noti-message-editable" data-title="Notification Message">
                                                            <div className="message-short-text" dangerouslySetInnerHTML={{__html: res?.data?.description}}></div>
                                                        </div>
                                                        <div className="cell notification-time-editable" data-title="Notification Time">
                                                            <div className="c-table-text">{moment(res?.created_at).tz(globalState?.timeZone).format('DD MMM YYYY hh:mm A')}</div>
                                                        </div>
                                                    </div>):<div className="text-center mt-5">You have 0 notifications.</div>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
            </>
        );
    
}

export default Notification;
