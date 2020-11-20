import React, {Component} from 'react'; 
import ValidationError from './ValidationError';
import store from './store';


class AddNote extends Component {
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
            }
        };
    }

    updateName(name) {
        this.setState({ name: { value: name, touched: true } });
    }

    updateContent(content){
        this.setState({ content: { value: content, touched: true } });
    }

    handleSubmit(event) {
        event.preventDefault(); 
        const { name, content } = this.state;
        console.log('Name: ', name);
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return "Name is required";
        } 
      }
    
    redirectToNoteContainer = () => {
        const { history } = this.props;
        if(history) history.push('/note/:noteId');
    }
    
    render() {
        const { history } = this.props; 
        const nameError = this.validateName();
        const folderOptions = store.folders.map(folder => {
            return (
                <option value={folder.id} key={folder.id}>
                    {folder.name}
                </option>
            )
        })
        
    
        return (
            <>
            <aside>
         
                    <button onClick={this.redirectToNoteContainer}>Back</button>
            </aside>
            <main>
        
                <form className="addNote_form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="addNote_formgroup">
                        <label htmlFor="addNoteName"> Note Name</label>
                        <br />
                        <input 
                            type="text" 
                            className="addNoteName_text"
                            name="name" 
                            id="name" 
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <div className="addNote_formgroup">
                        <label htmlFor="notecontent"> Note Content</label>
                        <br />
                        <textarea 
                            type="text" 
                            className="addNoteContent_text"
                            content="content" 
                            onChange={e => this.updateContent(e.target.value)}
                        />
                    </div>
                    <div className="addNote_formgroup">
                        <label htmlFor="folderoption">Select a folder</label>
                        <br />
                        <select name='folderId'>{folderOptions}</select>
                    </div>
                    <br/>
                    <button type="submit" className="addNote_button">
                        Add Note
                    </button>
                </form>
            </main>
            </>
        )
    }
}

export default AddNote; 