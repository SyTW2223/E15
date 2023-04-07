"use strict";
exports.__esModule = true;
exports.Routine = exports.routineSchema = void 0;
var mongoose_1 = require("mongoose");
var commentsSchema_1 = require("./commentsSchema");
var exerciseSchema_1 = require("./exerciseSchema");
exports.routineSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    exercises: {
        type: [exerciseSchema_1.exerciseSchema],
        required: true
    },
    equipment_needed: {
        type: Boolean,
        required: true
    },
    avg_duration: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        tyep: Number,
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
exports.Routine = (0, mongoose_1.model)('Routine', exports.routineSchema);
