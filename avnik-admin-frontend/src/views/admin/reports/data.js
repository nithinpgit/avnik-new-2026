// ** Third Party Components
import { MoreVertical, Link, ToggleLeft, ToggleRight } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import config from '../../../Api/config'

const getNormalizedStatus = value => Number(value)



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
export const getColumns = handleReportToggle => [
  {
    name: 'From',
    selector: row=>row?.reportedByUser?.name,
    sortable: true,
    minWidth: '250px'
    // cell: row => (
    //   <div className='d-flex align-items-center'>
    //     {row.avatar === '' ? (
    //       <Avatar color={`light-${states[row?.status]}`} content={row?.reportedByUser?.name} initials />
    //     ) : (
    //       <Avatar img={require(`@src/assets/images/user-img.jpg`).default} />
    //     )}
    //     <div className='user-info text-truncate ml-1'>
    //       <span className='d-block font-weight-bold text-truncate'>{row.reportedByUser?.name}</span>
    
    //     </div>
    //   </div>
    // )
  },
  {
    name: 'For',
    selector: row=>row?.user?.name,
    sortable: true,
    minWidth: '250px',
    // cell: row => (
    //   <div className='d-flex align-items-center'>
    //     {row.avatar === '' ? (
    //       <Avatar color={`light-${states[row?.status]}`} content={row?.user?.name} initials />
    //     ) : (
    //       <Avatar img={require(`@src/assets/images/user-img.jpg`).default} />
    //     )}
    //     <div className='user-info text-truncate ml-1'>
    //       <span className='d-block font-weight-bold text-truncate'>{row.user?.name}</span>
    
    //     </div>
    //   </div>
    // )
  },
  {
    name: 'Reason',
    selector: 'report',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'comment',
    selector: 'comment',
    sortable: true,
    minWidth: '200px',
    cell: row => (
      <span title={row?.comment || ''}>
        {row?.comment && row.comment.length > 25 ? `${row.comment.slice(0, 25)}...` : row?.comment}
      </span>
    )
  },
  {
    name: 'Status',
    cell: row =>
      getNormalizedStatus(row?.status) === 0 ? (
        <span className='badge rounded-pill badge-light-success me-1'>Open</span>
      ) : (
        <span className='badge rounded-pill badge-light-danger me-1'>Close</span>
      ),
    sortable: true,
    minWidth: '50px'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      return (
        <div className='d-flex column-action reports-action-dropdown'>
          <UncontrolledDropdown direction='up'>
            <DropdownToggle className='pr-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag='button' className='w-100' onClick={() => handleReportToggle(row)}>
                {getNormalizedStatus(row?.status) === 0 ? <ToggleLeft /> : <ToggleRight />}
                <span className='align-middle ml-50'>{getNormalizedStatus(row?.status) === 0 ? ' Close' : ' Open'}</span>
              </DropdownItem>
              <DropdownItem tag='a' href={row?.r_event_id?`${config.baseUrlFront}/event?token=${row?.event?.remember_token}&event=${row?.r_event_id}`:row?.r_user_id?`${config.baseUrlFront}/profile/${row?.user?.username}`:'https://meet.avnik.com'} target="_blank" className='w-100' >
              <Link size={15} />
                <span className='align-middle ml-50'>Reported Link</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          
        </div>
      )
    }
  }
]



export default ExpandableTable
