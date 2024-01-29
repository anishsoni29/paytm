//creating a new router here and exporting it

const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

const router = express.Router();

//an endpoint for users to get their balance
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

//an endpoint for users to transfer money to another account
//there should be a transfer session

router
  .post("/transfer", authMiddleware, async (req, res) => {
    //start a session for transaction, + , -
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    //Fetch the accounts within the transactions
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: " Invalid Account",
      });
    }

    //perform the transfer
    await Account.updateOne(
      { userId: req.usedId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
  })
  .session(session);

//commit the transaction
await session.commitTransaction();
res.json({
  message: "Transaction Successful",
});

module.exports = router;
