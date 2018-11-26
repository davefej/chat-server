var express = require('express');
var router = express.Router();
var fileService = require("../services/fileService");
var pollingService = require("../services/pollingService");

/* GET home page. */
router.get('/:msgId', async function (req, res, next) {
    let path = "datas/messages/" + req.params.msgId;
    var msgs = [];
    if (fileService.existsSync(path)) {
        var msgs = await fileService.readJson(path);
    }
    res.send({
        ok: 1,
        messages: msgs
    });
});

/* GET home page. */
router.post('/:msgId', async function (req, res, next) {
    try{
        if (!fileService.existsSync("datas/messages")) {
            fileService.createDirSync("datas/messages");
        }
        let path = "datas/messages/" + req.params.msgId;
        var msgs = [];
        if (fileService.existsSync(path)) {
            var msgs = await fileService.readJson(path);
        }
        msgs.push(req.body.msg);
        await fileService.writeJson(path,msgs);
        pollingService.msgArrived(req.params.msgId, req.body.msg);
        console.log("MSG arrived: "+req.params.msgId);
        pollingService.log();
        res.send({ok:1});
    }catch(e){
        res.end();
    }

});

/* GET home page. */
router.get('/polling/:userId', async function (req, res, next) {
    pollingService.subscribe(req.params.userId,res);

    console.log("Subscribed:"+req.params.userId)
    pollingService.log();

});


module.exports = router;
