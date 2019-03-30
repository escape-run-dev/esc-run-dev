const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const RealFood = new Schema({

    foodName : {type: String, required:true}, 
    imageUrl: {type: String, required:true},
    foodOwner: {type: String, required:true}, 
    foodQuality: {type: Number, required:true}, 
    foodDescription: {type: String, required:true}  

  })

const Food = mongoose.model('RealFood', RealFood)
module.exports = Food