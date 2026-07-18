const db = require("../config/db");

// Get All Sliders
const getSliders = (req, res) => {
  db.query("SELECT * FROM sliders ORDER BY id DESC", (err, result) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: err.message,
      });

    res.json(result);
  });
};

// Get Single Slider
const getSlider = (req, res) => {
  db.query(
    "SELECT * FROM sliders WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });

      res.json(result[0]);
    }
  );
};

// Add Slider
const addSlider = (req, res) => {
  const { title, subtitle, status } = req.body;

  const image = req.file ? req.file.filename : "";

  db.query(
    "INSERT INTO sliders(title,subtitle,image,status) VALUES(?,?,?,?)",
    [title, subtitle, image, status],
    (err) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });

      res.json({
        success: true,
        message: "Slider Added Successfully",
      });
    }
  );
};

// Update Slider
const updateSlider = (req, res) => {
  const { title, subtitle, status } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  db.query(
    "UPDATE sliders SET title=?, subtitle=?, image=?, status=? WHERE id=?",
    [title, subtitle, image, status, req.params.id],
    (err) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });

      res.json({
        success: true,
        message: "Slider Updated Successfully",
      });
    }
  );
};

// Delete Slider
const deleteSlider = (req, res) => {
  db.query(
    "DELETE FROM sliders WHERE id=?",
    [req.params.id],
    (err) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });

      res.json({
        success: true,
        message: "Slider Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,
};