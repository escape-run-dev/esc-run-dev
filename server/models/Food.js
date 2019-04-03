const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const FoodApi = new Schema({
    code: String,
    foodName : String, 
    imageUrl: String,
    foodOwner: String, 
    foodQuality: Number, 
    foodDescription: String, 
    foodCover: String,
    foodTaste: String,
    foodColor: String, 
    foodFromOutside: String
  
})

const Food = mongoose.model('Food', FoodApi)
module.exports = Food