'use strict';

var mongoose = require('mongoose');

var userModel = function() {

    var userSchema = mongoose.Schema({
        name: {
            type: String,
            unique: true
        },
        passwd: String
    });

    return mongoose.model('User', userSchema, 'user');
};

module.exports = new userModel();