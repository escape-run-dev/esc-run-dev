import React, {Components} from 'react'
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
  
  cryptoMethod = () => {
    
    Bcrypt.hashSync(this.state.input, this.salt)
  }
}

export default Crypt