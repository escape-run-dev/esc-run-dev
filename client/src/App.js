import React, { Component } from 'react';
import './App.css';
import Signup from './components/Signup';
import {Switch, Route,} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signup" component={Signup} />
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/logout" /> */}
      </Switch>
    )
  }
}

export default App;
