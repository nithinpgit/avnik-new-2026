import Axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Auth from '../../../../Routes/Auth';
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser';
import QuickStartContext from '../../Constants/QuickStart/QuickStartContext';

const QuickStartButton =()=> {
const currentUser = useContext(CurrentUser);
const [Url, setUrl] = useState();
const quickMeet=()=>{
    let data ={

    }
    if(currentUser){
        data={
            userId:currentUser?.id,
        }
    }else{
        toastr["error"]("Please login again and try"); 
        localStorage.clear();
        return window.location.replace("/login");
    }

    Axios.post('/api/meetingRoom/quickMeet',data,{
        headers:{'Accept':'application/json',
                authorization:`Bearer ${Auth.getAccessToken()}`
                }
    ,}).then((res)=>{
        if(res.data.status==200){
           $('#quick_meet_modal').modal('show');
           localStorage.setItem('_qm',JSON.stringify(res.data?.data?.room_id));
           toastr["success"](res.data.message)
           setUrl(res.data?.data?.room_id);

        }else{
           toastr["error"](res.data.message)
        }
    }).catch((error)=>{
        if(error.response.status==401){
            toastr["error"]("Please login and try again");
            localStorage.clear();
           return window.location.replace("/login");
        }else{
            toastr["error"](res.data.message)
        }
    })
}

        return (
            <>
                
                    <div className="r-m-t-bx home-menu"> <a href="#" className="btn cmn-bdr-btn create-event-btn quick-start-btn" title="Quick Meet" onClick={quickMeet} ><i className="av av-quick-start-icon"></i></a> </div>
              
            </>
        );
    
}

export default QuickStartButton;



