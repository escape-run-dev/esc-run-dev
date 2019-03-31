import React, {Component} from 'react'
import FakeApi from '../services/fake-api'


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
        randomModel: {}
        
      }
  
    this.fakeApi = new FakeApi()
  
  }
  

    // Crear handler de envios de formularios 
    handleChange = (e) => {  
      const {name, value} = e.target;
      this.setState({[name]: value});
    }

    handleSubmitRandom = (e) => {
      e.preventDefault()

      this.fakeApi.getRandom()
        .then( data => {
          console.log(data)
        this.setState({          
          ...this.state,
          randomModel: data
        })
    })
    .catch( error => console.log(error) )
    }

    handleSubmitCode = (e) => {
      e.preventDefault()

      this.fakeApi.getModel()
        .then( data => {
          console.log(data)
        this.setState({          
          ...this.state,
          randomModel: data
        })
    })
    .catch( error => console.log(error) )
    }

    render() {
    return (
      <main>
        <section>
          <form onSubmit={this.handleSubmitCode}>
            <label>Llama a la api</label><br/>
            <input type="text" placeholder="Tu llamada post"/>
            <button type="submit">Call</button>
          </form>
          <form onSubmit={this.handleSubmitRandom}>
            <label>Obtén una respuesta aleatoria</label><br/>
            <button type="submit">Call</button>
          </form>
          <form>
            <label>Opción 1</label>
            <input type="text"/>
            <input type="text" placeholder="Inserta valor"/>          
            <label>Opción 2</label>
            <input type="text"/>
            <input type="text" placeholder="Inserta valor"/>          
            <label>Opción 3</label>
            <input type="text"/>
            <input type="text" placeholder="Inserta valor"/>          
            <label>Opción 4</label>
            <input type="text"/>          
            <input type="text" placeholder="Inserta valor"/>
            <label>Opción 5</label>
            <input type="text"/>          
            <input type="text" placeholder="Inserta valor"/>
          </form>
        </section>
        <section>
          {this.state.randomModel ? <p>Hola Puto</p> : null}
          <br/>
          <br/>
          <br/>
          <h1>Obreros calientes trabajando en ello</h1>
        </section>
      </main>
    )
  }

}


export default CallingDB
