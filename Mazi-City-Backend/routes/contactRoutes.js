const express = require("express");
const router = express.Router();

const {
  getMessages,
  getMessage,
  deleteMessage,
} = require("../controllers/contactController");

router.get("/", getMessages);

router.get("/:id", getMessage);

router.delete("/:id", deleteMessage);

module.exports = router;