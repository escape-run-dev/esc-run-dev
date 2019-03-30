import React, { Component } from 'react';
import TestingService from '../services/testing-service'
import initialCode from "../games/games1"
import './Game1.css'

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

      this.setState({checking: true}, () => {
        this.services.writeFile(this.state.id, this.state.content)
            // .then(x => {
            //   console.log("He llegado")
            //   console.log(this.state.id)
            //   return this.services.runJasmine(this.state.id)
            // })
            .then(res => {
              console.log(res)
              this.setState({output: res.data.globalMessage, checking:false})
            })
            .catch(console.log)
  
      })
    


    // this.setState({
    //     content: initialCode,
    // })
}

  render(){
    return(

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

      <div className="editor-pane html-view">
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
              return <div key={idx}><p>{spec.description}</p><p>{spec.status}</p></div>
            })
            :
            <p>Introduce tu respuesta y pulsa enviar</p>
          }
          <div className="markup"></div>
        </div>
      </div>
    </div>







        // <main classNameName="game">
        //   <section classNameName="game1 input">
        //     <form onSubmit={this.handleSubmit}>
        //       <textarea name="content" value={this.state.content} onChange={(e) => this.handleState(e)}></textarea>
        //       <button type="submit">Enviar</button>
        //     </form>
        //   </section>
        //   <section classNameName="game1 output">
        //   {
        //     this.state.checking ?
        //     <p>Comprobando...</p>
        //     :
        //     this.state.output ?
        //     this.state.output.map((spec,idx) => {
        //       return <div key={idx}><p>{spec.description}</p><p>{spec.status}</p></div>
        //     })
        //     :
        //     <p>Introduce tu respuesta y pulsa enviar</p>
        //   }
        //   </section>
        // </main>
    )
  }
}

export default Game1
