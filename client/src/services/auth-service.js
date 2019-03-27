import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, campus, course, imageURL) => {
    return this.service.post('/signup', {username, password, campus, course, imageURL})
    .then(response => response.data)
  }  

}

export default AuthService;
