const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    type: {
      type: String
    },
    src: {
      type: String,
      trim: true,
      lowercase: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
