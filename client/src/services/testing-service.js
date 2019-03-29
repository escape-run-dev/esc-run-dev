import axios from 'axios';

class TestingService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5002/',
      withCredentials: true, 
      timeout: 10000,
      transformRequest: [(data) => JSON.stringify(data.data)],
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    this.service = service
  }

  writeFile = (id, content) => {
    return this.service.post('/writeFile', {id,content})
   
  } 

  runJasmine = (id) => {
    console.log(id)
    return this.service.post('/runJasmine', {id})
    .then(res => {
        console.log("He llegado un poco más abajo")
        console.log(res.data)
        return res.data
      })
  } 

}

export default TestingService