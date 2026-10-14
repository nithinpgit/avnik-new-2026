import Auth from "../Routes/Auth"

export {
    authHeader, 
}
function authHeader(){
  return   {
        headers:{'Accept':'application/json',
                    authorization:`Bearer ${Auth.getAccessToken()}`
                 }
    }
}