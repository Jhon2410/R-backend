const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ msg: "Token valida", success: true });
});

module.exports = router;
