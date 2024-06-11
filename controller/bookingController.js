const bookingModel = require("../model/booking");
const book = bookingModel.booking;
const mongoose = require("mongoose");

// Booked Ride
exports.booking = async (req, res) => {
  try {
    const data = new book({
      uid: req.body.uid,
      rideid: req.body.rideid,
    });
    const existingbooking = await book.findOne(req.body);
    if (existingbooking) {
      return res.send({
        success: 0,
        message: "Already ride book",
      });
    }
    const bookings = await new book(data).save();
    return res.send({
      success: 1,
      message: "Ride Book Successfully.",
      bookings,
    });
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in register.",
    });
  }
};

// user Boookings
exports.userbooking = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await book.find({ uid: id }).populate("rideid").exec();
    if (result) {
      const populatedData = await book.populate(result, [
        "rideid.vendorId",
        "rideid.carId",
      ]);
      return res.json({
        success: 1,
        populatedData,
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

// Vender Inquiry
exports.venderInquiry = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await book
      .find({ rideid: id })
      .populate(["uid", "rideid"])
      .exec();
    console.log(result);
    if (result) {
      return res.json({
        success: 1,
        result,
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};
