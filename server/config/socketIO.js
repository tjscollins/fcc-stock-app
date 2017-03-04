
function onConnect(client) {
  client.on('event', onEvent);
  client.on('disconnect', onDisconnect);
}

function onEvent(data) {

}

function onDisconnect() {

}


module.exports = onConnect;
