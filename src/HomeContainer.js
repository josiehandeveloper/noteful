import React, { Component } from 'react'; 
import './App.css';
import NoteItem from './NoteItem'; 
import NotefulContext from './NotefulContext';
import FolderNav from './FolderNav';
import { NavLink } from 'react-router-dom';

class HomeContainer extends Component {
    static contextType = NotefulContext;

    render () {
        const { notes } = this.context
        return (
            <section className='NotesListNav'>
                <h2>Notes</h2>
                <ul class='Nav'>
                    <FolderNav/>

                </ul>
                <ul className='NotesList' aria-live='polite'>
                    {notes.map(note => 
                       <NoteItem 
                       key={note.id}
                       {...note}
                       />
                    )}
                    <br />
                    <li>
                        <NavLink exact to="/addNote">
                            Add Note
                        </NavLink>
                    </li>
                </ul>
                
            </section>
        );
    }
}


export default HomeContainer; 