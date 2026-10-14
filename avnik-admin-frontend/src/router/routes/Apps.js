import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Users = lazy(() => import('../../views/admin/users'))
const UsersEdit = lazy(() => import('../../views/admin/users/edit'))
const UsersInvoice = lazy(() => import('../../views/admin/users/edit/payments'))
const UsersInvoicePrint = lazy(() => import('../../views/admin/users/edit/payments/Invoice/print'))
const Payments = lazy(() => import('../../views/admin/payments'))
const PaymentsInvoice = lazy(() => import('../../views/admin/payments/Invoice'))
const PaymentsInvoicePrint = lazy(() => import('../../views/admin/payments/Invoice/print'))
const EmailTemplate = lazy(() => import('../../views/admin/email-templates'))
const EmailTemplateEdit = lazy(() => import('../../views/admin/email-templates/AddEdit'))
const EmailTemplateAdd = lazy(() => import('../../views/admin/email-templates/AddEdit'))
const ChatSupport = lazy(() => import('../../views/admin/support'))
const Reports = lazy(() => import('../../views/admin/reports'))
const Events = lazy(() => import('../../views/admin/events'))
const EventSlots = lazy(() => import('../../views/admin/events/edit'))
const Categories = lazy(() => import('../../views/admin/categories'))
const Profile = lazy(() => import('../../views/admin/account-settings'))
const AppRoutes = [
  {
    path: '/users',
  
    meta: {
      authRoute: true
    },
    className: 'email-application',
    element: <Users/>
  },
  {
    path: '/users/edit/:id',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <UsersEdit/>
  },
  {
    path: '/users/edit/invoice/:id',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <UsersInvoice/>
  },
  {
    path: '/users/edit/invoice/:id/print',
    layout: 'BlankLayout',
    element: <UsersInvoicePrint/>
  },
  {
    path: '/payments',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <Payments/>
  },
  
  {
    path: '/payments/invoice/:id',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <PaymentsInvoice/>
  },
  {
    path: '/payments/invoice/:id/print',
    layout: 'BlankLayout',
    element: <PaymentsInvoicePrint/>
  },  
  {
    path: '/email-templates',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <EmailTemplate/>
  },
  {
    path: '/email-templates/edit/:id',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <EmailTemplateEdit/>
  },
  {
    path: '/email-templates/add',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <EmailTemplateAdd/>
  },
  {
    path: '/messages',
    exact: true,
    className: 'chat-application',
    element: <ChatSupport/>
  },
  // {
  //   path: '/notifications',
  //   exact: true,
  //   appLayout: false,
  //   className: 'email-application',
  //   element: lazy(() => import('../../views/admin/notifications'))
  // },
  {
    path: '/report',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <Reports/>
  },
  {
    path: '/events',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <Events/>
  },
  {
    path: '/events/slot-list/:id',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <EventSlots/>
  },
  {
    path: '/categories',
    exact: true,
    appLayout: false,
    className: 'email-application',
    element: <Categories />
  },
  {
    path: '/profile',
    element: <Profile />
  }
]

export default AppRoutes
