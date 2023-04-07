"use strict";
exports.__esModule = true;
exports.Scheduled = exports.scheduledSchema = void 0;
var mongoose_1 = require("mongoose");
exports.scheduledSchema = new mongoose_1.Schema({
    monday: {
        type: String,
        required: true
    },
    tuesday: {
        type: String,
        required: true
    },
    wednesday: {
        type: String,
        required: true
    },
    thursday: {
        type: String,
        required: true
    },
    friday: {
        type: String,
        required: true
    },
    saturday: {
        type: String,
        required: true
    },
    sunday: {
        type: String,
        required: true
    }
});
exports.Scheduled = (0, mongoose_1.model)('Scheduled', exports.scheduledSchema);
