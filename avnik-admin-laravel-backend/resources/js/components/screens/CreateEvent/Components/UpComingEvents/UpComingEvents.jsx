
import React, {useContext ,Component } from 'react';
import { Link } from 'react-router-dom';
import { FileManagerPath } from '../../../../../ApiServer/UrlService';
import moment from 'moment';
import GlobalLink from '../../../../../ApiServer/GlobalLink';
import GlobalContext from '../../../../../Global/Context/GlobalContext';

const UpComingEvents =({events})=> {
const [globalState,globalDispatch]=useContext(GlobalContext)
        return (
            <>
                
                <div  className="message-list inbox-events-list">
                    <div  className="u-p-files-list">
                        <div className="custom-table">
                       {events?.length>0?events.map((res,i)=><div key={`e${i}`} className="c-table-row">
                                <div className="cell fav-event-details-editable" data-title="Event Details">
                                    <div className="message-user-bx">
                                        <Link to={`event?token=${res?.events?.remember_token}&event=${res?.event_fk_id}&slotId=${res?.event_slot_id}`}>
                                            <figure className="cmn-profile-pic"> <img src={GlobalLink.FileManagerPathURL(JSON.parse(res?.events?.event_files)[0].file_url)}  alt={res?.events?.event_title} /> </figure>
                                            <span>{res?.events?.event_title}</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="cell fav-location-editable" data-title="Event Date">
                                    <div className="c-table-textt">{moment.utc(res?.start_date_time,'YYYY-MM-DD HH:mm').local().format('DD MMM YYYY h:m A')}</div>
                                </div>
                            </div>):<span>No upcoming scheduled event</span>}
                        </div>
                    </div>
                </div>
                
            </>
        );    
}

export default UpComingEvents;
