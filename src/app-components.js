// Native dependencies.
const Http = require('http'),
      Path = require('path');

// External dependencies.
const Thinky = require('thinky'),
      Express = require('express'),
      SocketIO = require('socket.io');

// Load configuration file.
const config = require('../config.json');

// Declare app components.
let app = new Express(),
    server = Http.Server(app),
    io = new SocketIO(server);

// Allow loading of static files from the public directory.
app.use('/', Express.static(Path.join(__dirname, 'public')));

// Connect to RethinkDB.
let thinky = new Thinky(config.rethinkdb);

// Export components.
module.exports = { app, server, io, thinky };
