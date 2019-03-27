import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {  username: "", 
                    password: "", 
                    campus: "", 
                    course: "", 
                    imageURL: ""
                }
    this.service = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const username = this.state.username
    const password = this.state.password
    const campus = this.state.campus
    const course = this.state.course
    const imageURL = this.state.imageURL
  
    this.service.signup(username, password, campus, course, imageURL)
    .then( response => {
        this.setState({
            username: "", 
            password: "", 
            campus: "", 
            course: "", 
            imageURL: ""
        });
        // this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
      
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <br/><br/>
          <label>Course:</label>
          <input type="text" name="course" value={this.state.course} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <label>Campus:</label>
          <input type="text" name="campus" value={this.state.campus} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <label>Image URL:</label>
          <input type="text" name="imageURL" value={this.state.imageURL} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <input type="submit" value="Signup" />
        </form>
  
        <p>Already have account? 
            <Link to={"/"}> Login</Link>
        </p>
  
      </div>
    )
  }  
}

export default Signup;
