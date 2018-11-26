var express = require('express');
var router = express.Router();
var fileservice = require("../services/fileService");

/* GET users listing. */
router.get('/', async function (req, res, next) {
    var data = await fileservice.readJson('datas/users.json');
    res.send(data);
});


module.exports = router;


