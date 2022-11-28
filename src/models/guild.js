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
  welcomeMessage: {
    type: String,
    required: false,
    default: "Welcome to the server {user}!"
  },
  welcomeChannel: {
    type: String,
    required: false,
  },
  leaveMessage: {
    type: String,
    required: false,
    default: "{user.tag} has just left the server."
  },
  leaveChannel: {
    type: String,
    required: false,
  }
});
module.exports = mongoose.model("guilds", app);
