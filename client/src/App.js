import React, { Component } from 'react'
import './App.css'
import Signup from './components/Signup'
// import Login from './components/Login'
import {Switch, Route} from "react-router-dom"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Game1 from "./components/Game1"
import Game2 from "./components/Game2"
import Game3 from "./components/Game3"
import Game4 from "./components/Game4"
import Game5 from "./components/Game5"

class App extends Component {

  constructor () {
    super()
    this.state = {
      loggedInUser: true,
    }
  }  


  render() {

    if (!this.state.loggedInUser){
      return (
        <div className="login-page">
          <Switch>
              <Route exact path="/" component={Signup} />
              {/* <Route exact path="/login" component={Login} /> */}
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
              <Route exact path="/game-1" component={Game1} />
              <Route exact path="/game-2" component={Game2} />
              <Route exact path="/game-3" component={Game3} />
              <Route exact path="/game-4" component={Game4} />
              <Route exact path="/game-5" component={Game5} />
          </Switch>
          <Menu></Menu>
        </main>
  
        </div>
      )
    }
    
  }
}

export default App
