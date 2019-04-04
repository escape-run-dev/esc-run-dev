require('dotenv').config()
const mongoose = require('mongoose')
const Food = require('../models/Food')

const seed = [{

    code: "$2a$10$c08W6UGwPGzdd6huNviHKNqGR3b84L6sww4QTwGJmVrPBfuTxy",
    foodName: "Salmón con garbanzos",
    foodOwner: "Sofía",
    foodDescription: "Riquísimo, pero no es vegano",
    foodQuality: 7,
    imageUrl: "https://i.ibb.co/QXTLCf1/Whats-App-Image-2019-04-03-at-18-41-25-3.jpg"

  },
  {

    foodName: "Ensalada",
    foodDescription: "No conquistas nada con una ensalada",
    imageUrl: "https://i.ibb.co/5k4vmdv/Whats-App-Image-2019-04-03-at-18-41-25-2.jpg"
  
},
  {
    foodName: "Donuts de la máquina",
  },
  {
    code: "",
    foodName: "Acelgas con salchicas",
    foodOwner: "David",
    foodDescription: "Comida medianamente sana que extraña a la mayoría",
    foodQuality: 10,
    imageUrl: "https://i.ibb.co/Myd2njV/acelgasconsalchichas.jpg"
    
  },
  {

    imageUrl: "https://i.ibb.co/C1jYY6c/Whats-App-Image-2019-04-03-at-18-41-25-1.jpg"

},
{
  imageUrl: "https://i.ibb.co/gD0qBns/Whats-App-Image-2019-04-03-at-18-41-25.jpg",
  foodName: "Esparragos con atún"
},
{
  imageUrl: "https://i.ibb.co/bvKq8JM/champinonesconjamon.jpg"
},
{
  imageUrl: "https://i.ibb.co/7pT4GgK/filetesrusos.jpg",
  foodName: "Filetes Rusos",
  description: "Hechos a la plancha"
},
{

  imageUrl: "https://i.ibb.co/H4dgMrJ/arroztresdelicias.jpg",
  foodQuality: 7,
  foodColor: "Blanco",
  foodFromOutside: "Nope"

},
{
  imageUrl: "https://i.ibb.co/ZgrBfjt/guisantesconhuevoybacon.jpg",
  foodName: "Guisantes con huevo y bacon",
  foodColor: "Verde"
},
{
  imageUrl: "https://i.ibb.co/8Y02c62/nuggets.jpg",
  foodColor: "Marrón y amarillo",
  foodCover: "Ninguno"
},
{
  imageUrl: "https://i.ibb.co/YNp7bbw/burrito.jpg",
  foodName: "Burrito",
  foodFromOutside: "Sí"
},
{
  imageUrl: "https://i.ibb.co/drjLbQ6/pisto.jpg",
  foodName: "Pisto",
  foodColor: "Rojo",
  foodQuality: 6
},
{

  imageUrl: "https://i.ibb.co/BKs9gW9/arrozconpolloyverduras.jpg",
  foodName: "Arroz con pollo y verduras",
  foodQuality: 8
},
{
  imageUrl: "https://i.ibb.co/XpFKdhK/tallarinescontomate.jpg",
  foodOwner: "Javi"
},
{
  imageUrl: "https://i.ibb.co/k8yWnDk/tortillasolitaria.jpg",
  foodQuality: 9
},
{
  imageUrl: "https://i.ibb.co/kxYZCZ3/tortillaconmostazaypan.jpg",
  foodQuality: 10,
  foodDescription: "Una tortilla con mostaza y pan esta OP"

}


]



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