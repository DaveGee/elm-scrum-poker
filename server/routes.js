import rooms from './rooms'

const routes = []
const interceptor = (module) => (req, res) => {
  return new Promise((fulfill, reject) => {
    try {
      fulfill(module({...req.params}, {...req.query}))
    } catch (ex) {
      reject(ex)
    }
  })
  .then(result => res.json({ result }))
  .catch(err => res.status(500).json({ error: err }))
} 
const get = (path, module) => routes.push({ method: 'get', path, module: interceptor(module) })

/**
 * Create room
 * Join room
 * Vote
 * End vote
 * Kick out voter
 */

get('/room/new',                      rooms.new)
get('/room/reset',                    rooms.reset)
get('/room/:roomId/join/:user',         rooms.join)
get('/room/:roomId/vote/:user/:vote',   rooms.vote)
get('/room/:roomId/end',                rooms.end)
get('/room/:roomId/kick/:user',         rooms.kick)

export default routes