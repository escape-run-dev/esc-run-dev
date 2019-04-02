import React, { Component } from 'react';
import VideoPlayer from 'react-player'
import TestingService from '../services/testing-service'
import initialCode from "../games/games4"
import './Game1.css'
import 'codemirror/lib/codemirror.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/css/css')


class Game4 extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.user._id,
      content: initialCode,
      output: "",
      testsPassed: false,
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
        this.services.writeFile(this.state.id, this.state.content, 4)
            .then(res => this.setState({output: res.data.globalMessage, testsPassed: res.data.passed, checking:false}))
            .catch(err => this.setState({output: err, checking:false}))
      })
}

  render(){

    return(
      <main className="game1">
      <header className="game4-header">
        <h1>La máquina de los cafés y sandwiches gratis</h1>
        <p>Como sabes, la máquina de guarrerías de Ironhack falla más que una escopeta de feria. A todos nos ha alegrado el día alguna vez con un 2x1 o algún producto gratis, pero acertar con el que va a caer sin pasar por caja es una lotería. ¿Será el café de Starbucks o el sandwich de chorizo?</p>
      </header>
    <div className="editor game4-editor">
      
      <div className="editor-pane">
        <div className="input-header">
          <div className="file-name">movies.js</div> Code Editor
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
      
        <section className="movies-output game4-video">
            <div className="movies">
              <p>Uno de tus compañeros de bootcamp afirma haber descubierto el patrón que sigue el fallo de la máquina. Y lleva varios días comiendo y bebiendo de gorra, así que parece que no es un farol.</p>
              <p>Para calcular cuánto se ahorrado en un mes (suponiendo, por simplificar, que el mes tiene cuatro semanas idénticas de cinco días), cuenta con los siguientes datos:</p>
              <VideoPlayer className="video-game4" url='https://www.youtube.com/watch?v=9CS7j5I6aOc' playing={true}/>
            </div>

            <div className="tall html-view">
              <div className="input-header">
                <div className="file-name">Jasmine</div>
                Resultado
              </div>
              <div className="file-window game4-window">
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
                  <div><p className="tests_passed">¡Bien hecho! No olvides tu respuesta. Los números 214 te serán de utilidad muy pronto 😉</p></div>
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

export default Game4
