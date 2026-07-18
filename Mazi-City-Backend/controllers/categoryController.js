const db = require("../config/db");

// ==========================
// Get All Categories
// ==========================
const getCategories = (req, res) => {
  db.query(
    "SELECT * FROM categories ORDER BY id DESC",
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
// Get Single Category
// ==========================
const getCategory = (req, res) => {
  db.query(
    "SELECT * FROM categories WHERE id=?",
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
          message: "Category Not Found",
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
// Add Category
// ==========================
const addCategory = (req, res) => {

  const { name, description, status } = req.body;

  const image = req.file ? req.file.filename : "";

  const sql = `
  INSERT INTO categories
  (
    name,
    description,
    image,
    status
  )
  VALUES(?,?,?,?)
  `;

  db.query(
    sql,
    [
      name,
      description,
      image,
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
        message: "Category Added Successfully",
      });
    }
  );
};

// ==========================
// Update Category
// ==========================
const updateCategory = (req, res) => {

  const { name, description, status } = req.body;

  const image = req.file
    ? req.file.filename
    : req.body.image;

  const sql = `
  UPDATE categories SET
  name=?,
  description=?,
  image=?,
  status=?
  WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      description,
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
        message: "Category Updated Successfully",
      });
    }
  );
};

// ==========================
// Delete Category
// ==========================
const deleteCategory = (req, res) => {

  db.query(
    "DELETE FROM categories WHERE id=?",
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
        message: "Category Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};