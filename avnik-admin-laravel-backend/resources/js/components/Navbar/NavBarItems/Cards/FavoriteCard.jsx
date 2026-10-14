import React, {useState, useContext ,useEffect} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import {FileManagerPath, assetUrl} from '../../../../ApiServer/UrlService';
import { ApiService } from '../../../../ApiServer/ApiService';
import GlobalContext from '../../../../Global/Context/GlobalContext';

const FavoriteCard=()=>{
    const [notification, setNotification] = useState([]);
    const [globalState, globalDispatch] =useContext(GlobalContext);
    useEffect(() => {
        fetchData();
        return () => {
            
        };
    }, [])
    const fetchData=()=>{
        let data = {
            searchQuery:'',
            filterBy: 'All',
        }
        ApiService._fetchFavorites(data).then((res) => {
            if (res.data.status == 200) {
                const filtered = res?.data?.data?.data.filter(function(item,i) {
                    if (i< 10) {
                        // setNotification(item)
                        return true;
                    }
                    return false;
                  })
                  setNotification(filtered);
            }
        }).catch((error) => {

        })
    }
    const photoURL=(array)=>{
        {array.map((res,index)=>
           res.type=="jpeg"||"png"||"gif"||"jpg"||"svg"?assetUrl(res.file_url):''
         )}
        //  return true;
    }
    return (

        <div className="r-m-t-bx noti-message-menu favorite-menu">
        <div className="btn-group">
            <button type="button" className="btn dropdown-toggle notify-dot" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"><i className="av av-favorite-line-icon"></i> </button>
            <div className="dropdown-menu dropdown-menu-lg-right">
                <ul>
                {notification?.length>0?notification?.map((res)=><li key={res?.id}>
                            <a href={res?.my_favorite_users?.user_profile?`/profile/${res?.my_favorite_users?.username}`:`/event?token=${res.my_favorite_events?.remember_token}&event=${res.my_favorite_events?.id}`} className="dropdown-item" >
                                {res?.my_favorite_users?.user_profile?<figure className="n-m-pic"><img src={res?.my_favorite_users?.user_profile?.profile_picture ? FileManagerPath + res?.my_favorite_users?.user_profile?.profile_picture : `${FileManagerPath}/public/assets/images/avatar.png`} alt="" /></figure>:<figure className="n-m-pic"><img src={photoURL(res.my_favorite_events?.event_files ? JSON.parse(res.my_favorite_events?.event_files) : [])} alt="" /></figure>}
                                <div className="rit-m-bx">
                                    <strong dangerouslySetInnerHTML={{__html: res?.my_favorite_users?.user_profile?res?.my_favorite_users?.name:res.my_favorite_events?.event_title}}></strong>
                                    <span>{moment.utc(res?.created_at).tz(globalState?.timeZone).format('DD MMM YYYY hh:mm A')}</span>
                                </div>
                            </a>
                        </li>):<li >
                            <a href={void(0)} className="dropdown-item">
                                {/* <figure className="n-m-pic"><img src={res?.data?.image?FileManagerPath+res?.data?.image:FileManagerPath+'public/assets/images/bell.png'} alt="" /></figure> */}
                                <div className="rit-m-bx">
                                    <strong >Favorites 0</strong>
                                    {/* <p dangerouslySetInnerHTML={{__html: res?.data?.description}}></p> */}
                                    {/* <span>{moment(res?.created_at).local().format('DD MMM YYYY hh:mm A')}</span> */}
                                </div>
                            </a>
                        </li>}
                </ul>
                <div className="see-all-link"><Link to="/favorites" >See All</Link></div>
            </div>
        </div>
    </div>
    );
}
export default FavoriteCard;