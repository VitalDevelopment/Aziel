//-Packages & Config-//
const mongoose = require('mongoose')
const client = global.client;
const config = global.config;

try {
mongoose.connect(config.mongo)
.then(console.info("Mongoose Connected"))
} catch(err) {
console.error(err)
}
