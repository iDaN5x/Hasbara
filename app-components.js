// Native dependencies.
const Http = require('http'),
      Path = require('path');

// External dependencies.
const Thinky = require('Thinky'),
      Express = require('express'),
      SocketIO = require('socket.io');

// Load configuration file.
const config = require('./config.json');

// Declare app components.
let app = new Express(),
    server = Http.Server(app),
    io = new SocketIO(server);

// Connect to RethinkDB.
let thinky = new Thinky(config.rethinkdb);

// Export components.
module.exports = { app, server, io, thinky };
