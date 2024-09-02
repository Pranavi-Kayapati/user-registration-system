const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, "pet");
      req.body.userID = decoded.userID;
      req.body.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid token" });
    }
  } else {
    res.status(401).json({ msg: "No token provided" });
  }
};

module.exports = {
  auth,
};
