import React, { Component } from 'react';
import ncage1 from "./ncage/ncage1.jpg"
import ncage2 from "./ncage/ncage2.jpg"
import ncage3 from "./ncage/ncage3.jpg"
import ncage4 from "./ncage/ncage4.jpg"
import ncage5 from "./ncage/ncage5.jpg"
import ncage6 from "./ncage/ncage6.jpg"
import ncage7 from "./ncage/ncage7.jpg"
import ncage8 from "./ncage/ncage8.jpg"
import ncage9 from "./ncage/ncage9.jpg"
import bundaba1 from "./bundaba/bundaba1.jpg"
import bundaba2 from "./bundaba/bundaba2.jpg"
import bundaba3 from "./bundaba/bundaba3.jpg"
import bundaba4 from "./bundaba/bundaba4.jpg"
import bundaba5 from "./bundaba/bundaba5.jpg"
import bundaba6 from "./bundaba/bundaba6.jpg"
import bundaba7 from "./bundaba/bundaba7.jpg"
import bundaba8 from "./bundaba/bundaba8.jpg"
import bundaba9 from "./bundaba/bundaba9.jpg"


class Game3 extends Component {

  constructor(props){
    super(props)
    this.state = {
      images: [ncage1, ncage2, ncage3, ncage4, ncage5, ncage6, ncage7, ncage8, ncage9],
      validPosition: "",
      classWord: "",
      image: ""
    }

  }

  // handlers
  
  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    let image
    let classW
    if(this.state.image !==  "bundaba") image = [ncage1, ncage2, ncage3, ncage4, ncage5, ncage6, ncage7, ncage8, ncage9];
    else image = [bundaba1, bundaba2, bundaba3, bundaba4, bundaba5, bundaba6, bundaba7, bundaba8, bundaba9]
    if(this.state.validPosition === "[2,1,4]" || this.state.validPosition === "[ 2, 1, 4]" || this.state.validPosition === "[ 2 , 1 , 4 ]" || this.state.validPosition === "2,1,4" || this.state.validPosition === "21,4" || this.state.validPosition === "214") {
      classW = "greenBorder"   
    } else classW = ""

    this.setState({
      ...this.state,
      images: image,
      classWord: classW
    })
  }

  render() {
    
    return (

      <main className="game1">
      <header>
        <h1>Nicolas Cage: el lado troll de los TAs</h1>
        <p>Los que lo fían todo a Bootstrap no están de enhorabuena. Para resolver el ncage y seguir adelante tendréis que demostrar vuestros conocimientos de Flexbox, colocando las piezas mediante posicionamiento CSS hasta que todo encaje. ¿Podréis hacerlo?</p>
      </header>
      <div className="editor">
        <div className="editor-pane">
          <div className="input-header">
            <div className="file-name">ncage.css</div> Code Editor
          </div>
          <div className="file-window css-view">
            <div className="line-numbers">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
            </div>
              <form onSubmit={this.handleSubmit}>
              <p className="input-strobe">ComponentDidUpdate{'{'}<br/>
                  this.setState({'{'}<br/>
                      {'...this.state,'}<br/>
                      images: <input name="image" className="noFormat" type="text" value={this.state.image} onChange={this.handleChange}/>,<br/>
                      validPosition: <input name="validPosition" className="noFormat" value={this.state.validPosition} type="text" onChange={this.handleChange}/><br/>
                  {'}'})
                }</p>
                <span className="plus">+</span><button type="submit" className="enter-button">enter</button>        
              </form>
            </div>
        </div>
        <section className="puzzle-output">
          <div className="aligner">
            <div className="container">

                <div className="puzzle-row block-row1">
                  {this.state.images.map((images, index) => {

                      if (index === 0 || index === 1) return <article key={index} className="imgSize"><img className={`sizeW ${this.state.classWord}`} src={images}/></article>
                      else if(index < 3) return <article key={index} className="imgSize"><img className="sizeW"  src={images}/></article>
                       
                  })}
                </div>
                <div className="puzzle-col">
                  <div className="puzzle-row block-row2">
                    {this.state.images.map((images, index) => {

                      if(index === 3) return <article  key={index} className="imgSize"><img className={`sizeW ${this.state.classWord}`} src={images}/></article>
                      else if(index >= 3 && index <= 5) return <article key={index} className="imgSize"><img className="sizeW" src={images}/></article>
                      
                    })}
                  </div>
                </div>
                <div className="puzzle-col">
                  <div className="puzzle-row block-row1">
                    {this.state.images.map((images, index) => {

                       if(index > 5) return <article key={index} className="imgSize"><img className={`sizeW ${this.state.classW}`} src={images}/></article>
                    
                    })}
                  </div>
                </div>
            </div>
          </div>          
        </section>
      </div>
    </main>
    )
  }


}
export default Game3
