const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getLatestData,
} = require("../controllers/dashboardController");

router.get("/", getDashboard);

router.get("/latest", getLatestData);

module.exports = router;