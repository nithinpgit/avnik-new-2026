// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Third Party Components
import { Lock, Edit, Trash2 } from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table } from 'reactstrap'
import { setCustomProfileAvatar } from '../../../../Api/utility'
import { APIService } from '../../../../Api/APIService'
import { toast } from 'react-toastify'
const UserAccountTab = ({ selectedUser ,getUser,dispatch}) => {
  // ** States
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState(null)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
 
  // ** Function to change user image
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }
  const refreshSelectedUser = () => {
    dispatch(getUser(parseInt(selectedUser.id)))
  }

  const deactivateUserAccount = async () => {
    try {
      const response = await APIService.deactivateAccount({ userId: selectedUser.id })
      const responseData = response?.data

      if (responseData?.status !== 200 || !responseData?.success) {
        toast.error(responseData?.message || 'Unable to deactivate account.')
        return
      }

      if (responseData?.data?.requires_confirmation) {
        const shouldDeactivate = window.confirm(responseData.message)

        if (!shouldDeactivate) {
          return
        }

        const confirmResponse = await APIService.deactivateAccount({
          userId: selectedUser.id,
          confirm_deactivation: '1'
        })

        if (confirmResponse?.data?.status === 200 && confirmResponse?.data?.success) {
          toast.success(confirmResponse.data.message)
        } else {
          toast.error(confirmResponse?.data?.message || 'Unable to deactivate account.')
        }
      } else {
        toast.success(responseData.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Unable to deactivate account.')
    } finally {
      refreshSelectedUser()
    }
  }

  const statusChange = async e => {
    const nextStatus = e.target.value

    if (nextStatus === 'deactivate') {
      await deactivateUserAccount()
      return
    }

    APIService.UpdateUserStatus({user_id:selectedUser.id,status:nextStatus,commission:10}).then(response => {
      if(response.data.status==200){
        toast.success(response.data.message);
        refreshSelectedUser();
      } else {
        toast.error(response.data.message)
        refreshSelectedUser()
      }
      }).catch(err => {
        console.log(err)
        toast.error('Unable to update user status.')
        refreshSelectedUser()
      })
  }
  const handlePasswordChange=(e)=>{
    e.preventDefault();
    if(password===passwordConfirm){
      APIService.UpdateUserPassword({user_id:selectedUser.id,password:password,con_password:passwordConfirm}).then(response => {
        if(response.data.status==200){
          toast.success(response.data.message);
          setPassword('')
          setPasswordConfirm('')
        }else{
          toast.error(response.data.message);
        }
        }).catch(err => console.log(err))
    }else{
      toast.error('Confirm password mismatch!')
    }

  }

  // ** Update user image on mount or change
  useEffect(() => {
    if (selectedUser !== null || (selectedUser !== null && userData !== null && selectedUser.id !== userData.id)) {
      setUserData(selectedUser)
      if (selectedUser?.image?.length||selectedUser?.social_image?.length) {
        return setImg(setCustomProfileAvatar(selectedUser?.image,selectedUser?.social_image))
      } else {
        return setImg(null)
      }
    }
  }, [selectedUser])

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
          content={selectedUser?.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={img}
          alt='user profile avatar'
          height='90'
          width='90'
        />
      )
    }
  }

  return (
    <Row>
      <Col sm='12'>
        <Media className='mb-2'>
          {renderUserAvatar()}
          <Media className='mt-50' body>
            <h4>{selectedUser.name} </h4>
            {/* <div className='d-flex flex-wrap mt-1 px-0'>
              <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                <span className='d-none d-sm-block'>Change</span>
                <span className='d-block d-sm-none'>
                  <Edit size={14} />
                </span>
                <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
              </Button.Ripple>
              <Button.Ripple color='secondary' outline>
                <span className='d-none d-sm-block'>Remove</span>
                <span className='d-block d-sm-none'>
                  <Trash2 size={14} />
                </span>
              </Button.Ripple>
            </div> */}
          </Media>
        </Media>
        {/* <div className="form-check form-check-inline mb-1">
          <Input type='checkbox' id='admin-1' label='' defaultChecked={false} />
            <label className="form-check-label" htmlFor="inlineCheckbox1">Subscribed for company provided discounts</label>
        </div> */}
      </Col>
      <Col sm='12'>
        <Form onSubmit={e => e.preventDefault() }>
          <Row>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label htmlFor='name'>Name</Label>
                <Input type='text' id='name' placeholder='Name' disabled={true} defaultValue={userData && userData?.name} value={userData && userData?.name}/>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label htmlFor='email'>Email</Label>
                <Input type='text' id='email' placeholder='Email' disabled={true} defaultValue={userData && userData.email} value={userData && userData.email}/>
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label htmlFor='status'>Status</Label>
                <Input type='select' onChange={statusChange} name='status' id='status' defaultValue={userData && userData?.status} value={userData && userData?.status}>
                  <option selected={userData && userData?.status==='active'?true:false} value='active'>Active</option>
                  <option selected={userData && userData?.status==='deactivate'?true:false} value='deactivate'>Deactivate</option>
                </Input>
              </FormGroup>
            </Col>
            {/* <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                Save Changes
              </Button.Ripple>
            </Col> */}
            </Row>
            </Form>
            <Form onSubmit={handlePasswordChange}>
            <Row>
            <Col sm='12'>
              <div className='permissions  mt-1'>
                <h6 className='py-1  mb-0 font-medium-2'>
                  <Lock size={18} className='mr-25' />
                  <span className='align-middle'>Change Password</span>
                </h6>
                </div>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <InputPasswordToggle className='mb-2' onChange={(e)=>setPassword(e.target.value)} value={password} label='New Password' htmlFor='New Password' />
              </FormGroup>
              </Col>
            <Col md='6' sm='12'>
              <FormGroup>
                <InputPasswordToggle className='mb-2' onChange={(e)=>setPasswordConfirm(e.target.value)} value={passwordConfirm} label='Retype New Password' htmlFor='Retype New Password' />
              </FormGroup>
            </Col>
              
            </Row>
            <Row>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
              <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' disabled={password&&passwordConfirm?false:true} type='submit' color='primary'>
                Save Changes
              </Button.Ripple>
              <Button.Ripple color='secondary' outline>
                Cancel
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}
export default UserAccountTab
