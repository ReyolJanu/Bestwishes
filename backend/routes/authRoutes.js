const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/send-verification-email', authController.sendVerificationEmail);

// Protected routes
router.get('/myprofile', protect, authController.getUserProfile);
router.post('/change-password', protect, authController.changePassword);

module.exports = router;