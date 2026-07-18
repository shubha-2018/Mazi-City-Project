const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

// ===============================
// Get All Locations
// ===============================
router.get("/", getLocations);

// ===============================
// Get Single Location
// ===============================
router.get("/:id", getLocation);

// ===============================
// Add Location
// ===============================
router.post(
  "/",
  upload.single("image"),
  addLocation
);

// ===============================
// Update Location
// ===============================
router.put(
  "/:id",
  upload.single("image"),
  updateLocation
);

// ===============================
// Delete Location
// ===============================
router.delete("/:id", deleteLocation);

module.exports = router;