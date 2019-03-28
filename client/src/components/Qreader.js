import React, { Component } from 'react'
import Qreader from 'react-qr-reader'

class QreaderC extends Component {
  
  constructor(){
    super()
    this.state = {result:"none"}

  }
  
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div>
        <Qreader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '400px', height: '400px' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QreaderC