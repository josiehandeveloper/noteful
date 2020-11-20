import React, {Component} from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';


export default class FolderNav extends Component {
    static contextType = NotefulContext; 

    render() {
        const { folders=[] } = this.context
        return (
            <div className='FolderNavList'>
                <ul className='FolderNav'>
                    {folders.map(folder => 
                        <li key ={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                        <li>
                            <NavLink exact to="/addFolder">
                                Add Folder
                            </NavLink>
                        </li>
                </ul>
            </div>
        )
    }
}

