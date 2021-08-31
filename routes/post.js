const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/add', (request, response) => {
    let newPost = new Post({
        categoryId: request.body.post.categoryId,
        title: request.body.post.title,
        bannerImg: request.body.post.bannerImg,
        content: request.body.post.content,
        author: request.body.post.author,
        dateTime: request.body.post.dateTime,
    });
    Post.addPost(newPost, (err, category) => {
        if (err) {
            response.json({success: false, msg: 'Post has not been added.'});
        } else {
            response.json({success: true, msg: 'Post has been added.'})
        }
    })
})

router.post('/remove', (request, response) => {
    Post.removePostById(request.body.id, (err, post) => {
        if (err) {
            response.json({success: false, msg: 'Post has not been deleted.'});
        } else {
            response.json({success: true, msg: 'Post has been deleted.'})
        }
    })
})

router.get(
    '/all',
    (request, response) => {
        Post.find((error, category) => {
            response.json({categories: category});
        });
    })

module.exports = router;
