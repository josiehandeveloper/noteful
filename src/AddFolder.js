import React, {Component} from 'react'; 
import NoteFulContext from './NotefulContext';
import config from './config'; 

export default class AddFolder extends Component {

    static contextType = NoteFulContext; 
   

    handleSubmit = e => {
        e.preventDefault()
        const { name } = e.target
        const folder = {
          name: name.value,
        }
        this.setState({ error: null })

        fetch(config.API_ENDPOINT, {
          method: 'POST',

          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${config.API_KEY}`
          }
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
            name.value = ''
            this.context.addFolder(data)
           
          })
          .catch(error => {
            console.log(error)
            this.setState({ error })
          })
      }
  
    render() {

        return (
            <form className="addFolder" onSubmit={this.handleSubmit}>
                <div className="addFolder_form">
                    <label htmlFor="foldername"> Folder Name</label>
                    <br />
                    <input 
                        type="text" 
                        className="addFolder_text"
                        name='name' 
                        id='name' 
                    />

                </div>
                <button type="submit" className="addFolder_button">
                    Add Folder
                </button>
            </form>
        )
    }
}
