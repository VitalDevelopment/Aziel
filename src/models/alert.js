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
  reason: {
    type: String,
    required: false
  },
  reporter: {
    type: String,
    required: true
  },
  proof: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model("userAlerts", app);
