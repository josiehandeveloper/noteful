import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from './config';
import {MainContainer}  from './MainContainer';
import NoteContainer from './NoteContainer';
import NotefulContext from './NotefulContext'; 
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';

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

  addFolder = folderName => {
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify({name: folderName})
    })
    .then(res => res.json())
    .then(resJSON => {
      const newFolders = [this.state.folders, resJSON]
      this.setState({ folders: newFolders })

    })
    .catch(err => {
      console.log(err)
    })
  }

  addNote = noteName => {
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
      body: JSON.stringify({name: noteName})
    })
    .then(res => res.json())
    .then(resJSON => {
      const newNotes = [this.state.notes, resJSON]
      this.setState({ notes: newNotes})

    })
    .catch(err => {
      console.log(err)
    })
  }

  render () {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
        <NotefulContext.Provider value={contextValue}>
          <div className='App'>
          <Header />
            <Router>
              <Switch>
                <Route exact path= '/'>
                    <ErrorBoundary message="Could not load homepage">
                      component={MainContainer}
                    </ErrorBoundary>
                </Route> 
                <Route path='/folder/:folderId'>
                  <ErrorBoundary message="Could not load main page">
                    component={MainContainer}
                  </ErrorBoundary>
                </Route>
                <Route path='/folder/addFolder'>
                  <ErrorBoundary message="Could not load add folder page">
                    component={AddFolder}
                  </ErrorBoundary>
                </Route>
                <Route path='/note/:noteId'>
                  <ErrorBoundary message="Could not load note page">
                    component={NoteContainer}
                  </ErrorBoundary>
                </Route> 
                <Route path='/note/addNote'>
                  <ErrorBoundary message="Could not load add note page">
                    component={AddNote}
                  </ErrorBoundary>
                </Route> 
              </Switch>
            </Router>
          </div>
        </NotefulContext.Provider>
    )
  }
}


export default App; 