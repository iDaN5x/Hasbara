/**
 * Created by idan5 on 6/8/2017.
 */

const Tweet = require("./models/tweet.js"),
    {io} = require("./app-components.js");

class SocketController {
    constructor() {
        Tweet.changes().run().then(this.postNewTweet);
    }

    postNewTweet(feed) {
        feed.each((err, doc) => {
            if (!err && !doc.getOldValue()) {
                Tweet.get(doc.id).getJoin().run().then(tweet => {
                    io.emit('new tweet', tweet);
                });
            }
        });
    }
}

module.exports = SocketController;

