import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link, Redirect } from 'react-router-dom';
class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {  username: "", 
                    password: "",
                    email: "",
                    redirect: false 
                  }         
    this.service = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const {username, password, email} = this.state

      
    this.service.signup(username, password, email)
    .then( response => {
        this.setState({
            username: "", 
            password: "", 
            email: "",
            redirect: true
        });
        this.props.setUser(response)
        
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
        {this.state.redirect ? <Redirect to="/vid"/> : null}
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <label>Nombre del grupo:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <label>Contraseña:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <br/><br/>
          <label>Email:</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          <br/><br/>
          <input type="submit" value="Signup" />
        </form>
  
        <p>¿Ya tienes una cuenta? Entra
            <Link to={"/login"}> Login</Link>
        </p>
  
      </div>
    )
  }  
}

export default Signup;
