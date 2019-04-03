import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games6"
import {Game} from "./canvas/Game"
import buttonUp from "./canvas/img/button_up.png"
import buttonDown from "./canvas/img/button_down.png"
import 'codemirror/lib/codemirror.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

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

    if (!this.game.started){
      this.game.start()
      this.game.checkCollision = eval(this.state.content)
      console.log("En handleSubmit", this.game.checkCollision, typeof this.game.checkCollision)
      this.checkResult()
      // if (this.game.result === "win") alert("You win")
    }

    if (!document.getElementById("collisionscript")) {
      const script = document.createElement("script");
      script.innerHTML = this.state.content
      script.async = true;
      script.id = "collisionscript"
      document.body.appendChild(script);
    } else {
      const script = document.getElementById("collisionscript")
      script.innerHTML = this.state.content
    }

    // this.services.writeCollisions(this.state.content)
    // .then(() => {
      
    //   // ESTARÍA MEJOR AQUÍ EL CÓDIGO QUE CREA EL SCRIPT

    //   if (!this.game.started){
    //     this.game.start()
    //     this.checkResult()
    //     if (this.game.result === "win") alert("You win")
    //   }
        
    // })
  }

  move = direction => {
    if (this.game){  
      if (this.game.player.y > 0) if (direction === "up") this.game.player.y -= 10
      if (this.game.player.y < (this.game.canvas.height - this.game.player.h)) if (direction === "down") this.game.player.y += 10
    }
  }

  checkResult = () => {
    const myInterval = setInterval (() => {
      if (this.game.result === "win") {
        alert("You win") // Esto mejor que sea un modal o similar
        clearInterval(myInterval)
      }
    }, 1000 / 60)
  }

  componentDidMount () {
    if (!this.game) this.game = new Game(document.getElementById("canvas"))
    this.game.start() 
    this.game.checkCollision = eval(initialCode)
    console.log("En componentDidMount", this.game.checkCollision, typeof this.game.checkCollision)
    this.checkResult()
  }

  render(){ 

    return(
        <main className="game1">
            <header className="game6-header">
              <h1>Fix the Canvas: arregla las colisiones</h1>
              <p>Ha llegado la hora del famoso 'click'. El juego es el primer momento cumbre para todo ironhacker, cuando descubre todo lo que ha aprendido en las primeras semanas. ¿Te acuerdas? Más te vale, porque tendrás que arreglar el código de las colisiones para poder pasarte el juego. Si aguantas 30 segundos sin morir, habrás ganado. ¡Ah! Y no podrás hacer trampa... Tienes que coger la moneda, así que no te vale con trucar las colisiones.</p>
            </header>
            <section className="canvas-container">
                <canvas id="canvas"></canvas>
                <img src={buttonUp} className="button-up" alt="Botón para subir" onClick={() => this.move("up")}></img>
                <img src={buttonDown} className="button-down" alt="Botón para bajar" onClick={() => this.move("down")}></img>
            </section>
            <div className="editor">
              <div className="editor-canvas">
                <div className="input-header">
                  <div className="file-name">fix-the-canvas.js</div> Code Editor
                </div>

                {/* <div className="file-window css-view"> */}
               {/* <div className="line-numbers">
                 1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
               </div> */}

                                  {/* <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)} className="input-strobe" placeholder="Siempre ha habido clases..."></textarea> */}

               <div className="editor-container">
                 <form onSubmit={this.handleSubmit}>
                   <CodeMirror
                     value={this.state.content}
                     options={{
                       lineNumbers: true
                     }}
                     className="form-console"
                     onBeforeChange={(editor, data, value, next) => {
                       this.setState({
                         content: value
                       })
                     }}
                     onChange={(editor, data, value) => {}}
                   />
                  <span className="plus">+</span><button type="submit" className="enter-button">enter</button>
                 </form>
               </div>




                {/* <div className="file-window css-view">
                  <div className="line-numbers">
                    1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
                  </div>
                    <form onSubmit={this.handleSubmit}>
                      <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)} className="input-strobe" placeholder="Siempre ha habido clases..."></textarea>
                      <span className="plus">+</span><button type="submit" className="enter-button">enter</button>        
                    </form>
                  </div> */}
              </div>
            </div>
        </main>
    )
  }
}

export default Game2