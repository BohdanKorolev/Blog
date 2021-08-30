const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const config = require('../configs/db');

router.post('/add', (request, response) => {
    let newCategory = new Category({
        name: request.body.name,
    });
    Category.addCategory(newCategory, (err, category) => {
        if (err) {
            response.json({success: false, msg: 'Category has not been added.'});
        } else {
            response.json({success: true, msg: 'Category has been added.'})
        }
    })
})

router.post('/remove', (request, response) => {
    if (request.body.id) {
        Category.removeCategoryById(request.body.id, (err, category) => {
            if (err) {
                response.json({success: false, msg: 'Category has not been deleted.'});
            } else {
                response.json({success: true, msg: 'Category has been deleted.'})
            }
        })
    }
    else if (request.body.name) {
        Category.removeCategoryByName(request.body.name, (err, category) => {
            if (err) {
                response.json({success: false, msg: 'Category has not been deleted.'});
            } else {
                response.json({success: true, msg: 'Category has been deleted.'})
            }
        })
    }
})

router.get(
    '/all',
    (request, response) => {
        let categories = [];
        Category.find((error, category) => {
            response.json({categories: category});
        });
    })

module.exports = router;
