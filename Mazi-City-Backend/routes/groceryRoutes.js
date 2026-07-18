const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Use category = 'Grocery Store' (based on shopsData.js)
router.get("/", (req, res) => {
  req.params.category = 'Grocery Store';
  businessController.getBusinessesByCategory(req, res);
});

router.post("/", upload.single("image"), (req, res) => {
  req.body.category = 'Grocery Store';
  businessController.addBusiness(req, res);
});

router.put("/:id", upload.single("image"), (req, res) => {
  req.body.category = 'Grocery Store';
  businessController.updateBusiness(req, res);
});

router.delete("/:id", businessController.deleteBusiness);
router.get("/:id", businessController.getBusiness);

module.exports = router;