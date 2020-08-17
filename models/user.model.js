const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const generateRandomToken = () => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = '';
  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name needs at last 3 chars"],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
    minlength: [3, "Lastname needs at last 3 chars"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, "Email is invalid"]
  },
  password: {
    type: String,
    minlength: [8, "Password min length is 8"]
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  avatar: {
    type: String
  },
  profileImage: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 100
  },
  company: {
    type: String,
    maxlength: 100
  },
  location: {
    type: String,
    maxlength: 100
  },
  website: {
    type: String,
    trim: true,
    maxlength: 100
  },
  activation: {
    active: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: generateRandomToken
    }
  },
  loginSocial: {
    slack: String,
    google: String
  },
  profilesSocial: {
    slack: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    },
    google: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    }
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin', 'normal'],
    default: 'normal'
  }
},
{ timestamps: true, toJSON: { virtuals: true } });

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash
        next()
      })
      .catch(next)
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
