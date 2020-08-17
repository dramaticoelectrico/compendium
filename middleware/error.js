const Styles = require('../utils/globalStyles')

function errorHandler(err, req, res, next) {
  res.status(500)
  res.render('error', {
    path: '/error',
    title: 'Error sorry. Good luck buddy!',
    error: err,
    css: Styles.globalCSS,
  })
}
module.exports = errorHandler
