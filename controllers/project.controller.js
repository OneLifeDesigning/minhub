const Project = require('../models/project.model')

module.exports.all = (req, res, next) => {
  Project.find()
  .sort({createdAt: -1})
  .limit(100)
  .populate('owner')
  .then(
    projects => {
      console.log(projects)
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
  .then(
    project => {
      res.json(project)
      // console.log(projects)
      // res.render('project/all', {
      //   title: 'All projects',
      //   projects
      // })
    }
  )
  .catch(next)
}