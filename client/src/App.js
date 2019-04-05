import React, { Component } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import {Switch, Route} from "react-router-dom"
import Header from "./components/Header"
import Auth from './services/auth-service'
import Game1 from "./components/Game1"
import Game2 from "./components/Game2"
import Game3 from "./components/Game3"
import Game4 from "./components/Game4"
import Game5 from "./components/Game5"
import Game6 from "./components/Game6"
import VideoTest from './components/VideoTest'
import Qreader from './components/Qreader'
import Bcrypt from './components/Bcrypt'
import Fakeapi from './components/FakeApi'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Link } from 'react-router-dom';


class App extends Component {

  constructor () {
    super()
    this.state = {
      loggedInUser: false,
      game: {
        gameId: undefined,
        qrRead: false,
        gameFinished: false,
        rounds: {
          round1: false,
          round2: false,
          round3: false,
          round4: false,
          round5: false,
          round6: false
        },
      }
    }
    this.service = new Auth()
    this.fetchUser()
  }  

  fetchUser() {
    if (this.state.loggedInUser === false) {
      this.service.loggedIn()
        .then(response => {
          this.setState({ loggedInUser: response })})
        .catch(err => this.setState({loggedInUser: false}))
    }
  }

  setTheUser = (userObj) => {
    this.setState({ loggedInUser: userObj })
  }

  getTheGame = () => {
    console.log(this.state.game)
    return this.state.game
  }

  setTheGame = (gameObj) => {
  //   this.service.setTheGame(gameObj)
  //   .then(response => {

  //     const gameUpdated = {
  //       gameId: response._id,
  //       rounds: {
  //         round1: response.round1,
  //         round2: response.round2,
  //         round3: response.round3,
  //         round4: response.round4,
  //         round5: response.round5,
  //         round6: response.round6
  //       },    
  //     }

  //     this.setState({
  //       ...this.state,
  //       game: {
  //         ...this.state.game,
  //         gameId: gameUpdated.gameId,
  //         rounds : gameUpdated.rounds
  //       }
  //     })

  //     })
  //     .catch(err => console.log(err))
    }

    roundCompleted = (roundToUpdate, value) => {

      let gameToUpdate = {
        gameId: this.state.loggedInUser.games[this.state.loggedInUser.games.length - 1],
        rounds: {
          round1: this.state.game.rounds.round1,
          round2: this.state.game.rounds.round2,
          round3: this.state.game.rounds.round3,
          round4: this.state.game.rounds.round4,
          round5: this.state.game.rounds.round5,
          round6: this.state.game.rounds.round6
        },    
      }

      switch(roundToUpdate){
        case ("round1"): 
          gameToUpdate.rounds.round1 = value
        break
        case ("round2"): 
          gameToUpdate.rounds.round2 = value
        break
        case ("round3"): 
          gameToUpdate.rounds.round3 = value
        break
        case ("round4"): 
          gameToUpdate.rounds.round4 = value
        break
        case ("round5"): 
          gameToUpdate.rounds.round5 = value
        break
        case ("round6"): 
          gameToUpdate.rounds.round6 = value
        break
        default:
        console.log("Me han obligado")
        break
      }

      this.setState({
        ...this.state,
        game: {
          ...this.state.game,
          gameId: gameToUpdate.gameId,
          rounds : gameToUpdate.rounds
        }
      })

      // this.setTheGame(gameToUpdate)
  
      return
  
    }

    logout = () => {
      this.service.logOut()
      .then(response => this.setTheUser(response))
        .then(response => window.location.assign("/login"))
    }

    // disableLink = link => {
    //   if (!link.classList.contains('isDisabled')){
    //     link.classList.add('isDisabled');
    //     // link.setAttribute('data-href', link.href);
    //     // link.href = '';
    //   }
    // }
    
    // enableLink = link => {
    //   if (link.classList.contains('isDisabled')) {
    //     link.classList.remove('isDisabled');
    //     // link.href = link.getAttribute('data-href');
    //   }
    // }

    checkQr = () => {
      this.setState({
        ...this.state,
        game: {
          ...this.state.game,
          qrRead: true,
        }
      })
      console.log(this.state.game.qrRead)
    }

  render() {

    // const isDisabled = [...document.getElementsByClassName("isDisabled")]
    // const active = [...document.getElementsByClassName("active")]

    // inactive.forEach(link => {
    //   this.disableLink(link.parentNode.parentNode)
    // })
    // active.forEach(link => {
    //   this.enableLink(link.parentNode.parentNode)
    // })

      return (
        <div className="app">
          <Header></Header>
        
        <main className="main-container">
          <Switch>
            <Route exact path='/' render={() => <Signup user={this.state.loggedInUser} setUser={this.setTheUser} />} />            
            <Route exact path='/signup' render={() => <Signup user={this.state.loggedInUser} setUser={this.setTheUser} />} />
            <Route exact path='/login' render={() => <Login setTheGame={this.setTheGame} user={this.state.loggedInUser} setUser={this.setTheUser} />} /> 
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/bcrypt" component={Bcrypt} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} checkQr={this.checkQr} exact path="/qreader" component={Qreader} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/vid" component={VideoTest} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-api" component={Fakeapi} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-1" component={Game1} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} qrRead={this.state.game.qrRead} exact path="/game-2" component={Game2} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-3" component={Game3} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-4" component={Game4} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-5" component={Game5} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.setTheGame} roundCompleted={this.roundCompleted} exact path="/game-6" component={Game6} />

          </Switch>
          <nav className="menu" role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
              <section class="menuBackground"></section>
              <span></span>
              <span></span>
              <span></span>
              <ul id="menu">
                  <Link to="/game-1"><li><i className="far fa-dot-circle active"></i> Jueves Negro</li></Link>
                  <Link className={`${this.state.game.rounds.round1 ? "" : "isDisabled"}`} to="/game-2"><li><i className={`far fa-dot-circle ${this.state.game.rounds.round1 ? "active" : "inactive"}`}></i> Flex Puzzle</li></Link>
                  <Link className={`${this.state.game.rounds.round1 ? "" : "isDisabled"}`} to="/game-4"><li><i className={`far fa-dot-circle ${this.state.game.rounds.round1 ? "active" : "inactive"}`}></i> La Máquina</li></Link>
                  <Link className={`${this.state.game.rounds.round1 ? "" : "isDisabled"}`} to="/game-3"><li><i className={`far fa-dot-circle ${this.state.game.rounds.round1 ? "active" : "inactive"}`}></i> U've got Caged</li></Link>
                  <Link to="/game-6"><li><i className="far fa-dot-circle active"></i> Fix the Canvas</li></Link>
                  <Link className={`${this.state.game.rounds.round3 || this.state.game.rounds.round6 ? "" : "isDisabled"}`} to="/game-5"><li><i className={`far fa-dot-circle ${this.state.game.rounds.round3 || this.state.game.rounds.round6 ? "active" : "inactive"}`}></i> Drunk Kata</li></Link>
                  <Link to="/qreader"><li><i className="fas fa-tools tool"></i> QR Reader</li></Link>
                  <Link to="/bcrypt"><li><i className="fas fa-tools tool"></i> BCrypt Tool</li></Link>
                  <Link to="/game-api"><li><i className="fas fa-tools tool"></i> Call the API</li></Link>
                  <Link to="#" onClick={this.logout}><li><i className="fas fa-sign-out-alt logout-icon"></i> Dejar la partida</li></Link>
              </ul>
            </div>
          </nav>
        </main>
  
        </div>
      )
    }
    
  }


export default App