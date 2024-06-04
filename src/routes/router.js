const express = require("express");
const app = express();
const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");
const brandRouter = require("../modules/brand/brand.router");
const categoryRouter = require("../modules/category/category.router");

app.use("/auth", authRouter);
app.use("/banner", bannerRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);

module.exports = app;
