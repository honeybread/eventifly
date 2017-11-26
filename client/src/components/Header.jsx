import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

const Header = (props) => {
    console.log("Came to header!!!");
    return (
        <div>
            <Link to='/' style={{textDecoration: 'none'}}>
                <h3> Eventifly  </h3>
            </Link>
        </div>);

    
    
    
}

export default Header;