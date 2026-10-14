// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { MoreVertical, Edit, Trash, ShieldOff } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import moment from 'moment';
import { Link, NavLink } from 'react-router-dom';
import {setCustomProfileAvatar} from '../../../../../Api/utility';
import config from '../../../../../Api/config'

const eventImageUrl = (row) => {
  const files = row?.event_files || row?.event_time_slot?.event?.event_files
  if (!files) return ''
  const fileUrl = JSON.parse(files)[0]?.file_url
  if (!fileUrl) return ''
  const base = String(config.baseUrlFront).replace(/\/+$/, '')
  const path = String(fileUrl).replace(/^\/+/, '')
  return `${base}/${path}`
}
// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']



const status = {
  1: { title: 'paused', color: 'light-primary' },
  2: { title: 'started', color: 'light-success' },
  3: { title: 'Ended', color: 'light-danger' },
}

// ** Table Common Column
export const columns = [
  {
    header: 'Event Title',
    selector: 'event_title',
    sortable: true,
    minWidth: '250px',
    cell: row => (
      <div className='d-flex align-items-center'>
        {row.avatar === '' ? (
          <Avatar color={`light-${states[row.status]}`} content={row?.event_title||row?.event_time_slot?.event?.event_title} initials />
        ) : (
          <Avatar img={eventImageUrl(row)} />
        )}
        <div className='user-info text-truncate ml-1'>
          <span className='d-block font-weight-bold text-truncate'><Link to={`/events/slot-list/${row?.id||row?.event_time_slot?.event?.id}`} >{row.event_title ||row?.event_time_slot?.event?.event_title}</Link></span>
          
        </div>
      </div>
    )
  },
  {
    header: 'Type',
    selector: row=>row.event_type||row?.event_time_slot?.event?.event_type,
    sortable: true,
    minWidth: '150px'
  },
  // {
  //   header: 'status',
  //   selector: 'status',
  //   sortable: true,
  //   minWidth: '150px'
  // },
  {
    header: 'Status',
    allowOverflow: true,
    cell: row => {
      return (
        row?.status==1||row?.event_time_slot?.event?.status==1?
          <button className="btn btn-danger btn-sm" onClick={()=>confirm('Are you sure to deactivate?')}>Deactivate</button>
          :row?.status==0||row?.event_time_slot?.event?.status==0?<button className="btn btn-success btn-sm" onClick={()=>confirm('Are you sure to activate?')}>Activate</button>:"N/A"
          
      )
    }
  }
]




