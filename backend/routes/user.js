//1. define a new router
const express = require("express");
const zod = require("zod");
const router = express.Router();
module.exports = router;

//2. import it in the index.js file.

//3. adding 3 new routes in the user_routes
//sigup route --> input validation is needed to be done via zodf

router.post("/signup", (req, res) => {
  res.send({
    username: "name@gmail.com",
    firstName: "name",
    lastName: "name",
    password: "12345678",
  });
  res.status(200);
});
