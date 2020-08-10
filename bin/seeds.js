require("../config/db.config");

const User = require("../models/user.model");
const Project = require("../models/project.model");
const Attachment = require("../models/attachment.model");
const faker = require("faker");

const attachmentIds = []

Promise.all([
  User.deleteMany(),
  Project.deleteMany(),
  Attachment.deleteMany()
])
  .then(() => {
      console.log('empty database')
      for (let i = 0; i < 100; i++) {
        const user = new User({
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          avatar: faker.image.avatar(),
          bio: faker.lorem.sentence(),
          company: faker.company.companyName(),
          location: faker.address.city(),
          website: faker.internet.domainName(),
          createdAt: faker.date.past()
        })
        
        user.save()
          .then(() => {
            for (let i = 0; i < 10; i++) {
              const project = new Project({
                name: faker.company.companyName(),
                description: faker.lorem.sentence(),
                url: faker.internet.domainName(),
                image: faker.image.image(),
                owner: user._id
              })
              project.save()
              .then(() => {
                for (let i = 0; i < 8; i++) {
                  const attachment = new Attachment({
                    name: faker.system.fileName(),
                    type: faker.system.fileType(),
                    src: faker.system.filePath(),
                    project: project._id,
                    owner: user._id
                  })    
                  if (i <= 3) {
                    attachment.type = 'gallery'
                    attachment.src = faker.image.image()
                  }
                  
                  attachmentIds.push(attachment.id)

                  if (attachmentIds.length === 8000) {
                    console.log('Seeds are in database, press Ctrl+c to close connection')
                  }
                  attachment.save()
                }
              })
            }
        })
      }
    }
  )