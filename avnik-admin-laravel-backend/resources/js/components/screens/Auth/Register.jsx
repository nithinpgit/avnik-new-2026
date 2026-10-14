import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../../../ApiServer/AuthService';
import { useHistory } from "react-router-dom";

import { FileManagerPath } from '../../../ApiServer/UrlService';
import SocialLoginsAvnik from './LoginSocialIcons/SocialLoginsAvnik';
import PhoneNumberInput from './Components/PhoneNumberInput/PhoneNumberInput';

// const PreloaderImg='../../../../../public/images/PreloaderImg.gif';
export const PreLoaderItem=(props)=>{
    return(
        <img style={{marginLeft: "auto",marginRight: "auto",display:"block"}} src={props.img} alt={props.alt} />
    );
}
class AuthRegister extends Component{

constructor(props){

        super();
        let Token=localStorage.getItem("accessToken");
        let isLogIn=true;
        if(Token==null){
            isLogIn=false
        }
        this.state={

            name: '',
            email: '',
            username:Date.now(),
            phone: '',
            ErrorPassword_confirmation:false,
            ErrorPassword:false,
            ErrorPhone:false,
            ErrorEmail:false,
            ErrorUsername:false,
            ErrorName:false,
            password: '',
            showPassword:false,
            showPassword2:false,
            password_confirmation: '',
            termIsChecked: false,
            RegistrationStatus:false,
            preloader:false,
            isLogIn 
        }

        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChecked=this.handleChecked.bind(this);
        this.phoneInput=this.phoneInput.bind(this);
    }

    async handleFormSubmit(event) {
        event.preventDefault();
            this.setState({
            preloader:true
            });
        const postData = {
          name: this.state.name,
          email: this.state.email,
          username:this.state.username,
          password: this.state.password,
          phone: this.state.phone,
          password_confirmation:this.state.password_confirmation,
          termIsChecked:this.state.termIsChecked

        }
        
        const response = await AuthService.doUserRegister(postData);
        
        console.log(response);

        if(response.status===200){
          
        toastr["success"](response.message);

                this.setState({    
                    ErrorPassword_confirmation:false,
                    ErrorPassword:false,
                    ErrorPhone:false,
                    ErrorEmail:false,
                    ErrorUsername:false,
                    ErrorName:false,
                    RegistrationStatus:true,
                    preloader:false
                });

        }else if(response.status===201){
            this.setState({    
                ErrorPassword_confirmation:false,
                ErrorPassword:false,
                ErrorPhone:false,
                ErrorEmail:false,
                ErrorUsername:false,
                ErrorName:false,
                RegistrationStatus:201,
                preloader:false
            });
        }
        
        if(response.status==="failed"){
        this.setState({
            preloader:false
        });
        if(response.errors){
           let ErrorEmailValidation =response.errors.email;   
           let ErrorUsernameValidation =response.errors.username;   
           let ErrorNameValidation =response.errors.name;   
           let ErrorPhoneValidation =response.errors.phone;   
           let ErrorPasswordValidation =response.errors.password;   
           let ErrorPasswordConfirmationValidation =response.errors.password_confirmation;
           
        
           if(ErrorEmailValidation){

            ErrorEmailValidation.map((val,index)=>{
                this.setState({
                
                        ErrorEmail:true,
                });

            toastr["error"](val);
            
            });
            
            }else{
                this.setState({
                    
                        ErrorEmail:false,
                });
            }

            if(ErrorNameValidation){

                ErrorNameValidation.map((val,index)=>{
                    this.setState({
                    
                            ErrorName:true,
                    });
                toastr["error"](val);
                
                });
                
                }else{
                    this.setState({
                        
                            ErrorName:false,
                    });
                }
                if(ErrorUsernameValidation){
                    ErrorUsernameValidation.map((val,index)=>{
                        this.setState({
                        
                                ErrorUsername:true,
                        });
                        toastr["error"](val);

                    });

                }else{
                        
                    this.setState({
                        
                            ErrorUsername:false,
                    });
                }

                if(ErrorPhoneValidation){

                    ErrorPhoneValidation.map((val,index)=>{
                        this.setState({
                        
                                ErrorPhone:true,
                        });
                    toastr["error"](val);
                    
                    });
                    
                    }else{
                        this.setState({
                            
                                ErrorPhone:false,
                        });
                    }
                if(ErrorPasswordValidation){

                        ErrorPasswordValidation.map((val,index)=>{
                                
                            this.setState({
                                
                                        ErrorPassword:true,
                                });

                            toastr["error"](val);
                        
                        });
                        
                }else{
                    
                    this.setState({

                        ErrorPassword:false,

                    });
                }
                if(ErrorPasswordConfirmationValidation){

                    ErrorPasswordConfirmationValidation.map((val,index)=>{
                        this.setState({
                        
                                ErrorPassword_confirmation:true,
                        });
                    toastr["error"](val);
                    
                    });
                    
                    }else{
                        this.setState({
                            
                                ErrorPassword_confirmation:false,
                        });
                }
           
        }
    }
    }
      handleChecked(){
        this.setState({ termIsChecked:!this.state.termIsChecked });
      }
      phoneInput(number){

        this.setState({phone:number})
      }

