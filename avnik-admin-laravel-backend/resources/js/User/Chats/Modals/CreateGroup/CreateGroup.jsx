
import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ApiService } from '../../../../ApiServer/ApiService';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import CurrentUser from '../../../../components/UserContext/CurrentUserContext/CurrentUser';
import Auth from '../../../../Routes/Auth';
import ChatContext from '../../ChatContext/ChatContext';
const CreateGroup = ({searchMyContacts}) => {
    const currentUser = useContext(CurrentUser);
    const [state, dispatch] = useContext(ChatContext);
    const [RoomName, setRoomName] = useState('');
    const [BroadCasting, setBroadCasting] = useState(false);
    const [RoomImage, setRoomImage] = useState({
        tempSrc:'',
        original:'',
    });
    useEffect(() => {

        setRoomName(state?.EditGroupContent?.room_name);
        return () => {
            setRoomName('');
            setRoomImage({
                tempSrc:'',
                original:'',
            })
        };
    }, [state?.EditGroupContent]);

    const [Error, SetError] = useState(false);
    const handleCreateRoom = (e) => {
        e.preventDefault();
           let roomUsers=state.SelectedUserIds?.length>0?state.SelectedUserIds:[currentUser?.id]
            var form_data =''       
            if(RoomImage.tempSrc&&RoomImage.original){
                form_data=new FormData();
                form_data.append('file', RoomImage.original, RoomImage.original.name);
                form_data.append('roomName', RoomName);
                form_data.append('broadcasting', BroadCasting);    
                form_data.append('roomUserIds', JSON.stringify(roomUsers));    
            }else{
             form_data ={
                    roomName: RoomName,
                    broadcasting: BroadCasting,
                    roomUserIds: roomUsers,
                }
            }
        ApiService._createChatRoom(form_data).then((res) => {
            if (res.data.status == 200) {
                SetError(false);
                setRoomName('');
                setRoomImage({
                    tempSrc:'',
                    original:'',
                })
                setBroadCasting(false);
                $('#create-group-popup').modal('hide');
                // dispatch({ type: "CREATE_GROUP", payload: true })
                dispatch({
                    type: "SELECT_USER_IDS",
                    payload: [],
                });

                dispatch({ type: "ADD_TO_MY_GROUP", payload:{Type:'ADD_TO_MY_GROUP',MyGroups:[res?.data?.data,...state?.MyGroups]}});
                // dispatch({ type: "RANDOM", payload:{Type:'RANDOM',random:Math.random()}});
            }
            if (res.data.status == "failed") {
                SetError(true);
                toastr['error'](res.data.message);
            }
        }).catch((error) => {
            console.log(error);
        })

        // dispatch({type:'CREATE_ROOM',payload:{}})


    }

  const handleUpdateRoom=(e)=>{
    e.preventDefault();
    let roomUsers=state.SelectedUserIds
    var form_data =''       
    if(RoomImage.tempSrc&&RoomImage.original){
        form_data=new FormData();
        form_data.append('file', RoomImage.original, RoomImage.original.name);
        form_data.append('roomName', RoomName);  
        form_data.append('roomId', state?.EditGroupRoomId);
        form_data.append('roomUserIds', JSON.stringify(roomUsers));    
    }else{
     form_data ={
            roomName: RoomName,
            roomId: state?.EditGroupRoomId,
            roomUserIds: roomUsers,
        }
    }
ApiService._UpdateRoom(form_data).then((res) => {
    if (res.data.status == 200) {
        SetError(false);
        setRoomName('');
        setRoomImage({
            tempSrc:'',
            original:'',
        })
        setBroadCasting(false);
        $('#create-group-popup').modal('hide');
        // dispatch({ type: "CREATE_GROUP", payload: true })
        dispatch({
            type: "SELECT_USER_IDS",
            payload: [],
        });

        // dispatch({ type: "ADD_TO_MY_GROUP", payload:{Type:'ADD_TO_MY_GROUP',MyGroups:[res?.data?.data,...state?.MyGroups]}});
        // dispatch({ type: "RANDOM", payload:{Type:'RANDOM',random:Math.random()}});
    }
    if (res.data.status == "failed") {
        SetError(true);
        toastr['error'](res.data.message);
    }
}).catch((error) => {
    console.log(error);
})
  }  
  const  setGroupImage=(e)=>{
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
      
         reader.onloadend = (e) =>setRoomImage({tempSrc:[reader.result],original:file});
        
      }
   const SelectContactUsers  =(event,userId)=>{

    if(event.target.checked){
        setTimeout(() => {
            dispatch({type:"SelectContactUsers",payload:{Type:"SelectContactUsers",SelectedUserIds:[...state?.SelectedUserIds,userId]}})
        }, 100);
    }else{
        setTimeout(() => {
            dispatch({type:"SelectContactUsers",payload:{Type:"SelectContactUsers",SelectedUserIds:state?.SelectedUserIds.filter((filter)=>filter!=userId)}})
        }, 100);
    }
    console.log(event.target.value,userId,event.target.checked,state?.ContactsList,state.SelectedUserIds,'userid of contact user');

    searchMyContacts('')
    
   } 
    return (
        <>
            <div className="modal fade default-popup create-group-popup" id="create-group-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={state?.EditGroup?handleUpdateRoom:handleCreateRoom}>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title">{state?.EditGroup?"Edit":"Create"} Group</h2>
                            </div>
                            <div className="modal-body">
                                <div className="create-group-input-bx">
                                    <div className="left-c-g-img">
                                        <div className="avatar-upload">
                                            <div className="avatar-edit">
                                                <input type='file' id="imageUpload" onChange={setGroupImage} accept=".png, .jpg, .jpeg" />
                                                <label htmlFor="imageUpload"></label>
                                            </div>
                                            <div className="avatar-preview">
                                                <div id="imagePreview" style={{ backgroundImage: `url(${RoomImage.tempSrc||FileManagerPath+state?.EditGroupContent?.group_image})` }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" className={Error ? `form-control is-invalid` : `form-control`} onChange={(e) => setRoomName(e.target.value)} placeholder="Enter Group Name" minLength="2" maxLength="40" value={RoomName} />
                                </div>
                                {/* <span className="float-right">{RoomName.length}/40</span> */}
                            </div>
                            <div className="modal-footer">
                                <div className="form-ck-forgot-p-link">
                                    <div className="checkbox custom">
                                        <span>
                                            <input type="text" className='form-control' placeholder='Search contact users' onChange={(e)=>searchMyContacts(e.target.value)} />
                                            {/* <span className="ck-bx-c">Broadcast (Only host would be able to message)</span> */}
                                        </span>
                                        <ul className="list-group mt-2">
                                            {state?.ContactsList?.map((res)=><li key={res?.id}  className={`list-group-item ${state?.SelectedUserIds?.find((find)=>find==res?.contact_id?.id)?'bg-primary':''}`}> <input type="checkbox" onChange={(e)=>SelectContactUsers(e,res?.contact_id?.id)} className={`contact-user-list float-left`} value={res?.contact_id?.id} /> {res?.contact_id?.name}</li>)}
                                        </ul>
                                    </div>
                                    
                                    <button className="btn default-btn" type="submit" disabled={state?.EditGroup?false:state?.SelectedUserIds?.length>0&&RoomName?.length > 0 ? false : true}>{state?.EditGroup?"Update":"Create"}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateGroup;
