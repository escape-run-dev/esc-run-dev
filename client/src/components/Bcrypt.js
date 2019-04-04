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
  
  cryptoDone = somekw => {
    
    const abc = ["a","b","c"], def = ["d","e","f"], ghi = ["g","h","i"], jkl = ["j","k","l"], mnñ = ["m","n","ñ"], opq = ["o","p","q"], rst = ["r","s","t"], uvw = ["u","v","w"], xyz = ["x","y","z"]
    let crypted = []

    somekw.toLowerCase().split("").forEach(elm => {

      if(abc.includes(elm)) crypted.push("AwcOkPd345cvP")
      if(def.includes(elm)) crypted.push("L3cPaNNNl212E")
      if(ghi.includes(elm)) crypted.push("Wo89c1lLVwieP")
      if(jkl.includes(elm)) crypted.push("bV2301k9CAksE")
      if(mnñ.includes(elm)) crypted.push("1Jglv3LeowlzD")
      if(opq.includes(elm)) crypted.push("ePq001Oei92aA")
      if(rst.includes(elm)) crypted.push("Wl0cXlp239kcV")
      if(uvw.includes(elm)) crypted.push("Pow2CzPMcb92I") 
      if(xyz.includes(elm)) crypted.push("ZpWnCCzQcaC2D") 
    })

    return crypted.join("")
  }

  cryptoMethod = (e) => {
    e.preventDefault()
    if (this.state.input) {
      
      this.setState({output: this.cryptoDone(this.state.input)})
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