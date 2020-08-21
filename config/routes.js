const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const uploads = require('../config/multer.config')
const sessionMiddleware = require('../middlewares/session.middleware')

router.get('/', sessionMiddleware.getCurrentUser, (req, res) => {
  res.render('index', {
    title: 'Home', 
    currentUser: req.currentUser
  })
})

router.get('/login', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.login)
router.post('/dologin', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.doLogin)

router.get('/login/slack', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.doSocialLogiSlack)
router.get('/login/google', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.doSocialLoginGoogle)

router.get('/register', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.register)
router.post('/doregister', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, uploads.any(), userController.doRegister)
router.get('/validate/:token', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.activateUser)
router.get('/resendtoken/:email', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.generateToken)

router.get('/sendchangepassword/:token', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.sendChangePassword)

router.get('/changepassword/:token', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.changePassword)
router.post('/dochangepassword', sessionMiddleware.getCurrentUser, sessionMiddleware.isNotAuthenticated, userController.doChangePassword)

router.get('/profile', sessionMiddleware.getCurrentUser, sessionMiddleware.isAuthenticated, userController.profile)

router.post('/logout', sessionMiddleware.getCurrentUser, sessionMiddleware.isAuthenticated, userController.logout)

router.get('/projects/all', sessionMiddleware.getCurrentUser, projectController.all)
router.get('/projects/show/:id', sessionMiddleware.getCurrentUser, projectController.show)

router.get('/users/all', sessionMiddleware.getCurrentUser, userController.all)
router.get('/users/show/:id', sessionMiddleware.getCurrentUser, userController.show)

// TODO:
// router.get('/profile/edit', sessionMiddleware.getCurrentUser, sessionMiddleware.isAuthenticated, userController.editProfile)
// router.get('/projects/new/', projectController.new)
// router.get('/projects/edit/:id', projectController.edit)
// router.post('/projects/save/:id', projectController.save)
// router.get('/projects/delete/:id', projectController.delete)

module.exports = router;