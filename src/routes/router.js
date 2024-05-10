const express = require('express');
const app = express();
const authRouter = require('../modules/auth/auth.router')
const bannerRouter = require('../modules/banner/banner.router')

app.use("/auth", authRouter)
app.use("/banner",bannerRouter)
module.exports = app;