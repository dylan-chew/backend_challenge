const cron = require("node-cron");
const vehicles = require("./fetchVehicles.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load in custom env variables
dotenv.config();

// Can uncomment IFFE/Comment out cron scheudle to run right away
// (async function () {
// Run the job everyday at midnight
cron.schedule("0 0 0 * * * ", async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Cron connected to Mongoose!");
  console.log("fetching vehicles");
  await vehicles.getVehicleData();
});
// })();
