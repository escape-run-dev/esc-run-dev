import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
        <nav className="menu">
            <ul>
                <Link className="menu-link" to="/bcrypt">Bcrypt</Link>
                <Link className="menu-link" to="/qreader">QReader</Link>
                <Link className="menu-link" to="/fakeapi">Api Calls</Link>
                <Link className="menu-link" to="/game-1">PRUEBA 1</Link>
                <Link className="menu-link" to="/game-2">PRUEBA 2</Link>
                <Link className="menu-link" to="/game-3">PRUEBA 3</Link>
                <Link className="menu-link" to="/game-4">PRUEBA 4</Link>
                <Link className="menu-link" to="/game-5">PRUEBA 5</Link>
            </ul>
        </nav>
    )
  }
}

export default Menu
