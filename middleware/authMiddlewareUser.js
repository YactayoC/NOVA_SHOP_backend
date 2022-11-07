import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuthUser = async (req, res, next) => {
  let token;

  if (!token) {
    const error = new Error("Invalid token or token does not exist");
    return next();
  }

  if (
    token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password -confirmed");
    } catch (e) {
      const error = new Error("Invalid token");
      return res.status(404).json({ msg: error.message });
    }
  }

  next();
};

export default checkAuthUser;
