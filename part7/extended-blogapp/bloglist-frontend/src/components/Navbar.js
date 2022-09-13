import { Link } from 'react-router-dom'

const Navbar = ({ loggedinUser, logout }) => {
  const style = {
    backgroundColor: 'lightgrey',
    padding: 5,
  }

  return (
    <div style={style}>
      <Link to="/blogs">blogs</Link> <Link to="/users">users</Link>{' '}
      {loggedinUser.name} logged in <button onClick={logout}>logout</button>
    </div>
  )
}

export default Navbar
