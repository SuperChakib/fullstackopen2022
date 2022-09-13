import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleBlogPage = () => {
  const { blogId } = useParams()

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  )

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{`${blog.likes} likes`}</p>
      <p>{`added by ${blog.author}`}</p>
    </div>
  )
}

export default SingleBlogPage
