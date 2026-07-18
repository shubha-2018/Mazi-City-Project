const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,
} = require("../controllers/sliderController");

router.get("/", getSliders);

router.get("/:id", getSlider);

router.post("/", upload.single("image"), addSlider);

router.put("/:id", upload.single("image"), updateSlider);

router.delete("/:id", deleteSlider);

module.exports = router;