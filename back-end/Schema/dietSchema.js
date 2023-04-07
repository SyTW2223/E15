"use strict";
exports.__esModule = true;
exports.Diet = exports.dietSchema = void 0;
var mongoose_1 = require("mongoose");
var commentsSchema_1 = require("./commentsSchema");
var userSchema_1 = require("./userSchema");
exports.dietSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: userSchema_1.userSchema,
        required: true
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    snacks: {
        tyep: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    long_description: {
        type: String,
        required: true
    },
    picture: {
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
    }
});
exports.Diet = (0, mongoose_1.model)('Diet', exports.dietSchema);
