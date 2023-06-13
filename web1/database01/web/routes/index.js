var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render("index", { message: null });

})

router.get("/namecard/create", function (req, res) {
  res.render("namecard/create")
})

router.get("/main", async function (req, res) {
  console.log(req.session)
  var [rows] = await connection.query("select * from namecard where userId = ?", [req.session.user.id])
  res.render("main", { namecardList: rows })
})
router.get("/namecard/modify/:id", async function (req, res) {
  console.log(req.params.id)
  var [rows] = await connection.query("select * from namecard where id = ?", [req.params.id])
  res.render("namecard/modify", { namecard: rows[0] })
})
router.get("/namecard/:id", async function (req, res) {
  var [rows] = await connection.query("select * from namecard where id=?", [req.params.id])
  var loginUserId = null
  if (req.session.user) {
    loginUserId = req.session.user.id
  }

  res.render("namecard/detail", { namecard: rows[0], loginUserId: loginUserId })


})


module.exports = router;
