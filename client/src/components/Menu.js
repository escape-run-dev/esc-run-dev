import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
        <nav className="menu" role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
                <Link to="/game-1"><li>Jueves Negro</li></Link>
                <Link to="/game-2"><li>Flex Puzzle</li></Link>
                <Link to="/game-3"><li>U Got NCaged</li></Link>
                <Link to="/game-4"><li>La Máquina</li></Link>
                <Link to="/game-6"><li>Fix the Canvas</li></Link>
                <Link to="/game-5"><li>Drunk Kata</li></Link>
                <Link to="/qreader"><li>QR Reader</li></Link>
                <Link to="/bcrypt"><li>BCrypt Tool</li></Link>
                <Link to="/fakeapi"><li>Call the API</li></Link>
            </ul>
          </div>
        </nav>
    )
  }
}

export default Menu
