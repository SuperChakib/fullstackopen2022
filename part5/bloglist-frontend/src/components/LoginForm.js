import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)

  const handleLogin = e => {
    e.preventDefault()
    createLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} onChange={handleUsername} name='username' />
      </div>
      <div>
        password
        <input type='password' value={password} onChange={handlePassword} name='password' />
      </div>
      <button>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired
}

export default LoginForm