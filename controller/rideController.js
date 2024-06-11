const rideModel = require("../model/ride");
const ride = rideModel.ride;
const bookingModel = require("../model/booking");
const book = bookingModel.booking;
const mongoose = require("mongoose");

//Add Ride
exports.addRide = async (req, res) => {
  try {
    const data = new ride({
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      vendorId: req.body.vendorId,
      date: req.body.date,
      time: req.body.time,
      availableSeat: req.body.availableSeat,
      price: req.body.price,
      carId: req.body.carId,
      otp: null,
      otp_expires: null,
    });
    const result = await new ride(data).save();
    if (result) {
      return res.json({
        success: 1,
        message: "Data Inserted.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Data not inserted.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Get All Ride
exports.getAllRide = async (req, res) => {
  try {
    const result = await ride.find().populate(["vendorId", "carId"]).exec();
    if (result.length > 0) {
      return res.json({
        success: 1,
        message: "All Rides",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "No rides found",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
      error: error.message,
    });
  }
};

//Get One Ride
exports.getOneRide = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ride
      .findOne({ _id: id })
      .populate(["vendorId", "carId"])
      .exec();
    if (result) {
      return res.json({
        success: 1,
        message: "All Rides",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "No rides found",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
      error: error.message,
    });
  }
};

//Search Ride
exports.searchRide = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, date } = req.body;

    if (pickupLocation && dropLocation) {
      const result = await ride
        .find(req.body)
        .populate(["vendorId", "carId"])
        .exec();
      if (result.length > 0) {
        const currentTime = new Date().toTimeString().slice(0, 5);
        const rd = new Date(date).toDateString();
        const Today = new Date().toDateString();
        if (rd == Today) {
          if (result[0].time > currentTime) {
            return res.json({
              success: 1,
              message: "Available Ride",
              result,
            });
          } else {
            return res.json({
              success: 0,
              message: "Not Available Ride",
            });
          }
        } else {
          return res.json({
            success: 1,
            message: "Available Ride",
            result,
          });
        }
      } else {
        return res.json({
          success: 0,
          message: "Not Found Ride",
        });
      }
    } else {
      return res.json({
        success: 0,
        message: "Please provide the PickupLocation,DropOffLocation and Date. ",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Delete Ride
exports.deleteRide = async (req, res) => {
  const { id, otp } = req.body;
  try {
    console.log(id, otp);
    const data = await ride.findOne({ _id: id });
    const time = new Date().toLocaleString();
    if (data.otp_expires >= time) {
      if (otp == data.otp) {
        const rs = await book.deleteMany({ rideid: id });
        if (rs) {
          const result = await ride.deleteOne({ _id: id });
          if (result) {
            return res.json({
              success: 1,
              message: "Ride Deleted Successfully",
            });
          }
        } else {
          return res.json({
            success: 0,
            message: "failed to delete.",
          });
        }
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
  } catch (error) {
    return res.json({
      success: 0,
      message: error.message,
    });
  }
};

// demo
exports.demo = async (req, res) => {
  const { ab } = req.body;
  try {
    res.send(req.body);
  } catch (err) {
    console.log(err);
  }
};

// Booked Ride by Vender
exports.venderInquiry = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ride.find({ vendorId: id }).populate("carId").exec();
    if (result) {
      return res.json({
        success: 1,
        message: "Details of Rides",
        result,
      });
    } else {
      res.send("error");
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};
