const globalCSS = require('../utils/styles')
const ejsUtils = require('../utils/ejsUtils')
const User = require('../models/user')
const Gallery = require('../models/gallery')
const Tag = require('../models/tag')

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
const Config = {
  imageSettings: {
    responsive_breakpoints: [
      {
        create_derived: false,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1200,
        max_images: 4,
      },
    ],
    public_id: new Date().toISOString(),
  },
}
function callbackCloudinary(error, result) {
  if (error) {
    return res.status(404).send(JSON.stringify(error))
  } else {
    return result
  }
}
function formatImageData(data) {
  const { secure_url, width, height, responsive_breakpoints } = data
  const formatBreakpoints = (arr) => {
    const newarr = []
    for (let item of arr) {
      newarr.push({
        width: item.width,
        height: item.height,
        secure_url: item.secure_url,
      })
    }
    return newarr
  }
  return {
    secure_url,
    width,
    height,
    breakpoints: formatBreakpoints(responsive_breakpoints[0]['breakpoints']),
  }
}
// list gallery items
exports.getAdminPage = async (req, res, next) => {
  const dbUser = User.findById(req.user._id)
  const dbTag = Tag.find()
  const dbGallery = Gallery.find()

  const getUser = await dbUser
  const tags = await dbTag
  const gallery = await dbGallery
  const user = getUser.name

  res.render('admin', {
    title: 'Admin: Items',
    page: 'home',
    css: globalCSS,
    templateFn: ejsUtils.getImages,
    user,
    gallery,
    tags,
  })
}
// add new entry
exports.getAddItem = async (req, res, next) => {
  const getUser = await User.findById(req.user._id)
  const tags = await Tag.find()
  const user = getUser.name
  res.render('admin', {
    title: 'Admin: Add Item ',
    page: 'create',
    css: globalCSS,
    user,
    tags,
  })
}
exports.getAddTag = async (req, res, next) => {
  const getUser = await User.findById(req.user._id)
  const user = getUser.name
  const tag = await Tag.find()
  res.render('admin', {
    title: 'Admin: add new Category Tag',
    page: 'tag',
    css: globalCSS,
    user,
    tag,
  })
}
// edit/update items
exports.getEditPage = async (req, res, next) => {
  const itemid = req.params.id
  const gallery = await Gallery.findById(itemid)
  const tags = await Tag.find()
  const getUser = await User.findById(req.user._id)
  const user = getUser.name
  res.render('admin', {
    title: 'Admin: Edit Item ' + gallery.title,
    page: 'edit',
    css: globalCSS,
    gallery,
    user,
    tags,
  })
}
// delete page
exports.getDeleteItem = async (req, res, next) => {
  const itemid = req.params.id
  const gallery = await Gallery.findById(itemid)
  const getUser = await User.findById(req.user._id)
  const user = getUser.name
  res.render('admin', {
    title: 'Admin: Delete Item ' + gallery.title,
    page: 'delete',
    css: globalCSS,
    gallery,
    user,
  })
}
// POST METHODS
// post new entry
exports.postFormData = async (req, res, next) => {
  const { title, description, tag, publish } = req.body
  try {
    const imageResponse = await cloudinary.uploader.upload(
      req.file.path,
      Config.imageSettings,
      callbackCloudinary
    )
    const image = formatImageData(imageResponse)
    const newEntry = {
      title,
      description,
      image,
      tag,
      publish,
    }
    const gallery = new Gallery(newEntry)
    await gallery.save()
    res.status(200).redirect('/admin')
  } catch (error) {
    next(error)
  }
}
exports.postFormEdit = async (req, res, next) => {
  let updatedImage
  const { galleryId, title, description, tag, publish } = req.body
  if (req.file) {
    // call cloudinary
    try {
      const imageResponse = await cloudinary.uploader.upload(
        req.file.path,
        Config.imageSettings,
        callbackCloudinary
      )
      updatedImage = formatImageData(imageResponse)
    } catch (error) {
      next(error)
    }
  }
  try {
    const gallery = await Gallery.findById(galleryId)
    gallery.title = title
    gallery.description = description
    gallery.publish = publish
    gallery.tag = tag
    if (updatedImage) {
      gallery.image = updatedImage
    }
    await gallery.save()
    res.status(200).redirect('/admin')
  } catch (error) {
    next(error)
  }
}
exports.postFormDelete = async (req, res, next) => {
  const id = req.body.galleryId
  try {
    await Gallery.deleteOne({ _id: id })
    res.status(200).redirect('/admin')
  } catch (error) {
    next(error)
  }
}
exports.postFormAddTag = async (req, res, next) => {
  const { tagCategory } = req.body
  try {
    const tag = new Tag({ tag: tagCategory })
    await tag.save()
    res.status(200).redirect('/admin/tag')
  } catch (error) {
    next(error)
  }
}
