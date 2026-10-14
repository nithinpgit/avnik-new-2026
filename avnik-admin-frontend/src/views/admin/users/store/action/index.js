import axios from 'axios'
import { APIService } from '../../../../../Api/APIService'

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get('/api/users/list/all-data').then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    await axios.get('/api/users/list/data', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.users,
        totalPages: response.data.total,
        params
      })
    })
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
     console.log("🔥 getUser CALLED with ID:", id)
    try {
      const response = await APIService.UserProfile({ id })   // ✅ await used

      if (response?.data?.status === 200) {
        console.log("selectedUser:", response.data.data)

        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.data
        })
      } else {
        console.warn("API returned non-200:", response.data)
      }

    } catch (error) {
      console.error("getUser ERROR:", error)
    }
  }
}


// ** Add new user
export const addUser = user => {
  return (dispatch, getState) => {
    axios
      .post('/apps/users/add-user', user)
      .then(response => {
        dispatch({
          type: 'ADD_USER',
          user
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
      .catch(err => console.log(err))
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
