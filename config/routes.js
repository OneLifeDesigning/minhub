const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public.controller')
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const uploads = require('../config/multer.config')
const sessionMiddleware = require('../middlewares/session.middleware')

router.get('/', publicController.home)

router.get('/login', sessionMiddleware.isNotAuthenticated, userController.login)
router.post('/dologin', sessionMiddleware.isNotAuthenticated, userController.doLogin)

router.get('/login/slack', sessionMiddleware.isNotAuthenticated, userController.doSocialLogiSlack)
router.get('/login/google', sessionMiddleware.isNotAuthenticated, userController.doSocialLoginGoogle)

router.get('/register', sessionMiddleware.isNotAuthenticated, userController.register)
router.post('/doregister', sessionMiddleware.isNotAuthenticated, uploads.single('avatar'), userController.doRegister)
router.get('/validate/:token', sessionMiddleware.isNotAuthenticated, userController.activateUser)

router.get('/projects/all', projectController.all)
router.get('/projects/show/:id', projectController.show)

router.get('/users/all', userController.all)
router.get('/users/show/:id', sessionMiddleware.isAuthenticated, userController.show)

// TODO:
// router.get('/projects/new/', projectController.new)
// router.get('/projects/edit/:id', projectController.edit)
// router.post('/projects/save/:id', projectController.save)
// router.get('/projects/delete/:id', projectController.delete)

module.exports = router;