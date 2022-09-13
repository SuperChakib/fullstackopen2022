import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

import {
  addNewBlog,
  deleteBlog,
  fetchAllBlogs,
  incrementLikes,
} from './blogsSlice'

const BlogsList = ({ notify, loggedinUser }) => {
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

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) return

    dispatch(deleteBlog(id))
  }

  const likeBlog = (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }

    dispatch(incrementLikes({ blogId: liked.id, likedBlog: liked }))
    notify(`you liked '${toLike.title}' by ${toLike.author}`)
  }

  return (
    <>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={loggedinUser}
          />
        ))}
      </div>
    </>
  )
}

export default BlogsList
