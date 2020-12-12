import React from 'react';
import './App.css';
import NotefulContext from './NotefulContext';
import config from './config';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NoteItem extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  }
  static contextType = NotefulContext;

  redirectToHomeContainer = () => {
    const { history } = this.props;
    if(history) history.push('/');
  }

  handleClickDelete = e => {
    e.preventDefault();
    this.redirectToHomeContainer(); 
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
      })
      .catch(error => {
        this.setState({error})
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
        <Link to={`/edit/${id}`}>
          Edit
        </Link>
        <button className='Note__delete'
          type='submit'
          onClick={this.handleClickDelete}
          >
            Delete
        </button>
    </div>
    )
  }
}

NoteItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string,
  content: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
}
