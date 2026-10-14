// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { isUserLoggedIn } from '@utils'

const PublicRoute = ({ children, route }) => {
  if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
    return <Navigate to='/' />
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
