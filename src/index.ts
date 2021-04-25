import fastify from 'fastify'

const server = fastify()
// connexion a mongo
server.register(require('./connector'))

server.register(require('./routes/formations'))
server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
