import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from '../../../../ApiServer/AuthService';
import { FileManagerPath } from '../../../../ApiServer/UrlService';
import AuthVerify from '../Verify';

class AuthEmail extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            redirect:false,
            Waiting:false
        }
        
        this.RestPasswordLink=this.RestPasswordLink.bind(this);
    }

       
    async RestPasswordLink(event) {
        event.preventDefault();

        const ResetData = {
          email: this.state.email,
        }

        const response = await AuthService.forgotPassword(ResetData);
        if(response.data.status==200){
            toastr["success"](response.data.message)
            this.setState({
                redirect:true,
                Waiting:false
            })
        }else{
            this.setState({
                redirect:false,
                Waiting:false
            })
            toastr["error"](response.data.message)
        }
        console.log(response,"RestPasswordLink");

    }   


    render(){

        const{email,redirect,Waiting}=this.state;
        console.log(email);
            

        return(
<>
            
           {redirect?<AuthVerify></AuthVerify>:<main> 
        <section className="sign-in-up-sec">
        
            <div className="container-flex-bx" style={{backgroundImage:`url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)`}}>
                <div className="wrap-l-s-bx">
                    <div className="login-signup-form">
                        <figure className="sign-in-up-logo-icon">
                            <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`} alt="logo"/>
                        </figure>
                        <div className="form-heading">
                            <h1>Forgot Password</h1>
                            <p>Typing your below to reset your password</p>
                        </div>
                        <form  onSubmit={(event) => this.RestPasswordLink(event)} >
                                                
                            <div className="form-group">
                                <label className="form-label" htmlFor="InputEmail1">Email</label>
                                <div className="icon-input-box">
                                    <input type="email"  className="form-control "  onChange={event => this.setState({ email: event.target.value })} name="email" defaultValue={email}  required autoComplete="email" autoFocus placeholder="Enter email address" />
                                    <span className="input-icon" data-placeholder="&#xe91d;"></span>
                                </div>
                            </div>         
                            <div className="form-group form-forgot-btns">
           <button type="submit" onClick={event=>this.setState({Waiting:true})} className="btn default-btn">{Waiting?'Sending...':'Reset'}</button>
                                <div className="or-text">Or</div>
                                <div className="f-sign-in-link"><Link to="/login">Sign in</Link></div>
                            </div>                           
                        </form>
                    </div>
                </div>
            </div>
    </section>
    </main>}
    </>
        );
    }
}
export default AuthEmail;