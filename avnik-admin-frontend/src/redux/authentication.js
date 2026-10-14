import { createSlice } from '@reduxjs/toolkit'

const initialUser = () => {
  try {
    const item = window.localStorage.getItem('userData')
    return item ? JSON.parse(item) : {}
  } catch {
    return {}
  }
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem('_user', JSON.stringify(action.payload))
      if (action.payload?.accessToken) {
        localStorage.setItem('_token', action.payload.accessToken)
      }
    },
    handleLogout: state => {
      state.userData = {}
      localStorage.removeItem('userData')
      localStorage.removeItem('_user')
      localStorage.removeItem('_token')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
