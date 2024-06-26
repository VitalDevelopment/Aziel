const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

module.exports = {
  port: 3003,
  mongo: process.env.mongo,
  ownerids: ["529815278456930314", "700609775838298113", "272442568275525634"],
  staff: ["529815278456930314", "700609775838298113"],
  sc_key: process.env.statcord_key,
  bot: {
    prefix: "a!",
    clientid: "829896567963910164",
    redirect: "http://localhost/auth/callback",
    secret: process.env.secret,
    token: process.env.token,
    vb_key: process.env.voidbots_key,
    topgg_key: process.env.topgg_key,
  }
}
