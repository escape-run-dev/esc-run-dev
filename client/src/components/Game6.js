import React, { Component } from 'react';
import TestingService from '../services/testing-service'
// import initialCode from "../games/games6"
import {Game} from "./canvas/Game"


class Game2 extends Component {
  constructor(props){
    super(props)
    this.state = {
    //   content: initialCode,
    }

    this.services = new TestingService()

  }

  handleState = e => {
    // const { value } = e.target
    
    // this.setState({
    //     content: value,
    // })
  }

  handleSubmit = e => {
    e.preventDefault()

    // this.services.writeCss(this.state.content)
  }

  componentDidMount () {
    this.game = new Game(document.getElementById("canvas"))
    this.game.start()
  }

  render(){ 



    return(
        <main className="game6">
          {/* <header>
            <h1>Flex Puzzle: saca al maquetador que llevas dentro</h1>
            <p>Los que lo fían todo a Bootstrap no están de enhorabuena. Para resolver el puzzle y seguir adelante tendréis que demostrar vuestros conocimientos de Flexbox, colocando las piezas mediante posicionamiento CSS hasta que todo encaje. ¿Podréis hacerlo?</p>
          </header>
          <div className="editor">
            <div className="editor-pane">
              <div className="input-header">
                <div className="file-name">flexbox-puzzle.css</div> Code Editor
              </div>
              <div className="file-window css-view">
                <div className="line-numbers">
                  1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
                </div>
                  <form onSubmit={this.handleSubmit}>
                    <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)} className="input-strobe" placeholder="Siempre ha habido clases..."></textarea>
                    <span className="plus">+</span><button type="submit" className="enter-button">enter</button>        
                  </form>
                </div>
            </div> */}

            <section className="canvas-container">
                <canvas id="canvas"></canvas>
            </section>
        </main>
    )
  }
}

export default Game2