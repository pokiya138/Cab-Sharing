const venderController = require("../model/venderModel");
const vender = venderController.vender;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Vender Register
exports.venderSingup = async (req, res) => {
  try {
    const data = new vender({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phno: req.body.phno,
      email: req.body.email,
      password: req.body.password,
      createAt: new Date().toLocaleString(),
      address: "",
      profile: null,
      otp: null,
      otp_expires: null,
      dob: null,
      LoginStatus: 0,
      lastLoggin: null,
      aadharNo: null,
      aadharimg: null,
      lienceno: null,
      
      lienceImg: null,
      lienceExpirydate: null,
      verification: null,
    });

    const findPhone = await vender.findOne({ phno: req.body.phno });
    if (findPhone) {
      return res.json({
        success: 0,
        message:
          "This number is already register.Please Enter the Unique Number.",
      });
    } else {
      const result = new vender(data).save();
      if (result) {
        return res.json({
          success: 1,
          message: "Vendor Register Successfully.",
        });
      } else {
        return res.json({
          success: 0,
          message: "Vendor not register yet.",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Vender Login
exports.login = async (req, res) => {
  const { phno, password } = req.body;

  if (!phno || !password) {
    return res.send({
      success: 0,
      message: "Please Enter the email and password.",
    });
  }
  const log = await vender.findOne({ phno });
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
          message: "Vendor Blocked by Admin.",
        });
      } else {
        const update = await vender.updateOne(
          { _id: log._id },
          {
            $set: { lastLoggin: new Date().toLocaleString() },
          }
        );
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

//Update Vender
exports.updateVender = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await vender.updateOne({ _id: id }, { $set: req.body });
    if (result) {
      return res.json({
        success: 1,
        message: "Vendor Details Update Successfully.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Vendor Details is not updated.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Update Vender Password
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
    const users = await vender.findOne({ _id: id });
    if (!users) {
      return res.json({
        success: 0,
        message: "Vendor not found.",
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
        await vender.updateOne(
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

//Delete Vender
exports.deleteVender = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await vender.deleteOne({ _id: id });
    if (result) {
      return res.json({
        success: 1,
        message: "Vendor Deleted Successfully.",
      });
    } else {
      return res.json({
        success: 0,
        messagev: "Vendor not deleted yet.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};

//Get All Venders
exports.getAllvenders = async (req, res) => {
  try {
    const result = await vender.find({});
    if (result) {
      return res.json({
        success: 1,
        message: "All Vendors",
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
      message: "Error in code",
    });
  }
};

//Get Vender By ID
exports.getVenderByID = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await vender.findOne({ _id: id });
    if (data) {
      return res.json({
        success: 1,
        message: "Vendor Data.",
        data,
      });
    } else {
      return res.json({
        success: 0,
        message: "Vendor not found.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Update Vender Profile
exports.updateProfile = async (req, res) => {
  const id = req.params.id;
  const profile = `http://sparkstoideas.daddy11.in/venderProfile/${req.file.filename}`;
  try {
    const result = await vender.updateOne({ _id: id }, { $set: { profile } });
    if (result) {
      return res.json({
        success: 1,
        message: "Profile updated successfully",
        profile: `http://sparkstoideas.daddy11.in/venderProfile/${req.file.filename}`,
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};

//Vender Blocked by admin
exports.venderBlock = async (req, res) => {
  const id = req.params.id;
  try {
    const venders = await vender.findById({ _id: id });
    if (venders) {
      if (venders.LoginStatus == 0) {
        const ab = await vender.updateOne(
          { _id: id },
          { $set: { LoginStatus: 1 } }
        );
        return res.json({
          message: "Vender Blocked.",
        });
      } else {
        const ab = await vender.updateOne(
          { _id: id },
          { $set: { LoginStatus: 0 } }
        );
        return res.json({
          message: "Vendor Unblocked.",
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

//Upload Venders Documents
exports.uploadDocument = async (req, res) => {
  const id = req.params.id;

  const { dob, aadharNo, lienceno, lienceExpirydate } = req.body;
  const aadharimg = `http://sparkstoideas.daddy11.in/aadharimg/${req.files.aadharimg[0].filename}`;
  const lienceImg = `http://sparkstoideas.daddy11.in/lienceImg/${req.files.lienceImg[0].filename}`;

  try {
    const result = await vender.findOne({ _id: id });
    if (result) {
      const upload = await vender.updateOne(
        { _id: id },
        {
          $set: {
            dob,
            aadharNo,
            lienceno,
            lienceExpirydate,
            aadharimg,
            lienceImg,
          },
        }
      );
      if (upload) {
        const verfied = await vender.updateOne(
          { _id: id },
          { $set: { verification: "Pending" } }
        );
        if (verfied) {
          return res.json({
            success: 1,
            message: "Upload Document Successfully",
          });
        }
      } else {
        console.log("error");
      }
    } else {
      console.log("data not found");
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
      error,
    });
  }
};

//Document Verification
exports.approved = async (req, res) => {
  const id = req.params.id;
  const code = req.body.code;
  try {
    const result = await vender.findById({ _id: id });
    if (result) {
      if (code == 0) {
        const appro = await vender.updateOne(
          { _id: id },
          { $set: { verification: "Rejected" } }
        );
        return res.json({
          success: 1,
          message: "Document Not Verified.",
        });
      }
      if (code == 1) {
        const appss = await vender.updateOne(
          { _id: id },
          { $set: { verification: "Verified" } }
        );
        return res.json({
          success: 1,
          message: "Document Verified.",
        });
      }
    } else {
      return res.json({
        success: 0,
        message: "Data Not Found",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};
