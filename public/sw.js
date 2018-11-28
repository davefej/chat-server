"use strict";var precacheConfig=[["index.html","10fa14e3514845e9039eafd3454543bb"],["static/css/app.fa189a8ff157779fb10c23a0a173b323.css","1528bbeadf24df4461965ce0a66b85c0"],["static/css/bootstrap.css","38fdafbec65832ead969ca340d28453f"],["static/css/bootstrap.min.css","d8ab09baf9f602e4775cd9bf766e2887"],["static/css/font-awesome.min.css","1ff0bb27d5c720d62057043327a27f94"],["static/css/jquery-ui.min.css","0b5729a931d113be34b6fac13bcf5b29"],["static/css/mdb.css","7b316fa082ec4249506fc1195619619f"],["static/css/mdb.min.css","cfa12efabec62613a3272fbe0ae61693"],["static/css/style.css","d8b8e272d602b3601e305bcc1c2fdf46"],["static/css/style.min.css","d41d8cd98f00b204e9800998ecf8427e"],["static/easyrtc/easyrtc.js","9940791433f7f29b2ac19e07910286f2"],["static/easyrtc/socket-io.js","5c0b0b00dedb139cbf458eaa95c23086"],["static/emoji/jquery.lsxemojipicker.css","f9c7bd7929a004c826c9e1bd45c6af51"],["static/emoji/jquery.lsxemojipicker.js","1e72913ac19595d185e068a208b65544"],["static/js/app.f99c75f060f60cfb0396.js","638923198dc015ca80d805515b74826d"],["static/js/bootstrap.js","d9f096d1f708c35fdd9c78bd422883cc"],["static/js/bootstrap.min.js","ce6e785579ae4cb555c9de311d1b9271"],["static/js/jquery-3.2.1.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["static/js/jquery-ui.min.js","c15b1008dec3c8967ea657a7bb4baaec"],["static/js/manifest.2ae2e69a05c33dfc65f8.js","323055c248c0cbf6e12cf4b27d6dfd9b"],["static/js/md5.js","7c1768c2cd8407861f612a2b47fce83d"],["static/js/mdb.js","0c020c96a5940f8d3092d0dfd9b2472d"],["static/js/mdb.min.js","d92fabcc57b1a43696eb870f8e8cdebd"],["static/js/popper.min.js","6cd956453e307bfd2ce4bfb0648b9f7d"],["static/js/sha256.min.js","fc97d1fd31a0882a511d4a66f3a20715"],["static/js/vendor.2218bfba3f8095150879.js","9774ef2cefa6753dcb5d29351599f518"],["static/swextra.js","0b2da94a003b842b6b3b88a7d1f2c608"],["sw.js","4c77ddebb291223a902d9dd10877237e"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var s=new URL(e);return"/"===s.pathname.slice(-1)&&(s.pathname+=t),s.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,s,c){var a=new URL(e);return c&&a.pathname.match(c)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(s)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var s=new URL(t).pathname;return e.some(function(e){return s.match(e)})},stripIgnoredUrlParameters=function(e,t){var s=new URL(e);return s.hash="",s.search=s.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),s.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],s=e[1],c=new URL(t,self.location),a=createCacheKey(c,hashParamName,s,!1);return[c.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(s){if(!t.has(s)){var c=new Request(s,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+s+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(s,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(s){return Promise.all(s.map(function(s){if(!t.has(s.url))return e.delete(s)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,s=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(s))||(s=addDirectoryIndex(s,"index.html"),t=urlsToCacheKeys.has(s));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(s)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});
export default class HttpService {

    constructor(param) {
        this.instance = null;
        if (!param) {
            throw Error("Illegal Constructor call!");
        }
        this.data = {};
        this.data.users = [];
        this.newMessages = [];
        this.msgArrivedCallback = null;
        this.locationStr = null;
        this.recentMessages = {};
        this.updateLocation();
    }

    getUsers() {
        return this.data.users;
    }

    getMessages(userId) {
        if (this.data.messages[userId]) {
            return this.data.messages[userId];
        } else {
            return {
                user: "",
                messages: []
            }
        }
    }

    bindMessages(toUserId, data) {
        let service = this;
        var msgId = this.msgid(toUserId, this.userId);
        $.get({
            dataType: "json",
            cache: false,
            url: "messages/" + msgId,
            success: function (res) {
                if (!res.ok) {
                    return;
                }
                var offlineMessages = [];
                var offlineMessagesStarter = res.messages.length - offlineMessagesCount;
                for (var i = 0; i < res.messages.length; i++) {
                    if (res.messages[i]) {
                        res.messages[i].receive = res.messages[i].sender != service.userId;
                        data.push(res.messages[i]);
                        if (offlineMessagesStarter < i) {
                            offlineMessages.push(res.messages[i]);
                        }
                    }
                }
                service.recentMessages[msgId] = offlineMessages;
                service.storeRecentMessages(offlineMessages,msgId);
            },
            error: function () {
                console.log("Offline működés!");
                service.loadFromDb({
                    error:function(){console.error("Cannot load offline data")},
                    success:function(offlineData){
                        for(var i = 0; i < offlineData.messages.length ; i++){
                            data.push(offlineData.messages[i]);
                        }
                    },
                    store:"recentMessages",
                    keyValue:msgId
                })
            }
        });
    }

    sendMessage(toUserId, txt) {
        let service = this;
        var message = {
            txt: txt,
            sender: this.userId,
            location:service.locationName(),
            time:new Date().toISOString()
        };
        if(!toUserId || !this.userId){
            console.error("sendMessage msgID error, [receiverId,SenderId] => ",toUserId,this.userId);
            return;
        }
        var msgId = this.msgid(toUserId, this.userId);
        $.post({
            dataType: "json",
            cache: false,
            url: "messages/" + msgId,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                msg: message
            }),
            success: function () {
                var offlineMessages = service.recentMessages[msgId];
                if(offlineMessages && Array.isArray(offlineMessages)){
                    offlineMessages.shift();
                    offlineMessages.push(message);
                    service.storeRecentMessages(offlineMessages,msgId);
                }

            },
            error: function () {
                message.messageId = msgId;
                service.saveToDb({
                    store: 'messagesToSend',
                    data: message
                });
                navigator.serviceWorker.ready.then(function (swRegistration) {
                    return swRegistration.sync.register('unSentMessages');
                });
            }
        });
    }

    msgid(id1, id2) {
        if (id1 < id2) {
            return id1 + "_" + id2;
        } else {
            return id2 + "_" + id1;
        }
    }

    bindUsers(data) {
        var service = this;
        $.get({
            dataType: "json",
            cache: false,
            url: "users",
            success: function (res) {
                service.users = res;
                var currentUser = null;
                for (var key in res) {
                    if (key == service.userId) {
                        currentUser = {
                            id: key,
                            name: res[key].user
                        };
                    } else {
                        data.push({
                            id: key,
                            name: res[key].user
                        });
                    }

                }
                if (currentUser) {
                    data.push(currentUser);
                }
                service.saveToDb({
                    store: 'offlineUsers',
                    data: {
                        id:1,
                        users: data,
                        time: (new Date()).getTime()
                    },
                    update:1
                });

            },
            error:function(){
                service.loadFromDb({
                    error:function(){console.error("Cannot load offline data")},
                    success:function(offlineData){
                        for(var i = 0; i < offlineData.users.length ; i++){
                            data.push(offlineData.users[i]);
                        }
                    },
                    store:'offlineUsers',
                    keyValue:1
                });
            }
        });
    }

    logIn(user, pass, success, failure) {
        var service = this;

        this.userName = user;
        fetch("auth/login", {
            method: "post",
            body: JSON.stringify({
                user: user,
                pass: pass
            }),
            headers: {
                'content-type': 'application/json'
            },
            cache: 'no-cache'
        }).then(function (response) {
            return response.json();
        }).then(function (res) {
            service.userId = res.id;
            service.logged = true;
            success();
            service.pollServer();
            service.registerPush();
            service.requestNotificationPermission();
            localStorage.setItem("salt", res.salt);
            localStorage.setItem("userid", res.id);
            localStorage.setItem("auth", md5(sha256.pbkdf2(pass, res.salt, 1000, 32)));
        }).catch(function (error) {
            if (navigator && !navigator.onLine && localStorage && localStorage.getItem("salt") && localStorage.getItem("auth") &&
                md5(sha256.pbkdf2(pass, localStorage.getItem("salt"), 1000, 32)) == localStorage.getItem("auth")) {
                service.userId =localStorage.getItem("userid");
                service.logged = true;
                success();
                service.requestNotificationPermission();
                service.pollServer();
                service.registerPush();

            }else{
                service.userName = null;
                if(failure){
                    failure();
                }else{
                    console.error("Offline load fail")
                }

            }

        });
    }


    signUp(user, pass, success) {
        this.userName = user;
        var service = this;
        $.post({
            dataType: "json",
            url: "auth/register",
            data: {
                user: user,
                pass: pass
            },
            success: function () {
                service.logged = true;
                success();
            }, error: function () {
                service.userName = null;
            }
        });

    }

    logOut() {
        this.logged = false;
    }

    loggedIn() {
        if (typeof dev != "undefined" && dev) {
            return true;
        }
        return this.logged;
    }

    static instance() {
        if (!HttpService.inst) {
            HttpService.inst = new HttpService(true);
        }
        return HttpService.inst;
    }

    getUserNameById(id) {
        if (this.users && this.users[id]) {
            return this.users[id].user;
        }
    }

    pollServer() {
        var service = this;
        var pending = 0;
        if(navigator && !navigator.onLine){
            pending = 1000;
        }
        window.setTimeout(function () {
            $.ajax({
                url: "messages/polling/" + service.userId,
                method: "GET",
                cache: false,
                success: function (result) {
                    if (result && result.sender && result.txt) {
                        if (result.sender != service.userId) {
                            service.messageArrived(result);
                        }
                    }
                    //SUCCESS LOGIC
                    service.pollServer();
                },
                error: function () {
                    //ERROR HANDLING
                    console.error("pollserver Errored");
                    service.pollServer();
                }
            });
        }, pending);

    }

    messageArrived(message) {
        if (this.msgArrivedCallback) {
            this.msgArrivedCallback(message);
        }
        var offlineMessages = this.recentMessages[message.sender];
        if(offlineMessages && Array.isArray(offlineMessages)){
            offlineMessages.shift();
            offlineMessages.push(message);
            this.storeRecentMessages(offlineMessages,message.sender);
        }
    }

    subscribe(cb) {
        this.msgArrivedCallback = cb;
    }

    getUserName() {
        return this.userName || "";
    }

    loadFromDb(param) {
        var request = window.indexedDB.open("db", window.DBVERSION);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var tx = db.transaction(param.store, 'readwrite');
            var store = tx.objectStore(param.store);

            if(param.keyValue){
                var request = store.get(param.keyValue);
                request.onsuccess = function(event) {
                    param.success(event.target.result);
                };
            }else{
                var list = [];
                store.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        list.push(cursor.value);
                        cursor.continue();
                    } else {
                        param.success(list);
                    }
                };
            }

        }
        request.onerror = function () {
            param.error();
        }
    }


    saveToDb(params){
        var request = window.indexedDB.open("db",window.DBVERSION);
        request.onsuccess = function(event){
            var db = event.target.result;
            var tx = db.transaction(params.store, 'readwrite');
            var store = tx.objectStore(params.store);
            if(params.update){
                var objectStoreRequest = store.put(params.data);
            }else{
                var objectStoreRequest = store.add(params.data);
            }
            objectStoreRequest.onsuccess = function(event) {
                console.log("Sikeres!")
            };

            objectStoreRequest.onerror = function(e){

                console.error(e);
            }
        }
    }
    myLocation(locationCallback){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(locationCallback);
        }else{
            locationCallback(false);
        }

    }
    locationName(){
        return this.locationStr;
    }
    updateLocation(){
        var service = this;
        if(!this.locationTimer && navigator.geolocation){
            var updateLoc = function(){
                service.myLocation(function(position){
                    var geocoder = new google.maps.Geocoder();
                    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    geocoder.geocode({'latLng': geolocate}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var result;
                            if (results.length > 1) {
                                result = results[1];
                            } else {
                                result = results[0];
                            }
                            var locationStr = result.address_components[3].long_name+", "+result.address_components[2].long_name;;
                            console.log("Location updated!",locationStr);
                            service.locationStr = locationStr;
                        }
                    });
                })};
            this.locationTimer = setInterval(updateLoc,1000*60*10);//10 min
            setTimeout(function(){
                updateLoc();
            },1000);

        }

    }
    registerPush(){
        var service = this;
        var intervalId = setInterval(function(){
            if(!window.registration){
                return;
            }
            console.log("registerpush");
            clearInterval(intervalId);
            const publicVapidKey = 'BExzC1HY_R6awc0BBYNLsVtJyWitteGMLqhA-f563Fs4yUWEP2JBRy4HSCiWciB1tPRRg9nKHdtxyGInOKPwqFw';
            window.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            }).then(function(subscription){
                fetch('push/'+service.userId, {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
            });
        },1000);
    }
    requestNotificationPermission(){
        if (Notification.permission != 'granted') {
            Notification.requestPermission(function(status) {
                console.log('Notification permission status:', status);
            });
        }
    }
    showMsgNotification(msg){
        var userName = this.getUserNameById(msg.sender);
        var msgShort = msg.txt.length > 20 ? msg.txt.substr(0,17)+"..." : msg.txt;
        var notificationJson = {
            body:msgShort,
            icon:'https://pwachat.ddns.net/static/img/icon192.png',
            tag:"messageArrived"
        };
        var title = userName+" üzenetet küldött!";
        navigator.serviceWorker.ready.then(function (swRegistration) {
            return swRegistration.showNotification(title,notificationJson);
        });
    }
    storeRecentMessages(messages,msgId){
        this.saveToDb({
            store: 'recentMessages',
            data: {
                messageId:msgId,
                messages: messages,
                time: (new Date()).getTime()
            },
            update:1
        });
    }
}
var offlineMessagesCount = 10;
//var dev = true;

