const userModel = require("../model/userModel");
const user = userModel.user;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User Register
exports.register = async (req, res) => {
  try {
    const data = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phno: req.body.phno,
      password: req.body.password,
      createAt: new Date().toLocaleString(),
      LoginStatus: 0,
      lastLoggedin: null,
      profile: null,
      otp: null,
      otp_expires: null,
      address: "",
    });
    const existingUser = await user.findOne({ phno: req.body.phno });
    if (existingUser) {
      return res.send({
        success: 0,
        message:
          "Already Register for this Mobile Number please enter the new mobile number for the register.",
      });
    }
    const users = await new user(data).save();
    return res.send({
      success: 1,
      message: "User Register Successfully.",
      users,
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in register.",
    });
  }
};

//User Login
exports.login = async (req, res) => {
  const { phno, password } = req.body;

  if (!phno || !password) {
    return res.send({
      success: 0,
      message: "Please Enter the PhoneNumber and Password.",
    });
  }
  const log = await user.findOne({ phno });
  if (log) {
    const isMatch = await bcrypt.compare(password, log.password);
    const token = jwt.sign({ result: log.id }, "Astha123", {
      expiresIn: "1h",
    });
    if (!isMatch) {
      return res.json({ success: 0, message: "Invalid credential" });
    } else {
      if (log.LoginStatus == 1) {
        return res.json({
          success: 0,
          message: "Something went to wrong.",
        });
      } else {
        const update = await user.updateOne(
          { _id: log._id },
          {
            $set: { lastLoggedin: new Date().toLocaleString() },
          }
        );
        // res.cookie("jwtoken", token, {
        //   expiresIn: "1h",
        //   httpOnly: true,
        // });
        res.json({
          success: 1,
          message: "Login Successfully.",
          token,
          Id: log._id,
        });
      }
    }
  } else {
    return res.json({ success: 0, message: "Invalid credential" });
  }
};

//User Update
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.updateOne({ _id: id }, { $set: req.body });
    if (result) {
      return res.json({
        success: 1,
        message: "Data update succeessfully.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Data was not updated.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in update code.",
    });
  }
};

//User Password Update
exports.updatepassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const id = req.params.id;
  try {
    if (!password || !newPassword) {
      return res.json({
        success: 0,
        message: "Please provide current password and new passwords.",
      });
    }
    const users = await user.findOne({ _id: id });
    if (!users) {
      return res.json({
        success: 0,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, users.password);
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
        await user.updateOne(
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

//Delete User
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.deleteOne({ _id: id });
    if (result) {
      return res.json({ success: 1, message: "Delete user successfully." });
    } else {
      return res.json({ success: 0, message: "Delete not successfully." });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in delete user code.",
    });
  }
};

//Get All Users
exports.getAlldata = async (req, res) => {
  try {
    const result = await user.find({});
    if (result) {
      return res.json({
        success: 1,
        message: "Data of users",
        data: result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Not Found users.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};

//Get Data By ID
exports.getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.findById({ _id: id });
    if (result) {
      return res.json({
        success: 1,
        message: "User Details",
        data: result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Not Found User Details.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};

//Update Profile Image
exports.updateProfile = async (req, res) => {
  const id = req.params.id;
  const profile = `http://sparkstoideas.daddy11.in/profile/${req.file.filename}`;
  try {
    const result = await user.updateOne({ _id: id }, { $set: { profile } });
    if (result) {
      return res.json({
        success: 1,
        message: "Update Profile Successfully",
        profile: `http://sparkstoideas.daddy11.in/profile/${req.file.filename}`,
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in Profile Update.",
    });
  }
};

//User Blocked by admin
exports.userBlock = async (req, res) => {
  const id = req.params.id;
  try {
    const users = await user.findById({ _id: id });
    if (users) {
      if (users.LoginStatus == 0) {
        const ab = await user.updateOne(
          { _id: id },
          { $set: { LoginStatus: 1 } }
        );
        return res.json({
          message: "User Blocked.",
        });
      } else {
        const ab = await user.updateOne(
          { _id: id },
          { $set: { LoginStatus: 0 } }
        );
        return res.json({
          message: "User Unblocked.",
        });
      }
    }
  } catch (err) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};
