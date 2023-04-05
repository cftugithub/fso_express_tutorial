import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import axios from 'axios'

const notes = [
  {
    id: 1,
    content: 'HTML is easy breezy peezy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]


// try drawing the component only after we get the response
// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
