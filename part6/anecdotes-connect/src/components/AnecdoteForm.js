import { connect } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  const handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value

    if (!content) return
    
    e.target.anecdote.value = ''

    props.createAnecdote(content)
    
    props.setNotification(`you created '${content}'`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)