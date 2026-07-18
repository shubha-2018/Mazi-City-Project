const db = require("../config/db");

// ===============================
// Get All Businesses
// ===============================
const getBusinesses = (req, res) => {
  db.query(
    "SELECT * FROM businesses ORDER BY id DESC",
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

// ===============================
// Get Businesses By Category
// ===============================
const getBusinessesByCategory = (req, res) => {
  const category = req.params.category;
  db.query(
    "SELECT * FROM businesses WHERE category=? ORDER BY id DESC",
    [category],
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

// ===============================
// Get Single Business
// ===============================
const getBusiness = (req, res) => {
  db.query(
    "SELECT * FROM businesses WHERE id=?",
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
          message: "Business Not Found",
        });
      }

      res.json({
        success: true,
        data: result[0],
      });
    }
  );
};

// ===============================
// Add Business
// ===============================
const addBusiness = (req, res) => {
  const {
    businessTitle,
    storeName,
    category,
    rating,
    review,
    location,
    description,
    mobileNumber,
    whatsappNumber,
    is_popular,
    status,
  } = req.body;

  const image = req.file ? req.file.filename : "";

  const sql = `
    INSERT INTO businesses
    (
      image,
      businessTitle,
      storeName,
      category,
      rating,
      review,
      location,
      description,
      mobileNumber,
      whatsappNumber,
      is_popular,
      status
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      image,
      businessTitle,
      storeName,
      category,
      rating,
      review,
      location,
      description,
      mobileNumber,
      whatsappNumber,
      is_popular,
      status,
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
        message: "Business Added Successfully",
      });
    }
  );
};

// ===============================
// Update Business
// ===============================
const updateBusiness = (req, res) => {
  const {
    businessTitle,
    storeName,
    category,
    rating,
    review,
    location,
    description,
    mobileNumber,
    whatsappNumber,
    is_popular,
    status,
    image,
  } = req.body;

  const businessImage = req.file ? req.file.filename : image;

  const sql = `
    UPDATE businesses SET
      image=?,
      businessTitle=?,
      storeName=?,
      category=?,
      rating=?,
      review=?,
      location=?,
      description=?,
      mobileNumber=?,
      whatsappNumber=?,
      is_popular=?,
      status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      businessImage,
      businessTitle,
      storeName,
      category,
      rating,
      review,
      location,
      description,
      mobileNumber,
      whatsappNumber,
      is_popular,
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
        message: "Business Updated Successfully",
      });
    }
  );
};

// ===============================
// Delete Business
// ===============================
const deleteBusiness = (req, res) => {
  db.query(
    "DELETE FROM businesses WHERE id=?",
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
        message: "Business Deleted Successfully",
      });
    }
  );
};

// ===============================
// Get Popular Businesses
// ===============================
const getPopularBusinesses = (req, res) => {
  db.query(
    "SELECT * FROM businesses WHERE is_popular='Yes' OR is_popular='1' OR is_popular=1 ORDER BY id DESC",
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

// ===============================
// Get Recent Businesses
// ===============================
const getRecentBusinesses = (req, res) => {
  const sql = `
    SELECT
      id,
      businessTitle,
      storeName,
      category,
      rating,
      created_at
    FROM businesses
    ORDER BY id DESC
    LIMIT 5
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
      data: result,
    });
  });
};

module.exports = {
  getBusinesses,
  getBusiness,
  addBusiness,
  updateBusiness,
  deleteBusiness,
  getPopularBusinesses,
  getRecentBusinesses,
  getBusinessesByCategory,
};