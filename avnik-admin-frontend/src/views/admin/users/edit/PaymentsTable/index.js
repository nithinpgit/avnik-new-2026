// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const PaymentsTables = ({selectedUser,activeTab}) => {
  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableWithButtons selectedUser={selectedUser} activeTab={activeTab} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default PaymentsTables
