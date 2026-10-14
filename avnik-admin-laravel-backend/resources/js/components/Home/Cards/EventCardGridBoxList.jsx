import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import EventCardBox from './EventBoxCard';
import { Link } from 'react-router-dom';
import EventCardBoxPreloader from './EventBoxPreloader/EventCardBoxPreloader';
import moment from 'moment';
import 'moment-timezone';
import GlobalLink from '../../../ApiServer/GlobalLink';
import CurrentUser from '../../UserContext/CurrentUserContext/CurrentUser';
import CurrentUserEventsContext from '../../screens/Events/Constant/CurrentUserEventContext/CurrentUserEventsContext';
import EventsShowContext from '../EventsShowContext/EventsShowContext';
import GlobalContext from '../../../Global/Context/GlobalContext';

const EventCardGridBoxList = (props) => {
  const currentUser = useContext(CurrentUser);
  const [state, dispatch, LoadMoreEvents, actionEvent, inviteEvent, shareEvent] = useContext(EventsShowContext)
   const [globalState, globalDispatch] = useContext(GlobalContext);

  const EventBoxCard = (data, index) => {

    let SeatsNumber = data?.event_time_slot?.length>0?parseInt(data?.event_time_slot[0]?.total_seats):0;
  // console.log(moment(data?.created_at).diff(moment(), 'days')<-7,'list loops of even cards')
console.log(
  moment
    .utc(data?.event_time_slot[0]?.start_date_time, 'YYYY-MM-DD HH:mm')
    .local()
    .format('YYYY-MM-DD HH:mm'),
  'list loops of even cards'
);  
  return (
      <EventCardBox
       key={data?.id} 
       rating={data?.event_create_user?.event_reviews?.average_rating || 0} 
       reviewCount={data?.event_create_user?.event_reviews?.review_count || 0} 
       action={actionEvent} 
       favorite={data?.favorite_events?.user_id == currentUser?.id ? currentUser?true:false : false} 
       remainingSeats={data?.event_time_slot?.length>0?parseInt(data?.event_time_slot[0]?.total_seats) - parseInt(data?.event_time_slot[0]?.booked_seats):0} 
       totalSeats={SeatsNumber} 
       UserProfileURL={GlobalLink.UserProfileId(data?.event_create_user.username)} 
       authUser={data?.event_create_user.id === props.currentUser?.id ? true : false} 
       userName={data?.event_create_user ? data?.event_create_user.name : 'N/A'} 
       offer={data?.event_discount ? parseInt(data?.event_discount.offer) + ' %' : null} 
       attending={data?.attending ? data?.attending : 0} 
       attendingInHours={moment().diff(moment(data?.created_at), 'hours')} 
       eventCost={data?.event_time_slot?.length>0? data?.event_time_slot[0]?.cost > 0 ? `$${data?.event_time_slot[0]?.cost}` : 'Free' :'Free'} 
       eventRating={data?.eventRating} 
      //  eventStartedAt={data?.event_time_slot?.length>0?data?.event_time_slot[0]?.start_date_time ? moment(moment(data?.event_time_slot[0]?.start_date_time, 'YYYY-MM-DD HH:mm')).format('D MMM YYYY h:m A') : 'N/A':"N/A"} 
       eventStartedAt={data?.event_time_slot?.length>0?data?.event_time_slot[0]?.start_date_time ? moment.utc(data?.event_time_slot[0]?.start_date_time, 'YYYY-MM-DD HH:mm').local().format('D MMM YYYY h:m A') : 'N/A':"N/A"} 
       id={data?.id} 
       eventSlotId={data?.event_time_slot?.length>0?data?.event_time_slot[0]?.id ?data?.event_time_slot[0]?.id:0:0} 
       eventTitle={data?.event_title} 
       eventType={data?.event_type} 
       favIcon={data?.favIcon} 
       imageUrl={JSON.parse(data?.event_files)} 
       eventToken={data?.remember_token}
       eventCreateAt={moment(data?.created_at).diff(moment(), 'days')<-7?false:true}
        />
    );
  }
  return (
    <CurrentUserEventsContext.Provider value={state?.Events}>
      <DivCard className="e-c-list bdr-none" >
        <DivCard className="cmn-heading">
          <h1>{props.Title}</h1>
        </DivCard>
        <div className="event-row" >
        {state?.Preloader ? <EventCardBoxPreloader /> : state?.Events.map(EventBoxCard)}
        </div>
        <DivCard className="show-more-card">
          {state?.nextPage != null ?
            <Link onClick={LoadMoreEvents} className="more-show-btn" to="#">
              <i className="av av-double-down-arrow-icon"></i>
            </Link> : ''}
        </DivCard>
      </DivCard>
    </CurrentUserEventsContext.Provider>

  );
}
export const DivCard = styled.div`
  
`;

export default EventCardGridBoxList;