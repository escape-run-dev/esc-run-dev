import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth-service'

class Menu extends Component {
  constructor(props){
    super(props)
    this.state = {
      round1: false,
      round2: false,
    }
    this.auth = new AuthService()

    this.logout = () => {
      this.auth.logOut()
      .then(response => this.props.setTheUser(response))
        .then(response => window.location.assign("/login"))
        }
    }

    disableLink = link => {
      link.classList.add('isDisabled');
      link.setAttribute('data-href', link.href);
      link.href = '';
    }
    
    enableLink = link => {
      if (link.classList.contains('isDisabled')) {
        link.classList.remove('isDisabled');
        link.href = link.getAttribute('data-href');
      }
    }
   
  componentDidMount () {
    console.log(this.props.roundsInfo)
    console.log(this.props.getTheGame())
    

    if (this.props.roundsInfo.round1) this.setState({round1: true})
    if (this.props.roundsInfo.round3 || this.props.roundsInfo.round6) this.setState({round2: true})

    const inactive = [...document.getElementsByClassName("inactive")]
    const active = [...document.getElementsByClassName("active")]

    inactive.forEach(link => {
      this.disableLink(link.parentNode.parentNode)
    })
    active.forEach(link => {
      this.enableLink(link.parentNode.parentNode)
    })
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
                  <Link to="/game-1"><li><i className="far fa-dot-circle active"></i> Jueves Negro</li></Link>
                  <Link to="/game-2"><li><i className={`far fa-dot-circle ${this.state.round1 ? "active" : "inactive"}`}></i> Flex Puzzle</li></Link>
                  <Link to="/game-4"><li><i className={`far fa-dot-circle ${this.state.round1 ? "active" : "inactive"}`}></i> La Máquina</li></Link>
                  <Link to="/game-3"><li><i className={`far fa-dot-circle ${this.state.round1 ? "active" : "inactive"}`}></i> U've got Caged</li></Link>
                  <Link to="/game-6"><li><i className="far fa-dot-circle active"></i> Fix the Canvas</li></Link>
                  <Link to="/game-5"><li><i className={`far fa-dot-circle ${this.state.round2 ? "active" : "inactive"}`}></i> Drunk Kata</li></Link>
                  <Link to="/qreader"><li><i className="fas fa-tools tool"></i> QR Reader</li></Link>
                  <Link to="/bcrypt"><li><i className="fas fa-tools tool"></i> BCrypt Tool</li></Link>
                  <Link to="/game-api"><li><i className="fas fa-tools tool"></i> Call the API</li></Link>
                  <Link to="#" onClick={this.logout}><li><i className="fas fa-sign-out-alt logout-icon"></i> Dejar la partida</li></Link>
              </ul>
            </div>
          </nav>
    )
  }
}

export default Menu
