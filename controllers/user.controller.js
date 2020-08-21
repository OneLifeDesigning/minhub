const mongoose = require('mongoose')
const User = require('../models/user.model')
const nodemailer = require('../config/mailer.config')
const passport = require('passport')

const generateRandomToken = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
}

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
    title: 'Register',
    errors: false,
    user: {
      role: 'user',
      name: 'Coby',
      lastname: 'Blick',
      password: 12345678,
      email: 'aj_diaz_corres@hotmail.com',
      username: '1ld',
      bio: 'Rerum inventore aspernatur ratione.',
      company: 'Doyle LLC',
      location: 'Parkerburgh',
      website: 'ena.biz',
      socialProfiles: {
        slack: 'Bridie_Swift',
        github: 'Johathan_Reilly42',
        google: 'Odie_Schamberger36',
        linkedin: 'Novella.Hermann68',
        twitter: 'Arden_Nader',
        facebook: 'Jorge_To',
      }
      // socialProfiles: {}
    }
  })
}

module.exports.doRegister = (req, res, next) => {
  const userParams = req.body;
  const urserFiles = req.files
  urserFiles.forEach(file => {
    if (file.fieldname === 'avatar') {
      userParams.avatar = file.path ? file.path : '/img/default-user-avatar.png';
    } else {
      userParams.profileImage = file.path ? file.path : '/img/default-user-profile.png';
    }
  });
  const user = new User(userParams);
  user.save()
  .then(user => {
    nodemailer.sendValidationEmail(user.email, user.activation.token, user.name);
    res.render('user/login', {
      title: 'Login',
      success: 'Your acount are created, check your email for activate',
      user,
      errors: false
    })
  })
  .catch(errors => {
    if (errors instanceof mongoose.Error.ValidationError) {
      console.log(errors.errors.terms);
      res.render("user/register", {
        title: 'Register', 
        success: false,
        errors: errors.errors,
        user
      });
    } else if (errors.code === 11000) {
      res.render("user/register", {
        title: 'Register',
        user,
        success: false,
        errors: {
          general: {
            message: 'Oops there is a problem, try again later'
          }
        }
      });
    } else {
      next(errors);
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
            errors: false
          })
        })
      .catch(next)
    } else {
      res.render('user/login', {
        title: 'Login',
        user: false,
        errors: {
          validation: {
            message: 'Invalid link'
          }
        },
        success: false
      })
    }
  })
  .catch(next)
}

module.exports.login = (req, res) => {
  res.render('user/login', {
    title: 'Login', 
    user: false,
    success: false,
    errors: false
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
                res.redirect(`/users/show/${req.session.userId}`)
              } else {
                res.render('user/login', {
                  title: 'Login', 
                  errors: {
                    validation: {
                      message: 'Your account is not active, check your email!'
                    }
                  },
                  success: false,
                  user
                })
              }
            } else {
              res.render('user/login', {
                title: 'Login', 
                errors: {
                  email: {
                    message: 'This combination email with password does not match, try again'
                  },
                  password: {
                    message: 'You want to generate a new password'
                  }
                },
                user,
                success: false
              })
            }
          })
      } else {
        res.render('user/login', {
          title: 'Login', 
          errors: {
            email: {
              message: "This combination email with password does not match, try again",
            }
          },
          user,
          success: false
        });
      }
    })
    .catch(next)
}

module.exports.generateToken = (req, res, next) => {
  User.findOne({email: req.params.email})
    .then(user => {
        if (!user.activation.active) {
          user.activation.token = generateRandomToken()
          console.log(user.activation.token);
          user.save()
          .then(user => {
              nodemailer.sendValidationEmail(user.email, user.activation.token, user.name);
              res.render('user/login', {
                title: 'Login',
                success: 'Check again your email for activation acount',
                user,
                errors: false
              })
          })
        } else {
          res.render('user/login', {
            title: 'Login', 
            errors: {
              password: {
                message: 'Your account is active, reset your password!'
              }
            },
            success: false,
            user
          })
        }
    })
    .catch(next)
}

module.exports.sendChangePassword = (req, res, next) => {
  User.findOne({ "activation.token": req.params.token })
    .then(user => {
      if (user) {
        nodemailer.changePasswordEmail(user.email, user.activation.token, user.name);
        res.render('user/login', {
          title: 'Login',
          success: 'Check your email for change yor password',
          user,
          errors: false
        })
      } else {
        res.render('user/login', {
          title: 'Login', 
          errors: {
            validation: {
              message: "This token are invalid",
            },
          },
          user: false,
          success: false
        });
      }
    })
    .catch(next)
}
module.exports.changePassword = (req, res, next) => {
  User.findOne({ "activation.token": req.params.token })
    .then(user => {
      if (user) {
        res.render('user/recovery', {
          title: 'Change password',
          user,
          success: false,
          errors: false
        })
      } else {
        res.render('user/login', {
          title: 'Login', 
          errors: {
            password: {
              message: 'Invalid link, try again to reset your password!'
            }
          },
          user,
          success: false
        });
      }
    })
    .catch(next)
}
module.exports.doChangePassword = (req, res, next) => {
  console.log(req.session);
//   User.findOne({ "activation.token": req.params.token })
//     .then(user => {
//       if (user) {
//         res.render('user/recovery', {
//           title: 'Change password',
//           user,
//           success: false,
//           errors: false
//         })
//       } else {
//         res.render('user/login', {
//           title: 'Login', 
//           errors: {
//             password: {
//               message: 'Invalid link, try again to reset your password!'
//             }
//           },
//           user,
//           success: false
//         });
//       }
//     })
//     .catch(next)
}

module.exports.doSocialLogiSlack = (req, res, next) => {
  const passportdoSocialLogiSlack = passport.authenticate("slack", (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect(`/users/show/${user._id}`);
    }
  })
  
  passportdoSocialLogiSlack(req, res, next);
}

module.exports.doSocialLoginGoogle = (req, res, next) => {
  const passportDoSocialLoginGoogle = passport.authenticate('google', { scope:  ['profile', 'email'] }, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect(`/users/show/${user._id}`);
    }
  })
  
  passportDoSocialLoginGoogle(req, res, next)
}

module.exports.profile = (req, res, next) => {
  res.redirect(`/users/show/${req.currentUser._id}`);
}

module.exports.logout = (req, res, next) => {
  req.session.destroy()
  
  res.redirect('/login')
}

module.exports.show = (req, res, next) => {
  User.findOne({_id: req.params.id })
  .then(user => {
        res.render('user/show', {
          title: 'Show user',
          errors: false, 
          user
        });
      }
    )
    .catch(next)
}