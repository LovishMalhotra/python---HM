const express = require("express");
const { postQuery } = require("../controllers/Query");
const router = express.Router();

router.post("/contact", postQuery);

exports.router = router;
