import { useState, useEffect } from 'react'

// axios for request
import axios from 'axios'

// use our note service
import noteService from './services/notes'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = (props) => {

  //const [notes, setNotes] = useState(props.notes)
  // we are getting data from server now
  const [notes, setNotes] = useState([])

  // adding a new note
  const [newNote, setNewNote] = useState('')

  // filtering
  const [showAll, setShowAll] = useState(true)

  // notifications
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  // effect hook for fetching data
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const toggleImportanceOf = (id) => {
    //console.log(`importance of ${id} needs to be toggled`)

    // modify the json server data
    const url = `http://localhost:3001/api/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // set notes to a new array which contains all previous
        // notes and the new updated note
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }
  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: notes.length + 1
    }

    // update the data on the "server"
    noteService
      .create(noteObject)
      .then(returnedNote => {
        // update the page
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    //setNotes(notes.concat(noteObject))
    //setNewNote('')
  }

  // event handler for changing the note
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={()=>setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
