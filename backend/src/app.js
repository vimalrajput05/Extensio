require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { PORT, MONGO_URI, FRONTEND_URL } = require('./config/env')
const authRoutes = require('./routes/authRoutes')
const extensionRoutes = require('./routes/extensionRoutes')


const app = express()

app.use(express.json())

app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))

app.use('/api/auth', authRoutes)

app.use('/api/extensions', extensionRoutes)


async function startServer() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected successfully')

    app.listen(PORT, () => console.log('Server running on port ' + PORT))
  } catch (error) {
    console.error('Startup error:', error.message)
    process.exit(1)
  }
}

startServer()

