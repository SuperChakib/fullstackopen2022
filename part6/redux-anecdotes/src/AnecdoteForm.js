import { useDispatch } from "react-redux"
import { addNewNote } from "./reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addNewNote(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm