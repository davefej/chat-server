var express = require('express');
var router = express.Router();
var fileService = require("../services/fileService");

/* GET home page. */
router.post('/:userId', async function(req, res, next) {
    console.log("PUSH");
    const subscription = req.body;
    res.status(201).json({});

    console.log(subscription);
    var data = await fileService.readJson('datas/users.json');
    if(data[req.params.userId]){
        data[req.params.userId].pushdata = subscription;
    }
    fileService.writeJson('datas/users.json',data);
});

module.exports = router;