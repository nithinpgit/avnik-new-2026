// ** React Imports
import { Fragment, useEffect, useState } from 'react'
// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { APIService } from '../../../../../Api/APIService'
import { useParams } from 'react-router-dom'

const EventTable = ({selectedUser}) => {

  return (
    <Fragment>
      <Row>
        <Col sm='12'>
          <TableWithButtons selectedUser={selectedUser} />
        </Col>
      </Row>
    </Fragment>
  )
}

export default EventTable
