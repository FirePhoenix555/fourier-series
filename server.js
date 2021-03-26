require("dotenv").config()
const express = require("express");
const app = express();
const server = app.listen(process.env.PORT);
app.use(express.static("public"));