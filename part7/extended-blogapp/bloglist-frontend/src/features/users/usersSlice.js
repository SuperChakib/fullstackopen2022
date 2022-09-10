import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import userService from '../../services/user'

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => await userService.getAll()
)

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer
