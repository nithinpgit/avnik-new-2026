// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'

// ** Tables
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'
import { Calendar, Info, Users } from 'react-feather'
import { APIService } from '../../../Api/APIService'

const Tables = () => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1')
  const [reports, setReports] = useState([])
  const [preloader, setPreloader] = useState(false)
  // ** Function to toggle tabs
  const toggle = tab => setActiveTab(tab)
  const getUserReports=()=>{
    setPreloader(true)
    APIService.adminUserReport().then((res)=>{
      setPreloader(false)
      if(res.data.status==200){
        setReports(res.data.data);
        }
    }).catch((error)=>{
      console.log(error)
      setPreloader(false)
    })

  }
  const getEventsReports=()=>{
    setPreloader(true)
    APIService.adminEventReport().then((res)=>{
      setPreloader(false)
      if(res.data.status==200){
        setReports(res.data.data);
        }
    }).catch((error)=>{
      console.log(error)
      setPreloader(false)
    })

  }
  // ** Function to get user on mount
  useEffect(() => {
    if(activeTab==='1'){
      getUserReports();
    }else if(activeTab==='2'){
      getEventsReports()
    }
    
    return()=>{
        setReports([]);
    }
    
  }, [activeTab])
  const ReportsToggle = async row => {
    try {
      const nextStatus = Number(row?.status) === 0 ? 1 : 0
      const request = {
        id: row?.id,
        status: nextStatus
      }
      const res = await APIService.reportsToggle(request)

      if (res.data.status === 200) {
        const updatedRow = {
          ...row,
          status: nextStatus
        }

        setReports(prev =>
          prev.map(item => (item?.id === row?.id ? { ...item, status: nextStatus } : item))
        )

        return updatedRow
      }
    } catch (error) {
      console.log(error)
    }

    return null
  }
  return preloader?<ComponentSpinner/>:(<>
    <Breadcrumbs  title='Reports' breadCrumbParent='Admin' breadCrumbActive='Reports' />
<Row className='app-user-edit'>
      <Col sm='12'>
        <Card className='reports-card'>
          <CardBody className='pt-2 reports-card-body'>
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                  <Users size={14} />
                  <span className='align-middle d-none d-sm-block'>User Reports</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggle('2')}>
                  <Calendar size={14} />
                  <span className='align-middle d-none d-sm-block'>Event Reports</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <TableWithButtons data={reports} ReportsToggle={ReportsToggle}/>
              </TabPane>
              <TabPane tabId='2'>
                <TableWithButtons data={reports} ReportsToggle={ReportsToggle}/>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row></>
  )
  //  : (
  //   <Alert color='danger'>
  //     <h4 className='alert-heading'>report not found</h4>
  //     <div className='alert-body'>
  //         No Reports Found
  //     </div>
  //   </Alert>
  // )
}

export default Tables
