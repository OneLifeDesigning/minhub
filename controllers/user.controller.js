const User = require('../models/user.model')

module.exports.all = (req, res) => {
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
