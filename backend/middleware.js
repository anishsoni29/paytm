//1. Checks the headers for the Authorization field
//2. Verifies the token is valid or not
//3.Puts the userId in the req object
//4. Return 403 if not in req object.

//middleware with auth_header function:
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer")) {
    return res.status(403).json({});
  }

  //selecting the second part of the authHeader and then decoding it to verify the authorization.
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if ((req.userId = decoded.userId)) {
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).jsom({});
  }
};

module.exports = {
  authMiddleware,
};
