import React, { Component } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import {Switch, Route} from "react-router-dom"
import Header from "./components/Header"
import Auth from './services/auth-service'
import Menu from "./components/Menu"
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

class App extends Component {

  constructor () {
    super()
    this.state = {
      loggedInUser: false,
      game: {
        gameId: undefined,
        rounds: {
          round1: false,
          round2: false,
          round3: false,
          round4: false,
          round5: false,
          round6: false
        },
        qrRead: false,
        gameFinished: false,
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

  getTheGame = (gameId) => {

    //return game
  }

  setTheGame = (gameId, round) => {
    //La round es para que cuando el hijo llame, sepa qué hijo ha llamado
  }

  render() {
      return (
        <div className="app">
          <Header></Header>
        
        <main className="main-container">
          <Switch>
            <Route exact path='/' render={() => <Signup user={this.state.loggedInUser} setUser={this.setTheUser} />} />            
            <Route exact path='/signup' render={() => <Signup user={this.state.loggedInUser} setUser={this.setTheUser} />} />
            <Route exact path='/login' render={() => <Login user={this.state.loggedInUser}setUser={this.setTheUser} />} /> 
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/bcrypt" component={Bcrypt} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/qreader" component={Qreader} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/vid" component={VideoTest} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/api" component={Fakeapi} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-1" component={Game1} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-2" component={Game2} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-3" component={Game3} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-4" component={Game4} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-5" component={Game5} />
            <ProtectedRoutes user={this.state.loggedInUser} getTheGame={this.getTheGame} setTheGame={this.getTheGame} exact path="/game-6" component={Game6} />

          </Switch>
          <Menu roundsInfo={this.state.game.rounds} setTheUser={this.setTheUser}></Menu>
        </main>
  
        </div>
      )
    }
    
  }


export default App