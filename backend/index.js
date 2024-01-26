const express = require("express");

const app = express();

app.use("/api/v1");
//app.use is a middleware.
// /api/v1 --> all reqs will start with this.
