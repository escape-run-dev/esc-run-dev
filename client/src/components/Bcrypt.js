import React, {Component} from 'react'
import Bcrypt from 'bcryptjs'

class Crypt extends Component {
  
  constructor() {
    super();
    this.state = {
      input: "",
      output: ""
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

  render(){
    return(
      <form className="bcrypt" onSubmit={(e) => this.cryptoMethod(e)}>
        <label>Introduce la clave que deseas cifrar:</label><br/><br/>
        <input type="text" name="input"value={this.state.input} onChange={e => this.handlerChange(e)}/><br/><br/>
        <button type="submit">Cifrar</button><br/><br/><br/>

        {this.state.output ? <p>{this.state.output}</p>: null}
      
      </form>
    )
  }
}

export default Crypt