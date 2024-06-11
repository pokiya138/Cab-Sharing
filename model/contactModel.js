const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phno: {
    type: String,
  },
  message: {
    type: String,
  },
});

exports.contact = mongoose.model("contact", contactSchema);
