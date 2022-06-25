import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setSuccessMessage('successfully logged in')
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser('')
    blogService.setToken('')
    setSuccessMessage('successfully logged out')
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000);
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat({ ...savedBlog, user: { username: user.username } }).sort((a, b) => b.likes - a.likes))
      setSuccessMessage(`a new blog '${savedBlog.title}' by '${savedBlog.author}' added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  return !user
    ? (
      <div>
        <h2>log in to application</h2>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <LoginForm createLogin={handleLogin} />
      </div>)
    : (
      <div>
        <h2>blogs</h2>

        <Notification errorMessage={errorMessage} successMessage={successMessage} />

        <p>{user.username} logged-in <button onClick={handleLogout}>logout</button></p>
        
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        <br />

        <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Hide' : 'Show'} all</button>
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          show={showAll}
          user={user}
        />)}
      </div>)
}

export default App
