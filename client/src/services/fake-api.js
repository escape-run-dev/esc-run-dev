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
    return this.service.post("getModel", )
      .then(response => console.log(response))
    }
    
  getRandom = () => {
    return this.service.get("random")
      .then(response => response.data.finalResponse)
  }
  
  insertModel = model =>{

    return this.service.post("addModel", model)
      .then(response => console.log(response))
  }

}

export default FakeApi