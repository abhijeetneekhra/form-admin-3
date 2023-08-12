const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
    console.log("Auth Failed " + req.headers.authorization);
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      req.user = { userId: payload.userId };
      next();
    } catch (error) {
      next("Auth failed");
    }
  }
};

module.exports = userAuth;
