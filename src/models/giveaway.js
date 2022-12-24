const mongoose = require('mongoose')


const schema = new mongoose.Schema({

  messageid: {
    type: String,
    required: true
  },
  guildid: {
    type: String,
    required: true
  },
  hostedBy: {
    type: String,
    required: true
  },
  prize: {
    type: String,
    required: true
  },
  winners: {
    type: Number,
    required: false
  },
  pickedWinners: {
    type: Array,
    required: false
  },
  picking: {
    type: Object
 },
  time: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  entries: {
    type: Array,
    required: false
  },
  status: {
    type: String,
    default: "active"
  },
  channelid: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('giveaways', schema)