import { lazy } from 'react'
const Dashboard = lazy(() => import('../../views/admin/dashboard'))
const DashboardRoutes = [
  {
    path: '/dashboard',
    index: true,
    element: <Dashboard />
  }
]

export default DashboardRoutes
