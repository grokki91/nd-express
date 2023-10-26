import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import api from './routes/api'
import 'dotenv/config'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname+'/public'))
app.use('/', routes)
app.use('/', api);

async function start(url: any, PORT: any) {
    try {
        await mongoose.connect(url)
        app.listen(PORT)
    } catch (error) {
        console.log(error);
    }
}

const url = process.env.URL;
const PORT = process.env.PORT || 3000
start(url, PORT)