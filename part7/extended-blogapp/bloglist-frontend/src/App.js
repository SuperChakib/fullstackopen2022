import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import {
  addNewBlog,
  deleteBlog,
  fetchBlogs,
  incrementLikes,
} from './reducers/blogsReducer'
import {
  addNotification,
  removeNotification,
} from './reducers/notificationReducer'
import {
  fetchUserLocally,
  loginUser,
  logoutUser,
} from './reducers/loggedinUserReducer'
import { fetchAllUsers } from './reducers/usersSlice'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(fetchUserLocally())
    dispatch(fetchAllUsers())
  }, [])

  const blogs = useSelector((state) => state.blogs)
  const loggedinUser = useSelector((state) => state.loggedinUser)
  const users = useSelector((state) => state.users)

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

  const createBlog = (blog) => {
    try {
      dispatch(addNewBlog(blog))
      notify(`a new blog '${blog.title}' by ${blog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    }
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) return

    dispatch(deleteBlog(id))
  }

  const likeBlog = (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }

    dispatch(incrementLikes({ blogId: liked.id, likedBlog: liked }))
    notify(`you liked '${toLike.title}' by ${toLike.author}`)
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
    <Container>
      <Router>
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {loggedinUser.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <Routes>
            <Route
              path="/users"
              element={
                <>
                  <h2>Users</h2>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell>
                            <b>blogs created</b>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="new note" ref={blogFormRef}>
                    <NewBlogForm onCreate={createBlog} />
                  </Togglable>
                  <div id="blogs">
                    {blogs.map((blog) => (
                      <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        removeBlog={removeBlog}
                        user={loggedinUser}
                      />
                    ))}
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Container>
  )
}

export default App
