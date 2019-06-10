const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema of User to be saved into DB when created
const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
