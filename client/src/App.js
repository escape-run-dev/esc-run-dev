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
import Video from './components/VideoTest'
import Qreader from './components/Qreader'
import Bcrypt from './components/Bcrypt'
import Fakeapi from './components/FakeApi'

class App extends Component {

  constructor () {
    super()
    this.state = {
      loggedInUser: false,
    }
    this.service = new Auth()
  }  

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedIn()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  setTheUser = (userObj) => {
    this.setState({ loggedInUser: userObj })
  }

  render() {

    this.fetchUser()

    if (!this.state.loggedInUser){
      return (
        <div className="login-page">
          <Switch>
            <Route exact path='/' render={() => <Signup setUser={this.setTheUser} />} />            
            <Route exact path='/signup' render={() => <Signup setUser={this.setTheUser} />} />
            <Route exact path='/login' render={() => <Login setUser={this.setTheUser} />} />
          </Switch>
        </div>
      )
    }
    else {
      return (
        <div className="app">
          <Header></Header>
        
        <main className="main-container">
          <Switch>
              <Route exact path="/bcrypt" component={Bcrypt}/>
              <Route exact path="/qreader" component={Qreader}/>
              <Route exact path="/vid" component={Video} />
              <Route exact path="/fakeapi" component={Fakeapi} />
              <Route exact path="/game-1" render={() => <Game1 user={this.state.loggedInUser} />} />
              <Route exact path="/game-2" render={() => <Game2 user={this.state.loggedInUser} />} />
              <Route exact path="/game-3" render={() => <Game3 user={this.state.loggedInUser} />} />
              <Route exact path="/game-4" render={() => <Game4 user={this.state.loggedInUser} />} />
              <Route exact path="/game-5" render={() => <Game5 user={this.state.loggedInUser} />} />
              <Route exact path="/game-6" render={() => <Game6 user={this.state.loggedInUser} />} />
          </Switch>
          <Menu></Menu>
        </main>
  
        </div>
      )
    }
    
  }
}

export default App
