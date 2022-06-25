import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    borderWidth: 1,
    border: 'solid',
    marginBottom: 5,
    paddingTop: 10,
    paddingLeft: 2
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setVisible(!visible)

  const incrementLikes = async () => {
    const incrementedBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const updatedBlog = await blogService.updateBlog(blog.id, incrementedBlog)
    setLikes(updatedBlog.likes)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        {blog.url}
        <br />
        likes {likes} <button onClick={(incrementLikes)}>likes</button>
        <br />
        {blog.user.username}
      </div>
    </div>
  )
}

export default Blog