
let rooms = {}

const newRoom = (user) => {
  const id = Math.random().toString(36).slice(2)
  if(rooms[id]) return newRoom(user)

  if(!user) user = { userName: 'Admin' }

  rooms[id] = {
    id,
    admin: user,
    users: [user],
    stories: []
  }
  
  return rooms[id]
} 

const joinRoom = (roomId, user) => {

  if(!rooms[roomId]) throw "No room with id " + roomId
  rooms[roomId].users.push(user)
  return rooms[roomId]
}

export default {
  rooms: () => rooms,
  reset: () => rooms = {},

  new: newRoom,
  join: joinRoom,
}