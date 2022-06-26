import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLikes, user, removeBlog, show }) => {
  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const removeStyle = {
    display: user.username === blog.user.username ? '' : 'none',
    backgroundColor: 'indigo',
    color: 'white',
    borderRadius: 5
  }

  const [visible, setVisible] = useState(show)

  useEffect(() => {
    setVisible(show)
  }, [show])

  const toggleVisibility = () => setVisible(!visible)

  const addLikes = async () => {
    const incrementedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    incrementLikes(blog.id, incrementedBlog)
  }

  return (
    <div style={blogStyle}>
      <div className='blogItem'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      </div>

      <div className='blogDetails' style={{ display: visible ? '' : 'none' }}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={addLikes}>likes</button>
        <br />
        {blog.user.username}
        <br />
        <button onClick={() => removeBlog(blog)} style={removeStyle}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog