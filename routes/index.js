const express = require('express');
const router = express.Router();
const mysql = require("mysql")

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.login) 
  res.render("index")
  // else res.redirect("/logsign")
});

module.exports = router;
