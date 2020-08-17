const express = require('express')
const router = express.Router()
const Styles = require('../utils/globalStyles')
const fetch = require('node-fetch')

router.post('/submit', (req, res, next) => {
  if (!req.body) {
    return res.send(400)
  }
  console.log(req.body)
  res.render('submit', {
    title: 'Success! data submitted',
    css: Styles.globalCSS,
    data: req.body,
  })
})

module.exports = router
