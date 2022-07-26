import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import anecdoteService from './services/anecdotes'

import { setAll } from './reducers/anecdoteReducer'

const App = () => {
  const filter = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAll(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {filter ? <Notification /> : null}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App