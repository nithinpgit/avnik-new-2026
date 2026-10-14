import moment from 'moment';
import React, { Component, useContext } from 'react';
import { Redirect } from 'react-router';
import { ApiService } from '../../../../../../ApiServer/ApiService';
import GlobalContext from '../../../../../../Global/Context/GlobalContext';

const QuickReply=()=> {
    const [globalState, globalDispatch] = useContext(GlobalContext);
    
   const handleChange=(e)=>{
       console.log(e)
    let name =e.target.name;
        if(name==="broadcasting"){
            globalDispatch({type:name,payload:{Type:name,[name]:!globalState.broadcasting}})
        }
    }

    // const handleFrom=(e) =>{
    //     e.preventDefault();
    //     let data = {
    //         roomName:globalState.roomName,
    //         eventId:globalState.eventId,
    //         slotId:globalState.slotId,
    //         roomImage:globalState.roomImage,
    //         broadcasting:globalState.broadcasting,
    //     }
    //     ApiService._createEventRoom(data).then((res)=>{
    //             if(res.data.status==200){
    //                 $('#quick-message-popup').modal('hide');
    //                 console.log(res);
    //                 globalDispatch({type:"Redirect",payload:{Type:"Redirect",Redirect:"/messages"}})
    //                 globalDispatch({type:'Reset',payload:{
    //                     Type:'Reset',
    //                     roomName:'',
    //                     eventId:'',
    //                     slotId:'',
    //                     roomImage:'',
    //                     broadcasting:false,
    //                     slotTime:'',
    //                 }})
    //             }else{

    //             }
    //             console.log(res)
    //     }).catch((error)=>{
    //         console.log(error);
    //     })
    // }
    
    console.log(globalState,'globalState');
        return (
            <>
                <div className="modal fade default-popup create-folder-popup quick-message-popup" id="quick-message-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={handleFrom}>
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                        <div className="modal-header">
                        <h2 className="modal-title">Message</h2>
                        </div>
                        <div className="modal-body">
                        <div className="g-m-title-dt">
                        <strong>{globalState.roomName?globalState.roomName:'N/A'}</strong>
                        <span>{moment.utc().format('dddd')}, {moment.utc().format('DD MMM YYYY hh:m a')} (UTC)</span>		
                        </div>         
                        <div className="form-ck-forgot-p-link">           
                            <div className="checkbox custom">
                                <label>
                                    <input type="checkbox" name="broadcasting" onChange={handleChange} checked={globalState.broadcasting} value={globalState.broadcasting}/>
                                    <span className="ck-bx-c">Broadcast (Only host would be able to message)</span>
                                </label>
                            </div>
                            <button type="submit" className="btn default-btn"  disabled={globalState.eventId&&globalState.slotId?false:true}>Create</button>           
                        </div>
                        </div>
                    </div>
                    </form>
                    
                </div>
            </div>
            </>
        );
}

export default React.memo(QuickReply);



