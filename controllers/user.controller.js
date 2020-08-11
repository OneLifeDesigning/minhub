const mongoose = require("mongoose");
const User = require('../models/user.model')
const nodemailer = require('../config/mailer.config');

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

const userDemo = {
  email: 'aj_diaz_corres@hotmail.com',
  password: '12345678',
  name: 'aaa',
  lastname: 'test',
  username: '12udr',
  bio: '213131',
  company: 'ada',
  location: 'asd',
  website: 'sad',
  profilesSocial: {
    slack: 'asd',
    google: 'dsa',
    linkedin: 'sad'
  }
}

module.exports.register = (req, res, next) => {
  res.render('user/register', {
    title: 'Register', user: userDemo
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
      message: 'Check your email for activation acount'
    })
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("user/register", {title: 'Register', error: error.errors, user });
    } else if (error.code === 11000) { // error when duplicated user
      res.render("user/register", {
        title: 'Register',
        user,
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
              message: 'Your account has been activated, log in below!'
            })
        })
      .catch(next)
    } else {
      res.render('user/login', {
        error: {
          validation: {
            message: 'Invalid link'
          }
        }
      })
    }
  })
  .catch(next)
}

module.exports.login = (req, res) => {
  res.render('user/login', {
    title: 'Login', email: null
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

                res.redirect('/profile')
              } else {
                res.render('auth/login', {
                  error: {
                    validation: {
                      message: 'Your account is not active, check your email!'
                    }
                  }, email: user.email
                })
              }
            } else {
              res.render('auth/login', {
                error: {
                  email: {
                    message: 'This combination email with password does not match, try again'
                  }
                }, email: user.email
              })
            }
          })
      } else {
        res.render('auth/login', {
          error: {
            email: {
              message: "This combination email with password does not match, try again",
            },
          }, email: user.email
        });
      }
    })
    .catch(next)
}
