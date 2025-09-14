const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// CRUD routes
router.post("/", authMiddleware, noteController.createNote);
router.get("/", authMiddleware, noteController.getNotes);
router.get("/:id", authMiddleware, noteController.getNote);
router.put("/:id", authMiddleware, noteController.updateNote);
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
