import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

export const { addNotification, removeNotification } =
  notificationReducer.actions

export default notificationReducer.reducer
