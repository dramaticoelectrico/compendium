const Gallery = require('../models/gallery')
const Tags = require('../models/tag')
const Utils = require('../utils/templateUtils')
const Styles = require('../utils/globalStyles')
exports.getHomePage = async (req, res, next) => {
  try {
    const gallery = await Gallery.find().sort({ _id: -1 })
    const tags = await Tags.find()
    const user =
      req.headers.cookie && decodeURI(req.headers.cookie.split('name=')[1])
    res.render('home', {
      title: 'Compendium Pendulum',
      css: Styles.globalCSS,
      templateFn: Utils.getImages,
      gallery,
      user,
      tags,
    })
  } catch (error) {
    next(error)
  }
}
