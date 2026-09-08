const express = require("express");
const app = express();

const cors = require("cors");
const logger = require("morgan");

require("dotenv").config();
require("./database/database");
// controllers
const testJwtRoutes = require("./controllers/test-jwt");
const authRoutes = require("./controllers/authCtrl");
const isSignedin = require("./middlewares/isSignedin");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes go here
app.use("/test-jwt", testJwtRoutes);
app.post("/auth/sign-up", authRoutes.signup);
app.post("/auth/sign-in", authRoutes.signin);

app.get("/protected", isSignedin, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message || "errooooooorrrrrrrrr" });
  }
});

app.listen(3000, () => {
  console.log("The express app is ready!");
});
