import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import TagsInput from 'react-tagsinput';
import Auth from '../../../Routes/Auth';
import EmailChangePopup from '../ProfileModals/EmailChangePopup';
import ProfileDeactivatePopup from '../ProfileModals/ProfileDeactivatePopup';
import UserProfileContext from '../UserProfileContext/UserProfileContext';
import { ApiService } from '../../../ApiServer/ApiService';

const MyAccount = (props) => {
    const [state,dispatch] = useContext(UserProfileContext);
    const [usernameCheck, setUsernameCheck] = useState(0);

    useEffect(() => {
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


    const [ProfessionTags, setProfessionTags] = useState([]);
    const [ProfessionInputTag, setProfessionInputTags] = useState('');
    const [LanguageTags, setLanguageTags] = useState([]);
    const [LanguageInputTags, setLanguageInputTags] = useState('');


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
    useEffect(() => {
        dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{
            ...state.UpdateProfile,
            name: state.ProfileDetails?.name,
            aboutMe:state.ProfileDetails?.user_profile?.about_me,
            email: state.ProfileDetails?.email,
            profession: state.ProfileDetails?.user_profile?.profession ? JSON.parse(state.ProfileDetails?.user_profile?.profession) : state.ProfileDetails?.user_profile?.profession,
            language: state.ProfileDetails?.user_profile?.language ? JSON.parse(state.ProfileDetails?.user_profile?.language) : state.ProfileDetails?.user_profile?.language,
            dateOfBirth: state.ProfileDetails?.user_profile?.date_of_birth,
            gender: state.ProfileDetails?.user_profile?.gender,
            country: state.ProfileDetails?.user_profile?.country,
            username:state?.ProfileDetails?.username,
            phone: state?.ProfileDetails?.phone,

        }}});
        setLanguageTags(state.ProfileDetails?.user_profile?.language ? JSON.parse(state.ProfileDetails?.user_profile?.language) : []);
        setProfessionTags(state.ProfileDetails?.user_profile?.profession ? JSON.parse(state.ProfileDetails?.user_profile?.profession): [])
        return;
    }, [state.ProfileDetails])
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          console.log(state.UpdateProfile.username)
          checkUsername(state.UpdateProfile.username)
        }, 1000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [state.UpdateProfile.username])
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
   const showModal=(modal)=>{
        $(modal).modal('show');
   }
    return (
        <>
            <div className="ah-tab-content" data-ah-tab-active={props.active}>
                <div className="my-account">
                    <div className="my-ac-heading">
                        <strong>Edit Profile</strong>
                    </div>
                    <form onSubmit={props.handleEditProfile}>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="Name">Name <strong className='text-danger'>*</strong> </label>
                                    <input type="text" className="form-control" id="Name" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, name: e.target.value }}})} value={state.UpdateProfile.name} required={true} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="ProfileURL">Profile URL <strong className='text-danger'>*</strong>  {window.location.origin+`/profile/${state.UpdateProfile.username}`}</label> 
                                    <input type="text" className={`form-control ${usernameCheck==1?'is-valid':usernameCheck==2?'is-invalid':''}`} id="ProfileURL" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, username: e.target.value }}})} value={state.UpdateProfile.username} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="EmailAddress">Email Address <strong className='text-danger'>*</strong>  <button type="button" className="btn link-btn edit-email" onClick={()=>showModal('#change-email-address-popup')}>Change Email</button></label>
                                    <input type="text" className="form-control" id="EmailAddress" placeholder="" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, email: e.target.value }}})} value={state.UpdateProfile.email}  readOnly={true}/>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="inputState">Profession</label>
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
                                    <label className="form-label" htmlFor="inputState">Language</label>
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
                                    <label className="form-label" htmlFor="EventTitle">Date of Birth</label>
                                    <input type="date" className="form-control date" onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, dateOfBirth: e.target.value }}})} placeholder="Pick DOB" value={state.UpdateProfile.dateOfBirth} />
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="form-group-social">
                                    <label className="form-label" htmlFor="tag">Gender</label>
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
                                    <label className="form-label" htmlFor="tag">Country</label>
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
                                    <label className="form-label" htmlFor="Phone">Phone Number</label>
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
                                <div className="form-group">
                                    <label className="form-label" htmlFor="tag">Change Password</label>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="NewPassword">New Password</label>
                                                <input type="password" className="form-control" placeholder="Enter New Password..." onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, password: e.target.value }}})} value={state.UpdateProfile.password} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="ConfirmPassword">Confirm New Password </label>
                                                <input type="password" className="form-control" placeholder="Confirm New Password..." onChange={(e) => dispatch({type:"UpdateProfile",payload:{Type:"UpdateProfile",UpdateProfile:{ ...state.UpdateProfile, password_confirmation: e.target.value }}})} value={state.UpdateProfile.password_confirmation} />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12">
                                <div className="two-btns">
                                    <ul className="cmn-ul-list">
                                        <li><button type="submit" disabled={state.ProfileDetails?.name?false:true} className="btn default-btn">Save</button></li>
                                        <li> <button type="button" onClick={() => alert('Something Wrong')} className="btn default-btn deactivate-btn" data-toggle="modal" data-target="#deactivate-account-popup"> Deactivate Account</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <EmailChangePopup />
            <ProfileDeactivatePopup />
        </>
    );
}


export default MyAccount;
