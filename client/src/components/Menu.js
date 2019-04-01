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
                <Link className="menu-link" to="/game-1">Jueves Negro</Link>
                <Link className="menu-link" to="/game-2">Flex Puzzle</Link>
                <Link className="menu-link" to="/game-3">U Got NCaged</Link>
                <Link className="menu-link" to="/game-4">La Máquina</Link>
                <Link className="menu-link" to="/game-6">Fix the Canvas</Link>
                <Link className="menu-link" to="/game-5">Drunk Kata</Link>
                <Link className="menu-link" to="/qreader">QR Reader</Link>
                <Link className="menu-link" to="/bcrypt">BCrypt Tool</Link>
                <Link className="menu-link" to="/fakeapi">Call the API</Link>
            </ul>
        </nav>
    )
  }
}

export default Menu
