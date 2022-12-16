
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Add the bcrypt library
const bcrypt = require('bcrypt');

//The SALT_ROUNDSvariable determines how much processing time it will take to perform the hash. 
//Let's define it near the top of the module:
const SALT_ROUNDS = 6;  // 6 is a reasonable value

//create new Schema
const userSchema = new Schema({
    name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, {
    timestamps: true,
    // Even though it's hashed - don't serialize the password
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

//add a Mongoose pre-save hook (Mongoose middleware) that will hash the password anytime the password has changed:
userSchema.pre('save', async function(next) {
    // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
})

module.exports = mongoose.model('User', userSchema)