const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env')

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ success: false, error: 'Unauthorized' })

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid token' })
  }
}

exports.optionalAuth = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    req.userId = null
    return next()
  }

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.id
  } catch {
    req.userId = null
  }

  next()
}

