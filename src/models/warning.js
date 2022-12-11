const mongoose = require("mongoose");

let app = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  guildid: {
    type: String,
    required: true
  },
  modid: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    required: false,
    default: false
  },
});
module.exports = mongoose.model("warnings", app);
