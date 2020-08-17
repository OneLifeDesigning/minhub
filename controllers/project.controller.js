const Project = require('../models/project.model')

module.exports.all = (req, res, next) => {
  Project.find()
  .sort({createdAt: -1})
  .limit(100)
  .then(
    projects => {
      res.render('project/all', {
        title: 'All projects',
        projects,
        currentUser: req.currentUser ? req.currentUser : false,
      })
    }
  )
  .catch(next)
}

module.exports.show = (req, res, next) => {
  Project.findOne({_id: req.params.id})
  .populate('attachments')
  .populate('owner')
  .then(
    project => {
      res.render('project/show', {
        title: project.name,
        project,
        currentUser: req.currentUser ? req.currentUser : false
      })
    }
  )
  .catch(next)
}