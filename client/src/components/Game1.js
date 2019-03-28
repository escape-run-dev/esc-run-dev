import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games1"

class Game1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.user._id,
      content: initialCode,
    }

    this.services = new TestingService()
  }


  handleState = e => {
    const { value } = e.target

    this.setState({
        id: this.props.user._id,
        content: initialCode,
        output: ""
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    console.log("Enviando")

    this.services.writeFile(this.state.id, this.state.content)
        .then(x => {
          console.log("He llegado")
          console.log(this.state.id)
          return this.services.runJasmine(this.state.id)
        })
        .then(res => {
          console.log("He llegado un poco más abajo")
          this.setState({output: res})
        })
        .catch(console.log)

    this.setState({
        content: initialCode,
    })
}

  render(){
    return(
        <main className="game">
          <section className="game1 input">
            <form onSubmit={this.handleSubmit}>
              <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)}></textarea>
              <button type="submit">Enviar</button>
            </form>
          </section>
          <section className="game1 output">{this.state.output}</section>
        </main>
    )
  }
}

export default Game1
