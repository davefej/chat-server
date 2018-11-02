var express = require('express');
var router = express.Router();
var fileservice = require("../services/fileservice");
const webpush = require('web-push');
webpush.setVapidDetails('mailto:daveteszt@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

/* GET home page. */
router.post('/:userId', async function(req, res, next) {
    console.log("PUSH");
    const subscription = req.body;
    res.status(201).json({});

    console.log(subscription);
    var data = await fileservice.readJson('datas/users.json');
    if(data[req.params.userId]){
        data[req.params.userId].pushdata = subscription;
    }
    fileservice.writeJson('datas/users.json',data);
});

module.exports = router;