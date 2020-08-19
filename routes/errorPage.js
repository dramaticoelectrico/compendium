const express = require('express')
const router = express.Router()
const Styles = require('../utils/globalStyles')

router.use((error, req, res, next) => {
  console.log(error)
  res
    .status(500)
    .render('errorPage', {
      title: 'ERROR Bad request buddy',
      css: Styles.globalCSS,
    })
})

module.exports = router
