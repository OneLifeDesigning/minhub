const mongoose = require('mongoose')
const User = require('../models/user.model')
const nodemailer = require('../config/mailer.config')
const passport = require('passport')

module.exports.all = (req, res, next) => {
  User.find()
  .sort({createdAt: -1})
  .limit(100)
  .then(
    users => {
      res.render('user/all', {
        title: 'All users',
        users
      })
    }
  )
}

module.exports.register = (req, res, next) => {
  res.render('user/register', {
    title: 'Register', user: {profilesSocial: {}}, error: {}, success: {}
  })
}

module.exports.doRegister = (req, res, next) => {
  const userParams = req.body;
  userParams.avatar = req.file ? req.file.path : undefined;
  const user = new User(userParams);
  
  user.save()
  .then(user => {
    nodemailer.sendValidationEmail(user.email, user.activation.token, user.name);
    res.render('user/login', {
      title: 'Login',
      success: 'Check your email for activation acount',
      user,
      error: {}
    })
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("user/register", {
        title: 'Register', 
        success: {},
        error: error.errors, 
        user
      });
    } else if (error.code === 11000) { // error when duplicated user
      res.render("user/register", {
        title: 'Register',
        user,
        success: {},
        error: {
          email: {
            message: 'Oops there is a problem, try again later'
          }
        }
      });
    } else {
      next(error);
    }
  })
  .catch(next)
}

module.exports.activateUser = (req, res, next) => {
  User.findOne({ "activation.token": req.params.token })
  .then(user => {
    if (user) {
      user.activation.active = true;
      user.save()
        .then(user => {
          res.render('user/login', {
            title: 'Login',
            user: user,
            success: 'Your account has been activated, log in below!',
            error: {}
          })
        })
      .catch(next)
    } else {
      res.render('user/login', {
        title: 'Login',
        user: {},
        error: {
          validation: {
            message: 'Invalid link'
          }
        },
        success: {}
      })
    }
  })
  .catch(next)
}

module.exports.login = (req, res) => {
  res.render('user/login', {
    title: 'Login', user: {}, success: null
  })
}

module.exports.doLogin = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        user.checkPassword(req.body.password)
          .then(match => {
            if (match) {
              if (user.activation.active) {
                req.session.userId = user._id
                res.redirect(`/show/${req.session.userId}`)
              } else {
                res.render('user/login', {
                  error: {
                    validation: {
                      message: 'Your account is not active, check your email!'
                    }
                  }, user
                })
              }
            } else {
              res.render('auth/login', {
                error: {
                  email: {
                    message: 'This combination email with password does not match, try again'
                  }
                }, user
              })
            }
          })
      } else {
        res.render('auth/login', {
          error: {
            email: {
              message: "This combination email with password does not match, try again",
            },
          }, user
        });
      }
    })
    .catch(next)
}


module.exports.doSocialLogiSlack = (req, res, next) => {
  const passportdoSocialLogiSlack = passport.authenticate("slack", (error, user) => {
    if (error) {
      next(error);
    } else {
      req.session.userId = user._id;
      res.redirect(`/users/show/${user._id}`);
    }
  })
  
  passportdoSocialLogiSlack(req, res, next);
}

module.exports.doSocialLoginGoogle = (req, res, next) => {
  const passportDoSocialLoginGoogle =  passport.authenticate('google', { scope:  ['profile', 'email'] }, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.session.userId = user._id;
      res.redirect(`/users/show/${user._id}`);
    }
  })
  
  passportDoSocialLoginGoogle(req, res, next)
}

module.exports.show = (req, res, next) => {
  User.findOne({id: req.params.id })
    .then(user => {
        res.render('user/show', {
          error: {}, user
        });
      }
    )
    .catch(next)
}