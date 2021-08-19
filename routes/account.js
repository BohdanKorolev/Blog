const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../configs/db');
const {log} = require("nodemon/lib/utils");

router.post('/reg', (request, response) => {
    let newUser = new User({
        name: request.body.name,
        email: request.body.email,
        login: request.body.login,
        password: request.body.password,
    });
    User.addUser(newUser, (err, res) => {
        if (err) {
            res.json({success: false, msg: 'User has not been added.'});
        } else {
            res.json({success: true, msg: 'User has been added.'})
        }
    })
})

router.post('/auth', (request, response) => {
    const login = request.body.login;
    const pass = request.body.password;
    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user) {
            return response.json({success: false, msg: 'This user was not found.'})
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });
                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                })
            }
            else {
                return response.json({success: false, msg: 'Incorrect password.'})
            }
        })
    })
})

router.get(
    '/dashboard',
    passport.authenticate('jwt', {session: false, failureRedirect: '/account/auth'}),
    (request, response) => {
        response.send('Dashboard page')
    })

module.exports = router;
