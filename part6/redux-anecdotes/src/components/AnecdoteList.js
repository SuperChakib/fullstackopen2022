import { useSelector, useDispatch } from "react-redux"

import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = async anecdote => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)

    dispatch(voteForAnecdote(updatedAnecdote.id))
    dispatch(setNotification(`you voted '${updatedAnecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      {anecdotes
        .slice()
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
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

export default AnecdoteList