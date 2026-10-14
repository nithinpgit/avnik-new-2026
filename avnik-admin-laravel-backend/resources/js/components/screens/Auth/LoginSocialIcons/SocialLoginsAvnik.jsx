import React, { Component,useContext,useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import SocialLoginContext from './SocialLoginContext/SocialLoginContext';
import TwitterLoginAvnik from './TwitterLoginAvnik';
import FacebookLoginAvnik from './FacebookLoginAvnik';
import GoogleLoginAvnik from './GoogleLoginAvnik';
import Axios from 'axios';
import Auth from '../../../../Routes/Auth';
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser';


const SocialLoginsAvnik =()=> {
    
    const  currentUser = useContext(CurrentUser);
    const [state, setState] = useState({
        isLogIn:false,
        redirect:false,
    })

    const SocialHandel= (postData)=>{

        if(currentUser){

            Axios.put(`/api/socialLinked/${currentUser?.id}`,postData,{
                headers:{'Accept':'application/json',
                            authorization:`Bearer ${Auth.getAccessToken()}`
                        }
            ,}).then( (res)=>{
                if(res.data.status==200){
                    toastr['success'](res.data.message);    
                    
                }

                if(res.data.status=="failed"){
                    toastr['error'](res.data.message);

                }
                    console.log(res);
                }).catch((error)=>{
                    toastr['error'](error.message);
                    console.log(error)
                })
           }else{
                Axios.post('/api/socialLinked',postData).then((res)=>{

                if(res.data.status==200){
                    localStorage.setItem('accessToken',res.data.accessToken)
                    localStorage.setItem('userData',JSON.stringify(res.data.data))
                    toastr['success'](res.data.message);    
                    setState({
                        ...state,isLogIn:true,redirect:true,
                    })
                }

                if(res.data.status=="failed"){
                    toastr['error'](res.data.message);

                }
                    console.log(res);
                }).catch((error)=>{
                    toastr['error'](error.message);
                    console.log(error)
                })
           }
    }
    
        //   facebook google login
      const signUp=(res, type)=> {
          console.log(res,'social')
            let postData;
            if (type === 'facebook' && res.email) {
            postData = {
                 name: res.name,
                 provider: type,
                 email: res.email,
                 provider_id: res.id,
                 token: res.accessToken,
                 provider_pic: res.picture.data.url
            };

           }
           if (type ==='google' && res.profileObj.email) {
                postData = {
                    name: res.profileObj.name,
                    provider: type,
                    email: res.profileObj.email,
                    provider_id: res.profileObj.googleId,
                    token: res.tokenObj.access_token,
                    provider_pic: res.profileObj.imageUrl
                };
            }
            if(type==='twitter'){
                postData = {
                    name: res.w3.ig,
                    provider: type,
                    email: res.w3.U3,
                    provider_id: res.El,
                    token: res.Zi.access_token,
                    provider_pic: res.w3.Paa
                };

            }
           if (postData) {
                SocialHandel(postData);                    
            } else {

            }
       }
       

       
    

        
        if (state.isLogIn||state.redirect) {
           
            return <Redirect to="/home" />
        }

        const responseFacebook = (response) => {
            signUp(response, 'facebook');
        }
        const responseGoogle = (response) => {
            signUp(response, 'google');
        }
        const responseTwitter = (error,data) => {
          signUp(data, 'google');
        }
      
        const LoginValue=[signUp,responseFacebook,responseGoogle,responseTwitter,state];
        return (
            <>
                <SocialLoginContext.Provider value={LoginValue}>
                    
                    <FacebookLoginAvnik/>
                    <GoogleLoginAvnik/>
                    {/* <TwitterLoginAvnik/> */}
                </SocialLoginContext.Provider>
            </>
        );
    
}



export default SocialLoginsAvnik;