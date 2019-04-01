import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games6"
import {Game} from "./canvas/Game"
import buttonUp from "./canvas/img/button_up.png"
import buttonDown from "./canvas/img/button_down.png"

class Game2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: initialCode,
    }

    this.services = new TestingService()
    // this.services.writeCollisions(initialCode)

  }

  handleState = e => {
    const { value } = e.target
    
    this.setState({
        content: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.services.writeCollisions(this.state.content)
    .then(() => {
        if (!this.game.started){
          this.game.start()
          this.checkResult()
          if (this.game.result === "win") alert("You win")
        }
    })
  }

  move = direction => {
    if (this.game){  
      if (this.game.player.y > 0) if (direction === "up") this.game.player.y -= 10
      if (this.game.player.y < (this.game.canvas.height - this.game.player.h)) if (direction === "down") this.game.player.y += 10
    }
  }

  checkResult = () => {
    const myInterval = setInterval (() => {
      console.log("voy")
      if (this.game.result === "win") {
        alert("You win") // Esto mejor que sea un modal o similar
        clearInterval(myInterval)
      }
    }, 1000 / 60)
  }

  componentDidMount () {
    if (!this.game) this.game = new Game(document.getElementById("canvas"))
    this.game.start() 
    this.checkResult()
  }

  render(){ 

    return(
        <main className="game6">
            <header>
              <h1>Fix the Canvas: arregla las colisiones</h1>
              <p>Es el momento de hacer click. El juego es el primer gran momento de todo ironhacker, cuando descubre todo lo que ha aprendido en las primeras semanas. ¿Todavía lo recuerdas? Tendrás que arreglar el código de las colisiones para poder pasarte el juego. Si aguantas 30 segundos sin morir, habrás ganado</p>
            </header>
            <section className="canvas-container">
                <canvas id="canvas"></canvas>
                <img src={buttonUp} className="button-down" alt="Botón para subir" onClick={() => this.move("up")}></img>
                <img src={buttonDown} className="button-up" alt="Botón para bajar" onClick={() => this.move("down")}></img>
            </section>
            <div className="editor">
              <div className="editor-canvas">
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
              </div>
            </div>
        </main>
    )
  }
}

export default Game2