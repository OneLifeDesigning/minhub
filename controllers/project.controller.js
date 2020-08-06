const Project = require('../models/project.model')

module.exports.all = (req, res) => {
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
}