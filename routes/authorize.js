const express = require('express')
const router = express.Router()

const authorizeController = require('../controllers/authorize')
// GET ROUTES
router.get('/auth/signin', authorizeController.getSignInRoute)
router.get('/auth/register', authorizeController.getRegisterRoute)

// POST ROUTES
router.post('/auth/register', authorizeController.postRegisterRoute)
router.post('/auth/signin', authorizeController.postSignInRoute)

// API JS ENABLED
router.post('/api/auth/signin', authorizeController.apiSignIn)
router.post('/api/auth/register', authorizeController.apiRegister)

module.exports = router
