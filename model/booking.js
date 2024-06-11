const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rideid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ride",
  },
  vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vender'
  },
  carId: {

    
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vehicle'
  },
});

exports.booking = mongoose.model("booking", bookingSchema);
