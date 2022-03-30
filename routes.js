const express = require("express");
const Vehicle = require("./models/Vehicle");
const router = express.Router();

// Get all vehicles
router.get("/vehicles", async (req, res) => {
  const vehicles = await Vehicle.find({}, { _id: 0, __v: false });
  res.send(vehicles);
});

// Get vehicle by makeId
router.get("/vehicles/:makeId", (req, res) => {
  Vehicle.find(
    { makeId: req.params.makeId },
    { _id: 0, __v: false },
    (err, vehicle) => {
      if (err) return res.status(400).send("Error");

      //handle no vehicle found
      if (!vehicle) return res.status(404).send();

      res.send(vehicle);
    }
  );
});

module.exports = router;
