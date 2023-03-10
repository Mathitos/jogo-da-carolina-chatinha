import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { WebSocketServer } from 'ws'
import { handleAction } from './src/game-logic.js'

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

const serverPort = process.env.PORT || 3001

let server = app.listen(serverPort, () => {
  console.log(`Listening to port ${serverPort}...`)
})

const onConnection = (ws, req) => {
  ws.on('message', data => handleAction(ws, data))
  ws.on('error', err => console.error(`onError: ${err.message}`))
  ws.send(`conected!`)
  console.log(`onConnection`)
}

const wss = new WebSocketServer({ server })
wss.on('connection', onConnection)
