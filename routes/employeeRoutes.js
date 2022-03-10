import express from "express";
import checkAuth from '../middleware/authMiddleware.js';

import { 
    authenticate,
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} 
from '../controllers/employeeController.js'


const router = express.Router();

// Products
router
    .route('/products')
    .post(checkAuth, addProduct) // okey
    .get(checkAuth, getProducts); // okey

router  
    .route('/product/:id')
    .get(checkAuth, getProduct) // okey
    .put(checkAuth, updateProduct) 
    .delete(checkAuth, deleteProduct)

// Clients
// router
//     .route('/clients')
//     .get(checkAuth, getClients);

router.post('/login', authenticate);

export default router;