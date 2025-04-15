// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Register Swagger first
fastify.register(require('@fastify/swagger'), {
    openapi: {
        info: {
            title: 'Fastify API',
            description: 'Fastify API documentation',
            version: '1.0.0'
        },
        servers: [{
            url: 'http://localhost:3000'
        }]
    }
})

fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    exposeRoute: true
})

// Register other plugins after Swagger
fastify.register(require('@fastify/diagnostics-channel'), {})
fastify.register(require('./routes/items'))

const PORT = 3000

const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: '127.0.0.1' })
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
