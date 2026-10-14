import React from 'react';
import axios from 'axios';
import UrlService from '../UrlService';
import Auth from '../../Routes/Auth';
class EventHandlingServices {
    
    async PostEventHandlingServices(props){
        try{
          const response= await axios.post(UrlService.eventHandlingUrls(),props,
            
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

export default new EventHandlingServices();
