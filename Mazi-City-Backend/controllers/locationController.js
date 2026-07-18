const db = require("../config/db");

// ==========================
// Get All Locations
// ==========================
const getLocations = (req, res) => {
  db.query(
    "SELECT * FROM locations ORDER BY id DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        data: result,
      });
    }
  );
};

// ==========================
// Get Single Location
// ==========================
const getLocation = (req, res) => {
  db.query(
    "SELECT * FROM locations WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Location Not Found",
        });
      }

      res.json({
        success: true,
        data: result[0],
      });
    }
  );
};

// ==========================
// Add Location
// ==========================
const addLocation = (req, res) => {
  const { city, state, status } = req.body;

  const image = req.file ? req.file.filename : "";

  db.query(
    "INSERT INTO locations(city,state,image,status) VALUES(?,?,?,?)",
    [city, state, image, status],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Location Added Successfully",
      });
    }
  );
};

// ==========================
// Update Location
// ==========================
const updateLocation = (req, res) => {
  const { city, state, status } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  db.query(
    "UPDATE locations SET city=?,state=?,image=?,status=? WHERE id=?",
    [
      city,
      state,
      image,
      status,
      req.params.id,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Location Updated Successfully",
      });
    }
  );
};

// ==========================
// Delete Location
// ==========================
const deleteLocation = (req, res) => {
  db.query(
    "DELETE FROM locations WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        message: "Location Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
};