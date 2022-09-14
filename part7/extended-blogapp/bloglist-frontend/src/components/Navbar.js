import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllBlogs } from '../features/blogs/blogsSlice'

const Navbar = ({ loggedinUser, logout }) => {
  const dispatch = useDispatch()

  const style = {
    backgroundColor: 'lightgrey',
    padding: 5,
  }

  const refreshPage = () => {
    dispatch(fetchAllBlogs())
  }

  return (
    <div style={style}>
      <Link to="/blogs">blogs</Link> <Link to="/users">users</Link>{' '}
      {loggedinUser.name} logged in <button onClick={logout}>logout</button>{' '}
      <button onClick={refreshPage}>refresh</button>
    </div>
  )
}

export default Navbar
