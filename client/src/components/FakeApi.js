import React, {Component} from 'react'
import FakeApi from '../services/fake-api'
import CardComponent from './CardComponent'


class CallingDB extends Component {

  constructor () {

    super()
    this.state = {
        sendingCode: "",
        sendingModel: {
                        input1: "",
                        input1value: "",
                        input2: "",
                        input2value: "",
                        input3: "",
                        input3value: "",
                        input4: "",
                        input4value: "",
                        input5: "",
                        input5value: ""
                      },
        receivedModel: "",
        failModel: ""
        
      }
  
    this.fakeApi = new FakeApi()
  
  }
  

    // Crear handler de envios de formularios 
    handleChange = (e) => {  
      const {name, value} = e.target;
      this.setState({[name]: value});
    }

    handleChangeSendingModel = (e) => {
      const {name, value} = e.target
      this.setState({
        ...this.state,
        sendingModel: {
          ...this.state.sendingModel,
          [name]: value
        }
      })
    }

    handleSubmitRandom = (e) => {
      e.preventDefault()

      this.fakeApi.getRandom()
        .then( data => {
        this.setState({          
          ...this.state,
          receivedModel: data
        })
    })
    .catch( error => console.log(error) )
    }

    handleSubmitCode = (e) => {
      e.preventDefault()

      this.fakeApi.getModel(this.state.sendingCode)
        .then( data => {
        this.setState({          
          ...this.state,
          receivedModel: data
        })
    })
    .catch( error => console.log(error) )
    }

    handleSubmitModel = (e) => {
      e.preventDefault()

      this.fakeApi.insertModel(this.state.sendingModel)
        .then( data => {
          if(data.Description) {
            this.setState({
              ...this.state,
              receivedModel: "",
              failModel: data 
            })
          }
          else {
            let route = {
              img: "Inserta imagen de las gradas",
              Start: "RFLFL",
              r1: "Ruta 1",
              r2: "Ruta 2",
              r3: "Ruta 3",
              r4: "Ruta 4",
              msg: "Mensaje de ayuda"
            }
            this.setState({
              ...this.state,
              failModel: "",
              receivedModel: route
            })
          }
        })
        .catch(error => console.log(error))

    }

    render() {
      let cardComponent;
      if(this.state.receivedModel) cardComponent = <CardComponent containerCard={this.state.receivedModel}/> 
            else if(this.state.failModel) cardComponent = <CardComponent containerCard={this.state.failModel}/>
            else cardComponent = <p className="card-placeholder">Tendréis que hacer una llamada para obtener algún resultado</p>
    return (
      <main className="game1 api">
        <header>
          <h1>En busca de la llamada modélica</h1>
          <p>Has hecho cientos de llamadas a APIs, incluidas las de tu back, pero esta vez no lo tendrás tan fácil. No conoces las rutas ni sabes del todo lo que estás buscando. Tendrás que seguir las pistas que vayas encontrando en otras pruebas para hacer llamadas GET hasta dar con el modelo de Mongoose correcto. Si lo encuentras, solo tendrás que postear una receta nueva para dar por terminada esta aventura. ¡Mucha suerte!</p>
        </header>
        <div className="editor editor-game3">
        <div className="editor-pane pane-game3">
          <div className="input-header">
            <div className="file-name">ncage.css</div> Code Editor
            </div>
          <div className="file-window css-view">
            {/* <div className="line-numbers">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20
            </div> */}




                <form className="get-call" onSubmit={this.handleSubmitCode}>
                  <p>Podéis hacer una llamada de tipo GET, pero tendréis que aceptar con la ruta:</p>
                  axios.get("http://thegame/api/<input type="text" name="sendingCode" value={this.state.sendingCode} onChange={this.handleChange}/>")
                  <button type="submit">LLamar a la API</button>
                </form>

                <form className="random-call" onSubmit={this.handleSubmitRandom}>
                <p>Podéis hacer una llamada aleatoria y confiar en la suerte. Eso sí, no todos los resultados son buenos:</p>
                  <span>axios.get("http://thegame/api/getRandom")</span><button type="submit">Llamada aleatoria</button>
                </form>

                <p>Y también podéis (¡y debéis!) añadir documentos a la base de datos con una llamada de tipo POST, pero tendréis que averiguar los campos requeridos del modelo o no obtendréis la respuesta esperada:</p>
                <form className="post-call" onSubmit={this.handleSubmitModel}>
                  <label>Campo 1</label>
                  <input type="text" name="input1" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input1} placeholder="Nombre del campo"/>
                  <input type="text" name="input1value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input1value} placeholder="Valor"/>          
                  <label>Campo 2</label>
                  <input type="text" name="input2" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input2} placeholder="Nombre del campo"/>
                  <input type="text" name="input2value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input2value} placeholder="Valor"/>          
                  <label>Campo 3</label>
                  <input type="text" name="input3" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input3} placeholder="Nombre del campo"/>
                  <input type="text" name="input3value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input3value} placeholder="Valor"/>          
                  <label>Campo 4</label>
                  <input type="text" name="input4" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input4} placeholder="Nombre del campo"/>          
                  <input type="text" name="input4value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input4value} placeholder="Valor"/>
                  <label>Campo 5</label>
                  <input type="text" name="input5" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input5} placeholder="Nombre del campo"/>          
                  <input type="text" name="input5value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input5value} placeholder="Valor"/>
                  <button type="submit">Añadir a la base de datos (o intentarlo...)</button>
                </form>

              </div>
            </div>


            <section className="puzzle-output api-output">
              <div className="input-header">
                <div className="file-name">Cocina ironhacker</div>
                Respuesta de la API
              </div>
              <div clasName="input-strobe">{cardComponent}</div>
            </section>


        </div>
      </main>
    )
  }

}


export default CallingDB
