import express from "express";
import checkAuth from "../middleware/authMiddleware.js";

import {
  authenticate,
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getClientsSummary,
  getClients,
  getEmployees,
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getProfile,
  updateProfile,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/login", authenticate);

// Products
router
  .route("/products")
  .post(checkAuth, addProduct)
  .get(checkAuth, getProducts);

router
  .route("/product/:id")
  .get(checkAuth, getProduct)
  .put(checkAuth, updateProduct)
  .delete(checkAuth, deleteProduct);

// Clients
router.route("/clients-summary").get(checkAuth, getClientsSummary);
router.route("/clients").get(checkAuth, getClients);

// Employess

router
  .route("/employees")
  .post(checkAuth, addEmployee)
  .get(checkAuth, getEmployees);

router
  .route("/employee/:id")
  .get(checkAuth, getEmployee)
  .put(checkAuth, updateEmployee)
  .delete(checkAuth, deleteEmployee);

// Profile
router
  .route("/profile/:id")
  .get(checkAuth, getProfile)
  .put(checkAuth, updateProfile);

export default router;
