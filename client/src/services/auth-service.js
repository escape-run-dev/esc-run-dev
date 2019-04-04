import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}api/`,
      withCredentials: true
    });
    this.service = service
    this.loggedInWay = false
  }

  signup = (username, password, email) => {
    return this.service.post('/signup', {username, password, email})
    .then(response => response.data)
    .catch(err => {
      if(err.response.status === 400 || err.response.status === 401) {return {message:"Usuario ya existente o contraseña inválida"}}
      if(err.response.status === 500)  {return {message:"Algo ha ido mal internamente, vuelve a intentarlo"}}
      return
    })
  } 

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      if(err.response.status === 400 || err.response.status === 401) {return {message:"Parece que ese es no es el nombre de tu equipo"}}
      if(err.response.status === 500)  {return {message:"Algo ha ido mal internamente, vuelve a intentarlo"}}
      return
      })
  } 

  loggedIn = () => {
    return this.service.get('/loggedin')
        .then(response => response.data)
  }

  logOut = () => {
    return this.service.post('/logout')
      .then(response => {
        this.loggedInWay = false
      return response.data
      })
  }

}


export default AuthService
