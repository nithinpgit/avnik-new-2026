import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import moment  from 'moment';
import { ApiService } from '../../../../ApiServer/ApiService';
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser';
import GlobalContext from '../../../../Global/Context/GlobalContext';
const NotificationCard=()=>{
 const [notification, setNotification] = useState([]);
 const [notificationBellClick, setNotificationBellClick] = useState(0);
 const currentUser=useContext(CurrentUser);
 const [globalState , globalDispatch] = useContext(GlobalContext);
 
useEffect(() => {
    let abort=true;
    if(abort){
        getUnreadNotifications()
    }
    return () => {
        abort=false;
    };
}, [])

const BellIconClick=()=>{
    if(notification?.length>0){
        readNotifications("All");   
    }
    setNotificationBellClick(0)
}
const getUnreadNotifications=()=>{
ApiService._getUnreadNotifications().then((res)=>{
  if(res?.data?.status==200){
    setNotification(res.data.data.data);
    setNotificationBellClick(res.data.data.data?.length);
  }
}).catch((error)=>{
    console.log(error,'unread notifications');
})
}

const readNotifications=(id)=>{
    ApiService._readNotifications({id}).then((res)=>{
      if(res?.data?.status==200){
        // getUnreadNotifications();
      }
    }).catch((error)=>{
        console.log(error,'read notifications');
    })
    }
    return(
        <div className="r-m-t-bx noti-message-menu">
            <div className="btn-group">
                <button type="button" onClick={BellIconClick} className={`btn dropdown-toggle ${notificationBellClick>0?"notify-dot":""}`} data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"><i className="av av-notification-icon"></i> </button>
                <div className="dropdown-menu dropdown-menu-lg-right">
                    <ul>
                        {notification?.length>0?notification?.map((res)=><li key={res?.id}>
                            <a href={res?.data?.actionURL} className="dropdown-item" onClick={res?.read_at?'':()=>readNotifications(res?.id)} >
                                <figure className="n-m-pic"><img src={res?.data?.image?FileManagerPath+res?.data?.image:FileManagerPath+'public/assets/images/bell.png'} alt="" /></figure>
                                <div className="rit-m-bx">
                                    <strong dangerouslySetInnerHTML={{__html: res?.data?.title}}></strong>
                                    <p dangerouslySetInnerHTML={{__html: res?.data?.description}}></p>
                                    <span>{moment.utc(res?.created_at).local().format('DD MMM YYYY hh:mm A')}</span>
                                </div>
                            </a>
                        </li>):<li >
                            <a href={void(0)} className="dropdown-item">
                                {/* <figure className="n-m-pic"><img src={res?.data?.image?FileManagerPath+res?.data?.image:FileManagerPath+'public/assets/images/bell.png'} alt="" /></figure> */}
                                <div className="rit-m-bx">
                                    <strong >Unread Notifications 0</strong>
                                    {/* <p dangerouslySetInnerHTML={{__html: res?.data?.description}}></p> */}
                                    {/* <span>{moment(res?.created_at).local().format('DD MMM YYYY hh:mm A')}</span> */}
                                </div>
                            </a>
                        </li>}
                    </ul>
                    <div className="see-all-link"><Link to="/notifications">See All</Link></div>
                </div>
            </div>
        </div>
    );
}
export default NotificationCard;