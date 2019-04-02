import React, {Component} from 'react'
import VideoPlayer from 'react-player'
import {Redirect} from 'react-router'

class Video extends Component {

  constructor(){
    super();
    this.state = {
      redirect: false
    }
  }

  endVideo = () => this.setState({
  
    redirect: true
  
  })

  render(){
    
    return (
      <main className="intro-video">
        {this.state.redirect ? <Redirect to="/game-1"/> : null}        
        <VideoPlayer className="video" url='https://www.youtube.com/watch?v=9CS7j5I6aOc' playing={true} onEnded={() => this.endVideo()}/>
      </main>
    )}
}

export default Video