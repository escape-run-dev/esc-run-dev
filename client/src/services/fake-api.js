import axios from 'axios'

class FakeApi {

  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}fakeapi/`,
      withCredentials: true
    });
    this.service = service
  }

  getModel = code => {
    return this.service.get(`getModel/${code}`)
      .then(response => response.data)
    }
    
  getRandom = () => {
    return this.service.get("random")
      .then(response => response.data.finalResponse)
  }
  
  insertModel = code =>{
    return this.service.post("addModel", {code})
      .then(response => response.data)
  }

}

export default FakeApi