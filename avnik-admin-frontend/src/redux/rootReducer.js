import { combineReducers } from '@reduxjs/toolkit'
import layout from './layout'
import navbar from './navbar'
import authentication from './authentication'
import users from '@src/views/admin/users/store/reducer'

const rootReducer = combineReducers({
  layout,
  navbar,
  authentication,
  users
})

export default rootReducer
