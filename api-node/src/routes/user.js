const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user", authMiddleware.verifyToken, (req, res) => {
    return res.status(200).json({ usuario: req.user });
});

module.exports = router;
