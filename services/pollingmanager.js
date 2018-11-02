const webpush = require('web-push');
var fileservice = require("./fileservice");
var connections = {};
module.exports = {

    subscribe: function(userId,response){
        connections[userId] = {
            res:response,
            time:new Date().getTime()
        };
    },
    unsubscribe: function(userId){
        if(isSubscribed(userId)){
            closeAndDelete(userId);
        }
    },

    msgArrived: function(msgId,msg){
        var ids = msgId.split("_");

        if(isSubscribed(ids[0])){
            sendMessage(ids[0],msg);
        }
        if(isSubscribed(ids[1])){
            sendMessage(ids[1],msg);
        }
        console.log("Webpuhs called")
         fileservice.readJson('datas/users.json').then(function(data){
           webpush.sendNotification(data[ids[1]].pushdata, JSON.stringify({msgId:msgId,msg:msg,title:"Üzent érkezett"})).catch(error => {
               console.error(error.stack);
           });
        });

    },


    log: function(){
        var i = 0;
        console.log(" **** ")
        for(var id in connections){
            console.log(++i +": "+id+" time:"+new Date(connections[id].time).toISOString());
        }
        console.log(" **** ")
    }

};

function isSubscribed(userId){
    return connections.hasOwnProperty(userId) && connections[userId].hasOwnProperty("res");
}

function sendMessage(userId,msg){
    try{
        connections[userId].res.send(msg);
    }catch (e) {
        console.log(e.toString());
    }

    closeAndDelete(userId);
}

function closeAndDelete(userId){
    if(!connections[userId].res.finished)
        connections[userId].res.end();
    delete connections[userId];

    console.log("Deleted"+userId);
}