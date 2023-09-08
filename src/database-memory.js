import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries())
            .map((video) => {
                const id = video[0]
                const data = video[1]

                return {
                    id,
                    ...data
                }
            })
            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                }
                return true
            })
    }

    create({ title, description, duration }) {
        const videoID = randomUUID()

        this.#videos.set(videoID, { title, description, duration })
    }

    update(id, { title, description, duration }) {
        this.#videos.set(id, { title, description, duration })
    }

    delete(id) {
        this.#videos.delete(id)
    }
}
