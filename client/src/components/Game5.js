import React, { Component } from 'react';
import {Link} from "react-router-dom"
import TestingService from '../services/testing-service'
import initialCode from "../games/games5"
import './Game1.css'

class Game5 extends Component {
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

      this.setState({checking: true, output: ""}, () => {
        this.services.writeFile(this.state.id, this.state.content, 5)
            .then(res => this.setState({output: res.data.globalMessage, checking:false}))
            .catch(err => this.setState({output: err, checking:false}))
      })
}

  render(){

    return(
      <main className="game1">
      <header>
        <h1>¡IronBeers! ¿Serás capaz de resolver la kata?</h1>
        <p>Ya has presentado el juego y te sientes eufórico, pero a la vez roto por el estrés. Necesitas desfogarte. ¡Menos mal que ha llegado la hora de las IronBeers! A medianoche, tras unas cuantas cervezas y algún que otro chupito de Jagger, un compañero propone una improvisada guerra de katas. El código resultante es... bueno... está lejos de ser inteligible. ¿Serás capaz de arreglarlo mientras el alcohol te nubla la vista?</p>
      </header>
    <div className="editor">
      
      <div className="editor-pane">
        <div className="input-header">
          <div className="file-name">movies.js</div> Code Editor
        </div>
        <div className="file-window css-view">
          <div className="line-numbers">
            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
          </div>
          <form onSubmit={this.handleSubmit}>
          <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)} className="input-strobe" placeholder="¿Serás capaz de superar el Jueves Negro?"></textarea>
          <span className="plus">+</span><button type="submit" className="enter-button">enter</button>        
          </form>
        </div>
      </div>

        <section className="movies-output">
            <div className="movies">
      <p><a href="https://www.codewars.com/kata/ranking-nba-teams/train/javascript" target="_blank">Esta es la kata que estás intentando resolver</a></p>
      <p>(Es aconsejable que tengas la kata abierta mientras corriges los errores. ¡Ah! Y ten en cuenta que las variables team, r1, r2 y r están definidas en las pruebas)</p>
            </div>

            <div className="tall html-view">
              <div className="input-header">
                <div className="file-name">Jasmine</div>
                Resultado
              </div>
              <div className="file-window">
              {
                  this.state.checking ?
                  <p>Comprobando...</p>
                  :
                  this.state.output ?
                  this.state.output.map((spec,idx) => {
                    return <div key={idx}><p className={spec.status}>{spec.description}</p></div>
                  })
                  :
                  <p>Introduce tu respuesta y pulsa enviar</p>
                }
                <div className="markup"></div>
              </div>
            </div>
        </section>
        
    </div>
    </main>
    )
  }
}

export default Game5