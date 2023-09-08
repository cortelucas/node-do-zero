import { randomUUID } from 'node:crypto'
import sql from './db.js'

export class DatabasePostgres {
    #videos = new Map()

    async list(search) {
        let videos;

        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ilike ${'%' + search + '%'};`
        } else {
            videos = await sql`SELECT * FROM videos`
        }

        return videos
    }

    async create({ title, description, duration }) {
        const videoID = randomUUID()

        await sql `
            INSERT INTO videos (id, title, description, duration) VALUES (${videoID}, ${title}, ${description}, ${duration})`
    }

    async update(id, { title, description, duration }) {
        await sql`
        UPDATE public.videos
        SET title=${title}, description=${description}, duration=${duration}
        WHERE id=${id};`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}
