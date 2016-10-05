

var socket = io('http://localhost:4000');

socket.on('joined', (user) => {
  console.log('joined: ', user)
})


const start = () => {
  socket.emit('start', 'David', (room) => {
    console.log('start: ', room)
  })
}

const join = (roomId) => {
  socket.emit('hello', 'John', roomId, (res) => {
    console.log('hello: ', res)
  })
}
