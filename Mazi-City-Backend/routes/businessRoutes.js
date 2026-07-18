const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getBusinesses,
  getBusiness,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  getPopularBusinesses,
  getRecentBusinesses,
} = require("../controllers/businessController");

// =============================
// Get All Businesses
// =============================
router.get("/", getBusinesses);

// =============================
// Get Popular Businesses
// =============================
router.get("/popular/all", getPopularBusinesses);

// =============================
// Get Recent Businesses
// =============================
router.get("/recent", getRecentBusinesses);

// =============================
// Get Single Business
// =============================
router.get("/:id", getBusiness);

// =============================
// Add Business
// =============================
router.post("/", upload.single("image"), addBusiness);

// =============================
// Update Business
// =============================
router.put("/:id", upload.single("image"), updateBusiness);

// =============================
// Delete Business
// =============================
router.delete("/:id", deleteBusiness);

module.exports = router;