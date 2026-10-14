import React from 'react';
import axios from 'axios';
import UrlService from '../UrlService';
import Auth from '../../Routes/Auth'
class CreateEventService{

  async PostCreateEventService(props){
    try{
      const response= await axios.post(UrlService.createEventUrl(),props,
        
        {headers:{
          
           'Accept':'application/json',
            authorization:`Bearer ${Auth.getAccessToken()}`,
        }}
      );
      return response;
    }catch(error){
      return false;
    }
  }
  async eventCurrentStepDataService(props){
    
   try{
      const response= await axios.post(UrlService.eventCurrentStepsUrl(),props,
        {headers:{
           'Accept':'application/json',
            authorization:`Bearer ${Auth.getAccessToken()}`,
        }}
      );
      return response;
    }catch(error){
      return false;
    }
  }
}

export default new CreateEventService();