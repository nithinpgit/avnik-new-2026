import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import axios from 'axios'
import InfoTabContent from './InfoTabContent'
import Breadcrumbs from '@components/breadcrumbs'
import SocialTabContent from './SocialTabContent'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import NotificationsTabContent from './NotificationsTabContent'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
import { APIService } from '../../../Api/APIService'
import { toast } from 'react-toastify'

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
const updateProfilePicture =(file)=>{
  
  let data= new FormData();
  data.append('image',file[0])
  APIService.updateProfilePicture(data)
  .then((res) =>{
    if(res.data.status==200){
      getAuthUser();
      toast.success(res.data.message);
    }else{
      getAuthUser();
      toast.error(res.data.message);
    }
  }).catch(error=>console.log(error));
}
  useEffect(() => {
    getAuthUser();
    return;
  }, [])
  const getAuthUser = () => {
    APIService.UserProfile()
    .then((res) =>{
      if(res.data.status==200){
        const authResData ={...res.data.data,ability:[{"action":"manage","subject":"all"}]}
        localStorage.setItem('_user', JSON.stringify(authResData));
       setData(res.data.data);
      }
    }).catch(error=>console.log(error))
  }

  return (
    <Fragment>
      <Breadcrumbs title='Account Settings' breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      {data !== null ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='1'>
                    <GeneralTabContent data={data} getAuthUser={getAuthUser} UploadFile={updateProfilePicture}/>
                  </TabPane>
                  <TabPane tabId='2'>
                    <PasswordTabContent />
                  </TabPane>
                  {/* <TabPane tabId='3'>
                    <InfoTabContent data={data.info} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <SocialTabContent data={data.social} />
                  </TabPane>*/}
                  <TabPane tabId='5'>
                    <NotificationsTabContent data={data.notification} />
                  </TabPane> 
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  )
}

export default AccountSettings
