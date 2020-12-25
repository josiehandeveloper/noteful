import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import MainContainer from "./Components/MainContainer/MainContainer";
import NoteContainer from "./Components/NoteContainer/NoteContainer";
import HomeContainer from "./Components/HomeContainer/HomeContainer";
import Header from "./Components/Header/Header";
import NotefulContext from "./Components/NotefulContext/NotefulContext";
import config from "./config";
import "./App.css";
import AddFolder from "./Components/AddFolder/AddFolder";
import AddNote from "./Components/AddNote/AddNote";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import PropTypes from "prop-types";
import EditNote from "./Components/EditNote/EditNote";

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.log({ error });
      });
  }

  deleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((n) => n.id !== noteId),
    });
  };

  addFolder = (folderData) => {
    this.setState({
      folders: [...this.state.folders, folderData],
    });
  };

  addNote = (noteData) => {
    this.setState({
      notes: [...this.state.notes, noteData],
    });
  };

  updateNote = (updatedNote) => {
    const newNotes = this.state.notes.map((not) =>
      not.id === updatedNote.id ? updatedNote : not
    );
    this.setState({
      notes: newNotes,
    });
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updateNote: this.updateNote,
    };

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <ErrorBoundary>
            <Router>
              <Header />
              <Route exact path="/" component={HomeContainer} />
              <Route path="/folder/:folderId" component={MainContainer} />
              <Route path="/addFolder" component={AddFolder} />
              <Route path="/note/:noteId" component={NoteContainer} />
              <Route path="/addNote" component={AddNote} />
              <Route path="/edit/:noteId" component={EditNote} />
            </Router>
          </ErrorBoundary>
        </div>
      </NotefulContext.Provider>
    );
  }
}
export default withRouter(App);

App.propType = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
