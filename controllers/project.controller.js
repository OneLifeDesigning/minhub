const Project = require('../models/project.model')

module.exports.all = (req, res, next) => {
  Project.find()
  .sort({createdAt: -1})
  .limit(100)
  .then(
    projects => {
      res.render('project/all', {
        title: 'All projects',
        projects
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
        helpers: res.locals.helpers
      })
    }
  )
  .catch(next)
}