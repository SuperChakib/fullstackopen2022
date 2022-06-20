const NoteForm = ({ title, setTitle, author, setAuthor, url, setUrl, addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='title' />
    </div>
    <div>
      author:
      <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} name='author' />
    </div>
    <div>
      url:
      <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} name='url' />
    </div>
    <button>create</button>
  </form>)

export default NoteForm