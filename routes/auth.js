var express = require('express');
var router = express.Router();
var md5 = require('md5');
var fileservice = require("../services/fileService");


/* login */
router.post('/login', async function (req, res, next) {
    let user = req.body.user;
    let pass = req.body.pass;
    if (!user) {
        res.status(400);
    }
    let id = md5(user);
    var data = await fileservice.readJson('datas/users.json');
    if (data[id] && data[id].pass.toLowerCase() == md5(pass).toLowerCase()) {
        res.send({
            ok: 1,
            id: id,
            salt:md5("SALT_"+user+"_SALT")
        });
    } else {
        res.status(401);
        res.end();
    }
});


/* sign up */
router.post('/register', async function (req, res, next) {
    let user = req.body.user;
    let pass = req.body.pass;
    if (!user) {
        res.status(400);
        res.end();
        return;
    }
    let id = md5(user);
    console.log("new id:" + id);
    let data = await fileservice.readJson('datas/users.json');
    if (data.hasOwnProperty(id)) {
        res.status(400);
        res.send("User already Exists!");
        return;
    } else {
        data[id] = {
            user: user,
            pass: md5(pass)
        };
        fileservice.writeJson('datas/users.json', data);
        res.send({created: 1});
    }
});

module.exports = router;
