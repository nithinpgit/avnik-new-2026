// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Edit, Trash, Share, Printer, FileText, File, Grid, Copy, Plus, Search } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  UncontrolledDropdown,
  Badge,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { APIService } from '../../../Api/APIService'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  1: { title: 'Refunded', color: 'light-primary' },
  2: { title: 'Withdrawn', color: 'light-success' },
  3: { title: 'Awaiting', color: 'light-danger' },
  4: { title: 'Released', color: 'light-secondary' },
  5: { title: 'Completed', color: 'light-warning' },
}

const getPaymentDateTime = row => {
  const paymentDate =
    row?.createdAt ||
    row?.createAt ||
    row?.created_at ||
    row?.updatedAt ||
    row?.updated_at ||
    row?.date

  if (!paymentDate) return '-'

  const formattedDate = moment(paymentDate)
  return formattedDate.isValid() ? formattedDate.format('D MMM, YYYY h:mm A') : '-'
}

const DataTableWithButtons = () => {
  const NoApi=(e,msg)=>{
    e.preventDefault() 
    alert(msg)

  }
  const [Amount, setAmount] = useState(0)
  const [refundedAmount, setrefundedAmount] = useState(0)
  const [refundedPaymentId, setrefundedPaymentId] = useState('')
  const [refundedDescription, setrefundedDescription] = useState('')
  const [refundedPercentage, setrefundedPercentage] = useState(100)
  const [fullAmount, setfullAmount] = useState(0)
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [releaseModal, setReleaseModal] = useState(false)
  const releaseToggle = () => setReleaseModal(!releaseModal)

  const changeUnmountOnClose = (e) => {
    let { value } = e.target
    setUnmountOnClose(JSON.parse(value))
  }
  const refundAmountModal = (e,id, amount) => {
    e.preventDefault()
    setModal(true)
    setAmount(amount)
    setrefundedAmount(amount)
    setrefundedPaymentId(id)
}
const setfullAmountFun = (se) => {
    setfullAmount(se)
    setAmount(refundedAmount)
}
const refundModalOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === "refundedPercentage") {
        setAmount((refundedAmount * value) / 100)
    }
    if (name === "refundedDescription") {
      setrefundedDescription(value)
    } else if (name === "refundedPercentage") {
      setrefundedPercentage(value)
    }
}
const handleRefundSubmit = (e) => {
    e.preventDefault()
    const data = {
        paymentId:refundedPaymentId,
        percentage:refundedPercentage,
        description:refundedDescription
        // tz: moment.tz.guess(),
    }
    APIService.userPaymentRefund(data)
        .then((res) => {
            if (res?.data?.status === 200) {
                toastr["success"]("refund amount successfully")
            } else {
                toastr["error"]("refund amount failed")
            }
            setModal(false)
        })
        .catch((error) => {
            setModal(false)
        })
}
  // ** Table Common Column
  const columns = [
    {
      name: 'From',
      selector: row => row.sender.name,
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'To.',
      selector: row => row.receiver.name,
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Date & Time',
      selector: row => getPaymentDateTime(row),
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Amount',
      selector: row => `$${row.amount}`,
      sortable: true,
      minWidth: '150px'
    },
    // {
    //   name: 'TRANSACTIONS',
    //   selector: row => <Link to={void(0)}>{row?.stripe_id}</Link>,
    //   sortable: true,
    //   minWidth: '150px'
    // },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      minWidth: '150px',
      cell: row => {
        return (
          <Badge color={status[row?.amount_refunded ? 1 : row.withdraw_amount ? 5 : row.released && !row.withdraw_amount && !row?.amount_refunded ? 4 : 3].color} pill>
            {/* {status[row?.amount_refunded ? 1 : row.withdraw_amount ? 5 : row.released && !row.withdraw_amount && !row?.amount_refunded ? 4 : 3].title} */}
            {row.amount_refunded ? row.refunded_percentage > 0 && row.refunded_percentage < 75 ? `${status[3].title} (${row.refunded_percentage}% ${status[1].title})` : status[1].title : row.withdraw_amount ? status[5].title : status[row.released && !row.withdraw_amount && !row?.amount_refunded ? 4 : 3].title}
          </Badge>
        )
      }
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <UncontrolledDropdown>
              <DropdownToggle className='pr-1' tag='span'>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link}  to={`/payments/invoice/${row.id}`} className='w-100'>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>View Invoice</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => NoApi(e, 'No feature available')}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Hold</span>
                </DropdownItem>
                <DropdownItem tag={Link} disabled={row?.released ? true : false} to='/' className='w-100' onClick={(e) => confirm('Are you sure?') ? ReleasePayment(e, row.id) :""}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Release</span>
                </DropdownItem>
                <DropdownItem tag='a' href='#' disabled={row?.amount_refunded} className='w-100' onClick={e => refundAmountModal(e, row?.id, row?.amount)}>
                  <Trash size={15} />
                  <span className='align-middle ml-50'>Refund</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

          </div>
        )
      }
    }
  ]
  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [limit, setLimit] = useState(100)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [TableData, setTableData] = useState([])

  useEffect(() => {
    getAllPayments();
  }, [])
  // ** Function to handle fetch all Payment
  const getAllPayments = () => {
    APIService.allPayments({ page: currentPage ,limit:limit}).then((res) => {
      if (res.data.status == 200) {
        setTableData(res.data.data);
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  // ** Function to handle Release Payment
  const handleReleaseSubmit = () => {
  
  }
  const ReleasePayment = (e, id) => {
    e.preventDefault();
    let data = {
      payment_id: id
    }
    APIService.releasePayment(data).then((res) => {
      if (res.data.status === 200)
      // ** Recall the fetch all Payment function
        getAllPayments();
    }).catch((error) => {
      console.log(error);
    })
  }
  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = TableData.filter(item => {
        const startsWith =
          // item.sender.name.toLowerCase().startsWith(value.toLowerCase())||
          item.receiver?.name.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          // item.sender.name.toLowerCase().includes(value.toLowerCase())||
          item.receiver?.name.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / limit : TableData.length / limit || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousClassName='page-item prev'
      previousLinkClassName='page-link'
      pageLinkClassName='page-link'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(TableData[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='div'>
          
            <InputGroup className='input-group-merge'>
            <div className="input-group-append">
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
              </div>
              <Input
                className='dataTable-filter '
                type='text'
                bsSize='md'
                id='search-input'
                placeholder="Search"
                value={searchValue}
                onChange={handleFilter}
              />
            </InputGroup>
          </CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ml-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ml-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(TableData)}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid size={15} />
                  <span className='align-middle ml-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File size={15} />
                  <span className='align-middle ml-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy size={15} />
                  <span className='align-middle ml-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {/* <Button className='ml-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ml-50'> Add New User</span>
            </Button> */}
          </div>
        </CardHeader>
        
        <DataTable
          hover
          noHeader
          pagination
          columns={columns}
          paginationPerPage={limit}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : TableData}
        />
      </Card>
      <RefundedAmountModal
                handleSubmit={handleRefundSubmit}
                fullAmount={fullAmount}
                setfullAmount={setfullAmountFun}
                refundedPercentage={refundedPercentage}
                amount={Amount}
                toggle={toggle}
                modal={modal}
                changeUnmountOnClose={changeUnmountOnClose}
                refundedDescription={refundedDescription}
                onChange={refundModalOnChange}
            />
      <ReleasedAmountModal
                handleSubmit={handleReleaseSubmit}
                toggle={releaseToggle}
                modal={releaseModal}
            />
    </Fragment>
  )
}

export default DataTableWithButtons

const ReleasedAmountModal = (props) => {
  return (
      <>
       <Modal isOpen={props.modal} toggle={props?.toggle} unmountOnClose={props?.unmountOnClose}>
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <form onSubmit={props.handleSubmit}>
                        <ModalBody>
              
                          <div className="modal-header">
                              <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                              >
                                  <span aria-hidden="true">
                                      <i className="av av-close-icon"></i>
                                  </span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <div className="message-m-box">
                                  <div className="row">
                                   <div className="col-sm-6 col-md-6">
                                          <div className="form-group">
                                              Are you sure ?
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                     
          </ModalBody>
        <ModalFooter>
          <Button color="seconde" className="btn default-btn" onClick={props.toggle} type="button">
              No
          </Button>
          <Button color="primary" className="btn default-btn" type="submit">
              Yes
          </Button>
        </ModalFooter>
        </form>
            </div>
        </div>
      </Modal>
      </>
  )
}

const RefundedAmountModal = (props) => {
  return (
      <>
       <Modal isOpen={props.modal} toggle={props?.toggle} unmountOnClose={props?.unmountOnClose}>
        {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
        <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <form onSubmit={props.handleSubmit}>
                        <ModalBody>
              
                          <div className="modal-header">
                              <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                              >
                                  <span aria-hidden="true">
                                      <i className="av av-close-icon"></i>
                                  </span>
                              </button>
                          </div>
                          <div className="modal-body">
                              <div className="message-m-box">
                                  <div className="row">
                                      <div className="col-sm-6 col-md-6">
                                          <div className="form-group">
                                              <label
                                                  className="form-label"
                                                  for="CardNumber"
                                              >
                                                  Full Amount
                                              </label>
                                              <Input
                                                  type="radio"
                                                  className="form-check-input"
                                                  onChange={(e) =>
                                                      props.setfullAmount(
                                                          e.target.value
                                                      )
                                                  }
                                                  value={0}
                                                  checked={
                                                      props?.fullAmount == 0
                                                          ? true
                                                          : false
                                                  }
                                              />
                                          </div>
                                      </div>
                                      <div className="col-sm-6 col-md-6">
                                          <div className="form-group">
                                              <label
                                                  className="form-label"
                                                  for="CardNumber"
                                              >
                                                  Custom Amount
                                              </label>
                                              <Input
                                                  type="radio"
                                                  className="form-check-input"
                                                  onChange={(e) =>
                                                      props?.setfullAmount(
                                                          e.target.value
                                                      )
                                                  }
                                                  value={1}
                                                  checked={
                                                      props.fullAmount == 1
                                                          ? true
                                                          : false
                                                  }
                                              />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      {props.fullAmount == 1 ? (
                                          <div className="col-sm-6 col-md-6">
                                              <ul className="list-group">
                                                  <li className="list-group-item">
                                                      <Input
                                                          type="radio"
                                                          className="form-check-input"
                                                          value="25"
                                                          onChange={
                                                              props.onChange
                                                          }
                                                          name="refundedPercentage"
                                                      />
                                                      <label
                                                          className="form-label"
                                                          for="CardNumber"
                                                      >
                                                          25%
                                                      </label>
                                                  </li>
                                                  <li className="list-group-item">
                                                      <Input
                                                          type="radio"
                                                          onChange={
                                                              props.onChange
                                                          }
                                                          className="form-check-input"
                                                          value="50"
                                                          name="refundedPercentage"
                                                      />
                                                      <label
                                                          className="form-label"
                                                          for="CardNumber"
                                                      >
                                                          50%
                                                      </label>
                                                  </li>
                                                  <li className="list-group-item">
                                                      <Input
                                                          type="radio"
                                                          onChange={
                                                              props.onChange
                                                          }
                                                          className="form-check-input"
                                                          value="75"x
                                                          name="refundedPercentage"
                                                      />
                                                      <label
                                                          className="form-label"
                                                          for="CardNumber"
                                                      >
                                                          75%
                                                      </label>
                                                  </li>
                                              </ul>
                                          </div>
                                      ) : (
                                          ""
                                      )}
                                      <div
                                          className={`col-sm-${
                                              props.fullAmount == 0
                                                  ? "12"
                                                  : "6"
                                          } col-md-${
                                              props.fullAmount == 0
                                                  ? "12"
                                                  : "6"
                                          }`}
                                      >
                                          <div className="input-group">
                                              <div class="input-group-prepend">
                                                  <span
                                                      class="input-group-text"
                                                      id="basic-addon1"
                                                  >
                                                      $
                                                  </span>
                                              </div>
                                              <Input
                                                  type="text"
                                                  className="form-control"
                                                  value={props.amount}
                                                  readOnly={true}
                                                  disabled={true}
                                              />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row mt-5">
                                      <div className={`col-sm-12 col-md-12`}>
                                          <div className="form-group">
                                              <textarea
                                                  type="textarea"
                                                  className="form-control"
                                                  onChange={props.onChange}
                                                  placeholder="reason for refund"
                                                  rows="4"
                                                  cols="50"
                                                  name="refundedDescription"
                                                  value={
                                                      props.refundedDescription
                                                  }
                                              ></textarea>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                     
          </ModalBody>
        <ModalFooter>
          <Button color="primary" className="btn default-btn" type="submit">
              REFUND
          </Button>
        </ModalFooter>
        </form>
            </div>
        </div>
      </Modal>
      </>
  )
}