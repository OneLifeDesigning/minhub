const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const attachmentController = require('../controllers/attachment.controller')

router.get('/', publicController.home)
router.get('/users', userController.all)
router.get('/projects', projectController.all)
router.get('/projects/show/:id', projectController.show)
router.get('/attachments', attachmentController.all)

module.exports = router;