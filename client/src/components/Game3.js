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
import bundaba1 from "./cage_img/cage_back1.png"
import bundaba2 from "./cage_img/cage_back2.png"
import bundaba3 from "./cage_img/cage_back3.png"
import bundaba4 from "./cage_img/cage_back4.png"
import bundaba5 from "./cage_img/cage_back5.png"
import bundaba6 from "./cage_img/cage_back6.png"
import bundaba7 from "./cage_img/cage_back7.png"
import bundaba8 from "./cage_img/cage_back8.png"
import bundaba9 from "./cage_img/cage_back9.png"


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
    let classW = ""
    if(this.state.image !==  "loveyisus" && this.state.image !== "LOVEYISUS") image = [ncage1, ncage2, ncage3, ncage4, ncage5, ncage6, ncage7, ncage8, ncage9];
    else image = [bundaba1, bundaba2, bundaba3, bundaba4, bundaba5, bundaba6, bundaba7, bundaba8, bundaba9]
    if(this.state.validPosition === "[2,1,4]" || this.state.validPosition === "[ 2, 1, 4]" || this.state.validPosition === "[ 2 , 1 , 4 ]" || this.state.validPosition === "2,1,4" || this.state.validPosition === "21,4" || this.state.validPosition === "21.4" || this.state.validPosition === "214") {
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
      <header className="game3-header">
        <h1>You've got Caged: lo que pasa cuando no cierras tu portátil</h1>
        <p>Ha vuelto a suceder. Te has tomado un descanso y has dejado la tapa del ordenador abierta, al alcance de cualquiera con ganas de troleo. Al volver de tu descanso, todas las imágenes de tu navegador se han cambiado por fotos de Nicholas Cage. Tendrás que conseguir un par de pistas para volver a la normalidad (y dar con otra clave)</p>
      </header>
      <div className="editor editor-game3">
        {/* <div className="editor-pane pane-game3"> */}
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
        <section className="puzzle-output-game3">
        <div className="input-header">
                <div className="file-name">You've got Caged</div>
                Resultado
              </div>
                <div className="puzzle-row">
                  {this.state.images.map((images, index) => {

                      if (index === 0 || index === 1) return <article key={index} className="imgSize"><img className={`sizeW ${this.state.classWord}`} src={images}/></article>
                      else if(index < 3) return <article key={index} className="imgSize"><img className="sizeW"  src={images}/></article>
                       
                  })}
                </div>
                <div className="puzzle-col">
                  <div className="puzzle-row">
                    {this.state.images.map((images, index) => {

                      if(index === 3) return <article  key={index} className="imgSize"><img className={`sizeW ${this.state.classWord}`} src={images}/></article>
                      else if(index >= 3 && index <= 5) return <article key={index} className="imgSize"><img className="sizeW" src={images}/></article>
                      
                    })}
                  </div>
                </div>
                <div className="puzzle-col">
                  <div className="puzzle-row">
                    {this.state.images.map((images, index) => {

                       if(index > 5) return <article key={index} className="imgSize"><img className={`sizeW ${this.state.classW}`} src={images}/></article>
  
                    })}
                  </div>
                </div>
        </section>
      </div>
    </main>
    )
  }


}
export default Game3
