import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './features/blogs/blogsSlice'
import notificationReducer from './features/notifications/notificationSlice'
import loggedinUserReducer from './features/login/loggedinUserSlice'
import usersReducer from './features/users/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    loggedinUser: loggedinUserReducer,
    users: usersReducer,
  },
})

export default store
