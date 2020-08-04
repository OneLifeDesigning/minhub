const mongoose = require("mongoose");

require('./user.model')

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
