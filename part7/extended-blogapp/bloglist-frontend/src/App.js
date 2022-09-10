import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './features/login/LoginForm'
import Notification from './features/notifications/Notification'
import UsersList from './features/users/UsersList'
import BlogsList from './features/blogs/BlogsList'
import SingleUserPage from './features/users/SingleUserPage'

import {
  addNotification,
  removeNotification,
} from './features/notifications/notificationSlice'
import {
  fetchUserLocally,
  loginUser,
  logoutUser,
} from './features/login/loggedinUserSlice'
import { fetchBlogs } from './features/blogs/blogsSlice'
import { fetchAllUsers } from './features/users/usersSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserLocally())
    dispatch(fetchBlogs())
    dispatch(fetchAllUsers())
  }, [])

  const loggedinUser = useSelector((state) => state.loggedinUser)

  const login = (username, password) => {
    dispatch(loginUser({ username, password })).then((action) => {
      if (!action.payload) notify('wrong username/password', 'alert')
      else notify(`${action.payload.name} logged in!`)
    })
  }

  const logout = () => {
    dispatch(logoutUser())
    notify('good bye!')
  }

  const notify = (message, type = 'info') => {
    dispatch(addNotification({ message, type }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  if (loggedinUser === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    )
  }

  return (
    <Router>
      <h2>blogs</h2>
      <Notification />
      <div>
        {loggedinUser.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Routes>
        <Route
          path="/"
          element={<BlogsList loggedinUser={loggedinUser} notify={notify} />}
        />
        <Route path="users" element={<UsersList />} />
        <Route path="users/:userId" exact element={<SingleUserPage />} />
      </Routes>
    </Router>
  )
}

export default App
