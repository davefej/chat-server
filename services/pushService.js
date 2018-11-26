const webPush = require('web-push');
var fileService = require("./fileService");
var pollingService = require("./pollingService");
webPush.setVapidDetails('mailto:daveteszt@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

var dev = process.env.DEV == "1";
module.exports = {
    newMsg(msgId,msg){
        var toId = otherId(msgId,msg.sender);
        fileService.readJson('datas/users.json').then(function(data){
            var senderName = data[msg.sender].user;
            var msgShort = msg.txt.length > 20 ? msg.txt.substr(0,17)+"..." : msg.txt;
            if(!dev){
                webPush.sendNotification(data[toId].pushdata, JSON.stringify({
                    senderName:senderName,
                    msgId:msgId,
                    body:msgShort,
                    title:senderName+" üzenetet küldött",
                    icon:'https://pwachat.ddns.net/static/img/icon192.png'
                })).catch(error => {
                    console.error(error.stack);
                });
            }
        });
    }
};

function otherId(msgId,senderId){
    var ids = msgId.split("_");
    if(ids[0] == senderId){
        return ids[1];
    }else{
        return ids[0];
    }
}


