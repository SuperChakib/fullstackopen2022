import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { deleteBlog, incrementLikes, pushNewComment } from './blogsSlice'
import { nanoid } from '@reduxjs/toolkit'

const SingleBlogPage = ({ notify, user }) => {
  const { blogId } = useParams()
  const [newComment, setNewComment] = useState('')

  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === blogId)
  })

  if (!blog) return null

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)

    if (!ok) return

    dispatch(deleteBlog(blog.id))
    navigate('../', { replace: true })
  }

  const likeBlog = () => {
    const liked = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id,
    }

    dispatch(incrementLikes({ blogId: liked.id, likedBlog: liked }))
    notify(`you liked '${blog.title}' by ${blog.author}`)
  }

  const addComment = () => {
    dispatch(
      pushNewComment({
        blogId: blog.id,
        comments: blog.comments.concat(newComment),
      })
    )
    setNewComment('')
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {`${blog.likes === 1 ? '1 like' : `${blog.likes} likes`}`}{' '}
        <button onClick={likeBlog}>like</button>
      </p>
      <p>added by {addedBy}</p>
      {own && <button onClick={removeBlog}>remove</button>}
      <div id="comments">
        <h3>comments</h3>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>add comment</button>
        {blog.comments.length ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={nanoid()}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>no comments yet...</p>
        )}
      </div>
    </div>
  )
}

export default SingleBlogPage
