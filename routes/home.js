const express = require('express')
const router = express.Router()
const Styles = require('../utils/globalStyles')

router.get('/', (req, res) => {
  res.render('index', { title: 'Express Start', css: Styles.globalCSS })
})

module.exports = router
