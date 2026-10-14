import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {FileManagerPath} from '../../../../ApiServer/UrlService';
import Auth from '../../../../Routes/Auth';
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser';

const ProfileCard=()=>{
    const currentUser = useContext(CurrentUser);
    return(

        <>
        <div className="r-m-t-bx my-account-menu">
            <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                    <figure className="avatar-pic" title={currentUser?.name} ><img src={currentUser?.user_profile?.profile_picture?`${FileManagerPath+'/'+currentUser?.user_profile?.profile_picture}`:currentUser?.user_profile?.social_profile_picture_url?currentUser?.user_profile?.social_profile_picture_url:`${FileManagerPath}/public/assets/images/avatar.png`}  alt={currentUser?.Name} /></figure>
                </button>
                <div className="dropdown-menu dropdown-menu-lg-right ">
                    {Auth.getAccessToken()?<ul>
                        <li>
                            
                            <Link to={`/profile/${currentUser?.username}`} className={`dropdown-item dd-img-name ${currentUser?.user_profile?'':'notify-dot'}`}>
                        <figure className="avatar-pic" title={currentUser?.name} ><img src={currentUser?.user_profile?.profile_picture?`${FileManagerPath+'/'+currentUser?.user_profile?.profile_picture}`:currentUser?.user_profile?.social_profile_picture_url?currentUser?.user_profile?.social_profile_picture_url:`${FileManagerPath}/public/assets/images/avatar.png`}  alt={currentUser?.Name} /></figure>
                             <span>{currentUser?.name}</span>   
                            </Link>
                        </li>
                        <li><Link to="/my-events" className="dropdown-item"><i className="av av-dashboard-icon"></i>My Events</Link></li>
                        <li><Link to="/support" className="dropdown-item"><i className="av av-report-icon"></i>Help & Support</Link></li>
                        <li><Link to="/logout" className="dropdown-item"><i className="av av-logout-icon"></i>Logout</Link></li>
                    </ul>:''}
                </div>
            </div>
        </div>
        </>
        
    );
}
export default ProfileCard;