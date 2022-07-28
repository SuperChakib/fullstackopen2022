import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

let timeout = null

export const setNotification = (content, duration) => {
  return async dispatch => {
    dispatch(addNotification(content))
    clearTimeout(timeout)
    timeout = null
    timeout = setTimeout(() => dispatch(removeNotification()), duration)
  }
}

export default notificationSlice.reducer