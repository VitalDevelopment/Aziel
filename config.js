require('dotenv').config();

module.exports = {
    port: 80,
    mongo: process.env.mongo,
    ownerids: ["529815278456930314"],
    bot: {
      prefix: "a!", // also slash commands
      clientid: "829896567963910164",
      token: process.env.token
    }
}