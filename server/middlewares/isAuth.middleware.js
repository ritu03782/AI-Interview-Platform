
import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Please login.",
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = verifyToken.userId;

    next();

  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message: "Session expired or invalid. Please login again.",
      });
    }

    return res.status(500).json({
      message: "Authentication error",
    });
  }
};

export default isAuth;
