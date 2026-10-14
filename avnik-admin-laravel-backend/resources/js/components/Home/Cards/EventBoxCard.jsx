import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import AllEventsDetails from '../../../ApiServer/AllEventsDetails';
import GlobalLink from '../../../ApiServer/GlobalLink';
import DefaultStars from '../../../User/Reviews/Components/DefaultStars/DefaultStars';
import EditEvent from '../Constant/Edit/EditEvent';
import FavoriteIcons from '../Constant/Favorite/FavoriteIcons';
const  EventCardBox=(props)=>{
 return(
    <>
                <div className="event-col">
                    <div className="event-detail-bx">
                        <div className="new-off">
                            <ul>
                            {props.eventCreateAt?<li><span className="new-label">New</span></li>:''}
                               {props.offer?<li className="new-label off-label">{`${props.offer} Off`} </li>:''}
                            </ul>
                        </div> 
                        {props.authUser?<EditEvent slotLength={props?.event_time_slot?.length} action={props.action} token={props.eventToken} id={props?.id} eventSlotId={props?.eventSlotId} />:<FavoriteIcons favorite={props.favorite} eventId={props?.id} />}
                        <div className="event-img"><img src={GlobalLink.FileManagerPathURL(props.imageUrl[0].file_url)} alt={props.eventTitle} /> </div>
                        <div className="event-s-info">
                            <div className="event-title">
                                <NavLink to={`/event?token=${props.eventToken}&event=${props?.id}`} >{props.eventTitle}</NavLink>
                            </div>
                            <div className="user-name e-icn-bx"><span className="user"><i className="av av-user-icon pos-iocn" aria-hidden="true"></i><NavLink to={props.UserProfileURL}>{props.userName} </NavLink></span>
                            <span className="rating"> <DefaultStars value={parseFloat(props.rating)|| 0}/></span>
                            <p className='rated-usr-no'>{parseInt(props?.reviewCount)}</p>
                            </div>                            
                            <div className="dt-2 e-icn-bx"> <span><i className="av av-event-attended-icon pos-iocn" aria-hidden="true"></i>{props.totalSeats>0?`${props.remainingSeats?props.remainingSeats:0}/${props.totalSeats?props.totalSeats:0} Seats Left`:'N/A'} </span> </div>
                            <div className="dt-3 e-icn-bx"> <span className="price"><i className="av av-event-doller-icon pos-iocn" aria-hidden="true"></i>{props.eventCost}</span><span className="date"><i className="av av-event-time-icon" aria-hidden="true"></i>{props.eventStartedAt}</span> </div>
                        </div>
                    </div>
                </div>  
    </>
 );
}

export default EventCardBox;