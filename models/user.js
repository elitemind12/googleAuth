const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"]
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String
});

const user = mongoose.model('user', userSchema);

module.exports = user;