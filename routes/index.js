const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
    res.send("Hello from requrity");
});

module.exports = router;
