const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv");

// Load in custom env variables
dotenv.config();

// connect mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
  )
  .then(() => {
    const app = express();
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  });