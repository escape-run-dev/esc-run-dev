require('dotenv').config()
const mongoose = require('mongoose')
const Food = require('../models/Food')

const seed = [{

    code: "$2a$10$c08W6UGwPGzdd6huNviHKNqGR3b84L6sww4QTwGJmVrPBfuTxy",
    foodName: "Salmón con garbanzos",
    foodOwner: "Sofía",
    foodDescription: "Riquísimo pero no es veggie",
    foodQuality: 7,
    imageUrl: "https://i.ibb.co/QXTLCf1/Whats-App-Image-2019-04-03-at-18-41-25-3.jpg"

  },
  {

    foodName: "Ensalada",
    foodDescription: "No conquistas nada, con una ensalada",
    imageUrl: "https://i.ibb.co/5k4vmdv/Whats-App-Image-2019-04-03-at-18-41-25-2.jpg"
  
},
  {
    foodName: "Donuts de la máquina",
  },
  {
    code: "",
    foodName: "Acelgas con salchicas",
    foodOwner: "David",
    foodDescription: "Comida medianamente sana",
    foodQuality: 10,
    imageUrl: "https://i.ibb.co/vxFc6cb/Whats-App-Image-2019-04-03-at-18-40-06-9.jpg"
    
  },
  {

    imageUrl: "https://i.ibb.co/C1jYY6c/Whats-App-Image-2019-04-03-at-18-41-25-1.jpg"

},
{
  imageUrl: "https://i.ibb.co/gD0qBns/Whats-App-Image-2019-04-03-at-18-41-25.jpg",
  foodName: "Esparragos con atún"
},
{
  imageUrl: "https://i.ibb.co/YTW0L7h/Whats-App-Image-2019-04-03-at-18-40-07-2.jpg"
},
{
  imageUrl: "https://i.ibb.co/ZVJdVDs/Whats-App-Image-2019-04-03-at-18-40-07-1.jpg",
  foodName: "Filete Ruso",
  description: "Hechos a la plancha"
},
{
  imageUrl: "https://i.ibb.co/mzqMTSv/Whats-App-Image-2019-04-03-at-18-40-07.jpg",
  foodQuality: 7,
  foodColor: "Blanco",
  foodFromOutside: "Nope"

},
{
  imageUrl: "https://i.ibb.co/R0xM1m8/Whats-App-Image-2019-04-03-at-18-40-06-7.jpg",
  foodName: "Guisantes con huevo y bacon",
  foodColor: "Verde"
},
{
  imageUrl: "https://i.ibb.co/gd6kZQ7/Whats-App-Image-2019-04-03-at-18-40-06-6.jpg",
  foodColor: "Marrón y amarillo",
  foodCover: "Ninguno"
},
{
  imageUrl: "https://i.ibb.co/w0mZSkN/Whats-App-Image-2019-04-03-at-18-40-06-5.jpg",
  foodName: "Burrito",
  foodFromOutside: "Sí"
},
{
  imageUrl: "https://i.ibb.co/bNHmws6/Whats-App-Image-2019-04-03-at-18-40-06-4.jpg",
  foodName: "Pisto",
  foodColor: "Rojo",
  foodQuality: 6
},
{
  imageUrl: "https://i.ibb.co/qBNMd2b/Whats-App-Image-2019-04-03-at-18-40-06-2.jpg",
  foodName: "Arroz con pollo y verduras",
  foodQuality: 8
},
{
  imageUrl: "https://i.ibb.co/5vPvgvH/Whats-App-Image-2019-04-03-at-18-40-06-1.jpg",
  foodOwner: "Javi"
},
{
  imageUrl: "https://i.ibb.co/Tr9q48J/Whats-App-Image-2019-04-03-at-18-40-06.jpg",
  foodQuality: 10
},


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