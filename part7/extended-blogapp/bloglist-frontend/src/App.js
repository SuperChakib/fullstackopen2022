import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Notification from './features/notifications/Notification'
import LoginForm from './features/login/LoginForm'
import BlogsList from './features/blogs/BlogsList'
import SingleBlogPage from './features/blogs/SingleBlogPage'
import UsersList from './features/users/UsersList'
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
import { fetchAllBlogs } from './features/blogs/blogsSlice'
import { fetchAllUsers } from './features/users/usersSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserLocally())
    dispatch(fetchAllBlogs())
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
      <Navbar loggedinUser={loggedinUser} logout={logout} />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={<BlogsList loggedinUser={loggedinUser} notify={notify} />}
        />
        <Route
          path="blogs"
          element={<BlogsList loggedinUser={loggedinUser} notify={notify} />}
        />
        <Route
          path="blogs/:blogId"
          element={<SingleBlogPage notify={notify} user={loggedinUser} />}
        />
        <Route path="users" element={<UsersList />} />
        <Route path="users/:userId" element={<SingleUserPage />} />
      </Routes>
    </Router>
  )
}

export default App
