"use strict";
exports.__esModule = true;
var express = require("express");
require("../db/moongose");
var app_routerSignUp_1 = require("../routers/app.routerSignUp");
var app_routerSignIn_1 = require("../routers/app.routerSignIn");
var app = express();
console.log("llego hasta aqui")
/* mirar porque es de dsi pillado*/
app.use(app_routerSignUp_1.signUpR);
//app.use(app_routerSignIn_1.signInR);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is up on port ".concat(port));
});
