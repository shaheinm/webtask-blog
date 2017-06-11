var mongoose = require('mongoose');

const PostsSchema = require('../models/posts')

module.exports = {
    connectDisconnect: (req, res, next) => {
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        req.postsModel = connection.model('Posts', PostsSchema);
        req.on('end', () => {
            mongoose.connection.close();
        })
        next()
    },
}
