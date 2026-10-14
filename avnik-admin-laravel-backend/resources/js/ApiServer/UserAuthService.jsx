import axios from 'axios';
import Auth from '../Routes/Auth';
import UrlService from './UrlService';

class UserAuthService {

  async GetUserDetails(){
    try{
      const response= await axios.get(UrlService.authUserDetailsUrl(),
        {
          headers:{'Accept':'application/json',
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
          },
        }
      );
    
    return response;
    
    }catch(error){
      if(error.response.status===401){
        localStorage.clear();
        
      }
      console.log(error);
      return false;
    
    }
  }
}

export default new UserAuthService();