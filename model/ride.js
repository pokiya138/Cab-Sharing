const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
  },
  dropLocation: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vender",
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  availableSeat: {
    type: String,
  },
  price: {
    type: String,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
  },
  otp: {
    type: String,
  },
  otp_expires: {
    type: String
  }
});

exports.ride = mongoose.model("ride", rideSchema);
