const express = require('express')
const router  = express.Router();
const fakeApiF = require('../models/Food')
const fakeApiRF = require('../models/RealFood')


router.post('/addModel', (req,res, next) => {
  const { code } = req.body
  

  const NewRealFood = new fakeApiRF({
    [code.input1] : code.input1value,
    [code.input2] : code.input2value,
    [code.input3] : code.input3value,
    [code.input4] : code.input4value,
    [code.input5] : code.input5value
  })
  NewRealFood.save()
    .then(response => res.json({response}))
    .catch(err => res.json({Img: "https://cdnb.20m.es/cronicaverde/files/2012/02/basura.jpg", Description: "Posiblemente, esto no es lo que estás buscando...", Name: "Comida en la basura"}))

  })

router.get('/random', (req,res,next) => {
  fakeApiF.find()
    .then(response => {
      let finalResponse = response[Math.floor(Math.random()*response.length)]  
      res.json({finalResponse})
    })
    .catch(err => console.log(err))   
})

router.get('/getModel/:id', (req,res,next) => {

  const {id} = req.params

  fakeApiF.findOne({code: id})
    
  .then(response => {
    
    if(response) res.json(response);
    else {
      fakeApiF.findOne({foodName: "Salmón con verduras"}) 
      .then(data => {
        res.json(data)
      })
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err)) 
})
 


module.exports = router
