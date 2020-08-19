const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const { jwtauth } = req.cookies
  const token = req.header('auth-token') || jwtauth
  if (!token) return res.redirect('/auth/signin')
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.redirect('/auth/signin')
  }
}
module.exports = auth
