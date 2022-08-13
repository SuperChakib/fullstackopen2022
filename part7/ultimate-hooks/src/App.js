import { useField, useResource } from './hooks'
import { useState } from 'react'

const Note = ({ note, noteService }) => {
  const content = useField('text')
  const [modify, setModify] = useState(false)

  const handleNoteUpdate = event => {
    event.preventDefault()
    noteService.update({ content: content.props.value }, note.id)
    content.reset()
    setModify(false)
  }
  return (
    <div>
      <p>{note.content} <button onClick={() => setModify(!modify)}>modify</button></p>
      {modify ?
        <form onSubmit={handleNoteUpdate}>
          <input {...content.props}></input>
        </form>
        : null}
    </div >
  )
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.props.value })
    content.reset()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.props.value, number: number.props.value })
    name.reset()
    number.reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.props} />
        <button>create</button>
      </form>
      {notes.map(note => <Note key={note.id} note={note} content={content.props} noteService={noteService} />)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.props} /> <br />
        number <input {...number.props} />
        <button>create</button>
      </form>
      {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App