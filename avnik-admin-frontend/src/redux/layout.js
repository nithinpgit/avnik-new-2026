import { createSlice } from '@reduxjs/toolkit'
import themeConfig from '@configs/themeConfig'

const readStorage = (key, fallback) => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    skin: readStorage('skin', themeConfig.layout.skin),
    isRTL: readStorage('direction', themeConfig.layout.isRTL),
    layout: themeConfig.layout.type,
    lastLayout: themeConfig.layout.type,
    menuCollapsed: readStorage('menuCollapsed', themeConfig.layout.menu.isCollapsed),
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    footerType: themeConfig.layout.footer.type,
    navbarType: themeConfig.layout.navbar.type,
    navbarColor: themeConfig.layout.navbar.backgroundColor
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload
      window.localStorage.setItem('direction', JSON.stringify(action.payload))
    },
    handleSkin: (state, action) => {
      state.skin = action.payload
      window.localStorage.setItem('skin', JSON.stringify(action.payload))
    },
    handleLayout: (state, action) => {
      state.layout = action.payload
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload))
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload
    }
  }
})

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleMenuCollapsed,
  handleContentWidth,
  handleFooterType,
  handleNavbarType,
  handleNavbarColor
} = layoutSlice.actions

export default layoutSlice.reducer
