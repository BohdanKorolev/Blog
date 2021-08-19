const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../configs/db');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = (login, callback) => {
    const query = {
        login: login
    };
    User.findOne(query, callback);
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = (userPass, dbUserPass, callback) => {
    bcrypt.compare(userPass, dbUserPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}
