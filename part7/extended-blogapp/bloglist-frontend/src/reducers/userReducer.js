import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    userService.setUser(user)
    return user
  }
)

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  userService.clearUser()
})

const userReducer = createSlice({
  name: 'user',
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

export const { fetchUserLocally } = userReducer.actions

export default userReducer.reducer
