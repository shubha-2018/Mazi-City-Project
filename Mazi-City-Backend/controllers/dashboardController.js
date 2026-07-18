const db = require("../config/db");

// =======================================
// Dashboard Counts
// =======================================
const getDashboard = (req, res) => {

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM locations) AS totalLocations,
      (SELECT COUNT(*) FROM categories) AS totalCategories,
      (SELECT COUNT(*) FROM businesses) AS totalBusinesses,
      (SELECT COUNT(*) FROM businesses WHERE is_popular='Yes') AS popularBusinesses
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      data: result[0],
    });

  });

};

// =======================================
// Latest Categories & Locations
// =======================================
const getLatestData = (req, res) => {

  const data = {};

  db.query(
    "SELECT id, name, status FROM categories ORDER BY id DESC LIMIT 5",
    (err, categories) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      data.categories = categories;

      db.query(
        "SELECT id, city, state FROM locations ORDER BY id DESC LIMIT 5",
        (err, locations) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          data.locations = locations;

          res.json({
            success: true,
            data,
          });

        }
      );

    }
  );

};

module.exports = {
  getDashboard,
  getLatestData,
};