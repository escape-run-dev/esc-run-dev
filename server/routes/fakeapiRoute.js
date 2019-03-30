const express = require('express')
const router  = express.Router();
const fakeApiF = require('../models/Food')
const fakeApiRF = require('../models/RealFood')


router.post('/addModel', (req,res, next) => {
  const { model } = req.body
  
  const NewRealFood = new fakeApiRF({
    foodName: model,
    imageUrl: model,
    foodOwner: model,
    foodQuality: 1,
    foodDescription: model
  })

  NewRealFood.save()

    .then(response => res.json({response}))
    .catch(err => res.json({message: "Nanai de la China"}))

  })

router.get('/random', (req,res,next) => {
  

  fakeApiF.find()
    .then(response => {

      let finalResponse = response[Math.floor(Math.random()*response.length)]  
      res.json({ finalResponse })
    
    })
    .catch(err => console.log(err))   
})

router.get('/getModel/:id', (req,res,next) => {

  const {code} = req.params.id

  fakeApiF.findOne({code}, code)
    .then(response => res.json(response))
    .catch()

})
 


module.exports = router