import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, show, user }) => {
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

  const incrementLikes = async () => {
    const incrementedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    let updatedBlog = await blogService.updateBlog(blog.id, incrementedBlog)
    setBlogs(blogs
      .map(blog => blog.id !== updatedBlog.id ? blog : { ...blog, likes: updatedBlog.likes })
      .sort((a, b) => b.likes - a.likes))
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      
      <div style={{ display: visible ? '' : 'none' }}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={(incrementLikes)}>likes</button>
        <br />
        {blog.user.username}
        <br />
        <button onClick={removeBlog} style={removeStyle}>remove</button>
      </div>
    </div>
  )
}

export default Blog