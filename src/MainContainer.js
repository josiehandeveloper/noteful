import React, {Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import store from './store';

export const MainContainer = (props) => {
   let folderId = props.match.params.folderId
   let notes = store.notes.filter((note) => {
         return note.folderId === folderId
    })

    return (
        <div className='FolderNavNoteList'>
            <ul className='FolderNav'>
                {store.folders.map(folder => 
                    <li key ={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                            {folder.name}
                        </Link>
                    </li>
                )}
            </ul>
            <ul className='NoteList'>
                {notes.map(note => 
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                        <br />
                        Date Modified: {note.modified}
                    </li>
                )}
            </ul> 
        </div>
    )
}



   