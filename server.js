const express = require("express");
const app = express();

const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();
require("./database/database");
// controllers
const testJwtRoutes = require("./controllers/test-jwt");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here
app.use("/test-jwt", testJwtRoutes);

app.listen(3000, () => {
  console.log("The express app is ready!");
});
