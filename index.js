const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use('/public', express.static(__dirname+'/public'))
app.use('/', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT)