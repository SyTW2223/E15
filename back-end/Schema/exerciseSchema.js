"use strict";
exports.__esModule = true;
exports.Exercise = exports.exerciseSchema = void 0;
var mongoose_1 = require("mongoose");
var userSchema_1 = require("./userSchema");
var commentsSchema_1 = require("./commentsSchema");
exports.exerciseSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: userSchema_1.userSchema,
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
    initial_position: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    equipment_needed: {
        tyep: Boolean,
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
exports.Exercise = (0, mongoose_1.model)('Exercise', exports.exerciseSchema);
