// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

const Support = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Help & Support' breadCrumbParent='Admin' breadCrumbActive='Messages' />
      <Card>
        <CardBody>
          <p className='mb-0'>Support messaging is not available in this build.</p>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Support
