import express from "express";

import checkAuth from '../middleware/authMiddleware.js'
import {
    register,
    confirmToken,
    authenticate,
    forgetPassword,
    checkToken,
    newPassword,
    profile, 
    updateUser
} from '../controllers/userController.js'

const router = express.Router();

// Public
router.post('/register', register); // okey
router.get('/confirm/:token', confirmToken); // okey

router.post('/login', authenticate); // okey

router.post('/forget-password', forgetPassword); // okey
router.route('/forget-password/:token').get(checkToken).post(newPassword); // okey

// private
router.get('/profile', checkAuth, profile) // okey
router.put('/profile/:id', checkAuth, updateUser) // okey

export default router;