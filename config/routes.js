const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')

router.get('/', publicController.home)
router.get('/users', userController.all)
router.get('/projects', projectController.all)

module.exports = router;