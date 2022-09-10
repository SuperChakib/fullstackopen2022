import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'

export const loginUser = createAsyncThunk(
  'loggedinUser/loginUser',
  async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    userService.setUser(user)
    return user
  }
)

export const logoutUser = createAsyncThunk('loggedinUser/logoutUser', () => {
  userService.clearUser()
})

const loggedinUserReducer = createSlice({
  name: 'loggedinUser',
  initialState: null,
  reducers: {
    fetchUserLocally() {
      return userService.getUser()
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (_, action) => {
        return action.payload
      })
      .addCase(logoutUser.fulfilled, () => {
        return null
      })
  },
})

export const { fetchUserLocally } = loggedinUserReducer.actions

export default loggedinUserReducer.reducer
