import React from 'react'

const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
  updateNote: () => {},
})

export default NotefulContext; 