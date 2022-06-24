const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)

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
export default LoginForm