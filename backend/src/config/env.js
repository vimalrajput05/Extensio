require('dotenv').config()

const { PORT, MONGO_URI, GROQ_API_KEY, FRONTEND_URL } = process.env

if (!MONGO_URI) throw new Error('Missing required env variable: MONGO_URI')
if (!GROQ_API_KEY) throw new Error('Missing required env variable: GROQ_API_KEY')
if (!FRONTEND_URL) throw new Error('Missing required env variable: FRONTEND_URL')

const parsedPort = PORT && String(PORT).trim() !== '' ? Number(PORT) : 5000

module.exports = {
  PORT: parsedPort,
  MONGO_URI,
  GROQ_API_KEY,
  FRONTEND_URL,
}

