const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/add', (request, response) => {
    let newPost = new Post(request.body.post);

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
