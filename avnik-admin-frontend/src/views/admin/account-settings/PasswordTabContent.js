import * as yup from 'yup'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import { APIService } from '../../../Api/APIService'
import { useState } from 'react'
import { toast } from 'react-toastify'

const PasswordTabContent = () => {
  const SignupSchema = yup.object().shape({
    'old-password': yup.string().required(),
    'new-password': yup.string().required(),
    'retype-new-password': yup
      .string()
      .required()
      .oneOf([yup.ref(`new-password`), null], 'Passwords must match')
  })

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const { register, formState: { errors }, handleSubmit, trigger } = useForm({
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => UpdatePassword();
  
  const UpdatePassword=()=>{
    let data={oldPassword:oldPassword,password:newPassword,con_password:retypePassword};
    APIService.UpdateAdminPassword(data).then((res)=>{
      if(res.data.status==200){
        setOldPassword('');
        setNewPassword('');
        setRetypePassword('');
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    }).catch((error)=>{console.log(error)});
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Old Password'
              htmlFor='old-password'
              name='old-password'
              innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['old-password']
              })}
              onChange={(e)=>setOldPassword(e.target.value)}
              value={oldPassword}
            />
          </FormGroup>
        </Col>
      </Row> */}
      <Row>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='New Password'
              htmlFor='new-password'
              name='new-password'
              // innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['new-password']
              })}
              onChange={(e)=>setNewPassword(e.target.value)}
              value={newPassword}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <InputPasswordToggle
              label='Retype New Password'
              htmlFor='retype-new-password'
              name='retype-new-password'
              // innerRef={register({ required: true })}
              className={classnames('input-group-merge', {
                'is-invalid': errors['retype-new-password']
              })}
              onChange={(e)=>setRetypePassword(e.target.value)}
              value={retypePassword}
            />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Save changes
          </Button.Ripple>
          <Button.Ripple color='secondary' outline>
            Cancel
          </Button.Ripple>
        </Col>
      </Row>
    </Form>
  )
}

export default PasswordTabContent
