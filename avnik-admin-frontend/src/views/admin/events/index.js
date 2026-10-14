// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

const Events = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Events' breadCrumbParent='Admin' breadCrumbActive='Events' />
      <Card>
        <CardBody>
          <p className='mb-0'>Events management is not available in this build.</p>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Events
