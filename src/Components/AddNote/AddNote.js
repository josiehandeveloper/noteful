import React, {Component} from 'react'; 
import ValidationError from '../ValidationError/ValidationError';
import NotefulContext from "../NotefulContext/NotefulContext";
import config from '../../config';
import PropTypes from 'prop-types';


export default class AddNote extends Component {
    static contextType = NotefulContext; 
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: " ",
                touched: false
            },
            content: {
                value: " ",
                touched: false
            },
            folderId: ''
        };
    }
    static contextType = NotefulContext; 
    

    updateName(name) {
        this.setState({ name: { value: name, touched: true } });
    }

    updateContent(content){
        this.setState({ content: { value: content, touched: true } });
    }

    updateFolderId(folderId){
        this.setState({folderId})
    }


    handleSubmit(event) {
        event.preventDefault(); 
        const { name, content, folderId } = this.state;
        this.setState({ error:null })

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
  
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${config.API_KEY}`
            },
            body: JSON.stringify({name:name.value, content: content.value, folder_id: folderId})
          })
            .then(res => {
              if (!res.ok) {
                return res.json().then(error => {
                
                  throw error
                })
              }
              return res.json()
            })
            .then(data => {
              this.context.addNote(data)
              this.props.history.push('/');
            })
            .catch(error => {
              console.log(error)
              this.setState({ error })
            })

    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } 
      }
    
    
    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
          return "Content is required";
        } 
      }

    
    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent(); 
        const { folders } = this.context
    
        return (
            <>
            <main>
        
                <form className="addNote_form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="addNote_formgroup">
                        <p><label htmlFor="addNoteName"> Note Name</label>
                        <input 
                            type="text" 
                            className="addNoteName_text"
                            name="name" 
                            id="name" 
                            folderId="name"
                            required
                            onChange={e => this.updateName(e.target.value)}
                        /></p>
                        {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <div className="addNote_formgroup">
                        <p><label htmlFor="notecontent"> Note Content</label>
                        <textarea 
                            type="text" 
                            className="addNoteContent_text"
                            content="content" 
                            onChange={e => this.updateContent(e.target.value)}
                        />
                        </p>
                        {this.state.content.touched && <ValidationError message={contentError} />}
                    </div>
                    <div className="addNote_formgroup">
                        <p><label htmlFor="folderoption">Select a folder</label>
                        <select name='folderId' onChange={e=> this.updateFolderId(e.target.value)}>
                            <option value={' '}>...</option>
                            {folders.map(folder => 
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select></p>
                    </div>
                    <button type="submit" className="addNote_button" >
                        Add Note
                    </button>
                </form>
            </main>
            </>
        )
    }
}

AddNote.propType = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
}