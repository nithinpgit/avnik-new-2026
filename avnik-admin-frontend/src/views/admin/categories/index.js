// ** React Imports
import { useState, useEffect, useReducer } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Category Components

import Categories from './Categories'

// ** Store & Actions

import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import { User, Info, Share2, MessageSquare, CreditCard, Briefcase, Star } from 'react-feather'
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-users.scss'
import CategoryContext from './store/context/CategoryContext'
import categories, {initialState} from './store/reducer/index.js'

const UserEdit = () => {
  const [state, dispatch] = useReducer(categories, initialState)
  // ** States & Vars
  const [activeTab, setActiveTab] = useState('1'),
    // store = useSelector(state => state.categories)
    // dispatch = useDispatch(),
    { id } = useParams()
  // ** Function to toggle tabs
  const toggle = tab => setActiveTab(tab)


  return (
    <CategoryContext.Provider value={[state, dispatch]}>

    <Row className='app-user-edit'>
      <Col sm='12'>
        <Card>
          <CardBody className='pt-2'>
            
                <Categories   />
          
          </CardBody>
        </Card>
      </Col>
    </Row>
  </CategoryContext.Provider>  
  ) ;
  // : (
  //   <Alert color='danger'>
  //     <h4 className='alert-heading'>Categories not found</h4>
  //     <div className='alert-body'>
  //       User with id: {id} doesn't exist. Check list of all Categories: <Link to='/customers'>Customers List</Link>
  //     </div>
  //   </Alert>
  // )
}
export default UserEdit