      render(){
        const {preloader,isLogIn,RegistrationStatus,ErrorPassword_confirmation,ErrorPassword,ErrorUsername,ErrorPhone,ErrorEmail,ErrorName,name,email,username,phone,termIsChecked}=this.state;
        if(RegistrationStatus){
            return <Redirect to="/conformation-email" />
        }
        if(isLogIn){
            return <Redirect to="/home" />
        }

        console.log(this.state);
    return(
    
        <main className="fix-footer">
            
    <section className="sign-in-up-sec">
        <div className="container-flex-bx" style={{backgroundImage:`url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)`}}>
            <div className="wrap-l-s-bx">
                <div className="login-signup-form">
                    <figure className="sign-in-up-logo-icon">
                        <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`} alt="logo"/>
                    </figure>
                    <div className="skip-link">
                        <Link to="/home">Skip</Link>
                    </div>
                    <div className="form-heading">
                        <h1>Free Register for avnik </h1>
                        <p>Get your free Avnik account now.</p>
                    </div>
                    <form onSubmit={(event) => this.handleFormSubmit(event)} >
                        <div className="form-group">
                            <label className="form-label" htmlFor="inputFullName">Full Name <small className="text-danger">*</small></label>
                            <div className="icon-input-box">
                                <input type="text" className={ErrorName?"form-control is-invalid":"form-control"} defaultValue={name} onChange={event => this.setState({ name: event.target.value })} aria-describedby="emailHelp" placeholder="Enter full name" name="name"  required autoComplete="name" autoFocus/>
                                <span className="input-icon" data-placeholder="&#xe958;"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="InputEmail">Email address<small className="text-danger">*</small></label>
                            <div className="icon-input-box">
                                <input type="email" defaultValue={email} className={ErrorEmail?"form-control is-invalid":"form-control"} onChange={event => this.setState({ email: event.target.value })} id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email address"  name="email"  required autoComplete="email"/>
                                <span className="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label" htmlFor="InputEmail">User Name <small className="text-danger">*</small></label>
                            <div className="icon-input-box">
                                <input type="text" defaultValue={username} className={ErrorUsername?"form-control is-invalid":"form-control"} onChange={event => this.setState({ username: event.target.value })} id="InputUsername" aria-describedby="emailHelp" placeholder="Enter username"  name="username"  required />
                                <span className="input-icon" data-placeholder="&#xe958;"></span>
                            </div>
                        </div> */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="InputText">Phone Number</label>
                            {/* <div className="icon-input-box"> */}
                                <PhoneNumberInput className={ErrorPhone?"form-control is-invalid":"form-control"} onChange={this.phoneInput} value={phone}/>
                                {/* <input type="number" defaultValue={phone} className={ErrorPhone?"form-control is-invalid":"form-control"} onChange={event => this.setState({ phone: event.target.value })} id="InputPhone"  placeholder="Enter phone number"  name="phone"/> */}
                                {/* <span className="input-icon" data-placeholder="&#xe919;"></span> */}
                            {/* </div> */}
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="InputPassword2">Password <small className="text-danger">*</small></label>
                            <div className="icon-input-box password">
                            
                                <input type={this.state.showPassword?"text":"password"} className={ErrorPassword?"form-control is-invalid":"form-control"} onChange={event => this.setState({ password: event.target.value })} id="InputPassword2" placeholder="Enter Password" name="password" required autoComplete="new-password"/>
                                <span className="input-icon" data-placeholder="&#xe93d;"></span>
                                <span onClick={()=>{this.setState({showPassword:!this.state.showPassword})}} className={`float-right field-icon ${this.state.showPassword?"fa fa-eye-slash ":"fa fa-fw fa-eye "}`}></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="InputPassword1">Confirm Password <small className="text-danger">*</small></label>
                            <div className="icon-input-box password">
                    
                                <input type={this.state.showPassword2?"text":"password"}  onChange={event => this.setState({password_confirmation: event.target.value })} className={ErrorPassword_confirmation?"form-control is-invalid":"form-control"} id="InputPassword1" placeholder="Enter Password" name="password_confirmation" required autoComplete="new-password"/>
                                <span className="input-icon" data-placeholder="&#xe93d;"></span>
                                <span onClick={()=>{this.setState({showPassword2:!this.state.showPassword2})}} className={`float-right field-icon ${this.state.showPassword2?"fa fa-eye-slash ":"fa fa-fw fa-eye "}`}></span>

                            </div>
                        </div>
                        <div className="form-group form-ck-forgot-p-link">
                            <div className="checkbox custom">
                                <label>
                                    <input type="checkbox" checked={termIsChecked} onChange={event => this.setState({termIsChecked : event.target.value })} name="terms_of_use" id="terms_of_use"  />
                                    By registering you agree to the Avnik <Link to="#">Terms of Use</Link>
                                </label>
                            </div>
                        </div>
                        <div className="form-group form-btns-social">
                        
                            <button type="submit"  className="btn default-btn" disabled={preloader} >{preloader?<span className='button-pre-loading'>wait...</span>:"Sign Up"}</button>
                        
                            <span className="or-sign-in-with">Or Sign in with</span>
                            <div className="footer-social-icn">
                               <ul>
                  {/* <li className="fb"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li className="google"><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                  <li className="twitter"><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li> */}
                                    <SocialLoginsAvnik>

                                    </SocialLoginsAvnik>
                                </ul>
                            </div>
                        </div>
                        <div className="or-sign-in-up-link" >
                            
                            <p>Already  have a account? <Link to="/login">Sign In</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</section>
</main>
    );
   }
}
export  default AuthRegister;