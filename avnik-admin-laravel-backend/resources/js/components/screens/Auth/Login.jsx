import React, {useState ,Component } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import AuthService from '../../../ApiServer/AuthService';
import { FileManagerPath } from '../../../ApiServer/UrlService';
import SocialIconsAvnik from './LoginSocialIcons/SocialLoginsAvnik';
 
 
class AuthLogin extends Component  {
 
  constructor(props){
    super(props)
        let Token=localStorage.getItem("accessToken");
        let isLogIn=true;
        if(Token==null){
            isLogIn=false
        }
    this.state={
            email: '',
            fullName: '',
            password: '',
            LoginErrors:{},
            showPassword:false,
            isChecked: false,
            loginButton:false,  
            completeProfile:false,
            isLogIn,
            redirectURL:localStorage.getItem("redirectUrl")    
    }
    this.handleFormSubmit=this.handleFormSubmit.bind(this)
    this.handleChecked=this.handleChecked.bind(this)
  }
  componentDidMount=()=>{
    let count = localStorage.getItem('refreshCount');
        // If no count exists, initialize to 0
        if (count === null) {
            count = 0;
        }
        // Increment the count
        count++;
        // Update the counter in localStorage
        localStorage.setItem('refreshCount', count);
 
        if(count>1){
            this.setState({redirectURL:''});
            localStorage.removeItem("redirectUrl");
            localStorage.removeItem("refreshCount");
        }
  }
    async handleFormSubmit(event) {
        event.preventDefault();
        this.setState({
            loginButton:true
        })
        const postData = {
          email: this.state.username,
          name: this.state.fullName,
          password: this.state.password
        }
        const response = await AuthService.doUserLogin(postData);
        console.log(response,"Login");
        if(response==false){
            this.setState({
                LoginErrors:response,
                loginButton:false
            })
        }
        if(response.status=="failed"){
                if(response.message){
                    toastr["error"](response.message)
                }
               
                this.setState({
                    LoginErrors:response,
                    loginButton:false
                })
 
                if(response.validation_error){
                    let ErrorEmailValidation= response.validation_error.email;
                    let ErrorPasswordValidation= response.validation_error.password;
                   
                        if(ErrorEmailValidation){
                            ErrorEmailValidation.map((val,index)=>{
                                return  toastr["error"](val);
                            });
                        }
 
                    if(ErrorPasswordValidation){
                   
                        ErrorPasswordValidation.map((val,index)=>{
                            this.setState({redirectURL:''});
                            return  toastr["error"](val);
                        });
                   
                    }
                   
                }
               
           
        }
       
        if(response.accessToken){
            toastr["success"](response.message)
            localStorage.setItem("accessToken",response.accessToken)
            if(response.status==200){
                localStorage.setItem('userData',JSON.stringify(response.data));
                this.setState({
                    isLogIn:true,
                    loginButton:false,
                    completeProfile:false
   
                })
            }else if(response.status==201){
                localStorage.setItem('userData',JSON.stringify(response.data));
                this.setState({
                    isLogIn:true,
                    loginButton:false,
                    completeProfile:true
                })
            }
 
        }
           
      }
     
      handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
      }
 
render(){
    const { email,fullName, redirectURL,password, isChecked,isLogIn,LoginErrors ,completeProfile} = this.state;
    if(isLogIn&&redirectURL){
        return window.location=JSON.parse(redirectURL)?.url
    }else if(isLogIn&&completeProfile){
        return <Redirect to="/complete-profile" />
    }else if(isLogIn){
        return <Redirect to="/home" />
    }
 
   
    return(
        <main className="fix-footer">
<section className="sign-in-up-sec">
    <div className="container-flex-bx" style={{backgroundImage:`url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)`}}>
        <div className="wrap-l-s-bx">
            <div className="login-signup-form">
                <figure className="sign-in-up-logo-icon">
 
                    <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`} alt="logo" />
 
                </figure>
                <div className="skip-link">
                    {this.state.redirectURL?"":<Link to="/home">Skip</Link>}
                </div>
                <div className="form-heading">
                    <h1>Let's Get Started </h1>
                    <p>Sign in to continue to Avnik</p>
                </div>
                <form onSubmit={(event) => this.handleFormSubmit(event)} >
                   {this.state.redirectURL?
                    <div className="form-group">
                        <label className="form-label"  htmlFor="InputEmail1">Full Name</label>
                        <div className="icon-input-box">    
                            <input type="text" defaultValue={fullName} onChange={event => this.setState({ fullName: event.target.value })} className={ LoginErrors.status=="failed"?"form-control is-invalid ":"form-control"} id="fullName" name="fullName"    placeholder="Enter full name" required autoComplete="fullName "  autoFocus/>
                            <span className="input-icon " data-placeholder="&#xe91d;"></span>
                        </div>
                    </div>:""}
                   
                    <div className="form-group">
                        <label className="form-label"  htmlFor="InputEmail1">Email address</label>
                        <div className="icon-input-box">    
                            <input type="email" defaultValue={email} onChange={event => this.setState({ username: event.target.value })} className={ LoginErrors.status=="failed"?"form-control is-invalid ":"form-control"} id="InputEmail1" name="email"    placeholder="Enter email address" required autoComplete="email"  autoFocus/>
                            <span className="input-icon " data-placeholder="&#xe91d;"></span>
                        </div>
                    </div>
                   
                    {this.state.redirectURL?"":<div className="form-group">
                        <label className="form-label" htmlFor="exampleInputPassword1">Password</label>
                        <div className="icon-input-box password">        
                            <input type={this.state.showPassword?"text":"password"} defaultValue={password} onChange={event => this.setState({ password: event.target.value })} className={LoginErrors.status=="failed"?"form-control is-invalid ":"form-control"} id="exampleInputPassword1" placeholder="Enter Password" name="password" required autoComplete="current-password"/>
                            <span className="input-icon" data-placeholder="&#xe93d;"></span>
                            <span onClick={()=>{this.setState({showPassword:!this.state.showPassword})}} className={`float-right field-icon ${this.state.showPassword?"fa fa-eye-slash ":"fa fa-fw fa-eye "}`}></span>
                        </div>
                    </div>}
 
                    {this.state.redirectURL?"":<><div className="form-group form-ck-forgot-p-link">
                        <div className="checkbox custom">
                            <label onClick={() => this.handleChecked()}>                                
                                <input type="checkbox" name="remember" id="remember" onChange={() => this.handleChecked()} checked={isChecked} />
                                Remember Me
                            </label>
                        </div>
                       
                        <div className="forgot-link">
                            <Link to="/password-reset">Forgot Password?</Link>
                        </div>
                    </div>
                    </>}
                    <div className="form-group form-btns-social">
                        <button type="submit" className="btn default-btn" disabled={this.state.loginButton}>{this.state.loginButton?<span className='button-pre-loading'>wait...</span>:this.state.redirectURL?"Enter in Meeting":"Sign In"}</button>
                        <span className="or-sign-in-with">Or Sign in with</span>
                        <div className="footer-social-icn">
                            <ul>          
                                <SocialIconsAvnik />
                            </ul>
                        </div>
                    </div>
                    <div className="or-sign-in-up-link">
                        <p>New user? <Link to="/register">Sign Up</Link></p>
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
 
export default AuthLogin;
 