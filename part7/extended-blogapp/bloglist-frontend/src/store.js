import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedinUserReducer from './reducers/loggedinUserReducer'
import usersReducer from './reducers/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    loggedinUser: loggedinUserReducer,
    users: usersReducer,
  },
})

export default store
