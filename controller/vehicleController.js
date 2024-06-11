const model = require("../model/vehicleModel");
const vehicle = model.vehicle;
const mongoose = require("mongoose");

//Add Vehicle By Vender
exports.addVehicle = async (req, res) => {
  try {
    const data = new vehicle({
      vehicleBrand: req.body.vehicleBrand,
      vehicleModel: req.body.vehicleModel,
      vehicleNumber: req.body.vehicleNumber,
      vendorID: req.body.vendorID,
      vehicleImg: `http://sparkstoideas.daddy11.in/vehicleImg/${req.files.vehicleImg[0].filename}`,
      puc: `http://sparkstoideas.daddy11.in/puc/${req.files.puc[0].filename}`,
      vehicleInsurance: `http://sparkstoideas.daddy11.in/vehicleInsurance/${req.files.vehicleInsurance[0].filename}`,
      vehicleRC: `http://sparkstoideas.daddy11.in/vehicleRC/${req.files.vehicleRC[0].filename}`,
    });
    const result = new vehicle(data).save();
    if (result) {
      return res.json({
        success: 1,
        message: "Vehicle Added Successfully.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Vehicle not added yet.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};

//Get All Vehicles
exports.getAllvehicles = async (req, res) => {
  try {
    const result = await vehicle.find();
    if (result) {
      return res.json({
        success: 1,
        message: "Details of All Vehicles.",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Not found data.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
    });
  }
};

//Get Vehicles Details By VenderID
exports.getVehicleByVenderId = async (req, res) => {
  try {
    const result = await vehicle.find({ vendorID: req.body.vendorID });
    if (result) {
      return res.json({
        success: 1,
        message: "Vehicles Details By Vender Id.",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Data Not Found.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      messagea: "Error in code.",
    });
  }
};

//Delete Vehicles
exports.deleteVehicel = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await vehicle.deleteOne({ _id: id });
    if (result) {
      return res.json({
        success: 1,
        message: "Vehicle Delete.",
      });
    } else {
      return res.json({
        success: 0,
        message: "Vehicle not delete.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code",
    });
  }
};
