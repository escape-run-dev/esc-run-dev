import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import puzzle1 from "./puzzle/image_part_001.jpg"
import puzzle2 from "./puzzle/image_part_002.jpg"
import puzzle3 from "./puzzle/image_part_003.jpg"
import puzzle4 from "./puzzle/image_part_004.jpg"
import puzzle5 from "./puzzle/image_part_005.jpg"
import puzzle6 from "./puzzle/image_part_006.jpg"
import puzzle7 from "./puzzle/image_part_007.jpg"
import puzzle8 from "./puzzle/image_part_008.jpg"
import puzzle9 from "./puzzle/image_part_009.jpg"
import initialCode from "../games/games2"
// import '%PUBLIC_URL%/puzzle-css/user.css'
import 'codemirror/lib/codemirror.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/css/css')


class Game2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: initialCode,
      errorMsg: ""
    }

    this.services = new TestingService()
    this.services.writeCss(initialCode, false)
  }

  handleState = e => {
    const { value } = e.target
    
    this.setState({
        content: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.services.writeCss(this.state.content, true)
    .then(res => {
      console.log(res)
      this.setState ({errorMsg: res.data.errorMsg})
    })
  }

  loadStyles () {

    if (document.getElementById("userstyles")) document.getElementById("userstyles").remove();

    const style = document.createElement('link');
    style.href = "/puzzle-css/user.css"
    style.rel = "stylesheet"
    style.id = "userstyles"

    document.body.appendChild(style);

  }
  

  render(){
    this.loadStyles()
    return(
        <main className="game1">
          <header className="game2-header">
            <h1>Flex Puzzle: saca al maquetador que llevas dentro</h1>
            <p>Los que lo fían todo a Bootstrap no están de enhorabuena. Para resolver el puzzle y seguir adelante tendréis que demostrar vuestros conocimientos de Flexbox, colocando las piezas mediante posicionamiento CSS hasta que todo encaje. ¿Podréis hacerlo?</p>
          </header>
          <div className="editor editor-game2">
            {/* <div className="editor-pane pane-game2"> */}
            <div className="editor-pane">
              <div className="input-header">
                <div className="file-name">flexbox-puzzle.css</div> Code Editor
              </div>
              <div className="editor-container">
                 <form onSubmit={this.handleSubmit}>
                   <CodeMirror
                     value={this.state.content}
                     options={{
                       lineNumbers: true,
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
            </div>

            <section className="puzzle-output">
              <div className="input-header">
                <div className="file-name">Flexbox Puzzle</div>
                Resultado
              </div>
              {console.log(this.state.errorMsg)}
              {this.state.errorMsg &&
                <div className="error-msg">El CSS que has introducido no pasa la validación</div>
              }
              <div className="puzzle-row row1">
                <article className="puzzle-piece"><img src={puzzle3}/></article>
                <article className="puzzle-piece"><img src={puzzle2}/></article>
                <article className="puzzle-piece"><img src={puzzle1}/></article>
              </div>
              <div className="puzzle-block block">
                <div className="puzzle-col block-col2">
                  <div className="puzzle-row block-row2">
                    <article className="puzzle-piece"><img src={puzzle9}/></article>
                    <article className="puzzle-piece"><img src={puzzle8}/></article>
                  </div>
                  <div className="puzzle-row block-row1">
                    <article className="puzzle-piece"><img src={puzzle6}/></article>
                    <article className="puzzle-piece"><img src={puzzle5}/></article>
                  </div>
                </div>
                <div className="puzzle-col block-col1">
                  <article className="puzzle-piece"><img src={puzzle7}/></article>
                  <article className="puzzle-piece"><img src={puzzle4}/></article>
                </div>
              </div>
            </section>
          </div>
        </main>
    )
  }
}

export default Game2
