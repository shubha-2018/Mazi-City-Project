const db = require("../config/db");

// =============================
// Get All Messages
// =============================
const getMessages = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages ORDER BY id DESC",
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

// =============================
// Get Single Message
// =============================
const getMessage = (req, res) => {
  db.query(
    "SELECT * FROM contact_messages WHERE id=?",
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
          message: "Message Not Found",
        });
      }

      res.json({
        success: true,
        data: result[0],
      });
    }
  );
};

// =============================
// Delete Message
// =============================
const deleteMessage = (req, res) => {
  db.query(
    "DELETE FROM contact_messages WHERE id=?",
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
        message: "Message Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getMessages,
  getMessage,
  deleteMessage,
};