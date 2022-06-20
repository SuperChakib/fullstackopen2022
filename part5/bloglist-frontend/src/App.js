import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
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

  const addBlog = async e => {
    e.preventDefault()
    try {
      const newBlog = {
        title, author, url
      }
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`a new blog '${title}' by '${author}' added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('Both title and url are required')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return user
    ? (
      <div>
        <h2>blogs</h2>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <p>{user.username} logged-in <button onClick={handleLogout}>logout</button></p>
        <h2>create new</h2>
        <NoteForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} addBlog={addBlog} />
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>)
    : (
      <div>
        <h2>log in to application</h2>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      </div>)
}

export default App
