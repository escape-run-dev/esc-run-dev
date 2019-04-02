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
import "./puzzle-css/user.css"


class Game2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: initialCode,
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
  }

  render(){
    return(
        <main className="game1">
          <header>
            <h1>Flex Puzzle: saca al maquetador que llevas dentro</h1>
            <p>Los que lo fían todo a Bootstrap no están de enhorabuena. Para resolver el puzzle y seguir adelante tendréis que demostrar vuestros conocimientos de Flexbox, colocando las piezas mediante posicionamiento CSS hasta que todo encaje. ¿Podréis hacerlo?</p>
          </header>
          <div className="editor editor-game2">
            <div className="editor-pane pane-game2">
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

            <section className="puzzle-output">
              <div className="input-header">
                <div className="file-name">Flexbox Puzzle</div>
                Resultado
              </div>
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
