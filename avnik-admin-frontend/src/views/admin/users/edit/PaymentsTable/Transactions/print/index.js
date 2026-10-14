// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import { Row, Col, Table } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import moment from 'moment'
// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import { useParams } from 'react-router-dom';
import { APIService } from '../../../../../Api/APIService';

const Print = () => {
  const { id } = useParams();
  const [data, setData] = useState(null)
  // ** Print on mount
  
    useEffect(() => {
      APIService.userPracPayment({paymentId:id}).then(response => {
        if(response.data.status==200);
        setData(response.data.data)
        window.print();
      })
    }, [])
  
  // useEffect(() => window.print(), [])
console.log(data,id)
  return (
    <div className='invoice-print p-3'>
      <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
        <div>
          <div className='d-flex mb-1'>
          <img className="round" src={themeConfig.app.appLogoImage} alt="avatar" height="30" width="30"/>
            <h3 className='text-primary font-weight-bold ml-1'>Avnik</h3>
          </div>
          <p className='mb-25'>Office 149, 450 South Brand Brooklyn</p>
          <p className='mb-25'>San Diego County, CA 91905, USA</p>
          <p className='mb-0'>+1 (123) 456 7891, +44 (876) 543 2198</p>
        </div>
        <div className='mt-md-0 mt-2'>
  <h4 className='font-weight-bold text-right mb-1'>INVOICE #Lib-{id}</h4>
  <h4 className='font-weight-bold text-right mb-1'>Transaction ID {data?.stripe_id}</h4>
          <div className='invoice-date-wrapper mb-50'>
            <span className='invoice-date-title'>Date Issued:</span>
            <span className='font-weight-bold'> {moment(data?.createAt).format('d MMM, YYYY')}</span>
          </div>
        </div>
      </div>

      <hr className='my-2' />

      <Row className='pb-2'>
        <Col sm='6'>
          <h6 className='mb-1'>Invoice From:</h6>
          <p className='mb-25'>{data?.fromUser?.name}</p>
          <p className='mb-0'>{data?.fromUser?.email}</p>
          <p className='mb-25'>{data?.fromUser?.phone}</p>

        </Col>
        {/* <Col className='mt-sm-0 mt-2' sm='6'>
          <h6 className='mb-1'>Payment Details:</h6>
          <table>
            <tbody>
              <tr>
                <td className='pr-1'>Bank name:</td>
                <td>American Bank</td>
              </tr>
              <tr>
                <td className='pr-1'>Country:</td>
                <td>United States</td>
              </tr>
              <tr>
                <td className='pr-1'>IBAN:</td>
                <td>ETD95476213874685</td>
              </tr>
              <tr>
                <td className='pr-1'>SWIFT code:</td>
                <td>BR91905</td>
              </tr>
            </tbody>
          </table>
        </Col> */}
      </Row>

      <Table className='mt-2 mb-0' responsive>
        <thead>
          <tr>
            <th className='py-1 pl-4'>Task description</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1 pl-4'>
              <p className='font-weight-semibold mb-25'>{data?.type}</p>
              {/* <p className='text-muted text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap & Python
              </p> */}
            </td>
            <td className='py-1'>
              <strong>${data?.amount}</strong>
            </td>
          </tr>
        </tbody>
      </Table>

      <Row className='invoice-sales-total-wrapper mt-3'>
        <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
          <p className='mb-0'>
            <span className='font-weight-bold'>Salesperson:</span> <span className='ml-75'>{data?.user?.name}</span>
          </p>
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

      <hr className='my-2' />

      <Row>
        <Col sm='12'>
          <span className='font-weight-bold'>Note:</span>
          <span>
            It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
            projects. Thank You!
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default Print
