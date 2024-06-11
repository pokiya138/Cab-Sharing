const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  lastLoggin: {
    type: String,
  },
});

adminSchema.pre("save", async function (next) {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

exports.admin = mongoose.model("admin", adminSchema);
