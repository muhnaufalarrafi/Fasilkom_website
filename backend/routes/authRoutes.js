const express = require('express');
const { signup, login, logout, updateUser, deleteUser } = require('../controllers/authController.js'); // Pastikan logout diimport di sini
const { getMe } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyToken, logout); // Endpoint untuk logout user
router.get('/me', verifyToken, getMe);
router.put('/users/:id', verifyToken, updateUser); // Endpoint untuk update user
router.delete('/users/:id', verifyToken, deleteUser); // Endpoint untuk delete user oleh admin

module.exports = router;
