// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Table Data & Columns
import { columns } from './data'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Search } from 'react-feather'
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
  Row,
  Col
} from 'reactstrap'
import { useEffect } from 'react'
import { APIService } from '../../../Api/APIService'
import ComponentSpinner from '../../../@core/components/spinner/Loading-spinner'
import { toast } from 'react-toastify'



const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [limit, setLimit] = useState(100)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [TableData, setTableData] = useState([])
  const [preloader, setPreloader] = useState(false);

  const fetchUsers = () => {
    setPreloader(true)
    APIService.usersList({page:currentPage,limit:limit}).then((res)=>{
      setPreloader(false);
      if(res.data.status==200&&res.data.success){
        setTableData(res.data.data);
      }
    }).catch((error)=>{
      setPreloader(false);
    })
  }

  const getSearchableText = item =>
    [
      item?.name,
      item?.email,
      item?.phone,
      item?.username,
      item?.joined_on
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

  useEffect(() => {
    fetchUsers()
    return () => {
      setTableData([])
    }
  }, [currentPage, limit])

  const handleDeactivate = async (e, user) => {
    e.preventDefault()

    try {
      const response = await APIService.deactivateAccount({ userId: user.id })
      const responseData = response?.data

      if (responseData?.status !== 200 || !responseData?.success) {
        toast.error(responseData?.message || 'Unable to deactivate account.')
        return
      }

      if (responseData?.data?.requires_confirmation) {
        const shouldDeactivate = window.confirm(responseData.message)

        if (!shouldDeactivate) {
          return
        }

        const confirmResponse = await APIService.deactivateAccount({
          userId: user.id,
          confirm_deactivation: '1'
        })

        if (confirmResponse?.data?.status === 200 && confirmResponse?.data?.success) {
          toast.success(confirmResponse.data.message)
        } else {
          toast.error(confirmResponse?.data?.message || 'Unable to deactivate account.')
          return
        }
      } else {
        toast.success(responseData.message)
      }

      fetchUsers()
    } catch (error) {
      console.log(error)
      toast.error('Unable to deactivate account.')
    }
  }

  // ** Function to handle Modal toggle
  // const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    const normalizedValue = value.trim().toLowerCase()

    setSearchValue(value)

    if (!normalizedValue) {
      setFilteredData([])
      return
    }

    const updatedData = TableData.filter(item => getSearchableText(item).includes(normalizedValue))
    setFilteredData(updatedData)
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

  return preloader?(<ComponentSpinner/>):(
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
          
          {/* <div className='d-flex mt-md-0 mt-1'>
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
            
          </div> */}
        </CardHeader>
        
        <DataTable
          hover
          noHeader
          pagination
          columns={columns(handleDeactivate)}
          paginationPerPage={limit}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : TableData}
        />
      </Card>
      {/* <AddNewModal open={modal} handleModal={handleModal} /> */}
    </Fragment>
  )
}

export default DataTableWithButtons
