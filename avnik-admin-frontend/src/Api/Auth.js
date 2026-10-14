import React from 'react'
import { Navigate } from 'react-router-dom'

class Auth {
  constructor() {
    var Token = localStorage.getItem('_token');
      (Token) ? this.authenticated = true : this.authenticated = false
       this.getAuthUserData = []

  }
  LogOutUser() {
    localStorage.clear()
    sessionStorage.clear()
    return <Navigate to="/login" />
  }
  RedirectToLogin() {
      return <Navigate to="/login" />  
   }
  RedirectToRegister() {
      return <Navigate to="/signup" />
  }
  getAccessToken() {

    return localStorage.getItem('_token')
  
  }
  isAuthLogIn() {
        const user = localStorage.getItem('_user')
        const token = localStorage.getItem('_token')
        if (user && token) {
            return true
        } else {
          return false
        }
       
  }
  
}

export default new Auth()
