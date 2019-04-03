import axios from 'axios';

class TestingService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
    this.service = service
  }

  writeFile = (id, content, prueba) => {
    return this.service.post('/writeFile', {id,content,prueba})
    // .then(res => res)
  } 

  writeCss = (content, validator) => {
    return this.service.post('/writeCss', {content, validator})
  } 

  writeCollisions = (content) => {
    return this.service.post('/writeCollisions', {content})
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