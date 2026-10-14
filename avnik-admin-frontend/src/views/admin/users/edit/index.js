// ** React Imports
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** User Edit Components

import AccountTab from './Account'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2, Calendar, CreditCard } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import EventTable from './EventsTable'
import PaymentsTables from './PaymentsTable'

const UserEdit = () => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1'),
    store = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams()
  // ** Function to toggle tabs
  const toggle = tab => setActiveTab(tab)
  // ** Function to get user on mount
  useEffect(() => {
    console.log("🔥 DISPATCHING getUser with ID:", id)
    dispatch(getUser(parseInt(id)))
  }, [id])
console.log(store,'user')
  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => toggle('1')}>
                  <User size={14} />
                  <span className='align-middle d-none d-sm-block'>Account</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => toggle('2')}>
                  <Calendar size={14} />
                  <span className='align-middle d-none d-sm-block'>Events</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => toggle('3')}>
                  <CreditCard size={14} />
                  <span className='align-middle d-none d-sm-block'>Payments</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink active={activeTab === '4'} onClick={() => toggle('4')}>
                  <Info size={14} />
                  <span className='align-middle d-none d-sm-block'>Storage</span>
                </NavLink>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <AccountTab selectedUser={store.selectedUser} getUser={getUser} dispatch={dispatch} />
              </TabPane>
              <TabPane tabId='2'>
                <EventTable selectedUser={store.selectedUser}  />
              </TabPane>
              <TabPane tabId='3'>
                <PaymentsTables selectedUser={store.selectedUser} getUser={getUser} dispatch={dispatch} />
              </TabPane>
              <TabPane tabId='4'>
                <AccountTab selectedUser={store.selectedUser} getUser={getUser} dispatch={dispatch} />
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/users'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserEdit
