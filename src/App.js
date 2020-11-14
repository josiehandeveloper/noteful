import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {MainContainer}  from './MainContainer';
import {NoteContainer} from './NoteContainer';
import Header from './Header';
import NotefulContext from './NotefulContext'; 
import config from './config';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  deleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteId
    )

    this.setState({
      notes: newNotes
    });
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

  render () {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };

    return (
        <NotefulContext.Provider value={contextValue}>
          <div className='App'>
          <Header />
            <Router>
              <Switch>
                <Route 
                  exact path= '/' component={MainContainer}/>
                <Route path='/folder/:folderId' component={MainContainer}/>
                <Route path='/note/:noteId' component={NoteContainer}/>
              </Switch>
            </Router>
          </div>
        </NotefulContext.Provider>
    )
  }
}


export default App; 