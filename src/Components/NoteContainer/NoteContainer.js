import React, { Component } from "react";
import "../../App.css";
import FolderNav from "../FolderNav/FolderNav";
import NotefulContext from "../NotefulContext/NotefulContext";
import NoteItem from "../NoteItem/NoteItem";

export default class NoteContainer extends Component {
  static contextType = NotefulContext;

  render() {
    let noteId = this.props.match.params.noteId;
    let notes = this.context.notes.filter((note) => {
      return note.id === Number(noteId);
    });

    return (
      <div className="FolderNavNoteList">
        <FolderNav />
        <ul className="NoteContent">
          <li>
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                name={note.name}
                content={note.content}
                modified={note.modified}
                history={this.props.history}
              />
            ))}
          </li>
        </ul>
      </div>
    );
  }
}
