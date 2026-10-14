import { Redirect } from "react-router";
import React from 'react';
const Authorization ={
    UnAuthorizedUser,
    _errorResponse,
}

const UnAuthorizedUser=()=><Redirect to="/login"/>;
function _errorResponse(error){
    if(error.response.status==401){
        localStorage.clear();
        sessionStorage.clear();
        UnAuthorizedUser();
    }
}

export default Authorization;
