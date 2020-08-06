const mongoose = require("mongoose");

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
  { timestamps: true, toJSON: { virtuals: true } }
);

projectSchema.virtual("attachments", {
  ref: "Attachment",
  localField: "_id",
  foreignField: "attachment",
  justOne: false
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
