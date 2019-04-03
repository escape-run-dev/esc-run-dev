import React, { Component } from 'react';
import AuthService from '../services/auth-service';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {  username: "", 
                    password: "",
                    redirect: false,
                }
    this.service = new AuthService()
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    
    const {username, password} = this.state
      
    this.service.login(username, password)
    .then( response => {
      this.props.setUser(response)
      this.setState({
          username: "", 
          password: "",
          redirect: true
      })    
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (e) => {  
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

      
  render(){
    return(
      <main className="login-container">
        {this.state.redirect ? <Redirect to="/vid"></Redirect> : null}
        <form className="login-form" onSubmit={this.handleFormSubmit}>
          <label>Nombre del grupo: </label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <label>Contraseña: </label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <input type="submit" value="Login" />
        </form>
  
        <p>¿No tenéis una cuenta? <Link to={"/signup"}>Registraos</Link></p>
  
      </main>
    )
  }  
}

export default Login;
