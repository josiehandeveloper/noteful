import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainContainer } from './MainContainer';
import { NoteContainer } from './NoteContainer';
import Header from './Header';
import './App.css';

class App extends Component {


  render () {
    return (
      <div className='App'>
          <Header />
        <Router>
          <Switch>
            <Route 
              exact path= '/' component={MainContainer}/>
            <Route path='/folder/:folderId' component={MainContainer }/>
            <Route path='/note/:noteId' component={NoteContainer}/>
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App; 