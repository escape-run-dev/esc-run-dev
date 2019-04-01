import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games4"
import './Game1.css'

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
      <header>
        <h1>La máquina de los cafés y sandwiches gratis</h1>
        <p>Como sabes, la máquina de guarrerías de Ironhack falla más que una escopeta de feria.
A todos nos ha alegrado el día alguna vez con un 2x1 o algún producto gratis, pero acertar
con el que va a caer sin pasar por caja es una lotería. ¿Será el café de Starbucks o el sandwich de chorizo?</p>
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
            <p>Aquí va el vídeo que explica la prueba</p>
            <p>Se bebe un café y una Coca-Cola al día</p>
<p>Los martes no trae tupper y se come un par de sandwiches</p>
<p>Si los lunes son 0, los días impares se compra una bolsita de frutos secos</p>
<p>Dos veces por semana, a media mañana le entra hambre y se come un donut (pero no necesariamente lo compra y nunca es un lunes)</p>
<p>Cuando se pone generoso, que suele ser un par de viernes el mes, saca tres bolsas de snacks para toda la clase</p>

<p>Los productos de la primera fila cuestan 1.20 euros y caen gratis 1 de cada 2 veces</p>
<p>Los productos de la segunda fila cuestan 0.70 euros y nunca caen gratis</p>
<p>Los productos de la tercera fila cuestan 0,85 euros y siempre dan 2x1</p>
<p>Los productos de la cuarta fila cuestan 1 euro y nunca caen gratis</p>
<p>Los productos de la quinta fila cuestan 1.60 euros y dan 2x0 y de cada 8 veces</p>
<p>Los productos de la sexta fila cuestan 1.40 euros y caen gratis 1 de cada 4 veces</p>

<p>Las bolsas de snacks están en la primera fila</p>
<p>Los frutos secos están en la segunda fila</p>
<p>Los donuts están en la tercera fila</p>
<p>Los sandwiches están en la quinta fila</p>
<p>Las bebidas están en la sexta fila</p>

<p>Los lunes arreglan la máquina y no cae nada gratis</p>

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
