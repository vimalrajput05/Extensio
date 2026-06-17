const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../config/env')

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Email and password required' })

    if (password.length < 6)
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' })

    const normalizedEmail = String(email).toLowerCase().trim()

    const exists = await User.findOne({ email: normalizedEmail })
    if (exists)
      return res.status(400).json({ success: false, error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ email: normalizedEmail, password: hashed, name: name || '' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    return res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, plan: user.plan, name: user.name }
    })

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Email and password required' })

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user)
      return res.status(401).json({ success: false, error: 'Invalid email or password' })

    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(401).json({ success: false, error: 'Invalid email or password' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, plan: user.plan, name: user.name }
    })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body

    if (typeof name !== 'string' || name.trim().length === 0)
      return res.status(400).json({ success: false, error: 'Name is required' })

    if (name.trim().length > 50)
      return res.status(400).json({ success: false, error: 'Name too long (max 50 chars)' })

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name.trim() },
      { new: true }
    )

    if (!user)
      return res.status(404).json({ success: false, error: 'User not found' })

    return res.json({
      success: true,
      user: { id: user._id, email: user.email, plan: user.plan, name: user.name }
    })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}

