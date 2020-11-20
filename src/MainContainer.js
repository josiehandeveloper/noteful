import React, { Component } from 'react'; 
import './App.css';
import FolderNav from './FolderNav';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NoteItem from './NoteItem'; 
import { getNotesForFolder } from './notehelpers';
import AddNote from './AddNote';

export default class MainContainer extends Component{
    static defaultProps = {
        match: {
            params:{}
        }
    }

    static contextType = NotefulContext
    
    render() {
        let folderId = this.props.match.params.folderId
        let notes = this.context.notes.filter((note) => {
              return note.folderId === folderId
         })
  
      return (
        <div className='FolderNavNoteList'>
          <FolderNav />
            <ul className='NoteContent'>
              {notes.map(note => 
                <li key={note.id}>
                    <NoteItem
                        key={note.id}
                        {...note}
                        Date modified={note.modified} 
                    />
                                        
                </li>
              )}
            </ul> 
        </div>
      )
    }
  }
