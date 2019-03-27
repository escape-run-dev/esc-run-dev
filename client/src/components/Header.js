import React, { Component } from 'react';
import Stopwatch from "./Stopwatch"

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
        <header className="main-header">
            <h1>/Escape && Run Dev</h1>
            <Stopwatch></Stopwatch>
            <p>Completed: 60%</p>
        </header>
    )
  }
}

export default Header
