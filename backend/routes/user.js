//1. define a new router
const express = require("express");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");

const router = express.Router();
module.exports = router;

//defining the signin route
const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

//adding the router for the signin above
router.post("/signin", async function(req,res){
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }
})


//defining the signup route
const signupBody = zod.object({
  username: zod.string().email(),
  fistName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

//using the async await function
//router for the signup
router.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken/ Incorrect / Invalid Email!",
    });
  }
});

const existingUser = await User.findOne({
  username: req.body.username,
});

if (existingUser) {
  return res.status(411).json({
    message: " Email already taken / Incorrect / Invalid Email!",
  });
}

const user = await User.create({
  username: req.body.username,
  password: req.body.password,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
});

is (user) {
    const token = jwt.sign({
        userId : user._id
    }, JWT_SECRET);

    res.json({
        token : token,
    })
    return;
}
res.status(411).json({
    message : "Error while signin in!"
})

const UserId = user._id;

const token = jwt.sign(
  {
    UserId,
  },
  JWT_SECRET
);

res.json({
  message: "User Created Successfully!",
  token: token,
});

//2. import it in the index.js file.

//3. adding 3 new routes in the user_routes
//sigup route --> input validation is needed to be done via zodf
