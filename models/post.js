const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    categoryId: {
        type: String
    },
    title: {
        type: String
    },
    bannerImg: {
        type: Buffer
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    dateTime: {
        type: Date
    },
})

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getPostById = (id, callback) => {
    Post.findById(id, callback);
}

module.exports.addPost = (newPost, callback) => {
    newPost.save(callback);
}

module.exports.removePostById = (categoryId, callback) => {
    Post.deleteOne({'_id': categoryId}, callback);
}
