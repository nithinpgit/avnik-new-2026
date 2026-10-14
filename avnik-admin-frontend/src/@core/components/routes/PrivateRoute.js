// ** React Imports
import { Suspense, useContext } from 'react'
import { Navigate } from 'react-router-dom'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Utils
import { isUserLoggedIn } from '@utils'

const PrivateRoute = ({ children, route }) => {
  const ability = useContext(AbilityContext)

  if (!isUserLoggedIn()) {
    return <Navigate to='/login' />
  }

  if (route.meta && route.meta.action && route.meta.resource) {
    if (!ability.can(route.meta.action, route.meta.resource)) {
      return <Navigate to='/auth/not-auth' />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
