import React, { Component } from 'react'
import Qreader from 'react-qr-reader'

class QreaderC extends Component {
  
  constructor(props){
    super(props)
    this.state = {result:"none"}

  }
  
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
    console.log(this.state.result)
    if (this.state.result === "Has desbloqueado el FlexBox Puzzle") {
      this.props.checkQr()
    }
  }
  handleError = err => {
    console.error(err)
  }

  render() {
    return (

      <div className="editor editor-qr">
      <section>
          <Qreader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "400px", height: "400px" }}
          />
        </section>
        
        <div className="editor-pane pane-qr">
          <div className="input-header">
            <div className="file-name">Scan your code</div> QR Reader
          </div>
          <div className="file-window css-view">
              <p clasName="input-strobe">Resultado: {this.state.result}</p>
          </div>
        </div>
        
      </div>
    )
  }
}

export default QreaderC