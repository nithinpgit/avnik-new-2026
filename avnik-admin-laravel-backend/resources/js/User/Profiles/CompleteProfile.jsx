import React, { useContext, useEffect, useReducer, useState } from 'react';
import Reducer from '../../utility/Reducer';
import MyAccount from './Components/MyAccount';
import CurrentUser from '../../components/UserContext/CurrentUserContext/CurrentUser';
import TagsInput from 'react-tagsinput';
import Axios from 'axios';
import Auth from '../../Routes/Auth';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment-timezone';
import { ApiService } from '../../ApiServer/ApiService';

const initialState={
    Countries:[],
    UpdateProfile: {
        currentUserId: "",
        aboutMe: "",
        edit: false,
        profilePicture: "",
        language: [],
        profession: [],
        country: "",
        email: "",
        phone: "",
        name: "",
        username: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        password_confirmation: "",
        updated: false
    }
}
const CompleteProfile = () => {
   const history=useHistory();
    const [state, dispatch]=useReducer(Reducer,initialState);
    const [ProfessionTags, setProfessionTags] = useState([]);
    const [ProfessionInputTag, setProfessionInputTags] = useState('');
    const [preloader,setPreloader]=useState(false);
    const [LanguageTags, setLanguageTags] = useState([]);
    const [usernameCheck, setUsernameCheck] = useState(0);
    const [LanguageInputTags, setLanguageInputTags] = useState('');
    const currentUser =useContext(CurrentUser);
    useEffect(() => {
        getProfileDetail()
        Axios.get('/api/countries', {
            headers: {
                'Accept': 'application/json',
                authorization: `Bearer ${Auth.getAccessToken()}`
            }
        }).then((res) => {
            if (res.status == 200) {
                dispatch({type:"countries",payload:{Type:"countries",Countries:res.data}});
            }
        }).catch((error) => {
            console.log(error)
        }
        )
        return;
    }, []);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(state.UpdateProfile.username)
          checkUsername(state.UpdateProfile.username)
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [state.UpdateProfile.username])
    const getProfileDetail = () => {
        dispatch({
            type: "setProfileDetails",
            payload: { Type: "setProfileDetails", SlotPreloader: true }
        });
        
        Axios.post(`/api/profile/username`,{username:currentUser?.username,tz:moment.tz.guess()}, {
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${Auth.getAccessToken()}`
                }
            })
            .then(res => {
                if (res.data.status == 200) {
                    
                    dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{
                        ...state.UpdateProfile,
                        name: res.data.userProfile?.name,
                        aboutMe:res.data.userProfile?.user_profile?.about_me,
                        email: res.data.userProfile?.email,
                        profession: res.data.userProfile?.user_profile?.profession ? JSON.parse(res.data.userProfile?.user_profile?.profession) : res.data.userProfile?.user_profile?.profession,
                        language: res.data.userProfile?.user_profile?.language ? JSON.parse(res.data.userProfile?.user_profile?.language) : res.data.userProfile?.user_profile?.language,
                        dateOfBirth: res.data.userProfile?.user_profile?.date_of_birth,
                        gender: res.data.userProfile?.user_profile?.gender,
                        country: res.data.userProfile?.user_profile?.country,
                        username: res.data.userProfile?.username,
                        phone: res.data.userProfile?.phone,
                        currentUserId:res.data.userProfile?.id
                    }}});
                    setLanguageTags(res.data.userProfile?.user_profile?.language ? JSON.parse(res.data.userProfile?.user_profile?.language) : []);
                    setProfessionTags(res.data.userProfile?.user_profile?.profession ? JSON.parse(res.data.userProfile?.user_profile?.profession): [])

                }
                if (res.data.status == "failed") {
                    setError({ ...Error, userNotFound: true });
                }
                
            })
            .catch(error => {
               
                console.log(error);
            });
    };
    const validation=(data)=>{
        let validation=false;
        if(data?.username){


        }else{
            toastr["error"]('profile url is mandatory');

        }
        if(data?.name){

        } else{
            toastr["error"]('name is mandatory');

        }
        if(data?.profession){

        }else{
            toastr["error"]('profession is mandatory');

        }
        if(data?.language){

        }else{
            toastr["error"]('language is mandatory');

        }
        if(data?.phone){

        }else{
            toastr["error"]('phone number is mandatory');
        }
        if(data?.gender){

        }else{
            toastr["error"]('gender is mandatory');

        }
        if(data?.country){

        }else{
            toastr["error"]('country is mandatory');

        }
        if(data?.username&&data?.name&&data?.gender&&data?.phone&&data?.profession&&data?.language&&data?.country){
            return true;
        }else{
            return false;
        }
    }
    const _skipStepComplete=e=>{
        ApiService._skipStepComplete().then((res)=>{
            if(res.data.status==200){
                history.push('/home');
            }else{
                toastr["error"](res.data.message);
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    const handleEditProfile = e => {
        e.preventDefault();
        const data = state.UpdateProfile;
        setPreloader(true);
        if(validation(data)){
        Axios.put(`/api/profile/update/${currentUser?.id}`, data, {
                headers: {
                    Accept: "application/json",
                    authorization: `Bearer ${Auth.getAccessToken()}`
                }
            }).then(res => {
                if (res.data.status == 200) {
                    dispatch({
                        type: "UpdateProfile",
                        payload: {
                            Type: "UpdateProfile",
                            UpdateProfile: {...state.UpdateProfile,
                                currentUserId: currentUser?.id,
                                edit: false,
                                updated: true
                            }
                        }
                    });
                    history.push('/home');
                    // if(state.UpdateProfile.aboutMe==''){
                    //     localStorage.setItem('userData',JSON.stringify(res.data.data));
                    // }
                    toastr["success"](res.data.message);
                }
                if (res.data.status == "failed" && res.data.success == false) {
                    
                    let ErrorPassword = res.data.validation_error?.password;
                    let ErrorEmail = res.data.validation_error?.email;
                    let ErrorName = res.data.validation_error?.name;
                    if (ErrorPassword) {
                        FormErrors.responseValidationError(ErrorPassword);
                    }
                    if (ErrorEmail) {
                        FormErrors.responseValidationError(ErrorEmail);
                    }
                    if (ErrorName) {
                        ErrorName.responseValidationError(ErrorName);
                    }
                }
                // if(res.data.status=="failed"){
                //     toastr["error"](res.data.message);
                // }
                 setPreloader(false);

            }).catch(error => {
                setPreloader(false);
                // toastr["error"](error.response.message);
            });
        }else{
            setPreloader(false);
        }

    };
    const handleTags = (tags) => {
        setProfessionTags(tags);
        dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{...state.UpdateProfile, profession: tags }}});

    }
    const handleLanguage = (e) => {
        setLanguageTags(e)
        dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{...state.UpdateProfile, language: e }}});
    }
    const handleLanguageInput = (e) => {
        setLanguageInputTags(e);
    }

    const handleTagsInput = (e) => {
        setProfessionInputTags(e);
    }
    const checkUsername =(username)=>{
        ApiService._validUsername({username}).then((res)=>{
            if(res.data.status==200){
                setUsernameCheck(1)
            }else{
                setUsernameCheck(2)
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    console.log(state,'complete profile pages')
    return (
    <>
 <section className="-sec in-page-content-sec">
                    <div className="my-profile">
                        <div className="container">
                            
                            <div className="e-d-tabs-bx">
                                <div className="av-default-tabs">
                                    <div className="ah-tab-wrapper">
                                        <div className="ah-tab">
                                           
                                            
                                                <a
                                                    className="ah-tab-item"
                                                    onClick={() =>
                                                        dispatch({
                                                            type:
                                                                "setProfileNav",
                                                            payload: {
                                                                Type:
                                                                    "setProfileNav",
                                                                ProfileNav: {
                                                                    profileNav: false,
                                                                    eventNav: false,
                                                                    accountNav: true,
                                                                    scheduleNav: false,
                                                                    reviewsNav: false
                                                                }
                                                            }
                                                        })
                                                    }
                                                    data-ah-tab-active={true
                                                    }
                                                    href="#"
                                                >
                                                    {/* Account */}
                                                </a>
                                            
                                        </div>
                                    </div>
                                    <div className="ah-tab-content-wrapper">
                                    
                                    <div className="ah-tab-content" data-ah-tab-active={true}>
                <div className="my-account">
                    <div className="my-ac-heading">
                        <strong>Complete Profile</strong>
                    </div>
                    <form onSubmit={handleEditProfile}>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="Name">Name <strong className='text-danger'>*</strong></label>
                                    <input type="text" className={`form-control ${state.UpdateProfile?.name?'is-valid':'is-invalid'}`} id="Name" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, name: e.target.value }}})} value={state.UpdateProfile.name} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                            <a className="float-right" href="#" onClick={_skipStepComplete}>Skip</a>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="ProfileURL">Profile URL <strong className='text-danger'>*</strong>  {window.location.origin+`/profile/${state.UpdateProfile.username}`}</label>  
                                    <input type="text" className={`form-control ${usernameCheck==1?'is-valid':usernameCheck==2?'is-invalid':''}`} id="ProfileURL" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, username: e.target.value }}})} value={state.UpdateProfile.username} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">

                                <div className="form-group">
                                    <label className="form-label" htmlFor="EmailAddress">Email Address <strong className='text-danger'>*</strong></label>
                                    <input type="text" className="form-control" id="EmailAddress" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, email: e.target.value }}})} value={state.UpdateProfile.email}  readOnly={true}/>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="inputState">Profession <strong className='text-danger'>*</strong></label>
                                    <TagsInput
                                        value={ProfessionTags}
                                        onChange={handleTags}
                                        inputValue={ProfessionInputTag}
                                        addKeys={[9, 13, 188]}
                                        onChangeInput={handleTagsInput}
                                        onlyUnique={true}
                                        maxTags={2}
                                        inputProps={{ placeholder: 'Profession' }}
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="inputState">Language <strong className='text-danger'>*</strong></label>
                                    <TagsInput
                                        value={LanguageTags}
                                        onChange={handleLanguage}
                                        inputValue={LanguageInputTags}
                                        addKeys={[9, 13, 188]}
                                        onChangeInput={handleLanguageInput}
                                        onlyUnique={true}
                                        maxTags={15}
                                        inputProps={{ placeholder: 'Languages' }}

                                    />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EventTitle">Date of Birth <strong className='text-danger'>*</strong></label>
                                    <input type="date" className="form-control date" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, dateOfBirth: e.target.value }}})} placeholder="Pick DOB" value={state.UpdateProfile.dateOfBirth} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group-social">
                                    <label className="form-label" htmlFor="tag">Gender <strong className='text-danger'>*</strong></label>
                                    <ul className="cmn-ul-list">
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio"  name="gender" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, gender: e.target.value }}})} checked={state?.UpdateProfile.gender=="Male"?true:false} value="Male" />Male
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio" name="gender" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, gender: e.target.value }}})} checked={state?.UpdateProfile.gender=="Female"?true:false} value="Female" />Female
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="radio custom">
                                                <label>
                                                    <input type="radio" name="gender" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, gender: e.target.value }}})} checked={state?.UpdateProfile.gender=="Non Binary"?true:false} value="Non Binary" />Non Binary 
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-12 col-sm-12">
                                <div className="form-group availability-form-group">
                                    <label className="form-label" htmlFor="tag">Your Availability</label>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="setting-toggle-bx">
                                                <ul className="cmn-ul-list">
                                                    <li>
                                                        <strong>Before starting of an event</strong>
                                                        <span className="av-switch">
                                                            <label></label>
                                                            <input type="checkbox" className="av-switch" id="noti-setting-1" defaultChecked />
                                                            <label htmlFor="noti-setting-1"></label>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <select className="form-control custom-select-bx">
                                                            <option defaultValue>05 Minutes</option>
                                                            <option>10 Minutes</option>
                                                            <option>15 Minutes</option>
                                                            <option>20 Minutes</option>
                                                        </select>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="tag">Country <strong className='text-danger'>*</strong></label>
                                      {/* <label className="form-label" htmlFor="ChangeEmailAddress">Country</label> */}
                                      <select className="form-control custom-select-bx" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, country: e.target.value }}})} value={state.UpdateProfile?.country}>
                                                    <option defaultValue disabled={true}>--Select Country--</option>
                                                    {state.Countries.map((res, index) =>
                                                        <option key={res.id} value={res.name}>{res.name}</option>
                                                    )}
                                      </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                    <label className="form-label" htmlFor="Phone">Phone Number <strong className='text-danger'>*</strong></label>
                                    <input type='text' className='form-control' placeholder='Enter Phone Number' onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, phone: e.target.value }}})} value={state.UpdateProfile?.phone}/>
                             </div>
                            </div>
                            <div className="col-12 col-sm-12">
                            <label className="form-label" htmlFor="social">Social Profile Link</label>
                            <div className='row'>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">                                
                                    <input type='text' className='form-control' placeholder='Facebook Profile Link'/>
                                 </div>
                            </div> 
                            <div className="col-12 col-sm-6">
                                <div className="form-group">                                
                                    <input type='text' className='form-control' placeholder='linkedin Profile Link'/>
                                 </div>
                            </div> 
                            <div className="col-12 col-sm-6">
                                <div className="form-group">                                
                                    <input type='text' className='form-control' placeholder='Instagram Profile Link'/>
                                 </div>
                            </div> 
                            <div className="col-12 col-sm-6">
                                <div className="form-group">                                
                                    <input type='text' className='form-control' placeholder='Twitter Profile Link'/>
                                 </div>
                            </div>                           

                            </div>
                            </div>
                            
                            <div className="col-12 col-sm-12">
                                <div className="two-btns">
                                    <ul className="cmn-ul-list">
                                        <li><button type="submit" className="btn default-btn" disabled={preloader}>{preloader?<span className='button-pre-loading'>wait...</span>:"Finish"}</button></li>
                                        <li> <button type="button" onClick={() => alert('Something Wrong')} className="btn default-btn deactivate-btn" data-toggle="modal" data-target="#deactivate-account-popup"> Deactivate Account</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
    </>
    );
}
export default CompleteProfile;