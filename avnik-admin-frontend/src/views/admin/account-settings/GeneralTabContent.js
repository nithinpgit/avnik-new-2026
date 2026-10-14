import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Alert, Form } from 'reactstrap'
import { setCustomProfileAvatar } from '../../../Api/utility'
import { APIService } from '../../../Api/APIService'
import { toast } from 'react-toastify'

const GeneralTabs = ({ data ,UploadFile,getAuthUser}) => {
  const { register, errors, handleSubmit, control, setValue, trigger } = useForm()

  const [avatar, setAvatar] = useState(setCustomProfileAvatar(data?.image,data?.social_image))

  const onChange = e => {
   if(e.target.files?.length>0){
    const reader = new FileReader(),
     files = e.target.files
      UploadFile(e.target.files);
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
   }
  }

 const UpdateProfile = (data) => {
    APIService.adminProfileUpdate({name:data?.name}).then((res)=>{
      if(res.data.status==200){
        toast.success(res.data.message)
        getAuthUser();
      }else{
        toast.error(res.data.message)
        
      }
    }).catch((error)=>{

    })
  }
useEffect(() => {
  setAvatar(setCustomProfileAvatar(data?.image, data?.social_image))
}, [data])
  const onSubmit = data => UpdateProfile(data)
  return (
    <Fragment>
      {/* <Media>
        <Media className='mr-25' left>
          <Media object className='rounded mr-50' src={avatar} alt='Generic placeholder image' height='80' width='80' />
        </Media>
        <Media className='mt-75 ml-1' body>
          <Button.Ripple tag={Label} className='mr-75' size='sm' color='primary'>
            Upload
            <Input type='file' onChange={onChange} hidden accept='image/*' />
          </Button.Ripple>
          <Button.Ripple color='secondary' size='sm' type="button" onClick={()=>setAvatar(setCustomProfileAvatar(data?.image,data?.social_image))} outline>
            Reset
          </Button.Ripple>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </Media>
      </Media> */}
      <Form className='mt-2' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          
          <Col sm='6'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                defaultValue={data?.name}
                control={control}
                as={Input}
                id='name'
                name='name'
                placeholder='Name'
                // innerRef={register({ required: true })}
                onChange={e => setValue('name', e.target.value)}
                className={classnames({
                  'is-invalid': errors?.name
                })}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Input
                defaultValue={data?.email}
                control={control}
                as={Input}
                type='email'
                id='email'
                name='email'
                disabled={true}
                placeholder='Email'
              />
            </FormGroup>
          </Col>
          
          {/* <Col className='mt-75' sm='12'>
            <Alert className='mb-50' color='warning'>
              <h4 className='alert-heading'>Your email is not confirmed. Please check your inbox.</h4>
              <div className='alert-body'>
                <a href='/' className='alert-link' onClick={e => e.preventDefault()}>
                  Resend confirmation
                </a>
              </div>
            </Alert>
          </Col> */}
          <Col className='mt-2' sm='12'>
            <Button.Ripple type='submit' className='mr-1'  color='primary'>
              Save changes
            </Button.Ripple>
            <Button.Ripple color='secondary' outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  )
}

export default GeneralTabs
