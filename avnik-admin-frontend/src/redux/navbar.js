import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getBookmarks = createAsyncThunk('navbar/getBookmarks', async () => {
  const response = await axios.get('/api/bookmarks/data')
  return {
    suggestions: response.data.suggestions,
    bookmarks: response.data.bookmarks
  }
})

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    query: '',
    bookmarks: [],
    suggestions: []
  },
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload
    },
    updateBookmarked: (state, action) => {
      let objectToUpdate

      state.suggestions.find(item => {
        if (item.id === action.payload) {
          item.isBookmarked = !item.isBookmarked
          objectToUpdate = item
        }
      })

      state.bookmarks.find(item => {
        if (item.id === action.payload) {
          item.isBookmarked = !item.isBookmarked
          objectToUpdate = item
        }
      })

      if (objectToUpdate && !objectToUpdate.isBookmarked) {
        const index = state.bookmarks.findIndex(x => x.id === action.payload)
        if (index !== -1) state.bookmarks.splice(index, 1)
      } else if (objectToUpdate?.isBookmarked) {
        state.bookmarks.push(objectToUpdate)
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getBookmarks.fulfilled, (state, action) => {
      state.suggestions = action.payload.suggestions
      state.bookmarks = action.payload.bookmarks
    })
  }
})

export const { handleSearchQuery, updateBookmarked } = navbarSlice.actions

export default navbarSlice.reducer
