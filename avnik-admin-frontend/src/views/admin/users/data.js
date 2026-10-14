// ** Custom Components
import Avatar from '@components/avatar'
// ** Third Party Components
import { MoreVertical, Edit, ShieldOff, Link2 } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap'
import moment from 'moment'
import { NavLink, Link } from 'react-router-dom'
import { setCustomProfileAvatar } from '../../../Api/utility'
import config from '../../../Api/config'

// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']


const status = {
  1: { title: 'Deactivate', color: 'light-danger' },
  2: { title: 'Active', color: 'light-success' }
}


// ** Table Common Column
export const columns = handleDeactivate => [
  {
    Header: 'Name',
    selector: 'name',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <Link to={`/users/edit/${row.id}`} >
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row.name} initials />
        ) : (
          <Avatar img={setCustomProfileAvatar(row?.user_profile?.profile_picture,row?.user_profile?.social_profile_picture_url)} />
        )}
        <div className='user-info text-truncate ml-1'>
        <span className='d-block font-weight-bold text-truncate'>{row.name}</span>
          
          <small>{row?.post}</small>
        </div>
      </div>
      </Link>
    )
  },
  {
    Header: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    Header: 'Date Registered',
    selector: row=>moment(row.joined_on).format('D MMM, YYYY'),
    sortable: true,
    minWidth: '150px'
  },
  {
    Header: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[row.status==="deactivate"?1:2].color} pill>
          {status[row.status==="active"?1:2].title}
        </Badge>
      )
    }
  },
  {
    Header: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <NavLink tag='a' to={`/users/edit/${row.id}`}  className='w-100 dropdown-item' >
              <Edit size={15} />
                <span className='align-middle ml-50'>Edit</span>
              </NavLink>
              <a tag='a' href={`${config.baseUrlFront}/profile/${row.username}`} target="_blank"  className='w-100 dropdown-item' >
              <Link2 size={15} />
                <span className='align-middle ml-50'>View Profile</span>
              </a>
              <a
                tag='a'
                href='/'
                className='w-100 dropdown-item'
                onClick={e => handleDeactivate(e, row)}
              >
              <ShieldOff size={15} />
                <span className='align-middle ml-50'>Deactivate</span>
              </a>
            </DropdownMenu>
          </UncontrolledDropdown>
          
        </div>
      )
    }
  }
]



