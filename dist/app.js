

var socket = io('http://localhost:4000');

socket.on('joined', (user) => {
  console.log('joined: ', user)
})

socket.on('room', (room) => console.log(room))

socket.on('left', (user) => console.log('left', user))

socket.on('result', (room) => console.log('result', room))

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

const story = () => {
  socket.emit('story', 'OPE-554', (res) => {
    console.log('story: ', res)
  })
}

const vote = (vote) => {
  socket.emit('vote', vote, (res) => {
    console.log('vote: ', res)
  })
}

const end = () => socket.emit('result')