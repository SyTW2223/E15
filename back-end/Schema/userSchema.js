"use strict";
exports.__esModule = true;
exports.User = exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    id_user: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String
    },
    role: {
        type: String,
        required: true
    }
});
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
