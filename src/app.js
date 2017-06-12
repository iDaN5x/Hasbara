const TwitterHandler = require('./twitter-handler.js'),
      SocketController = require('./socket-controller.js'),
      {server} = require('./app-components.js'),
      config = require('../config.json');

var handlers = [new TwitterHandler()];
//var controllers = [new SocketController()];

server.listen(config.port, () => {
  console.log(`Hasbara listening on port ${config.port}`);
});
