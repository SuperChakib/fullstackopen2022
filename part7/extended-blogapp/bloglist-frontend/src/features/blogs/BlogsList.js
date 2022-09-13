import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

import { addNewBlog, fetchAllBlogs } from './blogsSlice'

const BlogsList = ({ notify }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllBlogs())
  }, [])

  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)

  const createBlog = (blog) => {
    try {
      dispatch(addNewBlog(blog))
      notify(`a new blog '${blog.title}' by ${blog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      notify('creating a blog failed: ' + error.response.data.error, 'alert')
    }
  }

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  }

  return (
    <>
      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => (
          <div key={blog.id} style={style} className="blog">
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogsList
