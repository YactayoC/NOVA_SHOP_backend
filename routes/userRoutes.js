import express from "express";

import checkAuthUser from "../middleware/authMiddlewareUser.js";
import {
  register,
  confirmToken,
  authenticate,
  forgetPassword,
  checkToken,
  newPassword,
  showProductsH,
  showProductsP,
  cart,
  profile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// Public
router.post("/register", register);
router.get("/confirm/:token", confirmToken);
router.post("/login", authenticate);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

// falta
router.get("/home", checkAuthUser, showProductsH);
router.get("/products", checkAuthUser, showProductsP);
router.post("/cart/:id", checkAuthUser, cart);

// private
router.get("/profile", checkAuthUser, profile);
router.put("/profile/:id", checkAuthUser, updateUser);

export default router;
