import jwt from "jsonwebtoken"
const isAuthenticated = async (req, res, next) => {
  try {

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "User not Authorized"
      })
    };
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decode) {
      return res.status(401).json({
        message: "Invalid or expired token. Please log in again."
      });
    }
    req.id = decode.userId
    next()

  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      message: "Internal server error during authentication."
    });

  }
}

export default isAuthenticated