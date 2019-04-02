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
            <section><i className="fas fa-percentage percentage"></i> <span className="percentage-text">60%</span></section>
        </header>
    )
  }
}

export default Header
