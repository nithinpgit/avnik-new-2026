import React from 'react';
import axios from 'axios';
import UrlService from './UrlService';
import { Redirect } from 'react-router-dom';
import Auth from '../Routes/Auth';

class AllEventsDetails{
  
  async GetAllEventsDetails(props){
    try{
      const response= await axios.post(UrlService.allEventsUrl(props.Page),props,
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

export default new AllEventsDetails();