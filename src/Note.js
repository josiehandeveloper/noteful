import React from 'react';
import './App.css';
import store from './store';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import config from './config';

function deleteNoteRequest(noteId, cb) {
    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
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

export default function Note(props) {
    return (
        <NotefulContext.Consumer>
            {(context) => (

            <li key={props.id}>
                {props.name}
                <br/>
            {props.content}
                <br />
            {props.modified}
                <br/>
            <button onClick={() => {
                deleteNoteRequest(
                    props.id,
                context.deleteNote,
                )
            }}
            >
                Delete
            </button>
            </li>
        )}
        </NotefulContext.Consumer>
    )
}