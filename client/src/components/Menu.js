import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: {
        game1: true,
        game2: true,
        game3: true,
        game4: true,
        game5: true,
        game6: true,
      }
    }
  }

  render(){
    return(
          <nav className="menu" role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <section class="menuBackground"></section>
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                  <Link to="/game-1"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> Jueves Negro</li></Link>
                  <Link to="/game-2"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> Flex Puzzle</li></Link>
                  <Link to="/game-3"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> You've got Caged</li></Link>
                  <Link to="/game-4"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> La Máquina</li></Link>
                  <Link to="/game-6"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> Fix the Canvas</li></Link>
                  <Link to="/game-5"><li><i className={`far fa-dot-circle ${this.state.active ? "active" : "inactive"}`}></i> Drunk Kata</li></Link>
                  <Link to="/qreader"><li><i className="fas fa-tools tool"></i> QR Reader</li></Link>
                  <Link to="/bcrypt"><li><i className="fas fa-tools tool"></i> BCrypt Tool</li></Link>
                  <Link to="/fakeapi"><li><i className="fas fa-tools tool"></i> Call the API</li></Link>
              </ul>
            </div>
          </nav>
    )
  }
}

export default Menu
