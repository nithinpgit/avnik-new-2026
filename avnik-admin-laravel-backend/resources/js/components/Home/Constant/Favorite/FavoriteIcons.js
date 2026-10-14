import { find } from 'lodash';
import React, { Component, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ApiService } from '../../../../ApiServer/ApiService';
import Authorization from '../../../../utility/Authorization';
import CurrentUser from '../../../UserContext/CurrentUserContext/CurrentUser';

const FavoriteIcons = ({eventId,favorite}) => {
    const currentUser = useContext(CurrentUser);
    const FavoriteIcon=useRef();

    function addClassActive(){
        FavoriteIcon.current.classList.add('active')
    } 
    function removeClassActive(){
        FavoriteIcon.current.classList.remove('active')
    }
    function FavoriteHandel(eventId) {
        let data={
            eventId: eventId
        }
        
    ApiService._favorite(data).then((res)=>{
        if(res.data.status==200){
            toastr["success"](res.data.message);
            if(typeof res.data.data=="number"){
                removeClassActive();
            }else{
                addClassActive();
            }
        }
        if(res.data.status=="failed"){
            toastr["error"](res.data.message);

        }
    }).catch((error)=>{
        toastr["error"](error.message);
       return Authorization._errorResponse(error);
    })
    }
    return (
        <>
            <div className="wishlist-icon">
            <div className="flexbox">
                <div className="fav-btn">
                    <a href={void (0)} id={`fav-icon-${eventId}`} ref={FavoriteIcon} onClick={()=>FavoriteHandel(eventId)}   className={`favme av av-favorite-solid-icon ${favorite?'active':''}`} ></a>
                </div>
            </div>
            </div>
        </>
    );
    

}

export default FavoriteIcons;