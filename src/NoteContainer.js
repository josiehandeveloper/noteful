import React, { Component } from 'react';
import './App.css';
import FolderNav from './FolderNav';
import NotefulContext from './NotefulContext';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';


export default class NoteContainer extends Component{

      static contextType = NotefulContext;

    render() {
      let noteId = this.props.match.params.noteId
      let notes = this.context.notes.filter((note) => {
            return note.id === noteId
       })

      
       return (
        <div className='FolderNavNoteList'>
            <FolderNav />
            <ul className='NoteContent'>
              <li>
              {notes.map(note => 
                <NoteItem 
                  key={note.id}
                  id={note.id}
                  name={note.name}
                  content={note.content}
                  modified={note.modified}
                  onClickDelete={this.DeleteNote}
                />
              )}
              </li>
            </ul> 
        </div>
        )
    }
}
NoteContainer.propTypes = {
  id: PropTypes.string.isRequired,
}