const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const FoodApi = new Schema({
    code: String,
    foodName : String, 
    imageUrl: String,
    foodOwner: String, 
    foodQuality: Number, 
    foodDescription: String, 
    foodDrink: String,
    foodCover: String,
    foodTaste: String,
    foodState: String,
    foodComponent: String,
    foodColor: String,
    foodVegetables: Boolean,
    isVeggie: Boolean, 
    foodFromOutside: Boolean
  
})

const Food = mongoose.model('Game', FoodApi)
module.exports = Food