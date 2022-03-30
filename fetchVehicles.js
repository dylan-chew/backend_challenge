const axios = require("axios").default;
const Vehicle = require("./models/Vehicle.js");
const {parseXML} = require("./utils");


const getVehicleData = async () => {
  try {
    const vehicleMakesResp = await axios.get(`${process.env.VEHICLEMAKESURL}getallmakes?format=XML`);
    const vehicleMakesData = parseXML(vehicleMakesResp.data);

    const vehicleMakes = vehicleMakesData.response.results.allVehicleMakes;

    // loop through makes so we can grab type per make
    // trouble with forEach, try for loop
    for (let i = 0; i < vehicleMakes.length; i++) {
      const vehicleTypesResp = await axios.get(
        `${process.env.VEHICLEMAKESURL}GetVehicleTypesForMakeId/${vehicleMakes[i].makeId}?format=xml`
      );

      // convert xml to json
      const vehicleTypesData = parseXML(vehicleTypesResp.data);

      // Save 'vehicle' to DB
      const vehicleData = {
        ...vehicleMakesData.response.results.allVehicleMakes[i],
        vehicleTypes: vehicleTypesData.response.results.vehicleTypesForMakeIds,
      };

      const query = { makeId: vehicleMakes[i].makeId };
      await Vehicle.findOneAndUpdate(query, vehicleData, { upsert: true });

      // Output percentage of job finsihed (sanity)
      console.log(`${(100 * (i + 1)) / vehicleMakes.length}% complete`);
    }

    console.log("Finished grabbing data!");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getVehicleData };
