const express = require("express");

const app = express();
const server = app.listen(3000);
app.use(express.static("public"));