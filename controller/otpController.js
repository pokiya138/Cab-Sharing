const userModel = require("../model/userModel");
const User = userModel.user;
const rideModel = require("../model/ride");
const Ride = rideModel.ride;
const venderController = require("../model/venderModel");
const { sendEmail } = require("../utils/sendMail");
const Vender = venderController.vender;
const bcrypt = require("bcryptjs");
const { sendOtp } = require("../utils/sendOtp");

// send otp
exports.otp = async (req, res) => {
  try {
    const { phone, type } = req.body;
    console.log(req.body, "body");
    const otp = Math.floor(Math.random() * 1000000 + 1);
    const msg = `Your Annie Cab OTP Is ${otp}`;
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const otp_expires = date.toLocaleString();
    if (type == "auth_user") {
      const user = await User.findOne({ phno: phone });
      if (user) {
        await sendOtp(phone, msg);
        await User.updateOne(
          { _id: user._id },
          {
            $set: { otp, otp_expires },
          }
        );
        return res.json({
          success: true,
          message: `OTP Send On Number ${phone}`,
        });
      } else {
        return res.json({
          success: false,
          message: "Mobile Number is not registered.",
        });
      }
    }
    if (type == "auth_vendor") {
      const vendor = await Vender.findOne({ phno: phone });
      if (vendor) {
        await sendOtp(phone, msg);
        await Vender.updateOne(
          { _id: vendor._id },
          {
            $set: { otp, otp_expires },
          }
        );
        return res.json({
          success: true,
          message: `OTP Send On Number ${phone}`,
        });
      } else {
        return res.json({
          success: false,
          message: "Mobile Number is not registered.",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// send otp for ride delete
exports.otpride = async (req, res) => {
  const { id } = req.body;
  try {
    const otp = Math.floor(Math.random() * 1000000 + 1);
    let date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const otp_expires = date.toLocaleString();
    const result = await Ride.findById(id).populate("vendorId");
    console.log(result);
    if (result) {
      const msg = `Please Provide This ${otp} to The admin for successfully delete your ride`;
      const phone = result.vendorId.phno;
      await sendOtp(phone, msg);
      await Ride.updateOne(
        { _id: result._id },
        {
          $set: { otp, otp_expires },
        }
      );
      return res.json({
        success: true,
        message: `OTP Send On ${phone}`,
      });
    } else {
      return res.json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// verify otp
exports.verify = async (req, res) => {
  try {
    const { Phone, Otp, Type } = req.body;
    if (Type == "auth_user") {
      const { _id, firstName, lastName, email, otp, otp_expires } =
        await User.findOne({ phno: Phone });
      const time = new Date().toLocaleString();
      // console.log(time ,vendor.otp_expires)
      if (otp_expires >= time) {
        if (Otp == otp) {
          let str =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
          let pass = "";
          for (let i = 1; i <= 10; i++) {
            pass += str.charAt(Math.floor(Math.random() * str.length));
          }
          const saltRounds = 10;
          const password = await bcrypt.hash(pass, saltRounds);
          await sendEmail(firstName, lastName, email, pass);
          const otp = null;
          const otp_expires = null;
          await User.updateOne(
            { _id },
            {
              $set: {
                otp,
                otp_expires,
                password,
              },
            }
          );
          return res.json({
            success: true,
            message: "otp verify password will be send your email",
          });
        } else {
          return res.json({
            success: false,
            message: "otp is wrong",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "otp is expire",
        });
      }
    }
    if (Type == "auth_vendor") {
      const { _id, firstName, lastName, email, otp, otp_expires } =
        await Vender.findOne({ phno: Phone });
      const time = new Date().toLocaleString();
      // console.log(time ,vendor.otp_expires)
      if (otp_expires >= time) {
        if (Otp == otp) {
          let str =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
          let pass = "";
          for (let i = 1; i <= 10; i++) {
            pass += str.charAt(Math.floor(Math.random() * str.length));
          }
          const saltRounds = 10;
          const password = await bcrypt.hash(pass, saltRounds);
          await sendEmail(firstName, lastName, email, pass);
          const otp = null;
          const otp_expires = null;
          await Vender.updateOne(
            { _id },
            {
              $set: {
                otp,
                otp_expires,
                password,
              },
            }
          );
          return res.json({
            success: true,
            message: "otp verify password will be send your email",
          });
        } else {
          return res.json({
            success: false,
            message: "otp is wrong",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "otp is expire",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
