import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import MainContainer  from './MainContainer';
import NoteContainer from './NoteContainer';
import HomeContainer from './HomeContainer';
import Header from './Header';
import NotefulContext from './NotefulContext'; 
import config from './config';
import './App.css';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary'; 
import PropTypes from 'prop-types';
import EditNote from './EditNote'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.log({error});
      });
  }


  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteId
    )
    
    this.setState({
      notes: newNotes
    });
  };

  addFolder = (folderData) => {
    this.setState({
      folders: [...this.state.folders, folderData]
    })
  };

  addNote = (noteData) => {
    this.setState({
      notes: [...this.state.notes, noteData]
    })
  }

  updateNote = updatedNote => {
    const newNotes = this.state.notes.map(not => 
      (not.id === updatedNote.id)
        ? updatedNote
        : not
    )
    this.setState({
      notes: newNotes
    })
  };

  render () {
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
          <div className='App'>
            <ErrorBoundary>
            <Router>
            <Header />
              <Switch>
                <Route exact path= '/' component={HomeContainer}/>
                <Route path='/folder/:folderId' component={MainContainer}/>
                <Route exact path='/addFolder' component={AddFolder}/>
                <Route path='/note/:noteId' component={NoteContainer}/>
                <Route exact path='/addNote' component={AddNote}/>
                <Route path='/edit/:noteId' component={EditNote}/>
              </Switch>
            </Router>
            </ErrorBoundary>
          </div>
        </NotefulContext.Provider>
    )
  }
}
export default withRouter(App); 
 
App.propType = {
  history: PropTypes.shape({
      push: PropTypes.func.isRequired
  })
}
