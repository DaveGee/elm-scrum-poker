
import rooms from './rooms'

const play = (socket, io) => {
  let user = null
  let currentRoomId = null

  const refresh = () => {
    if(user && currentRoomId) {
      const room = JSON.parse(JSON.stringify(rooms.room(currentRoomId)))
      if(room.stories.length)
        delete room.stories[0].votes
      io.in(currentRoomId).emit('room', room)
    }
  }

  socket.on('start', (userName, cb) => {
    user = { userName, id: socket.id }
    const room = rooms.new(user)
    socket.join(room.id)
    currentRoomId = room.id
    cb(room)
  })

  // new user in room
  socket.on('hello', (userName, roomId, cb) => {
    user = { userName, id: socket.id }
    rooms.join(roomId, user)
    socket.join(roomId)
    currentRoomId = roomId
    cb('welcome, ' + userName)
    socket.broadcast.to(roomId).emit('joined', user.userName)
    refresh()
  })

  socket.on('story', (story, cb) => {
    rooms.newStory(story, currentRoomId, user)
    socket.broadcast.to(currentRoomId).emit('story', story)
    cb(story)
    refresh()
  })

  socket.on('vote', (vote, cb) => {
    rooms.vote(user, currentRoomId, vote)
    refresh()
  })

  socket.on('result', () => {
    rooms.end(user, currentRoomId)
    io.in(currentRoomId).emit('result', rooms.room(currentRoomId))
  })

  socket.on('disconnect', () => {
    console.log('disconnect: ', user, currentRoomId)
    if(currentRoomId && user) {
      io.in(currentRoomId).emit('left', user)
      currentRoomId = null
      user = null
    }
    refresh()
  })

  // socket.emit('kick', { user, room })
  // socket.emit('result', { room })
}

export default play