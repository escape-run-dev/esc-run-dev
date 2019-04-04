import React, { Component } from 'react'
import TestingService from '../services/testing-service'
import initialCode from "../games/games5"
import './Game1.css'
import 'codemirror/lib/codemirror.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')
require("codemirror/theme/3024-night.css")
require("codemirror/theme/erlang-dark.css")
require("codemirror/theme/cobalt.css")
require("codemirror/theme/paraiso-light.css")


class Game5 extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.user._id,
      content: initialCode,
      output: "",
      checking: false,
      testsPassed: false,
      drunkLevel: "drunk-verylight",
      themeChanging: "default"
    }

    this.services = new TestingService()

    this.drink = () => {
      let framesCounter = 0;
  
      let drinkify = setInterval( () => {
        framesCounter++
          
        if (framesCounter === 60){
          this.setState({drunkLevel: "drunk-light", themeChanging: "3024-night"})
        }
        if (framesCounter === 200){
          this.setState({drunkLevel: "drunk-medium", themeChanging: "erlang-dark"})
        } 
        if (framesCounter === 400){
          this.setState({drunkLevel: "drunk-heavy", themeChanging: "cobalt"})
        } 
        if (framesCounter === 600){
          this.setState({drunkLevel: "drunk-crazy", themeChanging: "paraiso-light"})
        }
        if (framesCounter > 605) clearInterval(drinkify)
  
      }, 1000)
      
    }

    this.drink()

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
            .then(res => this.setState({output: res.data.globalMessage, testsPassed: res.data.passed, checking:false}))
            .catch(err => this.setState({output: err, checking:false}))
      })
  }

  reset = () => {
    this.setState({content: initialCode})
  }

  render(){
    
    return(
      <main className={`game1 ${this.state.drunkLevel} shake`}>
      <header className="game5-header">
        <h1>¡IronBeers! ¿Serás capaz de resolver la kata?</h1>
        <p>Ya has presentado el juego y te sientes eufórico, pero a la vez roto por el estrés. Necesitas desfogarte. ¡Menos mal que ha llegado la hora de las IronBeers! A medianoche, tras unas cuantas cervezas y algún que otro chupito de Jagger, un compañero propone una improvisada guerra de katas. El código resultante es... bueno... está lejos de ser inteligible. ¿Serás capaz de arreglarlo mientras el alcohol te nubla la vista?</p>
      </header>
    <div className="editor">
      
      <div className="editor-pane">
        <div className="input-header">
          <div className="file-name">drunk-kata.js</div> Code Editor
        </div>

        <div className="editor-container">
                 <form onSubmit={this.handleSubmit}>
                   <CodeMirror
                     value={this.state.content}
                     options={{
                       lineNumbers: true,
                       theme: this.state.themeChanging
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
                  <span className="plus">+</span><button onClick={this.reset} type="button" className="reset-button">reset</button>
                 </form>
               </div>
      </div>

        <section className="fridays-output">
            <div className="fridays">
      <p>La función que has escrito (de aquella manera) está a puntito de funcionar, pero tiene algunas erratas que hace que no pase los tests. Tu misión es corregirlas. ¡Ánimo!</p>
      <p><a href="https://www.codewars.com/kata/tgi-friday/train/javascript" target="_blank" rel="noopener noreferrer">Por cierto, esta es la kata que estás intentando resolver</a></p>
      </div>

            <div className="tall html-view">
              <div className="input-header">
                <div className="file-name">Jasmine</div>
                Resultado
              </div>
              <div className="game5 file-window">
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
                {
                this.state.testsPassed ?
                  <div><p className="tests_passed">Has logrado resolver la kata. Apunta el número de viernes entre 1901 y 2000. Los vas a necesitar 😉</p></div>
                :
                null
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