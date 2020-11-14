import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import store from './store';
import FolderNav from './FolderNav';
import config from './config';
import NotefulContext from './NotefulContext';

export default class NoteContainer extends Component{

      static contextType = NotefulContext;

     deleteNoteRequest = (noteId, cb) => {
      fetch(`${config.API_ENDPOINT}/notes` + `/${noteId}`, {
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

    render() {
      let noteId = this.props.match.params.noteId
      let notes = store.notes.filter((note) => {
            return note.id === noteId
       })

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
                            this.deleteNoteRequest(
                                note.id,
                                this.context.deleteNote,
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
}
