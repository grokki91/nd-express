const express = require('express')
const app = express()
const routes = require('./routes')
const api = require('./routes/api')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname+'/public'))
app.use('/', routes)
app.use('/', api)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening post ${PORT}`);
})