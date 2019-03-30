require('dotenv').config()
const mongoose = require('mongoose')
const Food = require('../models/Food')

const seed = [{

    code: "qjwerqwklerjwñqlkrj",
    foodName: "Croquetas",
    foodOwner: "David",
    foodDescription: "Croquetas del día anterior",
    foodQuality: 7,
    imageUrl: "https://okdiario.com/img/recetas/2018/01/04/croquetas-pollo.jpg"

  },
  {

    foodName: "Salmón con verduras",
    foodDescription: "Tasty but not veggie",
    imageUrl: "https://imagenes.montevideo.com.uy/imgnoticias/201706/_W880_H495/617153.jpg",
    isVeggie: false
  
},
  {
    foodName: "Donuts de la máquina",
    isVeggie: false
  },
  {
    code: "aalsoewhjka28hj",
    foodName: "Burrito",
    foodOwner: "Pepe",
    foodDescription: "No está tan picante como pensaba",
    foodQuality: 6,
    imageUrl: "https://i0.wp.com/mealsheelsandcocktails.com/wp-content/uploads/2017/10/Frenchs_Cheeseburger_Burrito.jpg?fit=1600%2C1067&ssl=1"
    
  },
  {

    imageUrl: "https://ichef.bbci.co.uk/news/624/cpsprodpb/126F3/production/_95870557_gettyimages-521230034.jpg"

}]



mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


Food.deleteMany()
    .then(() => {
        return Food.create(seed)
    })
    .then(seed => {
        console.log(`${seed.length} collections created with the following id:`);
        console.log(seed.map(u => u._id));
    })
    .then(() => mongoose.disconnect())
    .catch(err => {
        mongoose.disconnect()
        throw err
    })