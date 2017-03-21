'use strict';

const express = require('express');
const routes = require('./server/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const url = require('url');

require('dotenv').load();
// require('./server/config/passport').default(passport);

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/controllers', express.static(process.cwd() + '/server/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/server/common'));

// app.use(session({
//   secret: 'secretClementine',
//   resave: false,
//   saveUninitialized: true,
// }));
//
// app.use(passport.initialize());
// app.use(passport.session());


const port = process.env.PORT || /* istanbul ignore next: no need to test */ 8080;
// app.listen(port, function() {
//   console.log('Node.js listening on port ' + port + '...');
// });
const server = require('http').createServer();
const wss = new WebSocket.Server({server, perMessageDeflate: false});

wss.on('connection', function connection(ws) {
  wss.on('connection', function(ws) {
    console.log('Connected!');
    // let id = setInterval(function() {
    //   ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
    // }, 1000);
    // console.log('started client interval');
    ws.on('close', function() {
      // console.log('stopping client interval');
      // clearInterval(id);
    });
  });
});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  console.log('Broadcasting', data);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

routes(app, passport, wss);
server.on('request', app);
server.listen(port, function() {
  console.log('Listening on http://localhost:' + port);
});

module.exports = {
  app,
};
