import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Decoded user:", req.user);
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Token is not valid",
        error: error.message,
      });
    }
  } else {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
};

export default verifyToken;
