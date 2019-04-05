require('dotenv').config()
const mongoose = require('mongoose')
const RealFood = require('../models/RealFood')


const seed = [{

    foodName : "Palomitas", 
    imageUrl: "https://google.com/images/",
    foodOwner: "Ger", 
    foodQuality: "10", 
    foodDescription: "Palomitas resurrection"  

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


RealFood.deleteMany()
    .then(() => {
        return RealFood.create(seed)
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