const adminController = require("../model/admin");
const admin = adminController.admin;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { vender } = require("../model/venderModel");

//Admin Signup
exports.signup = async (req, res) => {
  try {
    const data = new admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      lastLoggin: null,
    });
    const existingAdmin = await admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.send({
        success: 0,
        message:
          "Already Register for this Email please enter the new email for the register.",
      });
    }
    const admins = await new admin(data).save();
    return res.send({
      success: 1,
      message: "Admin Register Successfully.",
      admins,
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in register.",
    });
  }
};

//Admin Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      success: 0,
      message: "Please Enter the Email and Password.",
    });
  }
  const log = await admin.findOne({ email });
  if (log) {
    const isMatch = await bcrypt.compare(password, log.password);
    const token = jwt.sign({ result: log.id }, "Astha123", {
      expiresIn: "1h",
    });
    if (!isMatch) {
      return res.json({ success: 0, message: "Invalid credential" });
    } else {
      const update = await admin.updateOne(
        { _id: log._id },
        {
          $set: { lastLoggin: new Date().toLocaleString() },
        }
      );
      //   res.cookie("jwtoken", token, {
      //     expiresIn: "1h",
      //     httpOnly: true,
      //   });
      res.json({
        success: 1,
        message: "Login Successfully.",
        Id: log._id,
        time: log.lastLoggin,
      });
    }
  } else {
    return res.json({ success: 0, message: "Invalid credential" });
  }
};

//Change Password
exports.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const id = req.params.id;
  try {
    if (!password || !newPassword) {
      return res.json({
        success: 0,
        message: "Please provide current password and new passwords.",
      });
    }
    const admins = await admin.findOne({ _id: id });
    if (!admins) {
      return res.json({
        success: 0,
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, admins.password);
    if (!isMatch) {
      return res.json({
        success: 0,
        message: "Current password is incorrect.",
      });
    } else {
      if (req.body.password === req.body.newPassword) {
        return res.json({
          success: 0,
          message: "Please Enter New Password You have not used Before.  ",
        });
      } else {
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await admin.updateOne(
          { _id: id },
          { $set: { password: hashedNewPassword } }
        );
        return res.json({
          success: 1,
          message: "Password updated successfully.",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "An error occurred while updating the password.",
    });
  }
};

//Update Profile
exports.changeProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await admin.updateOne({ _id: id }, { $set: req.body });
    if (result) {
      return res.json({
        success: 1,
        message: "Admin Data Updated Successfully.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Data was not updated yet.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Admin Get By ID
exports.getAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await admin.findOne({ _id: id });
    if (result) {
      return res.json({
        success: 1,
        message: "Admin By ID.",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Data not found.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};
