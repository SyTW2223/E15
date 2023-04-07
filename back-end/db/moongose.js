"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose_url = process.env.MONGODB_URL || 'mongodb+srv://alu0101101507:prueba12345@cluster0.yeffxqw.mongodb.net/test';
(0, mongoose_1.connect)(mongoose_url).then(function () {
    console.log('Connection to MongoDB server established');
})["catch"](function () {
    console.log('Unnable to connect to MongoDB server');
});
