const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userId = decodedToken.userId;
    console.log(token)
    console.log(decodedToken)
    console.log(userId)
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      req.params.verifiedUserID = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
