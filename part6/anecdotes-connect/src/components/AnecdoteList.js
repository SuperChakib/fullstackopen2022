import { connect } from "react-redux"

import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const handleVote = async anecdote => {
    props.voteForAnecdote(anecdote)

    props.setNotification(`you voted '${anecdote.content}'`, 5000)
  }

  return (
    <div>
      {props.anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

const mapStateToProps = state => ({
  anecdotes: state.anecdotes
    .slice()
    .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
})

export default connect(mapStateToProps, { voteForAnecdote, setNotification })(AnecdoteList)