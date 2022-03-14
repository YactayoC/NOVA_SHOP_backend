import express from "express";

import checkAuth from '../middleware/authMiddleware.js'
import {
    register,
    confirmToken,
    authenticate,
    forgetPassword,
    checkToken,
    newPassword,
    showProductsH,
    showProductsP,
    profile, 
    updateUser
} from '../controllers/userController.js'

const router = express.Router();

// Public
router.post('/register', register);
router.get('/confirm/:token', confirmToken); 
router.post('/login', authenticate);
router.post('/forget-password', forgetPassword); 
router.route('/forget-password/:token').get(checkToken).post(newPassword);

// falta
router.get('/home', showProductsH);
router.get('/products', showProductsP);
// router.get('/cart', cart);

// private
router.get('/profile', checkAuth, profile);
router.put('/profile/:id', checkAuth, updateUser);

export default router;