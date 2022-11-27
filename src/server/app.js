//-Packages & Config-//
const mongoose = require('mongoose')
const express = require('express')
const client = global.client;
const config = global.config;

//-MongoDB Login-//
try {
mongoose.connect(config.mongo)
.then(console.info("Mongoose Connected"))
} catch(err) {
console.error(err)
}

//-Webserver-//
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/server/pages');
app.use(express.static("./src/server/pages/static"))

const dashRouter = require('./routers/dash.js');
app.use('/dashboard', dashRouter);
app.use('/dash', dashRouter);

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}.`)
})