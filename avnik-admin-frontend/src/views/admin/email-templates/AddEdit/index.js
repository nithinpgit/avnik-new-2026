import { useState, useEffect } from 'react'
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, Button, CardHeader, Row, Col, CarouselCaption, Form, Input, Label, FormGroup, CardTitle, CardBody } from 'reactstrap'
// import '@styles/react/libs/editor/editor.scss'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useParams, Navigate } from 'react-router-dom'
import { APIService } from '../../../../Api/APIService'
import { toast, Slide } from 'react-toastify'
const TemplateEditor = () => {
  const [value, setValue] = useState(EditorState.createEmpty())
  const [TempDetail, setTempDetail] = useState({})
  const [subject, setSubject] = useState('')
  const [emailType, setEmailType] = useState('')
  const [body, setBody] = useState(convertFromHTML(''))
  const [processs, setprocesss] = useState(false)
  const [error, setError] = useState({ subject: false, body: false, id: false })
  const [redirect, setRedirect] = useState(false)
  const [update, setUpdate] = useState(false)
  const { id } = useParams()

  const Types = [
  {
    value: "Registration",
    label: "Registration"
  },
  {
    value: "EmailConfirmation",
    label: "Email confirmation"
  },
  {
    value: "WelcomeEmail",
    label: "Welcome Email"
  },
  {
    value: "ForgotPassword",
    label: "Forgot Password"
  }
  ]
  useEffect(() => {
    
    setRedirect(false);
    if(id){
      setUpdate(true);
      getTemplateDetails();
    }
    return;
  }, [id])

  const onChangeEditor=(data)=>{
    setValue(data);
    setBody(data);
  }



  const getTemplateDetails = () => {
    if (parseInt(id)) {
      APIService.templateDetail({ id: id }).then((res) => {
        setUpdate(true);
        if (res.data.status == 200) {
          
          if (typeof res.data.data == 'object') {
            setSubject(res.data.data?.subject)
            setBody(res.data.data?.body);
            setEmailType(res.data.data?.type)
            setValue(res.data.data.body);
            setTempDetail(res.data.data);
          }
        } else {
          toast.success(
            res.data.message,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
      }).catch((error) => {
        setUpdate(true);
        console.log(error)
      })
    }
  }
  console.log(body,value);
  const addTemplateDetails = () => {
    // if(validation()){
    setprocesss(true)
    let data = { subject, body ,type:emailType};
    APIService.addTemplate(data).then((res) => {
      setprocesss(false)
      if (res.data.status == 200) {
        setRedirect(true);
        toast.success(
          res.data.message,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      } else {
        toast.error(
          res.data.message,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
    }).catch((error) => {
      setprocesss(false)
      console.log(error)
    })
    //  }

  }
  const UpdateTemplateDetails = () => {
    if (validation()) {
      setprocesss(true)
      let data = { id, subject, body,type:emailType };
      APIService.updateTemplate(data).then((res) => {
        setprocesss(false)
        if (res.data.status == 200) {
          setRedirect(true);
          toast.success(
            res.data.message,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        } else {
          toast.error(
            res.data.message,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        }
      }).catch((error) => {
        setprocesss(false)
        console.log(error)
      })
    }
  }
  const validation = () => {
    let condition = true;
    if (!subject) {
      condition = false;
      setError({ subject: true, body: false, id: false });
      toast.error(
        'Subject is required',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }
    if (!body) {
      setError({ subject: false, body: true, id: false });
      toast.error(
        'Template content is required',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      condition = false;
    }
    if (!id) {
      setError({ subject: false, body: false, id: true });
      toast.error(
        'ID is required',
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      condition = false;
    }
    return condition;
  }

  if (redirect) {
    return (<Navigate to="/email-templates" />)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          Email Template Editor
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm='8' md='8'>
            <FormGroup>
              <Label for='subject'>Subject <span className="text-danger">*</span></Label>
              <Input type='text' placeholder='Subject' className={error?.subject ? 'is-invalid' : ''} onChange={(e) => setSubject(e.target.value)} value={subject} />
            </FormGroup>
          </Col>
          <Col sm='4' md='4'>
            <FormGroup>
              <Label for='type'>Template Type <span className="text-danger">*</span></Label>
              <select className="form-control" onChange={(e)=>setEmailType(e.target.value)} value={emailType}>
                <option selected={true} disabled={true}>Choose Type</option>
                  {Types?.map((res,i)=><option key={i} value={res.value}>{res.label}</option>)}
              </select>
            </FormGroup>
          </Col>
          <Col sm='12' md='12'>
          <ReactQuill theme="snow" value={value} onChange={onChangeEditor} />
            {/* <Editor
              editorState={value}
              onEditorStateChange={onChangeEditor}
               colorPicker={{
                 icon: undefined,
                 className: undefined,
                 component: undefined,
                 popupClassName: undefined,
                 colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                   'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                   'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                   'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                   'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                   'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
               }}
            /> */}

          </Col>


        </Row>
        <Row>
          <div className="flex-sm-row flex-column mt-2 col-sm-12 ">
          <FormGroup className="float-right">
              <button type="button" className="waves-effect btn btn-outline-secondary mr-1">Cancel</button>

              <button type="button" onClick={update ? UpdateTemplateDetails:addTemplateDetails}  className="waves-effect mb-1 mb-sm-0 mr-0 mr-sm-1 btn btn-primary" disabled={subject&&body? false :true}>{
                processs ? <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span></> : 'Save'}</button>
            </FormGroup>
          </div>
        </Row>
      </CardBody>

    </Card>
  )
}

export default TemplateEditor
