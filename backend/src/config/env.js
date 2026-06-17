require('dotenv').config()

const { PORT, MONGO_URI, GROQ_API_KEY, FRONTEND_URL, JWT_SECRET, FREE_PLAN_LIMIT } = process.env

function getRequiredEnv(name, value) {
  if (value === undefined || value === null || String(value).trim() === '') {
    throw new Error(`Missing required env variable: ${name}`)
  }
  return value
}


const PORT_NUM = PORT ? Number(PORT) : 5000

const MONGO_URI_VALUE = getRequiredEnv('MONGO_URI', MONGO_URI)
const GROQ_API_KEY_VALUE = getRequiredEnv('GROQ_API_KEY', GROQ_API_KEY)
const FRONTEND_URL_VALUE = getRequiredEnv('FRONTEND_URL', FRONTEND_URL)

const JWT_SECRET_VALUE = getRequiredEnv('JWT_SECRET', JWT_SECRET)
const FREE_PLAN_LIMIT_VALUE = parseInt(FREE_PLAN_LIMIT, 10) || 3

module.exports = {
  PORT: Number.isFinite(PORT_NUM) ? PORT_NUM : 5000,
  MONGO_URI: MONGO_URI_VALUE,
  GROQ_API_KEY: GROQ_API_KEY_VALUE,
  FRONTEND_URL: FRONTEND_URL_VALUE,
  JWT_SECRET: JWT_SECRET_VALUE,
  FREE_PLAN_LIMIT: FREE_PLAN_LIMIT_VALUE
}




