const TwitterHandler = require('./twitter-handler.js'),
      {server} = require('./app-components.js'),
      config = require('../config.json');

var handlers = [new TwitterHandler()];

server.listen(config.port, () => {
  console.log(`Hasbara listening on port ${config.port}`);
});
