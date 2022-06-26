import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleText = ({ target }) => setTitle(target.value)
  const handleAuthor = ({ target }) => setAuthor(target.value)
  const handleUrl = ({ target }) => setUrl(target.value)

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor='title-input'>title:</label>
          <input id='title-input' type='text' value={title} onChange={handleText} name='title' />
        </div>
        <div>
          <label htmlFor='author-input'>author:</label>
          <input id='author-input' type='text' value={author} onChange={handleAuthor} name='author' />
        </div>
        <div>
          <label htmlFor='url-input'>url:</label>
          <input id='url-input' type='text' value={url} onChange={handleUrl} name='url' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm