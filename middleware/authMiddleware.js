import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";
// import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Employee.findById(decoded.id).select(
        "-password -confirmed"
      );
      // Remplazable por User
      return next();
    } catch (e) {
      const error = new Error("Invalid token");
      res.status(404).json({ msg: error.message });
    }
  }

  if (!token) {
    const error = new Error("Invalid token or token does not exist");
    res.status(404).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
