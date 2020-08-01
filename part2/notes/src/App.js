import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const toggleImportance = id => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important} // '...note' creates a new object with copies of all the properties from the note object.

    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(
          note => note.id !== id ? note : response.data
        ))
      })
  }

  useEffect(() => {
    const eventHandler = response => {
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: notes.length + 1, // it's better to let the server generate ids for our resources
    }

   axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data)) // important: concat does not change the component's original state, it creates a new copy of the list
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? 
    notes 
    : 
    notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note key={note.id} note={note} toggleImportance={() => {toggleImportance(note.id)}}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          onChange={handleNoteChange}
          value={newNote}
        /> 
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App