import React, { Component } from "react";
import "../../App.css";
import NoteItem from "../NoteItem/NoteItem";
import NotefulContext from "../NotefulContext/NotefulContext";
import FolderNav from "../FolderNav/FolderNav";
import { NavLink } from "react-router-dom";

class HomeContainer extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    return (
      <section className="NotesListNav">
        <h2>Notes</h2>
        <ul className="Nav">
          <FolderNav />
        </ul>
        <ul className="NotesList" aria-live="polite">
          {notes.map((note) => (
            <NoteItem key={note.id} history={this.props.history} {...note} />
          ))}
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
