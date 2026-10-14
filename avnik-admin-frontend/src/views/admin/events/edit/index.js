// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

const EventSlots = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Event Slots' breadCrumbParent='Events' breadCrumbActive='Slots' />
      <Card>
        <CardBody>
          <p className='mb-0'>Event slot management is not available in this build.</p>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default EventSlots
