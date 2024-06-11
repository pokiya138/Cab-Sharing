const contactModel = require("../model/contactModel");
const contact = contactModel.contact;
const mongoose = require("mongoose");

//Send Contact Details
exports.sendContact = async (req, res) => {
  const data = new contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phno: req.body.phno,
    message: req.body.message,
  });
  try {
    const result = await contact(data).save();
    if (result) {
      return res.json({
        success: 1,
        message: "Admin Contact Soon..",
      });
    } else {
      return res.json({
        success: 0,
        message: "Please Wait for some time.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Get Contact Data
exports.getContact = async (req, res) => {
  try {
    const result = await contact.find();
    if (result) {
      return res.json({
        success: 1,
        message: "Get All Contact",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Data not Found.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};
