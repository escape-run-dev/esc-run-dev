const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const teamSchema = new Schema({
    username : String,
    email: String,
    password: String,
    games: [{type:Schema.Types.ObjectId, ref:"Game"}],
    score: Number
},
{
  timestamps: true
})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team
