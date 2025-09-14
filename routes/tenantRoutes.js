const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const tenantController = require("../controllers/tenantController");

router.post("/:slug/upgrade", authMiddleware, tenantController.upgradePlan);

module.exports = router;
