const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  req.params.category = 'Furniture Store';
  businessController.getBusinessesByCategory(req, res);
});

router.post("/", upload.single("image"), (req, res) => {
  req.body.category = 'Furniture Store';
  businessController.addBusiness(req, res);
});

router.put("/:id", upload.single("image"), (req, res) => {
  req.body.category = 'Furniture Store';
  businessController.updateBusiness(req, res);
});

router.delete("/:id", businessController.deleteBusiness);
router.get("/:id", businessController.getBusiness);

module.exports = router;