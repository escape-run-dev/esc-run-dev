import axios from 'axios';

class TestingService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5002/',
      withCredentials: true
    });
    this.service = service
  }

  writeFile = (id, content, prueba) => {
    return this.service.post('/writeFile', {id,content,prueba})
    // .then(res => res)
  } 

  writeCss = (content) => {
    console.log(content)
    return this.service.post('/writeCss', {content})
  } 

  // runJasmine = (id) => {
  //   return this.service.post('/runJasmine', {id})
  //   .then(res => {
  //       console.log("He llegado un poco más abajo")
  //       console.log(res.data)
  //       return res.data
  //     })
  // } 
  
}

export default TestingService