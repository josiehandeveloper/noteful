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
    console.log('here' , noteId)
    console.log('before', this.state.notes.length)
    const newNotes = this.state.notes.filter(n =>
      n.id != noteId
    )
    console.log('after', newNotes.length)
    this.setState({
      notes: newNotes
    }, () => {
      this.props.history.push('/')
    });
  };

  addFolder = (folderId) => {
    const newFolders = this.state.folders.filter(f =>
      f.id != folderId  
    )
    this.setState({
      folders: newFolders
    }, () => {
      this.props.history.push('/')
    });
  };

  addNote = (noteId) => {
    const newNotes = this.state.notes.filter(n => 
      n.id != noteId
    )
    this.setState({ 
      notes: newNotes
    }, () => {
      this.props.history.push('/')
    });
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

            <Router>
            <Header />
              <Switch>
                <Route exact path= '/' component={HomeContainer}/>
                <Route path='/folder/:folderId' component={MainContainer}/>
                <Route exact path='/addFolder' component={AddFolder}/>
                <Route path='/note/:noteId' component={NoteContainer}/>
                <Route exact path='/addNote' component={AddNote}/>
              </Switch>
            </Router>
          </div>
        </NotefulContext.Provider>
    )
  }
}
  export default withRouter(App); 
 

