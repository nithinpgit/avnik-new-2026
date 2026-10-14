// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
// ** Custom Components
import Avatar from '@components/avatar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, MoreVertical, Edit, Trash, Share, Printer, FileText, File, Grid, Copy, Plus, Search, ArrowUpRight, ArrowDownLeft } from 'react-feather'
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
  // InputGroupAddon,
  Badge,
  Row,
  Col
} from 'reactstrap'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import {APIService} from '../../../../../Api/APIService'
import { setCustomProfileAvatar } from '../../../../../Api/utility'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className='custom-control custom-checkbox'>
    <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    <label className='custom-control-label' onClick={onClick} />
  </div>
))
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const status = {
  0: { title: 'Completed', color: 'light-success' },
  1: { title: 'Refunded', color: 'light-primary' },
  2: { title: 'Withdrawn', color: 'light-success' },
  3: { title: 'Cancelled', color: 'light-danger' },
  4: { title: 'Released', color: 'light-secondary' },
  5: { title: 'Pending', color: 'light-warning' },
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

const DataTableWithButtons = ({selectedUser,activeTab}) => {
  const NoApi=(e,msg)=>{
    e.preventDefault();  
    alert(msg)
  }
  // ** Table Common Column
  const columns = [
    {
        name: 'TRANSACTION',
        selector: row => row?.user?.name,
        sortable: true,
        minWidth: '250px',
        cell: row => (
          <div className='d-flex align-items-center'>
            {selectedUser?.id===row.from?<div className="avatar avatar-status bg-light-danger">
              <span className="avatar-content">
              <ArrowUpRight size={15}/>
              </span>
            </div>:
            <div className="avatar avatar-status bg-light-success">
              <span className="avatar-content">
              <ArrowDownLeft size={15}/>
              </span>
            </div>}
            
            <div className='user-info text-truncate ml-1'>
              <span className='d-block font-weight-bold text-truncate'>{row.user.name}</span>
              {/* <small>{row?.post}</small> */}
            </div>
          </div>
        )
      },
    {
      name: 'Date & Time',
      selector: row => getPaymentDateTime(row),
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Amount',
      selector: row =><div className={`fw-bolder text-${selectedUser?.id===row.from?'danger':'success'}`}>{selectedUser?.id===row.from?'-':'+'}${row.amount}</div>,
      sortable: true,
      minWidth: '150px'
    },
    // {
    //   name: 'TRANSACTIONS',
    //   selector: row => <Link to={`/payments/transaction/${row.id}`}>{row.stripe_id}</Link>,
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
          <Badge color={status[row.status === "Pending" ? 5 : row.status === "Refunded" ? 1 : row.status === "Cancelled" ? 3 : row.status === "Released" ? 4 : row.status === "Withdrawn" ? 2 :row.status === "Completed" ? 0:0].color} pill>
          {status[row.status === "Pending" ? 5 : row.status === "Refunded" ? 1 : row.status === "Cancelled" ? 3 : row.status === "Released" ? 4 : row.status === "Withdrawn" ? 2 : row.status === "Completed" ? 0:0].title}
        </Badge>
        )
      }
    },
    // {
    //   name: 'Actions',
    //   allowOverflow: true,
    //   cell: row => {
    //     return (
    //       <div className='d-flex'>
    //         <UncontrolledDropdown>
    //           {/* <DropdownToggle className='pr-1' tag='span'>
    //             <MoreVertical size={15} />
    //           </DropdownToggle>
    //           <DropdownMenu right> */}
    //             {/* <DropdownItem tag={Link}  to={`/users/edit/invoice/${row.id}`} className='w-100'>
    //               <Edit size={15} />
    //               <span className='align-middle ml-50'>View Invoice</span>
    //             </DropdownItem> */}
    //             {/* {selectedUser?.id!=row.from?<>
    //             <DropdownItem tag='a' href='/' className='w-100' onClick={e => NoApi(e,'no API')}>
    //               <Edit size={15} />
    //               <span className='align-middle ml-50'>Hold</span>
    //             </DropdownItem>
    //             <DropdownItem tag={Link} disabled={row.status === "Withdrawn"?true:false} to='/' className='w-100' onClick={(e) => ReleasePayment(e, row.id)}>
    //               <Edit size={15} />
    //               <span className='align-middle ml-50'>Release</span>
    //             </DropdownItem>
    //             <DropdownItem tag='a' href='/' className='w-100' onClick={e =>NoApi(e,'no API')}>
    //               <Trash size={15} />
    //               <span className='align-middle ml-50'>Refund</span>
    //             </DropdownItem></>: */}
    //           {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e =>NoApi(e,'no API')}>
    //             <Trash size={15} />
    //             <span className='align-middle ml-50'>Refund</span>
    //           </DropdownItem> */}
    //           {/* } */}
    //            {/* </DropdownMenu> */}
              
    //         </UncontrolledDropdown>

    //       </div>
    //     )
    //   }
    // }
  ]
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [limit, setLimit] = useState(20)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [TableData, setTableData] = useState([])
const {id}=useParams();
  useEffect(() => {
    getAllPayments();
  }, [id])
  // ** Function to handle fetch all Payment
  const getAllPayments = () => {
    APIService.allPractitionerPayments({page:currentPage,prac_id:id,limit:limit}).then((res) => {
      if (res.data.status == 200) {
        setTableData(res.data.data);
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  // ** Function to handle Release Payment
  const ReleasePayment = (e, id) => {
    e.preventDefault();
    let data = {
      paymentId: id
    }
    APIService.releasePayment(data).then((res) => {
      if (res.data.status == 200)
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
          item.user.name.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.user.name.toLowerCase().includes(value.toLowerCase())

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
              {/* <InputGroupAddon addonType='prepend'>*/}
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
             {/* </InputGroupAddon> */}
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
            {/* <UncontrolledButtonDropdown>
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
            </UncontrolledButtonDropdown> */}
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
    </Fragment>
  )
}

export default DataTableWithButtons
