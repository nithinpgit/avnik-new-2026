// ** Icons Import
import {Mail, Briefcase, Flag, Box, Bell, CheckCircle, Users, CreditCard,  UserCheck,  MessageSquare,  CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, MessageCircle } from 'react-feather'

export default [
  {
    id: 'users',
    title: 'Users',
    icon: <Users size={20} />,
    navLink: '/users'
  },
  {
    id: 'payments',
    title: 'Payments',
    badge:"danger",
    badgeText:"3",
    icon: <CreditCard size={20} />,
    navLink: '/payments'
  },
  
  // {
  //   id: 'notifications',
  //   title: 'Notifications',
  //   icon: <Bell size={20} />,
  //   navLink: '/notifications'
  // },
  {
    id: 'report',
    title: 'Report',
    icon: <Flag size={20} />,
    navLink: '/report'
  },
  {
    id: 'events',
    title: 'Events',
    badge:"danger",
    badgeText:"1",
    icon: <Calendar size={20} />,
    navLink: '/events'
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: <Briefcase size={20} />,
    navLink: '/categories'
  },
  {
    id: 'emailTemplate',
    title: 'Email Template',
    icon: <Mail size={20} />,
    navLink: '/email-templates'
  },
  {
    id: 'Help & Support',
    title: 'Help & Support',
    icon: <MessageCircle size={20} />,
    navLink: '/messages'
  }
]
