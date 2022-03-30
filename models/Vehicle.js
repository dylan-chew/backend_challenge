const mongoose = require("mongoose");

const VehicleDataSchema = new mongoose.Schema({
  makeId: { type: String, required: true },
  makeName: { type: String, required: true },
  vehicleTypes: [{_id: false, typeId: {type: String}, typeName: {type: String} }],
});

module.exports = mongoose.model("Vehicle", VehicleDataSchema);
