const mongoose = require("mongoose");

let app = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: false
  },
  disabledCommands: {
    type: Array,
    required: true,
    default: []
  },
  welcomeMesasge: {
    type: String,
    required: false,
    default: "Welcome to the server {user}!"
  },
  welcomeChannel: {
    type: String,
    required: false,
  }
});
module.exports = mongoose.model("guilds", app);
