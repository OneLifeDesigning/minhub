const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const projectController = require('../controllers/project.controller')
const uploads = require('../config/multer.config')
const sessionMiddleware = require('../middlewares/session.middleware')

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Home', 
    currentUser: req.currentUser
  })
})

router.get('/login', sessionMiddleware.isNotAuthenticated, userController.login)
router.post('/dologin', sessionMiddleware.isNotAuthenticated, userController.doLogin)

router.get('/login/slack', sessionMiddleware.isNotAuthenticated, userController.doSocialLogiSlack)
router.get('/login/google', sessionMiddleware.isNotAuthenticated, userController.doSocialLoginGoogle)

router.get('/register', sessionMiddleware.isNotAuthenticated, userController.register)
router.post('/doregister', sessionMiddleware.isNotAuthenticated, uploads.any(), userController.doRegister)
router.get('/validate/:token', sessionMiddleware.isNotAuthenticated, userController.activateUser)

router.get('/resendtoken/:email', sessionMiddleware.isNotAuthenticated, userController.sendGenerateToken)

router.get('/sendchangepassword/:token', sessionMiddleware.isNotAuthenticated, userController.sendChangePassword)
router.get('/changepassword/:token', sessionMiddleware.isNotAuthenticated, userController.changePassword)
router.post('/dochangepassword/:token', sessionMiddleware.isNotAuthenticated, userController.doChangePassword)

router.get('/profile', sessionMiddleware.isAuthenticated, userController.profile)

router.post('/logout', sessionMiddleware.isAuthenticated, userController.logout)

router.get('/projects/all', projectController.all)
router.get('/projects/show/:id', projectController.show)

router.get('/users/all', userController.all)
router.get('/users/show/:id', userController.show)

router.get('/projects/create/', sessionMiddleware.isAuthenticated, projectController.create)

// TODO:
// router.get('/profile/edit', sessionMiddleware.isAuthenticated, userController.editProfile)
// router.get('/projects/edit/:id', projectController.edit)
// router.post('/projects/save/:id', projectController.save)
// router.get('/projects/delete/:id', projectController.delete)

module.exports = router;