const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const attachmentController = require('../controllers/attachment.controller')

router.get('/', publicController.home)
router.get('/users', userController.all)

router.get('/login', userController.login)
router.post('/dologin', userController.doLogin)

// router.get('/register', userController.register)
// router.post('/doregister', userController.doRegister)

router.get('/projects', projectController.all)
router.get('/projects/show/:id', projectController.show)

// TODO:
// router.get('/projects/new/', projectController.new)
// router.get('/projects/edit/:id', projectController.edit)
// router.post('/projects/save/:id', projectController.save)
// router.get('/projects/delete/:id', projectController.delete)

// ONLY TEST
// router.get('/attachments', attachmentController.all)

module.exports = router;