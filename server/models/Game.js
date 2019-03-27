const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const gameSchema = new Schema({
    team : {type:Schema.Types.ObjectId, ref:"Team"},
    round1: { type: Boolean, default: false },
    round2: { type: Boolean, default: false },
    round3: { type: Boolean, default: false },
    round4: { type: Boolean, default: false },
    round5: { type: Boolean, default: false },
    ended: { type: Boolean, default: false },
},
{
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game
