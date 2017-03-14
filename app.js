// Native dependencies.
const Http = require('http'),
      Path = require('path');

// External dependencies.
const Express = require('express'),
      Twitter = require('twitter'),
      SocketIO = require('socket.io'),
      RethinkDB = require('rethinkdbdash');

// Load configuration file.
const config = require('./config');

// Declare app components.
let app = new Express(),
    server = Http.Server(app),
    io = new SocketIO(server);

// Connect to database.
let r = new RethinkDB(config.rethinkdb);

// Expose static files to client.
app.use(Express.static(Path.join(__dirname, 'public')));

// Start listening for incoming requests.
let port = config.port || 3000;

http.listen(port, () => {
  console.log(`Hasbara app started listening on port ${port}`);
});
