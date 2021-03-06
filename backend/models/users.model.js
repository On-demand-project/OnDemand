const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  UserName: { type: String },
  type : { type:String},
  notification : { type: Array },
  schedules : { type: Array },
});

module.exports = User = mongoose.model("user", userSchema);