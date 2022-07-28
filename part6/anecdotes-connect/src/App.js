import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { connect } from 'react-redux'

import { useEffect } from 'react'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = props => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.notification ? <Notification /> : null}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(mapStateToProps, { initializeAnecdotes })(App)