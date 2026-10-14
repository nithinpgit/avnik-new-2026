import axios from 'axios';
import UrlService from './UrlService';

class AuthService {

  async doUserLogin(props){
    try {
      const response = await axios.post(UrlService.loginUrl(), props);
      return response.data;
    } catch (error) {
      return false;
    }
  }
  async doUserRegister(props){
    try {
      const response = await axios.post(UrlService.registerUrl(), props);
      return response.data;
    } catch (error) {
      return false; 
    }
  }

  async forgotPassword(props){
    try{
      const response= await axios.post(UrlService.forgotPasswordUrl(),props);
      return response;
    }catch(error){
      return false;
    }

  }

  async resetPassword(props){
    
    try{
    
      const response= await axios.post(UrlService.resetPasswordUrl(),props);
      return response;
    
    }catch(error){
    
      return false;
    
    }

  }

}

export default new AuthService();