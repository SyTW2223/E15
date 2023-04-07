"use strict";
exports.__esModule = true;
exports.Comment = exports.commentsSchema = void 0;
var mongoose_1 = require("mongoose");
exports.commentsSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
exports.Comment = (0, mongoose_1.model)('Comment', exports.commentsSchema);
