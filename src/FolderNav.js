import React, {Component} from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import store from './store';
import NotefulContext from './NotefulContext';


class FolderNav extends Component {
    static contextType = NotefulContext; 

    render() {
        return (
            <div className='FolderNavList'>
                <ul className='FolderNav'>
                    {store.folders.map(folder => 
                        <li key ={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default FolderNav;