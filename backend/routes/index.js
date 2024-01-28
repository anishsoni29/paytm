const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.use("/user", userRouter);
router.use("/accounts", accountRouter);

//an endpoint for users to get their balance
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

module.exports = router;
