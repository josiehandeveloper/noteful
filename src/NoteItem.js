import React from 'react';
import './App.css';
import NotefulContext from './NotefulContext';
import config from './config';
import { Link } from 'react-router-dom';

export default class NoteItem extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok) 
          return res.json().then(e => Promise.reject(e))
            
          return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        //this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.log(error)
      })
  }

  

  render() {
    const { name, id, content, modified } = this.props
    return (
    <div className='Note'>
      <h2 className="Note__title">
        <Link to={`/note/${id}`}>
          {name}
        </Link>
        <p>{content}</p>
        <p>{modified}</p>
      </h2>
        <button className='Note__delete'
          type='submit'
          onClick={this.handleClickDelete}>
            Delete
        </button>
    </div>
    )
  }
}

