//1. define a new router
const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");

const router = express.Router();
module.exports = router;

const signupBody = zod.object({
    username : zod.string().email(),
    fistName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

//using the async await function
router.post("/signup", async (req, res)) => {
    const { success } = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message : " Email already taken / Incorrect / Invalid Email!"
        })
    }
    const existingUser =  await User.findOne({
        username : req.body.username
    })
}

//2. import it in the index.js file.

//3. adding 3 new routes in the user_routes
//sigup route --> input validation is needed to be done via zodf

//connection with the database as well.

router.post("/signup", (req, res) => {
  res.send({
    username: "name@gmail.com",
    firstName: "name",
    lastName: "name",
    password: "12345678",
  });
  res.status(200);
});
