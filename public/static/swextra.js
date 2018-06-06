
var unsentmessages = [];
self.onmessage = function (msg) {
  msg = msg.data;
  if(msg.type = "unsentmessage"){
    unsentmessages.push(msg.data)
  }
}

self.addEventListener('sync', function(event) {
  if (event.tag == 'syncMessages') {
    event.waitUntil(syncMessages());
  }
});

function syncMessages(){
  for(var i = 0; i < unsentmessages.length; i++){
    syncMessage(unsentmessages[i]);
  }
  unsentmessages = [];
}

function syncMessage(msg){

  let dbPromise = null;
  const openRequest = indexedDB.open( 'db', 1 );
  openRequest.onsuccess = function(e) {

      var db = event.target.result;
      var tx = db.transaction('unSyncedMessages', 'readwrite');
      var store = tx.objectStore('unSyncedMessages');
      var arr = store.getAll();
      for(var i = 0; i < arr.length;i++){
        var msg = arr[i];
        setTimeout(function(){
          fetch("messages/" + msg.msgId, {
            mode:"no-cors",
            method: 'post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              msg: {
                txt: msg.txt,
                sender: msg.sender
              }
            }),
          }).then(function (response) {
            return response;
          })
            .then(function (text) {
              console.log('Request successful', text);
            })
            .catch(function (error) {
              console.log('Request failed', error);
            });
        },1000);
      }



  };
/*
  setTimeout(function(){
    fetch("messages/" + msg.msgId, {
      mode:"no-cors",
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        msg: {
          txt: msg.txt,
          sender: msg.sender
        }
      }),
    }).then(function (response) {
      return response;
    })
      .then(function (text) {
        console.log('Request successful', text);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  },1000);
*/
}



