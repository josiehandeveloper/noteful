import React, { Component } from 'react'; 
import './App.css';
import store from './store';
import FolderNav from './FolderNav';
import { Link } from 'react-router-dom';

export const MainContainer = (props) => {
   let folderId = props.match.params.folderId
   let notes = store.notes.filter((note) => {
         return note.folderId === folderId
    })

    return (
        <>
            <FolderNav />
        
            <main>
                <ul className='NoteList'>
                    {notes.map(note => 
                        <li key={note.id}>
                            <Link to={`/note/${note.id}`} >
                                {note.name}
                            </Link>
                            <br />
                            <p>Date Modified: {note.modified}</p>
                        </li>
                    )}
                </ul> 
            </main>
        </>
    )
}





