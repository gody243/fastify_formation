import fastifyPlugin from 'fastify-plugin'

async function dbConnector (fastify, options) {
  fastify.register(require('fastify-mongodb'), {
    url: 'mongodb+srv://godyUser:Mayokila1.@cluster0.fkil1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
export default fastifyPlugin(dbConnector)
