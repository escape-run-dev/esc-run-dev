import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games1"

class Game1 extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.user._id,
      content: initialCode,
      output: "",
      checking: false
    }

    this.services = new TestingService()
  }


  handleState = e => {
    const { value } = e.target

    this.setState({
        content: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    
    this.setState({checking: true})

    this.services.writeFile(this.state.id, this.state.content)
        .then(x => {
          console.log("He llegado")
          console.log(this.state.id)
          return this.services.runJasmine(this.state.id)
        })
        .then(res => {
          this.setState({output: res, checking:false})
        })
        
        .catch(console.log)

    // this.setState({
    //     content: initialCode,
    // })
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
          <section className="game1 output">
          {
            this.state.checking ?
            <p>Comprobando...</p>
            :
            this.state.output ?
            this.state.output.map((spec,idx) => {
              return <div key={idx}><p>{spec.description}</p><p>{spec.status}</p></div>
            })
            :
            <p>Introduce tu respuesta y pulsa enviar</p>
          }
          </section>
        </main>
    )
  }
}

export default Game1
