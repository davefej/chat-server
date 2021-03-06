
var connections = {};
var pushservice = require("./pushService");

module.exports = {

    subscribe: function(userId,request,response){
        var time = new Date().getTime();
        connections[userId] = {
            resp:response,
            time:time
        };
        request.on("close",function(){
            if(isSubscribed(userId)){
                if(connections[userId].time == time){
                    closeAndDelete(userId);
                }
            }
        })
    },
    unsubscribe: function(userId){
        if(isSubscribed(userId)){
            closeAndDelete(userId);
        }
    },
    msgArrived: function(msgId,msg){
        var toId = otherId(msgId,msg.sender);
        if(isSubscribed(toId)){
            console.log("isSubscribed true");
            sendMessage(toId,msg);
        }else{
            console.log("isSubscribed false");
            pushservice.newMsg(msgId,msg);
        }
    },
    sendMessage: function(toId,msg){
        return sendMessage(toId,msg);
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
    return connections.hasOwnProperty(userId) && connections[userId].hasOwnProperty("resp");
}

function sendMessage(userId,msg){
    var ret = false;
    try{
        connections[userId].resp.send(msg);
        ret = true;
    }catch (e) {
        console.log(e.toString());
    }

    closeAndDelete(userId);
    return ret;
}

function closeAndDelete(userId){
    if(!connections[userId].resp.finished)
        connections[userId].resp.end();
    delete connections[userId];

    console.log("Deleted"+userId);
}


function otherId(msgId,senderId){
    var ids = msgId.split("_");
    if(ids[0] == senderId){
        return ids[1];
    }else{
        return ids[0];
    }
}