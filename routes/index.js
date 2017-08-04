let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index",{title:"Mis dependencias Oaxaca"});
});

module.exports = router;
