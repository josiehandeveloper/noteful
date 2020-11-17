import React, {Component} from 'react'; 


class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
        };
    }

    updateName(name){
        this.setState({name});
    }

    handleSubmit(event) {
        event.preventDefault(); 
        const { name } = this.state;
        console.log('Name: ', name);
    }


    render() {

        return (
            <form className="addFolder" onSubmit={e => this.handleSubmit(e)}>
                <div className="addFolder_form">
                    <label htmlFor="foldername"> Folder Name</label>
                    <br />
                    <input 
                        type="text" 
                        className="addFolder_text"
                        name="name" 
                        id="name" 
                        onChange={e => this.updateName(e.target.value)}
                    />

                </div>
                <button type="submit" className="addFolder_button">
                    Add Folder
                </button>
            </form>
        )
    }
}

export default AddFolder; 