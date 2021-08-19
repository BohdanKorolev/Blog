const express = require('express');
const router = express.Router();

router.post ('/reg', (request, response) => {
    console.log('request.body', request.body);
    response.send('Registration page')
})

router.get('/auth', (request, response) => {
    response.send('Login page')
})

router.get('/dashboard', (request, response) => {
    response.send('Dashboard page')
})

module.exports = router;
