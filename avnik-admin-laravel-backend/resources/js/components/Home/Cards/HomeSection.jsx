import React, { useContext, useEffect, useReducer, useState } from 'react';
import moment from 'moment';
import 'moment-timezone';
import ReactDOM from 'react-dom';
import EventCardGridBoxList from './EventCardGridBoxList';
import TopFilter from '../../Filter/TopFilter';
import styled from 'styled-components';
import Auth from '../../../Routes/Auth';
import EventsShowContext from '../EventsShowContext/EventsShowContext'
import AllEventsDetails from '../../../ApiServer/AllEventsDetails';
import EventHandlingServices from '../../../ApiServer/EventHandling/EventHandlingServices'
import reducer from './HomeReducer/HomeReducer';
import { UserPaymentInitialState } from '../../../User/Payments/Reducer/UserPaymentReducer';
import { ApiService } from '../../../ApiServer/ApiService';
import GlobalContext from '../../../Global/Context/GlobalContext';
import GlobalReducer from '../../../Global/Reducer/GlobalReducer';

const initialState={
  currentPage:1,
  nextPage:'',
  previewsPage:'',
  parentCategories:[],
  childCategories:[],
  Events:[],
  Preloader:true,
  Favorite:null,
  searchQuery:'',
  cost:0,
  eventType:'',
  categories:'',
  subCategories:'',
}
const HomeSection =(props)=>{

const [state, dispatch] = useReducer(reducer, initialState);
const [globalState, globalDispatch] = useContext(GlobalContext);
  useEffect(() => {
        fetchEventData();
        getCategories();
          return;
    },[props.Title,state?.Favorite]);

  useEffect(()=>{
    if(state?.searchQuery==""||state?.searchQuery==undefined){
      setTimeout(()=>{
          fetchEventData();
         },200)
  }
  },[state?.searchQuery]);
  useEffect(() => {
    if(globalState?.responseEventId>0){
        // let eventsRes=state?.ProfileEvents.filter(event => event.id != globalState?.responseEventId,
       dispatch({type:'SET_EVENTS_RESPONSE',payload:{Type:"SET_EVENTS_RESPONSE",Events:state?.Events.filter(event => event.id != globalState?.responseEventId)}})
      //  fetchEventData()
    }
  }, [globalState?.responseEventId])

    async function fetchEventData(){
      const  AllEvents={
        Page:'',
        tz:moment.tz.guess(),
        eventType:props.Title,
        queryData:{
          searchQuery:state?.searchQuery,
          cost:state?.cost,
          eventType:state?.eventType,
          categories:state?.categories,
          subCategories:state?.subCategories,
        },

      }
      const res =await AllEventsDetails.GetAllEventsDetails(AllEvents);
      if(res.data.status==200){
        const event=res.data.EventData.data?.filter(event => event?.event_time_slot?.length>0);
        dispatch({type:'SET_EVENTS_RESPONSE',payload:{Events:event}})
        dispatch({type:'PRELOADER',payload:{Preloader:false}})
        dispatch({type:'PAGINATION',payload:{currentPage:res.data.EventData.current_page,previewsPage:res.data.EventData.prev_page_url,nextPage:res.data.EventData.next_page_url}})
      }
    } 
    async function LoadMoreEvents (event){    
           
      dispatch({type:'PRELOADER',payload:{Preloader:true}})
      if(state?.nextPage!=null){
        const  AllEvents={
          Page:state?.nextPage?`page=${state?.currentPage+1}`:state?.currentPage,
          eventType:props.Title,
          tz:moment.tz.guess(),
        }
        const res =await AllEventsDetails.GetAllEventsDetails(AllEvents);
   
        if(res.data.status==200){
          dispatch({type:'SET_EVENTS_RESPONSE',payload:{Events:[...state?.Events,...res.data.EventData.data]}})
          dispatch({type:'PRELOADER',payload:{Preloader:false}})
          dispatch({type:'PAGINATION',payload:{currentPage:res.data.EventData.current_page,previewsPage:res.data.EventData.prev_page_url,nextPage:res.data.EventData.next_page_url}})
        }else{
          dispatch({type:'PRELOADER',payload:{Preloader:false}})
        }
      }else{
         dispatch({type:'PRELOADER',payload:{Preloader:false}})

        alert('No More Events Found');
      }
          
  }
  const getCategories = () => {
    ApiService.parentCategories()
        .then(res => {
            if (res.data.status === 200) {
                dispatch({
                    type: "getCategories",
                    payload: {
                        Type: "getCategories",
                        parentCategories: res.data.data
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

  const actionEvent =async (eventId,type)=>{
    const data={
      eventId:eventId,
      eventAction:type,
    }
    const response=await EventHandlingServices.PostEventHandlingServices(data); 
     
      if(response.data.status==200){
        const event=state?.Events.filter(event => event.id != eventId);
        dispatch({type:'SET_EVENTS_RESPONSE',payload:{Events:event}})
        return toastr["success"](response.data.messages);
      
      }else if(response.data.status=='failed'){
        
         return toastr["error"](response.data.messages);
      
      }
    }
    const ResetFilter = (e) => {
      dispatch({type:"RESET",payload:{Type:"RESET",
      searchQuery:'',
      cost:0,
      eventType:'',
      categories:'',
      subCategories:''}})
      // setTimeout(()=>{
      //   fetchEventData();
      // },2000)
      return toastr["error"]("Reset");
  };
  const inviteEvent=(eventId)=>{
    return alert(eventId);
  }
  const shareEvent=(event)=>{
    return alert(event);
  }
  // $('.modal').modal('hide');
const eventsData=[state,dispatch,fetchEventData,ResetFilter,LoadMoreEvents,actionEvent,inviteEvent,shareEvent]
    return(
      <EventsShowContext.Provider value={eventsData}>
        <Section className="mid-content-sec" >
            <TopFilter topSearchHandel={props.topSearchHandel} topFilterHandel={props.topFilterHandel}></TopFilter>
              <Card className="event-card-list">
                  <Card className="container">
                    {props.Title.map((res,index)=>{
                      return index==0?<EventCardGridBoxList currentUser={props.currentUser}  key={index} Title={res} />:""
                    })}                
                  </Card> 
              </Card>
        </Section>
      </EventsShowContext.Provider>
    );
   
}

export const Section = styled.section`
  
`;
export const Card = styled.div`
  
`;

export default HomeSection;