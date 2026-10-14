// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import axios from 'axios'
import { MoreVertical, Edit, Trash, Eye } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']


// export let data

// // ** Get initial Data
// axios.get('/api/datatables/initial-data').then(response => {
//   data = response.data
// })



// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='font-weight-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
 
  {
    Header: 'ID',
    selector: row=>`#${row.id}`,
    sortable: true,
    minWidth: '250px'
  },
  {
    Header: 'Subject',
    selector: 'subject',
    sortable: true,
    minWidth: '250px'
  },
  {
    Header: 'Template Type',
    selector: 'type',
    sortable: true,
    minWidth: '250px'
  },
  {
    Header: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
          <Link to={`/email-templates/edit/${row.id}`}  className="btn btn-default" >
              <Edit size={15} />
                <span className='align-middle ml-50'>Edit</span>
              </Link>
              {/* <Link to={`/email-templates/view/${row.id}`} className="btn btn-default" >
                <Eye  size={15} />
                <span className='align-middle ml-50'>View</span>
              </Link> */}
          </UncontrolledDropdown>
          
        </div>
      )
    }
  }
]



export default ExpandableTable
