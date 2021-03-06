var express = require('express');
var router = express.Router();

function getSurges(res, mysql, context, complete) {
  mysql.pool.query("SELECT id, name FROM surges", function (error, results, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.surges = results;
    complete();
  });
}

router.get('/', function (req, res, next) {
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  getSurges(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if (callbackCount >= 1) {
      res.render('surges', context);
    }
  }
});
module.exports = router;
