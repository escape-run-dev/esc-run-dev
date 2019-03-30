import axios from 'axios'

class FakeApi {

  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5002/fakeapi/',
      withCredentials: true
    });
    this.service = service
  }

  getModel = code => {
    return this.service.get("getModel")
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
    
  getRandom = () => {
    return this.service.get("random")
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  insertModel = model =>{

    return this.service.post("addModel", model)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

}

export default FakeApi