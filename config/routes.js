const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const attachmentController = require('../controllers/attachment.controller')
const uploads = require('../config/multer.config')

router.get('/', publicController.home)

router.get('/login', userController.login)
router.post('/dologin', userController.doLogin)

router.get('/register', userController.register)
router.post('/doregister', uploads.single('avatar'), userController.doRegister)
router.get('/validate/:token', userController.activateUser)

router.get('/projects/all', projectController.all)
router.get('/projects/show/:id', projectController.show)

router.get('/users/all', userController.all)

// TODO:
// router.get('/projects/new/', projectController.new)
// router.get('/projects/edit/:id', projectController.edit)
// router.post('/projects/save/:id', projectController.save)
// router.get('/projects/delete/:id', projectController.delete)

// ONLY TEST
// router.get('/attachments', attachmentController.all)

module.exports = router;