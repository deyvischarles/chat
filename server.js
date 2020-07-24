const express = require('express')
const path = require('path')
const { createSocket } = require('dgram')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 3000
const host = process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'http://localhost'

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = []

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessage', messages)

    socket.on('chat', data => {
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(port, () => {
    const portStr = port === 80 ? '' : ':' + port

    if (process.env.HEROKU_APP_NAME) {
        console.log('Servidor iniciado. Abra o navegador em ' + host)
    } else {
        console.log('Servidor iniciado. Abra o navegador em ' + host + portStr)
    }
})