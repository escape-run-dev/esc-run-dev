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
            else cardComponent = <p>Waiting</p>
    return (
      <main>
        <section>
          <h3>Llamada a la Api</h3>
          <form onSubmit={this.handleSubmitCode}>
            <label>Llama a la api</label><br/>
            <input type="text" name="sendingCode" value={this.state.sendingCode} onChange={this.handleChange} placeholder="Tu llamada post"/>
            <button type="submit">Llamar</button>
          </form>
          <h3>Random Call</h3>
          <form onSubmit={this.handleSubmitRandom}>
            <label>Obtén una respuesta aleatoria</label><br/>
            <button type="submit">Llamar</button>
          </form>
          <h3>Postea una nueva receta</h3>
          <form onSubmit={this.handleSubmitModel}>
            <label>Opción 1</label>
            <input type="text" name="input1" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input1}/>
            <input type="text" name="input1value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input1value} placeholder="Inserta valor"/>          
            <label>Opción 2</label>
            <input type="text" name="input2" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input2}/>
            <input type="text" name="input2value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input2value} placeholder="Inserta valor"/>          
            <label>Opción 3</label>
            <input type="text" name="input3" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input3}/>
            <input type="text" name="input3value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input3value} placeholder="Inserta valor"/>          
            <label>Opción 4</label>
            <input type="text" name="input4" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input4}/>          
            <input type="text" name="input4value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input4value} placeholder="Inserta valor"/>
            <label>Opción 5</label>
            <input type="text" name="input5" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input5}/>          
            <input type="text" name="input5value" onChange={this.handleChangeSendingModel} value={this.state.sendingModel.input5value} placeholder="Inserta valor"/>
            <button type="submit">Añadir a la DB</button>
          </form>
        </section>
        <section>
          <br/>
          <br/>
          <br/>
          {cardComponent}
        </section>
      </main>
    )
  }

}


export default CallingDB
