import React, { Component } from 'react'; 
import './App.css';
import FolderNav from './FolderNav';
import { NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import NoteItem from './NoteItem'; 
import PropTypes from 'prop-types';

export default class MainContainer extends Component{

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
              <br />
              <li>
              <NavLink exact to="/addNote">
                  Add Note
              </NavLink>
              </li>
            </ul> 
        </div>
      )
    }
  }
MainContainer.propTypes = {
  id: PropTypes.string.isRequired,
}
