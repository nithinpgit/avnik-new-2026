import React ,{useState,Component }from 'react';
import { Link ,useParams, Redirect} from 'react-router-dom';
import AuthService from '../../../../ApiServer/AuthService';
import { FileManagerPath } from '../../../../ApiServer/UrlService';


class AuthReset extends Component {

constructor(props){
    super(props)

    const url = props.location.search;
    const urlString = url.split('?token=');
    const urlValue=  urlString[1].split('&email=');
    const token=urlValue[0];
    const email=urlValue[1];
    
    this.state={
        email:email,
        token:token,
        password:'',
        password_confirmation:'',
        redirect:false,
        ErrorPassword:false,
        ErrorPasswordConfirmation:false,
        ErrorEmail:false,
        ButtonResponse:false
    }
    this.handleFormSubmit=this.handleFormSubmit.bind(this)
}

async handleFormSubmit(event) {
    event.preventDefault();
    
    const postData = {
      email: this.state.email,
      password: this.state.password,
      token: this.state.token,
      password_confirmation: this.state.password_confirmation
    }

    const response = await AuthService.resetPassword(postData);
    console.log(response.data,"Reset Password");
    if(response.data.status=="failed"){
            if(response.data.message){
              
                toastr["error"](response.data.message)

            }

            if(response.data.validation_error.email!=undefined){

                toastr["error"](response.data.validation_error.email[0])

            }

            if(response.data.validation_error.password!=undefined){
                
                toastr["error"](response.data.validation_error.password[0])
                
                toastr["error"](response.data.validation_error.password[1])

                this.setState({
                    password:true,
                    password_confirmation:true,
                })

            }        
    }
        if(response.data.status==200){
        
            toastr["success"](response.data.message)
         
            this.setState({
                redirect:true,
                ButtonResponse:true
            });
        }
  }

render(){

const {email,ErrorPassword,ButtonResponse,ErrorEmail,ErrorPasswordConfirmation,redirect}=this.state;

    if(redirect){
    return <Redirect to="/login" />
    }
    return(
        <main>
    <section className="sign-in-up-sec">
        <div className="container-flex-bx" style={{backgroundImage:`url(${FileManagerPath}/public/assets/images/sign-in-up-page-bg.svg)`}}>
            <div className="wrap-l-s-bx">
                <div className="login-signup-form">
                    <figure className="sign-in-up-logo-icon">
                        <img src={`${FileManagerPath}/public/assets/images/sign-in-up-logo-icon.svg`}  alt="logo"/>
                    </figure>
                    <div className="form-heading">
                        <h1>Reset password</h1>
                        <p>Get your free Avnik account now.</p>
                    </div>
                    <form  onSubmit={(event) => this.handleFormSubmit(event)}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="InputEmail1">Email</label>
                            <div className="icon-input-box">
                                <input type="email"  type="email" className={ErrorEmail?"form-control is-invalid":"form-control"} name="email" defaultValue={email} onChange={event => this.setState({email: event.target.value })} required autoComplete="email" autoFocus placeholder="Enter email address"/>
                                <span className="input-icon" data-placeholder="&#xe91d;"></span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputPassword1">New Password</label>
                            <div className="icon-input-box password">
                                <input type="password" className={ErrorPassword?"form-control is-invalid":"form-control"} name="password" onChange={event => this.setState({ password: event.target.value })} required autoComplete="new-password" placeholder="Enter new password"/>
                                <span className="input-icon" data-placeholder="&#xe93d;"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="exampleInputPassword1">Confirm Password</label>
                            <div className="icon-input-box password">
                                <input type="password" className={ErrorPasswordConfirmation?"form-control is-invalid":"form-control"} onChange={event => this.setState({ password_confirmation: event.target.value })} name="password_confirmation" required autoComplete="new-password" placeholder="Enter new confirm password"/>
                                <span className="input-icon" data-placeholder="&#xe93d;"></span>
                            </div>
                        </div>
                        <div className="form-group form-forgot-btns">
                            <button type="submit" disabled={ButtonResponse?'disabled':''} className="btn default-btn">{ButtonResponse?'Please Wait...':'Change Password'}</button>
                            <div className="or-text">Or</div>
                            <div className="f-sign-in-link"><Link to="/login">Sign in</Link></div>
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
export default AuthReset;