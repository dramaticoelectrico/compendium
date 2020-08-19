const express = require('express')
const router = express.Router()

const auth = require('../utils/jwtValidate')

const adminController = require('../controllers/admin')

const multer = require('multer')
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname)
  },
})
var upload = multer({ storage: storage })

router.get('/admin', auth, adminController.getAdminPage)
router.get('/admin/create', auth, adminController.getAddItem)
router.get('/admin/tag', auth, adminController.getAddTag)
router.get('/admin/edit/:id', auth, adminController.getEditPage)
router.get('/admin/delete/:id', auth, adminController.getDeleteItem)
router.get('/logout', (req, res) => {
  res
    .cookie('jwtauth', '', { expires: new Date(0) })
    .cookie('name', '', { expires: new Date(0) })
    .redirect('/')
})
// add image
router.post(
  '/admin/create',
  upload.single('image'),
  adminController.postFormData
)
// add Tag
router.post('/admin/tag', adminController.postFormAddTag)
// update data
router.post('/admin/edit', upload.single('image'), adminController.postFormEdit)
// delete data
router.post('/admin/delete', adminController.postFormDelete)
module.exports = router
