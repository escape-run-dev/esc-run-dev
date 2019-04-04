import React, {Component} from 'react'
import Bcrypt from 'bcryptjs'

class Crypt extends Component {
  
  constructor() {
    super();
    this.state = {
      input: "",
      output: "",
      toCopy: undefined,
      copied: false
    }
  }
  
  salt = Bcrypt.genSaltSync(10)
  
  cryptoMethod = (e) => {
    e.preventDefault()
    if (this.state.input) {
      const cripted = Bcrypt.hashSync(this.state.input, this.salt).split("").filter(elm => elm !== "/" && elm !== ".").join("")
      this.setState({output: cripted})
    } else {
      this.setState({output: ""})
    }
  }

  handlerChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  } 

  componentDidMount = () => {
    this.setState({toCopy : document.getElementById("input")})
  }

  copy = () => {
    if (this.state.toCopy) {
      this.state.toCopy.select()

      document.execCommand('copy')
      this.setState({copied : true})

      // eslint-disable-next-line no-native-reassign
      setTimeout ( function () {
        console.log("Timeout")
        this.setState({output: "", copied : false})
      }.bind(this),1500)
    }
  }

  render(){
    return(
      <form className="bcrypt" onSubmit={(e) => this.cryptoMethod(e)}>
        <label>Introduce la clave que deseas cifrar:</label>
        <input type="text" name="input" id="input" value={this.state.input} onChange={e => this.handlerChange(e)}/><br/><br/>
        <div className="bcrypt-buttons">
          <button type="submit">Cifrar</button>
          <button type="button" onClick={this.copy}>Copiar al portapeles</button>
        </div>
        {this.state.output ? <p>{this.state.output}</p>: <p></p>}
        {this.state.copied ? <p class="passed">Clave copiada al portapapeles</p>: <p></p>}
      
      </form>
    )
  }
}

export default Crypt