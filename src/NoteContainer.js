import React, {Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import store from './store';


export const NoteContainer = (props) => {
    let folderId = props.match.params.folderId
    let notes = store.notes.filter((note) => {
    return note.folderId === folderId
         })
    return (
        <div className='NoteContentList'>
            <ul className='NoteContent'>
                {notes.map(note => 
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                        <br />
                        {note.content}
                    </li>
                )}
            </ul> 
        </div>
    )
}