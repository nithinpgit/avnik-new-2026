import React, { Component, useContext } from 'react';
import GlobalLink from '../../../ApiServer/GlobalLink';
import UserProfileContext from '../UserProfileContext/UserProfileContext';
import moment from 'moment';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import EventCardBox from '../../../components/Home/Cards/EventBoxCard';
import EventHandlingServices from '../../../ApiServer/EventHandling/EventHandlingServices';
import $ from 'jquery';
import GlobalContext from '../../../Global/Context/GlobalContext';
const  MyEvent =(props)=> {
  const [state, dispatch] = useContext(UserProfileContext);
  const [globalState,globalDispatch]=useContext(GlobalContext);
  const currentUser = useContext(CurrentUser);
const actionEvent =async (eventId,type)=>{

  if(type=="delete"||"disable"){
    $("#DeletedEventModal").modal('show');
  }
    const data={
      eventId:eventId,
      eventAction:type,
    }

  // const response=await EventHandlingServices.PostEventHandlingServices(data); 
     
  //     if(response.data.status==200){
  //       const event=state.ProfileEvents.filter(event => event.id != eventId);
  //         dispatch({type:"ProfileEvents",payload:{Type:"ProfileEvents",ProfileEvents:event}}); 
  //       return toastr["success"](response.data.messages);
      
  //     }else if(response.data.status=='failed'){
        
  //        return toastr["error"](response.data.messages);

  //     }
    }      
return (
            <>
                <div className="ah-tab-content" data-ah-tab-active={props.active}>
                    <div className="my-events">
                        <div className="e-c-list border-bottom-none">
                        <div className="event-row" >
                          {state.ProfileEvents?.length>0?state.ProfileEvents.map((data,index)=>                  
                            <EventCardBox 
                            key={data?.id} 
                            action={actionEvent}
                            rating={data?.event_create_user.event_reviews?.average_rating || 0} 
                            reviewCount={data?.event_create_user?.event_reviews?.average_count || 0} 
                            favorite={data?.favorite_events?.user_id==currentUser?.id?currentUser?true:false:false} 
                            // remainingSeats={data?.event_time_slot?.length>0?parseInt(data?.event_time_slot[0]?.booked_seats):0} 
                            remainingSeats={data?.event_time_slot?.length>0?parseInt(data?.event_time_slot[0]?.total_seats) - parseInt(data?.event_time_slot[0]?.booked_seats):0} 
                            totalSeats={data?.event_time_slot?.length>0?parseInt(data?.event_time_slot[0]?.total_seats) - parseInt(data?.event_time_slot[0]?.booked_seats):0} 
                            UserProfileURL={data.event_create_user.username} 
                            authUser={data.event_create_user?.id===currentUser?.id?true:false} 
                            userName={data.event_create_user?data.event_create_user?.name:'N/A'} 
                            offer={data.event_discount?parseFloat(data.event_discount.offer)+'%':null} 
                            attending={data.attending?data.attending:0} 
                            attendingInHours={moment().diff(moment(data.created_at),'hours')} 
                            eventCost={data?.event_time_slot?.length>0? data?.event_time_slot[0]?.cost > 0 ? `$${data?.event_time_slot[0]?.cost}` : 'Free' :'N/A'} 
                            eventRating={data.eventRating} 
                            // eventStartedAt= {data?.event_time_slot?.length>0?data.event_time_slot[0]?.start_date?moment(moment(data.event_time_slot[0]?.start_date,'YYYY-MM-DD')).format('D MMM YYYY'):'N/A':"N/A"} 
                            eventStartedAt={data?.event_time_slot?.length>0?data?.event_time_slot[0]?.start_date_time ? moment.utc(data?.event_time_slot[0]?.start_date_time, 'YYYY-MM-DD HH:mm').local().format('D MMM YYYY h:m A') : 'N/A':"N/A"} 

                            eventTitle={data.event_title} 
                            eventType={data.event_type} 
                            favIcon={data.favIcon} 
                            id={data.id} 
                            eventSlotId={data?.event_time_slot?.length>0?data?.event_time_slot[0]?.id ?data?.event_time_slot[0]?.id:0:0} 
                            imageUrl={JSON.parse(data.event_files)} 
                            eventToken={data.remember_token}
                            eventCreateAt={moment(data?.created_at).diff(moment(), 'days')<-7?false:true}

                            />
                            ):<div>No events here</div>}  
                              <div className="show-more-card"> <a className="more-show-btn" href="#"><i className="av av-double-down-arrow-icon"></i></a> </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
export default MyEvent;
