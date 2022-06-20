const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} name='username' />
    </div>
    <div>
      password
      <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} name='password' />
    </div>
    <button>login</button>
  </form>
)
export default LoginForm