// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Table Data & Columns
import { getColumns } from './data'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Search, Flag } from 'react-feather'
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



const DataTableWithButtons = ({ data, ReportsToggle }) => {
  const getRowKey = row => row?.id ?? `${row?.r_user_id || 'user'}-${row?.r_event_id || 'event'}-${row?.createdAt || row?.comment || ''}`

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [tableData, setTableData] = useState(data || [])

  useEffect(() => {
    setTableData(data || [])
    if (!searchValue.length) {
      setFilteredData([])
    }
  }, [data, searchValue])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      0: { title: 'Close', color: 'light-primary' },
      1: { title: 'Open', color: 'light-success' },
    }

    if (value.length) {
      updatedData = tableData.filter(item => {
        const startsWith =
          item.report.toLowerCase().startsWith(value.toLowerCase()) ||
          item.comment.toLowerCase().startsWith(value.toLowerCase()) ||
          item.user.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.user.username.toLowerCase().startsWith(value.toLowerCase()) ||
          item.reportedByUser.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.reportedByUser.username.toLowerCase().startsWith(value.toLowerCase())

        const includes =
        item.report.toLowerCase().includes(value.toLowerCase()) ||
        item.comment.toLowerCase().includes(value.toLowerCase()) ||
        item.user.name.toLowerCase().includes(value.toLowerCase()) ||
        item.user.username.toLowerCase().includes(value.toLowerCase())||
        item.reportedByUser.name.toLowerCase().includes(value.toLowerCase()) ||
        item.reportedByUser.username.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    } else {
      setFilteredData([])
    }
  }

  const handleReportToggle = async row => {
    if (!ReportsToggle) return

    const updatedRow = await ReportsToggle(row)
    if (!updatedRow) return

    const targetKey = getRowKey(updatedRow)
    const updateRows = rows =>
      rows.map(item => (getRowKey(item) === targetKey ? { ...item, status: updatedRow.status } : item))

    setTableData(prev => updateRows(prev))
    setFilteredData(prev => updateRows(prev))
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
      pageCount={searchValue.length ? filteredData.length / 7 : data.length / 7 || 1}
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
    const keys = Object.keys(data[0])

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
        <Row className='justify-content-start p-1 reports-table-toolbar'>
          <Col className='d-flex align-items-center justify-content-start ' md='6' sm='12'>

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

          </Col>
        </Row>
        <DataTable
          hover
          noHeader
          pagination
          columns={getColumns(handleReportToggle)}
          paginationPerPage={7}
          className='react-dataTable reports-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : tableData}
        />
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
