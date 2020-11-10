import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import store from './store';

function FolderNav() {
    return(
        <>
            {store.map(folder =>
                <li key={folder.id}>
                    <Link to={`/folder/${folder.id}`}>
                        {folder.title}
                    </Link>
                </li>
            )}
    </>
    );
}

export default FolderNav;