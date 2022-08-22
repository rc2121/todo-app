import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { server } from './server'

const PORT = Number(process.env['PORT']) || 4000

export async function createApp() {
    const app = express()
    app.use(cors())
    await server.start()
    server.applyMiddleware({app})
    return app
}

createApp().then((e) => {
    e.listen(PORT, () => {
          console.log(`Graphql server running on http://localhost:${PORT}`)
    })
})