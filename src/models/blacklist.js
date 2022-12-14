const mongoose = require("mongoose");

let app = mongoose.Schema({
  guildid: {
    type: String,
    required: false
  },
  userid: {
    type: String,
    required: false
  },
  reason: {
    type: String,
    required: false
  },
  staffid: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model("blacklists", app);
