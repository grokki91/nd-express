const express = require('express')
const app = express()
const routes = require('./routes')
const api = require('./routes/api')
const http = require('http')
const socketIO = require('socket.io')

const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname+'/public'))
app.use('/', routes)
app.use('/', api)

io.on('connection', (socket) => {
    const {id} = socket
    console.log(`Connection - ${id}`);

    socket.on('message-to-me', (msg) => {
        msg.type = 'me'
        socket.emit('message-to-me', msg)
    })

    socket.on('message-to-all', (msg) => {
        msg.type = `User-${id}`
        socket.broadcast.emit('message-to-all', msg)
        socket.emit('message-to-all', msg)
    })

    socket.on('disconnect', () => {
        console.log(`Disconnect - ${id}`);
    })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server listening post ${PORT}`);
})