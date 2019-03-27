import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login'
import Auth from './services/auth-service'
import {Switch, Route,} from "react-router-dom";

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      loggedInUser: true,
    }

    this.auth = new Auth
  }
  
  render() {

    return (
      
    )
  }
}

export default App;
