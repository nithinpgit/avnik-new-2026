// ** React Imports
import { useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import config from '../../../Api/config'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import themeConfig from '@configs/themeConfig'
import { APIService } from '../../../Api/APIService'
import axios from 'axios'
import { toast, Slide } from 'react-toastify'
import { isObjEmpty } from '../../../utility/Utils'
import classnames from 'classnames'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const ability = useContext(AbilityContext)
  const history = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  const onSubmit = data => {
    // if (Object.values(data).every(field => field.length > 0)) {
    //   useJwt
    //     .login({ email: data.loginEmail, password: data.password })
    //     .then(res => {
    //       const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
    //       dispatch(handleLogin(data))
    //       ability.update(res.data.userData.ability)
    //       navigate(getHomeRouteForLoggedInUser(data.role))
    //       toast(t => (
    //         <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
    //       ))
    //     })
    //     .catch(err => setError('loginEmail', {
    //         type: 'manual',
    //         message: err.response.data.error
    //       })
    //     )
    // } else {
    //   for (const key in data) {
    //     if (data[key].length === 0) {
    //       setError(key, {
    //         type: 'manual'
    //       })
    //     }
    //   }
    // }
    // if (isObjEmpty(errors)) {
      APIService.login({ email, password })
        .then(res => {
          if (res?.data?.status === 200) {
            if (res?.data?.data?.roles === 'admin') {
          axios.post(config.baseurl + config.endpoints.userProfile, {id:res?.data?.data?.id}, {headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':`Bearer ${res.data.data.accessToken}`}}).then((authRes) => {
            if (authRes.data.status == 200) {
              if (authRes?.data?.data?.role === 'admin') {
                console.log(res.data, 'data')
                const data = {...authRes.data.data, refreshToken:res.data.data.accessToken, accessToken:res.data.data.accessToken, ability:[{"action":"manage","subject":"all"}]}
                dispatch(handleLogin(data))
                ability.update([{"action":"manage","subject":"all"}])
                history(getHomeRouteForLoggedInUser(res?.data.data.roles))
              }
            }
          }).catch((error) => {
            console.log(error)
          })
          
          toast.success(
            <ToastContent name={data?.name || 'N/A'} role={data.roles || 'admin'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          } else {
            toast.error(
              <ToastContentError name={data?.name || 'N/A'} role={data.roles || 'admin'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
           }
         }
        }).catch(err => console.log(err))
    // }
  }
console.log(email, password);
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img className="round" src={themeConfig.app.appLogoImage} alt="avatar" height="30" width="30"/>

          <h2 className='brand-text text-primary ms-1'>Avnik</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Avnik! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            {/* <Alert color='primary'>
              
              <HelpCircle
                id='login-tip'
                className='position-absolute'
                size={18}
                style={{ top: '10px', right: '10px' }}
              />
              <UncontrolledTooltip target='login-tip' placement='left'>
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                {/* <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      value={email}
                      className={classNames({ 'is-invalid': errors['loginEmail'] })}

                      onChange={e => setEmail(e.target.value)}
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                /> */}
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='loginEmail'
                  name='loginEmail'
                  placeholder='john@example.com'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['loginEmail'] })}
                  // innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                {/* <Controller
                  id='password'
                  name='password'
                  
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle  
                    onChange={e => setPassword(e.target.value)}
                     className='input-group-merge' password={password} invalid={errors.password && true} {...field} />
                  )}
                /> */}
                <InputPasswordToggle
                  value={password}
                  id='password'
                  name='password'
                  className={classnames('input-group-merge', { 'is-invalid': errors['login-password'] })}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
