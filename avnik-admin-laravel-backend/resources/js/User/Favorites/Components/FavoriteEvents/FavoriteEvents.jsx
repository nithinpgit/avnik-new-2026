import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import {FileManagerPath, assetUrl} from '../../../../ApiServer/UrlService';
import UserFavoriteContext from '../../Context/UserFavoriteContext/UserFavoriteContext';
import moment from 'moment';
import GlobalContext from '../../../../Global/Context/GlobalContext';
const FavoriteEvents = (props) => {
const userFavoriteContext = useContext(UserFavoriteContext);
const [globalState, globalDispatch] = useContext(GlobalContext);
    return (
        <>
            <div className="c-table-row">
                <div className="cell favorite-icon-editable" data-title={props.eventTitle}>
                    <div className="favorite-icon-btn">
                        <a href={void (0)} onClick={()=>props.action({eventId:props.eventId})} className="favme av av-favorite-solid-icon active" style={{color:'rgb(242, 50, 52)'}}></a>
                    </div>
                </div>
                
                    <div className="cell event-details-editable" data-title={props.eventTitle}>
                    <div className="message-user-bx">
                    <Link to={`/event?token=${props.rememberToken}&event=${props.eventId}`}>
                            <figure className="cmn-profile-pic event-img">
                                {props.eventFiles.map((res,index)=>
                                   res.type=="jpeg"||"png"||"gif"||"jpg"||"svg"?<img key={res.id} src={assetUrl(res.file_url)} alt="" />:''
                                )}
                            </figure>
                            <span>{props.eventTitle}</span>
                        </Link>
                    </div>
                </div>
                <div   className="cell fav-date-time-editable" data-title="Duration">
                    <div className="c-table-text">{moment.utc(props.eventCreatedAt,'YYYY-MM-DD HH:mm:ss').tz(globalState?.timeZone).format('D MMM YYYY h:mm A')} </div>
                </div>

            </div>
        </>
    );
}

export default FavoriteEvents;
