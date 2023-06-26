const express = require('express')
const mongo = require('mongoose')
const app = express()
const routes = require('./routes')
const api = require('./routes/api')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname+'/public'))
app.use('/', routes)
app.use('/', api);

async function start(url, PORT) {
    try {
        await mongo.connect(url)
        app.listen(PORT)
    } catch (error) {
        console.log(error);
    }
}

const url = process.env.URL;
const PORT = process.env.PORT || 3000
start(url, PORT)