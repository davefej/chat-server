var express = require('express');
var router = express.Router();
var fileservice = require("../services/fileservice");
var pm = require("../services/pollingmanager");

/* GET home page. */
router.get('/:msgId', async function (req, res, next) {
    let path = "messages/" + req.params.msgId;
    var msgs = [];
    if (fileservice.existsSync(path)) {
        var msgs = await fileservice.readJson(path);
    }
    res.send({
        ok: 1,
        messages: msgs
    });
});

/* GET home page. */
router.post('/:msgId', async function (req, res, next) {
    try{
        if (!fileservice.existsSync("messages")) {
            fileservice.createDirSync("messages");
        }
        let path = "messages/" + req.params.msgId;
        var msgs = [];
        if (fileservice.existsSync(path)) {
            var msgs = await fileservice.readJson(path);
        }
        msgs.push(req.body.msg);
        await fileservice.writeJson(path,msgs);
        pm.msgArrived(req.params.msgId, req.body.msg);
        console.log("MSG arrived: "+req.params.msgId)
        pm.log();
        res.send({ok:1});
    }catch(e){
        res.end();
    }

});

/* GET home page. */
router.get('/polling/:userId', async function (req, res, next) {
    pm.subscribe(req.params.userId,res);

    console.log("Subscribed:"+req.params.userId)
    pm.log();

});


module.exports = router;
