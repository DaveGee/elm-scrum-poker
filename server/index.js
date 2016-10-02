import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import path from 'path'
import socketServer from 'socket.io'

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/../dist')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../index.html'))
});

routes.forEach(r => {
  app[r.method](r.path, r.module)
})

const server = app.listen(4000, function () {
  console.log('app bootstrapped on port 4000!')
})

const io = new socketServer(server)
io.on('connection', (socket) => {
  console.log('Connection!')
  socket.emit('news', { foo: 'bar' })
})