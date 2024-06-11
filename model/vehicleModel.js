const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vendorID: {
    type: String,
  },
  vehicleBrand: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
  vehicleNumber: {
    type: String,
  },
  vehicleImg: {
    type: String,
  },
  puc: {
    type: String,
  },
  vehicleInsurance: {
    type: String,
  },
  vehicleRC: {
    type: String,
  },
});

exports.vehicle = mongoose.model("vehicle", vehicleSchema);
