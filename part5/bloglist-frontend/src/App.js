import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const credentials = {
        username,
        password
      }
      const user = await loginService.login(credentials)
      setUser(user)
      setUsername('')
      setPassword('')      
    } catch (exception) {
      console.log('wrong credentials');
    }
  }

  return user
    ? (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged-in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>)
    : (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} name='username' />
          </div>
          <div>
            password
            <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} name='password' />
          </div>
          <button>Login</button>
        </form>
      </div>

    )
}

export default App
