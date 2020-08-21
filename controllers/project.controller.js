const Project = require('../models/project.model')

module.exports.all = (req, res, next) => {
  Project.find()
  .sort({createdAt: -1})
  .limit(100)
  .then(
    projects => {
      res.render('projects/all', {
        title: 'All projects',
        projects,
  
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
      res.render('projects/show', {
        title: project.name,
        project
      })
    }
  )
  .catch(next)
}
module.exports.create = (req, res, next) => {
  res.render('projects/create', {
    title: 'Create new project',
    errors: false,
    project: false
  })
}
module.exports.doCreate = (req, res, next) => {
  res.render('projects/create', {
    title: 'Create new project',
    errors: false,
    project: false
  })
}