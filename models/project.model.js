const mongoose = require('mongoose');

require('./user.model')
require('./attachment.model')

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    url: {
      type: String,
      trim: true,
      lowercase: true
    },
    image: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

projectSchema.virtual("attachments", {
  ref: "Attachment",
  localField: "_id",
  foreignField: "project",
  justOne: false
});

projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });


const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
