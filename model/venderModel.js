const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const venderSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phno: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  createAt: {
    type: String,
  },
  address: {
    type: String,
  },
  otp: {
    type: String,
  },
  otp_expires: {
    type: String
  },
  profile: {
    type: String,
  },
  dob: {
    type: String,
  },
  LoginStatus: {
    type: String,
  },
  lastLoggin: {
    type: String,
  },

  aadharNo: {
    type: String,
  },
  aadharimg: {
    type: String,
  },
  lienceno: {
    type: String,
  },
  lienceImg: {
    type: String,
  },
  lienceExpirydate: {
    type: String,
  },
  verification: {
    type: String,
  },
});

venderSchema.pre("save", async function (next) {
  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

exports.vender = mongoose.model("vender", venderSchema);
