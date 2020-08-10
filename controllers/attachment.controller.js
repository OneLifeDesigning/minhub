const Attachment = require('../models/attachment.model')

module.exports.all = (req, res, next) => {
  Attachment.find()
  .sort({createdAt: -1})
  .limit(8)
  .then(
    attachments => {
      res.json(attachments)
      // res.render('attachments/all', {
      //   title: 'All attachments',
      //   attachments
      // })
    }
  )
  .catch(next)
}