import axios from 'axios';
import Auth from '../../Routes/Auth';
import UrlService from '../UrlService';

class ProfileService {

  async GetProfileURL(props){
    try{
      const response= await axios.post(UrlService.ProfileDetailsById(),props,
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

export default new ProfileService();