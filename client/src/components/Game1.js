import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games1"
import './Game1.css'
import Movies from "./movies.js"
import 'codemirror/lib/codemirror.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

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

      this.setState({checking: true, output: ""}, () => {
        this.services.writeFile(this.state.id, this.state.content, 1)
            .then(res => this.setState({output: res.data.globalMessage, checking:false}))
            .catch(err => this.setState({output: err, checking:false}))
      })
  }


reset = () => {
  this.setState({content: initialCode})
}

  render(){

    return(
      <main className="game1">
      <header class="game1-header">
        <h1>¿Sobreviviréis a un segundo Jueves Negro?</h1>
        <p>Las horas pasan lentamente, una tras otra, hasta que perdéis la cuenta. ¿Cuánto tiempo habrá pasado? Mientras se acumulan los minutos del interminable array de movies, solo podéis pensar en reducir la agonía. ¡Por el amor de Dios! ¿Cuánto duran estas movies? ¡Deberían durar diez veces menos!</p>
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
                  <span className="plus">+</span><button onClick={this.reset} type="button" className="reset-button">reset</button>
                 </form>
               </div>
        {/* <div className="file-window css-view">
          <div className="line-numbers">
            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
          </div>
          <form onSubmit={this.handleSubmit}>
          <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)} className="input-strobe" placeholder="¿Serás capaz de superar el Jueves Negro?"></textarea>
          <span className="plus">+</span><button type="submit" className="enter-button">enter</button>        
          </form>
        </div> */}
      </div>

        <section className="movies-output">
            <div className="movies">
            <p>var movies = [</p>
            <br/>
            {
              Movies.map((movie,idx) => {
                return <article key={idx}>
                <p>{`{`}</p>
                <p>title: {movie.title}</p>
                <p>year: {movie.year}</p>
                <p>director: {movie.director}</p>
                <p>duration: {movie.duration}</p>
                <p>genre: {movie.genre}</p>
                <p>rate: {movie.rate}</p>
                <p>{`}`}</p>
                <br/>
                </article>
              })
            }
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

export default Game1
