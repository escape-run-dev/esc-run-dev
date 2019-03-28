import axios from 'axios';

class TestingService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5002/',
      withCredentials: true
    });
    this.service = service
  }

  writeFile = (id, content) => {
    return this.service.post('/writeFile', {id,content})
   
  } 

  runJasmine = (id) => {
    return this.service.post('/runJasmine', {id})
    .then(response => response.data)
  } 

}

export default TestingService