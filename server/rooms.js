
let rooms = {}

/**
 * rooms[id] = {
    id,
    admin: user.id,
    users: [user],
    stories: [{ name, votes: { [userid]: vote }}]
  }
 */

const isInRoom = (user, room) => 
  room.admin === user.id
  || room.users.some(u => u.id === user.id)

const addVote = (user, roomId, vote) => {
  const room = rooms[roomId]
  if(room && user && isInRoom(user, room) 
      && room.stories.length && !room.stories[0].ended) {
    room.stories[0].votes[user.id] = vote
  }
}

const newStory = (storyName, roomId, user) => {
  const room = rooms[roomId]
  if(room && room.admin === user.id) {
    room.stories.unshift({
      name: storyName,
      votes: {}
    })
  }
}

const newRoom = (user) => {
  const id = Math.random().toString(36).slice(2)
  if(rooms[id]) return newRoom(user)

  if(!user) user = { userName: 'Admin' }

  rooms[id] = {
    id,
    admin: user.id,
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

const endGame = (user, roomId) => {
  const room = rooms[roomId]
  if(room && user && room.admin === user.id)
    room.stories[0].ended = true
}

export default {
  rooms: () => rooms,
  reset: () => rooms = {},
  room: (id) => rooms[id],

  new: newRoom,
  join: joinRoom,
  newStory: newStory,
  vote: addVote,
  end: endGame,
}