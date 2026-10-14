// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import moment from 'moment'
const PreviewCard = ({ data }) => {
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper'>
            <img className="round" src={themeConfig.app.appLogoImage} alt="avatar" height="30" width="30"/>
              <h3 className='text-primary invoice-logo'>Avnik</h3>
            </div>
            <CardText className='mb-25'>Office 149, 450 South Brand Brooklyn</CardText>
            <CardText className='mb-25'>San Diego County, CA 91905, USA</CardText>
            <CardText className='mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</CardText>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              Invoice <span className='invoice-number'>#Lib-{data?.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Date Issued:</p>
              <p className='invoice-date'>{moment(data.createdAt).format('d MMM, YYYY')}</p>
            </div>
          </div>
        </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      {/* Address and Contact */}
      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.user?.name}</h6>
            <CardText className='mb-25'>{data.user?.email}</CardText>
            <CardText className='mb-25'>{data.user?.phone}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Bank name:</td>
                  <td>TEST BANK</td>
                </tr>
                <tr>
                  <td className='pr-1'>Country:</td>
                  <td>INDIA</td>
                </tr>
                <tr>
                  <td className='pr-1'>IBAN:</td>
                  <td>123SHGAD</td>
                </tr>
                <tr>
                  <td className='pr-1'>SWIFT code:</td>
                  <td>765</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>Task description</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1'>
              <p className='card-text font-weight-bold mb-25'>{data?.type}</p>
              {/* <p className='card-text text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap & Python
              </p> */}
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>${data?.amount}</span>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
            {/* <CardText className='mb-0'>
              <span className='font-weight-bold'>Salesperson:</span> <span className='ml-75'>Alfie Solomons</span>
            </CardText> */}
          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
             
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>${data?.amount}</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='font-weight-bold'>Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
