// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

// ** Custom Components
import UserDropdown from './UserDropdown'

const NavbarUser = props => {
  const { skin, setSkin } = props

  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    }
    return <Moon className='ficon' onClick={() => setSkin('dark')} />
  }

  return (
    <Fragment>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style-toggle'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default NavbarUser
