"use strict";var precacheConfig=[["index.html","a7bd56aabdf398cd2c477d85b8151dc4"],["static/css/app.5769d044f079ca306cb054309ba598bd.css","c26de51e2b1244c93c11cd65b8a99c6a"],["static/css/bootstrap.css","38fdafbec65832ead969ca340d28453f"],["static/css/bootstrap.min.css","d8ab09baf9f602e4775cd9bf766e2887"],["static/css/font-awesome.min.css","1ff0bb27d5c720d62057043327a27f94"],["static/css/jquery-ui.min.css","0b5729a931d113be34b6fac13bcf5b29"],["static/css/mdb.css","7b316fa082ec4249506fc1195619619f"],["static/css/mdb.min.css","cfa12efabec62613a3272fbe0ae61693"],["static/css/style.css","d8b8e272d602b3601e305bcc1c2fdf46"],["static/css/style.min.css","d41d8cd98f00b204e9800998ecf8427e"],["static/easyrtc/easyrtc.js","9940791433f7f29b2ac19e07910286f2"],["static/easyrtc/socket-io.js","5c0b0b00dedb139cbf458eaa95c23086"],["static/emoji/jquery.lsxemojipicker.css","f9c7bd7929a004c826c9e1bd45c6af51"],["static/emoji/jquery.lsxemojipicker.js","1e72913ac19595d185e068a208b65544"],["static/js/app.b91414bed54de0d52f1f.js","c4320372adda33e0279779033de13b41"],["static/js/bootstrap.js","d9f096d1f708c35fdd9c78bd422883cc"],["static/js/bootstrap.min.js","ce6e785579ae4cb555c9de311d1b9271"],["static/js/jquery-3.2.1.min.js","c9f5aeeca3ad37bf2aa006139b935f0a"],["static/js/jquery-ui.min.js","c15b1008dec3c8967ea657a7bb4baaec"],["static/js/manifest.2ae2e69a05c33dfc65f8.js","323055c248c0cbf6e12cf4b27d6dfd9b"],["static/js/md5.js","7c1768c2cd8407861f612a2b47fce83d"],["static/js/mdb.js","0c020c96a5940f8d3092d0dfd9b2472d"],["static/js/mdb.min.js","d92fabcc57b1a43696eb870f8e8cdebd"],["static/js/popper.min.js","6cd956453e307bfd2ce4bfb0648b9f7d"],["static/js/sha256.min.js","fc97d1fd31a0882a511d4a66f3a20715"],["static/js/vendor.2218bfba3f8095150879.js","9774ef2cefa6753dcb5d29351599f518"],["static/swextra.js","98b084249ca0eacfe3fbd106a07e441d"],["sw.js","ec686deb2c2e123621f95190d0cd06a2"]],cacheName="sw-precache-v3-my-vue-app-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var s=new URL(e);return"/"===s.pathname.slice(-1)&&(s.pathname+=t),s.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,s,c){var a=new URL(e);return c&&a.pathname.match(c)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(s)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var s=new URL(t).pathname;return e.some(function(e){return s.match(e)})},stripIgnoredUrlParameters=function(e,t){var s=new URL(e);return s.hash="",s.search=s.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),s.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],s=e[1],c=new URL(t,self.location),a=createCacheKey(c,hashParamName,s,!1);return[c.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(s){if(!t.has(s)){var c=new Request(s,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+s+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(s,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(s){return Promise.all(s.map(function(s){if(!t.has(s.url))return e.delete(s)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,s=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(s))||(s=addDirectoryIndex(s,"index.html"),t=urlsToCacheKeys.has(s));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(s)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});"\r\n" 

self.onmessage = function (msg) {
  msg = msg.data;
  if(msg.type = "...."){
    //DO something
  }
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'unSentMessages') {
    event.waitUntil(syncMessages());
  }
});

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    tag:"messageArrived",
    data:data.clickData
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://pwachat.ddns.net"+ "?messageId=" + event.notification.data.messageId)
  );
});

var DBVERSION = 1;

function syncMessages() {

  var request = indexedDB.open("db", DBVERSION);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("messagesToSend", 'readwrite');
    var store = tx.objectStore("messagesToSend");
    store.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        sendMessage(cursor.value);
        cursor.continue();
      } else {
       /*finished*/
        clearUnSentMessages();
      }
    };
  request.onerror = function (err) {
    console.err(err);
  }
}

function sendMessage(msg){
  var messageId = msg.messageId;
  if(!messageId){
    console.error("MessageId missing",msg);
    return;
  }

    fetch("messages/" + messageId, {
      mode: "cors",
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        msg: msg
      })
    }).then(function (response) {
      return response;
    }).then(function (text) {
      console.log('unsentMessage Resend succesfull', text);
    }).catch(function (error) {
      console.error('unsentMessage Resend failed', error);
    });

}

function clearUnSentMessages(){
  var request = indexedDB.open("db", DBVERSION);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("messagesToSend", 'readwrite');
    var store = tx.objectStore("messagesToSend");
    var objectStoreRequest = store.clear();
    objectStoreRequest.onsuccess = function (event) {
      console.log("MessagesToSend Cleared!");
    };
  }
}
