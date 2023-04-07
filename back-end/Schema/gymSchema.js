"use strict";
exports.__esModule = true;
exports.Gym = exports.gymSchema = void 0;
var mongoose_1 = require("mongoose");
var userSchema_1 = require("./userSchema");
var commentsSchema_1 = require("./commentsSchema");
var scheduledSchema_1 = require("./scheduledSchema");
exports.gymSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: userSchema_1.userSchema,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    comments: {
        type: [commentsSchema_1.commentsSchema],
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    schedule: {
        type: scheduledSchema_1.scheduledSchema,
        required: true
    }
});
exports.Gym = (0, mongoose_1.model)('Gym', exports.gymSchema);
