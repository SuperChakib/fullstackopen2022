import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        {blog.url}
        <br />
        likes {blog.likes} <button>likes</button>
        <br />
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog