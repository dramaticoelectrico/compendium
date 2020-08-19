const Gallery = require('../models/gallery')
const Utils = require('../utils/templateUtils')
const Styles = require('../utils/globalStyles')
exports.getHomePage = async (req, res, next) => {
  try {
    const gallery = await Gallery.find()
    const user =
      req.headers.cookie && decodeURI(req.headers.cookie.split('name=')[1])
    res.render('gallery', {
      title: 'Compendium Pendulum: Gallery',
      css: Styles.globalCSS,
      templateFn: Utils.getImages,
      gallery,
      user,
    })
  } catch (error) {
    next(error)
  }
}
