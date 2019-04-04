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
  } 

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
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

  getTheGame = () => {
    return this.service.get()
    .then(response => {
      return response.data
    })
  }

  setTheGame = (game) => {
    return this.service.post('/setGame', {data: game})
    .then(response => {
      return response.data
    })
  }
}


export default AuthService
