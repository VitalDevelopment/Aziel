require('dotenv').config();

module.exports = {
  port: 80,
  mongo: process.env.mongo,
  ownerids: ["529815278456930314", "700609775838298113"],
  staff: ["529815278456930314", "700609775838298113"],
  bot: {
    prefix: "a!", // also slash commands
    clientid: "829896567963910164",
    redirect: "http://localhost/auth/callback",
    secret: process.env.secret,
    token: process.env.token
  }
}