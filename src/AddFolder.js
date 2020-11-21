import React, {Component} from 'react'; 
import config from './config'; 
import FolderNav from './FolderNav';
//import PropTypes from './prop-types';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: " ",
        touched: false
      }
    };
  }
   

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

    handleSubmit = e => {
        e.preventDefault()
        const { name } = this.state
          console.log(this.state);
        this.setState({ error: null })

        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${config.API_KEY}`
          },
          body: JSON.stringify({name:name.value})
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
            this.context.addFolder({name: name.value, id: data.id})
           
          })
          .catch(error => {
            console.log(error)
            this.setState({ error })
          })
      }
  
    render() {

        return (
          <>
          <FolderNav/>
            <form className="addFolder" onSubmit={this.handleSubmit}>
                <div className="addFolder_form">
                    <label htmlFor="foldername"> Folder Name</label>
                    <br />
                    <input 
                        type="text" 
                        className="addFolder_text"
                        name='name' 
                        id='name' 
                        onChange={e => this.updateName(e.target.value)}
                    />

                </div>
                <button type="submit" className="addFolder_button">
                    Add Folder
                </button>
            </form>
          </>
        )
    }
}


AddFolder.defaultProps = {

}