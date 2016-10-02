
let rooms = {}

const newRoom = (_, { user }) => {
  const id = Math.random().toString(36).slice(2)
  if(rooms[id]) return newRoom(_, { user })

  if(!user) user = 'Admin'

  rooms[id] = {
    id,
    admin: user,
    users: {
      [user]: {}
    }
  }
  
  return rooms[id]
} 

const joinRoom = ({ roomId, user }) => {

  if(!rooms[roomId]) throw "No room with id " + roomId
  rooms[roomId].users[user] = {}
  return rooms[roomId].users
}



export default {
  new: (params, query) => newRoom(params, query),
  reset: () => rooms = Immutable.Map(),
  join: (params) => joinRoom(params)
}