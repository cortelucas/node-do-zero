import postgres from 'postgres'
import { config } from 'dotenv'

config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

const sql = postgres(URL, { ssl: 'require' })

export default sql
