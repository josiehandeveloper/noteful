import React, {Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import store from './store';
import FolderNav from './FolderNav';
import config from './config';


function deleteNoteRequest(noteId, cb) {
    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log({ data })
        cb(noteId)
      })
      .catch(error => {
        console.log(error)
      })
  }


export const NoteContainer = (props) => {
    let noteId = props.match.params.noteId
    let notes = store.notes.filter((note) => {
          return note.id === noteId
     })

     console.log(noteId);
    return (
        <div className='FolderNavNoteList'>
            <FolderNav />
            <ul className='NoteContent'>
                {notes.map(note => 
                    <li key={note.id}>
                        {note.name}
                        <br/>
                        {note.content}
                        <br />
                        {note.modified}
                        <br/>
                        <button onClick={() => {
                            deleteNoteRequest(
                                note.noteId,
                                note.deleteNote,
                            )
                        }}
                        >
                            Delete
                        </button>
                    </li>
                )}
            </ul> 
        </div>
    )
}
