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
  Col
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
  3: { title: 'Cancelled', color: 'light-danger' },
  4: { title: 'Released', color: 'light-secondary' },
  5: { title: 'Pending', color: 'light-warning' },
}

const DataTableWithButtons = () => {
  const NoApi=(e,msg)=>{
    e.preventDefault();  
    alert(msg)
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
      selector: row => moment(row.createdAt).format('D MMM, YYYY h:m A'),
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
          <Badge color={status[row.status === "Pending" ? 5 : row.status === "Refunded" ? 1 : row.status === "Cancelled" ? 3 : row.status === "Released" ? 4 : row.status === "Withdrawn" ? 2 : 1].color} pill>
            {status[row.status === "Pending" ? 5 : row.status === "Refunded" ? 1 : row.status === "Cancelled" ? 3 : row.status === "Released" ? 4 : row.status === "Withdrawn" ? 2 : 1].title}
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
                <DropdownItem tag='a' href='/' className='w-100' onClick={e => NoApi(e,'no API')}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Hold</span>
                </DropdownItem>
                <DropdownItem tag={Link} disabled={row.status === "Withdrawn"?true:false} to='/' className='w-100' onClick={(e) =>confirm('are you sure?')?ReleasePayment(e, row.id):""}>
                  <Edit size={15} />
                  <span className='align-middle ml-50'>Release</span>
                </DropdownItem>
                <DropdownItem tag='a' href='/' className='w-100' onClick={e =>NoApi(e,'no API')}>
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
  const [modal, setModal] = useState(false)
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
  const ReleasePayment = (e, id) => {
    e.preventDefault()
    // if (confirm('are you sure?')) {
      const data = {
        paymentId: id
      }
      APIService.releasePayment(data).then((res) => {
        if (res.data.status === 200)
        // ** Recall the fetch all Payment function
          getAllPayments()

      }).catch((error) => {
        console.log(error)
      })
    // }
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
          item.sender.name.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.sender.name.toLowerCase().includes(value.toLowerCase())

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
      breakClassName='page-item'
      breakLinkClassName='page-link'
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
    </Fragment>
  )
}

export default DataTableWithButtons
