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