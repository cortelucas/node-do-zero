import Fastify from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
import { config } from 'dotenv'

config()

const server = Fastify({
    logger: true
})

// const db = new DatabaseMemory()
const db = new DatabasePostgres

server.get('/', () => 'API de Vídeos')

server.get('/videos', async (request, reply) => {
    try {
        const search = request.query.search
        const videos = await db.list(search)
        console.log(videos);
        return videos
    } catch (error) {
        throw new Error(error)
    }
})

server.post('/videos', async (request, reply) => {
    try {
        const { title, description, duration } = request.body

        await db.create({ title, description, duration })
        const video = await db.list()
        
        return reply.status(201).send({
            message: `Vídeo ${video[video.length -1].id} inserido com sucesso.`
        })
    } catch (error) {
        throw new Error(error)
    }
})

server.put('/videos/:id', async (request, reply) => {
    try {
        const videoID = request.params.id
        const { title, description, duration } = request.body
        
        await db.update(videoID, { title, description, duration })

        return reply.status(201).send({
            message: `Vídeo ${videoID} atualizado com sucesso.`
        })
    } catch (error) {
        throw new Error(error)
    }

})

server.delete('/videos/:id', async (request, reply) => {
    try {
        const videoID = request.params.id
        await db.delete(videoID)

        return reply.status(200).send({
            message: `Vídeo ${videoID} removido com sucesso.`
        })
    } catch (error) {
        throw new Error(error)
    }

})

try {
    const port = process.env.PORT ?? 3333
    await server.listen({ port })
} catch (error) {
    server.log.error(error)
    process.exit(1)
}

/*
import { createServer } from 'node:http'

const server = createServer((request, reply) => {
    reply.write('Hello world!')
    return reply.end()
})

server.listen(3333, () => {
    console.log('Servidor rodando na porta 3333')
})
*/