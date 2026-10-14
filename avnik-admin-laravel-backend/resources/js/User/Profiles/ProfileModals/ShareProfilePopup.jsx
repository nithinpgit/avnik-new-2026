import Axios from 'axios';
import React,{useContext,useState} from 'react';
import FormErrors from '../../../components/screens/CreateEvent/Errors/ValidationError/FormError';
import CurrentUser from '../../../components/UserContext/CurrentUserContext/CurrentUser';
import Auth from '../../../Routes/Auth';
import UserProfileContext from '../UserProfileContext/UserProfileContext';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,

  } from "react-share";
import { FileManagerPath } from '../../../ApiServer/UrlService';
import GlobalContext from '../../../Global/Context/GlobalContext';

const ShareProfilePopup = ({title,type,url}) => {
// const history = window.location;
const currentUser = useContext(CurrentUser);
const [globalState,globalDispatch]=useContext(GlobalContext);
    const CopyToClipBoard=(text)=>{
        var copyText = document.querySelector("#copy-input");
        copyText.select();
        document.execCommand("copy");
        if(copyText.value){
            toastr["success"]('URL Copy')
        }else{
            toastr["error"]('URL Not Copy')
        }
    // navigator.clipboard.writeText(text).then(()=>toastr["success"]('URL Copy')).catch(()=>toastr["error"]('URL Not Copy'));
    }
    const [Email, setEmail] = useState('');
    const [Sending, setSending] = useState(false);
const ShareProfile=()=>{
    setSending(true)
   const data={
        currentUserId:currentUser?.id,
        profileUrl:url ||globalState?.Share,
        email:Email,
        type:type||"Profile",
    }
    Axios.post('/api/profile/share',data,{
        headers:{'Accept':'application/json',
                    authorization:`Bearer ${Auth.getAccessToken()}`
                }
    ,}).then((res)=>{
        if(res.data.status==200){
            toastr["success"](res.data.message);
            $('#share-profile-popup').modal('hide');
            setEmail('');
            setSending(false);
        }
        if(res.data.status=="failed"){
            setSending(false);
            if(res.data.validation_error){
                let ErrorEmail = res.data.validation_error.email;
                if(ErrorEmail){
                    FormErrors.responseValidationError(ErrorEmail);
                }
            }else{
                toastr["error"](res.data.message);
            }
            
        }
   
        
    }).catch((error)=>{
        setSending(false);
        console.log(error)
    })
}
    return (
        <>
            <div className="modal fade default-popup share-profile-popup" id="share-profile-popup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="av av-close-icon"></i></button>
                            <div className="modal-header">
                                <h2 className="modal-title">{title}</h2>
                            </div>
                            <div className="modal-body">
                                <div className="meeting-room-link">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group ">
                                                <label className="form-label">Share Link to via Social</label>
                                                <div className="form-btns-social">
                                                    <div className="footer-social-icn a2a_kit a2a_kit_size_32 a2a_default_style">
                                                        <ul>
                                                            
                                                            <li className="fb">
                                                            <FacebookShareButton
                                                                url={globalState?.Share}
                                                                // quote={title}
                                                                // className="Demo__some-network__share-button"
                                                            >
                                                                <FacebookIcon size={32} round={true}/>
                                                            </FacebookShareButton>

                                                                {/* <a className="a2a_button_facebook"></a> */}
                                                                {/* <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a> */}
                                                            </li>                                                           
                                                            <li className="twitter">
                                                                {/* <a className="a2a_button_twitter twitter"></a> */}
                                                                <TwitterShareButton url={globalState?.Share}>
                                                                    <TwitterIcon size={32} round={true} />
                                                                </TwitterShareButton>
                                                                {/* <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a> */}
                                                            </li>
                                                            <li className="linkedin">
                                                                {/* <a className="a2a_button_linkedin"></a> */}
                                                                <LinkedinShareButton url={globalState?.Share}>
                                                                    <LinkedinIcon size={32} round={true}/>
                                                                </LinkedinShareButton>
                                                                {/* <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a> */}
                                                            </li>
                                                            <li className="google">
                                                                <PinterestShareButton url={globalState?.Share}
                                                                // media={`${ProfileDetails?.user_profile?.profile_picture?FileManagerPath+ProfileDetails?.user_profile?.profile_picture:`${FileManagerPath}/public/assets/images/avatar.png`}`}
                                                                >
                                                                        <PinterestIcon size={32} round={true}/>
                                                                </PinterestShareButton>
                                                                {/* <a className="a2a_button_pinterest"></a> */}
                                                                {/* <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a> */}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Copy Link</label>
                                            <div className="form-group">
                                                <div className="meeting-room-link">
                                                    <input type="text" placeholder="" id="copy-input" onChange={() => console.log('Sorry you cant change the url')} value={globalState?.Share} className="form-control" />
                                                    <button type="button" onClick={() =>CopyToClipBoard(url||globalState?.Share)
                                                        } title="Click To Copy" className="btn cmn-btn">Copy</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label className="form-label">Send link to via mail</label>
                                                <div className="add-time-input">
                                                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" value={Email} placeholder="Enter Email" />
                                                    <button className="btn default-btn" type="button" disabled={Sending} onClick={()=>ShareProfile()}><i className="av av-send-2-icon"></i> Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

export default ShareProfilePopup;
