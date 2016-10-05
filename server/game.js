
import rooms from './rooms'

const play = (socket) => {
  let user = null
  let currentRoomId = null

  let refresh = setInterval(() => {
    if(currentRoomId && user)
      socket.broadcast.to(currentRoomId).emit('refresh')
  }, 3000)

  socket.on('start', (userName, cb) => {
    user = { userName }
    room = rooms.new(user)
    socket.join(room.id)
    currentRoomId = room.id
    cb(room)
  })

  // new user in room
  socket.on('hello', (userName, roomId, cb) => {
    
    try {
      user = { userName }
      rooms.join(roomId, user)
      socket.join(roomId)
      roomId = roomId
      cb('welcome, ' + userName)
      socket.broadcast.to(roomId).emit('joined', user.userName)
    } catch (ex) {
      console.log(ex)
      cb('error')
    }
  })

  socket.on('story', (story) => {

  })

  // new vote 
  socket.on('vote', (vote, cb) => {
    rooms.vote(user.userName, roomId, vote)
    
  })

  socket.on('disconnect', () => {
    console.log('disconnect: ', user)
    if(room)
      socket.broadcast.to(roomId).emit('left', user.userName)
    roomId = null
    user = null
    clearInterval(refresh)
  })

  // socket.emit('kick', { user, room })
  // socket.emit('result', { room })
}

export default play