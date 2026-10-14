import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../ApiServer/AuthService';
import UserAuthService from '../ApiServer/UserAuthService';
class Auth {
  constructor() {
    const Token = localStorage.getItem('accessToken');
      (Token) ? this.authenticated = true : this.authenticated = false;
       this.getAuthUserData=[];

  }

  async login(props, cb) {
    const user = await AuthService.doUserLogin(props);

    if (!user) {

        cb(false);
      
      return false;

    }
     localStorage.setItem('accessToken', user.access_token);
      this.authenticated = true;    
      cb(true);

  }

  logout(cb) {
      localStorage.clear();
      sessionStorage.clear();
      this.authenticated = false;
      cb();

  }

  isAuthenticated() {
    
    return this.authenticated;
  
  }

 

  RedirectToLogin(){

      return <Redirect to="/login" />
      
   }

  RedirectToRegister(){

      return <Redirect to="/register" />

  }
 
 async  authUser() {

        const AuthUserData = {
            Token: this.getAccessToken(),
        }
        
        const response = await UserAuthService.GetUserDetails(AuthUserData);
        if(response){
              this.authenticated=true;
              
        }else{
          this.authenticated=true;
        }
        
        return response;

      }

  getAccessToken() {

    return localStorage.getItem('accessToken');
  
  }
  

}

export default new Auth();
